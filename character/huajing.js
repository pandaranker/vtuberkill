'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huajing',
		connect:true,
		character:{
			/**长尾景 */
			NagaoKei:['male','nijisanji',3,['fumo','chidu']],
			/**白神遥 */
			ShirakamiHaruka:['female','qun',3,['baoxiao','quru']],
			/**海狗 */
			KisaragiKoyori:['female','qun',3,['shinve','juzu']],
			/**鲨皇 */
			GawrGura:['female','holo',3,['lingqun','yangliu']],
			/**娜娜米 */
			Nana7mi:['female','VirtuaReal',4,['xieqi','youhai']],
		},
		characterSort:{
		},
		characterIntro:{
		},
		skill:{
			fumo:{
				trigger:{player:'useCard1'},
				priority:42,
				check:function(event,player){
					return true;
				},
				filter:function(event,player){
					if(event.targets.length!=1) return false;
					return lib.filter.filterTarget({name:'langyong'},player,event.targets[0]);
				},
				content:function(){
					'step 0'
					player.judge(function(result){
						if(get.color(result)=='black') return 2;
						return 0;
					});
					'step 1'
					if(result.bool){
						if(!trigger.addedSkill)	trigger.addedSkill = [];
						trigger.addedSkill.add('fumo');
						if(player.storage.fumo2)	delete player.storage.fumo2;
						lib.skill.fumo2.trigger = {player:[get.name(trigger.card)+'Begin']};
					}
					'step 2'
					player.storage.fumo2 = trigger.card;
					game.log(player,'将',trigger.card,'的效果改为【浪涌】')
					player.addTempSkill('fumo2',{player:'useCardAfter'});
				},
				group:'fumo_reback',
				subSkill:{
					reback:{
						trigger:{player:'useCardAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(!player.hasSkill('chidu_used'))		return false;
							return (get.type(event.card,'trick')=='trick');
						},
						content:function(){
							player.removeSkill('chidu_used')
						},
					},
				}
			},
			fumo2:{
				trigger:{global:'Xbegin'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.card == player.storage.fumo2;
				},
				content:function(){
					var fun = lib.card.langyong.content;
					trigger.setContent(fun);
				},
			},
			chidu:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mark:true,
				trigger:{global:'judge'},
				filter:function(event,player){
					if(player.hasSkill('chidu_used'))	return false;
					var color0 = get.color(event.player.judging[0]);
					return (player.countCards('h')-player.countCards('h',{color:color0}))>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('chidu'),'he',function(card){
						var judging=_status.event.judging;
						if(get.color(card)==get.color(judging)) return false;
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					'step 1'
					if(result.bool){
						player.addTempSkill('chidu_used')
						player.respond(result.cards,'highlight','noOrdering');
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = trigger.player.judging[0];
						player.gain(event.card,'gain2');
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}else{
						event.finish();
					}
				},
				subSkill:{
					used:{},
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:0.7,
					}
				},
			},
			baoxiao:{
				trigger:{player:'useCard'},
				firstDo:true,
				forced:	true,
				filter:function(event,player){
					if(event.card.nature!='ocean')		return false;
					return event.card.name=='sha'&&event.getParent().addCount_extra==true;
				},
				content:function(){
					'step 0'
					trigger.getParent().addCount_extra = false;	
					player.getStat().card.sha--;
					event.num = trigger.targets.filter(function(tar){
						return tar.hujia==0;
					}).length;
					'step 1'
					player.draw(event.num);
				},
			},
			quru:{
				enable:'chooseToUse',
				filterCard:true,
				selectCard:2,
				position:'he',
				viewAs:{name:'sha',nature:'ocean'},
				complexCard:true,
				filter:function(event,player){
					return player.countCards('he')>=2&&player.isPhaseUsing();
				},
				prompt:'将两张手牌当海【杀】使用',
				check:function(card){
					if(card.name=='sha') return 0;
					return 5-get.value(card)
				},
				group:['quru_drawBy','quru_addDam'],
				subSkill:{
					drawBy:{
						trigger:{player:'useCard1'},
						silent:true,
						filter:function(event,player){
							return event.skill=='quru'&&player.countCards('he')==0;
						},
						content:function(){
							player.draw();
						}
					},
					addDam:{
						trigger:{source:'damageBegin2'},
						priority:22,
						filter:function(event,player){
							return player.hujia&&event.getParent().skill=='quru';
						},
						content:function(){
							'step 0'
							event.num = player.hujia;
							'step 1'
							player.changeHujia(-event.num);
							trigger.num += event.num;
						},
					},
				},
			},
			shinve:{
				trigger:{player:'changeHp'},
				firstDo:true,
				forced:	true,
				filter:function(event,player){
					return event.num<0;
				},
				content:function(){
					player.changeHujia(-trigger.num);
				},
				group:'shinve_change',
				subSkill:{
					change:{
						trigger:{player:'phaseZhunbeiBegin'},
						firstDo:true,
						forced:	true,
						priority:9,
						filter:function(event,player){
							return player.hujia>0;
						},
						content:function(){
							event.num = player.hujia;
							player.changeHujia(-event.num);
							player.draw(event.num);
						},
					}
				},
			},
			juzu:{
				skillAnimation:true,
				animationStr:'海狗女王',
				unique:true,
				juexingji:true,
				forced:true,
				trigger:{player:'damageAfter'},
				filter:function(event,player){
					return event.source&&event.source.countCards('h')>player.countCards('h');
				},
				content:function(){
					player.gainMaxHp();
					if(player.getHandcardLimit()>player.countCards('h'))	player.draw(player.getHandcardLimit()-player.countCards('h'));
					player.storage.haoren = true;
					player.awakenSkill('juzu');
					player.addSkill('haigou');
					player.addSkill('haigou_addDam');
				},
				ai:{
					combo:'tiantang',
				},
			},
			haigou:{
				trigger:{player:'useCardToPlayer'},
				filter:function(event,player){
					return event.target.countCards('h')>player.countCards('h')&&get.tag(event.card,'damage');
				},
				priority:9,
				forced:true,
				content:function(){
					trigger.directHit.add(trigger.target);
				},
				subSkill:{
					addDam:{
						trigger:{source:'damageBegin2'},
						priority:9,
						lastDo:true,
						forced:true,
						filter:function(event,player){
							return event.nature;
						},
						content:function(){
							'step 0'
							event.num = player.hujia;
							'step 1'
							player.changeHujia(-event.num);
							trigger.num += event.num;
						},
					},
				}
			},
			lingqun:{
				trigger:{player:'phaseDiscardEnd'},
				frequent:true,
				//forced:true,
				filter:function(event,player){
					return event.cards&&event.cards.length;
				},
				content:function(){
					player.changeHujia();
				},
				mod:{
					maxHandcard:function (player,num){
						if(player.countCards('h')>player.hp&&player.hujia)
						return num+player.hujia;
					},
				},
				ai:{
					nohujia:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='nohujia')	return player.countCards('h')>player.hp;
					},
				},
			},
			yangliu:{
				trigger:{player:'useCard1'},
				filter:function(event,player){
					return get.tag(event.card,'damage')&&player.hujia;
				},
				content:function(){
					'step 0'
					player.changeHujia(-1);
					if(!trigger.addedSkill)	trigger.addedSkill = [];
					trigger.addedSkill.add('yangliu');
					'step 1'
					var controls=['摸一张牌','不可响应'];
					player.chooseControl(controls).set('ai',function(event,player){
						return _status.event.index;
					}).set('index',0);
					'step 2'
					switch(result.index){
						case 0:{
							event.target.draw();
							break;
						}
						case 1:{
							trigger.directHit.add(trigger.targets);
							break;
						}
					}
				},
				group:'yangliu_changeNature',
				subSkill:{
					changeNature:{
						trigger:{global:'damageBegin1'},
						firstDo:true,
						priority:7,
						filter:function(event,player){
							var evt = event.getParent();
							if(evt.name=='_lianhuan')	evt = event.getTrigger().getParent(2);
							else	evt = evt.getParent();
							return evt.addedSkill&&evt.addedSkill.contains('yangliu');
						},
						content:function(){
							trigger.nature = 'ocean';
						},
					},
				},
			},
			xieqi:{
				hiddenCard:function(player,name){
					var list = get.libCard(function(card){
						return (card.type=='trick'||card.type=='delay')&&card.ai&&card.ai.tag&&card.ai.tag.huajing&&card.ai.tag.huajing>0;
					});
					for(var i=0;i<list.length;i++){
						if(list[i]==name) return true;
					}
					return false;
				},
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he',function(card){
						return get.number(card)<=7;
					})&&player.isPhaseUsing();
				},
				chooseButton:{
					dialog:function(event,player){
						var list = get.libCard(function(card){
							return (card.type=='trick'||card.type=='delay')&&card.ai&&card.ai.tag&&card.ai.tag.huajing&&card.ai.tag.huajing>0;
						});
						console.log(list);
						for(var i=0;i<list.length;i++){
							list[i]=['锦囊','',list[i]];
						}
						if(list.length==0){
							return ui.create.dialog('未启用《化鲸篇》');
						}
						return ui.create.dialog('『携七』',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards('h',button.link[2])>0) return 0;
						if(button.link[2]=='jingluo') return 0;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(card){
								var sum = get.number(card);
								for(var i=0;i<ui.selected.cards.length;i++){
									sum += get.number(ui.selected.cards[i]);
								}
								return sum<=7;
							},
							complexCard:true,
							selectCard:[1,Infinity],
							popname:true,
							check:function(card){
								return 6-get.value(card);
							},
							position:'he',
							viewAs:{name:links[0][2]},
							onuse:function(result,player){
								if(result.targets&&result.targets.length==1) player.draw(result.cards.length);
							},
						}
					},
					prompt:function(links,player){
						return '###『携七』###将任意张点数合计不大于7的牌当做【'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'】使用';
					}
				},
			},
			youhai:{
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(player.hp==player.maxHp)	return false
					var sum = 0;
					if(event.card.cards){
						for(var i=0;i<event.card.cards.length;i++){
							sum += get.number(event.card.cards[i]);
						}
					}else{
						sum += get.number(event.card)
					}
					return sum==7;
				},
				lastDo:true,
				content:function(){
					'step 0'
					event.num = 1;
					event.targets = [];
					'step 1'
					player.chooseTarget('###『佑海』###分配第'+get.cnNumber(event.num)+'点护甲').set('ai',function(target){
						return target==player;
					});
					'step 2'
					if(result.targets){
						event.targets.add(result.targets[0]);
						player.line(result.targets[0],'ocean');
						result.targets[0].changeHujia();
					}else{
						return false;
					}
					'step 3'
					if(event.num<player.maxHp-player.hp){
						event.num++;
						event.goto(1);
					}
				},
			},
		},
		characterReplace:{
		},
		translate:{
			NagaoKei: '长尾景',
			fumo: '伏魔',
			fumo_info: '你使用牌指定其他角色为唯一目标时，你可以进行判定，若结果为黑色，将之效果改为【浪涌】。当你使用锦囊牌后，重置【忖度】。',
			chidu: '忖度',
			chidu_info: '当一名角色的判定牌生效前，你可以打出一张颜色与结果不同的手牌替换之。每回合限一次。',
			
			ShirakamiHaruka: '白神遥',
			baoxiao: '豹笑',
			baoxiao_info: '<font color=#f66>锁定技</font> 你使用海【杀】不计入次数，且每指定一名无护甲角色为目标，你摸一张牌。',
			quru: '取乳',
			quru_info: '出牌阶段，你可以将两张牌当作海【杀】使用，若你因此失去了最后一张牌，你获得1点护甲；此【杀】造成伤害时，你可以失去所有护甲，令此伤害等量增加。',
			quru_addDam_info: '你可以失去所有护甲，令此伤害等量增加。',

			KisaragiKoyori: '如月こより',
			shinve: '尸虐',
			shinve_info: '<font color=#f66>锁定技</font> 你体力减少时，获得等量护甲。准备阶段，你失去所有护甲，摸等量的牌。',
			juzu: '举组',
			juzu_info: '<font color=#ed5>觉醒技</font> 手牌数多于你的角色对你造成伤害后，你增加1点体力上限并摸牌至手牌上限，获得技能『海狗』。',
			haigou: '海狗',
			haigou_info: '<font color=#f66>锁定技</font> 你造成的海洋伤害+1。手牌数多于你的角色无法响应你使用的能造成伤害的牌。',

			GawrGura: '噶呜·古拉',
			lingqun: '领群',
			lingqun_info: '<font color=#f66>锁定技</font> 你于弃牌阶段弃牌后获得1点护甲。你的手牌数多于体力值时，你的护甲效果改为使你增加等量手牌上限。',
			yangliu: '洋流',
			yangliu_info: '当你使用能造成伤害的牌时，可以扣减1点护甲将此伤害改为海洋属性。然后你摸一张牌；或令之不可被响应。',

			Nana7mi: '七海',
			xieqi: '携七',
			xieqi_info: '每回合限一次，你可以将任意张点数合计不大于7的牌当化鲸篇的一张锦囊牌使用，若仅指定了一名角色为目标，你摸等同于以此法失去牌数的牌。',
			youhai: '佑海',
			youhai_info: '你使用点数或点数合计为7的牌时，可以将X点护甲分配给任意角色。（X为你已损失的体力值）',
		},
	}
});