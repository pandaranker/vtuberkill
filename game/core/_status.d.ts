///<reference path="./game.ts"/>
declare type _status_type = {
    paused: boolean,
    paused2: boolean,
    paused3: string,
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

    gameStarted?: boolean
    waitingForPlayer?: boolean
    dragged?: boolean
    video?: boolean
    multitarget?: boolean
    mode?: string
    clickingidentity?:[PlayerModel,Array]
    /**当前回合角色 */
    currentPhase?:PlayerModel
    /**当前回合弃牌 */
    discarded?:Array
    /**发送聊天 */
    addChatEntry?:Array
    /**轮次开始角色 */
    roundStart?:PlayerModel
    /**对决模式 */
    brawl:{noGameDraw:boolean,gameStart:()=>void}
    /**观看录像 */
    videoDuration:number
    /**是否为引导模式 */
    yindao:boolean
    /**重播 */
    replayvideo:boolean
    playback
    /**展示身份 */
    identityShown:boolean
    /**先攻少摸牌 */
    first_less_forced:boolean
    first_less:boolean
    /**选择中 */
    imchoosing:boolean
    /**游戏启动摸牌已进行 */
    gameDrawed?:boolean
    /**正在进入/创建房间 */
    enteringroom?:boolean
    creatingroom?:boolean
    /**鼠标事件 */
    mousedown:boolean
    mouseleft:boolean
    /**记录栏 */
    prepareArena:boolean
    /**鏖战 */
    _aozhan:boolean
    /**卡片事件结算 */
    cardsFinished:boolean
    /**卡片事件等待清单 */
    waitingForCards?:Array
    /**过渡等待清单 */
    waitingForTransition?:Array
    skintimeout:NodeJS.Timeout
    timeout:NodeJS.Timeout
    countDown:NodeJS.Timeout
    /**牌堆计数 */
    cardPileNum:number
    /**源模式 */
    sourcemode:string
    /**联机形象 */
    onlinenickname:string
    onlineavatar:string
    /**扩展说明文本 */
    extensionChangeLog:string
    extension:string
    evaluatingExtension:boolean

    /**金币扩展 */
    coin:number
    coinCoeff:number
    betWin:boolean
    additionalReward:()=>number
}