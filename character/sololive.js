'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"sololive",
		connect:true,
		skill:{
			baitai:{
				trigger:{player:'phaseBegin'},
				usable:1,
				filter:function(event,player){
					if(player.storage.baitai_A!==0)	player.storage.baitai_A=0;
					if(player.storage.baitai_B!==0)	player.storage.baitai_B=0;
					if(player.storage.baitai_C!==0)	player.storage.baitai_C=0;
					if(player.storage.baitai_D!==0)	player.storage.baitai_D=0;
					return player.countCards('h');
				},
				content:function(){
					'step 0'
					player.showHandcards();
					'step 1'
					player.storage.baitai_A+=player.countCards('h',{suit:'diamond'});
					player.markSkill('baitai_A');
					'step 2'
					player.storage.baitai_B+=player.countCards('h',{suit:'club'});
					player.markSkill('baitai_B');
					'step 3'
					player.storage.baitai_C+=player.countCards('h',{suit:'heart'});
					player.markSkill('baitai_C');
					'step 4'
					player.storage.baitai_D+=player.countCards('h',{suit:'spade'});
					player.markSkill('baitai_D');
				},
				group:['baitai_clear','baitai_A','baitai_B','baitai_C','baitai_D'],
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.baitai_A||player.storage.baitai_B||player.storage.baitai_C||player.storage.baitai_D;
						},
						content:function(){
							if(player.storage.baitai_A!==0)	player.storage.baitai_A=0;
							if(player.storage.baitai_B!==0)	player.storage.baitai_B=0;
							if(player.storage.baitai_C!==0)	player.storage.baitai_C=0;
							if(player.storage.baitai_D!==0)	player.storage.baitai_D=0;
							player.unmarkSkill('baitai_A');
							player.unmarkSkill('baitai_B');
							player.unmarkSkill('baitai_C');
							player.unmarkSkill('baitai_D');
						}
					},
					A:{
						mod:{
							attackFrom:function(from,to,distance){
								return distance-from.storage.baitai_A;
							}
						},
						marktext:'歌',
						intro:{name:'百态',content:'本回合内攻击范围+#'},
					},
					B:{
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							var Buff = player.storage.baitai_B;
							trigger.num+=Buff;
						},
						marktext:'之',
						intro:{name:'百态',content:'摸牌阶段摸牌数+#'},
					},
					C:{
						trigger:{player:'phaseDiscardBegin'},
						forced:true,
						content:function(){},
						mod:{
							maxHandcard:function(player,num){
								var Buff = player.storage.baitai_C;
								return num+=Buff;
							},
						},
						marktext:'母',
						intro:{name:'百态',content:'本回合手牌上限+#'},
					},
					D:{
						mod:{
							cardUsable:function (card,player,num){
								var Buff = player.storage.baitai_D;
								if(card.name=='sha'&&player.isPhaseUsing()) return num+Buff;
							},
						},
						marktext:'水',
						intro:{name:'百态',content:'出牌阶段可使用【杀】的次数+#'},
					},
				}
			},
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
			baitai: '百态',
			baitai_info: '回合开始时，你可以展示所有手牌，根据各花色的牌数于本回合增加对应值：♦️~攻击范围，♣️~摸牌阶段摸牌数，♥️~手牌上限，♠️~出牌阶段可使用【杀】的次数；一组四种花色~使用牌指定的目标。',

			tongchen: '同尘',
			tongchen_info: '出牌阶段限一次，若你攻击范围内有角色某一区域内的牌数与你在该区域的牌数不等，你可在你与其的该区域间移动一张牌。然后若你与其在该区域内的牌数相等，你摸一张牌。',
			wangxuan: '王选',
			wangxuan_info: '<font color=#f66>锁定技</font> 当你的体力或装备区装备为全场最多时，你的手牌上限和攻击范围翻倍。',
		}
	};
});