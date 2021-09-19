'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'xingtian',
		connect:true,
		card:{
		},
		skill:{
		},
		translate:{
		},
		list:[

		],
		help:{
			'星天篇':('<div style="margin:10px">升阶</div><ul style="margin-top:0">'+
			'<li>每一张★牌均标注有对应素材；一名角色可以{指定}任意其满足条件的牌为升阶素材，将对应一张点数为14的★牌加入手牌，以此获得★牌的方法称为“升阶”。'+
			'<br><li>一名角色每个出牌阶段限一次，其可以{指定}自己的手牌并置将之入弃牌堆，进行一次升阶。'+
			'<br><li>{指定}牌这个行动并非可以随时进行，必需在执行效果时指定，并且，在此效果描述范围之内的任意牌均可以被指定</ul></ul>'),
		},
	}
});