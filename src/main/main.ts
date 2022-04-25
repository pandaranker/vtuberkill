/// <reference path = "../built-in.d.ts" />
{
    const { game, ui, get, ai, lib, _status } = window.vkCore
    /**
     * dist 路径
     */
    const dist = () => lib.assetURL + 'dist'
    let data: Record<string, any> = {}
    game.main = {
        initCSS() {
            require('./main.less')
        },
        initData(cfg, callback) {
            window.game = game;
            let func = () => {
                cfg.packLoaded()
                if (callback) {
                    callback()
                }
            }
            lib.init.js(dist(), ['card', 'character'], func, func);
        },
        createHome(cfg) {
            this.initCSS()
            cfg.gainLocalStorage(() => {
                this.initData(cfg, () => {
                    if (cfg.loadedTheme === false) {
                        cfg.loadTheme()
                    }
                })
            })
            let homeWindow = ui.create.div('#window.home-window', document.body)
            let home = ui.create.div('#home.themeA', homeWindow, () => { })

            data.home = home
            data.cfg = cfg
            let func = () => {
                if (cfg.loadedTheme === 'done') {
                    lib.init.onload_createBG()
                    this.createHome_top()
                }
                else {
                    setTimeout(func, 100)
                }
            }
            func()
            this.createHome_right()
            this.createHome_bottom()
            ui.window = homeWindow;
            ui.home = home
            ui.arena = home;

            lib.init.onload_updateZoom()
            // ui.window = ui.create.div('#window.hidden', document.body);
            // setTimeout(function () {
            //    ui.window.show();
            // }, 500);
        },
        createHome_top(home = data.home as HTMLDivElement, cfg = data.cfg) {
            let topHome = ui.create.div('#home-top', home, () => { })
            let playerName = get.connectNickname() === '无名玩家' ? '无名DD' : get.connectNickname()
            let personalAvatar = ui.create.div('#personal-avatar', topHome, () => {
                home.classList.toggle('themeA')
            })
            personalAvatar.setBackground(lib.config.connect_avatar, 'character');
            let personalIdentify = ui.create.div('#personal-identify', topHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let personalIdentify_text = ui.create.div('.home-inner', personalIdentify)
            personalIdentify_text.innerHTML = `${playerName}`
            let id = 2 + (8 - personalIdentify_text.innerHTML.length) * 0.4
            personalIdentify_text.style.fontSize = `${id > 0 ? id : 0.2}em`
            let personalWelcome = ui.create.div('#personal-welcome', topHome, () => {
                this.becomeHome()
            })
            let personalWelcome_text = ui.create.div('.home-inner', personalWelcome)
            personalWelcome_text.innerHTML = `欢迎${playerName === '无名DD' ? `来到V杀` : `回来~`}`
        },
        createHome_right(home = data.home, cfg = data.cfg) {
            let rightHome = ui.create.div('#home-right', home, () => { })
            let startGame = ui.create.div('#start-game', rightHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let startGame_text = ui.create.div('.home-inner', startGame)
            startGame_text.innerHTML = '开始游戏'

            let func = () => {
                if (cfg.loadedTheme === 'done') {
                    let modeList = ['identity', 'doudizhu', 'versus', 'guozhan', 'brawl']
                    let modeIndex = modeList.indexOf(lib.config.mode)
                    if (modeIndex === -1) modeIndex = 0
                    let startGame_mode = ui.create.div('#start-game-mode', startGame, (e) => {
                        game.saveConfig('mode', modeList[modeIndex]);
                        lib.init.init_startGame_Mode(cfg, modeList[modeIndex])
                        this.leaveHome()
                        e.stopPropagation();
                    })
                    let startGame_mode_text = ui.create.div('.home-inner', startGame_mode)
                    startGame_mode_text.innerHTML = get.$t(modeList[modeIndex])
                    let startGame_mode_change_left = ui.create.div('#start-game-mode-change', startGame_mode, (e) => {
                        if (modeIndex === 0) modeIndex = modeList.length
                        modeIndex--
                        startGame_mode_text.innerHTML = get.$t(modeList[modeIndex])
                        e.stopPropagation();
                    })
                    startGame_mode_change_left.innerHTML = '«'
                    let startGame_mode_change_right = ui.create.div('#start-game-mode-change', startGame_mode, (e) => {
                        modeIndex++
                        if (modeIndex === modeList.length) modeIndex = 0
                        startGame_mode_text.innerHTML = get.$t(modeList[modeIndex])
                        e.stopPropagation();
                    })
                    startGame_mode_change_right.innerHTML = '»'
                }
                else {
                    setTimeout(func, 200)
                }
            }
            func()

            let startConnect = ui.create.div('#start-connect', rightHome, () => {
                game.saveConfig('mode', 'connect');
                lib.init.init_startConnect(cfg)
                this.leaveHome()
            })
            let startConnect_text = ui.create.div('.home-inner', startConnect)
            startConnect_text.innerHTML = '联机大厅'

            let startConfig = ui.create.div('#start-config', rightHome, () => {
                if (!ui.click.configMenu) {
                    ui.create.menu(['基础', '演出', '其它'], 123, { center: true, noControl: true })
                }
                ui.click.configMenu()
            })
            let startConfig_text = ui.create.div('.home-inner', startConfig)
            startConfig_text.innerHTML = '设置'
        },
        createHome_bottom(home = data.home, cfg = data.cfg) {
            let bottomHome = ui.create.div('#home-bottom', home, () => { })
            let handbookHide = ui.create.div('#handbook-hide.button', bottomHome, () => {
                bottomHome.classList.toggle('hided')
            })
            let handbookHide_text = ui.create.div('.home-inner', handbookHide)
            handbookHide_text.innerHTML = '折叠'
            let handbookGuide = ui.create.div('#handbook-guide', bottomHome, () => {
                lib.init.init_startGame_Mode(cfg, 'yindao')
                this.leaveHome()
            })
            let handbookGuide_text = ui.create.div('.home-inner', handbookGuide)
            handbookGuide_text.innerHTML = '新手引导'
            let handbookTutorial = ui.create.div('#handbook-tutorial', bottomHome, () => {
                if (lib.config.new_tutorial) {
                    game.saveConfig('new_tutorial', false);
                }
                cfg.new_tutorial = true
                lib.init.init_startGame_Mode(cfg, 'identity')
                this.leaveHome()
            })
            let handbookTutorial_text = ui.create.div('.home-inner', handbookTutorial)
            handbookTutorial_text.innerHTML = '身份教程'
            let handbookCharacter = ui.create.div('#handbook-character', bottomHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let handbookCharacter_text = ui.create.div('.home-inner', handbookCharacter)
            handbookCharacter_text.innerHTML = '角色图鉴'
            let handbookCard = ui.create.div('#handbook-card', bottomHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let handbookCard_text = ui.create.div('.home-inner', handbookCard)
            handbookCard_text.innerHTML = '卡牌图鉴'
        },
        leaveHome() {
            console.log('stepG')
            data.home.delete()
            data = {}
            ui.window.delete();
            delete ui.window
            delete ui.home
            delete ui.arena
            setTimeout(ui.updatez, 120)
        },
        becomeHome(delay = 500, cfg = data.cfg) {
            if (data.home) {
                this.leaveHome()
            }
            setTimeout(() => this.createHome(cfg), delay)
        }
    }
}