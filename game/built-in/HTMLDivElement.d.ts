declare global {
    interface HTMLDivElement {
        _onEndDelete: boolean | undefined;
        _listeningEnd:boolean | undefined;
        _transitionEnded: boolean | undefined;
        /**
         * 本元素播放动画
         * @function HTMLDivElement#animate
         * @param {string} name - 动画名称
         * @param {number?} [time=1000] - 动画持续时间（ms）
         * @returns {HTMLDivElement} this self
         */
        animate(name: string, time?: number): HTMLDivElement;
        /**
         * 隐藏本元素及其子元素
         * @function HTMLDivElement#hide
         * @returns {HTMLDivElement} this self
         */
        hide(): HTMLDivElement;
        /**
         * 本元素取消焦点
         * @function HTMLDivElement#unfocus
         * @returns {HTMLDivElement} this self
         */
        unfocus(): HTMLDivElement;
        /**
         * 本元素重获焦点
         * @function HTMLDivElement#refocus
         * @returns {HTMLDivElement} this self
         */
        refocus(): HTMLDivElement;
        /**
         * 本元素取消隐藏
         * @function HTMLDivElement#show
         * @returns {HTMLDivElement} this self
         */
        show(): HTMLDivElement;
        /**
         * @callback HTMLDivElement~deleteCallback
         * @see {@link HTMLDivElement#delete}
         */
        /**
         * 延时从所属DOM树移除本元素
         * @function HTMLDivElement#delete
         * @param {number} time - 延迟时间（ms）
         * @param {HTMLDivElement~deleteCallback} callback - 移除后回调函数
         * @returns {HTMLDivElement} this self
         */
        delete(time?: number, callback?: () => void): HTMLDivElement;
        /**
         * 移动本元素(牌)
         * @function HTMLDivElement#goto
         * @param {*} position - 位置
         * @param {number} time - 持续时间
         * @returns {HTMLDivElement} this self
         */
        goto(position: HTMLElement, time?: number): HTMLDivElement;
        /**
         * 强制取消移动，固定在当前位置
         * @function HTMLDivElement#fix
         * @returns {HTMLDivElement} this self
         */
        fix(): HTMLDivElement;
        /**
         * 设置背景图片，当name为虚值或为空白字符串时，使用原背景。
         * 对应路径：`image/${type?type+'/':''}${type?subfolder+'/':''}${name}${ext}`
         * @function HTMLDivElement#setBackground
         * @param {string} [name] - 图片名（无后缀）
         * @param {string} [type] - 类型对应路径
         * @param {string} [ext='.jpg'] - 图片后缀
         * @param {string} [subfolder='default'] - 类型文件夹下的子路径，仅在参数`type`指定值时有效
         * @returns {?HTMLDivElement} this self
         */
        setBackground(name?: string, type?: string, ext?: string, subfolder?: string): void;
        /**
         * 设置本元素的背景图片为数据库中的图片
         * @function HTMLDivElement#setBackgroundDB
         * @param {string} img - 图片对应的键值
         */
        setBackgroundDB(img: string): void;
        /**
         * 设置本元素的背景图片
         * @function HTMLDivElement#setBackgroundImage
         * @param {string} img - 图片相对{@link lib.assetURL|assertURL}路径
         */
        setBackgroundImage(img: string): void;
        /**
         * {@link HTMLDivElement#listen|listen}（click）的回调函数
         * @callback HTMLDivElement#listen~listenCallback
         * @param {(MouseEvent|TouchEvent)} e - 触发事件
         */
        /**
         * 监听点击事件
         * @function HTMLDivElement#listen
         * @param {HTMLDivElement#listen~listenCallback} func - 点击回调函数
         * @returns {HTMLDivElement} this self
         */
        listen(func: (this: HTMLDivElement, ev: MouseEvent) => any): HTMLDivElement;
        /**
         * @callback HTMLDivElement#listenTransition~callback
         * @see {@link HTMLDivElement#listenTransition}
         */
        /**
         * 延时触发回调函数，同时监听本元素变换动画，如果变换结束则立即触发回调函数
         * @function HTMLDivElement#listenTransition
         * @param {HTMLDivElement#listenTransition~callback} func - 回调函数
         * @param {number} [time=1000] - 延迟时间
         * @returns {!number} timeoutID 
         */
        listenTransition(func: (this: HTMLDivElement) => void, time?: number): NodeJS.Timeout | number;
        /**
         * 设置本元素位置
         * ```JavaScript
         * top = calc(`offsets[0]`%+`offsets[1]`px)
         * left = calc(`offsets[2]`%+`offsets[3]`px)
         * ```
         * @function HTMLDivElement#setPosition
         * @param {!number[]} offsets - 偏移量数组（长度必须为4）。
         * @returns {HTMLDivElement} this self
         */
        /**
         * 设置本元素位置
         * ```JavaScript
         * top  = calc(`top_pc`%+`top_px`px)
         * left = calc(`lft_pc`%+`lft_px`px)
         * ```
         * @function HTMLDivElement#setPosition
         * @variation 2
         * @param {number} top_pc
         * @param {number} top_px
         * @param {number} lft_pc
         * @param {number} lft_px
         * @returns {HTMLDivElement} this self
         */
        setPosition(top_pc: number | number[], top_px?: number, lft_pc?: number, lft_px?: number): HTMLDivElement;
        /**
         * 设置本元素css样式
         */
        css(style: { [Property in keyof CSSStyleDeclaration | keyof{innerHTML?:string}]?:string }): HTMLDivElement;
    }
}
export { }