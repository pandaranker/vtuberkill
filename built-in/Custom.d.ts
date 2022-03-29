import { type } from "os"
// import CardModel from "../core/view/CardModel"
// import PlayerModel from "../core/view/PlayerModel"
type PlayerModel = any
type EventModel = any
type CardModel = any

declare global {

    //模块结构
    type Gender = 'female' | 'male' | 'none' | 'unknown'
    type cardProperties = 'name' | 'nature' | 'suit' | 'color'
    type Key = string | Array<any>
    type MarkKey = string | ((storage: any, player: PlayerModel, skill: string?) => any)
    type Num = string | number
    type Keyword = string | Array<string>
    type AObject = { [key: string]: Array<string> }
    type Keymap = { [key: string]: string | Array<string> }
    type Aimap = { [key: string]: Num | Array<string> | Keymap }
    type St = { [key: string]: number }
    type Stat = { card: St, skill: St, isMe?: boolean }
    type Statmap = { judges?: { viewAs?}[], handcards?: { gaintag?}[], [key: string]: Num | Array<string | Object> | boolean }
    type Dialogword = Array<Key>
    type skillContent = () => void
    type skillCheck = (event: EventModel, player?: PlayerModel) => boolean | Num
    type targetCheck = (card: CardModel, player?: PlayerModel, event?: EventModel) => boolean
    interface Skill {
        audio?: Num | boolean
        enable?: Keyword
        trigger?: Keymap
        usable?: number
        group?: Keyword
        filter?: skillCheck
        check?: skillCheck
        init?: (player: PlayerModel, skill: string) => void
        prompt2?: string | skillCheck
        logTarget?: string | ((event: EventModel, player?: PlayerModel) => boolean | Num | string[])
        filterTarget?: boolean | targetCheck
        filterCard?: boolean | targetCheck | { [key in cardProperties]?: string }
        content?: skillContent | skillContent[]
        subSkill?: { [key: string]: Skill }
        position?: string
        derivation?: string | string[]
        involve?: string | string[] | Object[]
        unique?: true
        juexingji?: true
        firstDo?: true
        mark?: true | string
        marktext?: `${string[1]}`
        intro?: {
            content?: MarkKey,
            onunmark?: MarkKey,
            name?: string,
            name2?: string,
            mark?: Function,
            markcount?: (storage, player) => number
        }
        chooseButton?: {
            dialog: (event?: EventModel, player?: PlayerModel) => any,
            [key: string]: any
        }
        [key: string]: any
    }
    interface Chara {
        [key: string]: [Gender, string, number | string, Array<string>, Array<string>?]
    }
    interface currentObject {
        character: Chara
        skill: { [key: string]: Skill }
        characterTitle?: { [key: string]: string }
        [key: string]: any
    }

    //常用变量结构
    var player: PlayerModel, source: PlayerModel | string, target: PlayerModel
    var Evt: EventModel
    var targets: PlayerModel[]
    var card: CardModel
    var cards: CardModel[]
    var trigger: EventModel
    var galgame: { sce(string): void }
    var targets: PlayerModel[]
    var num: any
    // number | Function
    var skill: string
    var result: number | any | {
        bool?: Boolean
        targets?: PlayerModel[]
        cards?: CardModel[]
        links?: Array<any>
    }
    type cardArray = { name: string, suit?: string, number?: string, nature?: string }

    //原生游戏核心类
    interface GAMECORE {
        game
        cheat: {
            [key: string]: Function
        },
        ui,
        get: {
            $a: ((from: PlayerModel, to: PlayerModel) => number)
            $a2: ((to: PlayerModel) => number)
            [key: string]: Function
        },
        ai,
        lib,
        _status,
    }
    interface Window extends GAMECORE {
        play
        isNonameServer
        isNonameServerIp
        /**屏幕常亮相关 */
        plugins
        noSleep
        /**更改游戏设置延时 */
        resetGameTimeout: NodeJS.Timeout
        /**cheat相关 */
        /**导入介质 */
        data,
        translate,
        group,
        groupnature,
        /**初始界面 */
        inSplash,
        /**菜单 */
        StatusBar,
        /**Rank */
        vtuberkill_character_rank,
        resolveLocalFileSystemURL,//Cordova
        require,
        vkCore: GAMECORE,
        [key: string]: any
    }
    interface HTMLDivElement {
        getModel: () => Object
        node?: { [key: string]: HTMLDivElement | HTMLElement }
        noclick?: boolean
        _doubleClicking?: boolean
        onClickAvatar?
        onClickAvatar2?
        onClickCharacter?
        onClickIdentity?
        link?
    }
    interface ChildNode {
        innerHTML: string
        setBackgroundImage
        delete
        style
        classList?: DOMTokenList
        name?: string
        viewAs?: string
        tempJudge?: string
        markidentifer?
    }
    //扩展的类
    class JSZip {
        generate(Object): String | Uint8Array | ArrayBuffer | Buffer | Blob
        file(name: string | RegExp, data?: String | ArrayBuffer | Uint8Array | Buffer, o?: Object): JSZip | Object | Array<any>
        files: JSZip[]
    }
    /**特殊接口 */
    interface Result {
        (...args): boolean;
        _filter_args: [any, number];
    }
}
export { }