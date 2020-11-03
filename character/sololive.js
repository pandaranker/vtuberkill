'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"sololive",
		connectBanned:['KiryuuCoco'],
		connect:true,
		character:{
			KiryuuCoco:['female','holo',5,['zaoankeke', 'jierizhanbei', 'esuyingye']],
			UsadaPekora:['female','holo',3,['pekoyu','hongshaoturou']],
		},
		characterIntro:{
			KiryuuCoco: '“全都给你们扬了！”',
			UsadaPekora: '“哈↑哈↑哈↑哈”',
		},
		skill:{
			//龙皇
			zaoankeke:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				priority:29,
				logTarget:'target',
				filter:function(event,player){
					if(event.target==player)				return false;
					if(event.target.countCards('he')==0)	return false;
					return event.card.name =='sha';
				},
				content:function(){	
					'step 0'
					var target=trigger.target;

					if(trigger.getParent().card.nature)		//如果此杀为属性杀
					{				
						player.line(target,'green');
						target.chooseCard('参加“早安可可”录制，需要交给'+get.translation(player)+'一张牌','he',true).set('ai',function(card){
							var name = card.name;
							if(name=='shan') return 30;
							return 100-get.value(card);											
						});											
					}
					else							
					{
						target.chooseToDiscard('参加“早安可可”录制，需要弃置一张牌','he').set('ai',function(card){
							var name = card.name;
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
						var getC = result.cards[0];
						if(get.type(getC) =='equip'){
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
							trigger.num++;
							player.removeSkill('esuyingye_addDam');						
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
			//兔宝
			pekoyu:{
				trigger:{player:'useCardAfter'},
				forced:false,
				usable:7,
				priority:111,
				filter:function(event,player){
					console.log(event);
					if(!(event.card.name =='sha'||get.type(event.card)=='trick'))	return false;
					console.log(event.respondTo);
					console.log(event.result.wuxied);
					if(!(event.result.bool == false || event.result.wuxied))		return true;			
				},
				content: function() {
					'step 0'
					player.draw(),
					player.chooseToDiscard('然后，弃置一张牌','h').set('ai',function(card){
						var name = card.name;
						if(name=='jiu') 			return 120;
						if(get.type(card)=='trick')	return 40;
						return 100-get.value(card);													
					});
					'step 1'
					if(result.cards){
						console.log(result.cards[0]);
						if(result.cards[0].name=='jiu'||
							(player.hasMark('hongshaoturou')&&(result.cards[0].name=='shan'||result.cards[0].name=='tao')))
						player.chooseTarget('选择一名角色，令其摸两张牌').set('ai',function(target){
							var player=_status.event.player;
							return get.attitude(player,target)*(target.isDamaged()?2:1);
						});
					}
					'step 2'
					if(result.bool&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.draw(2);
					}
				}
			},
			hongshaoturou:{
				enable:"phaseUse",
				usable:1,
				content:function(){
					player.link();
					player.addMark('hongshaoturou',1,false);
					player.addTempSkill('hongshaoturou_viewAs','phaseAfter');
					player.addTempSkill('hongshaoturou_shao','phaseAfter');
					var buff = '.player_buff';
							game.broadcastAll(function(player, buff){
								player.node.hongshaoturou= ui.create.div(buff ,player.node.avatar);
							}, player, buff);
				},			
			},
			hongshaoturou_viewAs:{
				mod:{
					cardname:function(card,player){
						if(card.name=='shan'||card.name=='tao')														return 'jiu';
						if(get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6')	return 'tiesuo';
					},
				},
				trigger:{player:['useCard1','respond','loseBeign']},
				firstDo:true,
				forced:	true,
				filter:function(event,player){
					return event.card.name=='jiu'&&!event.skill&&
					event.cards.length==1&&(event.cards[0].name=='tao'||event.cards[0].name=='shan');
				},
				content:function(){
				},
			},
			hongshaoturou_shao:{
				trigger:{player:['phaseEnd']},
				forced:	true,
				onremove: function(player, skill) {
					game.broadcastAll(function(player){
						player.node.hongshaoturou.delete();
						delete player.node.hongshaoturou;
					}, player);
				},
				filter:function(event,player){
					return true;
				},
				content:function(){
					player.damage('fire');
					player.removeSkill('hongshaoturou_shao');	
				}
			}
								
					
				
				
			
		}, 
		translate:{
			KiryuuCoco:'桐生可可',
			zaoankeke: '早安迫害',
			zaoankeke_info: '锁定技。当你使用【杀】指定目标后，目标需弃置一张牌；若此【杀】为属性杀，则改为交给你一张牌。',
			jierizhanbei: '节日战备',
			jierizhanbei_info: '锁定技。你使用过装备牌的回合内手牌上限视为5.回合结束时，若本回合你没有使用过装备牌，你随机从牌堆内获得一张装备牌。',
			esuyingye: '恶俗营业',
			esuyingye_info: '回合开始时，你可以将你装备区或判定区的一张牌弃置，若为装备区的牌，本回合你下一张牌造成的伤害+1。',
			UsadaPekora:'兔田佩克拉',
			pekoyu:'peko文学',
			pekoyu_info:'一回合限七次。每当你使用【杀】未被【闪】响应或使用锦囊牌未被【无懈可击】响应，你可以摸一张牌，然后弃一张牌。若此技能弃置了【酒】，你可以指定一名角色摸两张牌。',
			hongshaoturou:'自煲自足',
			hongshaoturou_info:'出牌阶段限一次，将你的武将牌横置，在回合结束时受到1点火焰伤害。若你如此做，在本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。',
		},
	};
});