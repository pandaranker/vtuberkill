'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"sololive",
		connect:true,
		character:{
			KiryuuCoco:['female','holo',5,['zaoankeke', 'jierizhanbei', 'esuyingye']],
		},
		characterIntro:{
			KiryuuCoco: '“全都给你们扬了！”',
		},
		skill:{
			zaoankeke:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				priority:29,
				logTarget:'target',
				filter:function(event,player){
					if(event.target==player)				return false;
					if(event.target.countCards('he')==0)	return false;
					return event.card.name=='sha';
				},
				content:function(){	
					'step 0'
					var target=trigger.target;

					if(trigger.getParent().card.nature)		//如果此杀为属性杀
					{				
						player.line(target,'green');
						target.chooseCard('参加“早安可可”录制，选择一张牌交给'+get.translation(player),'he',true).set('ai',function(card){
							if(card.name=='shan')	return 30;
							if(card.nature) 		return 50;
							return 100-get.value(card);											
						});											
					}
					else							
					{
						target.discardPlayerCard('参加“早安可可”录制，需要弃置一张牌',target,'he').set('ai',function(button){
							var name=button.link.viewAs||button.link.name;
							if(name=='shan') return 30;
							return 100-get.value(card);													
						});				
					}
					'step 1'
					if(trigger.getParent().card.nature){
						player.gain(result.cards,target,'give');
					}
				}
			},
			
			jierizhanbei:{
				group:['jierizhanbei_useE' , 'jierizhanbei_getE'],
				subSkill:{
					useE:{
								trigger:{player:'useCard'},
								forced:true,
								priority:17,
								usable:1,
								filter:function(event,player){
									return get.type(event.card)=='equip';
								},
								content:function(){
									console.log(player.storage.jierizhanbei);
									player.storage.jierizhanbei++;
								},
								mod:{
									maxHandcard:function(player,num){
										if(player.storage.jierizhanbei>0)	return 5;
									},
								},
					},
					getE:{
								init:function (player){
									player.storage.jierizhanbei=0;
								},
								trigger:{player:'phaseEnd'},
								forced:true,
								priority:13,
								filter:function(event,player){
									var num = player.storage.jierizhanbei
									if(num!=0){									
										player.storage.jierizhanbei=0;
										return false;
									}
									return true;
								},
								content:function(){
									console.log(player.storage.jierizhanbei);
										var getC = get.cardPile2(function(card){
											return get.type(card)=='equip';
										})
										if(getC){
											player.gain(getC,'gain2');
										}
										else{
											game.log(player,'牌堆中没有装备牌了');
										}
									
								}
					}
				}
			},
			esuyingye:{
				trigger:{player:'phaseBegin'},
				forced:false,
				priority:31,
				filter:function(event,player){
					return event.player==player&&player.countDiscardableCards(player,'ej')>0;
				},
				content:function(){
					'step 0'
					var nh=trigger.player.countCards('h');
					var eff=get.effect(trigger.player,{name:'sha',isCard:true},player,player);
					player.discardPlayerCard('请开始自己的表演',player,'ej').set('ai',function(button){
						var name=button.link.viewAs||button.link.name;
						var nh=_status.event.nh;
						if(name=='lebu'&&nh>trigger.player.hp) return 150;
						if(name=='bingliang'&&nh<trigger.player.hp) return 150;
						return 100-get.value(card);													
					}).set('nh',nh);
					'step 1'
					if(result.cards){
						if(get.type(result.card)=='equip'){
							player.logSkill('esuyingye');
							player.addTempSkill('esuyingye_addDam');
							var buff = '.player_buff';
							game.broadcastAll(function(player, buff){
								player.node.esuyingye= ui.create.div(buff ,player.node.avatar);
							}, player, buff);
						}
					}
				},
				subSkill: {
					addDam: {
						direct: true, 
						silent: true,
						trigger: {
							source: 'damageBegin',
						},
						content: function() {
							player.removeSkill('esuyingye_addDam');
							trigger.num++;
						},
						onremove: function(player, skill) {
							game.broadcastAll(function(player){
								player.node.esuyingye.delete();
								delete player.node.esuyingye;
							}, player);
						}
					}
				}
			},

								
					
					
			
					
				
				
			
		}, 
		translate:{
			KiryuuCoco:'桐生可可',
			zaoankeke: '早安迫害',
			zaoankeke_info: '锁定技。当你使用【杀】指定目标后，目标需弃置一张牌；若此【杀】为属性杀，则改为交给你一张牌。',
			jierizhanbei: '节日战备',
			jierizhanbei_info: '锁定技。你使用过装备牌的回合内手牌上限视为5.回合结束时，若本回合你没有使用过装备牌，你随机从牌堆内获得一张装备牌。',
			esuyingye: '恶俗营业',
			esuyingye_info: '回合开始时，你可以将你装备区或判定区的一张牌弃置，若为装备区的牌，本回合你下一张牌造成的伤害+1。',
			
		},
	};
});