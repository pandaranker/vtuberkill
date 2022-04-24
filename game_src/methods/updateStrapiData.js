{
    let { game, ui, get, ai, lib, _status } = window.vkCore
    lib.updateStrapiData = {
        /**
         * 查询网络数据库中是否存在角色
         * @param {String} name 角色的name
         */
        searchCharacter: async function (name) {
            let getData = -1
            if (lib.character[name]) {
                await fetch('https://data.vtuberkill.com/characters?name=' + name, { method: 'get', headers: { 'Content-Type': 'application/json' } })
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            getData = data[0];
                        }
                        else {
                            getData = -1;
                        }
                    }).catch((error) => {
                        console.log(error);
                        return false;
                    })
                return getData
            }
            else return -1
        },
        /**
         * 查询是否存在技能
         * @param {String} name 技能的name
         */
        searchSkill: async function (name) {
            let getData = -1
            await fetch('https://data.vtuberkill.com/skills?skillname=' + name, { method: 'get', headers: { 'Content-Type': 'application/json' } })
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        getData = data[0]
                    }
                    else
                        getData = -1
                }).catch((error) => {
                    console.log(error);
                    return false;
                })
            return getData
        },
        /**
         * 获得提供上传的skill结构
         * 
         * @param {String} name 技能name
         * @returns 
         */
        getSkill: function (name) {
            return {
                skillname: name,
                skillnameTrans: get.translation(name),
                skillDescription: get.translation(name + '_info'),
            }
        },
        /**
         * 根据当前客户端skill更新数据库中skill，但如果不存在，则会自动创建skill
         * 
         * @param {String} name 技能的唯一name
         * @returns 返回数据库中skillID
         */
        updateSkill: async function (name) {
            let getDataBase = -1
            let skillID = -1
            let updateSkillReturn = null
            let updateData = this.getSkill(name)
            getDataBase = await this.searchSkill(name)
            if (getDataBase !== -1) {
                await fetch('https://data.vtuberkill.com/skills/' + getDataBase.id, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.id) {
                            updateSkillReturn = data
                            skillID = data.id
                        }
                    }).catch((error) => {
                        console.log(error);
                        return false;
                    })
            }
            else {
                skillID = this.createSkill(name)
            }
            // await fetch('https://data.vtuberkill.com/skills?skillname='+name,{method:'update',headers:{'Content-Type':'application/json'}})
            // .then(response => response.json())
            // .then(data => {
            //     if(data.length > 0){
            //         getData = data
            //     }
            //     else
            //         getData = -1
            // }).catch((error)=>{
            //     console.log(error);
            //     return false;
            // })
            return skillID
        },
        /**
         * 更新一条角色数据，若不存在则创建一条角色数据
         * @param {String} name 唯一的name
         */
        updateCharacter: async function (name) {
            let characterInDataBase = await this.searchCharacter(name)
            let updateCharacterReturn = -1
            let characterId = characterInDataBase.id
            if (characterInDataBase !== -1) {
                var character = await this.getCharacter(name)
                if (character !== -1) {
                    for (let skillNumber = 0; skillNumber < character.skills.length; skillNumber++) {
                        character.skillsIdList[skillNumber] = await this.updateSkill(character.skills[skillNumber])
                    }
                    character.skills = character.skillsIdList
                    await fetch('https://data.vtuberkill.com/characters/' + characterId, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(character)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.id) {
                                updateCharacterReturn = data
                                characterId = data.id
                            }
                        }).catch((error) => {
                            console.log(error);
                            return false;
                        })
                }
            }
            else {
                characterId = await this.createCharacter(name)
            }
            return characterId
        },
        updateCharacters(...names) {
            if (names.length === 0) {
                let names = []
                for (let v in lib.character) {
                    if (lib.translate[v] && lib.character[v][3] instanceof Array) {
                        names.push(v)
                    }
                }
                names.forEach(name => this.updateCharacter(name))
            }
            else {
                names.forEach(name => this.updateCharacter(name))
            }
        },
        /**
         * 为防止同名元素，请注意该方法最好不要在控制台调用，无论创建或更新请调用updateCharacter，核实库中不存在重名元素
         * @param {String} name 
         * @returns 创建出来的character的id
         */
        createCharacter: async function (name) {
            var character = await this.getCharacter(name)
            var characterId = -1
            if (character !== -1) {
                for (let skillNumber = 0; skillNumber < character.skills.length; skillNumber++) {
                    character.skillsIdList[skillNumber] = await this.updateSkill(character.skills[skillNumber])
                }
                character.skills = character.skillsIdList
                await fetch('https://data.vtuberkill.com/characters/', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(character)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.id) {
                            characterId = data.id
                        }
                    }).catch((error) => {
                        console.log(error);
                        return false;
                    })
            }
            return characterId
        },
        /**
         * 创建skill并返回ID
         * @param {String} name Skill唯一的name 
         * @returns 
         */
        createSkill: async function (name) {
            let updateData = this.getSkill(name)
            let createSkillReturn = -1
            let skillID = -1
            await fetch('https://data.vtuberkill.com/skills/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        createSkillReturn = data
                        skillID = data.id
                    }
                }).catch((error) => {
                    console.log(error);
                    return false;
                })
            return skillID
        },
        /**
         * 获取角色信息
         * @param {string} name 
         */
        getCharacter: async function (name) {
            let skillsIdList = []
            if (lib.character[name]) {
                var characterEntity = {
                    country: lib.character[name][1],
                    sex: lib.character[name][0],
                    hp: lib.character[name][2],
                    name: name,
                    transName: get.translation(name),
                    skills: lib.character[name][3],
                    skillsIdList: []
                }
                for (let skillNumber = 0; skillNumber < characterEntity.skills.length; skillNumber++) {
                    await this.searchSkill(characterEntity.skills[skillNumber]).then(res => {
                        skillsIdList.push(res.id)
                    })
                }
                characterEntity.skillsIdList = skillsIdList
                if (typeof (characterEntity.hp) == 'string') { // 因暂时字段不支持类似3/4的血量，所以暂时标定最后一个字符为
                    characterEntity.hp = Number(characterEntity.hp.charAt(characterEntity.hp.length - 1))
                    if (characterEntity.hp == NaN) {
                        characterEntity.hp = 0
                    }
                }
                return characterEntity
            }
            else {
                console.log('未找到' + name + '请确认输入name正确，或当前未打开所有武将包')
                return -1
            }
        },
        getAllCharacters: function () {
            var charactersList = []
            for (let i in lib.character) {
                charactersList.push(i)
            }
            return charactersList
        },
        /**
         * 完全refresh并更新Character数据库，慎用
         */
        refreshAllCharacters: async function () {
            var allCharactersName = this.getAllCharacters()
            var errorList = []
            var returnData = -1
            for (let i = 0; i < allCharactersName.length; i++) {
                returnData = -1
                returnData = await this.updateCharacter(allCharactersName[i])
                if (returnData !== -1) {
                    console.log('更新完毕:', get.translation(allCharactersName[i]))
                    continue
                }
                else {
                    errorList.push(allCharactersName[i])
                    console.log('上传出错,错误对象：', get.translation(allCharactersName[i]))
                }
            }
            console.log('错误列表', errorList)
        }
    }
}
// var testclass ={
//     country: "nijisanji",
//     created_at: "2021-11-09T16:50:54.183Z",
//     hp: 3,
//     id: 10,
//     name: "re_MononobeAlice",
//     published_at: "2021-11-09T16:50:53.944Z",
//     records: null,
//     sex: "female",
//     skills: [{
//         created_at: "2021-11-09T16:16:21.261Z",
//         id: 22,
//         published_at: "2021-11-09T16:16:20.859Z",
//         skillDescription: "锁定技 当你失去装备区的一张牌后，你回复1点体力。当你的体力值减少后，你摸一张牌。",
//         skillType: "",
//         skillname: "tinenghuifu1",
//         skillnameTrans: "体能恢复",
//         updated_at: "2021-11-09T16:16:21.261Z"
//     }],
//     transName: "新·物述有栖",
//     updated_at: "2021-11-09T16:50:54.183Z",
//     winrate: null,
// }