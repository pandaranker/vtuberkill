moduleManager.define([], function() {
    /**
     * HTMLDivElement代理类
     * @class HTMLDivElementProxy
     * @global
     */
    class HTMLDivElementProxy {
        #element;
        get element() {
            return this.#element;
        }
        
        constructor(element) {
            this.#element = element;
        }
        //vtuberkill part

        /**
         * 本元素播放动画
         * @function HTMLDivElement#animate
         * @param {string} name - 动画名称
         * @param {number} [time=1000] - 动画持续时间（ms）
         * @returns {HTMLDivElement} this self
         */
        animate(name, time) {
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
         * @function HTMLDivElement#hide
         * @returns {HTMLDivElement} this self
         */
        hide() {
            this.classList.add('hidden');
            return this;
        }
        /**
         * 本元素取消焦点
         * @function HTMLDivElement#unfocus
         * @returns {HTMLDivElement} this self
         */
        unfocus() {
            if (lib.config.transparent_dialog) this.classList.add('transparent');
            return this;
        }
        /**
         * 本元素重获焦点
         * @function HTMLDivElement#refocus
         * @returns {HTMLDivElement} this self
         */
        refocus() {
            this.classList.remove('transparent');
            return this;
        }
        /**
         * 本元素取消隐藏
         * @function HTMLDivElement#show
         * @returns {HTMLDivElement} this self
         */
        show() {
            this.classList.remove('hidden');
            return this;
        }
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
        delete(time, callback) {
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
         * @function HTMLDivElement#goto
         * @param {*} position - 位置
         * @param {number} time - 持续时间
         * @returns {HTMLDivElement} this self
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
         * @function HTMLDivElement#fix
         * @returns {HTMLDivElement} this self
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
         * @function HTMLDivElement#setBackground
         * @param {string} [name] - 图片名（无后缀）
         * @param {string} [type] - 类型对应路径
         * @param {string} [ext='.jpg'] - 图片后缀
         * @param {string} [subfolder='default'] - 类型文件夹下的子路径，仅在参数`type`指定值时有效
         * @returns {?HTMLDivElement} this self
         */
        setBackground(name, type, ext, subfolder) {
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
         * @function HTMLDivElement#setBackgroundDB
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
         * @function HTMLDivElement#setBackgroundImage
         * @param {string} img - 图片相对{@link lib.assetURL|assertURL}路径
         */
        setBackgroundImage(img) {
            this.style.backgroundImage = 'url("' + lib.assetURL + img + '")';
        }
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
         * @function HTMLDivElement#css
         * @param {Object} style - style
         * @param {string} [style.innerHTML] - 设置本元素内部HTML
         * @param {...string} [style.cssProperty] - 设置任意数量的css属性。{@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference|cssProperty}
         * @returns {HTMLDivElement} this self
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

        appendChild() {
            return this.#element.appendChild(...arguments);
        }
        cloneNode() {
            return this.#element.cloneNode(...arguments);
        }
        compareDocumentPosition() {
            return this.#element.compareDocumentPosition(...arguments);
        }
        getBoxQuads() {
            return this.#element.getBoxQuads(...arguments);
        }
        getRootNode() {
            return this.#element.getRootNode(...arguments);
        }
        hasChildNodes() {
            return this.#element.hasChildNodes(...arguments);
        }
        insertBefore() {
            return this.#element.insertBefore(...arguments);
        }
        isDefaultNamespace() {
            return this.#element.isDefaultNamespace(...arguments);
        }
        isEqualNode() {
            return this.#element.isEqualNode(...arguments);
        }
        isSameNode() {
            return this.#element.isSameNode(...arguments);
        }
        lookupPrefix() {
            return this.#element.lookupPrefix(...arguments);
        }
        lookupNamespaceURI() {
            return this.#element.lookupNamespaceURI(...arguments);
        }
        normalize() {
            return this.#element.normalize(...arguments);
        }
        removeChild() {
            return this.#element.removeChild(...arguments);
        }
        replaceChild() {
            return this.#element.replaceChild(...arguments);
        }
        // contains(){
        //     return this.#element.contains(...arguments);
        // }

        get baseURI() {
            return this.#element.baseURI;
        }
        get childNodes() {
            return this.#element.childNodes;
        }
        get firstChild() {
            return this.#element.firstChild;
        }
        get isConnected() {
            return this.#element.isConnected;
        }
        get lastChild() {
            return this.#element.lastChild;
        }
        get nextSibling() {
            return this.#element.nextSibling;
        }
        get nodeName() {
            return this.#element.nodeName;
        }
        get nodeType() {
            return this.#element.nodeType;
        }
        get nodeValue() {
            return this.#element.nodeValue;
        }
        set nodeValue(arg) {
            this.#element.nodeValue = arg;
        }
        get ownerDocument() {
            return this.#element.ownerDocument;
        }
        get parentNode() {
            return this.#element.parentNode;
        }
        get parentElement() {
            return this.#element.parentElement;
        }
        get previousSibling() {
            return this.#element.previousSibling;
        }
        get textContent() {
            return this.#element.textContent;
        }
        set textContent(arg) {
            this.#element.textContent = arg;
        }
        //Element part

        addEventListener() {
            this.#element.addEventListener(...arguments);
        }
        after() {
            this.#element.after(...arguments);
        }
        attachShadow() {
            return this.#element.attachShadow(...arguments);
        }
        // animate(){
        //     return this.#element.animate(...arguments);
        // }
        append() {
            this.#element.append(...arguments);
        }
        before() {
            this.#element.before(...arguments);
        }
        closest() {
            this.#element.closest(...arguments);
        }
        createShadowRoot() {
            return this.#element.createShadowRoot(...arguments);
        }
        computedStyleMap() {
            return this.#element.computedStyleMap(...arguments);
        }
        dispatchEvent() {
            return this.#element.dispatchEvent(...arguments);
        }
        getAnimations() {
            return this.#element.getAnimations(...arguments);
        }
        getAttribute() {
            return this.#element.getAttribute(...arguments);
        }
        getAttributeNames() {
            return this.#element.getAttributeNames(...arguments);
        }
        getAttributeNode() {
            return this.#element.getAttributeNode(...arguments);
        }
        getAttributeNodeNS() {
            return this.#element.getAttributeNodeNS(...arguments);
        }
        getAttributeNS() {
            return this.#element.getAttributeNS(...arguments);
        }
        getBoundingClientRect() {
            return this.#element.getBoundingClientRect(...arguments);
        }
        // getBoxQuads(){
        //     return this.#element.getBoxQuads(...arguments);
        // }
        getClientRects() {
            return this.#element.getClientRects(...arguments);
        }
        getElementsByClassName() {
            return this.#element.getElementsByClassName(...arguments);
        }
        getElementsByTagName() {
            return this.#element.getElementsByTagName(...arguments);
        }
        getElementsByTagNameNS() {
            return this.#element.getElementsByTagNameNS(...arguments);
        }
        hasAttribute() {
            return this.#element.hasAttribute(...arguments);
        }
        hasAttributeNS() {
            return this.#element.hasAttributeNS(...arguments);
        }
        hasAttributes() {
            return this.#element.hasAttributes(...arguments);
        }
        hasPointerCapture() {
            return this.#element.hasPointerCapture(...arguments);
        }
        insertAdjacentElement() {
            return this.#element.insertAdjacentElement(...arguments);
        }
        insertAdjacentHTML() {
            return this.#element.insertAdjacentHTML(...arguments);
        }
        matches() {
            return this.#element.matches(...arguments);
        }
        prepend() {
            return this.#element.prepend(...arguments);
        }
        querySelector() {
            return this.#element.querySelector(...arguments);
        }
        querySelectorAll() {
            return this.#element.querySelectorAll(...arguments);
        }
        releasePointerCapture() {
            return this.#element.releasePointerCapture(...arguments);
        }
        remove() {
            return this.#element.remove(...arguments);
        }
        removeAttribute() {
            return this.#element.removeAttribute(...arguments);
        }
        removeAttributeNode() {
            return this.#element.removeAttributeNode(...arguments);
        }
        removeAttributeNS() {
            return this.#element.removeAttributeNS(...arguments);
        }
        removeEventListener() {
            return this.#element.removeEventListener(...arguments);
        }
        replaceChildren() {
            return this.#element.replaceChildren(...arguments);
        }
        replaceWith() {
            return this.#element.replaceWith(...arguments);
        }
        requestFullscreen() {
            return this.#element.requestFullscreen(...arguments);
        }
        requestPointerLock() {
            return this.#element.requestPointerLock(...arguments);
        }
        scroll() {
            return this.#element.scroll(...arguments);
        }
        scrollBy() {
            return this.#element.scrollBy(...arguments);
        }
        scrollIntoView() {
            return this.#element.scrollIntoView(...arguments);
        }
        scrollTo() {
            return this.#element.scrollTo(...arguments);
        }
        setAttribute() {
            return this.#element.setAttribute(...arguments);
        }
        setAttributeNode() {
            return this.#element.setAttributeNode(...arguments);
        }
        setAttributeNS() {
            return this.#element.setAttributeNS(...arguments);
        }
        setCapture() {
            return this.#element.setCapture(...arguments);
        }
        setPointerCapture() {
            return this.#element.setPointerCapture(...arguments);
        }
        toggleAttribute() {
            return this.#element.toggleAttribute(...arguments);
        }
        get assignedSlot() {
            return this.#element.assignedSlot;
        }
        get attributes() {
            return this.#element.attributes;
        }
        get childElementCount() {
            return this.#element.childElementCount;
        }
        get children() {
            return this.#element.children;
        }
        get classList() {
            return this.#element.classList;
        }
        get className() {
            return this.#element.className;
        }
        set className(arg) {
            this.#element.className = arg;
        }
        get clientHeight() {
            return this.#element.clientHeight;
        }
        get clientLeft() {
            return this.#element.clientLeft;
        }
        get clientTop() {
            return this.#element.clientTop;
        }
        get clientWidth() {
            return this.#element.clientWidth;
        }
        get firstElementChild() {
            return this.#element.firstElementChild;
        }
        get id() {
            return this.#element.id;
        }
        set id(arg) {
            this.#element.id = arg;
        }
        get innerHTML() {
            return this.#element.innerHTML;
        }
        set innerHTML(arg) {
            return this.#element.innerHTML = arg;
        }
        get lastElementChild() {
            return this.#element.lastElementChild;
        }
        get localName() {
            return this.#element.localName;
        }
        get namespaceURI() {
            return this.#element.namespaceURI;
        }
        get nextElementSibling() {
            return this.#element.nextElementSibling;
        }
        get outerHTML() {
            return this.#element.outerHTML;
        }
        set outerHTML(arg) {
            this.#element.outerHTML = arg;
        }
        get part() {
            return this.#element.part;
        }
        set part(arg) {
            this.#element.part = arg;
        }
        get prefix() {
            return this.#element.prefix;
        }
        get previousElementSibling() {
            return this.#element.previousElementSibling;
        }
        get scrollHeight() {
            return this.#element.scrollHeight;
        }
        get scrollLeft() {
            return this.#element.scrollLeft;
        }
        set scrollLeft(arg) {
            this.#element.scrollLeft = arg;
        }
        get scrollLeftMax() {
            return this.#element.scrollLeftMax;
        }
        get scrollTop() {
            return this.#element.scrollTop;
        }
        set scrollTop(arg) {
            this.#element.scrollTop = arg;
        }
        get scrollTopMax() {
            return this.#element.scrollTopMax;
        }
        get scrollWidth() {
            return this.#element.scrollWidth;
        }
        get shadowRoot() {
            return this.#element.shadowRoot;
        }
        get openOrClosedShadowRoot() {
            return this.#element.openOrClosedShadowRoot;
        }
        get setHTML() {
            return this.#element.setHTML;
        }
        set setHTML(arg) {
            this.#element.setHTML = arg;
        }
        get slot() {
            return this.#element.slot;
        }
        set slot(arg) {
            this.#element.slot = arg;
        }
        get tagName() {
            return this.#element.tagName;
        }
        //HTMLElement part

        attachInternals() {
            return this.#element.attachInternals(...arguments);
        }
        blur() {
            return this.#element.blur(...arguments);
        }
        click() {
            return this.#element.click(...arguments);
        }
        focus() {
            return this.#element.focus(...arguments);
        }
        get accessKey() {
            return this.#element.accessKey;
        }
        set accessKey(arg) {
            this.#element.accessKey = arg;
        }
        get accessKeyLabel() {
            return this.#element.accessKeyLabel;
        }
        get attributeStyleMap() {
            return this.#element.attributeStyleMap;
        }
        get contentEditable() {
            return this.#element.contentEditable;
        }
        set contentEditable(arg) {
            this.#element.contentEditable = arg;
        }
        get isContentEditable() {
            return this.#element.isContentEditable;
        }
        get contextMenu() {
            return this.#element.contextMenu;
        }
        set contextMenu(arg) {
            this.#element.contextMenu = arg;
        }
        get dataset() {
            return this.#element.dataset;
        }
        get dir() {
            return this.#element.dir;
        }
        set dir(arg) {
            this.#element.dir = arg;
        }
        get draggable() {
            return this.#element.draggable;
        }
        set draggable(arg) {
            this.#element.draggable = arg;
        }
        get enterkeyhint() {
            return this.#element.enterkeyhint;
        }
        set enterkeyhint(arg) {
            this.#element.enterkeyhint = arg;
        }
        get hidden() {
            return this.#element.hidden;
        }
        set hidden(arg) {
            this.#element.hidden = arg;
        }
        get inert() {
            return this.#element.inert;
        }
        set inert(arg) {
            this.#element.inert = arg;
        }
        get innerText() {
            return this.#element.innerText;
        }
        set innerText(arg) {
            this.#element.innerText = arg;
        }
        get itemScope() {
            return this.#element.itemScope;
        }
        set itemScope(arg) {
            this.#element.itemScope = arg;
        }
        get itemType() {
            return this.#element.itemType;
        }
        get itemId() {
            return this.#element.itemId;
        }
        set itemId(arg) {
            this.#element.itemId = arg;
        }
        get itemRef() {
            return this.#element.itemRef;
        }
        get itemProp() {
            return this.#element.itemProp;
        }
        get itemValue() {
            return this.#element.itemValue;
        }
        set itemValue(arg) {
            this.#element.itemValue = arg;
        }
        get lang() {
            return this.#element.lang;
        }
        set lang(arg) {
            this.#element.lang = arg;
        }
        get noModule() {
            return this.#element.noModule;
        }
        set noModule(arg) {
            this.#element.noModule = arg;
        }
        get nonce() {
            return this.#element.nonce;
        }
        set nonce(arg) {
            this.#element.nonce = arg;
        }
        get offsetHeight() {
            return this.#element.offsetHeight;
        }
        get offsetLeft() {
            return this.#element.offsetLeft;
        }
        get offsetParent() {
            return this.#element.offsetParent;
        }
        get offsetTop() {
            return this.#element.offsetTop;
        }
        get offsetWidth() {
            return this.#element.offsetWidth;
        }
        get properties() {
            return this.#element.properties;
        }
        get spellcheck() {
            return this.#element.spellcheck;
        }
        set spellcheck(arg) {
            this.#element.spellcheck = arg;
        }
        get style() {
            return this.#element.style;
        }
        set style(arg) {
            this.#element.style = arg;
        }
        get tabIndex() {
            return this.#element.tabIndex;
        }
        set tabIndex(arg) {
            this.#element.tabIndex = arg;
        }
        get title() {
            return this.#element.title;
        }
        set title(arg) {
            this.#element.title = arg;
        }
        get translate() {
            return this.#element.translate;
        }
        set translate(arg) {
            this.#element.translate = arg;
        }
        //HTMLDivElement part

        get align() {
            return this.#element.align;
        }
        set align(arg) {
            this.#element.align = arg;
        }
    }
    return HTMLDivElementProxy;
})