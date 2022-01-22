
type skillType = 'active' | 'trigger' | 'regard' | 'mark' | 'rule'	//技能类型：主动、触发、半主动|视为、状态|纯标记、规则相关
class toSkill implements Skill {
	readonly type: skillType
	audio?: number | boolean
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
	setT(tri: Keymap | Array<string> | string, method?: Array<string> | string) {
		if (typeof tri === 'string') tri = [tri]
		if (tri instanceof Array) tri = { player: tri }
		for (let i in tri) {
			if (!Array.isArray(tri[i])) {
				tri[i] = [tri[i] as string]
			}
		}
		if (method instanceof Array) {
			for (let i in tri) {
				let v = tri[i]
				if (!Array.isArray(v)) {
					tri[i] = [v]
				}
				let vb = tri[i]
				if (vb instanceof Array) {
					tri[i] = vb.map(t => {
						return method.map(m => t + m)
					}).vkflat()
				}
			}
		} else if (typeof method === 'string') {
			for (let i in tri) {
				let v = tri[i]
				if (!Array.isArray(v)) {
					tri[i] = [v]
				}
				let vb = tri[i]
				if (vb instanceof Array) {
					tri[i] = vb.map(t => {
						return t + method
					})
				}
			}
		}
		return this.set('trigger', { ...this.trigger, ...tri })
	}
	constructor(type: skillType, obj?: Skill, ...arg) {
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