'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'xingtian',
		connect:true,
		card:{
			// chenmo:{
			// 	fullskin:true,
			// 	type:'trick',
			// 	enable:true,
			// 	selectTarget:1,
			// 	filterTarget:function(card,player,target){
			// 		return target.countCards('he');
			// 	},
			// 	content:function(){
			// 		'step 0'
			// 		player.choosePlayerCard(target, 'he', [1, 3], '【沉没】：移除至多3张牌',true).set('ai',function(button){
			// 			var val = get.buttonValue(button);
			// 			var att = get.attitude(_status.event.player,get.owner(button.link));
			// 			var pos = get.position(button.link);
			// 			var extra = get.owner(button.link).getCards('h').removeArray(ui.selected.cards);
			// 			if(att>0&&pos=='h') return 8+val;
			// 			else if(pos=='h'&&extra.length==1&&extra.contains(button.link)) return 0;
			// 			else if(att>0)	return -val;
			// 			return val;
			// 		});
			// 		'step 1'
			// 		if(result.bool){
			// 			event.cards = result.links.slice(0);
			// 			if(!target.hasSkill('chen_card')){
			// 				target.addSkill('chen_card');
			// 			}
			// 			target.lose(result.links,ui.special,'toStorage');
			// 		}else{
			// 			event.finish();
			// 		}
			// 		'step 2'
			// 		target.markAuto('chen_card',event.cards);
			// 		event.result = {cards:event.cards};
			// 		'step 3'
			// 		if (target && target.countCards('h') == 0) {
			// 			target.draw();
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:10.5,
			// 			useful:[2,1],
			// 			value:5,
			// 		},
			// 		result:{
			// 			target:function(player,target){
			// 				if(!player.inRange(target)&&!player.hasCard('juedou'))	return 0;
			// 				if(target==player&&player.needsToDiscard())	return 1;
			// 				var att=get.attitude(player,target);
			// 				var nh=target.countCards('h');
			// 				if(att>0){
			// 					var js=target.getCards('j');
			// 					if(js.length){
			// 						var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
			// 						if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
			// 							return 3;
			// 						}
			// 					}
			// 					if(target.getEquip('baiyin')&&target.isDamaged()&&
			// 						get.recoverEffect(target,player,player)>0){
			// 						if(target.hp==1&&!target.hujia) return 1.6;
			// 						if(target.hp==2) return 0.01;
			// 						return 0;
			// 					}
			// 				}
			// 				var es=target.getCards('e');
			// 				var noe=(es.length==0||target.hasSkillTag('noe'));
			// 				var noe2=(es.filter(function(esx){
			// 				return esx.name=='tengjia'||get.value(esx)>0
			// 				}).length==0);
			// 				var noh=(nh==0||target.hasSkillTag('noh'));
			// 				if(noh&&(noe||noe2)) return 0;
			// 				if(att<=0&&!target.countCards('he')) return 1.5;
			// 				return -1.5;
			// 			},
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 			draw:1,
			// 			loseCard:1,
			// 			discard:1
			// 		}
			// 	}
			// },
			// chenjing:{
			// 	fullskin:true,
			// 	type:'trick',
			// 	enable:true,
			// 	selectTarget:1,
			// 	filterTarget:function(card,player,target){
			// 		return target.countCards('he');
			// 	},
			// 	content:function(){
			// 		'step 0'
			// 		player.choosePlayerCard(target, 'he', [1, 3], '【沉静】：移除至多3张牌',true).set('ai',function(button){
			// 			var val = get.buttonValue(button);
			// 			var att = get.attitude(_status.event.player,get.owner(button.link));
			// 			var pos = get.position(button.link);
			// 			var extra = get.owner(button.link).getCards('h').removeArray(ui.selected.cards);
			// 			if(att>0&&pos=='h') return 8+val;
			// 			else if(pos=='h'&&extra.length==1&&extra.contains(button.link)) return 0;
			// 			else if(att>0)	return -val;
			// 			return val;
			// 		});
			// 		'step 1'
			// 		if(result.bool){
			// 			event.cards = result.links.slice(0);
			// 			if(!target.hasSkill('chen_card')){
			// 				target.addSkill('chen_card');
			// 			}
			// 			target.lose(result.links,ui.special,'toStorage');
			// 		}else{
			// 			event.finish();
			// 		}
			// 		'step 2'
			// 		target.markAuto('chen_card',event.cards);
			// 		event.result = {cards:event.cards};
			// 		'step 3'
			// 		if (target && target.countCards('h') == 0) {
			// 			target.changeHujia();
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:10.5,
			// 			useful:[2,1],
			// 			value:5,
			// 		},
			// 		result:{
			// 			target:function(player,target){
			// 				if(!player.inRange(target)&&!player.hasCard('juedou'))	return 0;
			// 				if(target==player&&player.needsToDiscard())	return 1;
			// 				var att=get.attitude(player,target);
			// 				var nh=target.countCards('h');
			// 				if(att>0){
			// 					var js=target.getCards('j');
			// 					if(js.length){
			// 						var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
			// 						if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
			// 							return 3;
			// 						}
			// 					}
			// 					if(target.getEquip('baiyin')&&target.isDamaged()&&
			// 						get.recoverEffect(target,player,player)>0){
			// 						if(target.hp==1&&!target.hujia) return 1.6;
			// 						if(target.hp==2) return 0.01;
			// 						return 0;
			// 					}
			// 				}
			// 				var es=target.getCards('e');
			// 				var noe=(es.length==0||target.hasSkillTag('noe'));
			// 				var noe2=(es.filter(function(esx){
			// 				return esx.name=='tengjia'||get.value(esx)>0
			// 				}).length==0);
			// 				var noh=(nh==0||target.hasSkillTag('noh'));
			// 				if(noh&&(noe||noe2)) return 0;
			// 				if(att<=0&&!target.countCards('he')) return 1.5;
			// 				return -1.5;
			// 			},
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 			gainHujia:0.8,
			// 			loseCard:1,
			// 			discard:1
			// 		}
			// 	}
			// },
			
			// xuanwo:{
			// 	fullskin:true,
			// 	type:'delay',
			// 	filterTarget:function(card,player,target){
			// 		return (lib.filter.judge(card,player,target)&&player!=target);
			// 	},
			// 	judge:function(card){
			// 		if(get.suit(card)=='diamond') return 2;
			// 		return -3;
			// 	},
			// 	effect:function(){
			// 		if(result.bool==false){
			// 			var list = game.filterPlayer(function(current){
			// 				return get.distance(player,current,'pure')==1;
			// 			},targets);
			// 			list.unshift(player);
			// 			for(var i=0;i<list.length;i++){
			// 				list[i].chooseToDiscard(1,true,'he');
			// 			}
			// 			player.addJudgeNext(card);
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:1,
			// 			useful:1,
			// 			value:8,
			// 		},
			// 		result:{
			// 			target:function(player,target){
			// 				var num=target.hp-target.countCards('h')-2;
			// 				if(num>-1) return -0.01;
			// 				if(target.hp<3) num--;
			// 				if(target.isTurnedOver()) num/=2;
			// 				var dist=get.distance(player,target,'absolute');
			// 				if(dist<1) dist=1;
			// 				return num/Math.sqrt(dist);
			// 			}
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 			loseCard:1,
			// 			discard:1,
			// 		}
			// 	}
			// },
			// haidi:{
			// 	fullskin:true,
			// 	type:'delay',
			// 	filterTarget:function(card,player,target){
			// 		return (lib.filter.judge(card,player,target));
			// 	},
			// 	judge:function(card){
			// 		if(get.number(card)>10) return 3;
			// 		return 0;
			// 	},
			// 	effect:function(){
			// 		if(result.bool==true){
			// 			player.draw(2);
			// 		}else{
			// 			player.storage.haidi = 2;
			// 			if(!player.hasSkill('haidi')){
			// 				player.addTempSkill('haidi');
			// 			}
			// 			player.addJudge({name:'haidi'},card);
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:1,
			// 			useful:[2,1],
			// 			value:8,
			// 		},
			// 		result:{
			// 			target:function(player,target){
			// 				return 3;
			// 			}
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 			draw:1,
			// 		}
			// 	}
			// },

			// sanchaji:{
			// 	fullskin:true,
			// 	type:'equip',
			// 	subtype:'equip1',
			// 	distance:{attackFrom:-2},
			// 	ai:{
			// 		basic:{
			// 			equipValue:6
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 		}
			// 	},
			// 	skills:['sanchaji_skill']
			// },
			// yinghua:{
			// 	fullskin:true,
			// 	type:'equip',
			// 	subtype:'equip1',
			// 	distance:{attackFrom:-1},
			// 	ai:{
			// 		basic:{
			// 			equipValue:6
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 		}
			// 	},
			// 	skills:['yinghua_skill']
			// },
			// linghunshouge:{
			// 	fullskin:true,
			// 	type:'equip',
			// 	subtype:'equip1',
			// 	distance:{attackFrom:-4},
			// 	ai:{
			// 		basic:{
			// 			equipValue:4
			// 		},
			// 		tag:{
			// 			huajing:1,
			// 		}
			// 	},
			// 	skills:['linghunshouge_skill']
			// },
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