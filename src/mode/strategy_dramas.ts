interface chara {
    ability:[number,number,number,number,number],
    characteristic?:string,
    skills:string[],
}
const testDrama = {
    recommendGroups:['group_RedC','group_xuyan','group_xuefeng'],
    factions:{
        group_RedC:{
            citys:['nanhai', 'jiaozhi', 'jiuzhen'],
            chara: {
                leader: 'AmemachiF',
                members: ['mibai','Ahab'],
            },
            config: {
                color: '#843e65'
            }
        },
        group_MiyaFam:{
            citys:['changsha'],
            chara: {
                leader: 'Miya',
                members: [''],
            },
            config: {
                color: '#f1c44b'
            }
        },
        group_ego:{
            citys:['wuling'],
            chara: {
                leader: 'UsakiNono',
                members: [''],
            },
            config: {
                color: '#d88db7'
            }
        },
        group_xuyan:{
            citys:['chaisang'],
            chara: {
                leader: 'XiaoxiXiaotao',
                members: [''],
            },
            config: {
                color: '#d6ce6d'
            }
        },
        group_xuefeng:{
            citys:['lujiang', 'runan'],
            chara: {
                leader: 'xiaoxiayu',
                members: ['tianxixi','shenxiaoya','iiivan'],
            },
            config: {
                color: '#a893c8'
            }
        },
        group_chaos:{
            citys:['xiangyang', 'jiangling', 'jiangxia', 'xinye'],
            chara: {
                leader: 'Zaodaoji',
                members: ['ByakuyaMayoi','Niuniuzi','Mamoru'],
            },
            config: {
                color: '#76d7dc'
            }
        },
        group_NetEase:{
            citys:['guangling'],
            chara: {
                leader: 'zhongguobanai',
                members: ['Menherachan','RIKO','YamaUsagi'],
            },
            config: {
                color: '#ff6868'
            }
        },
        group_chidori:{
            citys:['kuaiji'],
            chara: {
                leader: 'airuisi',
                members: [''],
            },
            config: {
                color: '#dc569c'
            }
        },
        group_azhun:{
            citys:['jianye'],
            chara: {
                leader: 'azhun',
                members: [],
            },
            config: {
                color: '#85add6'
            }
        },
        group_bingtang:{
            citys:['wu'],
            chara: {
                leader: 'bingtang',
                members: ['zhangjinghua'],
            },
            config: {
                color: '#b48469'
            }
        },
    },
    unions:{
        iceFire:{
            name:'冰火联盟',
            type:'economic',
            members:['group_xuefeng','group_xuyan']
        }
    },
    charas:<{[key in string]:chara}>{
        //xuefeng
        xiaoxiayu:{
            ability:[7,7,8,8,5],
            characteristic:'虾皇',
            skills:['讲堂'],
        },
        tianxixi:{
            ability:[8,6,10,6,4],
            characteristic:'龟龟',
            skills:['主持'],
        },
        shenxiaoya:{
            ability:[7,5,11,7,9],
            characteristic:'SMG',
            skills:['记者'],
        },
        iiivan:{
            ability:[6,8,7,7,6],
            characteristic:'水龙',
            skills:['联动'],
        },
        //RedC
        AmemachiF:{
            ability:[6,8,4,7,6],
            skills:['杀手'],
        },
        Ahab:{
            ability:[8,5,7,6,7],
            skills:['警探','豪饮'],
        },
        mibai:{
            ability:[7,7,5,6,8],
            characteristic:'除魔',
            skills:[],
        },
        //azhun
        azhun:{
            ability:[6,8,7,5,6],
            characteristic:'天气预报',
            skills:['主持'],
        },
        //NetEase
        zhongguobanai:{
            ability:[6,6,5,8,3],
            characteristic:'4号爱',
            skills:[],
        },
        Menherachan:{
            ability:[5,7,4,9,4],
            skills:['日记'],
        },
        RIKO:{
            ability:[7,6,5,6,5],
            characteristic:'铁驭',
            skills:[],
        },
        YamaUsagi:{
            ability:[5,5,6,4,5],
            characteristic:'蛙蹈',
            skills:['萌兔'],
        },
    }
}
export default {
    testDrama
}