'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'huajing',
		connect:true,
		character:{
			/**长尾景 */
			NagaoKei:['male','nijisanji',3,['nkfumo','chidu']],
			/**白神遥 */
			ShirakamiHaruka:['female','psp',3,['baoxiao','quru'],['guoV']],
			/**海狗 */
			KisaragiKoyori:['female','kagura',3,['shinve','juzu']],
			/**鲨皇 */
			GawrGura:['female','holo',3,['lingqun','yangliu']],
			/**Ina */
			NinomaeInanis:['female','holo',3,['mochu','fuyue']],
			/**娜娜米 */
			Nana7mi:['female','VirtuaReal',4,['xieqi','youhai'],['guoV']],
			/**海熊猫 */
			sea_SasakiSaku:['female','nijisanji',4,['haishou','lishi']],
			/**潜水夸 */
			sea_MinatoAqua:['female','holo',3,['jinchen','qianyong']],
			
			/**皇团 */
			sp_HisekiErio:['female','shen','1/6',['qiming', 'shengbian','tulong']],
			/**鲨皇 */
			sp_GawrGura: ['female','shen',3,['sp_guaisheng', 'sp_guiliu']],
		},
		characterSort:{
			huajing:{
				sea_emperor:['sp_HisekiErio','sp_GawrGura'],
				HOLOEN:['GawrGura','NinomaeInanis'],
			},
		},
		characterIntro:{
		},
		skill:{
			nkfumo:{
				trigger:{player:'useCard1'},
				priority:42,
				check:function(event,player){
					var effect = 0;
					for(var i=0;i<event.targets.length;i++){
						effect += get.effect(event.targets[i],{name:'langyong'},event.player,player);
					}
					return effect>0;
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
						trigger.addedSkill.add('nkfumo');
						if(player.storage.nkfumo2)	delete player.storage.nkfumo2;
						lib.skill.nkfumo2.trigger = {player:[get.name(trigger.card)+'Begin']};
					}
					'step 2'
					player.storage.nkfumo2 = trigger.card;
					game.log(player,'将',trigger.card,'的效果改为【浪涌】')
					player.addTempSkill('nkfumo2',{player:'useCardAfter'});
				},
				group:'nkfumo_reback',
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
			nkfumo2:{
				trigger:{global:'Xbegin'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.card == player.storage.nkfumo2;
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
				lastDo:true,
				forced:	true,
				filter:function(event,player){
					if(event.card.nature!='ocean')		return false;
					return event.card.name=='sha';
				},
				content:function(){
					'step 0'
					if(trigger.addCount!==false){
						trigger.addCount=false;
						var stat=player.getStat();
						if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
					}
					event.num = trigger.targets.filter(function(tar){
						return tar.hujia==0;
					}).length;
					'step 1'
					player.draw(event.num);
				},
			},
			quru:{
				audio:5,
				enable:'chooseToUse',
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				selectCard:2,
				position:'he',
				viewAs:{name:'sha',nature:'ocean'},
				filter:function(event,player){
					return (player.countCards('he')-player.countCards('he',{type:'basic'}))>=2&&player.isPhaseUsing();
				},
				prompt:'将两张牌当海【杀】使用',
				check:function(card,cards){
					var player=_status.event.player;
					if((get.name(card)=='sha'&&(card.nature=='ocean'||(player.getEquip(1)&&get.name(player.getEquip(1))=='sanchaji')))) return 0;
					return 8-get.value(card);
				},
				onuse:function(result,player){
					var hs = player.getCards('h');
					var es = player.getCards('e');
					var hu = [],eu = [];
					result.cards.forEach(function(card){
						if(get.position(card)=='h')	hu.add(card);
						if(get.position(card)=='e')	eu.add(card);
					})
					if((hu.length&&hu.length==hs.length)||(eu.length&&eu.length==es.length))	player.changeHujia();
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.name(card)=='sha'&&card.nature=='ocean') return num+10;
						if(get.itemtype(card)=='card'&&get.name(card)=='sha'&&card.nature!='ocean') return num-2;
					},
					aiValue:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.name(card)=='sha'&&card.nature=='ocean') return num+5;
					},
				},
				ai:{
					order:7,
					result:{player:1},
				},
				group:['quru_addDam'],
				subSkill:{
					addDam:{
						trigger:{source:'damageBegin2'},
						priority:22,
						filter:function(event,player){
							return player.hujia&&event.getParent().skill=='quru';
						},
						prompt2:function(event,player){
							return '你可以失去所有护甲，令'+get.translation(event.player)+'伤害等量增加';
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
				ai:{
					maixie:true,
					maixie_hp:true
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
					// if(player.getHandcardLimit()>player.countCards('h'))	player.draw(player.getHandcardLimit()-player.countCards('h'));
					player.drawTo(player.maxHp);
					player.storage.juzu = true;
					player.awakenSkill('juzu');
					player.addSkill('haigou');
				},
				derivation:'haigou',
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
				group:'haigou_addDam',
				subSkill:{
					addDam:{
						trigger:{source:'damageBegin2'},
						priority:9,
						forced:true,
						filter:function(event,player){
							return event.nature=='ocean';
						},
						content:function(){
							trigger.num ++;
						},
					},
				}
			},
			//HOLOEN
			lingqun:{
				trigger:{player:'phaseDiscardEnd'},
				frequent:true,
				filter:function(event,player){
					return event.cards&&event.cards.length;
				},
				content:function(){
					event.num = trigger.cards.length;
					player.changeHujia(event.num);
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
				audio:2,
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
					controls.push('取消');
					player.chooseControl('dialogcontrol',controls).set('ai',function(event,player){
						return _status.event.index;
					}).set('index',0);
					'step 2'
					switch(result.control){
						case '摸一张牌':{
							player.draw();
							break;
						}
						case '不可响应':{
							trigger.directHit.addArray(trigger.targets);
							break;
						}
					}
				},
				group:'yangliu_changeNature',
				subSkill:{
					changeNature:{
						trigger:{global:'damageBegin1'},
						firstDo:true,
						forced:true,
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
			mochu:{
				audio:4,
				trigger:{source:'damageBegin1'},
				direct:true,
				filter:function(event,player){
					return ['ocean','yami'].contains(event.nature);
				},
				logTarget:'player',
				content:function(){
					'step 0'
					if(trigger.nature=='yami'){
						player.chooseBool('###'+get.prompt('mochu')+'###摸一张牌，并将伤害改为海洋属性').ai = function(){
							return 1;
						}
					}
					'step 1'
					if(result.bool){
						player.draw();
						trigger.nature = 'ocean';
					}
					'step 2'
					if(trigger.nature=='ocean'){
						player.chooseToDiscard('###'+get.prompt('mochu')+'###弃一张牌，并回复伤害值的体力').ai = function(card){
							var player = _status.event.player;
							return (get.recoverEffect(player,player,player)>0)?(8-get.value(card)):0;
						}
					}
					'step 3'
					if(result.bool&&result.cards&&result.cards.length){
						player.recover(trigger.num);
					}
				},
			},
			fuyue:{
				audio:3,
				trigger:{global:'useCard2'},
				filter:function(event,player){
					return get.name(event.card)=='sha'&&lib.linked.contains(get.nature(event.card))&&lib.filter.targetEnabled2({name:'chenmo'},event.player,player);
				},
				usable:1,
				logTarget:'player',
				content:function(){
					'step 0'
					event.target = trigger.player;
					event.card = trigger.card;
					event.target.useCard({name:'chenmo'},player,false);
					'step 1'
					if(result.cards&&result.cards.length){
						event.num = result.cards.length;
						player.chooseTarget('为'+get.translation(event.target)+'的'+get.translation(event.card)+'增加至多'+
						get.cnNumber(event.num)+'个目标',[1,event.num],function(card,player,target){
							var player=_status.event.source;
							if(_status.event.targets.contains(target)) return false;
							return lib.filter.targetEnabled2(_status.event.card,player,target);
						}).set('source',event.target).set('ai',function(target){
							var player=_status.event.player;
							var source=_status.event.source;
							return get.effect(target,_status.event.card,source,player);
						}).set('targets',trigger.targets).set('card',event.card);
					}else{
						event.finish();
					}
					'step 2'
					if(result.targets&&result.targets.length){
						event.targets = result.targets;
						player.logSkill('fuyue',event.targets);
						trigger.targets.addArray(event.targets);
					}
				},
				result:{
					player:1,
				}
			},
			//VR
			xieqi:{
				auido:2,
				hiddenCard:function(player,name){
					if(!lib.skill.xieqi.filter(false,player))	return false;
					var list = get.libCard(function(card){
						return card.ai&&card.ai.tag&&card.ai.tag.huajing&&card.ai.tag.huajing>0;
					});
					for(var i=0;i<list.length;i++){
						if(list[i]==name) return true;
					}
					return false;
				},
				hiddenYami:function(player,name){
					if(!lib.skill.xieqi.filter(false,player))	return false;
					return true;
				},
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player){
					if(player.countCards('h')<1)	return false;
					var list = player.getCards().map(function(i){
						return get.number(i);
					});
					function getNumbers(source, count, isPermutation = true) {
						//如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
						let currentList = source.map((item) => [item]);
						if (count === 1) {
						  return currentList;
						}
						let result = [];
						//取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
						for (let i = 0; i < currentList.length; i++) {
						  let current = currentList[i];
						  //如果是排列的方式，在取count-1时，源数组中排除当前项
						  let children = [];
						  if (isPermutation) {
							children = getNumbers(source.filter(item => item !== current[0]), count - 1, isPermutation);
						  }
						  //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
						  else {
							children = getNumbers(source.slice(i + 1), count - 1, isPermutation);
						  }
						  for (let child of children) {
							result.push([...current, ...child]);
						  }
						}
						return result;
					}
					for (var i = 1; i <= list.length; i++) {
						var num = getNumbers(list, i, false);
						for(var j = 0;j < num.length;j ++){
							var sum = 0;
							for (var k = 1; k < num[j].length; k++) {
								sum += num[j][k];
							}
							if(sum>0&&sum%7==0)	return true;
						}
					}
					var sum = 0;
					for (var k = 0; k < list.length; k++) {
						sum += Number(list[k]);
					}
					if(sum>0&&sum%7==0)	return true;
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list = get.libCard(function(card){
							return card.ai&&card.ai.tag&&card.ai.tag.huajing&&card.ai.tag.huajing>0;
						});
						for(var i=0;i<list.length;i++){
							if(get.type(list[i],'trick')=='trick') list[i]=['锦囊','',list[i]];
							if(get.type(list[i],'trick')=='equip') list[i]=['装备','',list[i]];
						}
						list.push(['基本','','tao','ocean']);
						list.push(['基本','','sha','ocean']);
						list.push(['基本','','sha','yami']);
						if(list.length==0){
							return ui.create.dialog('未启用《化鲸篇》');
						}
						else return ui.create.dialog('『携七』',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2],nature:button.link[3]},player,_status.event.getParent());
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
								return true;
							},
							complexCard:true,
							selectCard:function(){
								var num=0;
								for(var i=0;i<ui.selected.cards.length;i++){
									num+=get.number(ui.selected.cards[i]);
								}
								if(num>0&&num%7==0) return [ui.selected.cards.length,ui.selected.cards.length+1];
								return ui.selected.cards.length+2;
							},
							// forceAuto:function(){
							// 	return ui.selected.buttons.length==1;
							// },
							popname:true,
							check:function(card){
								return 7-get.value(card);
							},
							position:'he',
							viewAs:{name:links[0][2],nature:links[0][3]},
							onuse:function(result,player){
								player.logSkill('xieqi');
								if(result.targets&&result.targets.length==1) player.draw(result.cards.length);
							},
						}
					},
					prompt:function(links,player){
						return '###『携七』###将任意张点数合计为7倍数的牌当做【'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'】使用';
					}
				},
				ai:{
					order:6,
					result:{
						player:function(player){
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i]!=player&&get.attitude(player,players[i])>0){
									return 0.5;
								}
							}
							return 0;
						}
					},
					threaten:1.2,
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
					event.num = player.maxHp-player.hp;
					event.targets = [];
					'step 1'
					player.chooseTarget([1,event.num],'###『佑海』###分配'+get.cnNumber(event.num)+'点护甲').set('ai',function(target){
						var player = _status.event.player;
						if(target.hujia==0)	return get.attitude(player,target);
						return get.attitude(player,target)/2;
					});
					'step 2'
					if(result.targets&&result.targets.length){
						event.targets.addArray(result.targets);
						player.line(result.targets,'ocean');
						for(var i=0;i<event.targets.length;i++){
							event.targets[i].changeHujia();
						};
					}else{
						return false;
					}
					// 'step 3'
					// if(event.num<player.maxHp-player.hp){
					// 	event.num++;
					// 	event.goto(1);
					// }
				},
			},
			//特典角色
			haishou:{
				audio:3,
				enable:'chooseToUse',
				filterCard:function(card,player){
					return get.type(card)!='basic';
				},
				selectCard:1,
				position:'he',
				viewAs:{name:'qi'},
				filter:function(event,player){
					if(player.hasSkill('haishou_round'))	return false;
					return player.countCards('he')>player.countCards('he',{type:'basic'});
				},
				check:function(card){
					var player = _status.event.player;
					if(card.name=='qi') return 0;
					if(player.hp<player.maxHp) return 8-get.value(card);
					return 3-get.value(card);
				},
				onuse:function(result,player){
					player.addTempSkill('haishou_round','roundStart')
				},
				subSkill:{
					round:{
						trigger:{source:'damageBegin1'},
						silent:true,
						filter:function(event,player){
							return event.nature;
						},
						content:function(){
							player.removeSkill('haishou_round');
						}
					},
				},
			},
			lishi:{
				audio:2,
				trigger:{player:'changeHujiaEnd'},
				filter:function(event,player){
					return event.num<0&&player.hujia==0;
				},
				forced:true,
				lastDo:true,
				content:function(){
					player.draw();
				}
			},
			jinchen:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				lastDo:true,
				check:function(event,player){
					return get.recoverEffect(player,player,player);
				},
				content:function(){
					'step 0'
					player.recover();
					player.turnOver();
					'step 1'
					player.chooseUseTarget({name:'chenmo'});
				}
			},
			qianyong:{
				audio:2,
				trigger:{player:'turnOverBefore'},
				filter:function(event,player){
					return player.isTurnedOver();
				},
				locked:true,
				direct:true,
				lastDo:true,
				content:function(){
					'step 0'
					player.chooseTarget('###『潜涌』###使用一张无视防具的海杀，否则摸两张牌',function(card,player,target){
						if(player==target) return false;
						return player.inRange(target)&&player.canUse({name:'sha',nature:'ocean'},target,false);
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'sha',nature:'ocean'},player,player);
					});
					'step 1'
					if(result.targets&&result.targets.length){
						player.logSkill('qianyong',result.targets);
						player.useCard({name:'sha',nature:'ocean'},result.targets,false).card.qianyong=true;
					}
					else{
						player.logSkill('qianyong_draw')
						player.draw(2);
					}
				},
				ai:{
					unequip:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||arg.card.qianyong!=true) return false;
					},
				},
				mod:{
					targetEnabled:function(card,player,target,now){
						if(target.isTurnedOver()&&(card.name=='sha'||(get.type2(card,false)=='trick'&&get.tag(card,'damage')))){
							if(player!=target)	return false;
						}
					},
				},
				group:'qianyong_addDam',
				subSkill:{
					addDam:{
						trigger:{source:'damageBegin2'},
						priority:6,
						forced:true,
						filter:function(event,player){
							return event.nature=='ocean'&&player.isTurnedOver();
						},
						content:function(){
							trigger.num ++;
						},
					},
					draw:{audio:2}
				},
			},

			qiming:{
				audio:5,
				global:'qiming_viewH',
				group:['qiming_begin','qiming_saycards','qiming_UseBy'],
				subSkill:{
					viewH:{
						ai:{
							viewHandcard:true,
							skillTagFilter:function(player,tag,target){
								if(!game.hasPlayer(function(cur){
										return cur.hasSkill('qiming');
								})) return false;
							},
						},
					},
					begin:{
						trigger:{global:'roundStart'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							'step 0'
							if(player.hasMark('qiming_saycards')) player.unmarkSkill('qiming_saycards');
							player.storage.qiming_saycards.length = 0;
							'step 1'
							event.videoId = lib.status.videoId++;
							var list=[];
							for(var i=0;i<lib.inpile.length;i++){
								var name=lib.inpile[i];
								if(get.type(name,'trick')=='trick') list.push(['锦囊','',name]);
								if(get.type(name,'trick')=='equip') list.push(['装备','',name]);
							}
							game.broadcastAll(function(id, list){
								var dialog=ui.create.dialog('###『启明星辰』###声明一张牌',[list,'vcard']);
								dialog.videoId = id;
							}, event.videoId, list);
							'step 2'
							var next = player.chooseButton(1 ,true);
							next.set('dialog',event.videoId);
							next.set('ai',function(button){
								var value = player.getUseValue({name:button.link[2],isCard:true});
								if(player.hasCard({name:button.link[2]}))	return 2*value;
								return value;
							});
							'step 3'
							game.broadcastAll('closeDialog', event.videoId);
							if (result.bool) {
								player.logSkill('qiming');
								player.storage.qiming_saycards.add(result.links[0][2]);
								game.log(player,'的『启明星辰』声明了【',player.storage.qiming_saycards,'】');
								player.syncStorage('qiming_saycards');
								player.markSkill('qiming_saycards');
							}
						}
					},
					saycards:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						locked:true,
						notemp:true,
						marktext: '明',
						intro: {
							content:'声明了$',
							name:'『启明星辰』',
						}
					},
					UseBy:{
						trigger:{global:'useCard1'},
						priority:999,
						forced:true,
						firstDo:true,
						priority:999,
						filter:function(event,player){
							return get.name(event.card)==player.storage.qiming_saycards;
						},
						content:function(){
							trigger.player.draw();
							player.recover(trigger.player);
						}
					},
				},
			},
			shengbian:{
				audio:2,
				trigger:{player:['changeHp','changeHujiaEnd']},
				filter:function(event,player){
					return player.maxHp&&(player.hujia?(player.hp+player.hujia):player.hp)>player.maxHp;
				},
				lastDo:true,
				forced:true,
				content:function(){
					'step 0'
					var hp = lib.character[player.name][2];
					hp = (typeof hp=='string')?Number(hp.substring(0,1)):hp;
					event.num = player.hujia*(player.hp-hp);
					player.hujia = 0;
					player.hp = hp;
					player.update();
					game.log(player,'体力和护甲重置为初始状态');
					'step 1'
					player.draw(event.num);
				},
			},
			tulong:{
				trigger:{player:'dyingBegin'},
				filter:function(event,player){
					return player.storage.qiming_saycards&&player.storage.qiming_saycards[0]&&get.info({name:player.storage.qiming_saycards[0]}).notarget!==true&&player.countCards('h')&&player.hasUseTarget(player.storage.qiming_saycards[0]);
				},
				lastDo:true,
				direct:true,
				content:function(){
					'step 0'
					event.card = {name:player.storage.qiming_saycards[0]};
					var next = player.chooseCardTarget({
						prompt:get.prompt('tulong'),
						prompt2:"将一张牌当作【"+player.storage.qiming_saycards[0]+"】使用",
						filterCard:function(card,player){
							return get.type(card)=='equip'&&lib.filter.cardDiscardable(card,player)
						},
						filterTarget:function(card,player,target){
							return lib.filter.filterTarget(_status.event.card,player,target);
						},
					});
					next.selectTarget = lib.card[event.card.name].selectTarget||[1,1];
					next.ai2 = function(target){
						var player = _status.event.player;
						return get.effect(target,_status.event.card,player,player);
					},
					next.set('card',event.card)
					'step 1'
					if(result.bool&&result.cards&&result.targets){
						player.logSkill('tulong');
						player.loseMaxHp();
						event.cards = result.cards.slice(0);
						event.targets = result.targets.slice(0);
						var next = player.useCard(event.card,event.targets);
						next.cards = event.cards;
					}
				},
			},
			//SP鲨皇
			sp_guaisheng:{
				audio:5,
				trigger:{global:'damageBegin1'},
				priority:-10,
				init:function(player){
					player.storage.sp_guaisheng={one:false,two:false,three:false,four:false,five:false,six:false,seven:false};
					//player.storage.guaishengMap={1:false,2:false,3:false,12:false,13:false,23:false,123:false};
				},
				onremove:function(player){
					delete player.storage.sp_guaisheng;
				},
				direct:true,
				filter:function(event,player){
					if(player.storage.sp_guaisheng){
						var num=0;
						for (var i in player.storage.sp_guaisheng){
						if(player.storage.sp_guaisheng[i]==false) num++;
						}
					}
				return num>=1&&event.nature=='ocean';
				},
				content:function(){
					'step 0'
					event.num=2;
					event.list = {one:'选项一',two:'选项二',three:'选项三',four:'选项四',five:'选项五',six:'选项六',seven:'选项七'};
					'step 1'
					for (var i in player.storage.sp_guaisheng){
						if(player.storage.sp_guaisheng[i]==true){
							event.list[i]='';
						}
					}					
					//if(trigger.source==undefined) event.list['two']='';
					var list = [];
					for (var i in event.list){
						if(event.list[i]!='') list.push(event.list[i]);
					}
					var choice = list.randomGet();				
					var str='『海洋怪声』：你可选择以下任意项构成未执行过的组合以执行：<br><br>';
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项一：'+'令一名角色摸一张牌'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项二：'+'弃置来源一张牌'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项三：'+'将本次伤害改为冰属性'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项四：'+'选项一和选项二组合'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项五：'+'选项一和选项三组合'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项六：'+'选项二和选项三组合'+'</div>'; 
					str+='<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项七：'+'选项一和选项二和选项三组合'+'</div>'; 
					list.push('cancel2');
					player.chooseControl(list,function(){
						return _status.event.choice;
					}).set('prompt',str).set('choice',choice);
					'step 2'
					if(result.control!='cancel2'){
						event.num--;
						switch(result.control){
							case '选项一':{
							player.storage.sp_guaisheng['one']=true;
							// event.one=true;				   
								break;
							}
							case '选项二':{
							// event.two=true;
								if(trigger.source&&trigger.source.num('he')) player.discardPlayerCard('he',true,trigger.source);player.logSkill('sp_guaisheng',trigger.source);
								player.storage.sp_guaisheng['two']=true;
								event.goto(4);
								break;
							}	
							case '选项三':{
							// event.three=true;
								trigger.nature='ice';
								player.logSkill('sp_guaisheng');
								player.storage.sp_guaisheng['three']=true;
								event.goto(4);
								break;
							}		
							case '选项四':{
							// event.three=true;
								if(trigger.source&&trigger.source.num('he')) player.discardPlayerCard('he',true,trigger.source);player.logSkill('sp_guaisheng',trigger.source);
								player.storage.sp_guaisheng['four']=true;
								break;
							}		
							case '选项五':{
								//event.three=true;
								trigger.nature='ice';
								player.storage.sp_guaisheng['five']=true;
								break;
							}		
							case '选项六':{
							// event.three=true;
								if(trigger.source&&trigger.source.num('he')) player.discardPlayerCard('he',true,trigger.source);player.logSkill('sp_guaisheng',trigger.source);
								trigger.nature='ice';
								player.storage.sp_guaisheng['six']=true;
								event.goto(4);
								break;
							}		
							case '选项七':{
							// event.three=true;
								if(trigger.source&&trigger.source.num('he')) player.discardPlayerCard('he',true,trigger.source);player.logSkill('sp_guaisheng',trigger.source);
								trigger.nature='ice';
								player.storage.sp_guaisheng['seven']=true;
								break;
							}								    						    						    						    						
						}
					}
					else{
						event.finish();
					}
					'step 3'
					player.chooseTarget(true,'『海洋怪声』：令一名角色摸一张牌',function(card,player,target){
						return true;
					}).set('ai',function(target){
						var player = _status.event.player;
						return get.attitude(player,target);
					});						
					'step 4'
					if(result.targets&&result.targets.length){
						player.logSkill('sp_guaisheng',result.targets[0]);
						result.targets[0].draw();						
					}
					var uncomplete=false;
					for (var i in player.storage.sp_guaisheng){
						if(player.storage.sp_guaisheng[i]!=true){
							uncomplete=true;break;
						}
					}
					if(!uncomplete){					
						player.storage.sp_guaisheng={one:false,two:false,three:false,four:false,five:false,six:false,seven:false};
						player.changeHujia();
					}					
				},
			},
			sp_guiliu:{
				audio:5,
				trigger:{global:['loseAfter','cardsDiscardAfter']},
				filter:function(event,player){
					if(event.name=='cardsDiscard'&&event.getParent().name=='orderingDiscard'&&event.getParent().relatedEvent.name=='useCard') return false;
					if(event.name=='lose'&&(event.getParent().name=='useCard'||event.position!=ui.discardPile)) return false;
					var cards=player.getCards('h');
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)=='d'){
							for(var j=0;j<cards.length;j++){
								if(get.color(event.cards[i])==get.color(cards[j])) return true;
							}
						}
					}
					return false;
				},
				check:function(event,player){
					return true;
				},
				usable:1,
				content:function(){
					'step 0'
					event.cards=[],event.cards2={};
					if(trigger.cards&&trigger.cards.length) event.num=trigger.cards.length;
					'step 1'
					event.num--;
					if(event.num>=0){
						var str='『百川归流』：选择并展示任意张同色的牌可以将';
						str+=get.translation(trigger.cards[event.num]);
						str+='等量复制洗入牌堆';
						player.chooseCard(true,[0,player.num('h')],function(card,player){
							return get.color(card)==get.color(trigger.cards[event.num]);
						}).set('ai',function(card){
							return 10-get.value(card);
						}).set('prompt',str);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.cards&&result.cards.length){
						player.showCards(result.cards);
						event.numx=result.cards.length;
						event.goto(3);
					}
					else{
						if(event.num>=0){
							event.goto(1);
						}
						else{
							event.finish();
						}					     
					}
					'step 3'
					var card=game.createCard(trigger.cards[event.num].name,trigger.cards[event.num].suit,trigger.cards[event.num].number,trigger.cards[event.num].nature);	
					if(!event.cards2[event.numx]) event.cards2[event.numx]=[];
					event.cards2[event.numx].push(card);					
					while(event.numx--){
					var card=game.createCard(trigger.cards[event.num].name,trigger.cards[event.num].suit,trigger.cards[event.num].number,trigger.cards[event.num].nature);
					for(var i=0;i<trigger.cards[event.num]['classList'].length;i++){
							if(!card.classList.contains(trigger.cards[event.num]['classList'][i])) card.classList.add(trigger.cards[event.num]['classList'][i]);
					}
					event.cards.push(card);
					}			
					//if(event.num>=0) event.goto(1);
					'step 4'
					event.cards.randomSort();
					for(var i=0;i<event.cards.length;i++){
						ui.cardPile.appendChild(event.cards[i]);
					}	 	
					for (var i in event.cards2){
						if(event.cards2[i].length>1){
							game.log(player,'将',event.cards2[i],'各',i,'张洗入了牌堆');
						}
						else{
							game.log(player,'将',event.cards2[i],i,'张洗入了牌堆');
						}
					}	
					var list=['海','沉','浪','落','涌','漩','涡','没','浮','淹','洪','河','酒','渡','洞'],cards=[],card=trigger.cards[event.num];
					if(card.classList[2]=='ocean') cards.push(card);	
					for (var i in list){
						var names=get.translation(card);
						for(var k=0;k<names.length;k++){
							if(names[k]==list[i]&&!cards.contains(card)) cards.push(card);
						} 
					}
					if(cards.length)  player.gain(cards,'gain2');										
				},
			},
		},
		characterReplace:{
		},
		dynamicTranslate:{
			tulong:function(player){
				if(player.storage.qiming_saycards&&player.storage.qiming_saycards.length) return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作<font color=#fcd>【'+get.translation(player.storage.qiming_saycards)+'】</font>使用。';
				return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作本轮『启明星辰』中声明的牌使用。';
			},
		},
		translate:{
			sea_emperor: '化鲸皇',
			HOLOEN: 'holoEN',

			sea_SasakiSaku: '海·笹木咲',
			haishou: '煽动海兽',
			haishou_info: '每轮限一次，你可以将任一非基本牌当【气】使用；你造成属性伤害时，重置此技能。',
			lishi: '幕下力士',
			lishi_info: '锁定技 你失去最后一点护甲时，摸一张牌。',
			
			sea_MinatoAqua: '海·湊阿夸',
			jinchen: '浸沉',
			jinchen_info: '出牌阶段结束时，你可以回复一点体力并翻面，视为使用一张【沉没】。',
			qianyong: '潜涌',
			qianyong_info: '锁定技 当你背面朝上时，你不能成为其他角色的【杀】或伤害类锦囊的目标且造成的海洋伤害+1；当你翻至正面时，可以视为使用一张无视防具的海【杀】或摸两张牌。',
			qianyong_draw: '潜涌',

			NagaoKei: '长尾景',
			nkfumo: '伏魔',
			nkfumo_info: '你使用牌指定其他角色为唯一目标时，你可以进行判定，若结果为黑色，将之效果改为【浪涌】。当你使用锦囊牌后，重置【忖度】。',
			chidu: '忖度',
			chidu_info: '当一名角色的判定牌生效前，你可以打出一张颜色与结果不同的手牌替换之。每回合限一次。',
			
			ShirakamiHaruka: '白神遥',
			baoxiao: '豹笑',
			baoxiao_info: '锁定技 你使用海【杀】不计入次数，且每指定一名无护甲角色为目标，你摸一张牌。',
			quru: '取乳',
			quru_info: '出牌阶段，你可以将两张非基本牌当作海【杀】使用，若你因此失去了某区域的最后一张牌，你获得1点护甲；此【杀】造成伤害时，你可以失去所有护甲令伤害等量增加。',

			KisaragiKoyori: '如月こより',
			shinve: '尸虐',
			shinve_info: '锁定技 你体力减少时，获得等量护甲。准备阶段，你失去所有护甲，摸等量的牌。',
			juzu: '举组',
			juzu_info: '<font color=#ed5>觉醒技</font> 手牌数多于你的角色对你造成伤害后，你增加1点体力上限并摸牌至体力上限，获得技能『海狗』。',
			haigou: '海狗',
			haigou_info: '锁定技 你造成的海洋伤害+1。手牌数多于你的角色无法响应你使用的能造成伤害的牌。',

			GawrGura: '噶呜·古拉',
			lingqun: '领群',
			lingqun_info: '锁定技 你于弃牌阶段弃牌后获得等量护甲。你的手牌数多于体力值时，你的护甲效果改为使你增加等量手牌上限。',
			yangliu: '洋流',
			yangliu_info: '当你使用能造成伤害的牌时，可以扣减1点护甲将此伤害改为海洋属性。然后你摸一张牌；或令之不可被响应。',

			NinomaeInanis: '一伊那尔栖',
			mochu: '墨触',
			mochu_info: '你造成暗影/海洋属性伤害时，可以摸/弃一张牌，使之改为海洋属性伤害/令你回复等同伤害值的体力。',
			fuyue: '富岳',
			fuyue_info: '每回合限一次，一名角色使用属性【杀】指定目标时，你可以令其视为对你使用【沉没】，你每因此失去一张牌，便可以为此【杀】额外指定一名目标。',

			Nana7mi: '七海',
			xieqi: '携七',
			xieqi_info: '每回合限一次，你可以将任意张点数合计为7倍数的牌当化鲸篇的一张牌使用，若仅指定了一名角色为目标，你摸等同于以此法失去牌数的牌。',
			youhai: '佑海',
			youhai_info: '你使用点数或点数合计为7的牌时，可以令至多X名角色各获得一点护甲。（X为你已损失的体力值）',

			sp_HisekiErio: '皇·绯赤艾利欧',
			qiming: '启明星辰',
			qiming_info: '锁定技 你在场时所有角色明置手牌。一轮开始时，你可以声明一种非基本牌，本轮内使用此牌同名牌的角色摸一张牌并令你回复1点体力。',
			shengbian: '升变征途',
			shengbian_info: '锁定技 当你的体力或护甲变化后，若你体力与护甲之和大于体力上限，你将体力和护甲重置至开始状态，然后摸X张牌。（X为你因此失去的体力与护甲之乘积）',
			tulong: '屠龙伐彼',
			tulong_info: '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作本轮『启明星辰』中声明的牌使用。',

			sp_GawrGura: '皇·噶呜·古拉',
			sp_guaisheng: '海洋怪声',
			sp_guaisheng_info: '当一名角色造成海洋伤害时，你可选择以下任意项构成未执行过的组合以执行：1.令一名角色摸一张牌；2.弃置来源一张牌；3.将本次伤害改为冰属性。然后若你执行过所有的组合，获得1点护甲，重置此技能。',
			sp_guiliu: '百川归流',
			sp_guiliu_info: '每回合限一次。当一张牌不因使用进入弃牌堆时，你可以展示任意同色的牌，将此牌的等量复制洗入牌堆。且若此牌牌面中有“氵”，你获得之。',

		},
	}
});