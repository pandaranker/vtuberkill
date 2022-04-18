{
    const { game, ui, get, ai, lib, _status } = vkCore
    /**
     * dist 路径
     */
    const dist = () => lib.assetURL + 'dist'
    let data = {}
    game.main = {
        initCSS() {
            import('./main.less')
        },
        initData(cfg) {
            window.game = game;
            lib.init.js(dist(), ['card', 'character'], cfg.packLoaded, cfg.packLoaded);
        },
        createHome(cfg) {
            if (!Object.keys(lib.character).length) {
                this.initData(cfg)
            }
            this.initCSS()
            let home = ui.create.div('#home', document.body, () => { })

            data.home = home
            data.cfg = cfg
            this.createHome_top()
            this.createHome_right()
            this.createHome_bottom()
            console.log('stepG', home)
        },
        createHome_top(home = data.home, cfg = data.cfg) {
            let topHome = ui.create.div('#home-top', home, () => { })
            let personalAvatar = ui.create.div('#personal-avatar', topHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            personalAvatar.setBackground(lib.config.connect_avatar, 'character');
            let personalIdentify = ui.create.div('#personal-identify', topHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let personalIdentify_text = ui.create.div('.home-inner', personalIdentify)
            personalIdentify_text.innerHTML = `${get.connectNickname()}`
            let id = 2 + (8 - personalIdentify_text.innerHTML.length) * 0.4
            personalIdentify_text.style.fontSize = `${id > 0 ? id : 0.2}em`
            let personalWelcome = ui.create.div('#personal-welcome', topHome, () => {
                this.becomeHome()
            })
            let personalWelcome_text = ui.create.div('.home-inner', personalWelcome)
            personalWelcome_text.innerHTML = `欢迎${get.connectNickname() === '无名玩家' ? `来到V杀` : `回来~${get.connectNickname()}`}`
        },
        createHome_right(home = data.home, cfg = data.cfg) {
            let rightHome = ui.create.div('#home-right', home, () => { })
            let startGame = ui.create.div('#start-game', rightHome, () => {
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let startGame_text = ui.create.div('.home-inner', startGame)
            startGame_text.innerHTML = '开始游戏'
            let startConnect = ui.create.div('#start-connect', rightHome, () => {
                lib.init.init_startConnect(cfg)
                this.leaveHome()
            })
            let startConnect_text = ui.create.div('.home-inner', startConnect)
            startConnect_text.innerHTML = '联机大厅'
            let startConfig = ui.create.div('#start-config', rightHome, () => {
                ui.create.menu(['选项'], 123)
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
                lib.init.init_startGame(cfg)
                this.leaveHome()
            })
            let handbookGuide_text = ui.create.div('.home-inner', handbookGuide)
            handbookGuide_text.innerHTML = '新手引导'
            let handbookTutorial = ui.create.div('#handbook-tutorial', bottomHome, () => {
                lib.init.init_startGame(cfg)
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
            data.home.delete()
            data = {}
        },
        becomeHome(delay = 500, cfg = data.cfg) {
            if (data.home) {
                this.leaveHome()
            }
            setTimeout(() => this.createHome(cfg), delay)
        }
    }
}