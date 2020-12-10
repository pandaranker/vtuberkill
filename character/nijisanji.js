'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'nijisanji',
        connect:true,
        character:{
			/**物述有栖 */
			MononobeAlice:['female','nijisanji',3,['tinenghuifu1','dianmingguzhen']],
			/**静凛 */
			ShizukaRin:['female','nijisanji',4,['mozhaotuji']],
			/**家长麦 */
			IenagaMugi:['female','nijisanji',3,['fengxue','yuepi','cangxiong']],
			/**月之美兔 */
			MitoTsukino:['female','nijisanji',3,['mark_bingdielei','mark_quanxinquanyi'],['zhu']],
			/**宇志海莓 */
			UshimiIchigo: ['female', 'nijisanji', 3, ['kuangbaoshuangren', 'guangsuxiabo']],
			/**铃鹿诗子 */
			SuzukaUtako: ['female', 'nijisanji', 3, ['meici', 'danlian']],
			/**樋口枫 */
			HiguchiKaede: ['female', 'nijisanji', 4, ['zhenyin', 'saqi']],
			/**修女克蕾雅 */
			SisterClearie:['female','nijisanji',3,['zhenxin','zhuwei']],
        },
        characterIntro:{
			MononobeAlice:'物述有栖者，雷电掌控者也，寄以jk身份隐藏之，然尝小嘴通电，小兔子皆知爱丽丝非凡人，喜红茶，尤善奥术魔刃，为北方氏族youtube恶之，V始十八年，举家迁徙bilibili，V始二十年，月之美兔揭竿而起，爱丽丝毁家纾难，以家助美兔建国，拜一字并肩王。',
			HiguchiKaede: '樋口枫者，关西之游侠也，姿色天然占尽风流，善以琴杀人，来去翩翩，有宾客枫组三千，V始二十年，月之美兔兴于西北，自封委员长、上将军，建国曰彩虹，枫率宾客从之，枫尝与杏之福禄将军萝卜子交好，惺惺相惜，成V界之佳话。',
			ShizukaRin:'静凛者，皇族也，因父败于樱巫女被贬为庶人，遂恨朝廷，先随绊爱征战，绊爱初建国，不慕名利，往杏国扶之，先取天水后取临沂，成杏国之伟业，元昭欲拜之国师，又避之，尝与美兔弈棋，战百余合，喜曰：美兔知我矣！遂安于彩虹。',
			IenagaMugi:'家长麦者，诸国之辩士也，善言辞，三言便使otaku气坠于马下，吐血斗升，Mugi嗜乐如命，与当世之乐圣交好，互为知音。英语上手，身负苦难，为父母厌恶之人，麦自V始年间便游于天下，为救美兔取祸于朝廷，流亡海外，有《辩书》广为人知。',
			MitoTsukino:'彩虹社的红龙、英才教育者，虹社的统领者、lonely eater、全人类之委员长、脑控宗师、月之小丑、双生暗影、行为艺术家、至高魔主、怒涛聚集、海洋王者、永不沉寂者、彩虹社永远滴真神，月之美兔是也。',
			UshimiIchigo: "宇志海莓者，深海之海兔也，修炼千年化形为人，海莓原自起于海滨，拥者不计其数，性狂暴，曾以一人顶勒夫千军，V始二十年，美兔兴，海莓从之，首封平西候，海莓嗜睡，时到即宕机，美兔遣御前侍卫日夜守之。",			
			SuzukaUtako: '腐烂的贞德、历战的尸套龙、饥饿的恐暴龙、攻击性的母性、古老的腐女、每秒都在渗出黑历史的女人、801战争的英灵、腐女子的末路、从温暖的图片中看出阴暗的女人、背景是正太自助餐、深网的魔物、过滤未成年直播者、彩虹社诞生出的怪物、DeathZone、唯一让DD害怕的大姐姐、国际问题、邪神美兔崇拜者、十年后的月之美兔、属性商店、神造兵器、有行动力的变态、出口即是真言、行走的HiAce、酒淋浴、母性的墓场、假面具即将掉落的铃鹿诗子。',
			SisterClearie:	'“今日也愿神加护于你……”',
		},
        skill:{
            fuheijs:{
				enable:"phaseUse",
				filter:function(event,player){
					return player.countDiscardableCards(player,'he')!=0
				},
                content:function(){
					'step 0'
					var list=['弃置一名角色的1张装备牌'];
					if(lib.skill.fuheijs.canMoveCard(player)) list.push('将一名其他角色装备区内的一张牌移动到另一名角色的装备区内');
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('fuheijs')).set('ai',function(){
						if(lib.skill.fuheijs.canMoveCard(player,true)) return 1;
						return 0;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('fuheijs');
						if(result.index==1) event.goto(5);
						else event.count=1;
					}
					else event.finish();
					'step 2'
					player.chooseTarget('弃置一名其他角色的一张装备牌',function(card,player,target){
						if(player==target) return false;
						return target.countDiscardableCards(player,'e');
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 3'
					if(result.bool){
						player.chooseToDiscard('he',true);
						player.line(result.targets[0],'green');
						player.discardPlayerCard(result.targets[0],'e',true);
						event.count--;
					}
					else event.finish();
					'step 4'
					if(event.count) event.goto(2);
					else event.finish();
					'step 5'
					player.chooseToDiscard('he',true);
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							return target.countCards('e')>0;
						}
					});
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=player&&current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&current!=player&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张装备牌');
					next.set('forced',true);
					'step 6'
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 7'
					game.delay();
					'step 8'
					if(targets.length==2){
						player.choosePlayerCard('e',true,function(button){
							var player=_status.event.player;
							var targets0=_status.event.targets0;
							var targets1=_status.event.targets1;
							if(get.attitude(player,targets0)>get.attitude(player,targets1)){
								if(get.value(button.link,targets0)<0) return 10;
								return 0;
							}
							else{
								return get.equipValue(button.link);
							}
						},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							return targets1.isEmpty(get.subtype(button.link));
						});
					}
					else{
						event.finish();
					}
					'step 9'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						event.targets[1].equip(link);
						event.targets[0].$give(link,event.targets[1])
						game.delay();
						event.result={bool:true};
					}
                },
				canMoveCard:function(player,withatt){
					return game.hasPlayer(function(current){
						if(player==current) return false;
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(player==current2) return false;
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att2!=get.sgn(get.value(es[i],current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.isEmpty(get.subtype(es[i]));
								})){
									return true;
								}
							}
						}
					});
				}
            },
            leiyan:{
				trigger:{player:'useCard1'},
				forced:true,
                firstDo:true,
                filter:function(event,player){
					//console.log(event);
					if(event.card.name!='sha'||event.card.nature!='thunder') return false;
					return true;
                },
				content:function(){
                },
				mod:{
					selectTarget:function(card,player,range){
						//console.log(card.nature,range);
						if(card.name!='sha'||card.nature!='thunder') return;
						if(range[1]==-1) return;
						range[1]+=2;
					},
				},
				group:['leiyan_qinggang'],
				subSkill:{
					qinggang:{
						trigger:{
							player:'useCardToPlayered',
						},
						filter:function(event){
							return event.card.name=='sha'&&event.card.nature=='thunder';
						},
						forced:true,
						logTarget:'target',
						content:function(){
							trigger.target.addTempSkill('leiyan2');
							trigger.target.storage.leiyan2.add(trigger.card);
						},
						ai:{
							unequip_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.name=='sha') return true;
								return false;
							}
						}
					},
				}
            },
			leiyan2:{
				firstDo:true,
				ai:{unequip2:true},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage','damageCancelled','damageZero'],
					target:['shaMiss','useCardToExcluded'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.leyan2&&event.card&&player.storage.leyan2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.leyan2.remove(trigger.card);
					if(!player.storage.leyan2.length) player.removeSkill('leyan2');
				},
			},
            xiaozhangduandai:{
				skillAnimation:true,
				animationColor:'orange',
				unique:true,
				juexingji:true,
				trigger:{player:'dyingBegin'},
				forced:true,
				derivation:'yongchun',
				filter:function(event,player){
					if(player.storage.yongchun) return false;
					return player.hp<player.maxHp;
				},
				content:function(){
					player.awakenSkill('qianxin');
					player.storage.yongchun=true;
					player.addSkill('yongchun');
                    player.hp+=3;
                    player.draw(3);
				}
            },
            yongchun:{
                enable:"phaseUse",
                trigger:{player:'shaBegin'},
                frequent:true,
                forced:false,
				filterCard:function(card){//选择的牌需要满足的条件
					return card.name=='sha';//例子，只能选择红色牌
				},
                content:function(){
                    player.draw(1);
                    player.chooseToDiscard('he',true);
                    player.getStat().card.sha--;
                }
			},
			tinenghuifu1:{
				trigger:{player:'loseAfter'},
				forced:true,	
				nopop:false,//player是否logSkill('此技能')，true为不
				filter:function(event,player){
					return event.es&&event.es.length>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.es.length;
					"step 1"
					event.count--;
					player.recover();
					"step 2"
					if(event.count>0){
						//console.log(event.count);
						player.chooseBool(get.prompt2('tinenghuifu1')).set('frequentSkill','tinenghuifu1').ai=lib.filter.all;
					}
					"step 3"
					if(result.bool){
						//game.delay();
						result.bool=false;
						event.goto(1);
					}
				},
				group:['tinenghuifu1_hp'],
				subSkill:{
					hp:{
						trigger:{player:['loseHpEnd','damageEnd']},
						forced:true,	
						nopop:true,//player是否logSkill('此技能')，true为不
						content:function(){
							player.draw(1);
							player.logSkill('tinenghuifu');
						}
					}
				}
				
			},
			dianmingguzhen:{
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					if(!game.hasPlayer(function(current){
						return current.countCards('e')>0;
					})) return false;
					return true
				},
				content:function(){
					'step 0'
					player.loseHp(1);
					'step 1'
					//console.log(lib.skill.dianmingguzhen.canMoveCard(player));
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							return target.countCards('e')>0;
						}
					});
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=player&&current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&current!=player&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张装备牌');
					next.set('forced',true);
					'step 2'
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					game.delay();
					'step 4'
					if(targets.length==2){
						player.choosePlayerCard('e',true,function(button){
							var player=_status.event.player;
							var targets0=_status.event.targets0;
							var targets1=_status.event.targets1;
							if(get.attitude(player,targets0)>get.attitude(player,targets1)){
								if(get.value(button.link,targets0)<0) return 10;
								return 0;
							}
							else{
								return get.equipValue(button.link);
							}
						},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							return targets1.isEmpty(get.subtype(button.link));
						});
					}
					else{
						event.finish();
					}
					'step 5'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						event.targets[1].equip(link);
						event.targets[0].$give(link,event.targets[1]);
						event.equiptype=get.subtype(link);
						game.delay();
						event.result={bool:true};
					}
					'step 6'
					if(event.targets[0]!=player){
						event.finish();
					}
					else{
						if(event.judgeGroup==null)
							event.judgeGroup=[];
					}
					'step 7'
					event.equiptype=parseInt(event.equiptype.slice(5));
                    event.players=game.filterPlayer(function(current){
						return (current!=player)&&(!current.getEquip(event.equiptype));
                    });
					event.players.sortBySeat(player);
					'step 8'
                    if(event.playersIndex==null){
                        event.playersIndex=0;
                    }
                    if(event.playersIndex<event.players.length){
						////getCards('e',{subtype:['equip3','equip4','equip6']}));
						if(!event.players[event.playersIndex].getEquip(event.equiptype)){
							player.useCard({name:'sha',nature:'thunder',isCard:true},event.players[event.playersIndex],false);
							//player.getStat().card.sha--;
						}
					}
					'step 9'
					if(!result.bool){
						event.judgeGroup.add(event.players[event.playersIndex]);
					}
					event.playersIndex++;
					if(event.playersIndex<event.players.length){
						event.goto(8);
					}
					'step 10'
					if(event.judgeGroup.length>0){
						var shanString='<br>';
						for(var i=0;i<event.judgeGroup.length;i++){
							shanString+=(get.translation(event.judgeGroup[i])+',');
						}
						player.chooseBool('是否对所有闪避者追加闪电判定？'+shanString);
					}
					else{
						event.finish();
					}
					'step 11'
					if(!result.bool){
						event.finish();
					}
					'step 12'
						//console.log(player.getStat().card.sha);
					if(event.judgeGroup.length>0){
						event.judgeGroup[0].judge(function(card){
							if(get.suit(card)=='spade'&&(get.number(card)>=2&&get.number(card)<=9)) return 2;
						});
					}
					else{
						event.finish();
					}
					'step 13'
					game.delay();
					if(event.judgeGroup.length>0){
						if(result.judge==2){
							event.judgeGroup[0].damage(3,'thunder','nosource');
						}
						event.judgeGroup.shift();
						event.goto(12)
					}
					else{
						event.finish();
					}
				},
				canMoveCard:function(player,withatt){
					return game.hasPlayer(function(current){
						if(player==current) return false;
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(player==current2) return false;
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att2!=get.sgn(get.value(es[i],current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.isEmpty(get.subtype(es[i]));
								})){
									return true;
								}
							}
						}
					});
				},
			},
			mozhaotuji:{
				group:['mozhaotuji_DrawOrStop','mozhaotuji_Clear','mozhaotuji_Ready','mozhaotuji_Judge','mozhaotuji_PhaseDraw','mozhaotuji_Discard','mozhaotuji_End'],
				/**转化阶段 */
				contentx:function(trigger,player){
					'step 0'
					if(!player.hasSkill('mozhaotujiStart'))
						player.addTempSkill('mozhaotujiStart');
					trigger.cancel();
					var stat=player.getStat();
					stat.card={};
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
					'step 1'
					player.phaseUse();
					'step 2'
					var stat=player.getStat();
					stat.card={};
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
				},
				subSkill:{
					DrawOrStop:{
						trigger:{global:'phaseUseAfter'},
						filter:function(event,player){
							if((player.getHistory('useCard').length)>=2)
								return true;
							else if((player.getHistory('useCard').length)==0)
								return player==_status.currentPhase;
							else
								return false;
						},
						priority: 14,
						forced:true,
						content:function(){
							'step 0'
							if((player.getHistory('useCard').length)>=2)
								player.draw(1);
							else
								player.addTempSkill('mozhaotujiStop');
							// 'step 1'
							// player.getHistory('useCard').splice(0,player.getHistory('useCard').length);
							// player.getHistory('respond').splice(0,player.getHistory('respond').length);
						},
					},
					Clear:{
						trigger:{player:'phaseUseAfter'},
						direct:true,
						priority: 1,
						filter:function(event,player){
							return true;
						},
						forced:true,
						content:function(){
							player.getHistory('useCard').splice(0,player.getHistory('useCard').length);
							player.getHistory('respond').splice(0,player.getHistory('respond').length);
						},
					},
					Ready:{
						trigger:{
							player:'phaseZhunbeiBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把准备阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Judge:{
						trigger:{
							player:'phaseJudgeBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把判定阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					PhaseDraw:{
						trigger:{
							player:'phaseDrawBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把摸牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Discard:{
						trigger:{
							player:'phaseDiscardBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把弃牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					End:{
						trigger:{
							player:'phaseJieshuBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把结束阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
				}
			},
			mozhaotujiStart:{
				trigger:{
					player:['phaseJudgeAfter','phaseDrawAfter','phaseDiscardAfter']
				},
				direct:true,
				filter:function(event,player){
					if((player.getHistory('useCard').length+player.getHistory('respond').length)==0)
						return true;
					else
						return !player.hasSkill('mozhaotujiStop');
				},
				content:function(){
					player.addTempSkill('mozhaotujiStop');
				}
			},
			mozhaotujiStop:{

			},
			fengxue:{
				trigger:{
					player:'phaseUseBefore'
				},
				content:function(){
					'step 0'
					player.logSkill('fengxue');
					trigger.cancel();
					'step 1'
					event.players=[];
					event.players=game.filterPlayer(function(current){
						return (current!=player)&&current.hp>=player.hp;
					});
					'step 2'
					ui.clear();
					var num;
					num=event.players.length+1;
					var cards=get.cards(num);
					event.cards=cards;
					event.gains=[];
					event.discards=[];
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					game.log(player,'观看了','#y牌堆顶的牌');
					//var content=['牌堆顶的'+event.cards.length+'张牌',event.cards];
					//player.chooseControl('ok').set('dialog',content);
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 3'
					if(!result.links[0]){
						ui.clear();
						event.finish();
					}
					else{
						var bool=game.hasPlayer(function(current){
							return player.canUse(result.links[0],current);
						});
						if(bool){
							player.chooseUseTarget(result.links[0],true,false);
						}
						else event.discards.push(result.links[0]);
						event.cards.remove(result.links[0]);
					}
					'step 4'
					//player.gain(event.cards,'gain2');
					// if(event.discards.length){
					// 	player.$throw(event.discards);
					// 	game.cardsDiscard(event.discards);
					// }
					ui.clear();
					'step 5'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
					if(event.cards.length==0){
						event.finish();
					}
					'step 6'
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学(获取一种花色牌)',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 7'
					if(result.links[0]){
						game.log(player,'选择了',get.translation(get.suit(result.links[0])+'2'));
						event.cards.forEach(card => {
							if(get.suit(card)==get.suit(result.links[0])){
								event.gains.push(card);
							}
							else{
								event.discards.push(card);
							}
						});
					}
					if(event.discards.length){
						player.$throw(event.discards);
						game.cardsDiscard(event.discards);
					}
					if(event.gains.length){
						//game.log(player,'获得了',event.gains);
						player.gain(event.gains,'gain2');
					}
					'step 8'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
				},
				check:function(event,player){
					if(player.hp<2) return false;
					if(player.countCards('h')<1) return true;
					if(player.countCards('e')>=2) return true;
					return false;
				},
				ai:{
					result:{
						player:function(player){
							if(player.hp<2) return -2;
							if(player.countCards('e')>=2) return 1;
							return -2;
						}
					},
				}
			},
			yuepi:{
				trigger:{
					player:'phaseDiscardBefore',
				},
				filter:function (event,player){
					return (player.countCards('h')>=player.countCards('e'))&&player.countCards('e')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',player.countCards('e'),true,'请选择重铸的牌');
					'step 1'
					player.lose(result.cards, ui.discardPile);
					player.$throw(result.cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
					'step 2'
					player.draw(player.countCards('e'));
					player.addTempSkill('yuepi_handLimit');
				},
				subSkill:{
					handLimit:{
						mod:{
							maxHandcard:function (player,num){
								return num+player.countCards('e');
							},
						}
					}
				}
			},
			cangxiong:{
				trigger:{
					global:'changeHp'
				},
				filter:function (event,player){
					if(!event.player||event.player==player||player.countCards('h')==0) return false;
					return event.player.hp==1;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',[1,Infinity],true,'请选择要给对方的牌').set('ai',function(card){
						if((event.player.countCards('h')+ui.selected.cards.length)>(player.countCards('h')-ui.selected.cards.length)) return -1;
						return 7-get.value(card);
					});;
					'step 1'
					if(result.cards){
						trigger.player.gain(result.cards,player,'giveAuto');
					}
					'step 2'
					if(trigger.player.countCards('h')>player.countCards('h')){
						if(player.storage.outPlayers==null){
							player.storage.outPlayers=[];
						}
						player.storage.outPlayers.push(trigger.player);
						trigger.player.addTempSkill('cangxiong_diao',{target:'phaseBegin'});//移除游戏
						game.broadcastAll(function(splayer){
								splayer.out('cangxiong_diao');
							},trigger.player
						)
					}
				},
				subSkill:{
					diao:{
						trigger:{global:['phaseAfter','turnOverAfter']},
						mark:true,
						direct:true,
						filter:function(event,player){
							if(event.player.next!==player){
								return false;
							}
							else if(event.name=='turnOver'&&event.player.isTurnedOver()) {
								return false; 
							}
							else if(event.name=='turnOver'&&event.player!=_status.currentPhase){
								return false;
							}
							else{
								game.broadcastAll(function(splayer){
										splayer.in('cangxiong_diao');
									},player
								)
							}
							return true;
							//player.in('cangxiong_diao');
							//player.in('cangxiong_diao');
							//

						},
						intro:{
							content:'移除游戏外'
						},
						content:function(){
							game.broadcastAll(function(splayer){
								_status.dying.remove(splayer);
							},player)
							player.removeSkill('cangxiong_diao');
						}
					},
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0
				},
				ai:{
					basic:{
						order:10
					},
					result:{
						target:function(player,target){
							return get.attitude(player,target)
						},
					},
					threaten:1.3
				}
			},
			chaoqianyishi:{
				trigger:{global:['phaseEnd']},
				filter:function(event,player){
					if(player.hasSkill('chaoqianyishi_tag')){
						return true;
					}
					else
						return false;
				},
				content:function(){
					"step 0"
					player.draw(player.maxHp);
					"step 1"
					player.chooseCard(player.hp,'he','选择放置到牌堆顶部或底部的牌',true);
					"step 2"
					if(result.bool==true&&result.cards!=null){
						event.cards=result.cards
					}
					player.chooseBool("选择确定放置到牌堆顶部，取消放置到牌堆底部");
					"step 3"
					event.intop=result.bool;
					if(result.bool){
						if(event.cards.length>0){
							//player.$throw(cards,1000);
							//player.lose(event.cards,ui.special,'visible');
							player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
								var value=get.value(button.link);
								if(_status.event.reverse) return value;
								return -value;
							}).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
						}
					}
					else{
						if(event.cards.length>0){
							//player.lose(event.cards,ui.special);
							//player.$throw(cards,1000);
							//player.lose(event.cards,ui.special,'visible');
							player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆底（先选择的在下）',event.cards]).set('ai',function(button){
								var value=get.value(button.link);
								if(_status.event.reverse) return value;
								return -value;
							}).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
						}
					}
					"step 4"
					if(result.bool&&result.links&&result.links.length) event.linkcards=result.links.slice(0);
					game.delay();
					'step 5'
					var cards=event.linkcards;
					//player.$throw(cards,1000);,'visible'
					game.log(player,'将',cards,'置于牌堆');
					player.lose(cards,ui.special);
					'step 6'
					game.delay();
					'step 7'
					var cards=event.linkcards;
					if(event.intop){
						while(cards.length>0){
							var card=cards.pop();
							card.fix();
							ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
							game.updateRoundNumber();
								//game.log(player,'将',card,'置于牌堆顶');
						}
					}
					else{
						while(cards.length>0){
							var card=cards.pop();
							card.fix();
							// player.lose(card,ui.special,'toStorage');
							// player.$throw(card,100);
							ui.cardPile.appendChild(card);
							game.updateRoundNumber();
							//game.log(player,'将',card,'置于牌堆底');
						}
					}
				},
				group:['chaoqianyishi_ready'],
				subSkill:{
					ready:{
						trigger:{player:['damageAfter','loseHpAfter','loseAfter']},
						direct:true,
						filter:function(event,player,name){
							if(name=='loseAfter'){
								var indexi=0
								while(indexi<event.cards.length){
									if(get.type(event.cards[indexi])=='trick')
										return true;
									indexi++;
								}
								return false;
							}
							else 
								return true;
						},
						content:function(){
							if(!player.hasSkill('chaoqianyishi_tag'))
								player.addTempSkill('chaoqianyishi_tag');
						}
					},
					tag:{
						mark:true,
						intro:{
							content:function(){
								return '结束时触发技能'+get.translation('chaoqianyishi')
							}
						}
					}
				}
			},
			hengkongchushi:{
				trigger:{player:'phaseUseBefore'},
				content:function(){
					player.addTempSkill('hengkongchushi_cannot',{player:'phaseUseAfter'});
					player.addTempSkill('hengkongchushi_qiyuyong',{player:'phaseUseAfter'});
					player.addTempSkill('hengkongchushi_moyuqi',{player:'phaseUseAfter'});
					player.addTempSkill('hengkongchushi_nanman');
					player.addTempSkill('nochongzhu',{player:'phaseUseAfter'});
				},
				subSkill:{
					cannot:{
						mark:true,
						markText:'禁',
						intro:{
							content:'禁止出牌'
						},
						mod:{
							cardEnabled:function(){
								return false;
							},
							cardSavable:function(){
								return false;
							},
						}
					}
				}
			},
			hengkongchushi_qiyuyong:{
				enable:"phaseUse",
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					"step 0"
					player.chooseToDiscard(1,'选择一张牌弃置','he',true);
					"step 1"
					if(result.cards.length>0){
						event.cards=get.bottomCards();
						player.showCards(event.cards,'底牌展示');
						game.delayx();
					}
					else{
						event.finish();
					}
					"step 2"
					player.removeSkill('hengkongchushi_cannot');
					var bool=game.hasPlayer(function(current){
						return player.canUse(event.cards[0],current)&&lib.filter.targetEnabled2(event.cards[0],player,current);
					});
					if(bool){
						player.chooseUseTarget(event.cards[0],true,false);
					}
					else{
						game.cardsDiscard(event.cards[0]);
						game.log(event.cards[0],'从牌堆弃置到弃牌堆');
						player.removeSkill('hengkongchushi_qiyuyong');
					}
					"step 3"
					player.addTempSkill('hengkongchushi_cannot',{player:'phaseUseAfter'});
				}
			},
			hengkongchushi_moyuqi:{
				enable:"phaseUse",
				content:function(){
					"step 0"
					player.draw();
					"step 1"
					event.cards=get.bottomCards();
					player.showCards(event.cards,'底牌展示');
					game.delayx();
					"step 2"
					var bool=get.suit(event.cards[0])=='club';
					game.cardsDiscard(event.cards[0]);
					game.log(event.cards[0],'从牌堆弃置到弃牌堆');
					if(bool){
						event.finish()
					}
					"step 3"
					player.removeSkill('hengkongchushi_moyuqi');
				}
			},
			hengkongchushi_nanman:{
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player,name){
						var allcards=[];
						var newcard={};
						player.getHistory('useCard').forEach(valueI=>{
							allcards.addArray(valueI.cards);
						}
						);
						player.getHistory('respond').forEach(valueI=>{
							allcards.addArray(valueI.cards);
						}
						);
						player.getHistory('lose').forEach(valueI=>{
							allcards.addArray(valueI.cards);
						}
						);
						if(allcards.length<game.countPlayer()) return false;
						while(allcards.length>0){
							newcard=allcards.pop();
							console.log(newcard,allcards);
							if(get.suit(newcard)!='spade'&&get.suit(newcard)!='club'){
								return false
							}
						}
						return true;
				},
				content:function(){
					var list=game.filterPlayer(function(current){
						return player.canUse('nanman',current);
					});
					list.sortBySeat();
					player.useCard({name:'nanman'},list);
				}
			},
			nochongzhu:{

			},
			wenhuazhian:{
				unique:true,
				group:'wenhuazhian2',
				zhuSkill:true,
			},
			wenhuazhian2:{
				audio:2,
				//forceaudio:true,
				trigger:{global:'damageSource'},
				usable:1,
				filter:function(event,player){
					if(player==event.source||!event.source||event.source.group!='nijisanji') return false;
					return player.hasZhuSkill('wenhuazhian',event.source);
				},
				direct:true,
				content:function(){
					'step 0'
					trigger.source.chooseBool('是否对'+get.translation(player)+'发动【文化之暗】？').set('choice',get.attitude(trigger.source,player)>0);
					'step 1'
					if(result.bool){
						player.logSkill('wenhuazhian');
						trigger.source.line(player,'green')
						trigger.source.judge(function(card){
							if(get.suit(card)=='club') return 4;
							return 0;
						});
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.suit=='club'){
						game.delayx();
						trigger.source.draw();
						ui.cardPile.appendChild(result.card);
					}
				}
			},

			
			mark_bingdielei:{
                group:'mark_bingdielei_damageBy',
				subSkill:{
					damageBy:{
						trigger:{player:'damageBegin4',source:'damageBegin4'},
						priority:99,
						filter:function(event,player){
							return event.num&&!_status.event.getParent('phase').skill;
						},
						direct:true,
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							player.markSkill(event.name);
							player.logSkill(event.name);
							player.addTempSkill('mark_bingdielei_anotherPhase');
						},
					},
					anotherPhase:{
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						filter:function(event,player){
							return player.countCards('he',{suit:'club'})||player.countCards('he',{type:'equip'});
						},
						prompt2:'你可以弃置一张♣或装备牌以获得一个额外回合',
						intro: {
							content:'当前回合结束后可以获得一个额外回合',
							name:'并蒂恶蕾',
						},
						content:function(){
							'step 0'
							player.chooseToDiscard('###『并蒂恶蕾』###弃置一张♣或装备牌以获得一个额外回合','he',function(card){
								return get.suit(card)=='club'||get.type(card)=='equip';
							})
							'step 1'
							if(result.bool){
								player.markSkill(event.name);
								game.delayx();
								player.logSkill(event.name);
								player.insertPhase();
							}
						},
					},
				},
			},
			mark_quanxinquanyi:{
				init:function(player,skill){
					player.storage[skill]=[];
				},
				group:['mark_quanxinquanyi_begin','mark_quanxinquanyi_saycards','mark_quanxinquanyi_loseBy','mark_quanxinquanyi_endRound'],
				subSkill:{
					begin:{
						trigger:{global:'roundStart'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							'step 0'
							if(player.hasMark('mark_quanxinquanyi_saycards')) player.unmarkSkill('mark_quanxinquanyi_saycards');
							if (!player.storage.mark_quanxinquanyi_loseBy) player.storage.mark_quanxinquanyi_loseBy = true;
							player.storage.mark_quanxinquanyi_saycards.length = 0;
							'step 1'
							player.chooseBool('###是否发动『全新全异』###一轮开始时，你可以声明一张未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。')
							'step 2'
							if(result.bool){
								player.logSkill('mark_quanxinquanyi');
								event.videoId = lib.status.videoId++;
								var list=[];
								for(var i=0;i<lib.inpile.length;i++){
									var name=lib.inpile[i];
									var reapeat = 0;
									if(player.storage.mark_quanxinquanyi.length){
										player.storage.mark_quanxinquanyi.forEach(function(his){	
											if(his==name) reapeat ++;
										});
									}
									if(reapeat||name=='wuxie'||name=='jinchan') continue;
									else if(get.type(name)=='trick') list.push(['锦囊','',name]);
								}
								game.broadcastAll(function(id, list){
									var dialog=ui.create.dialog('声明一张牌',[list,'vcard']);
									dialog.videoId = id;
								}, event.videoId, list);
							}else{
								event.finish();
							}
							'step 3'
							var next = player.chooseButton(1 ,true);
							next.set('dialog',event.videoId);
							'step 4'
							game.broadcastAll('closeDialog', event.videoId);
							if (result.bool) {
								player.storage.mark_quanxinquanyi_saycards.add(result.links[0][2]);
								player.storage.mark_quanxinquanyi.add(result.links[0][2]);
								game.log(player,'的『全新全异』声明了【',player.storage.mark_quanxinquanyi_saycards,'】');
								player.syncStorage('mark_quanxinquanyi_saycards');
								player.markSkill('mark_quanxinquanyi_saycards');
							}
						}
					},
					saycards:{
						init:function(player,skill){
							if (!player.storage.mark_quanxinquanyi_saycards) {
								player.storage.mark_quanxinquanyi_saycards = [];
							}
						},
						locked:true,
						notemp:true,
						marktext: '异',
						intro: {
							content: function(storage,player){
								if(player.storage.mark_quanxinquanyi_loseBy) return '声明了【'+get.translation(player.storage.mark_quanxinquanyi_saycards)+'】';
								else return '声明了【'+get.translation(player.storage.mark_quanxinquanyi_saycards)+'】,当前轮次已有同名牌进入弃牌堆';
							},
							name:'『全新全异』',
						}
					},
					loseBy:{
						init:function(player,skill){
							if (!player.storage[skill]){
								player.storage[skill] = true;
							}
						},
						trigger:{global:'phaseEnd'},
						priority:999,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return game.getGlobalHistory('cardMove',function(evt){
								if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.position==ui.discardPile)){
									var num = 0;
									evt.cards.forEach(function(card){
										if(get.name(card)==player.storage.mark_quanxinquanyi_saycards[0])	num++;
									})
									return num;
								}
							}).length;;
						},
						content:function(){
							player.storage.mark_quanxinquanyi_loseBy = false;
							player.markSkill('mark_quanxinquanyi_saycards');
						}
					},
					endRound:{
						trigger:{global:'roundStart'},
						priority:999,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.mark_quanxinquanyi_saycards.length&&player.storage.mark_quanxinquanyi_loseBy;
						},
						content:function(){
							'step 0'
							if(!player.hasUseTarget({name:player.storage.mark_quanxinquanyi_saycards})){
								event.finish();
							}
							'step 1'
							player.chooseCard('###『全新全异』##是否将一张牌当作声明牌使用？',1)
							'step 2'
							if(result.bool){
								player.logSkill('mark_quanxinquanyi');
								player.chooseUseTarget(result.cards,{name:player.storage.mark_quanxinquanyi_saycards},true,false);
							}
						}
					}
				}
			},
			mark2_bingdielei:{
                group:'mark2_bingdielei_damageBy',
				subSkill:{
					damageBy:{
						trigger:{player:'damageBegin4',global:'dying'},
						priority:99,
						filter:function(event,player){
							if(_status.event.getParent('phase').skill)	return false;
							if(event.name=='damage'&&player==event.player)	return true;
							return event.getParent()&&event.getParent().source == player;
						},
						direct:true,
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							player.markSkill(event.name);
							player.logSkill(event.name);
							player.addTempSkill('mark2_bingdielei_anotherPhase');
						},
					},
					anotherPhase:{
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						silent:true,
						forced:true,
						intro: {
							content:'当前回合结束后获得一个额外回合',
							name:'并蒂恶蕾',
						},
						content:function(){
							player.markSkill(event.name);
							game.delayx();
							player.logSkill(event.name);
							player.insertPhase();
						},
					},
				},
			},

			quanxinquanyi:{
				group:['quanxinquanyi_begin','quanxinquanyi_playeLosecard'],
				subSkill:{
					begin:{
						trigger:{global:'roundStart'},
						filter:function(event,player){
							if(player.countCards('h')<1) return false;
							return true;
						},
						content:function(){
							'step 0'
							//delete player.storage.quanxinquanyi_showcards;
							delete player.storage.quanxinquanyi_saycards;
							var maxCard=player.maxHp-player.hp;
							if(maxCard==0) maxCard=1;
							player.chooseCard('h','选择要展示的手牌',[1,maxCard],true);
							'step 1'
							player.showCards(result.cards);
							event.showCards=result.cards;
							player.addSkill('quanxinquanyi_showcards');
							player.addSkill('quanxinquanyi_losecard','roundStart');
							player.addTempSkill('quanxinquanyi_discard','roundStart');
							player.addSkill('quanxinquanyi_end','roundStart'); //为了使新加的技能不在当前roundStart被触发
							'step 2'
							player.storage.quanxinquanyi_showcards.addArray(event.showCards);
							//player.showCards(player.storage.quanxinquanyi_showcards,'全新全异（展示）');
							player.syncStorage('quanxinquanyi_showcards');
							player.markSkill('quanxinquanyi_showcards');
							'step 3'
							event.videoId = lib.status.videoId++;
							var list=[];
							for(var i=0;i<lib.inpile.length;i++){
								var name=lib.inpile[i];
								if(name=='wuxie') continue;
								else if(get.type(name)=='trick') list.push(['锦囊','',name]);
							}
							//ui.create.dialog('声明一张牌',[list,'vcard']);
							game.broadcastAll(function(id, list){
								var dialog=ui.create.dialog('声明一张牌',[list,'vcard']);
								dialog.videoId = id;
							}, event.videoId, list);
							'step 4'
							var next = player.chooseButton(1 ,true);
							next.set('dialog',event.videoId);
							'step 5'
							game.broadcastAll('closeDialog', event.videoId);
							if (result.bool) {
								player.addSkill('quanxinquanyi_saycards');
								player.storage.quanxinquanyi_saycards = result.links;
								player.showCards(player.storage.quanxinquanyi_saycards,'全新全异（声明）');
								player.syncStorage('quanxinquanyi_saycards');
								player.markSkill('quanxinquanyi_saycards');
							}
						}
					},
					end:{
						trigger:{global:'phaseBefore'},
						direct:true,
						content:function(){
							player.addSkill('quanxinquanyi_endRound');
							player.removeSkill('quanxinquanyi_end');
						}
					},
					showcards:{
						init: function(player) {
							if (!player.storage.quanxinquanyi_showcards) {
								player.storage.quanxinquanyi_showcards = [];
							}
						},
						locked:true,
						notemp:true,
						marktext: '新',
						intro: {
							content: 'cards',
							onunmark:'throw',
							name:'全新全异（亮出）',
							// onunmark:function(storage,player){
							// 	if(storage&&storage.length){
							// 		player.$throw(storage,1000);
							// 		game.cardsDiscard(storage);
							// 		game.log(storage,'被置入了弃牌堆');
							// 		storage.length=0;
							// 	}
							// },
						}
					},
					saycards:{
						init: function(player) {
							if (!player.storage.quanxinquanyi_saycards) {
								player.storage.quanxinquanyi_saycards = [];
							}
						},
						locked:true,
						notemp:true,
						marktext: '异',
						intro: {
							content: function(storage,player){
								if(!player.storage.saycardsInD)
									return '声明了【'+get.translation(player.storage.quanxinquanyi_saycards[0][2])+'】,当前未进入弃牌堆，本轮结束时可用一张亮出牌使用'
								else
									return '声明了【'+get.translation(player.storage.quanxinquanyi_saycards[0][2])+'】,当前已经有声明牌进入弃牌堆'
							},
							name:'全新全异（声明）',
							// onunmark:function(storage,player){
							// 	if(storage&&storage.length){
							// 		player.$throw(storage,1000);
							// 		game.cardsDiscard(storage);
							// 		game.log(storage,'被置入了弃牌堆');
							// 		storage.length=0;
							// 	}
							// },
						}
					},
					discard:{
						trigger:{global:'loseAfter'},
						priority:99,
						filter:function(event,player){
							if(event.type!='discard') return false;
							for(var i=0;i<event.cards2.length;i++){
								for(var j=0;j<player.storage.quanxinquanyi_showcards.length;j++){
									if(event.cards2[i]==player.storage.quanxinquanyi_showcards[j]&&get.position(event.cards2[i],true)=='d'){
										//console.log(event.cards2[i]);
										return true;
									}
								}
							}
							return false;
						},
						direct:true,
						//frequent:'check',
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							var cards=[];
							for(var i=0;i<trigger.cards2.length;i++){
								for(var j=0;j<player.storage.quanxinquanyi_showcards.length;j++){
									if(trigger.cards2[i]==player.storage.quanxinquanyi_showcards[j]&&get.position(trigger.cards2[i],true)=='d'){
										cards.push(trigger.cards2[i]);
									}
								}
							}
							if(cards.length){
								player.markSkill(event.name);
								player.logSkill(event.name);
								player.addTempSkill('bingdielei_anotherPhase');
							}
						},
					},
					playeLosecard:{
						trigger:{player:'loseAfter'},
						direct:true,
						filter:function(event,player){
							if(player.storage.quanxinquanyi_showcards&&player.storage.quanxinquanyi_showcards.length>0)
								return true;
							else 
								return false;
						},
						content:function(){
							if(player.storage.quanxinquanyi_showcards)
								for(var i=0;i<trigger.cards2.length;i++){
									if(player.storage.quanxinquanyi_showcards.contains(trigger.cards2[i])){
										game.broadcastAll(
											function(splayer,card){
												splayer.storage.quanxinquanyi_showcards.remove(card)
											},player,trigger.cards2[i]
										);
										player.syncStorage('quanxinquanyi_showcards');
									}
								}
						}
					},
					losecard:{
						trigger:{global:'loseAfter'},
						filter:function(event,player){
							if(event.type!='use'&&event.type!='discard') return false;
							if(player.hasZhuSkill('qiujinzhiling')&&event.player.group==player.group) return false;
							for(var i=0;i<event.cards2.length;i++){
								if(event.cards2[i].name==player.storage.quanxinquanyi_saycards[0][2]){
									return true;
								}
							}
							return false;
						},
						direct:true,
						//frequent:'check',
						content:function(){
							player.storage.saycardsInD=true;
						}
					},
					endRound:{
						trigger:{global:'roundStart'},
						priority:999,
						prompt:function(){
							return '是否将一张亮出牌当作声明牌使用？(若不满足使用声明牌条件将直接结算)'
						},
						filter:function(event,player){
							return player.storage.quanxinquanyi_saycards;
						},
						content:function(){
							'step 0'
							if(player.storage.saycardsInD){
								event.goto(4);
							}
							else{
								var bool=game.hasPlayer(function(current){
									return player.canUse({name:player.storage.quanxinquanyi_saycards[0][2]},current);
								});
								if(!bool){
									event.goto(4);
								}
							}
							'step 1'
							player.chooseCard('选择一张亮出牌',1,
								function(card){
									var cuplayer=_status.event.player;
									return cuplayer.storage.quanxinquanyi_showcards.contains(card)
								}
							)
							'step 2'
							if(result.bool){
								event.useshowCards=result.cards;
								player.chooseUseTarget(event.useshowCards[0],{name:player.storage.quanxinquanyi_saycards[0][2]},true,false);
								// player.chooseTarget('选择使用目标',function(card,player,target){
								// 	return player.canUse({name:player.storage.quanxinquanyi_saycards[0][2]},target);
								// }).ai=function(target){
								// 	if(!check) return 0;
								// 	return get.effect(target,{name:player.storage.quanxinquanyi_saycards[0][2]},_status.event.player);
								// }
							}
							else{
								event.goto(4);
							}
							'step 3'
							if(result.bool){
							}
							'step 4'
							//player.removeSkill('quanxinquanyi_showcards');
							player.removeSkill('quanxinquanyi_saycards');
							player.removeSkill('quanxinquanyi_endRound');
						}
					}
				}
			},
			bingdielei:{
				subSkill:{
					anotherPhase:{
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						forced:true,
						intro: {
							content:'当前回合结束后获得一个额外回合',
							name:'并蒂恶蕾',
						},
						content:function(){
							player.markSkill(event.name);
							game.delayx();
							player.logSkill(event.name);
							player.insertPhase();
						}
					}
				}
			},
			qiujinzhiling:{
				unique:true,
				zhuSkill:true,
			},
			zhenyin: {
				trigger: {
					source: 'damageEnd',
					player: 'useCardToPlayered',
				},
				filter: function(event, player) {
					if (!player.hasSkill('saqi_use')) {
						return event.name == 'damage' && event.player.countCards('ej');
					}
					else {
						return event.name == 'useCardToPlayered' 
							&& event.targets.length == 1
							&& event.targets[0].countCards('ej');
					}
				},
				content: function() {
					'step 0'
					event.A = trigger.name == 'damage' ? 
						trigger.player :
						trigger.targets[0];
					event.B = event.A.next;
					if (!event.A.countCards('ej')) event.finish();
					player.choosePlayerCard('ej', event.A);
					'step 1'
					if (result.bool) {
						var card = result.links[0];
						var dam = false;
						if(get.position(card)=='e'){
							var c = event.B.getEquip(get.subtype(card));
							if (c) {
								dam = true;
								game.log(c, '掉落了');
							}
							re = event.B.equip(card);
						}
						else {
							var cname = card.viewAs ? card.viewAs : get.name(card);
							event.B.getCards('j').forEach(function(c) {
								if (get.name(c) == cname) {
									game.log(c, '掉落了');
									game.cardsDiscard(c);
									dam = true;
								}
							})
							event.B.addJudge({name: cname}, [card]);
						}
						event.A.$give(card, event.B)
						if (dam) event.B.damage('nocard');
						game.delay();
					}
				}
			},
			saqi: {
				init: function(player) {
					if (!player.storage.saqi_use) {
						player.storage.saqi_use = [];
					}
				},
				trigger: {player: 'phaseZhunbeiBegin'},
				content: function() {
					'step 0'
					var list = [];
					list.push('减少上限');
					if (player.maxHp < 5) list.push('增加上限');
					player.chooseControl(list).ai = function() {
						if (list.length == 2) {
							if (player.maxHp > player.hp) {
								return 0;
							}
							else return 1;
						}
						else return 0;
					};
					'step 1'
					if (result.control == '增加上限') {
						player.gainMaxHp();
					}
					else {
						player.loseMaxHp();
						player.addTempSkill('saqi_use', {
							player: 'phaseBegin',
						});
						player.addTempSkill('saqi_ban');
					}
				},
				prompt: function() {
					var str = "是否发动飒气并选择<br>";
					var add = (_status.event.player.maxHp < 5);
					var item1 = '减少体力上限<br>';
					var item2 = '增加体力上限<br>';
					if (!add) return str + item1;
					else return str + '1. ' + item1 + '2. ' + item2;
				},
				global: 'saqi_banG',
				subSkill: {
					use: {
						mark: true,
						locked: true,
						direct: true,
						marktext: '飒',
						intro: {
							content: function(storage, player, skill) {
								var str = "发动“震音”的条件改为“你使用牌指定唯一目标后”。<br>";
								if (storage && storage.length) {
									str += "其他角色本回合无法使用的花色：" + 
										get.translation(storage);
								}
								return str;
							}
						},
						trigger: {
							player: 'useCardAfter',
						},
						content: function() {
							var suit = get.suit(trigger.card);
							if (player.hasSkill('saqi_ban') && suit && suit != 'none') {
								if (player.storage.saqi_use.indexOf(suit) == -1) {
									player.storage.saqi_use.push(suit);
									player.markSkill('saqi_use');
								}
							}
						}
					},
					banG: {
						mod: {
							cardEnabled: function(card, player) {
								var cur = game.findPlayer(function(p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player && 
									cur.storage.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							},
							cardSavable:function(card, player){
								var cur = game.findPlayer(function(p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player && 
									cur.storage.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							}
						},
					},
					ban: {
						onremove: function(player) {
							player.storage.saqi_use = [];
							player.markSkill('saqi_use');
						},
					}
				}
			},
			meici: {
				group: ['meici_set', 'meici_use'],
				subSkill: {
					mark: {
						mark: true,
						intro: {
							content: "本回合使用锦囊牌时，将被观看手牌并重铸其中一张",
						},
						onunmark: function(player) {
							player.unmarkSkill('meici_mark');
						}
					},
					set: {
						direct: true,
						trigger: {
							global: 'phaseBegin',
						},
						filter: function(event, player) {
							return event.player != player && !game.findPlayer(function(cur) {
								return cur.getCards('h') > event.player.getCards('h');
							});
						},
						content: function() {
							player.logSkill('meici', trigger.player);
							game.delayx();
							trigger.player.addTempSkill('meici_mark');
							trigger.player.markSkill('meici_mark');
						}
					},
					use: {
						popup: false,
						trigger: {
							global: 'useCardAfter'
						},
						filter: function(event, player) {
							return event.player.hasSkill('meici_mark')
								&& ['trick', 'delay'].contains(get.type(event.card));
						},
						content: function() {
							'step 0'
							game.delay(0.5);
							player.logSkill('meici', trigger.player);
							player.choosePlayerCard("重铸其一张手牌", trigger.player, 'h').set('visible', true);
							'step 1'
							if (result.bool && result.cards.length) {
								trigger.player.lose(result.cards, ui.discardPile).set('visible', true);
								trigger.player.$throw(result.cards);
								game.log(trigger.player, '将', result.cards, '置入了弃牌堆');
								trigger.player.draw();
								if (get.type(result.cards[0]) == 'basic') {
									player.chooseCard("重铸一张牌", 'he');
								}
							}
							'step 2'
							if (result.bool && result.cards.length) {
								player.lose(result.cards, ui.discardPile);
								player.$throw(result.cards);
								player.draw();
								game.log(player, '将', result.cards, '置入了弃牌堆');
							}
						}
					}
				}
			},
			danlian: {
				trigger: {
					global: 'phaseEnd'
				},
				filter: function(event, player) {
					var cards = [];
					game.getGlobalHistory('cardMove',function(evt){
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray(evt.cards.filterInD('d'));
						}
					});
					var suit = [];
					if (!player.hasSkill('danlian_diamond')) suit.push('diamond');
					if (!player.hasSkill('danlian_club')) suit.push('club');
					return cards.length >= event.player.hp && 
						cards.filter(function(card) {
							return suit.contains(get.suit(card));
						}).length &&
						event.player.isAlive();
				},
				content: function() {
					'step 0'
					var cards = [];
					var suit = [];
					if (!player.hasSkill('danlian_diamond')) suit.push('diamond');
					if (!player.hasSkill('danlian_club')) suit.push('club');
					game.getGlobalHistory('cardMove', function(evt) {
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray(evt.cards.filterInD('d').filter(function(card) {
								return suit.contains(get.suit(card));
							}));
						}
					});
					if (cards) player.chooseCardButton("选择一张牌", cards);
					else event.finish();
					'step 1'
					if (result.bool) {
						console.log(result);
						event.card = result.links[0];
						var pStr = get.suit(event.card) == 'diamond' ?
							"选择乐不思蜀的目标" : "选择决斗的目标";
						event.cardName = get.suit(event.card) == 'diamond' ? 
							'lebu' : 'juedou';
						
						game.broadcastAll(function(player, user, pStr, cardName) {
							player.chooseTarget(pStr, function(card, player, target) {
								return user.canUse(cardName, target)
									&& target != player
									&& target != user;
							}).set('ai', function(target) {
								return -get.attitude(player, target);
							});
						}, player, trigger.player, pStr, event.cardName)
					}
					else event.finish();
					'step 2'
					if (result.bool && result.targets.length) {
						var target = result.targets[0];
						trigger.player.useCard({name: event.cardName}, target, [event.card]);
						player.addTempSkill('danlian_' + get.suit(event.card), 'roundStart');
					}
					game.delay(0.5);
				},
				subSkill: {
					diamond: {},
					club: {},
				}
			},
			kuangbaoshuangren: {
				group: ['kuangbaoshuangren_red', 'kuangbaoshuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange:function(card,player){
								if(_status.currentPhase==player && card.name=='sha' && get.color(card) == 'red') return true;
							},
							cardUsable:function (card,player,num){
								if(card.name=='sha' && get.color(card) == 'red') return Infinity;
							},
						},
						trigger: {
							source:'damageEnd'
						},
						filter:function(event,player){
							return event.card&&event.card.name=='sha'&&event.notLink()
								&& get.color(event.card) == 'red'
								&& event.player.getCards('e',{subtype:['equip3','equip4','equip6']}).length > 0
						},
						direct:true,
						content:function(){
							"step 0"
							var att=(get.attitude(player,trigger.player)<=0);
							var next=player.chooseButton();
							next.set('att',att);
							next.set('createDialog',['是否发动狂暴双刃，弃置'+get.translation(trigger.player)+'的一张坐骑牌？',trigger.player.getCards('e',{subtype:['equip3','equip4','equip6']})]);
							next.set('ai',function(button){
								if(_status.event.att) return get.buttonValue(button);
								return 0;
							});
							"step 1"
							if(result.bool && result.links.length){
								player.logSkill('kuangbaoshuangren',trigger.player);
								trigger.player.discard(result.links[0]);
							}
						}
					},
					black: {
						trigger: {
							player: 'useCard2',
							// player: 'useCardToPlayered'
						},
						forced: true,
						direct:true,
						filter:function(event,player) {
							// if (event.getParent().triggeredTargets3.length > 1) return false;
							if (!event.card || !(event.card.name == 'sha') 
								|| !(get.color(event.card) == 'black')) {
								return false;
							}
							return game.hasPlayer(function(cur) {
								return lib.filter.targetEnabled2(event.card, player, cur)
									&& player.inRange(cur)
									&& !event.targets.contains(cur)
									&& player.canUse(event.card,cur);
							})
						},
						content:function(){
							'step 0'
							player.storage.blackTargets=trigger.targets;
							player.storage.card=trigger.card;
							player.chooseTarget(true, '额外指定一名'+get.translation(trigger.card)+'的目标',function(card,player,target){
								if (player.storage.blackTargets.contains(target)) return false;
								return lib.filter.targetEnabled2(player.storage.card, player, target)
									&& player.inRange(target)
									&& !player.storage.blackTargets.contains(target)
							}).set('targets',trigger.targets).set('card',trigger.card);
							// .set('ai',function(target){
							// 	// var trigger=_status.event.getTrigger();
							// 	var player=_status.event.player;
							// 	return get.effect(target,card,player,player);
							// })
							'step 1'
							delete player.storage.card;
							delete player.storage.blackTargets;
							if(result.bool && result.targets.length){
								game.delayx();
								player.logSkill('kuangbaoshuangren', result.targets);
								trigger.targets.unshift(result.targets[0]);
							}
						},
					},
				}
			},
			guangsuxiabo: {
				init: function(player) {
					player.storage.hp = 0;
					player.storage.loseCount = 0;
				},
				trigger: {
					global: ['phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd'],
				},
				filter: function(event, player) {
					return player.storage.hp || player.storage.loseCount > 2;
				},
				content: function() {
					'step 0'
					player.draw();
					'step 1'
					var evt=_status.event.getParent('phase');
					if(evt){
						//game.resetSkills();
						_status.event=evt;
						_status.event.finish();
						// _status.event.untrigger(true);
					}
				},

				group: ['guangsuxiabo_clear', 'guangsuxiabo_cnt1', 'guangsuxiabo_cnt2'],
				subSkill: {
					clear: {
						forced: true,
						silent: true,
						trigger: {
							global: ['phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin'],
						},
						content: function() {
							player.storage.hp = player.storage.loseCount = 0;
						}
					},
					cnt1: {
						forced: true,
						silent: true,
						trigger: {
							player: 'loseEnd',
						},
						content: function() {
							player.storage.loseCount += trigger.cards2.length;
						}
					},
					cnt2: {
						forced: true,
						silent: true,
						trigger: {
							player: 'damageEnd',
						},
						content: function() {
							player.storage.hp = 1;
						}
					},
				},
			},

			//修女
			zhenxin:{
				group:['zhenxin_from' , 'zhenxin_to'],
				subSkill:{
					//防止每回合你第一次对体力值小于你的角色造成的伤害
					from:{
						trigger:{source: 'damageBefore' },
						forced:true,
						usable:1,
						priority:12,
						filter:function(event,player){
							if(event.player==player)	return false;
							return player.hp>event.player.hp;
						},
						content:function(){
							trigger.changeToZero();
						},
					},
					//防止体力值大于你的角色每回合对你造成的第一次伤害
					to:{
						trigger:{player: 'damageBefore' },
						forced:true,
						usable:1,
						priority:24,
						filter:function(event,player){
							if(event.player!=player)	return false;
							if(!event.source)		return false;
							return player.hp<event.source.hp;
						},
						content:function(){
							trigger.changeToZero();
						},
					}
				}
			},
			zhuwei:{
				global:'zhuwei_put',
				group:['zhuwei_moveC'],
				subSkill:{
					put:{
						trigger:{player:'phaseEnd'},
						forced:false,
						priority:24,
						check: function(event, player) {
							var target = game.findPlayer(function(cur){
								return cur.hasSkill('zhuwei');
							});
							return target && get.attitude(player, target) > 0;
						},
						filter:function(event,player){
							if(		!game.hasPlayer(function(cur){
								return cur.hasSkill('zhuwei');
							}))									return false;
							if(player.hasSkill('zhuwei'))		return false;
							return	!game.hasPlayer(function(cur){
								return cur.countCards('h') < event.player.countCards('h');
							})||!game.hasPlayer(function(cur){
								return cur.hp < event.player.hp
							});
						},
						content:function(){
							player.draw();
							var target = game.findPlayer(function(cur) {
								return cur.hasSkill('zhuwei');
							});
							target.draw();
						},
					},
					moveC:{
						trigger:{global:'zhuwei_putAfter'},
						forced:false,
						filter:function(event,player){
							var canbeM=function(a,b){
									var es=a.getCards('e');
									var c=0;
									for(var i=0;i<es.length;i++){
										if(b.isEmpty(get.subtype(es[i]))) c++;
									}
									return c;
								}
							return canbeM(player,event.player)||canbeM(event.player,player);
						},	
						content:function(){
							'step 0'
							game.broadcastAll(function(player, object){
								var canbeM=function(a,b){
									var es=a.getCards('e');
									var c=0;
									for(var i=0;i<es.length;i++){
										if(b.isEmpty(get.subtype(es[i]))) c++;
									}
									return c;
								};
								var next=player.chooseTarget(function(card,player,target){
										if((canbeM(player,object)>0&&target== player)||(canbeM(object,player)>0&&target== object))
										return true;
								});
								next.set('multitarget',true);
								next.set('targetprompt',['被移走']);
								next.set('prompt',event.prompt||'你或其场上的一张装备牌');
								next.set('forced',false);
							}, player, trigger.player)
							'step 1'
							if(result.bool){
								if(result.targets[0]==trigger.player)	result.targets.push(player);
								if(result.targets[0]==player)	result.targets.push(trigger.player);
								player.line2(result.targets,'green');
								event.targets=result.targets;
							}
							else{
								_status.event.finish();
							}
							'step 2'
							game.delay();
							'step 3'
							if(targets.length==2){
								player.choosePlayerCard('e',true,function(button){
									var player=_status.event.player;
									var targets0=_status.event.targets0;
									var targets1=_status.event.targets1;
									if(get.attitude(player,targets0)>get.attitude(player,targets1)){
										if(get.value(button.link,targets0)<0) return 10;
										return 0;
									}
									else{
										return get.equipValue(button.link);
									}
								},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
									var targets1=_status.event.targets1;
									return targets1.isEmpty(get.subtype(button.link));
								});
							}
							else{
								_status.event.finish();
							}
							'step 4'
							if(result.bool&&result.links.length){
								var link=result.links[0];
								event.targets[1].equip(link);
								event.targets[0].$give(link,event.targets[1]);
								game.delay();
								event.result={bool:true};
							}
						}
					}
				},			
			},
        },
        translate:{

			nochongzhu:'禁止重铸',

            MononobeAlice:'物述有栖',
            fuheijs:'腹黑JS',
            fuheijs_info:'出牌阶段，你可以弃置一张手牌，选择转移或者弃置任意一名角色装备的装备牌',
            leiyan:'雷言',
            leiyan_info:'<font color=#f66>锁定技</font> 你的［雷杀］可以指定1-3个目标，并无视角色防具',
            xiaozhangduandai:'嚣张缎带',
            xiaozhangduandai_info:'觉醒技。当你处于濒死状态时，立即恢复3点体力，摸3张牌并获得技能（咏春）',
            yongchun:'咏春',
			yongchun_info:'你在出牌阶段使用［杀］时，可以摸一张牌，并弃置一张手牌，令此［杀］不计入出牌阶段的使用次数',
			tinenghuifu1:'体能恢复',
			tinenghuifu1_info:'<font color=#f66>锁定技</font> 当你失去一张装备牌后，你回复 1 点体力。当你的体力值减少后，你摸一张牌。',
			dianmingguzhen:'电鸣鼓震',
			dianmingguzhen_info:'出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你视为对对应装备栏内没有装备的所有角色使用一张雷【杀】；然后你可以为抵消此【杀】的角色追加一次【闪电】判定。',

			ShizukaRin:'静凛',
			mozhaotuji:'魔爪突击',
			mozhaotuji_info:'回合内，你可以将任意阶段连续的变为出牌阶段，直到你有出牌阶段未使用过牌。你使用过两张或更多牌的阶段结束时，你摸一张牌。',

			IenagaMugi:'家长麦',
			fengxue:'奋学',
			fengxue_info:'你可以跳过出牌阶段，亮出牌堆顶的X+1张牌，使用其中一张牌，然后获得其中一种花色的牌，弃置其余的牌。（X为体力值不小于你的角色数）',
			yuepi:'乐癖',
			yuepi_info:'弃牌阶段开始时，你可以重铸等同于你装备区牌数的手牌，令你在本阶段增加等量的手牌上限。',
			cangxiong:'藏兄',
			cangxiong_info:'其他角色的体力值变为1后，你可以交给其任意手牌，然后若其手牌数大于你，将其从游戏除外直到其回合开始。',
			
			MitoTsukino:'月之美兔',
			MitoTsukino_info:'月之美兔',
			chaoqianyishi:'超前意识',
			chaoqianyishi_info:'你失去过锦囊牌或体力减少过的回合结束时，你可以摸等同你体力上限的牌，然后将等同你体力值的牌置于牌堆顶或牌堆底。',
			hengkongchushi:'横空出世',
			hengkongchushi_info:'出牌阶段开始时，你可以令你本阶段无法出牌并仅能执行以下行动：<br>1.弃置一张牌以使用牌堆底的一张牌，若无法使用，弃置之且本回合不能再执行此项；<br>2.摸一张牌并弃置牌堆底牌，若弃置的不为♣，本回合不能再执行此项。<br>本回合结束时，若你使用和弃置的黑色牌数大于其他角色数，你视为使用了一张【南蛮入侵】(从牌堆中弃置的不算你弃置的牌)。',
			hengkongchushi_qiyuyong:'弃牌并使用底牌',
			hengkongchushi_moyuqi:'摸牌并弃置底牌',
			wenhuazhian:'文化之暗',
			wenhuazhian_info:'彩虹社势力出牌阶段限一次，对其他角色造成伤害时可以进行一次判定，如果判定结果为♣，将判定牌放在牌堆底，然后其摸一张牌',
			quanxinquanyi:'全新全异',
			quanxinquanyi_info:'一轮开始时，你可以亮出至多X张手牌并声明一种通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你将一张亮出牌当本轮声明牌使用。（X为你已损失的体力值且至少为1）',
			bingdielei:'并蒂恶蕾',
			bingdielei_info:'回合结束时，若本回合你弃置过亮出牌，获得一个额外的回合。',
			qiujinzhiling:'囚禁指令',
			qiujinzhiling_info:'<font color=#ff4>主公技</font> <font color=#f66>锁定技</font> 其他同势力角色回合内进入弃牌堆的牌不触发“全新全异”',

			mark_bingdielei: '并蒂恶蕾',
			mark_bingdielei_info:'你造成或受到过伤害的额定回合结束时，你可以弃置一张♣或装备牌以获得一个额外回合。',
			mark_quanxinquanyi:'全新全异',
			mark_quanxinquanyi_info:'一轮开始时，你可以声明一张未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。',
			
			mark2_bingdielei: '并蒂恶蕾',
            mark2_bingdielei_info:'你受到伤害或令一名角色进入濒死状态的额定回合结束时，获得一个额外回合。',
			
			SuzukaUtako: '铃鹿诗子',
			meici: '美词',
			meici_info: '其他角色的回合开始时，若其手牌为全场最多，其本回合使用锦囊牌后，你可以观看其手牌并重铸其中一张，若因此重铸了基本牌，你也可重铸一张牌。',
			danlian: '耽恋',
			danlian_info: '一个回合结束时，若本回合不因使用而进入弃牌堆的牌不小于当前回合角色的体力值，你可选择其中一张♦或♣牌并选择另一名其他角色，当前回合角色将♦牌当【乐不思蜀】，♣牌当【决斗】对你选择的角色使用。每轮每种花色限一次。',
			
			HiguchiKaede: '樋口枫',
			zhenyin: '震音',
			zhenyin_info: '你造成伤害后，可以将目标装备区或判定区的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。',
			saqi: '飒气',
			saqi_info: '准备阶段，你可以增加（至多到 5 ）或扣减 1 点体力上限，若选择扣减，你获得以下效果直到你的下回合开始：你使用牌结算后，所有其他角色本回合无法使用该花色的牌；发动“震音”的条件改为“你使用牌指定唯一目标后”。',
			
			UshimiIchigo: '宇志海莓',
			kuangbaoshuangren: '狂暴双刃',
			kuangbaoshuangren_info: '<font color=#f66>锁定技</font> 你的黑色【杀】指定目标后，需额外指定攻击范围内的一名角色为目标。你的红色【杀】无距离与次数限制，且造成伤害后可以弃置目标的坐骑牌。',
			guangsuxiabo: '光速下播',
			guangsuxiabo_info: '一个阶段结束时，若你于此阶段受到过伤害或失去了两张以上的牌，你可以摸一张牌并结束当前回合。',
			
			SisterClearie:'修女·克蕾雅',
			zhenxin: '真信之诚',
			zhenxin_info: '<font color=#f66>锁定技</font> 防止每回合你第一次对体力值小于你的角色造成的伤害；防止体力值大于你的角色每回合对你造成的第一次伤害。',
			zhuwei: '助危之心',
			zhuwei_info: '其他角色的结束阶段，若其手牌或体力为全场最少，其可以与你各摸一张牌，然后你可以移动你或其装备区的一张牌。',
			zhuwei_put_info: '令修女克蕾雅与你各摸一张牌，然后她可以移动你或其装备区的一张牌。',

        }
    }
}
)