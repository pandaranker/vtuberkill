'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'vtuber',
		connect:true,
        card:{
            qi:{
				fullskin:true,
				enable:true,
				type:'trick',
				toself:true,
				filterTarget:function(card,player,target){
					return true;
				},
				selectTarget:1,
				modTarget:true,
				content:function(){
                    'step 0'
                    if(!target.hasSkill('qi')){
                        target.addTempSkill('qi',{player:'phaseEnd'})
                    }
					'step 1'
                    if(target.isDamaged()){
                        target.changeHujia();
                    }
				},
				ai:{
					order:8.5,
					value:7,
					useful:3,
					result:{
						target:1
					}
				}
            }
        },
        skill:{
            qi:{},
		},
		translate:{
            qi: '气',
            qi_info: '',
			leisha: '雷杀',
			jiu:'酒',
			jiu_info:'出牌阶段，对自己使用，令自己的下一张使用的【杀】造成的伤害+1（每回合限使用1次）；濒死阶段，对自己使用，回复1点体力',
		},
		list:[
			["heart",4,"sha","ocean"],
			["heart",7,"sha","ocean"],
			["heart",10,"sha","ocean"],
			["diamond",4,"sha","ocean"],
			["diamond",5,"sha","ocean"],
			["spade",4,"sha","thunder"],
			["spade",5,"sha","thunder"],
			["spade",6,"sha","thunder"],
			["spade",7,"sha","thunder"],
			["spade",8,"sha","thunder"],
			["club",5,"sha","thunder"],
			["club",6,"sha","thunder"],
			["club",7,"sha","thunder"],
			["club",8,"sha","thunder"],
			["qi",8,"shan"],
			["heart",9,"shan"],
			["heart",11,"shan"],
			["heart",12,"shan"],
			["diamond",6,"shan"],
			["diamond",7,"shan"],
			["diamond",8,"shan"],
			["diamond",10,"shan"],
			["diamond",11,"shan"],
			["heart",5,"tao"],
			["heart",6,"tao"],
			["diamond",2,"tao"],
			["diamond",3,"tao"],
			["diamond",9,"jiu"],
			["spade",3,"jiu"],
			["spade",9,"jiu"],
			["club",3,"jiu"],
			["club",9,"jiu"],

	/*		["diamond",13,"hualiu"],
			["club",1,"baiyin"],
			["spade",2,"tengjia"],
			["club",2,"tengjia"],
			["spade",1,"guding"],
			["diamond",1,"zhuque"],

			["heart",2,"huogong"],
			["heart",3,"huogong"],
			["diamond",12,"huogong"],
			["spade",11,"tiesuo"],
			["spade",12,"tiesuo"],
			["club",10,"tiesuo"],
			["club",11,"tiesuo"],
			["club",12,"tiesuo"],
			["club",13,"tiesuo"],
			["heart",13,"wuxie"],
			["heart",13,"wuxie"],
			["spade",13,"wuxie"],
			["spade",10,"bingliang"],
			["club",4,"bingliang"],
			
			['diamond',5,'muniu'],*/
		],
	}
});