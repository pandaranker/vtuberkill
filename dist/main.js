/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main/main.js":
/*!**********************!*\
  !*** ./main/main.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("{\r\n    const { game, ui, get, ai, lib, _status } = vkCore\r\n    /**\r\n     * dist 路径\r\n     */\r\n    const dist = () => lib.assetURL + 'dist'\r\n    let data = {}\r\n    game.main = {\r\n        initCSS() {\r\n            __webpack_require__.e(/*! import() */ \"main_main_less\").then(__webpack_require__.bind(__webpack_require__, /*! ./main.less */ \"./main/main.less\"))\r\n        },\r\n        initData(cfg) {\r\n            window.game = game;\r\n            lib.init.js(dist(), ['card', 'character'], cfg.packLoaded, cfg.packLoaded);\r\n        },\r\n        createHome(cfg) {\r\n            if (!Object.keys(lib.character).length) {\r\n                this.initData(cfg)\r\n            }\r\n            this.initCSS()\r\n            let home = ui.create.div('#home', document.body, () => { })\r\n\r\n            data.home = home\r\n            data.cfg = cfg\r\n            this.createHome_top()\r\n            this.createHome_right()\r\n            this.createHome_bottom()\r\n            console.log('stepG', home)\r\n        },\r\n        createHome_top(home = data.home, cfg = data.cfg) {\r\n            let topHome = ui.create.div('#home-top', home, () => { })\r\n            let personalAvatar = ui.create.div('#personal-avatar', topHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            personalAvatar.setBackground(lib.config.connect_avatar, 'character');\r\n            let personalIdentify = ui.create.div('#personal-identify', topHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let personalIdentify_text = ui.create.div('.home-inner', personalIdentify)\r\n            personalIdentify_text.innerHTML = `${get.connectNickname()}`\r\n            let id = 2 + (8 - personalIdentify_text.innerHTML.length) * 0.4\r\n            personalIdentify_text.style.fontSize = `${id > 0 ? id : 0.2}em`\r\n            let personalWelcome = ui.create.div('#personal-welcome', topHome, () => {\r\n                this.becomeHome()\r\n            })\r\n            let personalWelcome_text = ui.create.div('.home-inner', personalWelcome)\r\n            personalWelcome_text.innerHTML = `欢迎${get.connectNickname() === '无名玩家' ? `来到V杀` : `回来~${get.connectNickname()}`}`\r\n        },\r\n        createHome_right(home = data.home, cfg = data.cfg) {\r\n            let rightHome = ui.create.div('#home-right', home, () => { })\r\n            let startGame = ui.create.div('#start-game', rightHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let startGame_text = ui.create.div('.home-inner', startGame)\r\n            startGame_text.innerHTML = '开始游戏'\r\n            let startConnect = ui.create.div('#start-connect', rightHome, () => {\r\n                lib.init.init_startConnect(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let startConnect_text = ui.create.div('.home-inner', startConnect)\r\n            startConnect_text.innerHTML = '联机大厅'\r\n            let startConfig = ui.create.div('#start-config', rightHome, () => {\r\n                ui.create.menu(['选项'], 123)\r\n            })\r\n            let startConfig_text = ui.create.div('.home-inner', startConfig)\r\n            startConfig_text.innerHTML = '设置'\r\n        },\r\n        createHome_bottom(home = data.home, cfg = data.cfg) {\r\n            let bottomHome = ui.create.div('#home-bottom', home, () => { })\r\n            let handbookHide = ui.create.div('#handbook-hide.button', bottomHome, () => {\r\n                bottomHome.classList.toggle('hided')\r\n            })\r\n            let handbookHide_text = ui.create.div('.home-inner', handbookHide)\r\n            handbookHide_text.innerHTML = '折叠'\r\n            let handbookGuide = ui.create.div('#handbook-guide', bottomHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let handbookGuide_text = ui.create.div('.home-inner', handbookGuide)\r\n            handbookGuide_text.innerHTML = '新手引导'\r\n            let handbookTutorial = ui.create.div('#handbook-tutorial', bottomHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let handbookTutorial_text = ui.create.div('.home-inner', handbookTutorial)\r\n            handbookTutorial_text.innerHTML = '身份教程'\r\n            let handbookCharacter = ui.create.div('#handbook-character', bottomHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let handbookCharacter_text = ui.create.div('.home-inner', handbookCharacter)\r\n            handbookCharacter_text.innerHTML = '角色图鉴'\r\n            let handbookCard = ui.create.div('#handbook-card', bottomHome, () => {\r\n                lib.init.init_startGame(cfg)\r\n                this.leaveHome()\r\n            })\r\n            let handbookCard_text = ui.create.div('.home-inner', handbookCard)\r\n            handbookCard_text.innerHTML = '卡牌图鉴'\r\n        },\r\n        leaveHome() {\r\n            data.home.delete()\r\n            data = {}\r\n        },\r\n        becomeHome(delay = 500, cfg = data.cfg) {\r\n            if (data.home) {\r\n                this.leaveHome()\r\n            }\r\n            setTimeout(() => this.createHome(cfg), delay)\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./main/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main/main.js");
/******/ 	
/******/ })()
;