class Misson {
    name: string
    trans: string
    intro: string
    ceiling: number
    trigger: Object
    filter: (Evt: Object, player: Object) => boolean
    constructor(info) {
        this.name = info.name
        this.trans = info.trans
        this.intro = info.intro
        this.filter = info.filter
        if (info.trigger instanceof Object) {
            this.trigger = info.trigger
        }
        else {
            this.trigger = { player: info.trigger }
        }
        this.ceiling = info.ceil || 7
    }
}
module.exports = {
    missons: [
        new Misson({
            name: 'hetero',
            trans: '异性攻略',
            intro: '成为异性角色使用牌的目标',
            trigger: { source: 'useCardToTargeted' },
            filter(Evt, player) {
                return Evt.player.sex !== player.sex
            }
        }),
        new Misson({
            name: 'hetero',
            trans: '狂乱',
            intro: '受到无来源的伤害',
            trigger: { player: 'damageEnd' },
            filter(Evt, player) {
                return !Evt.source
            }
        }),
        new Misson({
            name: 'hetero',
            trans: '共鸣',
            intro: '使用7种不同的锦囊牌',
            trigger: { player: 'useCard2' },
            filter(Evt, player) {
                if (!player.storage._misson_record.length) {
                    let cardNames = player.storage._misson_record.map(evt => evt.card.name)
                    return !cardNames.includes(Evt.card.name)
                }
                return true
            }
        }),
        new Misson({
            name: 'hetero',
            trans: '协作',
            intro: '成为红色锦囊牌的目标',
            trigger: { source: 'useCardToTargeted' },
            filter(Evt, player) {
                return window.vkCore.get.color(Evt.card) === 'red'
            }
        }),
    ]
}