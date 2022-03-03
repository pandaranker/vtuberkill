{
    lib.updateStrapiData = {
        /**
         * 查询网络数据库中是否存在角色
         * @param {*} name 角色的name
         */
        searchCharacter: async function(name) {
            if(lib.character[name]){
                await fetch('https://data.vtuberkill.com/characters?name='+name,{method:'get',headers:{'Content-Type':'application/json'}})
                .then(response => response.json())
                .then(data => {
                        if(data.length >0){
                            return true;
                        }
                        else{
                            return false;
                        }
                }).catch((error)=>{
                    console.log(error);
                    return false;
                })
            }
        },
        /**
         * 查询是否存在技能
         * @param {*} name 技能的name
         */
        searchSkill: async function(name) {
            await fetch('https://data.vtuberkill.com/skills?skillname='+name,{method:'get',headers:{'Content-Type':'application/json'}})
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                    if(data.length >0){
                        return true;
                    }
                    else{
                        return false;
                    }
            }).catch((error)=>{
                console.log(error);
                return false;
            })
        },
        updateSkill: async function(name){
            
        },
        /**
         * 更新角色数据
         * @param {*} param0 传入一个对象，包括属性country,hp,id,name,records,sex,skills,transName,winrate
         */
        updateCharacter: async function({country,hp,id,name,records,sex,skills,transName,winrate}){
            if((await this.searchCharacter(name))===true){
                if(lib.character[name]){
                    const skillsName = [];
                    const asyncTask = [];//需要处理的任务
                    const results = []; //处理结果
                    skills.forEach((values)=>{
                        skillsName.push(values.skillname)
                        asyncTask.push(this.searchSkill(values))
                    })
                    await Promise.all(asynctask).then((values)=>{
                        values.forEach((item)=>{
                            results.push(item);
                        })
                    })
                    if(results.every(value=>value)){

                    }else{

                    }
                }
            }
        },
        createCharacter: async function({country,hp,id,name,sex,skills,transName}){

        },
        /**
         * 获取角色信息
         * @param {string} name 
         */
        getCharacter: async function(name){
            if(lib.character[name]){
                var characterEntity = {
                    country: lib.character[name][1],
                    sex: lib.character[name][0],
                    hp: lib.character[name][2],
                    name:name,
                    transName:get.translation(name),
                    skills:lib.character[name][3]
                }
                characterEntity.skills.map(value1 => {
                    return {
                        skillname: value1,
                        skillnameTrans: get.translation(value1),
                        skillDescription: value1+'_info',
                        id: await searchSkill(value1)
                    }
                })
            }
            else{
                console.log('未找到'+ name +'请确认输入name正确，或当前未打开所有武将包')
            }
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