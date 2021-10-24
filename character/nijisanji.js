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
			SisterClearie:['female','nijisanji',3,['zhenxin','sczhuwei']],
			/**熊猫人 */
			SasakiSaku:['female','nijisanji',3,['tiaolian','jiaku']],
			/**健屋花那 */
			SukoyaKana:['female','nijisanji',3,['huawen','liaohu']],
			/**白雪巴 */
			ShirayukiTomoe:['female','nijisanji',4,['gonggan','yeyu']],
			/**Elu */
			Elu:['female','nijisanji',3,['huangran','yinzhen','senhu']],
			/**皇女 */
			LizeHelesta:['female','nijisanji',3,['shencha','helesta'],['zhu']],
			/**露露 */
			SuzuharaLulu:['female','nijisanji',5,['zhongli','xinhuo','weizhuang']],
			/**阿喵喵 */
			AmamiyaKokoro:['female','nijisanji',3,['miaomiao','chengneng']],
			/**社长 */
			KagamiHayato:['male','nijisanji',3,['liebo','zhongjizhimeng']],
			/**山神歌流多 */
			YagamiKaruta: ['female', 'nijisanji', 3, ['suisi', 'liefeng']],
			/**雪城真寻 */
			YukishiroMahiro: ['female', 'nijisanji', 3, ['jiaoming', 'changhe']],
			/**小野町春香 */
			OnomachiHaruka: ['female', 'nijisanji', 3, ['nvjiangrouhao', 'yinlaiyaotang']],
			/**樱凛月 */
			SakuraRitsuki: ['female','nijisanji',3,['zhuqiao']],
			/**刀也 */
			KenmochiDouya: ['male','nijisanji',4,['shenglang','nodao']],
			/**Gaku */
			FushimiGaku: ['male','nijisanji',4,['exi','suisui']],
		},
		characterSort:{
			nijisanji:{
				nijisanji_1:['MitoTsukino','HiguchiKaede','ShizukaRin','Elu'],
				nijisanji_2:['SuzukaUtako','UshimiIchigo','IenagaMugi','MononobeAlice','KenmochiDouya'],
			}
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
				audio:true,
				trigger:{player:'loseAfter'},
				forced:true,
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
						event.goto(1);
					}
				},
				group:['tinenghuifu1_hp'],
				subSkill:{
					hp:{
						trigger:{player:'changeHp'},
						forced:true,
						filter:function(event,player){
							return event.num<0&&player.isDamaged();
						},
						content:function(){
							player.draw(1);
						}
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true
				}
			},
			dianmingguzhen:{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					return player.canMoveCard(null,true);
				},
				content:function(){
					'step 0'
					player.loseHp(1);
					'step 1'
					var next = player.moveCard(true).set('nojudge',true);
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(target==player){
								var es=player.getCards('e');
								for(var i=0;i<es.length;i++){
									var effect = 0;
									game.filterPlayer(function(cur){
										if(cur.isEmpty(get.subtype(es[i]))) effect++;
									})
									return 3*effect;
								}
							}
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
							if(ui.selected.targets[0]==player&&target.isEmpty(get.subtype(es[i]))){
								var effect = 0;
								game.filterPlayer(function(cur){
									if(cur.isEmpty(get.subtype(es[i]))&&cur!=target) effect+=get.effect(cur,{name:'sha'},player,player);
								});
								return 2*(effect+att);
							}
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
					next.set('forced',true);
					'step 2'
					if(result.targets[0]!=player){
						event.finish();
					}
					else{
						event.equiptype = get.subtype(result.card);
						event.players=game.filterPlayer(function(current){
							return (current!=player)&&(!current.getEquip(event.equiptype));
						}).sortBySeat(player);
						if(event.judgeGroup==null)
							event.judgeGroup=[];
					}
					'step 3'
					if(event.playersIndex==null){
						event.playersIndex=0;
					}
					if(event.playersIndex<event.players.length){
						if(!event.players[event.playersIndex].getEquip(event.equiptype)){
							player.useCard({name:'sha',nature:'thunder',isCard:true},event.players[event.playersIndex],false);
						}
					}
					'step 4'
					if(!result.bool){
						event.judgeGroup.add(event.players[event.playersIndex]);
					}
					if(event.players[++event.playersIndex])	event.goto(3);
					'step 5'
					if(event.judgeGroup.length>0){
						var shanString='<br>';
						for(var i=0;i<event.judgeGroup.length;i++){
							shanString+=(get.translation(event.judgeGroup[i])+',');
						}
						var check = 0;
						for(var i of event.judgeGroup){
							check+=lib.card.shandian.ai.result.target(player,i)
						}
						player.chooseBool('是否对所有闪避者追加闪电判定？'+shanString).set('check',check).ai=function(){
							return _status.event.check>0;
						};
					}
					else{
						event.finish();
					}
					'step 6'
					if(!result.bool){
						event.finish();
					}
					'step 7'
					event.judgeGroup[0].judge(function(card){
						if(get.suit(card)=='spade'&&(get.number(card)>=2&&get.number(card)<=9)) return 2;
					}).callback=function(){
						var number = event.judgeResult.number;
						if(event.judgeResult.suit=='spade'&&(number>=2&&number<=9)){
							player.damage(3,'thunder','nosource');
						}
					};
					'step 8'
					game.delay();
					event.judgeGroup.shift();
					if(event.judgeGroup.length>0)	event.goto(7);
				},
				ai:{
					useSha:2,
					order:7,
					result:{
						player:function(player,target){
							if(player.hp!=1)	return 1;
							else return -2;
						},
					},
				},
			},
			mozhaotuji:{
				group:['mozhaotuji_DrawOrStop','mozhaotuji_useCard','mozhaotuji_Ready','mozhaotuji_Judge','mozhaotuji_PhaseDraw','mozhaotuji_Discard','mozhaotuji_End'],
				/**转化阶段 */
				contentx:function(trigger,player){
					'step 0'
					if(!player.hasSkill('mozhaotujiStart'))
						player.addTempSkill('mozhaotujiStart');
					trigger.cancel();
					'step 1'
					player.phaseUse();
					'step 2'
					var stat=player.getStat();
					//stat.card={};
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
						audio:true,
						audioname:['jike'],
						trigger:{global:['phaseZhunbeiEnd','phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd','phaseJieshuEnd']},
						filter:function(event,player){
							if((player.storage.mozhaotuji_useCard)>=1)
								return true;
							else if((player.storage.mozhaotuji_useCard)==0)
								return player==_status.currentPhase;
							else
								return false;
						},
						priority: 14,
						direct:true,
						content:function(){
							'step 0'
							if((player.storage.mozhaotuji_useCard)>=2){
								player.logSkill('mozhaotuji');
								player.draw(1);
							}
							else if(trigger.name=='phaseUse')
								player.addTempSkill('mozhaotujiStop');
							'step 1'
							player.storage.mozhaotuji_useCard = 0;
						},
					},
					useCard:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger:{player:'useCardAfter'},
						direct:true,
						silent:true,
						priority: 1,
						content:function(){
							player.storage.mozhaotuji_useCard++;
						},
					},
					/*Clear:{
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
					},*/
					Ready:{
						trigger:{
							player:'phaseZhunbeiBegin'
						},
						check:function(event,player){
							return player.countCards('h',function(card){
								return player.hasUseTarget(card);
							}).length>=3;
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return get.prompt('mozhaotuji')+'把准备阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Judge:{
						trigger:{
							player:'phaseJudgeBefore'
						},
						check:function(event,player){
							return player.countCards('h',function(card){
								return player.hasUseTarget(card);
							}).length>=2;
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return get.prompt('mozhaotuji')+'把判定阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					PhaseDraw:{
						trigger:{
							player:'phaseDrawBefore'
						},
						check:function(event,player){
							return false;
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return get.prompt('mozhaotuji')+'把摸牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Discard:{
						trigger:{
							player:'phaseDiscardBefore'
						},
						check:function(event,player){
							return true;
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return get.prompt('mozhaotuji')+'把弃牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					End:{
						trigger:{
							player:'phaseJieshuBegin'
						},
						check:function(event,player){
							return true;
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return get.prompt('mozhaotuji')+'把结束阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
				}
			},
			mozhaotujiStart:{
				trigger:{
					player:['phaseJudgeEnd','phaseDrawEnd','phaseDiscardEnd']
				},
				priority: 15,
				direct:true,
				silent:true,
				filter:function(event,player){
					if((player.storage.mozhaotuji_useCard)==0)
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
				check:function (event,player){
					var att = get.attitude(player,event.player);
					return (att>0&&event.player!=_status.currentPhase)||(att<0&&event.player==_status.currentPhase&&(event.player.countCards('h')-player.countCards('h'))<=1);
				},
				content:function(){
					'step 0'
					player.chooseCard('h',[1,Infinity],true,'请选择要给对方的牌').set('ai',function(card){
						var target = _status.event.getTrigger().player;
						console.log(target);
						if((target.countCards('h')+ui.selected.cards.length)>(player.countCards('h')-ui.selected.cards.length)) return -1;
						return 7-get.value(card);
					});
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
				audio:'bingdielei',
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
							player.addTempSkill('mark_bingdielei_anotherPhase');
						},
					},
					anotherPhase:{
						audio:'bingdielei',
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						filter:function(event,player){
							return player.countDiscardableCards(player,'he',{suit:'club'})||player.countCards('he',{type:'equip'});
						},
						intro: {
							content:'当前回合结束后可以获得一个额外回合',
							name:'并蒂恶蕾',
						},
						direct:true,
						popup:false,
						content:function(){
							'step 0'
							player.chooseToDiscard('###是否发动『并蒂恶蕾』？###弃置一张♣或装备牌以获得一个额外回合','he',function(card){
								return get.suit(card)=='club'||get.type(card)=='equip';
							})
							'step 1'
							if(result.bool){
								player.unmarkSkill(event.name);
								player.logSkill(event.name);
								player.insertPhase();
							}
						},
					},
				},
				ai:{
					maixie:true,
				},
			},
			mark_quanxinquanyi:{
				audio:'quanxinquanyi',
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
							
							var list = [];
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
							if(!list.length)	event.finish();
							else	event.list = list;
							'step 1'
							player.chooseBool('###是否发动『全新全异』？###一轮开始时，你可以声明一张未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。')
							'step 2'
							if(result.bool){
								player.logSkill('mark_quanxinquanyi');
								event.videoId = lib.status.videoId++;
								var list = event.list;
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
							next.set('ai',function(button){
								var card={name:button.link[2]};
								var value=get.value(card);
								return value;
							});
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
							}).length;
						},
						content:function(){
							player.storage.mark_quanxinquanyi_loseBy = false;
							player.markSkill('mark_quanxinquanyi_saycards');
						}
					},
					endRound:{
						trigger:{global:'roundEnd'},
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
								player.logSkill('mark_quanxinquanyi_endRound');
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
				group:['quanxinquanyi_begin','quanxinquanyi_playerLosecard'],
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
							var maxCard=player.getDamagedHp();
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
					playerLosecard:{
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
				audio:3,
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
				audio:1,
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
					player.choosePlayerCard('ej', event.A).set('ai',function(button){
						var player = _status.event.player;
						var source = _status.event.target;
						var target = source.next;
						var link = button.link;
						if(get.position(link)=='j'){
							if(target.canAddJudge(link))	return get.effect(target,link,player,player);
							else	return get.damageEffect(target,player,player);
						}else if(get.position(link)=='e'){
							var subtype = get.subtype(link);
							if(!target.getEquip(subtype))	return get.effect(target,link,player,player);
							else	return get.damageEffect(target,player,player);
						}
					});
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
					var str = "是否发动『飒气』并选择<br>";
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
								var str = "发动『震音』的条件改为“你使用牌指定唯一目标后”。<br>";
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
						},
						mod:{
							aiOrder:function(player,card,num){
								if(get.itemtype(card)=='card'&&!get.info(card).notarget) return num+1;
							},
							aiValue:function(player,card,num){
								if(get.itemtype(card)=='card'&&!get.info(card).notarget) return num+1;
							},
						},
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
				audio:4,
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
						forced:true,
						silent:true,
						popup:false,
						content: function() {
							'step 0'
							game.delay(0.5);
							player.choosePlayerCard("###『美词』###重铸其一张手牌", trigger.player, 'h').set('visible', true).set('target',trigger.player).ai=function(button){
								var val = get.buttonValue(button);
								var player = _status.event.player;
								var target = _status.event.target;
								if(get.attitude(player,target)>0) return 4-val+Math.random();
								return val+Math.random();
							};
							'step 1'
							if (result.bool && result.cards.length) {
								player.logSkill('meici', trigger.player,true,false,false);
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
				},
				ai:{
					threaten:1.5,
				},
			},
			danlian: {
				audio:3,
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
				direct:true,
				popup:false,
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
					if (cards) player.chooseCardButton("###『耽恋』：进入弃牌堆的牌###选择一张牌（♦牌当【乐不思蜀】，♣牌当【决斗】）", cards);
					else event.finish();
					'step 1'
					if (result.bool) {
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
				ai:{
					threaten:1.5,
				},
				subSkill: {
					diamond: {},
					club: {},
				}
			},
			kuangbaoshuangren: {
				audio:3,
				group: ['kuangbaoshuangren_red', 'kuangbaoshuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange:function(card,player){
								if(_status.currentPhase==player && get.name(card)=='sha' && get.color(card) == 'red') return true;
							},
							cardUsable:function (card,player,num){
								if(card.name=='sha' && get.color(card) == 'red') return Infinity;
							},
						},
						trigger: {
							source:'damageEnd'
						},
						filter:function(event,player){
							return event.card&&get.name(event.card)=='sha'&&event.notLink()
								&& get.color(event.card) == 'red'
								&& event.player.countDiscardableCards(player,'e',{subtype:['equip3','equip4','equip6']});
						},
						direct:true,
						content:function(){
							"step 0"
							var att=(get.attitude(player,trigger.player)<=0);
							var next=player.chooseButton();
							next.set('att',att);
							next.set('createDialog',['是否发动『狂暴双刃』，弃置'+get.translation(trigger.player)+'的一张坐骑牌？',trigger.player.getDiscardableCards(player,'e',{subtype:['equip3','equip4','equip6']})]);
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
						locked:true,
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
							player.chooseTarget(true, '额外指定一名'+get.translation(trigger.card)+'的目标',function(card,player,target){
								if (_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card, player, target)
									&& player.inRange(target);
							}).set('targets',trigger.targets).set('card',trigger.card).set('ai',function(target){
								var player = _status.event.player;
								return get.effect(target,_status.event.card,player,player);
							});
							'step 1'
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
				audio:2,
				init: function(player) {
					player.storage.hp = 0;
					player.storage.loseCount = 0;
				},
				trigger:{
					global:['phaseZhunbeiEnd','phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd','phaseJieshuEnd']
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
						_status.event=evt;
						_status.event.finish();
					}
				},
				ai:{
					maixie:true,
				},
				group: ['guangsuxiabo_clear', 'guangsuxiabo_cnt1', 'guangsuxiabo_cnt2'],
				subSkill: {
					clear: {
						forced: true,
						silent: true,
						trigger:{
							global:['phaseZhunbeiBegin','phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin','phaseJieshuBegin']
						},
						content: function() {
							player.storage.hp = 0;
							player.storage.loseCount = 0;
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
				locked:true,
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
			sczhuwei:{
				group:['sczhuwei_put','sczhuwei_moveC'],
				subSkill:{
					put:{
						trigger:{global:'phaseEnd'},
						priority:24,
						direct:true,
						filter:function(event,player){
							if(player==event.player)		return false;
							return	event.player.isMinHandcard()||event.player.isMinHp();
						},
						content:function(){
							'step 0'
							player.line(trigger.player,'green');
							var check = get.attitude(trigger.player,player);
							trigger.player.chooseBool(get.prompt2('sczhuwei_put',player)).set('choice',check>0);
							'step 1'
							if(result.bool){
								trigger.player.logSkill('sczhuwei',player);
								event.target = trigger.player;
								game.asyncDraw([player,event.target]);
							}
						},
					},
					moveC:{
						trigger:{global:'sczhuwei_putAfter'},
						forced:false,
						filter:function(event,player){
							if(!event.target)	return false;
							var canbeM=function(a,b){
									var es=a.getCards('e');
									var c=0;
									for(var i=0;i<es.length;i++){
										if(b.isEmpty(get.subtype(es[i]))) c++;
									}
									return c;
								}
							return canbeM(player,event.target)||canbeM(event.target,player);
						},	
						content:function(){
							player.moveCard(function(card,player,target){
								if(target==player||target==_status.currentPhase)	return true;
								return false;
							});
						}
					}
				},			
			},
			suisi:{
				audio:4,
				locked: true,
				direct: true,
				trigger:{
					player: ['cardsDiscardAfter', 'chooseToDiscardAfter', 'discardAfter']
				},
				filter:function(event, player){
					var cards = event.cards;
					if(!cards)return false;
					var ret = false;
					if(!player.storage.suisi) player.storage.suisi ={lastCnt:0};
					else player.storage.suisi.lastCnt = 0;

					for(var i=0;i<cards.length;++i){
						if(cards[i]&&(cards[i].name == 'shan'||cards[i].name=='wuxie'))++player.storage.suisi.lastCnt;
					}
					return player.storage.suisi.lastCnt > 0;
				},
				content:function(){
					if(player.storage.suisi&&player.storage.suisi.lastCnt>0){
						player.draw(Math.ceil(player.storage.suisi.lastCnt/2));
						player.logSkill('suisi');
					}
				},
				group: [
					'suisi_shanMod', 'suisi_wuxieMod'
				], 
				// hasShan:function(){
				// 	var basicCards = this.getCards('h', {type: 'basic'});
				// 	if(basicCards&&basicCards.length){
				// 		for(var i=0;i<basicCards.length;++i){
				// 			if(basicCards[i]&&basicCards[i].name != 'shan'){
				// 				return true;
				// 			}
				// 		}
				// 	}
				// 	if(this.hasSkillTag('respondShan',true,null,true)) return true;
				// 	return false;
				// },
				// hasWuxie:function(){
				// 	var trickCards = this.getCards('h', {type: 'trick'});
				// 	if(trickCards&&trickCards.length){
				// 		for(var i=0;i<trickCards.length;++i){
				// 			if(trickCards[i]&&trickCards[i].name != 'wuxie'){
				// 				return true;
				// 			}
				// 		}
				// 	}
				// 	var skills=this.getSkills(true).concat(lib.skill.global);
				// 	game.expandSkills(skills);
				// 	for(var i=0;i<skills.length;i++){
				// 		var ifo=get.info(skills[i]);
				// 		if(ifo.viewAs&&typeof ifo.viewAs!='function'&&ifo.viewAs.name=='wuxie'){
				// 			if(!ifo.viewAsFilter||ifo.viewAsFilter(this)){
				// 				return true;
				// 			}
				// 		}
				// 		else{
				// 			var hiddenCard=get.info(skills[i]).hiddenCard;
				// 			if(typeof hiddenCard=='function'&&hiddenCard(this,'wuxie')){
				// 				return true;
				// 			}
				// 		}
				// 	}
				// 	return false;
				// },
				subSkill:{
					shanMod:{
						hiddenCard:function(player,name){
							if(_status.event.name == 'chooseToUse'&&_status.event.type == 'respondShan'){
								if(name == 'shan'){
									return false;
								}
							}
							return true;
						},
						mod:{
							cardname:function(card, player, name){
								if(_status.event.name == 'chooseToUse'&&_status.event.type == 'respondShan'){
									if(card.name != 'shan' && get.type2({name:card.name}) == 'basic'){
										return 'shan';
									}
								}
							},
							cardEnabled2:function(card, player, name){
								if(_status.event.name == 'chooseToUse'&&_status.event.type == 'respondShan'){
									if(card.name == 'shan'){
										return false;
									}
								}
							}
						}
					},
					wuxieMod:{
						hiddenCard:function(player,name){
							if(_status.event.name == 'chooseToUse'&&_status.event.type == 'wuxie'){
								if(name == 'wuxie')return false;
							}
							return true;
						},
						mod:{
							cardname:function(card, player, name){
								if(_status.event.name == 'chooseToUse'&&_status.event.type == 'wuxie'){
									if(card.name != 'wuxie' && get.type2({name:card.name}) == 'trick'){
										return 'wuxie';
									}
								}
							},
							cardEnabled2:function(card, player, name){
								if(_status.event.name == 'chooseToUse'&&_status.event.type == 'wuxie'){
									if(card.name == 'wuxie'){
										return false;
									}
								}
							}
						}
					}
				}
			},
			liefeng:{
				trigger:{
					player: 'phaseJieshu'
				},
				//direct: true,
				//popup: false,
				filter:function(event, player){
					return player.countCards('h');
				},
				check:function(event, player){
					return player.countCards('h',{name:['shan','wuxie']})==player.countCards('h');
				},
				content:function(){
					'step 0'
					var handCards = player.getCards('h').slice(0);
					player.showCards(handCards);
					event.handCards = handCards;
					//player.logSkill('liefeng');
					'step 1'
					if(!event.handCards||!event.handCards.length){
						event.finish();
						return;
					}
					var shaCnt = 0;
					for(var i =0;i<event.handCards.length;++i){
						if(event.handCards[i]&&(
							event.handCards[i].name=='shan'
							||event.handCards[i].name=='wuxie'
							||!lib.filter.cardEnabled(event.handCards[i], player))){
							++shaCnt;
						}
					}
					if(shaCnt >= event.handCards.length){
						event.shaCnt = shaCnt;
						event.handCnt = shaCnt;
						event._result = {bool: true};
						player.discard(event.handCards);
					}else{
						event.finish();
						return;
					}
					'step 2'
					if(!result.bool||event.shaCnt<=0){
						event.finish();
						return;
					}
					player.chooseUseTarget(
						'###选择一个目标，视为对其使用一张【暗】杀。(【暗】杀：'+event.shaCnt+'/'+event.handCnt+'）张',
						{name:'sha',nature:'yami'}, true, 'nodistance'
					);
					--event.shaCnt;
					event.redo();

				},
				ai:{
					useSha:1,
					skillTagFilter:function(player,tag,arg){
						if(tag=='useSha')	return player.countCards('h',{name:['shan','wuxie']})==player.countCards('h');
					},
					threaten:function(player,target){
						return 1.6;
					}
				}
			},
			//雪城真寻
			jiaoming:{
				audio:5,
				trigger:{
					global: ['loseAfter', 'cardsDiscardAfter']
				},
				forced: true,
				popup: false,
				filter:function(event, player){
					if(!player||player.hasSkill('jiaoming_invalid'))return false;
					
					event = event&&(event.name == 'phaseUse'?event:event.getParent('phaseUse'));
					if(!event||Object.getOwnPropertyNames(event).length == 0) return false;
					//是此player的回合
					if(player!=event.player) return false;
					
					return true;
				},
				content:function(){
					//获得当前event的parent，phaseUse，
					//如果不存在就返回
					event = event&&(event.name == 'phaseUse'?event:event.getParent('phaseUse'));
					if(!event||Object.getOwnPropertyNames(event).length == 0) return;
					//倒序遍历globalHistory的cardMove，
					//对其中每个lose事件，遍历卡牌，并记录位于弃牌堆的牌
					var cardnames = {};
					game.getGlobalHistory('cardMove', function(evt){
						if(evt.cards&&evt.name=='lose'&&evt.getParent('phaseUse') == event){
							for(var i=evt.cards.length-1; i>=0; --i){
								if(get.position(evt.cards[i], true) != 'd')continue;
								if(typeof cardnames[evt.cards[i].name] === 'undefined'){
									cardnames[evt.cards[i].name] = [];
								}
								if(!cardnames[evt.cards[i].name].contains(evt.cards[i])){
									cardnames[evt.cards[i].name].push(evt.cards[i]);
								}
							}
						}
						return true;
					});
					//如果弃牌堆存在某个牌名重复，则添加空事件jiaoming_invalid，
					//用于判定jiaoming本回合能否触发/使用
					for(var nm in cardnames){
						if(cardnames[nm]&&cardnames[nm].length>1){
							player.addTempSkill('jiaoming_invalid');
						};
					}
					if(nm != undefined){
						player.addTempSkill('jiaoming_main', 'phaseUseAfter');
					}
				},
				subSkill:{
					invalid:{

					},
					main:{
						enable:'phaseUse',
						check:function(event, player){
							return true;
						},
						filter:function(event, player){
							return !player.hasSkill('jiaoming_invalid');
						},
						prompt:'你可选择攻击范围内有你的一名其他角色',
						filterTarget:function(card, player, target){
							return player!=target&&target.canUse('sha', player);
						},
						content:function(){
							'step 0'
							event.jmTarget = targets[0];
							var next = event.jmTarget.chooseToUse(
								'对'+get.translation(player)+'使用一张【杀】；或失去1点体力并令'+get.translation(player)+'于本回合失去『骄名』。',
								function(card, player){
									if(get.name(card)!='sha') return false;
									return lib.filter.filterCard.apply(this,arguments);
								}
							);
							next.set('filterTarget', function(card, player , target){
								return _status.event.shaTarget == target;
							}).set('shaTarget', player).set('targetRequired',true);
							//ai
							var aiChoice = event.jmTarget.hasSha('use')?player:-1;
							next.set('choice',aiChoice).set('ai2',function(target){return _status.event.choice});
							'step 1'
							if(event.directfalse||result.bool==false){
								player.addTempSkill('jiaoming_invalid');
								event.jmTarget.loseHp();
							}
						},
						ai:{
							pretao:true,
							order:5,
							result:{
								player:function(player,target){
									if(player.hp!=1) {
										if(target.hp == 1&&!target.hasSha('use')){
											return 2;
										}
										return 0;
									}
									else return -1;
								},
								target:function(player, target){
									if(target.hasSha('use')){
										return -1;
									}else{
										return -2;
									}
								}
							}
						}
					}
				}
			},
			changhe:{
				audio:true,
				trigger:{
					player: 'phaseUseEnd'
				},
				forced: false,
				check:function(event, player){
					return true;
				},
				filter:function(event, player){
					event = event&&(event.name == 'phaseUse'?event:event.getParent('phaseUse'));
					if(!event||Object.getOwnPropertyNames(event).length == 0) return false;
					if(!player)return false;
					var cardnames = {};
					game.getGlobalHistory('cardMove', function(evt){
						if(evt.cards&&evt.name=='lose'&&evt.getParent('phaseUse') == event){
							for(var i=evt.cards.length-1; i>=0; --i){
								if(get.position(evt.cards[i], true) != 'd')continue;
								if(typeof cardnames[evt.cards[i].name] === 'undefined'){
									cardnames[evt.cards[i].name] = [];
								}
								if(!cardnames[evt.cards[i].name].contains(evt.cards[i])){
									cardnames[evt.cards[i].name].push(evt.cards[i]);
								}
							}
						}
						return true;
					});
					//弃牌堆有大于等于三张同名牌，即可触发，返回true
					for(var nm in cardnames){
						if(cardnames[nm]&&cardnames[nm].length>2)return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseControl(['cancel2']).set('choiceList',[
						'摸两张牌',
						'回复1点体力'
					]).set('prompt', '请选择一项').set('ai', function(){
						if(_status.event.chPlayer){
							return _status.event.chPlayer.maxHp > _status.event.chPlayer.hp;
						}
						return 0;
					}).set('chPlayer', player);
					'step 1'
					if(result.control!='cancel2'){
						if(result.index == 0){
							player.draw(2);
						}else{
							player.recover();
						}
					}
				}
			},
			//小野町春香
			nvjiangrouhao:{
				audio:true,
				group:['nvjiangrouhao_shaTrigger', 'nvjiangrouhao_distanceTrigger'],
				subSkill:{
					shaTrigger:{
						trigger:{
							player:'useCardToPlayered',
						},
						filter:function(event){
							return event.card.name=='sha';
						},
						forced:true,
						content:function(){
							//对杀的对象添加临时mod技能，限制使用牌的花色
							var suit = trigger.card.suit;
							var target  = trigger.target;
							target.addTempSkill('nvjiangrouhao_filterShan', 'shaAfter', 'nvjiangrouhao_distanceTemp');
							
							if(!target.storage.nvjiangrouhao){
								target.storage.nvjiangrouhao = {
									shaTrigger:{}
								};
							}
							target.storage.nvjiangrouhao.shaTrigger.suit = suit;
							//同步的数据
							if(target.isOnline()){
								target.send(function(target,suit){
									if(!target.storage.nvjiangrouhao){
										target.storage.nvjiangrouhao = {
											shaTrigger:{}
										};
									}
									target.storage.nvjiangrouhao.shaTrigger.suit = suit;
								}, target, suit);
							}
						},
					},
					//特定牌花色mod
					filterShan:{
						mod:{
							cardEnabled2:function(card, player){
								//如果player有杀，且有花色
								var sha = (player&&player.storage&&player.storage.nvjiangrouhao)
									&& player.storage.nvjiangrouhao.shaTrigger;
								if(!sha||!sha.suit)return;
								//只有同花色的闪能响应
								if(get.name(card) == 'shan' && get.suit(card) != sha.suit){
									return false;
								}
							}
						}
					},
					distanceTrigger:{
						audio:'nvjiangrouhao',
						trigger:{
							source:'damageSource'
						},
						forced:true,
						content:function(){
							player.addTempSkill('nvjiangrouhao_distanceTemp', {player:'phaseBegin'});
						}
					},
					//距离mod
					distanceTemp:{
						mark: true,
						mod:{
							globalFrom:function(player,target,distance){
								return distance-1;
							}
						},
						intro:{
							content: '锁定技，直到你的下一个回合开始，你计算与其他角色的距离-1。'
						}
					}
				}
			},
			yinlaiyaotang:{
				audio:3,
				group:['yinlaiyaotang_phaseUse', 'yinlaiyaotang_loseCheck'],
				subSkill:{
					phaseUse:{
						enable: 'phaseUse',
						usable: 1,
						log:false,
						filter:function(event, player){
							return player.getCards('h').length > 0;
						},
						content:function(){
							'step 0'
							player.chooseCardTarget({
								position:'he',
								prompt: '###『引徕药汤』###将任意数量手牌交给你攻击范围内的任意角色（指定自己时表示置于武将牌上）', 
								selectCard:[1, Infinity],
								filterCard:true,
								filterTarget:function(card,player,target){
									return target==player||player.inRange(target);//自己或自己攻击范围内的角色
								},
								ai1:function(card){
									var player = _status.event.player;
									if(ui.selected.cards.length||player.storage.yinlaiyaotang_phaseUse){
										var tang = ui.selected.cards.concat(player.storage.yinlaiyaotang_phaseUse);
										for(var i=0;i<tang.length;i++){
											if(get.name(tang[i])==card.name)	return 0;
										}
									}
									if(player.needsToDiscard()) return 7.5-get.value(card);
									return 6-get.value(card);//选牌收益判断
								},
								ai2:function(target){
									if(target!=player)	return get.recoverEffect(target, _status.event.player, _status.event.player);
									return 1;//选人收益判断
								},
							});
							'step 1'
							if(result.bool){
								player.logSkill('yinlaiyaotang');
								event.cards = result.cards.slice(0);
								event.target = result.targets[0];
								if(event.target==player){
									player.lose(event.cards,ui.special,'toStorage');
									player.$give(event.cards,player,false);//处理牌动画
									player.markAuto('yinlaiyaotang_phaseUse',event.cards);//自动标记
								}else{
									event.target.gain(event.cards,player,'giveAuto');
								}
							}
							// 'step 0'
							// player.chooseControl(['cancel2']).set('choiceList',[
							// 	'你可将任意数量手牌交给你攻击范围内的任意角色',
							// 	'将任意手牌置于武将牌上'
							// ]).set('prompt', '请选择一项').set('ai', function(){
							// 	return Math.random()>0.5?0:1;
							// });
							// 'step 1'
							// if(result.control!='cancel2'){
							// 	//选择任意数量手牌
							// 	player.chooseCard('h', '选择你的手牌',true, [1, player.getCards('h').length||1]);
							// 	event.selecetedChoice = result.index;
							// }else{
							// 	event.finish();
							// }
							// 'step 2'
							// if(result.bool){
							// 	//选中的牌
							// 	event.prepareCards = result.cards.slice(0);
							// 	if(event.selecetedChoice == 0){
							// 		event.goto(3);
							// 		//选择player攻击范围内的角色
							// 		player.chooseTarget('将选中的手牌交给你攻击范围内的任意角色', true, function(card, player, target){
							// 			return player.canUse('sha',target);
							// 		}).set('ai',function(target){
							// 			return get.damageEffect(target, _status.event.player, _status.event.player);
							// 		});
							// 	}else{
							// 		event.goto(4);
							// 	}
							// }else{
							// 	event.finish();
							// }
							// 'step 3'
							// if(result.bool&&event.prepareCards&&event.prepareCards.length>0&&result.targets){
							// 	//选择的角色获得选中的牌
							// 	var prepareTarget = result.targets[0];
							// 	prepareTarget.gain(event.prepareCards, player);
							// }
							// event.finish();
							// 'step 4'
							// //从手牌移除
							// player.lose(event.prepareCards,ui.special,'toStorage');
							// //同步mark，保存至player.storage.yinlaiyaotang_phaseUse 
							// player.storage.yinlaiyaotang_phaseUse = player.storage.yinlaiyaotang_phaseUse.concat(event.prepareCards);
							// player.syncStorage('yinlaiyaotang_phaseUse');
							// player.markSkill('yinlaiyaotang_phaseUse');
							// game.log(player,'将',event.prepareCards,'置于武将牌上');
						},
						init:function(player){
							if(!player.storage.yinlaiyaotang_phaseUse)player.storage.yinlaiyaotang_phaseUse = [];
						},
						intro:{
							name: '引徕药汤',
							content:'cards'
						},
						ai:{
							order:5,//决定AI会不会主动释放技能
							result:{player:0.5},
						}
					},
					loseCheck:{
						audio:'yinlaiyaotang',
						trigger:{global:'loseAfter'},
						forced: true,
						filter:function(event, player){
							//在有牌置于武将牌上时继续检查
							if(!player.storage.yinlaiyaotang_phaseUse)return;
							if(event.hs&&event.hs.length&&event.player!=player&&get.distance(player, event.player)<=1){
								var tang = player.storage.yinlaiyaotang_phaseUse;
								for(var i=0;i<event.hs.length;i++){
									for(var j=0;j<tang.length;j++){
										if(get.name(tang[j])==get.name(event.hs[i])){
											return true;
										}
									}
								}
							}
							
							//仅对距离为1的角色
							// if(get.distance(player, event.player) == 1){
							// 	if(!event.cards||!event.cards.length)return false;
							// 	for(var i=0;i<event.cards.length;++i){
							// 		//仅查找当前牌的位置为手牌时
							// 		if(get.position(event.cards[i]) != 'h') continue;
							// 		//对武将牌上的牌遍历，找到同名牌则通过
							// 		for(var j=0;j<player.storage.yinlaiyaotang_phaseUse.length;++j){
							// 			if(player.storage.yinlaiyaotang_phaseUse[j].name == event.cards[i].name){
							// 				//保存检索的位置信息
							// 				player.storage.loseCheck = [i, j];
							// 				return true;
							// 			}
							// 		}
							// 	}
							// }
							// return false;
						},
						content:function(){
							'step 0'
							trigger.player.recover();
							'step 1'
							var hs = trigger.hs
							var tang = player.storage.yinlaiyaotang_phaseUse;
							event.cards = [];
							for(var i=0;i<hs.length;i++){
								for(var j=0;j<tang.length;j++){
									if(get.name(tang[j])==get.name(hs[i])){
										event.cards.push(tang[j]);
									}
								}
							}
							player.gain(event.cards,'gain2');
							player.unmarkAuto('yinlaiyaotang_phaseUse',event.cards);
							// 'step 1'
							// var removedCard = player.storage.yinlaiyaotang_phaseUse.splice(player.storage.loseCheck[1], 1)[0];
							// if(player.storage.yinlaiyaotang_phaseUse.length == 0){
							// 	player.unmarkSkill('yinlaiyaotang_phaseUse');
							// }else{
							// 	//更新mark
							// 	player.markSkill('yinlaiyaotang_phaseUse');
							// }
							// player.syncStorage('yinlaiyaotang_phaseUse');
							// //获得卡牌
							
							// player.gain(removedCard,'fromStorage');
							// game.log(player, '从武将牌上获得一张', removedCard);
							// //延时
							
							// game.delayx();
							'step 2'
							//你摸一张牌。
							player.draw();
						}
					}
				}
			},
		},
		characterReplace:{
			SasakiSaku:['SasakiSaku','sea_SasakiSaku'],
			LizeHelesta:['re_LizeHelesta','LizeHelesta','gz_LizeHelesta'],
			re_AngeKatrina:['re_AngeKatrina','gz_AngeKatrina'],
			
			MononobeAlice:['re_MononobeAlice','MononobeAlice'],
			ShizukaRin:['re_ShizukaRin','ShizukaRin'],
			MitoTsukino:['re_MitoTsukino','MitoTsukino'],
			UshimiIchigo:['re_UshimiIchigo','UshimiIchigo'],
			HiguchiKaede:['re_HiguchiKaede','HiguchiKaede'],
			SuzuharaLulu:['re_SuzuharaLulu','SuzuharaLulu'],
		},
		translate:{
			nijisanji_1:'一期生',
			nijisanji_2:'二期生',

			nochongzhu:'禁止重铸',

			MononobeAlice:'物述有栖',
			leiyan:'雷言',
			leiyan_info:'锁定技 你的［雷杀］可以指定1-3个目标，并无视角色防具',
			xiaozhangduandai:'嚣张缎带',
			xiaozhangduandai_info:'觉醒技。当你处于濒死状态时，立即恢复3点体力，摸3张牌并获得技能（咏春）',
			yongchun:'咏春',
			yongchun_info:'你在出牌阶段使用［杀］时，可以摸一张牌，并弃置一张手牌，令此［杀］不计入出牌阶段的使用次数',
			tinenghuifu1:'体能恢复',
			tinenghuifu1_hp:'体能恢复',
			tinenghuifu1_info:'锁定技 当你失去装备区的一张牌后，你回复1点体力。当你的体力值减少后，你摸一张牌。',
			tinenghuifu1_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：卖血</span>',
			dianmingguzhen:'电鸣鼓震',
			dianmingguzhen_info:'出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你视为对对应装备栏内没有装备的所有角色使用一张雷【杀】；然后你可以为抵消此【杀】的角色追加一次【闪电】判定。',
			dianmingguzhen_append:'<span style="font-family: LuoLiTi2;color: #dbb">可以通过将自己的装备转移给队友，实现瞬间爆发</span>',

			ShizukaRin:'静凛',
			mozhaotuji:'魔爪突击',
			mozhaotuji_DrawOrStop:'魔爪突击',
			mozhaotuji_info:'回合内，你可以将任意阶段连续的变为出牌阶段，直到你有出牌阶段未使用过牌。你使用过两张或更多牌的阶段结束时，你摸一张牌。',
			mozhaotuji_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：多次出杀 易上手</span>',

			IenagaMugi:'家长麦',
			fengxue:'奋学',
			fengxue_info:'你可以跳过出牌阶段，亮出牌堆顶的X+1张牌，使用其中一张牌，然后获得其中一种花色的牌，弃置其余的牌。（X为体力值不小于你的角色数）',
			yuepi:'乐癖',
			yuepi_info:'弃牌阶段开始时，你可以重铸等同于你装备区牌数的手牌，令你在本阶段增加等量的手牌上限。',
			cangxiong:'藏兄',
			cangxiong_info:'其他角色的体力值变为1后，你可以交给其任意手牌，然后若其手牌数大于你，将直到其回合开始。',
			cangxiong_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：传递关键牌 保护友方</span>',
			
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
			qiujinzhiling_info:'主公技 锁定技 其他同势力角色回合内进入弃牌堆的牌不触发『全新全异』',

			mark_bingdielei: '并蒂恶蕾',
			mark_bingdielei_anotherPhase: '并蒂恶蕾',
			mark_bingdielei_info:'你造成或受到过伤害的额定回合结束时，你可以弃置一张♣或装备牌以获得一个额外回合。',
			mark_quanxinquanyi:'全新全异',
			mark_quanxinquanyi_endRound:'全新全异',
			mark_quanxinquanyi_info:'一轮开始时，你可以声明一张未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。',
			
			mark2_bingdielei: '并蒂恶蕾',
			mark2_bingdielei_info:'你受到伤害或令一名角色进入濒死状态的额定回合结束时，获得一个额外回合。',
			
			SuzukaUtako: '铃鹿诗子',
			meici: '美词',
			meici_info: '其他角色的回合开始时，若其手牌为全场最多，其本回合使用锦囊牌后，你可以观看其手牌并重铸其中一张，若因此重铸了基本牌，你也可重铸一张牌。',
			meici_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',
			danlian: '耽恋',
			danlian_info: '一个回合结束时，若本回合不因使用而进入弃牌堆的牌不小于当前回合角色的体力值，你可选择其中一张♦或♣牌并选择另一名其他角色，当前回合角色将♦牌当【乐不思蜀】，♣牌当【决斗】对你选择的角色使用。每轮每种花色限一次。',
			danlian_append:'<span style="font-family: LuoLiTi2;color: #dbb">可以把弃牌转化为【乐不思蜀】和【决斗】</span>',
			
			HiguchiKaede: '樋口枫',
			zhenyin: '震音',
			zhenyin_info: '你造成伤害后，可以将目标装备区或判定区的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。',
			saqi: '飒气',
			saqi_info: '准备阶段，你可以增加（至多到 5 ）或扣减 1 点体力上限，若选择扣减，你获得以下效果直到你的下回合开始：你使用牌结算后，所有其他角色本回合无法使用该花色的牌；发动『震音』的条件改为“你使用牌指定唯一目标后”。',
			saqi_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：改变体力上限 爆发</span>',
			
			UshimiIchigo: '宇志海莓',
			kuangbaoshuangren: '狂暴双刃',
			kuangbaoshuangren_info: '锁定技 你的黑色【杀】指定目标后，需额外指定攻击范围内的一名角色为目标。你的红色【杀】无距离与次数限制，且造成伤害后可以弃置目标的坐骑牌。',
			kuangbaoshuangren_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：强化出杀</span>',
			guangsuxiabo: '光速下播',
			guangsuxiabo_info: '一个阶段结束时，若你于此阶段受到过伤害或失去了两张以上的牌，你可以摸一张牌并结束当前回合。',
			
			SisterClearie:'修女·克蕾雅',
			zhenxin: '真信之诚',
			zhenxin_info: '锁定技 防止每回合你第一次对体力值小于你的角色造成的伤害；防止体力值大于你的角色每回合对你造成的第一次伤害。',
			sczhuwei: '助危之心',
			sczhuwei_info: '其他角色的结束阶段，若其手牌或体力为全场最少，其可以与你各摸一张牌，然后你可以移动你或其装备区的一张牌。',
			sczhuwei_put_info: '令修女克蕾雅与你各摸一张牌，然后她可以移动你或其装备区的一张牌。',

			HonmaHimawari: '本间向日葵',

			YagamiKaruta: '山神歌流多',
			suisi: '髓思',
			suisi_info: '锁定技 你能且仅能用其它基本牌当【闪】，用其它锦囊牌当【无懈可击】使用。<br>你的【闪】或【无懈可击】进入弃牌堆时，摸这些牌一半的牌（向上取整）。',
			suisi_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：高防御 自肃</span>',
			liefeng: '猎风',
			liefeng_info: '结束阶段，你可以展示所有手牌，若均无法被使用，你弃置之并视为使用了等量的暗【杀】。',
			
			YukishiroMahiro:'雪城真寻',
			jiaoming: '骄名',
			jiaoming_info: '出牌阶段，若本阶段进入弃牌堆的牌名称均不同，你可令攻击范围内有你的一名其他角色选择一项：<br>对你使用一张【杀】；或失去1点体力并令你于本回合失去『骄名』。',
			jiaoming_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：挑衅</span>',
			changhe: '唱和',
			changhe_info: '出牌阶段结束时，若本阶段进入弃牌堆的牌中有至少三张名称相同，你可以选择一项：<br>摸两张牌；或回复1点体力。',

			OnomachiHaruka: '小野町春香',
			nvjiangrouhao: '女将柔豪',
			nvjiangrouhao_info: '锁定技 你的【杀】只能被同花色的【闪】抵消，你造成伤害后，计算与其他角色的距离-1。',
			yinlaiyaotang: '引徕药汤',
			yinlaiyaotang_info: '出牌阶段限一次，你可将任意数量手牌交给你攻击范围内的任意角色或将任意手牌置于武将牌上。武将牌上的牌的同名牌从与你距离为1的角色的手牌中离开时，其回复1点体力，武将牌上的那张牌返回你的手牌且你摸一张牌。',
			yinlaiyaotang_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',

			SasakiSaku: '笹木咲',
			tiaolian: '咆咲',
			tiaolian_info: '当你使用牌指定其他角色为目标时，可用一张手牌与其中任意名目标同时拼点，对于你没赢的取消此目标，你赢的不可响应此牌；当你成为其他角色使用牌的目标时，你可以与其拼点，若你赢，此牌对你无效，若你没赢，你不可响应此牌。每回合限一次。',
			jiaku: '生笹',
			jiaku_info: '锁定技 你赢得拼点时，获得目标一张牌；你没赢得拼点时，摸一张牌。',
			jiaku_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：无损拼点 易上手</span>',

			LizeHelesta: '莉泽·赫露艾斯塔',
			LizeHelesta_ab: '莉泽',
			shencha: '权力审查',
			shencha_info: '准备阶段，你可以跳过本回合的摸牌阶段并观看牌堆顶3张牌，获得其中至多两张基本牌，并将其余牌置于牌堆底。若你的装备区没有牌，则你可装备其中的至多两张装备牌，若你的判定区有牌，则每有一张牌你便多观看一张。',
			helesta: '赫露圣剑',
			helesta_info: '你受到伤害时，可以弃置自己装备区的一张牌使此伤害-1。你失去装备区的牌时，你可以视为使用一张冰【杀】并摸一张牌。',
			helesta_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：减伤</span>',


			AibaUiha: '相羽初叶',
			KataribeTsumugu: '语部纺',
			
		}
	}
}
)