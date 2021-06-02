'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"sololive",
		connect:true,
		character:{
			/**gz莉泽 */
			gz_LizeHelesta:['female','nijisanji',3,['tongchen','wangxuan']],
			/**gz安洁 */
			gz_AngeKatrina:['female','nijisanji',4,['gz_lianjin']],
			/**向晚 */
			gz_Ava: ['female','vtuber',4,['baitai','gz_yiqu'],['guoV']],
			/**兔妈妈 */
			gz_InabaHaneru:['female','upd8',3,['gz_jiance','yingqi']],
			/**心萪 */
			gz_xinke:['female','qun',3,['zuigao','xinhuochuancheng']],
			/**雪花菈米 */
			gz_YukihanaLamy:['female','holo',4,['hanling']],
			/**语部纺 */
			gz_KataribeTsumugu:['female','nijisanji',3,['lingli','chengfo']],
		},
		skill:{
			//向晚
			baitai:{
				audio:'liuxuan_keai',
				trigger:{player:'phaseBegin'},
				usable:1,
				filter:function(event,player){
					if(player.storage.baitai_A!==0)	player.storage.baitai_A=0;
					if(player.storage.baitai_B!==0)	player.storage.baitai_B=0;
					if(player.storage.baitai_C!==0)	player.storage.baitai_C=0;
					if(player.storage.baitai_D!==0)	player.storage.baitai_D=0;
					if(player.storage.baitai_E!==0)	player.storage.baitai_E=0;
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
					'step 5'
					player.storage.baitai_E+=Math.min(player.storage.baitai_A,player.storage.baitai_B,player.storage.baitai_C,player.storage.baitai_D);
					if(player.storage.baitai_E>0) player.markSkill('baitai_E');
				},
				group:['baitai_clear','baitai_A','baitai_B','baitai_C','baitai_D','baitai_E'],
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.baitai_A||player.storage.baitai_B||player.storage.baitai_C||player.storage.baitai_D||player.storage.baitai_E;
						},
						content:function(){
							if(player.storage.baitai_A!==0)	player.storage.baitai_A=0;
							if(player.storage.baitai_B!==0)	player.storage.baitai_B=0;
							if(player.storage.baitai_C!==0)	player.storage.baitai_C=0;
							if(player.storage.baitai_D!==0)	player.storage.baitai_D=0;
							if(player.storage.baitai_E!==0)	player.storage.baitai_E=0;
							player.unmarkSkill('baitai_A');
							player.unmarkSkill('baitai_B');
							player.unmarkSkill('baitai_C');
							player.unmarkSkill('baitai_D');
							player.unmarkSkill('baitai_E');
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
							return !event.numFixed&&player.storage.baitai_B;
						},
						content:function(){
							var Buff = player.storage.baitai_B;
							trigger.num+=Buff;
						},
						marktext:'之',
						intro:{name:'百态',content:'摸牌阶段摸牌数+#'},
					},
					C:{
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
					E:{
						mod:{
							selectTarget:function(card,player,range){
								if(range[1]==-1) return;
								if(player.storage.baitai_E>0) range[1]+=player.storage.baitai_E;
							},
						},
						marktext:'🐚',
						intro:{name:'百态',content:'使用牌可指定的目标+#'},
					},
				}
			},
			gz_yiqu:{
				trigger:{player:'damageAfter'},
				usable:1,
				filter:function(event,player){
					return event.source&&player.countCards('he');
				},
				prompt2:function(event,player){
					return '你可以交给'+get.translation(event.source)+'一张牌，然后摸两张牌';
				},
				content:function(){
					'step 0'
					player.chooseCard(true,'he').set('ai',function(card){
						var att = _status.event.att;
						return 3+att>get.value(card);
					}).set('att',get.attitude(player,trigger.source))
					'step 1'
					if(result.bool&&result.cards){
						player.give(result.cards,trigger.source,'giveAuto');
						player.draw(2);
					}
				},
			},
			//皇女
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
				},
				ai:{
					order:10,
					player:1,
				}
			},
			wangxuan:{
				mod:{
					maxHandcard:function(player,num){
						if(player.isMaxHp()||player.isMaxEquip()&&player.countCards('e')) return num*2;
					},
					attackFrom:function(from,to,distance){
						if(from._wangxuan_tmp)	return;
						var num = distance;
						from._wangxuan_tmp = true;
						if(from.isMaxHp()||from.isMaxEquip()&&from.countCards('e')) num-=from.getAttackRange();
						delete from._wangxuan_tmp;
						return num;
					}
				},
			},
			//gz安洁
			gz_lianjin:{
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(!player.storage.gz_lianjin_mark)	player.storage.gz_lianjin_mark=[];
					if(!player.storage.gz_lianjin_used)	player.storage.gz_lianjin_used=[];
					return event.card&&player.countCards('h');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('gz_lianjin'),function(card,player,target){
						return true;
					}).ai=function(card){
						if(get.type(card)=='equip')	return 8-get.value(card);
						return 5-get.value(card);
					};
					'step 1'
					if(result.bool){
						player.logSkill('gz_lianjin');
						player.$give(result.cards,player,false);
						player.lose(result.cards,ui.special,'toStorage');
						player.markAuto('gz_lianjin_mark',result.cards);
					}
					else{
						event.finish();
					}
					'step 2'
					var list = {};
					player.storage.gz_lianjin_mark.filter(function(card){
						if(!list[get.suit(card)])	list[get.suit(card)] = 0;
						list[get.suit(card)]++;
					});
					event.list = list;
					if(Object.keys(event.list).length>=3&&!player.getStorage('gz_lianjin_used').contains('A')){
						event.chooseEquip = true;
						event.useSha = true;
					}else if(!player.getStorage('gz_lianjin_used').contains('B')){
						for(var i in list){
							if(list[i]>=3)	event.chooseEquip = i;
							event.useWuzhong = true;
						}
					}
					'step 3'
					if(event.chooseEquip){
						player.chooseCardButton(player.storage.gz_lianjin_mark,3,true,'选择发动『炼金』的牌').set('filterButton',function(button){
							var link = button.link;
							if(_status.event.chosen!==true)		return _status.event.chosen==get.suit(link);
							else{
								for(var i=0;i<ui.selected.buttons.length;i++){
									if(get.suit(link)==get.suit(ui.selected.buttons[i].link)) return false;
								}
								return true;
							}
						}).set('chosen',event.chooseEquip);
					}else{
						event.finish();
					}
					'step 4'
					if(result.bool){
						var cards = result.links.slice(0);
						player.unmarkAuto('gz_lianjin_mark',cards);
						event.equips = cards.filter(function(card){
							return get.type(card)=='equip';
						});
						event.others = cards.removeArray(event.equips);
						event.num = 0;
						if(!event.equips[event.num])	event.goto(10);
					}
					'step 5'
					event.card = event.equips[event.num];
					event.effect = ['equip'];
					if(get.color(event.card)=='red'){
						event.effect.add('lebu');
					}
					if(get.color(event.card)=='black'){
						event.effect.add('bingliang');
					}
					player.chooseTarget('###'+get.prompt('gz_lianjin')+'###将'+get.translation(event.card)+'置于一名角色的区域内').set('ai',function(target){
						var player = _status.event.player;
						var effect = _status.event.effect;
						var card = _status.event.card;
						var gain = 0
						if(effect.contains('lebu')&&target.canAddJudge('lebu'))			gain+=get.effect(target,{name:'lebu'},player,player);
						if(effect.contains('bingliang')&&target.canAddJudge('bingliang'))	gain+=get.effect(target,{name:'bingliang'},player,player);
						return gain*(-get.attitude(player,target)-2)+get.value(card)*(get.attitude(player,target)+2)/4;
					}).set('effect',event.effect).set('card',event.card)
					'step 6'
					if(result.bool){
						event.target = result.targets[0]
						event.target.classList.add('glow');
					}else{
						event.finish();
					}
					'step 7'
					var controls=['判定区','装备区','取消选择'];
					if(event.effect.contains('lebu')&&!event.target.canAddJudge('lebu')||event.effect.contains('bingliang')&&!event.target.canAddJudge('bingliang'))	controls.shift();
					player.chooseControl(controls).set('ai',function(){
						return _status.event.index;
					}).set('att',get.attitude(player,event.target));
					'step 8'
					event.target.classList.remove('glow');
					switch(result.index){
						case 0:{
							player.$give(event.card,event.target,false);
							if(event.effect.contains('lebu')&&event.target.canAddJudge('lebu'))		event.target.addJudge({name:'lebu'},[event.card]);
							else if(event.effect.contains('bingliang')&&event.target.canAddJudge('bingliang'))	event.target.addJudge({name:'bingliang'},[event.card]);
							break;
						}
						case 1:{
							player.$give(event.card,event.target,false);
							event.target.equip(event.card);
							break;
						}
						case 2:{
							event.goto(9);
							break;
						}
					}
					'step 9'
					event.num++;
					if(event.equips[event.num])		event.goto(5);
					'step 10'
					if(event.others&&event.others.length){
						player.$throw(event.others,1000);
						game.cardsDiscard(event.others);
						game.log(event.otherss,'被置入了弃牌堆');
					}
					'step 11'
					if(event.useSha){
						player.storage.gz_lianjin_used.add('A');
						player.chooseUseTarget({name:'sha',nature:'fire'},'是否使用第一张火【杀】？',false);
					}
					else if(event.useWuzhong){
						player.storage.gz_lianjin_used.add('B');
						player.chooseUseTarget({name:'wuzhong'},'是否使用第一张【无中生有】？',false);
					}
					'step 12'
					if(event.useSha){
						player.chooseUseTarget({name:'sha',nature:'fire'},'是否使用第二张火【杀】？',false);
					}
					else if(event.useWuzhong){
						player.chooseUseTarget({name:'wuzhong'},'是否使用第二张【无中生有】？',false);
					}
					// if(){
						
					// }
				},
				group:['gz_lianjin_mark'],
				subSkill:{
					used:{},
					mark:{
						intro:{
							content:'cards',
							onunmark:'throw',
						},
						marktext:'洁',
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.gz_lianjin_used=[];
						}
					},
				}
			},
			//黄兔
			gz_jiance:{
				trigger:{player:'zhibiAfter'},
				filter:function(event,player){
					console.log(event)
					if(!event.cards||!event.skill||event.skill.indexOf('gz_jiance_')!=0)	return false;
					var type2 = get.type2(event.cards[0]);
					return event.control&&event.control=='手牌'&&event.target.countCards('h',function(card){
						return get.type2(card)==type2;
					})==0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.choosePlayerCard(trigger.target,[1,Infinity],get.prompt('gz_jiance'),'重铸其中的任意张').set('ai',function(button){
						var val=get.buttonValue(button);
						if(get.attitude(_status.event.player,get.owner(button.link))>0) return 0.5-val;
						return val;
					}).set('visible',true);
					'step 1'
					if(result.bool&&result.cards){
						trigger.target.showHandcards('『监策』展示手牌');
						event.cards = result.cards;
						game.delayx();
					}else	event.finish();
					'step 2'
					var num = event.cards.length;
					player.logSkill('gz_jiance',target);
					trigger.target.lose(event.cards, ui.discardPile).set('visible', true);
					trigger.target.$throw(event.cards,1000);
					game.log(trigger.target,'将',event.cards,'置入了弃牌堆');
					trigger.target.draw(num);
				},
				group:['gz_jiance_spade','gz_jiance_club'],
				subSkill:{
					spade:{
						enable:'chooseToUse',
						viewAs:{name:'zhibi'},
						usable:1,
						filterCard:{suit:'spade'},
					},
					club:{
						enable:'chooseToUse',
						viewAs:{name:'zhibi'},
						usable:1,
						filterCard:{suit:'club'},
					}
				}
			},
			yingqi:{
				trigger:{global:['loseAfter','cardsDiscardAfter']},
				filter:function(event,player){
					if(event.name=='cardsDiscard'&&(event.getParent().name!='orderingDiscard'
					||(!event.getParent().relatedEvent||!event.getParent().relatedEvent.player||event.getParent().relatedEvent.name=='judge'
					||event.getParent().relatedEvent.player!=player))) return false;
					if(event.name=='lose'&&(event.position!=ui.discardPile
					||event.player!=player))	return false;
					if(_status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.maxHp!=Infinity&&_status.currentPhase.countCards('h')<_status.currentPhase.maxHp){
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])=='d'){
								return true;
							}
						}
					}
					return false;
				},
				check:function(event,player){
					if(_status.currentPhase.maxHp<_status.currentPhase.countCards('h'))	return get.attitude(player,_status.currentPhase)<0;
					return get.attitude(player,_status.currentPhase)>0;
				},
				logTarget:function(event){
					return _status.currentPhase;
				},
				content:function(){
					event.target = _status.currentPhase;
					if(event.target.maxHp<event.target.countCards('h'))		event.target.chooseToDiscard(true,event.target.countCards('h')-event.target.maxHp);
					else	event.target.gain(get.cards(event.target.maxHp-event.target.countCards('h')),'draw');
				},
				group:'yingqi_drawBy',
				subSkill:{
					drawBy:{
						trigger:{global:'loseAfter'},
						filter:function(event,player){
							if(event.name=='cardsDiscard'&&(event.getParent().name!='orderingDiscard'
							||(!event.getParent().relatedEvent||!event.getParent().relatedEvent.player||event.getParent().relatedEvent.name=='judge'
							||event.getParent().relatedEvent.player==player))) return false;
							if(event.name=='lose'&&(event.position!=ui.discardPile
							||event.player==player))	return false;
							if(_status.currentPhase==player&&player.maxHp!=Infinity&&player.countCards('h')<player.maxHp){
								for(var i=0;i<event.cards.length;i++){
									if(get.position(event.cards[i])=='d'){
										return true;
									}
								}
							}
							return false;
						},
						direct:true,
						content:function(){
							'step 0'
							var choice = (player.maxHp<player.countCards('h'))?(get.attitude(trigger.player,player)<0):(get.attitude(trigger.player,player)>0);
							trigger.player.chooseBool('是否发动『迎喫』，令'+get.translation(player)+'摸'+get.cnNumber(player.maxHp-player.countCards('h'))+'张牌？').set('choice',choice);
							'step 1'
							if(result.bool){
								player.logSkill('yingqi');
								trigger.player.line(player,'green');
								if(player.maxHp<player.countCards('h'))		player.chooseToDiscard(true,player.countCards('h')-player.maxHp);
								else	player.gain(get.cards(player.maxHp-player.countCards('h')),'draw');
							}
						}
					}
				}
			},
			//心萪
			zuigao:{
				intro:{
					content:"cards",
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				enable:'phaseUse',
				usable:1,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				check:function(card){
					var player = _status.event.player;
					var zuigao = player.getStorage('zuigao');
					for(var i of zuigao){
						if(get.suit(i)==get.suit(card))	return 7-get.value(card);
					}
					return 1-get.value(card);
				},
				discard:false,
				toStorage:true,
				delay:false,
				content:function(){
					'step 0'
					player.$give(cards,player,false);
					player.markAuto('zuigao',cards);
					'step 1'
					if(get.mode()=='guozhan'&&target.isUnseen(2)){
						player.chooseControl(true).set('prompt','令目标执行一项').set('choiceList',['展示所有手牌并弃置与此将牌上花色相同的牌','明置一张武将牌']);
					}else{
						event.goto(4);
					}
					'step 2'
					if(result.control=='选项一'){
						player.chat('展示所有手牌并弃置与此将牌上花色相同的牌');
						game.delayx();
						event.goto(4);
					}
					else if(result.control=='选项二'){
						player.chat('明置一张武将牌');
						game.delayx();
						var list=[];
						if(target.isUnseen(0))	list.push('主将');
						if(target.isUnseen(1))	list.push('副将');
						if(list.length>1) target.chooseControl(['主将','副将']).set('ai',function(){
							return Math.random()>0.5?0:1;
						}).prompt='选择并展示一张武将牌';
						else event._result={index:list[0]=='主将'?0:1};
					}
					'step 3'
					if(result.index==0){
						target.showCharacter(0);
					}
					else{
						target.showCharacter(1);
					}
					'step 4'
					target.showHandcards();
					game.delayx();
					'step 5'
					var suits = [];
					player.getStorage('zuigao').forEach(function(card){
						suits.add(get.suit(card));
					});
					var discards = target.getCards('he',{suit:suits});
					target.discard(discards);
				},
				ai:{
					order:8,
					result:{
						player:-0.2,
						target:function(player,target){
							if(target.countCards('h'))	return -(player.getStorage('zuigao').length+1);
						},
					},
				},
				group:'zuigao_draw',
				subSkill:{
					draw:{
						trigger:{player:'phaseDrawBegin'},
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							trigger.num=game.countGroup();
						},
					},
				}
			},
			xinhuochuancheng:{
				trigger:{player:['damageEnd','dyingBegin'],source:['damageEnd']},
				filter:function(event,player){
					return player.getStorage('zuigao').length&&game.hasPlayer(function(cur){
						return cur!=player;
					});
				},
				direct:true,
				locked:true,
				content:function(){
					'step 0'
					player.chooseTarget(true,'选择『心火传承』的目标',function(card,player,target){
						return target!=player;
					});
					'step 1'
					event.target = result.targets[0];
					if(event.target){
						var cards = player.getStorage('zuigao');
						if(trigger.name=='dying'){
							player.unmarkAuto('zuigao',cards);
							player.$give(cards,event.target)
							event.target.gain(cards);
							event.finish();
						}else{
							player.chooseCardButton(cards,'选择交给'+get.translation(event.target)+'的一张牌',true).set('ai',function(button){
								return get.attitude2(_status.event.target)*get.value(card,'raw',_status.event.target);
							}).set('target',event.target);
						}
					}else	event.finish();
					'step 2'
					if(result.bool&&result.links){
						var cards = result.links.slice(0);
						player.unmarkAuto('zuigao',cards);
						player.$give(cards,event.target)
						event.target.gain(cards);
					}

				},
				ai:{
					threaten:function(player,target){
						if(target.getStorage('zuigao').length) return 1.5;
						return 1;
					},
				},
			},
			//雪花菈米
			hanling:{
				trigger:{player:'damageBegin3'},
				filter:function(event,player){
					return event.source&&player.countCards('h')>event.source.countCards('h');
				},
				check:function(event,player){
					return player.countCards('h')-event.source.countCards('h')<=event.num;
				},
				prompt:function(event,player){
					return '你受到来源为'+get.translation(event.source)+'的伤害，可以将手牌弃至'+get.cnNumber(event.source)+'张以防止此伤害';
				},
				logTarget:'source',
				content:function(){
					'step 0'
					event.num = player.countCards('h')-trigger.source.countCards('h');
					player.chooseToDiscard('『寒灵』：需要弃置'+event.num+'张牌',event.num,true,'h');
					'step 1'
					trigger.changeToZero();
				},
				group:'hanling_drawBy',
				subSkill:{
					drawBy:{
						trigger:{player:'phaseEnd'},
						filter:function(event,player){
							var num=0;
							num+=player.getHistory('useCard',function(evt){
								return evt.targets&&(evt.targets.length>1||evt.targets[0]!=player);
							}).length;
							return !num&&game.hasPlayer(function(cur){
								return cur.countCards('h')<player.countCards('h');
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt2('hanling'),function(card,player,target){
								return target.countCards('h')<player.countCards('h');
							}).set('ai',function(target){
								var player = _status.event.player;
								var num = player.countCards('h')-target.countCards('h');
								return num*get.attitude(player,target);
							});
							'step 1'
							if(result.bool&&result.targets){
								event.num = player.countCards('h');
								event.target = result.targets[0];
							}else{
								event.finish();
							}
							'step 2'
							if(event.target){
								event.target.drawTo(event.num);
							}
						},
					}
				}
			},
			//语部纺
			lingli:{
				trigger:{global:'useCard'},
				clickChange:'休眠',
				clickable:function(player){
					if(player.storage.lingli_clickChange===undefined)	player.storage.lingli_clickChange = false;
					else	player.storage.lingli_clickChange = !player.storage.lingli_clickChange;
				},
				clickableFilter:function(player){
					return player.storage.lingli_clickChange!==false;
				},
				filter:function(event,player){
					if(player.storage.lingli_clickChange===false)	return false;
					return event.targets&&event.targets.length==1&&event.cards&&event.cards.length;
				},
				check:function(event,player){
					if(get.attitude(player,event.player)>0){
						return get.effect(event.targets[0],event.card,event.player,player)>1&&!['equip','delay'].contains(get.type(event.card))&&get.name(event.card)==get.name(event.cards[0])&&get.name(event.card)!='jiu';
					}
					if(get.attitude(player,event.player)<0){
						return get.effect(event.targets[0],event.card,event.player,event.player)>1&&(['equip','delay'].contains(get.type(event.card))||get.name(event.card)!='jiu');
					}
					return 0;
				},
				prompt:function(event,player){
					return get.translation(event.player)+'使用'+get.translation(event.card)+'指定'+get.translation(event.targets)+'为目标，'+get.prompt('lingli');
				},
				round:1,
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					trigger.player.gain(trigger.cards,'gain2').gaintag.add('lingli');
					trigger.player.addTempSkill('lingli_ganshe');
				},
				subSkill:{
					ganshe:{
						mod:{
							aiOrder:function(player,card,num){
								if(card.hasGaintag&&card.hasGaintag('lingli')) return num/10;
							},
						},
						ai:{
							effect:{
								player:function(card,player,target,current){
									if(card.hasGaintag&&card.hasGaintag('lingli'))	return [2,0,2,0];
								}
							}
						},
						trigger:{player:'useCardAfter',global:'phaseEnd'},
						direct:true,
						filterx:function(event,player){
							if(!player.isPhaseUsing()) return false;
							return player.getHistory('lose',function(evt){
								if(evt.getParent()!=event) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('lingli')) return true;
								}
								return false;
							}).length>0;
						},
						filter:function(event,player){
							if(event.name=='phase')	return true;
							if(!lib.skill.lingli_ganshe.filterx(event,player)) return false;
							if(event.targets&&event.targets.length>0){
								var info=get.info(event.card);
								if(info.allowMultiple==false) return false;
								if(event.targets&&!info.multitarget){
									if(game.hasPlayer(function(current){
										return event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
									})){
										return true;
									}
								}
							}
							return false;
						},
						content:function(){
							'step 0'
							if(trigger.name=='useCard'){
								var card=game.createCard(trigger.card.name,trigger.card.suit,trigger.card.number,trigger.card.nature);
								player.useCard(card,(trigger._targets||trigger.targets).slice(0),trigger.cards).skill = trigger.skill||'lingli_ganshe';
							}
							else{
								player.removeGaintag('lingli');
								event.finish();
							}
							'step 1'
							var evt=trigger.getParent('phaseUse');
							if(evt&&evt.name=='phaseUse'){
								evt.skipped=true;
							}
						}
					}
				}
			},
			chengfo:{
				enable:['chooseToUse'],
				viewAs:{name:'yiyi'},
				check:function(card){
					if(get.type(card)=='equip'&&get.position(card)=='h')	return 4-get.value(card);
					return 6-get.value(card);
				},
				filterCard:function(card,player){
					if(player.getStorage('chengfo_mark').contains(get.suit(card)))	return false;
					return true;
				},
				onuse:function(result,player){
					if(!player.storage.chengfo_mark)	player.storage.chengfo_mark = [];
					player.storage.chengfo_mark.add(get.suit(result.card,player));
					player.markSkill('chengfo_mark');
				},
				ai:{
					order:10,
					player:1,
				},
				group:['chengfo_drawBy','chengfo_clear'],
				subSkill:{
					mark:{
						onremove:true,
						intro:{
							content:function (storage,player,skill){
								if(storage.length){
									return '本回合『闭目成佛』使用过的花色：'+ get.translation(storage);
								}
							},
						}
					},
					drawBy:{
						trigger:{global:'yiyiEnd'},
						filter:function(event,player){
							return event.skill&&event.skill=='chengfo'&&event.player!=player&&event.discards&&(event.discards.filter(function(card){
								return get.type(card)=='equip';
							}).length||event.discards.length);
						},
						direct:true,
						content:function(){
							'step 0'
							//window.prompt("sometext","defaultvalue");
							player.chooseCardButton('『闭目成佛』：使用其中一张装备牌',trigger.discards).set('filterButton',function(button){
								return get.type(button.link)=='equip';
							});
							'step 1'
							if(result.bool&&result.links){
								player.useCard(result.links[0],player);
							}
							'step 2'
							var list = [];
							for(var i of trigger.discards){
								list.push(get.color(i));
							}
							if(!function(array){
								if(array.length>0){
									return !array.some(function(value,index){
										return value!==array[0];
									});
								}else{
									return false;
								}
							}(list))	event.finish();
							'step 3'
							player.draw();
						},
					},
					clear:{
						firstDo:true,
						silent:true,
						direct:true,
						trigger:{
							player:['phaseAfter']
						},
						content:function(){
							delete player.storage.chengfo_mark;
							player.unmarkSkill('chengfo_mark');
						}
					}
				}
			},
		},
		card:{
			pss_paper:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_scissor:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_stone:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			db_atk1:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_atk2:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def1:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def2:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
		},
		dynamicTranslate:{
		},
		translate:{

			pss:'手势',
			pss_paper:'布',
			pss_scissor:'剪刀',
			pss_stone:'石头',
			pss_paper_info:'石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
			pss_scissor_info:'石头剪刀布时的一种手势。克制布，但被石头克制。',
			pss_stone_info:'石头剪刀布时的一种手势。克制剪刀，但被布克制。',
			
			db_atk:'进攻对策',
			db_atk1:'全军出击',
			db_atk2:'分兵围城',
			
			db_def:'防御对策',
			db_def1:'奇袭粮道',
			db_def2:'开城诱敌',
			
			gz_Ava: '国战向晚',
			gz_yiqu: '亦趋',
			gz_yiqu_info: '每回合限一次。当你受到伤害后，你可以交给来源一张牌。若与对你造成伤害的牌花色相同，你摸两张牌。',
			baitai: '百态',
			baitai_info: '回合开始时，你可以展示所有手牌，根据各花色的牌数于本回合增加对应值：♦️~攻击范围，♣️~摸牌阶段摸牌数，♥️~手牌上限，♠️~出牌阶段可使用【杀】的次数；一组四种花色~使用牌额外选择目标。',

			gz_LizeHelesta: '国战莉泽',
			tongchen: '同尘',
			tongchen_info: '出牌阶段限一次，若你攻击范围内有角色某一区域内的牌数与你在该区域的牌数不等，你可在你与其的该区域间移动一张牌。然后若你与其在该区域内的牌数相等，你摸一张牌。',
			wangxuan: '王选',
			wangxuan_info: '锁定技 当你的体力或装备区装备为全场最多时，你的手牌上限和攻击范围翻倍。',

			gz_InabaHaneru: '国战因幡はねる',
			gz_InabaHaneru_ab: '国战因幡',
			gz_jiance: '监策',
			gz_jiance_spade: '监策♠',
			gz_jiance_club: '监策♣',
			gz_jiance_info: '每回合每项限一次，你可以将一张♠️/♣️牌当【知己知彼】使用。若选择观看手牌且其中没有你转化牌的类型，你可以展示之并重铸其中任意张。',
			yingqi: '迎喫',
			yingqi_info: '其他角色的牌在你的回合进入弃牌堆后，其可以令你将手牌数调整至体力上限。你的牌在其他角色的回合进入弃牌堆后，你可以令其将手牌数调整至体力上限。',

			gz_xinke: '心萪',
			zuigao: '最高指令',
			zuigao_info: '摸牌阶段，你摸等同于场上势力数的牌。出牌阶段限一次，你可以将一张牌置于此将牌上，令一名角色：展示所有手牌并弃置与此将牌上花色相同的牌；或明置一张武将牌。',
			xinhuochuancheng: '心火传承',
			xinhuochuancheng_info: '锁定技 当你造成或受到伤害后，你需将此将牌上的一张牌交给其他角色。你进入濒死状态时，若此将牌上有牌，你需将此将牌上所有牌交给其他角色并回复1点体力。',
			
			gz_YukihanaLamy: '雪花菈米',
			hanling: '寒灵',
			hanling_info: '当你受到伤害时，若来源手牌数小于你，你可以将手牌弃至与其相等防止此伤害。你的回合结束时，若本回合你未对其他角色使用过牌，你可以令一名角色摸牌至与你手牌相同。',
			
			gz_KataribeTsumugu: '语部纺',
			lingli: '灵力干涉',
			lingli_info: '轮次技 当一张牌指定唯一角色为目标时，你可以令之无效并返回来源手牌。然后其本回合使用此牌时结束当前阶段并额外结算一次。',
			chengfo: '闭目成佛',
			chengfo_info: '你可以将一张本回合未使用过花色的牌当【以逸待劳】使用。其他角色因此弃置牌后，若包含装备牌，你可以使用其中一张；若为同色，你摸一张牌。',

			gz_AngeKatrina: '国战安洁',
			gz_lianjin:'炼金',
			gz_lianjin_info:'当你使用一张牌后，可以将一张手牌置于此将牌上。然后若此将牌上有三种不同/相同花色的牌，你将其中的装备牌置入场上，弃置其余的牌，视为使用了两张：火【杀】/【无中生有】，然后本回合不再触发此项。',
	
		}
	};
});