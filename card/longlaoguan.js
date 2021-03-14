'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
 return {
		name:'longlaoguan',
		connect:true,
		card:{
			dulun:{
				audio:true,
				fullskin:true,
				type:'trick',
				modeimage:'longlaoguan',
				enable:function(){
					return game.hasPlayer(function(cur){
						if(cur.identity=='fan'){
							return true;
						}
					});
				},
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target.identity=='fan';
				},
				content:function(){
					'step 0'
                    var list= [['使用无法响应的杀'],['摸一张牌']];
					event.videoId = lib.status.videoId++;
					player.line(target,'green')
					_status.event.target = target;
					game.broadcastAll(function(id, choicelist){
                        var dialog=ui.create.dialog('选择一项');
                        choicelist.forEach(element=>{
                            dialog.add([element,'vcard']);
                        })
						dialog.videoId = id;
					}, event.videoId, list);
					'step 1'
					var target = event.target;
					target.chooseButton().set('dialog',event.videoId).set('prompt',get.prompt('dulunche'));
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
                    if(result.bool){
						var fan = event.target;
                        result.links.forEach(element => {
                            if(element[2]=='使用无法响应的杀'){
                                game.log(target,'的下一张杀无法被响应');
								fan.addTempSkill('dulun_sha');
								fan.chooseCardTarget({
									filterCard:{name:'sha'},
									selectCard:1,
									filterTarget:function(card,fan,target){
										return target!=fan;
									},
									ai1:function(card){
										if(card.nature) return 80;
										return true;
									},
									ai2:function(target){
										var att=get.attitude(_status.event.target,target);
										return 10-att;
									},
								}).set('target',fan)
                            }
                            if(element[2]=='摸一张牌'){
                                fan.draw();
                            }
                        });
					}
					'step 3'
					if(result.targets){
						var fan = event.target;
						fan.useCard(result.cards[0],result.targets[0]);
						fan.getStat().card.sha--;
					}
				},
				ai:{
					basic:{
						useful:[4,1],
						value:[4,1],
					},
					order:function(item,player){
						if(player.identity!='fan')	return 0;
						if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10;
						return 3.6;
					},
					result:{
						target:1,
					},
					tag:{
						draw:0.5,
						respond:1,
						respondSha:1,
						unequip_ai:1,
					}
				},
			},
			chuanjia:{
				audio:true,
				fullskin:true,
				type:'trick',
				modeimage:'longlaoguan',
				enable:function(card,player){
					return player.identity=='fan';
				},
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target.identity=='zhu';
				},
				content:function(){
					target.addTempSkill('chuanjia_po','phaseAfter');
					target.markSkill('chuanjia_po');
					if(target.hujia) target.changeHujia(-1);
				},
				ai:{
					basic:{
						useful:[5,1],
						value:[5,1],
					},
					order:function(item){
						if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10;
						if(lib.linked.contains(get.nature(item))) return 3.1;
						return 3;
					},
					result:{
						target:-1,
					},
				},
			},
			zhinengdulun:{
				audio:true,
				fullskin:true,
				modeimage:'longlaoguan',
				enable:function(card,player){
					return player.identity=='fan';
				},
				//toself:true,
				type:"equip",
				subtype:"equip5",
				skills:['zhinengdulun_skill'],
				ai:{
					basic:{
						equipValue:10,
					},
				},
			},
			longjiao:{
				audio:true,
				fullskin:true,
				modeimage:'longlaoguan',
				enable:function(card,player){
					return player.identity!='fan';
				},
				//toself:true,
				type:"equip",
				subtype:"equip1",
				distance:{attackFrom:-3},
				skills:['longjiao'],
				global: 'g_longjiao',
				ai:{
					basic:{
						equipValue:7,
					},
				},
			},
			longwei:{
				audio:true,
				fullskin:true,
				modeimage:'longlaoguan',
				enable:function(card,player){
					return player.identity!='fan';
				},
				//toself:true,
				onLose:function(){
					if(get.name(player)=='KiryuuCoco')
						player.removeSkill('yugaimizhang');
					if(get.name(player)=='AjatarCoco')
						player.removeSkill('esuyingye');
				},
				type:"equip",
				subtype:"equip5",
				skills:['longwei'],
				global: 'g_longwei',
				ai:{
					basic:{
						equipValue:7,
					},
				},
			},
			takeover:{
				audio:true,
				fullskin:true,
				modeimage:'longlaoguan',
				enable:function(){
					return game.hasPlayer(function(cur){
						if(cur.identity=='fan'){
							return true;
						}
					});
				},
		//		chongzhu:function(){
		//			return game.countPlayer()<=2;
		//		},
				singleCard:true,
				type:'trick',
				enable:true,
				cardcolor:'red',
				selectTarget:-1,
				filterTarget:true,
				contentBefore:function(){
					if(!targets.length){
						event.finish();
						return;
					}
					var fans = 0;
					game.hasPlayer(function(cur){
						if(cur.identity=='fan'){
							fans++;
						}
					})
					if(fans==0){
						event.finish();
						return;
					}
				},
				content:function(){
					var card = this.card;
					game.hasPlayer(function(cur){
						if(cur.identity=='fan'){
							var che = game.createCard('zhinengdulun',card.suit,card.number);
							cur.equip(che);
						}
					});
				},
				contentAfter:function(){
					game.log(card,'已移出游戏');
					game.cardsGotoSpecial(this.card);
				},
				ai:{
					order:8,
					useful:4,
					value:10,
				},
			},
			bigong:{
				audio:true,
				fullskin:true,
				modeimage:'longlaoguan',
				enable:true,
				singleCard:true,
				type:'trick',
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target.identity =='fan';
				},
				content:function(){
					'step 0'
					//_status.event.target = target;
					var list= [['本轮内失去所有技能'],['交给桐生可可两张不同类型的牌']];
					event.videoId = lib.status.videoId++;
					player.line(target,'green')
					//_status.event.target = target;
					game.broadcastAll(function(id, choicelist){
						var dialog=ui.create.dialog('选择一项');
						choicelist.forEach(element=>{
							dialog.add([element,'vcard']);
						})
						dialog.videoId = id;
					}, event.videoId, list);
					'step 1'
					//var target = _status.event.target;
					target.chooseButton(true).set('dialog',event.videoId).set('prompt',get.prompt('bigong'));
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						//var target = _status.event.target;
						result.links.forEach(element => {
							if(element[2]=='本轮内失去所有技能'){
								game.log(target,'失去了所有技能');
								//target.clearSkills();
								target.addTempSkill('bigong_clear','roundStart');
							}
							if(element[2]=='交给桐生可可两张不同类型的牌'){
								var next=target.chooseCardButton('交给桐生可可两张不同类型的牌(取消则依然发动效果1)',2,target.getCards('he'));
								next.set('filterButton',function(button){
									if(ui.selected.buttons.length){
										var from=ui.selected.buttons[0];
										var type=get.type(button.link);
										if(type!=get.type(from.link)) return true;
										return false;
									}
									else{
										return true;
									}
								});
							}
						});
					}
					'step 3'
					if(result.bool){
						if(result.buttons.length){
							game.zhu.gain(result.buttons,target);
						}
					}
					else{
						game.log(target,'失去了所有技能');
						target.addTempSkill('bigong_clear',{global:'roundStart'});
					}
				},
				contentAfter:function(){
					game.log(card,'已移出游戏');
					game.cardsGotoSpecial(this.card);
				},
				ai:{
					order:9,
					useful:4,
					value:10,
					tag:{
						gain:2,
					},
					result:{
						target:-1,
					},
				},
			},
		},
		
		skill:{
			g_longjiao:{
				trigger:{player:['loseAfter']},
				forced:true,
				filter:function(event,player){
					if(_status.currentPhase.identity=='zhu') return false;
					if(player.isPhaseUsing()) return false;
					if(!(event.name=='cardsDiscard'||(event.name=='lose'&&event.getParent().name=='discard')))	return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].name=='longjiao') return true;
					}
					return false;
				},
				content:function(){
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].name=='longjiao') event.card=trigger.cards[i];
					}
					ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					// var cards=get.cards(ui.cardPile.childElementCount+1);
					// for(var i=0;i<cards.length;i++){
					// 	ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
					// }
				}
			},
			g_longwei:{
				trigger:{player:['loseAfter']},
				forced:true,
				filter:function(event,player){
					if(_status.currentPhase.identity=='zhu') return false;
					if(player.isPhaseUsing()) return false;
					if(!(event.name=='cardsDiscard'||(event.name=='lose'&&event.getParent().name=='discard')))	return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].name=='longwei') return true;
					}
					return false;
				},
				content:function(){
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].name=='longwei') event.card=trigger.cards[i];
					}
					ui.cardPile.insertBefore(event.card,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
				},
			},
			dulun_sha:{
				firstDo:true,
				forced:true,
				trigger:{player:'useCardToPlayered'},
				ilter:function(event,player){
					return event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					trigger.getParent().directHit.add(trigger.target);
					player.removeSkill('dulun_sha');
				}
			},
			
			bigong_clear:{
				firstDo:true,
				trigger:{
					global:'roundStart',
				},
				priority:99,
				forced:true,
				popup:false,
				unique:true,
				content:function (){
					player.enableSkill('bigong_clear');
					player.unmarkSkill('bigong_clear');
					player.removeSkill('bigong_clear')
				},
				mark:true,
				intro:{
					content:function (storage,player,skill){
						var str='<li>锁定技，你的其他技能全部失效。';
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)){
								list.push(i)
							}
						}
						if(list.length){
							str+='<br><li>失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']){
									str+=get.translation(list[i])+'、';
								}
							}
							return str.slice(0,str.length-1);
						}else return str;
					},
				},
				init:function (player,skill){
					var skills=player.getSkills(true,false);
					for(var i=0;i<skills.length;i++){
						var info=get.info(skills[i]);
						if(skills[i]=='bigong_clear'||skills[i]=='rebigong_clear'||info.charlotte){
							skills.splice(i--,1);
						}
					}
					player.disableSkill(skill,skills);
				},
				onremove:function (player,skill){
					player.enableSkill(skill);
				},
				locked:true,
			},
			chuanjia_po:{
				audio:true,
				marktext:'f**k',
				locked:true,
				notemp:true,
				mark: true,
				intro: {
					content: '被破防',
				},
				trigger:{
					target:'useCardToPlayered',
				},
				forced:true,
				priority:444,
				filter:function(event,player){
					if(!get.name(event.card,event.player)=='sha')	return false;
					console.log('OK');
					return player.countCards('e');
				},
				content:function (){
					player.discardPlayerCard('被穿甲弹破防……', player, true, 'e');
				},
				ai:{
					neg:true,
					effect:{
						target:function (card,player,target,current){
							if(get.name(card,player)=='sha') return [0,-4];
						},
					},
				},
			},
			zhinengdulun_skill:{
				audio:true,
				trigger:{
					player:"phaseBegin",
				},
				forced:true,
				equipSkill:true,
				content:function (){
					player.useCard({name:'dulun',isCard:true},player);
				},
				ai:{
					hreaten:4,
				},
			},
			longjiao:{
				equipSkill:true,
				enable:['chooseToUse','chooseToRespond'],
				filterCard:true,
				selectCard:1,
				position:'he',
				viewAs:{name:'sha'},
				complexCard:true,
				filter:function(event,player){
					return player.countCards('h')>=1;
				},
				audio:true,
				prompt:'将一张牌当杀使用或打出',
				check:function(card){
					if(card.name=='sha') return 0;
					return 5-get.value(card)
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						return player.countCards('he')>=1;
					},
				}
				// audio:true,
				// equipSkill:true,
				// mod:{
				// 	cardUsable:function(card,player,num){
				// 		if(get.name(card)=='sha') 
				// 			return num+1;
				// 	},
				// 	cardEnabled:function(card,player){
                //         if(card.name=='sha'&&(player.getStat().card.sha>2)) 
                //             return false
				// 	},
				// },
				// ai:{
				// 	hreaten:1,
				// },
			},
			longwei:{
				init:function (player){//获得技能时发动
					if(get.name(player)=='KiryuuCoco')
						player.addSkill('yugaimizhang');
					if(get.name(player)=='AjatarCoco')
						player.addSkill('esuyingye');
				},
				onremove:function(player){//失去技能时发动
				},
				audio:true,
				frequent:true,
				equipSkill:true,
				content:function (){
				},
				ai:{
					hreaten:1,
				},
			},
		},
		translate:{
			dulun: '独轮车',
			dulun_info: '出牌阶段，对一名反抗军使用，其可以立即使用一张不可被响应的【杀】或摸一张牌。',
			chuanjia: '穿甲弹',
			chuanjia_info: '出牌阶段，对桐生可可使用（使之减少1护甲），本回合其成为【杀】的目标后需弃置装备区内的一张牌。',
			zhinengdulun: '智能独轮车',
			zhinengdulun_info: '回合开始时，你视为使用一张【独轮车】。',
			longjiao: '龙角',
			longjiao_info: '反抗军无法装备。你可以将任意一张牌当【杀】使用。在反抗军的回合进入弃牌堆时，改为置于牌堆顶。',
			longwei: '龙尾',
			longwei_info: '反抗军无法装备。若为桐生可可形态，则获得“欲盖弥彰”，若为恶龙形态，则获得“滥觞之至”。在反抗军的回合进入弃牌堆时，改为洗入牌堆。',
			takeover: '所向无前',
			takeover_info: '为所有反抗军装备【智能独轮车】，使用后移出游戏。',
			bigong: '逼宫',
			bigong_info: '对一名反抗军使用，令其选择一项：本轮内失去所有技能，或交给桐生可可两张不同类型的牌，使用后移出游戏。',
			bigong_clear: '逼宫后续',
			chuanjia_po: 'fuck',
		},
		// list:[
		// 	//3张独轮车
		// 	["spade","5","dulun"],
		// 	["club","9","dulun"],
		// 	["diamond","11","dulun"],
		// 	//2张穿甲
		// 	["heart","13","chuanjia"],
		// 	["club","5","chuanjia"],
		// 	//
		// 	["diamond","1","zhinengdulun"],
		// 	//
		// 	["spade","2","longjiao"],
		// 	//
		// 	["spade","6","longwei"],
		// 	//
		// 	["heart","10","takeover"],
		// 	//2张逼宫
		// 	["club","9","bigong"],
		// 	["heart","8","bigong"],
		// ],
	}
});		