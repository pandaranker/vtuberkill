
type skillType = 'active' | 'trigger' | 'regard' | 'mark' | 'rule'	//技能类型：主动、触发、半主动|视为、状态|纯标记、规则相关
type skillAttribute = 'direct' | 'forced' | 'silent' | 'unique' | 'forceunique' | 'limited' | 'juexingji' | 'skillAnimation' | 'firstDo' | skillMark | skillAlwaysTrue
type skillMark = 'mark' | 'onremove' | 'cardAround'
type skillAlwaysTrue = 'locked' | 'filterCard' | 'filterTarget' | 'multitarget' | 'frequent'
type skillStringcombine = 'enable:chooseToUse' | 'logTarget:player' | 'logTarget:target' | 'mark:character' | 'mark:card'
class toSkill implements Skill {
	readonly type: skillType
	audio?: number | boolean
	init?: (PlayerModel,skill:string)=>void
	enable?: Keyword
	usable?: number
	group?: Keyword
	trigger?: Keymap
	content?: skillContent
	subSkill?: { [propName: string]: Skill }
	set(...arg) {
		for (let i = 0; i < arg.length; i++) {
			if (Array.isArray(arg[i])) this.set(...arg[i])
			else if (typeof arg[i] === 'string' && arg[i + 1] !== undefined) {
				this[arg[i]] = arg[i + 1]
			}
		}
		return this
	}
	setI(stor) {
		this.init = (player, skill) => {
			player.$[skill] ??= JSON.parse(JSON.stringify(stor));
		}
		return this
	}
	setT(tri: Keymap | Array<string> | string, method?: Array<string> | string) {
		if (typeof tri === 'string') tri = [tri]
		if (tri instanceof Array) tri = { player: tri }
		for (let i in tri) {
			if (!Array.isArray(tri[i])) {
				tri[i] = [tri[i] as string]
			}
		}
		for (let i in tri) {
			let v = tri[i]
			if (!Array.isArray(v)) {
				tri[i] = [v]
			}
			let vb = tri[i]
			if (vb instanceof Array) {
				if (method instanceof Array) {
					tri[i] = vb.map(t => {
						return method.map(m => t + m)
					}).vkflat()
				} else if (typeof method === 'string') {
					tri[i] = vb.map(t => {
						return t + method
					})
				}
			}
		}
		return this.set('trigger', { ...this.trigger, ...tri })
	}
	constructor(type: skillType, obj?: Skill, ...arg: Array<skillAttribute | skillStringcombine>) {
		this.type = type
		if (type === 'active') {
			this.enable = 'phaseUse'
		}
		for (let i in obj) {
			this[i] = obj[i]
		}
		for (let i of arg) {
			if (typeof i === 'string') {
				if (i.split(':').length == 2) {
					let v = i.split(':')
					this[v[0]] = v[1]
				}
				else this[i] = true
			}
		}
	}
}

export { toSkill }