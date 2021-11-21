import {_status, lib, game, ui, get} from '../_context';
/**
 * HTMLDivElementProxy代理类
 * @class HTMLDivElementProxy
 * @global
 */
class HTMLDivElementProxy {
    private _element: HTMLDivElement;
    get element() {
        return this._element;
    }
    
    constructor(element:HTMLDivElement) {
        this._element = element;
    }
    //vtuberkill part

    /**
     * 本元素播放动画
     * @function animate
     * @param {string} name - 动画名称
     * @param {number} [time=1000] - 动画持续时间（ms）
     * @returns {HTMLDivElementProxy} this self
     */
    animate(name:string, time:number=1000) {
        var that;
        if (get.is.mobileMe(this) && name == 'target') {
            that = ui.mebg;
        }
        else {
            that = this;
        }
        that.classList.add(name);
        setTimeout(function () {
            that.classList.remove(name);
        }, time || 1000);
        return this;
    };
    /**
     * 隐藏本元素及其子元素
     * @function hide
     * @returns {HTMLDivElementProxy} this self
     */
    hide() {
        this.classList.add('hidden');
        return this;
    }
    /**
     * 本元素取消焦点
     * @function unfocus
     * @returns {HTMLDivElementProxy} this self
     */
    unfocus() {
        if (lib.config.transparent_dialog) this.classList.add('transparent');
        return this;
    }
    /**
     * 本元素重获焦点
     * @function refocus
     * @returns {HTMLDivElementProxy} this self
     */
    refocus() {
        this.classList.remove('transparent');
        return this;
    }
    /**
     * 本元素取消隐藏
     * @function show
     * @returns {HTMLDivElementProxy} this self
     */
    show() {
        this.classList.remove('hidden');
        return this;
    }
    /**
     * @callback HTMLDivElementProxy~deleteCallback
     * @see {@link delete}
     */
    /**
     * 延时从所属DOM树移除本元素
     * @function delete
     * @param {number} time - 延迟时间（ms）
     * @param {HTMLDivElementProxy~deleteCallback} callback - 移除后回调函数
     * @returns {HTMLDivElementProxy} this self
     */
    timeout: NodeJS.Timeout
    _listeningEnd:boolean
    _transitionEnded:boolean
    _onEndDelete:boolean
    delete(time?, callback?) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
        if (!this._listeningEnd || this._transitionEnded) {
            if (typeof time != 'number') time = 500;
            this.classList.add('removing');
            var that = this;
            this.timeout = setTimeout(function () {
                that.remove();
                that.classList.remove('removing');
                if (typeof callback == 'function') {
                    callback();
                }
            }, time);
        }
        else {
            this._onEndDelete = true;
        }
        return this;
    }
    /**
     * 移动本元素(牌)
     * @function goto
     * @param {*} position - 位置
     * @param {number} time - 持续时间
     * @returns {HTMLDivElementProxy} this self
     */
    goto(position, time) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }

        if (typeof time != 'number') time = 500;
        this.classList.add('removing');

        var that = this;
        this.timeout = setTimeout(function () {
            if (!that.destroyed) {
                position.appendChild(that);
            }
            that.classList.remove('removing');
            delete that.destiny;
        }, time);
        this.destiny = position;
        return this;
    }
    /**
     * 强制取消移动，固定在当前位置
     * @function fix
     * @returns {HTMLDivElementProxy} this self
     */
    fix() {
        clearTimeout(this.timeout);
        delete this.timeout;
        delete this.destiny;
        this.classList.remove('removing');
        return this;
    }
    /**
     * 设置背景图片，当name为虚值或为空白字符串时，使用原背景。
     * 对应路径：`image/${type?type+'/':''}${type?subfolder+'/':''}${name}${ext}`
     * @function setBackground
     * @param {string} [name] - 图片名（无后缀）
     * @param {string} [type] - 类型对应路径
     * @param {string} [ext='.jpg'] - 图片后缀
     * @param {string} [subfolder='default'] - 类型文件夹下的子路径，仅在参数`type`指定值时有效
     * @returns {?HTMLDivElementProxy} this self
     */
    setBackground(name, type?:string, ext?, subfolder?) {
        if (!name) return;
        var src;
        if (ext == 'noskin') {
            ext = '.jpg';
        }
        ext = ext || '.jpg';
        subfolder = subfolder || 'default'
        if (type) {
            var dbimage = null, extimage = null, modeimage = null;
            var nameinfo;
            var gzbool = false;
            var mode = get.mode();
            if (type == 'character') {
                if (lib.characterPack['mode_' + mode] && lib.characterPack['mode_' + mode][name]) {
                    if (mode == 'guozhan') {
                        nameinfo = lib.character[name];
                        if (name.indexOf('gz_shibing') == 0) {
                            name = name.slice(3, 11);
                        }
                        else {
                            if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].contains('gzskin')) gzbool = true;
                            name = name.slice(3);
                        }
                    }
                    else {
                        modeimage = mode;
                    }
                }
                else if (lib.character[name]) {
                    nameinfo = lib.character[name];
                }
                else if (name.indexOf('::') != -1) {
                    name = name.split('::');
                    modeimage = name[0];
                    name = name[1];
                }
            }
            if (!modeimage && nameinfo && nameinfo[4]) {
                for (var i = 0; i < nameinfo[4].length; i++) {
                    if (nameinfo[4][i].indexOf('ext:') == 0) {
                        extimage = nameinfo[4][i]; break;
                    }
                    else if (nameinfo[4][i].indexOf('db:') == 0) {
                        dbimage = nameinfo[4][i]; break;
                    }
                    else if (nameinfo[4][i].indexOf('mode:') == 0) {
                        modeimage = nameinfo[4][i].slice(5); break;
                    }
                    else if (nameinfo[4][i].indexOf('character:') == 0) {
                        name = nameinfo[4][i].slice(10); break;
                    }
                }
            }
            if (extimage) {
                src = extimage.replace(/ext:/, 'extension/');
            }
            else if (dbimage) {
                this.setBackgroundDB(dbimage.slice(3));
                return this;
            }
            else if (modeimage) {
                src = 'image/mode/' + modeimage + '/character/' + name + ext;
            }
            else if (type == 'character' && lib.config.skin[name] && arguments[2] != 'noskin') {
                src = 'image/skin/' + name + '/' + lib.config.skin[name] + ext;
            }
            else {
                if (type == 'character') {
                    src = 'image/character/' + (gzbool ? 'gz_' : '') + name + ext;
                }
                else {
                    src = 'image/' + type + '/' + subfolder + '/' + name + ext;
                }
            }
        }
        else {
            src = 'image/' + name + ext;
        }
        this.setBackgroundImage(src);
        this.style.backgroundSize = "cover";
        return this;
    }
    /**
     * 设置本元素的背景图片为数据库中的图片
     * @function setBackgroundDB
     * @param {string} img - 图片对应的键值
     */
    setBackgroundDB(img) {
        var node = this;
        game.getDB('image', img, function (src) {
            node.style.backgroundImage = "url('" + src + "')";
            node.style.backgroundSize = "cover";
        });
    }
    /**
     * 设置本元素的背景图片
     * @function setBackgroundImage
     * @param {string} img - 图片相对{@link lib.assetURL|assertURL}路径
     */
    setBackgroundImage(img) {
        this.style.backgroundImage = 'url("' + lib.assetURL + img + '")';
    }
    /**
     * {@link listen|listen}（click）的回调函数
     * @callback listen~listenCallback
     * @param {(MouseEvent|TouchEvent)} e - 触发事件
     */
    /**
     * 监听点击事件
     * @function listen
     * @param {listen~listenCallback} func - 点击回调函数
     * @returns {HTMLDivElementProxy} this self
     */
    listen(func) {
        if (lib.config.touchscreen) {
            this.addEventListener('touchend', function (e) {
                if (!_status.dragged) {
                    func.call(this, e);
                }
            });
            var fallback = function (e) {
                if (!_status.touchconfirmed) {
                    func.call(this, e);
                }
                else {
                    this.removeEventListener('click', fallback);
                }
            }
            this.addEventListener('click', fallback);
        }
        else {
            this.addEventListener('click', func);
        }
        return this;
    }
    /**
     * @callback listenTransition~callback
     * @see {@link listenTransition}
     */
    /**
     * 延时触发回调函数，同时监听本元素变换动画，如果变换结束则立即触发回调函数
     * @function listenTransition
     * @param {listenTransition~callback} func - 回调函数
     * @param {number} [time=1000] - 延迟时间
     * @returns {!number} timeoutID 
     */
    listenTransition(func, time) {
        var that = this;
        var done = false;
        var callback = function () {
            if (!done) {
                func.call(that);
                done = true;
            }
        };
        this.addEventListener('webkitTransitionEnd', callback);
        return setTimeout(callback, time || 1000);
    }
    /**
     * 设置本元素位置
     * ```JavaScript
     * top = calc(`offsets[0]`%+`offsets[1]`px)
     * left = calc(`offsets[2]`%+`offsets[3]`px)
     * ```
     * @function setPosition
     * @param {!number[]} offsets - 偏移量数组（长度必须为4）。
     * @returns {HTMLDivElementProxy} this self
     */
    /**
     * 设置本元素位置
     * ```JavaScript
     * top  = calc(`top_pc`%+`top_px`px)
     * left = calc(`lft_pc`%+`lft_px`px)
     * ```
     * @function setPosition
     * @variation 2
     * @param {number} top_pc
     * @param {number} top_px
     * @param {number} lft_pc
     * @param {number} lft_px
     * @returns {HTMLDivElementProxy} this self
     */
    setPosition() {
        var position;
        if (arguments.length == 4) {
            position = [];
            for (var i = 0; i < arguments.length; i++) position.push(arguments[i]);
        }
        else if (arguments.length == 1 && Array.isArray(arguments[0]) && arguments[0].length == 4) {
            position = arguments[0];
        }
        else {
            return this;
        }
        var top = 'calc(' + position[0] + '% ';
        if (position[1] > 0) top += '+ ' + position[1] + 'px)';
        else top += '- ' + Math.abs(position[1]) + 'px)';
        var left = 'calc(' + position[2] + '% ';
        if (position[3] > 0) left += '+ ' + position[3] + 'px)';
        else left += '- ' + Math.abs(position[3]) + 'px)';
        this.style.top = top;
        this.style.left = left;
        return this;
    }
    /**
     * 设置本元素css样式
     * @function css
     * @param {Object} style - style
     * @param {string} [style.innerHTML] - 设置本元素内部HTML
     * @param {...string} [style.cssProperty] - 设置任意数量的css属性。{@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference|cssProperty}
     * @returns {HTMLDivElementProxy} this self
     */
    css(style) {
        for (var i in style) {
            if (i == 'innerHTML') {
                this.innerHTML = style[i];
            }
            else {
                this.style[i] = style[i];
            }
        }
        return this;
    }


    //Node part

    appendChild(...arg) {
        return this._element.appendChild.call(this._element,...arg);
    }
    cloneNode(...arg) {
        return this._element.cloneNode.call(this._element,...arg);
    }
    compareDocumentPosition(...arg) {
        return this._element.compareDocumentPosition.call(this._element,...arg);
    }
    getBoxQuads(...arg) {
        return this._element.getBoxQuads.call(this._element,...arg);
    }
    getRootNode(...arg) {
        return this._element.getRootNode.call(this._element,...arg);
    }
    hasChildNodes(...arg) {
        return this._element.hasChildNodes.call(this._element,...arg);
    }
    insertBefore(...arg) {
        return this._element.insertBefore.call(this._element,...arg);
    }
    isDefaultNamespace(...arg) {
        return this._element.isDefaultNamespace.call(this._element,...arg);
    }
    isEqualNode(...arg) {
        return this._element.isEqualNode.call(this._element,...arg);
    }
    isSameNode(...arg) {
        return this._element.isSameNode.call(this._element,...arg);
    }
    lookupPrefix(...arg) {
        return this._element.lookupPrefix.call(this._element,...arg);
    }
    lookupNamespaceURI(...arg) {
        return this._element.lookupNamespaceURI.call(this._element,...arg);
    }
    normalize(...arg) {
        return this._element.normalize.call(this._element,...arg);
    }
    removeChild(...arg) {
        return this._element.removeChild.call(this._element,...arg);
    }
    replaceChild(...arg) {
        return this._element.replaceChild.call(this._element,...arg);
    }
    // contains(){
    //     return this._element.contains.call(this._element,...arg);
    // }

    get baseURI() {
        return this._element.baseURI;
    }
    get childNodes() {
        return this._element.childNodes;
    }
    get firstChild() {
        return this._element.firstChild;
    }
    get isConnected() {
        return this._element.isConnected;
    }
    get lastChild() {
        return this._element.lastChild;
    }
    get nextSibling() {
        return this._element.nextSibling;
    }
    get nodeName() {
        return this._element.nodeName;
    }
    get nodeType() {
        return this._element.nodeType;
    }
    get nodeValue() {
        return this._element.nodeValue;
    }
    set nodeValue(arg) {
        this._element.nodeValue = arg;
    }
    get ownerDocument() {
        return this._element.ownerDocument;
    }
    get parentNode() {
        return this._element.parentNode;
    }
    get parentElement() {
        return this._element.parentElement;
    }
    get previousSibling() {
        return this._element.previousSibling;
    }
    get textContent() {
        return this._element.textContent;
    }
    set textContent(arg) {
        this._element.textContent = arg;
    }
    //Element part

    addEventListener(...arg) {
        this._element.addEventListener.call(this._element,...arg);
    }
    after(...arg) {
        this._element.after.call(this._element,...arg);
    }
    attachShadow(...arg) {
        return this._element.attachShadow.call(this._element,...arg);
    }
    // animate(...arg){
    //     return this._element.animate.call(this._element,...arg);
    // }
    append(...arg) {
        this._element.append.call(this._element,...arg);
    }
    before(...arg) {
        this._element.before.call(this._element,...arg);
    }
    closest(...arg) {
        this._element.closest.call(this._element,...arg);
    }
    createShadowRoot(...arg) {
        return this._element.createShadowRoot.call(this._element,...arg);
    }
    computedStyleMap(...arg) {
        return this._element.computedStyleMap.call(this._element,...arg);
    }
    dispatchEvent(...arg) {
        return this._element.dispatchEvent.call(this._element,...arg);
    }
    getAnimations(...arg) {
        return this._element.getAnimations.call(this._element,...arg);
    }
    getAttribute(...arg) {
        return this._element.getAttribute.call(this._element,...arg);
    }
    getAttributeNames(...arg) {
        return this._element.getAttributeNames.call(this._element,...arg);
    }
    getAttributeNode(...arg) {
        return this._element.getAttributeNode.call(this._element,...arg);
    }
    getAttributeNodeNS(...arg) {
        return this._element.getAttributeNodeNS.call(this._element,...arg);
    }
    getAttributeNS(...arg) {
        return this._element.getAttributeNS.call(this._element,...arg);
    }
    getBoundingClientRect(...arg) {
        return this._element.getBoundingClientRect.call(this._element,...arg);
    }
    // getBoxQuads(...arg){
    //     return this._element.getBoxQuads.call(this._element,...arg);
    // }
    getClientRects(...arg) {
        return this._element.getClientRects.call(this._element,...arg);
    }
    getElementsByClassName(...arg) {
        return this._element.getElementsByClassName.call(this._element,...arg);
    }
    getElementsByTagName(...arg) {
        return this._element.getElementsByTagName.call(this._element,...arg);
    }
    getElementsByTagNameNS(...arg) {
        return this._element.getElementsByTagNameNS.call(this._element,...arg);
    }
    hasAttribute(...arg) {
        return this._element.hasAttribute.call(this._element,...arg);
    }
    hasAttributeNS(...arg) {
        return this._element.hasAttributeNS.call(this._element,...arg);
    }
    hasAttributes(...arg) {
        return this._element.hasAttributes.call(this._element,...arg);
    }
    hasPointerCapture(...arg) {
        return this._element.hasPointerCapture.call(this._element,...arg);
    }
    insertAdjacentElement(...arg) {
        return this._element.insertAdjacentElement.call(this._element,...arg);
    }
    insertAdjacentHTML(...arg) {
        return this._element.insertAdjacentHTML.call(this._element,...arg);
    }
    matches(...arg) {
        return this._element.matches.call(this._element,...arg);
    }
    prepend(...arg) {
        return this._element.prepend.call(this._element,...arg);
    }
    querySelector(...arg) {
        return this._element.querySelector.call(this._element,...arg);
    }
    querySelectorAll(...arg) {
        return this._element.querySelectorAll.call(this._element,...arg);
    }
    releasePointerCapture(...arg) {
        return this._element.releasePointerCapture.call(this._element,...arg);
    }
    remove(...arg) {
        return this._element.remove.call(this._element,...arg);
    }
    removeAttribute(...arg) {
        return this._element.removeAttribute.call(this._element,...arg);
    }
    removeAttributeNode(...arg) {
        return this._element.removeAttributeNode.call(this._element,...arg);
    }
    removeAttributeNS(...arg) {
        return this._element.removeAttributeNS.call(this._element,...arg);
    }
    removeEventListener(...arg) {
        return this._element.removeEventListener.call(this._element,...arg);
    }
    replaceChildren(...arg) {
        return this._element.replaceChildren.call(this._element,...arg);
    }
    replaceWith(...arg) {
        return this._element.replaceWith.call(this._element,...arg);
    }
    requestFullscreen(...arg) {
        return this._element.requestFullscreen.call(this._element,...arg);
    }
    requestPointerLock(...arg) {
        return this._element.requestPointerLock.call(this._element,...arg);
    }
    scroll(...arg) {
        return this._element.scroll.call(this._element,...arg);
    }
    scrollBy(...arg) {
        return this._element.scrollBy.call(this._element,...arg);
    }
    scrollIntoView(...arg) {
        return this._element.scrollIntoView.call(this._element,...arg);
    }
    scrollTo(...arg) {
        return this._element.scrollTo.call(this._element,...arg);
    }
    setAttribute(...arg) {
        return this._element.setAttribute.call(this._element,...arg);
    }
    setAttributeNode(...arg) {
        return this._element.setAttributeNode.call(this._element,...arg);
    }
    setAttributeNS(...arg) {
        return this._element.setAttributeNS.call(this._element,...arg);
    }
    setCapture(...arg) {
        return this._element.setCapture.call(this._element,...arg);
    }
    setPointerCapture(...arg) {
        return this._element.setPointerCapture.call(this._element,...arg);
    }
    toggleAttribute(...arg) {
        return this._element.toggleAttribute.call(this._element,...arg);
    }
    get assignedSlot() {
        return this._element.assignedSlot;
    }
    get attributes() {
        return this._element.attributes;
    }
    get childElementCount() {
        return this._element.childElementCount;
    }
    get children() {
        return this._element.children;
    }
    get classList() {
        return this._element.classList;
    }
    get className() {
        return this._element.className;
    }
    set className(arg) {
        this._element.className = arg;
    }
    get clientHeight() {
        return this._element.clientHeight;
    }
    get clientLeft() {
        return this._element.clientLeft;
    }
    get clientTop() {
        return this._element.clientTop;
    }
    get clientWidth() {
        return this._element.clientWidth;
    }
    get firstElementChild() {
        return this._element.firstElementChild;
    }
    get id() {
        return this._element.id;
    }
    set id(arg) {
        this._element.id = arg;
    }
    get innerHTML() {
        return this._element.innerHTML;
    }
    set innerHTML(arg) {
        return this._element.innerHTML = arg;
    }
    get lastElementChild() {
        return this._element.lastElementChild;
    }
    get localName() {
        return this._element.localName;
    }
    get namespaceURI() {
        return this._element.namespaceURI;
    }
    get nextElementSibling() {
        return this._element.nextElementSibling;
    }
    get outerHTML() {
        return this._element.outerHTML;
    }
    set outerHTML(arg) {
        this._element.outerHTML = arg;
    }
    get part() {
        return this._element.part;
    }
    set part(arg) {
        this._element.part = arg;
    }
    get prefix() {
        return this._element.prefix;
    }
    get previousElementSibling() {
        return this._element.previousElementSibling;
    }
    get scrollHeight() {
        return this._element.scrollHeight;
    }
    get scrollLeft() {
        return this._element.scrollLeft;
    }
    set scrollLeft(arg) {
        this._element.scrollLeft = arg;
    }
    get scrollLeftMax() {
        return this._element.scrollLeftMax;
    }
    get scrollTop() {
        return this._element.scrollTop;
    }
    set scrollTop(arg) {
        this._element.scrollTop = arg;
    }
    get scrollTopMax() {
        return this._element.scrollTopMax;
    }
    get scrollWidth() {
        return this._element.scrollWidth;
    }
    get shadowRoot() {
        return this._element.shadowRoot;
    }
    get openOrClosedShadowRoot() {
        return this._element.openOrClosedShadowRoot;
    }
    get setHTML() {
        return this._element.setHTML;
    }
    set setHTML(arg) {
        this._element.setHTML = arg;
    }
    get slot() {
        return this._element.slot;
    }
    set slot(arg) {
        this._element.slot = arg;
    }
    get tagName() {
        return this._element.tagName;
    }
    //HTMLElement part

    attachInternals(...arg) {
        return this._element.attachInternals.call(this._element,...arg);
    }
    blur(...arg) {
        return this._element.blur.call(this._element,...arg);
    }
    click(...arg) {
        return this._element.click.call(this._element,...arg);
    }
    focus(...arg) {
        return this._element.focus.call(this._element,...arg);
    }
    get accessKey() {
        return this._element.accessKey;
    }
    set accessKey(arg) {
        this._element.accessKey = arg;
    }
    get accessKeyLabel() {
        return this._element.accessKeyLabel;
    }
    get attributeStyleMap() {
        return this._element.attributeStyleMap;
    }
    get contentEditable() {
        return this._element.contentEditable;
    }
    set contentEditable(arg) {
        this._element.contentEditable = arg;
    }
    get isContentEditable() {
        return this._element.isContentEditable;
    }
    get contextMenu() {
        return this._element.contextMenu;
    }
    set contextMenu(arg) {
        this._element.contextMenu = arg;
    }
    get dataset() {
        return this._element.dataset;
    }
    get dir() {
        return this._element.dir;
    }
    set dir(arg) {
        this._element.dir = arg;
    }
    get draggable() {
        return this._element.draggable;
    }
    set draggable(arg) {
        this._element.draggable = arg;
    }
    get enterkeyhint() {
        return this._element.enterkeyhint;
    }
    set enterkeyhint(arg) {
        this._element.enterkeyhint = arg;
    }
    get hidden() {
        return this._element.hidden;
    }
    set hidden(arg) {
        this._element.hidden = arg;
    }
    get inert() {
        return this._element.inert;
    }
    set inert(arg) {
        this._element.inert = arg;
    }
    get innerText() {
        return this._element.innerText;
    }
    set innerText(arg) {
        this._element.innerText = arg;
    }
    get itemScope() {
        return this._element.itemScope;
    }
    set itemScope(arg) {
        this._element.itemScope = arg;
    }
    get itemType() {
        return this._element.itemType;
    }
    get itemId() {
        return this._element.itemId;
    }
    set itemId(arg) {
        this._element.itemId = arg;
    }
    get itemRef() {
        return this._element.itemRef;
    }
    get itemProp() {
        return this._element.itemProp;
    }
    get itemValue() {
        return this._element.itemValue;
    }
    set itemValue(arg) {
        this._element.itemValue = arg;
    }
    get lang() {
        return this._element.lang;
    }
    set lang(arg) {
        this._element.lang = arg;
    }
    get noModule() {
        return this._element.noModule;
    }
    set noModule(arg) {
        this._element.noModule = arg;
    }
    get nonce() {
        return this._element.nonce;
    }
    set nonce(arg) {
        this._element.nonce = arg;
    }
    get offsetHeight() {
        return this._element.offsetHeight;
    }
    get offsetLeft() {
        return this._element.offsetLeft;
    }
    get offsetParent() {
        return this._element.offsetParent;
    }
    get offsetTop() {
        return this._element.offsetTop;
    }
    get offsetWidth() {
        return this._element.offsetWidth;
    }
    get properties() {
        return this._element.properties;
    }
    get spellcheck() {
        return this._element.spellcheck;
    }
    set spellcheck(arg) {
        this._element.spellcheck = arg;
    }
    get style() {
        return this._element.style;
    }
    set style(arg) {
        this._element.style = arg;
    }
    get tabIndex() {
        return this._element.tabIndex;
    }
    set tabIndex(arg) {
        this._element.tabIndex = arg;
    }
    get title() {
        return this._element.title;
    }
    set title(arg) {
        this._element.title = arg;
    }
    get translate() {
        return this._element.translate;
    }
    set translate(arg) {
        this._element.translate = arg;
    }
    //HTMLDivElementProxy part

    get align() {
        return this._element.align;
    }
    set align(arg) {
        this._element.align = arg;
    }
}
export default HTMLDivElementProxy;