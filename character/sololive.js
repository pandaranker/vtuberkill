'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"sololive",
		connect:true,
		skill:{
			tongchen:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(cur){
						if(player.inRange(cur)){
							if(player.countCards('h')!=cur.countCards('h'))	return true;
							var es=player.getCards('e');
							for(var i=0;i<es.length;i++){
								if(cur.isEmpty(get.subtype(es[i]))&&(player.countCards('e')!=cur.countCards('e'))) return true;
							}
							var js=player.getCards('j');
							for(var i=0;i<js.length;i++){
								if(cur.canAddJudge(js[i])&&(player.countCards('j')!=cur.countCards('j'))) return true;
							}
						}
						return false;
					});
				},
				content:function(){
					'step 0'
					var next = player.moveCard(function(card,player,target){
						if(target==player)	return true;
						if(ui.selected.targets.length&&ui.selected.targets[0]!=player)	return false;
						if(player.inRange(target)){
							if(player.countCards('h')!=target.countCards('h'))	return true;
							var es=player.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))&&(player.countCards('e')!=target.countCards('e'))) return true;
							}
							var js=player.getCards('j');
							for(var i=0;i<js.length;i++){
								if(target.canAddJudge(js[i])&&(player.countCards('j')!=target.countCards('j'))) return true;
							}
						}
						return false;
					});
					next.moveHandcard = true;
					'step 1'
					if(result.bool&&result.card){
						console.log(result);
						if(result.targets[0].countCards(result.position)==result.targets[1].countCards(result.position))	player.draw();
					}
				}
			},
			wangxuan:{
				mod:{
					maxHandcard:function(player,num){
						if(player.isMaxHp()||player.isMaxEquip()&&player.countCards('e')) return num*2;
					},
					attackFrom:function(from,to,distance){
						if(from.isMaxHp()||from.isMaxEquip()&&from.countCards('e')) return distance-from.getAttackRange(true,true);
					}
				},
			},
		},
		dynamicTranslate:{
		},
		translate:{
			tongchen: '同尘',
			tongchen_info: '出牌阶段限一次，若你攻击范围内有角色某一区域内的牌数与你在该区域的牌数不等，你可在你与其的该区域间移动一张牌。然后若你与其在该区域内的牌数相等，你摸一张牌。',
			wangxuan: '王选',
			wangxuan_info: '<font color=#f66>锁定技</font> 当你的体力或装备区装备为全场最多时，你的手牌上限和攻击范围翻倍。',
		}
	};
});