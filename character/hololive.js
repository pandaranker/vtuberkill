'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'hololive',
		connect:true,
		character:{
			GawrGura:['female','holo',3,['lingqun','yangliu']],
			NinomaeInanis:['female','holo',3,['mochu','fuyue']],
			/**时乃空 */
			TokinoSora:['female','holo',4,['taiyangzhiyin','renjiazhizhu'],['zhu']],
			/**夜空梅露 */
			YozoraMel:['female','holo',3,['juhun','meilu']],
			/**赤井心 */
			AkaiHaato:['female','holo',3,['liaolishiyan','momizhiyan']],
			/**夏色祭 */
			NatsuiroMatsuri:['female','holo',3,['huxi1','lianmeng']],
			/**萝卜子 */
			RobokoSan:['female','holo',3,['gaonengzhanxie','ranyouxielou']],
			/**白上吹雪 */
			ShirakamiFubuki:['female','holo',3,['yuanlv','jinyuan','zhongjian'],['zhu']],
			/**aki */
			AkiRosenthal: ['female', 'holo', 3, ['meiwu', 'huichu']],
			/**星街慧星 */
			HoshimatiSuisei:['female','holo',4,['yemuxingyong', 'xinghejianduei']],
			/**樱巫女 */
			SakuraMiko: ['female', 'holo', 4, ['haodu']],
			/**湊阿库娅 */
			MinatoAqua:['female','holo',3,['kuali','youyi']],
			/**兔田佩克拉 */
			UsadaPekora:['female','holo',3,['pekoyu','hongshaoturou']],
			/**大神澪 */
			ŌokamiMio:['female','holo',3,['xuanxu','weizeng'],['forbidai']],
			
			/**OG诸人 */
			Civia:['female','holo',3,['kuangxin','danyan','qingjie']],
			SpadeEcho:['female','holo',3,['hangao','yinglve']],
			Artia:['female','holo',3,['shuangzhi','shenghua']],
			Doris:['female','holo',3,['shenhai','paomo']],
			Yogiri:['female','holo',3,['shisang','wanjie']],
			Rosalyn:['female','holo',3,['maoge','bianlan','futian']],
		},
		characterSort:{
			hololive:{
				hololive_1:['YozoraMel','AkiRosenthal','AkaiHaato','ShirakamiFubuki','NatsuiroMatsuri'],
				hololive_wuyin:['TokinoSora','HoshimatiSuisei','RobokoSan','SakuraMiko'],
				hololive_2and3:['MinatoAqua','UsadaPekora'],
				OurGirls:['Civia','SpadeEcho','Artia','Doris','Yogiri','Rosalyn'],
			}
		},
		characterIntro:{
			MinatoAqua: '阿库娅者，杏社一孑然水兵，虫蝗起祸之时水军都督欲助之，夸苦谏无果，斩之，人常言名正则言顺，夸亦不惧流言，僭越圣皇之位。如此抗争十月有余，战功赫赫，只身一人斩鬼佬兆计，活华夏民众不可胜数，元昭既为虫蝗惑，出兵连击圣皇，圣皇外抗虫蝗，内拒元昭，日削月割，以至于穷，V始二十四年，姑苏城破，圣皇燔宝器、烧粮草，死战力竭而亡。',
			UsadaPekora: '“哈↑哈↑哈↑哈↑”',
			
			SakuraMiko: '樱巫女（V始三年）者，神社之巫女也，性坚毅，素有樱火龙之称，子云，食色性也，圣人如此，miko亦然，miko喜黄油，常于配信误启之，虽贵为巫女，护东南诸郡安宁，然不识诗书，有《FAQ》、《倪哥》为众人笑，V始十九年，朝廷窜东南，miko力拒之，自封自由领，不受诸侯管制',
			HoshimatiSuisei: '星街彗星（V始三年），北海人也，少时贫寒，彗酱一心求学，从当世之先达元昭执经叩问，元昭深器之，彗酱豆蔻之年即通晓诸经，人莫不言之曰天道酬勤，六边形战士之名世人皆知。V始十三年绊爱首义，彗酱自投笔从戎，有tst之神兵，杏国拜之曰上将军，后党锢事泄，世人皆知元昭欺世盗名之徒，星街亦惶惶不可终日，随杏败走瀛洲。',
			TokinoSora: '混沌的尽头，少女的回旋曲，杏社起始同时也是终末的清楚担当，全杏社圆桌骑士之首，空友之母，反抗军的破坏者、狮心之人、大杏社的卡丽熙、hololive真主、永不恐惧者、阿芙乐尔公主，时乃空是也',
			YozoraMel: '夜空梅露者，西界之吸血鬼也，面容婧然身材出众，曾因人拒同族长者，为血族放，梅露东奔长安，于苑中为歌女，惹得京城子弟风流，夏色祭既受元昭令，以樱桃汁赚梅露，遂从祭拜杏国，元昭拜之曰南阳县主。',
			AkaiHaato: '赤井心，京师名医之后也，嗜食成性，有《药膳经》流于世，其药多先夺人命后生之，用者莫不谈之色变，食尤喜沙琪玛，每日贡食入府，左右皆呼“哈恰玛恰玛”，后元昭起势，心随夏色祭往拜之，从军十年活人兆计，后拜土澳公主，总领土澳事宜。',
			AkiRosenthal: 'aki者，蓬莱之仙子也，天帝遣aki携神兵助元昭起义师，aki遂下界，恰逢时乃空见欺，朝廷围之，aki使奥术魔刃斩之，只一合，朝廷三十万军士灰飞烟灭，杏军皆呼之曰神，有反重力之发辫二，元昭欲留aki，aki婉拒之，还复天界，不知所踪。',
			NatsuiroMatsuri: '夏色祭（V始二年）者，元昭之同族也，自党锢之祸后，元昭暗谋国事，遣祭访天下名士，得名士四人，是为杏国一期，祭不拘小节，最喜呼吸，同社皆避之，既为混沌传说，一般露○可轻言之，建功累累，元昭尊为第一将军',
			RobokoSan: '萝卜子（V始三年）者，奇巧士之造物也，自号高性能机器人，实则不善文书，萝卜起于草莽，生性豪爽，后为时乃空所动，随杏社征战，V始二十年，杏国攻灭诸侯，远交近攻，俨然有大一统之势，萝卜子拜平南王福禄将军，安于南方',
			ShirakamiFubuki: '白上吹雪者，青丘之狐也，夏色祭以玉米赚之，V始十五年，朝廷击绊爱于桐江，大破之，又击之于宛城，斩爱之左将军，一时人皆自危，起义初显败势，吹雪自领百骑迂回西南袭朝廷于后，解绊爱众叛亲离之危，重兴V国大业，后虫蝗起祸，元昭绥靖，吹雪亦听之任之，遂成大乱。',
		
			
			Civia: '希薇娅者，独角兽也，九世善行，神灵感其所为，点化成人，其成人之时情不自禁多言人语，后人称之为“话痨将军”，civia多通夷语，随黑桃影归杏后，官拜大学士，总掌文职，行事和蔼淡然，常言“watashimo”，有好好先生之称，虫蝗之难后，civia叹恶龙之无道，元昭之无能，携cn六人离之。',
			SpadeEcho: '黑桃影者，神乐七奈之女也，幼时离散，嗓音独特，孑然独活于幽云等地，以行盗活之，echo盗亦有道，决不伸手贫寒，常行窃于联动对象设备，造成诸多直播事故，为天下笑，echo慕杏“则天去私”之号，携友三人归之，战功赫赫，杏有中华基业，echo等六人之力也，虫皇之难后，echo终思华夷不两立，冲突出阵，隐退于山林。',
		},
		skill:{
			taiyangzhiyin:{
				audio:2,
					trigger:{ player:['useCard2'] },
				filter:function(event,player){
					//console.log(event.card,1)
					//console.log(player.storage.onlink,event.card.cardid)
					return get.number(event.card)>10&&(player.storage.onlink==null||player.storage.onlink.indexOf(event.card.cardid)==-1);
				},
					priority: 1,
					frequent:true,
					forced:false,
					content:function (){
					var info=get.info(trigger.card);
					var players=game.filterPlayer();
					if(player.storage.onlink==null){
						player.storage.onlink=[];
					}//处理正处于连锁中的卡牌
					'step 0'
					event.Dvalue=get.number(trigger.card)-10;
					var list=[['无法响应'],['额外目标'],['摸一张牌']];
					if(!game.hasPlayer(function(current) {
						return lib.filter.targetEnabled2(trigger.card, player, current)
							&& player.inRange(current)
							&& !trigger.targets.contains(current)
							//&& (player.canUse(trigger.card, current)||current.canUse(trigger.card, current))
							&& (get.type(trigger.card)!='equip'&&get.type(trigger.card)!='delay')
					})) {
						list.splice(1,1);
						if(event.Dvalue==3){
							event.Dvalue=2;
						}
					}
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(id, choicelist,Dvalue){
						var dialog=ui.create.dialog('选择'+Dvalue+'项');
						choicelist.forEach(element=>{
							dialog.add([element,'vcard']);
						})
						dialog.videoId = id;
					}, event.videoId, list,event.Dvalue);
					player.storage.onlink.push(trigger.card.cardid);
					'step 1'
					player.chooseButton(event.Dvalue).set('dialog',event.videoId).set('prompt',get.prompt('taiyangzhiyin'));
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						result.links.forEach(element => {
							if(element[2]=="摸一张牌"){
								player.draw();
							}
							if(element[2]=="无法响应"){
								game.log(player,'令',trigger.card,'无法被响应');
								trigger.directHit.addArray(players);
								trigger.nowuxie=true;
							}
						});
						result.links.forEach(element => {
							if(element[2]=="额外目标"){
								//console.log(trigger);
								player.chooseTarget(true,'额外指定一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
									var trigger=_status.event;
									if(trigger.targets.contains(target)) return false;
									return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
								}).set('ai',function(target){
									var trigger=_status.event.getTrigger();
									var player=_status.event.player;
									return get.effect(target,trigger.card,player,player);
								}).set('targets',trigger.targets).set('card',trigger.card);
							}
						});
					}
					'step 3'
					if(result&&result.bool){
						if(!event.isMine()) game.delayx();
						event.target=result.targets[0];
						if(event.target){
							trigger.targets.add(event.target);
						}
					}
					},
					group:'taiyangzhiyin_clear',
					subSkill:{
					clear:{
						trigger:{player:['useCardAfter']},
						direct:true,
						content:function(){
							if(player.storage.onlink!=null){
								var deleteIndex=player.storage.onlink.indexOf(trigger.card.cardid);
								if(deleteIndex!=-1){
									player.storage.onlink.splice(deleteIndex,1,null)
								}
							}
						}
					}
				}
			},
			renjiazhizhu:{
				audio:2,
				unique:true,
				trigger:{player:'phaseUseBefore'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('renjiazhizhu')) return false;
					return true;
				},
				content:function(){
					if(player.storage.skillCardID==null){
						player.storage.skillCardID=[];
					}
					event.players=game.filterPlayer(function(current){
						return current.group=='holo'&&(current!=player);
					});
					event.players.sortBySeat(player);
					'step 0'
					if(event.playersIndex==null){
						event.playersIndex=0;
					}
					if(event.playersIndex<event.players.length){
						//console.log(event.playersIndex);
						event.players[event.playersIndex].chooseCard('是否交给'+get.translation(player)+'一张手牌').set('ai',function(card){
							if(get.attitude(_status.event.player,_status.event.kong)>=0) return 7-get.value(card);
							return -1;
						}).set('kong',player)
					}
					else{
						event.playersIndex=0;
						//console.log(player.storage.skillCardID)
						event.finish();
					}
					'step 1'
					if(result.bool==true){
						if(player.storage.changecardList==null){
							player.storage.changecardList=[];
						}
						player.storage.changecardList.push({
							result:result,
							card:result.cards[0],
							oldNumber:result.cards[0].number,
							oldData:result.cards[0].childNodes[1].childNodes[2].data
						});
						player.gain(result.cards,event.players[event.playersIndex],'giveAuto');
						result.cards[0].number=11;
						result.cards[0].specialEffects=['card_hightlight'];
						var newcard=get.cardInfoOL(result.cards[0]);//取得card对象
						let newcard2=get.cardInfo(result.cards);
						var info=JSON.parse(newcard.slice(13));//
						var id=info.shift();
						game.broadcastAll(function(card,info){
							card.init(info)
						},result.cards[0],info);
						//result.cards[0].init(info)
						//lib.cardOL[id].init(info);
						//console.log(player.storage.changecardList);
						player.storage.skillCardID.push(result.cards[0].cardid);
					}
					if(event.playersIndex<event.players.length){
						event.playersIndex++;
						event.goto(0);
					}
					//console.log(player.storage.skillCardID)
				},
				group:['renjiazhizhu_changecard','renjiazhizhu_clear'],
				subSkill:{
					changecard:{
						trigger:{player:'useCardToBefore'},
						direct:true,
						filter:function(event,player){
							if(player.storage.skillCardID==null){
								return false
							}
							else{
								return player.storage.skillCardID.indexOf(event.card.cardid)!=-1;
							}
						},
						content:function(){
							//trigger.card.number=11;
						}
					},
					clear:{
						trigger:{global:'phaseBefore'},
						silent:true,
						content:function(){
							delete player.storage.skillCardID;
							if(player.storage.changecardList!=null){
								player.storage.changecardList.forEach((element,index)=>{
									var newcard=get.cardInfoOL(element.card);
									var info=JSON.parse(newcard.slice(13));
									var id=info.shift();
									info[1]=element.oldNumber;
									if(info[5]==null){
										info[5]=[]
									}
									info[5].remove('card_hightlight');
									game.broadcastAll(function(card,info){
										card.init(info)
									},element.card,info);
								})
							}
							delete player.storage.changecardList;
						}
					}
				}
			},
			renjiazhizhu2:{
					trigger:{global:'gainBefore'},
					forced:true,
					content:function(){
					//trigger.card.number=1;
					//trigger.card.cards[0].childNodes[1].childNodes[2].data=1;
					console.log(card);
					console.log(trigger);
					}
			},
			juhun:{
					trigger:{global:'damageEnd'},
					forced:true,
					usable:1,
					filter:function(event,player){return true},
					content:function(){
						"step 0"
						event.card=get.cards()[0];
						if(player.storage.juhun==undefined) player.storage.juhun=[];
						player.storage.juhun.push(event.card);
						player.syncStorage('juhun');
						//event.trigger("addCardToStorage");
						game.cardsGotoSpecial(event.card);
						player.showCards(player.storage.juhun,'聚魂')
						player.markSkill('juhun');
					},
					intro:{
						content:'cards',
						onunmark:function(storage,player){
							if(storage&&storage.length){
								player.$throw(storage,1000);
								game.cardsDiscard(storage);
								delete player.storage.juhun;
							}
						}
					},
					group:['juhun_get','juhun_draw'],
					subSkill:{
					get:{
						trigger:{
							global:'roundStart'
						},
						direct:true,
						filter:function(event,player){
							return player.storage.juhun!=undefined&&player.storage.juhun.length!=0;
						},
						content:function(){
							player.storage.juhun.forEach(function(c) {
								player.gain(c);
							});
							delete player.storage.juhun
							player.syncStorage('juhun');
							player.markSkill('juhun');
						}
					},
					draw:{
						trigger:{
							player:'phaseDrawBegin'
						},
						direct:true,
						filter:function(event,player){
							return !event.numFixed&&player.isMaxHandcard(false);
						},
						content:function(){
							trigger.num--;
						},
					}
					}
			},
			meilu:{
					trigger:{
					player:'phaseBegin'
					},
					forced:true,
					filter:function(event,player){
					return player.countCards('h')-3>=player.hp
					},
					content:function(){
					player.turnOver();
					},
					group:['meilu_kill','meilu_draw'],
					subSkill:{
						kill:{
							firstDo:true,
							trigger:{player:'phaseUseBefore'},
							forced:true,
							filter:function(event,player){
								return player.classList.contains('turnedover');
							},
							content:function(){
								trigger.audioed=true;
								player.markSkill('meilu');
								player.addTempSkill('meilu_infinityKill','phaseUseEnd');
							},
						},
						draw:{
							trigger:{player:'turnOverAfter'},
							forced:true,
							filter:function(event,player){
								return !player.classList.contains('turnedover');
							},
							content:function(){
								if(player.hp<player.maxHp){
									player.markSkill('meilu');
									player.recover();
								}
							},
						},
						infinityKill:{
							mod:{
								cardUsable:function(card,player,num){
									if(card.name=='sha') return Infinity;
								}
							}
						}
					}
			},
			liaolishiyan:{
				trigger:{
					player:"phaseDrawBegin1",
				},
				direct:true,
				locked:false,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function (){
					"step 0"
					player.chooseBool("是否放弃摸牌,改为从牌堆顶展示两张牌并发动技能？").ai=function(){
						var num=2;
						return num;
						// return cardsx.length>=trigger.num;
					};
					"step 1"
					if(result.bool){
						player.logSkill(event.name);
						trigger.changeToZero();
						var cards=get.cards(2);
						game.cardsGotoOrdering(cards);
						event.videoId=lib.status.videoId++;
						game.broadcastAll(function(player,id,cards){
							var str;
							if(player==game.me&&!_status.auto){
								str='料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
							}
							else{
								str='料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
							}
							var dialog=ui.create.dialog(str,cards);
							dialog.videoId=id;
						},player,event.videoId,cards);
						player.showCards(cards,'料理实验');
						player.storage.resultCards=cards;
						event.cards=cards;
						player.gain(cards,'log','gain2');
					}
					else{
						event.finish();
					}
					"step 2"
					//player.storage.resultCards=event.resultCards;
					for(var i=0;i<event.cards.length;i++){
						switch (get.suit(player.storage.resultCards[i])) {
							case 'spade':
								player.storage['card'+i]='黑桃：失去 1 点体力';
								break
							case 'heart':
								player.storage['card'+i]='红桃：令赤井心回复 1 点体力';
								break
							case 'diamond':
								player.storage['card'+i]='方块：重铸一张牌';
								break
							case 'club':
								player.storage['card'+i]='梅花：弃置一张牌';
								break
						}
					}
					"step 3"
					switch (get.suit(player.storage.resultCards[0])) {
						case 'spade':
							player.loseHp(1);
							break
						case 'heart':
							player.recover();
							break
						case 'diamond':
							player.chooseCard('he','重铸一张牌',1,true);
							// player.chooseToDiscard('he','重铸一张牌',1,true)
							// player.draw();
							break
						case 'club':
							player.discardPlayerCard(player,1,'he',true);
							break
					}
					"step 4"
					if(get.suit(player.storage.resultCards[0])=='diamond'&&result.cards){
						player.lose(result.cards, ui.discardPile);
						player.$throw(result.cards,1000);
						game.log(player,'将',result.cards,'置入了弃牌堆');
						player.draw();
					}
					switch (get.suit(player.storage.resultCards[1])) {
						case 'spade':
							player.loseHp(1);
							break
						case 'heart':
							player.recover();
							break
						case 'diamond':
							player.chooseCard('he','重铸一张牌',1,true);
							// player.chooseToDiscard('he','重铸一张牌',1,true)
							// player.draw();
							break
						case 'club':
							player.discardPlayerCard(player,1,'he',true);
							break
					}
					"step 5"
					if(get.suit(player.storage.resultCards[1])=='diamond'&&result.cards){
						player.lose(result.cards, ui.discardPile);
						player.$throw(result.cards,1000);
						game.log(player,'将',result.cards,'置入了弃牌堆');
						player.draw();
					}
					game.broadcastAll('closeDialog',event.videoId);
					player.addTempSkill('liaolishiyan2');
					},
					group:'liaolishiyan_clear',
					subSkill:{
						clear:{
							trigger:{global:['phaseUseAfter','phaseAfter']},
							silent:true,
							filter:function(event){
							},
							content:function(){
								delete player.storage.resultCards;
								delete player.storage.card0;
								delete player.storage.card1;
							}
						}
					}
			},
			liaolishiyan2:{
				enable:'phaseUse',
				position:'he',
				filter:function(event,player){
					return !player.hasSkill('liaolishiyan3');
				},
				content: function() {
					'step 0'
					player.chooseCardTarget({
						position:'he',
						prompt: '重置两张相同花色牌令一名角色按顺序执行'+'<br>'+player.storage.card0+'<br>'+player.storage.card1, 
						selectCard:2,
						filterCard:function(card,player){
							return (get.suit(card)==get.suit(player.storage.resultCards[0]))||(get.suit(card)==get.suit(player.storage.resultCards[1]))
						},
						filterTarget:function(card,player,target){
							if(card.cards){
								if(get.suit(player.storage.resultCards[0])==get.suit(player.storage.resultCards[1])) return true;
								else
									return get.suit(card.cards[0])!=get.suit(card.cards[1]);
							}
						}
					});
					'step 1'
					event.result=result;
					if(event.result.bool){
						// player.discard(result.cards,'重铸二张牌',2);
						// player.draw(2);
						player.lose(result.cards, ui.discardPile);
						player.$throw(result.cards,1000);
						game.log(player,'将',result.cards,'置入了弃牌堆');
						player.draw(2);
						switch (get.suit(player.storage.resultCards[0])) {
							case 'spade':
								event.result.targets[0].loseHp(1);
								break
							case 'heart':
								player.recover();
								//event.result.targets[0].recover();
								break
							case 'diamond':
								event.result.targets[0].chooseCard('he','重铸一张牌',1,true);
								break
							case 'club':
								event.result.targets[0].discardPlayerCard(event.result.targets[0],1,'he',true);
								break
						}
					}
					else{
						event.goto(4);
					}
					'step 2'
					if(get.suit(player.storage.resultCards[0])=='diamond'&&result.cards){
						event.result.targets[0].lose(result.cards, ui.discardPile);
						event.result.targets[0].$throw(result.cards,1000);
						game.log(event.result.targets[0],'将',result.cards,'置入了弃牌堆');
						event.result.targets[0].draw();
					}
					switch (get.suit(player.storage.resultCards[1])) {
						case 'spade':
							event.result.targets[0].loseHp(1);
							break
						case 'heart':
							player.recover();
							//event.result.targets[0].recover();
							break
						case 'diamond':
							event.result.targets[0].chooseCard('he','重铸一张牌',1,true);
							break
						case 'club':
							event.result.targets[0].discardPlayerCard(event.result.targets[0],1,'he',true);
							break
					}
					'step 3'
					if(get.suit(player.storage.resultCards[1])=='diamond'&&result.cards){
						event.result.targets[0].lose(result.cards, ui.discardPile);
						event.result.targets[0].$throw(result.cards,1000);
						game.log(event.result.targets[0],'将',result.cards,'置入了弃牌堆');
						event.result.targets[0].draw();
					}
					player.addTempSkill('liaolishiyan3');
					event.finish();
					'step 4'
					event.finish();

				}

			},
			liaolishiyan3:{
				trigger:{global:['phaseUseAfter','phaseAfter']},
				silent:true,
				filter:function(event){
					return event.skill!='liaolishiyan'&&event.skill!='liaolishiyan2';
				},
				content:function(){
					player.removeSkill('liaolishiyan3');
				}
			},
			momizhiyan:{
					usable:1,
					trigger: {
						player: 'useCardToBegin',
					},
					filter: function(event, player) {
					return (player.countCards('he')>0)&&event.targets&&event.targets.length>0;
					},
					content: function() {
					'step 0'
					player.chooseToDiscard('he','弃置一张牌',1,true);
					game.delayx();
					'step 1'
					event.multiTrue=false;
					if(result.bool){
						event.suit=get.suit(result.cards[0]);
						player.storage.momizhiyanGroup=trigger.targets;
						if(trigger.targets.length>1){
							event.multiTrue=true;
							player.chooseTarget(function(card,player,target){
									return player.storage.momizhiyanGroup.contains(target);
							},1,true);
							game.delayx();
						}
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.targets&&result.targets[0]){
						trigger.targets[0]=result.targets[0];
					}
					else if(result.multiTrue){
						trigger.targets[0]=player;
					}
					if(event.suit){
						switch (event.suit) {
							case 'spade':
								trigger.targets[0].loseHp(1);
								break
							case 'heart':
								player.recover();
								//trigger.targets[0].recover();
								break
							case 'diamond':
								trigger.targets[0].chooseCard('he','重铸一张牌',1,true);
								break
							case 'club':
								trigger.targets[0].discardPlayerCard(trigger.targets[0],1,'he',true);
								break
						}
					}
					delete player.storage.momizhiyanGroup;
					'step 3'
					if(event.suit=='diamond'&&result.cards){
						trigger.targets[0].lose(result.cards, ui.discardPile);
						trigger.targets[0].$throw(result.cards,1000);
						game.log(trigger.targets[0],'将',result.cards,'置入了弃牌堆');
						trigger.targets[0].draw();
					}
					event.finish()
					}
			},
			huxi1:{
				audio:4,
				enable:'phaseUse',
				position:'he',
				usable:1,
				filter:function(event,player){
					return player.countCards('h');
				},
				filterTarget:function(card,player,target){
					// if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(target)){
					//		return false;
					// }
					return player.inRange(target)&&player.countCards('h')&&target.countCards('h');
					},
				content:function(){
					"step 0"
					if(player.countCards('h')==0||target.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'想要呼吸',target);
					"step 1"
					player.chooseCard('###『呼吸』###请选择交换的牌',true).set('type','compare').set('ai',function(card){
						return 5-get.value(card);
					});
					"step 2"
					event.card1=result.cards[0];
					target.chooseCard('###『呼吸』###请选择交换的牌',true).set('type','compare');
					"step 3"
					event.card2=result.cards[0];
					if(!event.resultOL&&event.ol){
						game.pause();
					}
					"step 4"
					player.lose(event.card1,ui.ordering);
					target.lose(event.card2,ui.ordering);
					"step 5"
					game.broadcast(function(){
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(event.card1,target,event.card2);
					game.log(player,'的交换牌为',event.card1);
					game.log(target,'的交换牌为',event.card2);
					event.num1=event.card1.number;
					event.num2=event.card2.number;
					event.trigger('compare');
					game.delay(0,1500);
					"step 6"
					event.result={
						player:event.card1,
						target:event.card2,
						suit1:get.suit(event.card1),
						suit2:get.suit(event.card2)
					}
					var str;
					str=get.translation(player.name)+'想要呼吸'+get.translation(target.name);
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					"step 7"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
					player.gain(event.card2,'visible');
					player.$gain2(event.card2);
					game.delay(2);
					target.gain(event.card1,'visible');
					target.$gain2(event.card1);
					game.broadcastAll(function(){
						ui.arena.classList.remove('thrownhighlight');
					});
					game.addVideo('thrownhighlight2');
					if(event.clear!==false){
						game.broadcastAll(ui.clear);
					}
					if(typeof event.preserve=='function'){
						event.preserve=event.preserve(event.result);
					}
					"step 8"
					if(event.result.suit2=='heart'||event.result.suit2=='diamond'||event.result.suit1=='heart'||event.result.suit1=='diamond'){
						if(event.result.suit2=='heart'||event.result.suit2=='diamond'){
							player.draw(1);
							if(!player.hasSkill('huxi2')){
								player.addTempSkill('huxi2');
							}
						}
					}
					else{
						player.loseHp(1);
					}
					if(player.storage.huxiGroup==null) player.storage.huxiGroup=[];
					player.storage.huxiGroup.add(target);
				},
				ai:{
					order:6,
					result:{
						player:1,
						target:function(player,target){
							if(player.countCards('h',{name:'du'}))	return -2;
							return 0.5;
						}
					},
					threaten:0.8,
				},
				group:'huxi1_clear',
				subSkill:{
					clear:{
						firstDo:true,
						silent:true,
						direct:true,
						trigger:{
							player:['phaseAfter','phaseUseAfter']
						},
						content:function(){
							delete player.storage.huxiGroup;
						}
					}
				}
			},
			huxi2:{
				trigger:{
					player:['useCardBefore','phaseUseAfter']
				},
				firstDo:true,
				direct:true,
				content:function(){
					if(player.hasSkill('huxi2')){
						player.removeSkill('huxi2');
					}
				},
				mod:{
					cardUsable:function(card,player,num){
						return Infinity;
					},
					globalFrom:function(from,to,distance){
						return -1; //例子，进攻距离+1
					},
				}
			},
			lianmeng:{
					trigger:{
						player:'useCardAfter',
						source:'damageSource',
					},
					forced:true,
					filter:function(event,player){
						if(player.storage.huxiGroup==null){
							player.storage.huxiGroup=[];
						}
						if(event.target){
							if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(event.target)){
								return false;
							}
						}
						if(event.name=='useCard'){
							if(event.cards!=null&&get.subtype(event.cards[0])!='equip1'){
								return false;
							}
						}
						if(player.countCards('h')<1){
							return false;
						}
						if(game.hasPlayer(function(current){
							return player.inRange(current)&&!player.storage.huxiGroup.contains(current)&&current.countCards('h')>0;
						})){
							return true;
						}
						else
							return false
						},
					content:function(){
						'step 0'
						player.chooseTarget('对一名角色使用'+get.translation('huxi1'),{},true,function(card,player,target){
							if(player==target) return false;
							if(!player.inRange(target)) return false;
							if(target.countCards('h')<1){
								return false;
							}
							if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(target)){
								return false;
							}
							if(player.storage.huxiGroup.contains(target)) return false;
							if(game.hasPlayer(function(current){
								if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(current)){
									return false;
								}
								if(current.countCards('h')==0){
									return false;
								}
								if(current!=player&&get.distance(player,current)<get.distance(player,target)){
									return true;
								}
								else{
									return false;
								}
							})){
								return false;
							}
							return true;
						});
						'step 1'
						event.target=result.targets[0];
						if(player.countCards('h')==0||!event.target||event.target.countCards('h')==0){
							event.result={cancelled:true,bool:false}
							event.finish();
							return;
						}
						game.log(player,'想要呼吸',event.target);
						"step 2"
						player.chooseCard('请选择交换的牌',true).set('type','compare');
						"step 3"
						event.card1=result.cards[0];
						event.target.chooseCard('请选择交换的牌',true).set('type','compare');
						"step 4"
						event.card2=result.cards[0];
						if(!event.resultOL&&event.ol){
							game.pause();
						}
						"step 5"
						player.lose(event.card1,ui.ordering);
						event.target.lose(event.card2,ui.ordering);
						"step 6"
						game.broadcast(function(){
							ui.arena.classList.add('thrownhighlight');
						});
						ui.arena.classList.add('thrownhighlight');
						game.addVideo('thrownhighlight1');
						player.$compare(event.card1,event.target,event.card2);
						game.log(player,'的交换牌为',event.card1);
						game.log(event.target,'的交换牌为',event.card2);
						event.num1=event.card1.number;
						event.num2=event.card2.number;
						event.trigger('compare');
						game.delay(0,1500);
						"step 7"
						event.result={
							player:event.card1,
							target:event.card2,
							suit1:get.suit(event.card1),
							suit2:get.suit(event.card2)
						}
						var str;
						str=get.translation(player.name)+'想要呼吸'+get.translation(event.target.name);
						game.broadcastAll(function(str){
							var dialog=ui.create.dialog(str);
							dialog.classList.add('center');
							setTimeout(function(){
								dialog.close();
							},1000);
						},str);
						game.delay(2);
						"step 8"
						if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
							event.target.ai.shown+=0.1;
						}
						player.gain(event.card2,'visible');
						player.$gain2(event.card2);
						game.delay(2);
						event.target.gain(event.card1,'visible');
						event.target.$gain2(event.card1);
						game.broadcastAll(function(){
							ui.arena.classList.remove('thrownhighlight');
						});
						game.addVideo('thrownhighlight2');
						if(event.clear!==false){
							game.broadcastAll(ui.clear);
						}
						if(typeof event.preserve=='function'){
							event.preserve=event.preserve(event.result);
						}
						"step 9"
						if(event.result.suit2=='heart'||event.result.suit2=='diamond'||event.result.suit1=='heart'||event.result.suit1=='diamond'){
							if(event.result.suit2=='heart'||event.result.suit2=='diamond'){
								player.draw(1);
								if(!player.hasSkill('huxi2')){
									player.addTempSkill('huxi2');
								}
							}
						}
						else{
							player.loseHp(1);
						}
						if(player.storage.huxiGroup==null) player.storage.huxiGroup=[];
							player.storage.huxiGroup.add(event.target);
						},
					group:'lianmeng_difang',
					subSkill:{
						difang:{
							trigger:{
								player:['gainAfter']
							},
							firstDo:true,
							direct:true,
							filter:function(event,player){
								if(player==_status.currentPhase) return false;
								return event.source&&player!=event.source;
							},
							content:function(){
								player.discard(player.getEquip(2));
							}
						}
					}
				},
				gaonengzhanxie:{
						priority:15,
						firstDo:true,
					mod:{
						cardUsable:function(card,player,num){
							if(card.name=='sha'){
								return num+player.countCards('e');
							} 
						},
						cardEnabled:function(card,player){
							if(card.name=='sha'&&(player.getStat().card.sha>player.countCards('e'))) 
								return false
						}
						},
						group:['gaonengzhanxie_draw'],
						subSkill:{
						draw:{
							trigger:{
								player:'useCardAfter'
							},
							firstDo:true,
							direct:true,
							filter:function(event,player){
								if(event.card.name=='sha') return true;
								else return false;
							},
							content:function(){
								'step 0'
								player.draw(player.getStat().card.sha);
								'step 1'
								if(player.getCardUsable({name:'sha'})!==0&&lib.filter.cardEnabled({name:'sha'},player)){
									player.chooseToDiscard('he','弃置'+player.getStat().card.sha.toString()+'张牌',player.getStat().card.sha,true)
								}
							}
					}
					}
			},
			ranyouxielou:{
				forced:true,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					if(event.nature!=null) return true;
					return false;
				},
				content:function(){
					'step 0'
					if(trigger.source){
						var list = [
							'令'+get.translation(player)+'回复'+trigger.num+'点生命',
							'将'+get.translation(trigger.cards)+'交给'+get.translation(player),
						];
						if(!trigger.cards||trigger.cards.length==0)	list.pop();
						trigger.source.chooseControl(true).set('choiceList',list)
					}
					else{
						player.recover(trigger.num,trigger.source);
						event.finish();
					}
					'step 1'
					if(result.index==0){
						player.recover(trigger.num,trigger.source);
						trigger.cancel();
					}
					else{
						if(trigger.cards){
							player.gain(trigger.cards,'gain2',trigger.source)
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='tiesuo') return 0;
							if(get.tag(card,'natureDamage')) return 0;
						}
					},
				},
				group:'ranyouxielou_fire',
				subSkill:{
					fire:{
						trigger:{global:'damageBegin3'},
						forced:true,
						filter:function(event,player){
							if(event.player==player) return false;
							if(event.player&&player.inRange(event.player)&&event.nature=='fire') {
								if(player.countCards('h')>=player.getHandcardLimit())
								return true;
							}//
							return false;
						},
						content:function(){
							player.chooseToDiscard('he','弃置一张牌，使该伤害+1',true,1);
							trigger.num++;
							//player.recover();
						}
					}
				}
			},
			baihuqingguo:{
				trigger:{global:'phaseBegin'},
				//frequent:true,
				filter:function(event,player){
				return event.player!=player&&player.countCards('he')>0;
				},
				content:function(){
				'step 0'
				player.chooseToDiscard(1,'弃置一张牌');
				'step 1'
				if(result.bool){
					player.addTempSkill('baihuqingguo_chaofeng');
					trigger.player.addTempSkill('baihuqingguo_meihuo');
				}
				else{
					event.finish();
				}
				},
				subSkill:{
				chaofeng:{
					mark:true,
					markText:'狐',
					intro:{
						name:'狐',
						content:'你只能摸这只🦊'
					},
				},
				meihuo:{
					mark:true,
					markText:'魅',
					intro:{
						name:'魅',
						content:'你只能摸那只🦊'
					},
					mod:{
						playerEnabled:function(card,player,target){
							if(target==player||target.hasSkill('baihuqingguo_chaofeng')){
								return true;
							}
							else{
								return false;
							}
						}
					}
				}
				}
			},
			huyanluanyu:{
					trigger:{
					player:'damage'
					},
					content:function(){
						'step 0'
						event.index=0;
						event.damageNum=trigger.num;
						event.nowHand=player.countCards('h');
						event.getPlayers=game.filterPlayer(function(current){
							if(current.countCards('h')>event.nowHand){
								return true;
							}
						});
						event.givePlayers=game.filterPlayer(function(current){
							if(current.countCards('h')<event.nowHand){
								return true;
							}
						});
						'step 1'
						if(event.index<event.getPlayers.length){
							if(event.getPlayers[event.index].countCards('he')>0){
								event.getPlayers[event.index].chooseCard(1,'he','交给'+get.translation(player)+'一张牌',true);
							}
						}
						else{
							event.index=0;
							event.goto(3);
						}
						'step 2'
						player.gain(result.cards);
						game.delayx();
						event.index+=1;
						event.goto(1);
						'step 3'
						if(event.index<event.givePlayers.length){
							if(player.countCards('he')>0){
								player.chooseCard(1,'he','交给'+get.translation(event.givePlayers[event.index])+'一张牌',true);
							}
						}
						else{
							event.goto(5);
						}
					'step 4'
					event.givePlayers[event.index].gain(result.cards);
					game.delayx();
					event.index+=1;
					event.goto(3);
					'step 5'
					event.finish();
					}
			},
			yuanlv:{
				audio:6,
				trigger:{global:'phaseEnd'},
				priority:2,
				filter:function(event,player){
					if(player.hasSkill('yuanlv_tag')){
						return true;
					}
					else
						return false;
					},
					content:function(){
					'step 0'
					player.draw(player.maxHp);
					'step 1'
					player.chooseCard(player.hp,'he','###『远虑』###选择放置到牌堆顶部的牌',true);
					'step 2'
					if(result.bool==true&&result.cards!=null){
						event.cards=result.cards
					}
					if(event.cards.length>0){
						//player.$throw(cards,1000);
						//player.lose(event.cards,ui.special,'visible');
						player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
							var value=get.value(button.link);
							if(_status.event.reverse) return value;
							return -value;
						}).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
					}
					"step 3"
					if(result.bool&&result.links&&result.links.length)	event.linkcards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 4'
					var cards=event.linkcards;
					//player.$throw(cards,1000);,'visible'
					//game.log(player,'将',cards,'置于牌堆顶');
					player.lose(cards,ui.special);
					'step 5'
					game.delay();
					'step 6'
					var cards=event.linkcards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				group:['yuanlv_ready'],
				subSkill:{
					ready:{
						trigger:{player:['damageAfter','loseHpAfter','useCardAfter']},
						priority:2,
						direct:true,
						filter:function(event,player,name){
							if(name=='useCardAfter'){
								var indexi=0
								while(indexi<event.cards.length){
									if(get.type(event.cards[indexi])=='trick'||get.type(event.cards[indexi])=='delay')
										return true;
									indexi++;
								}
								return false;
							}
							else 
								return true;
						},
						content:function(){
							if(trigger.name=='useCard'){
								if(!player.hasSkill('yuanlv_tag')&&!player.hasSkill('yuanlv_trickUsed')){
									player.addTempSkill('yuanlv_tag');
									player.addTempSkill('yuanlv_trickUsed','roundStart');
								}
							}
							else{
								if(!player.hasSkill('yuanlv_tag')&&!player.hasSkill('yuanlv_damaged')){
									player.addTempSkill('yuanlv_tag');
									player.addTempSkill('yuanlv_damaged','roundStart');
								}
							}
						}
					},
					tag:{
						mark:true,
						markText:'虑',
						intro:{
							content:function(){
								return '结束时触发技能'+get.translation('yuanlv')
							}
						}
					},
					damaged:{
						mark:true,
						markText:'伤',
						intro:{
							content:function(){
								return '本轮已经通过失去体力触发'+get.translation('yuanlv')
							}
						}
					},
					trickUsed:{
						mark:true,
						markText:'锦',
						intro:{
							content:function(){
								return '本轮已经通过使用锦囊触发'+get.translation('yuanlv')
							}
						}
					}
				},
				ai:{
					threaten:0.6,
				}
			},
			jinyuan:{
				audio:4,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					'step 0'
					player.viewHandcards(target);
					game.delayx();
					'step 1'
					event.nowHandCards=target.getCards('h');
					player.chooseCard('he',true,'###『近援』###选择给予的牌').set('ai',function(card){
						return 5-get.value(card);
					});
					'step 2'
					event.cardUsable=true;
					console.log(event.card,result.card)
					event.card=result.cards[0];
					if(event.nowHandCards.length>0)
					event.nowHandCards.forEach(element => {
						if(get.suit(element)==get.suit(result.cards[0])){
							event.cardUsable=false;
						}
					});
					if(event.cardUsable){
						var bool=game.hasPlayer(function(current){
							return target.canUse(result.cards[0],current);
						});
						if(!bool){
							event.cardUsable=false;
						}
					}
					'step 3'
					target.gain(event.card,player,'give');
					if(event.cardUsable){
						target.chooseUseTarget(event.card,'可选择一个目标直接使用该牌');
					}
				},
				ai:{
					order:6,
					result:{
						target:1,
					},
				},
			},
			zhongjian:{
				audio:true,
				unique:true,
				group:['zhongjian1'],
				zhuSkill:true,
			},
			zhongjian1:{
				audio:'zhongjian',
				zhuSkill:true,
				trigger:{global:'useCard2'},
				//enable:'chooseToUse',
				//popup:false,
					//forced:false,
				//selectCard:0,
					// viewAs:function(cards,player){
				// 	var name=false;
				// 	var nature=null;
				// 	name='wuxie';
				// 	if(name) return {name:name,nature:nature,isCard:true};
				// 	return null;
				// },
				// ignoreMod:true,
				// filterCard:function(card,player,event){
				// 	if(!player.hasZhuSkill('zhongjian')) return false;
				//	if(player.hasSkill('zhongjian1_tag')) return false;
				// 	event=event||_status.event;
				// 	var filter=event._backup.filterCard;
				// 	if(filter({name:'wuxie'},player,event)) return true;
				// 	return false;
				// },
				filter:function(event,player){
					if(!player.hasZhuSkill('zhongjian')) return false;
					//var filter=event.filterCard;
					if(player.hasSkill('zhongjian1_tag')) return false;
					if(get.type(event.card)!=='trick') return false;
					//if(!filter({name:'wuxie'},player,event)) return false;
					// var time=player.chooseTarget('命令一名杏势力角色将一张牌视为无懈可击',{},true,function(card,player,target){
					//	return target.group=='holo'
					// });
					// console.log(time);
					return true;
					},
					content:function(){
					"step 0"
					if(player.hasSkill('zhongjian1_tag')){
						event.finish()
					}
					else
					player.chooseTarget('###『中坚』###命令一名其他杏势力角色本回合一张手牌视为无懈可击',{},function(card,player,target){
						return player!=target&&target.group=='holo'&&target.countCards('h')>0
					});
					"step 1"
					if(result.bool){
						event.dropTarget=result.targets[0];
						player.choosePlayerCard(result.targets[0],1,'h',true)
						//var dropcards=event.dropTarget.getCards('h')
					}
					else{
						event.finish()
					}
					"step 2"
					if(result.bool){
						player.addTempSkill('zhongjian1_tag','roundStart');
						event.dropTarget.storage.changeWuxie=result.links[0];
						//event.dropTarget.chooseCard('he',1,true);
						event.dropTarget.addTempSkill('zhongjian1_zhuanhua');
					}
					else{
						event.finish()
				}
					// event.dropTarget.$throw(result.cards);
					// event.dropTarget.lose(result.cards,ui.discardPile);
					//console.log(event.getParent().getParent().getParent());
					// event.cards=result.cards
					// "step 3"
					//event.getParent().getParent().state=!event.getParent().getParent().state;
					// console.log(event.getParent().getParent());
					// event.getParent().getParent().goto(0);
					// event.dropTarget.useCard(event.cards,{name:'wuxie',isCard:false});
					//player.removeSkill('zhongjian','roundStart');
					},
				// hiddenCard:function(player,name){
				// 	return name=='wuxie'&&!player.hasSkill('zhongjian1_tag')&&player.hasZhuSkill('zhongjian');
					// },
					subSkill:{
						tag:{
							mark:true,
							intro:{
								content:function(){
									return '一轮后可以再次使用'+get.translation('zhongjian')
								}
							},
						},
						zhuanhua:{
							mark:true,
							intro:{
								content:function(){
									return '一张手牌视为【无懈可击】'
								}
							},
							onremove:function(player){
								player.storage.changeWuxie=null;
							},
							mod:{
								cardname:function(card,player){
									if(card==player.storage.changeWuxie)
									return 'wuxie';
								},
							},
					}
					}
			},
			meiwu:{
				// popup: false,
				direct:true,
				trigger:{
					target: 'useCardToTarget',
				},
				usable:1,
				filter:function(event,player){
					return get.color(event.card) == 'black' && event.targets.length == 1&&game.hasPlayer(function(cur){
						return cur != player && cur != event.player;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget('###『魅舞』###转移给一名其它角色',function(card,player,target){
						return player != target && target != _status.event.tplayer;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,_status.event.card,_status.event.tplayer,player)-0.5;
					}).set('tplayer',trigger.player).set('card',trigger.card);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name, target);
						var evt = trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
						player.storage.meiwu_trace = {
							cardid: trigger.card.cardid,
							target: target,
						};
					}
				},
				group:['meiwu_trace'],
				subSkill:{
					trace: {
						direct: true,
						trigger: {
							global: 'useCardAfter',
						},
						filter: function(event, player) {
							if (!player.storage.meiwu_trace) return false;
							return player.storage.meiwu_trace.cardid == event.card.cardid &&
								(event.result.bool == false || event.result.wuxied);
						},
						content: function() {
							'step 0'
							player.chooseCard(true, 'he', "交给其一张牌");
							'step 1'
							if (result.bool && result.cards.length) {
								var target = player.storage.meiwu_trace.target;
								player.$giveAuto(result.cards, target);
								target.gain(result.cards, player);
							}
						}
					},
				}
			},
			huichu:{
				trigger:{
					global:'phaseBegin',
				},
				filter:function(event,player){
					return player.countCards('h')
						&& !game.hasPlayer(function(cur) {
							return cur.hp < event.player.hp;
						});
				},
				check:function(event,player){
					if(player.countCards('h') == player.countCards('h', {suit: 'heart'}))	return get.recoverEffect(event.player,player,player);
					return 1;
				},
				content:function(){
					'step 0'
					player.showHandcards();
					event.chk = player.countCards('h') == player.countCards('h', {suit: 'heart'});
					'step 1'
					if(event.chk){
						trigger.player.recover();
					}
					'step 2'
					if (!event.chk) {
						player.chooseCard("###『慧厨』###重铸任意张手牌", 'h', [1, Infinity]).set('ai',function(card2){
							return 6.5-get.value(card);
						});
					}
					'step 3'
					if (!event.chk && result.bool && result.cards.length) {
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards,1000);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw(result.cards.length);
					}
				}
			},

			haodu:{
				enable: 'phaseUse',
				filterCard: true,
				selectCard: [1, Infinity],
				position: 'h',
				selectTarget: 1,
				discard:false,
				lose:false,
				filter: function(event, player) {
					return player.countCards('h') && !player.hasSkill('haodu_lose')
						&& (!player.getStat('skill').haodu)||((player.getStat('skill').haodu||0) < player.maxHp - player.hp);
				},
				filterTarget: function(card, player, target) {
					return player != target;
				},
				check:function(card){
					if(ui.selected.cards.length) return 0;
					return (get.type(card)!='basic'?(6-get.value(card)):7-get.value(card));
				},
				complexCard:true,
				content: function() {
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					event.videoId = lib.status.videoId++;
					var typelist = [
							['基本','','sha', 'basic', 'div1'], 
							['锦囊', '', 'wuzhong', 'trick', 'delay', 'div1'], 
							['装备', '', 'renwang', 'equip', 'div1']
						];
					var suitlist = [
							['heart', '', 'heart', 'heart', 'div2'],
							['diamond', '', 'diamond', 'diamond', 'div2'],
							['club', '', 'club', 'club', 'div2'],
							['spade', '', 'spade', 'spade', 'div2']
						];
					var numberlist = [];
					for (var i = 1; i <= 13; ++i) {
						var c = i;
						if (i == 1) c = 'A';
						else if (i == 10) c = 'X'
						else if (i == 11) c = 'J';
						else if (i == 12) c = 'Q';
						else if (i == 13) c = 'K';
						else c = i;
						numberlist.push(['', i, c, i, 'div3']);
					}
					game.broadcastAll(function(id, typelist, suitlist, numberlist){
						var dialog=ui.create.dialog('『豪赌』 选择');
						dialog.addText('类型');
						dialog.add([typelist, 'vcard']);
						dialog.addText('花色');
						dialog.add([suitlist, 'vcard']);
						dialog.addText('点数');
						dialog.add([numberlist, 'vcard']);
						dialog.videoId = id;
					}, event.videoId, typelist, suitlist, numberlist);
					'step 2'
					var next = player.chooseButton(3 ,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button) {
						for(var i = 0;i < ui.selected.buttons.length; i++){
							var now = button.link, pre = ui.selected.buttons[i].link;
							if (now[now.length - 1] == pre[pre.length - 1]) return false;
						}
						return true;
					});
					next.set('filterButton',function(button) {
						var card = _status.event.card;
						var now = button.link;
						if([get.type(card,'trick'),get.suit(card),get.number(card)].contains(now[3]))	return true;
						return 0;
					});
					next.set('card',cards[0]);
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if (result.bool) {
						event.chi = [];
						result.links.forEach(function(card) {
							for (var i = 3; i < card.length - 1; ++i) event.chi.push(card[i]);
						})
					}
					else event.finish();
					'step 4'
					player.choosePlayerCard(target, 'h', true);
					'step 5'
					if (result.bool) {
						event.card = result.links[0];
						var str = "『豪赌』展示<br>";
						game.log(player,'选择了',event.chi);
						if (event.chi.contains(get.number(event.card))) str += "你与其交换手牌<br>";
						if (event.chi.contains(get.type(event.card,'trick'))) str += "你弃置其两张牌<br>";
						if (event.chi.contains(get.suit(event.card))) str += "你获得其一张牌<br>";
						player.showCards(event.card, str);
						game.delay(2);
					}
					else event.finish();
					'step 6'
					if (event.chi.contains(get.number(event.card))) {
						player.line(target, 'grean');
						player.swapHandcards(target);
					}
					'step 7'
					if (event.chi.contains(get.type(event.card))) {
						game.delayx();
						if (target.countDiscardableCards(player, 'he')) {
							player.line(target, 'grean');
							target.discardPlayerCard("弃置两张牌", target, 2, 'he', true);
						}
					}
					'step 8'
					if (event.chi.contains(get.suit(event.card))) {
						game.delayx();
						if(target.countGainableCards(player, 'he')){
							player.line(target, 'grean');
							player.gainPlayerCard("获得其一张牌", 'he', target, true);
						}
					}
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							return 2.5+(target.countCards('h')/2)-player.countCards('h');
						},
						target:function(player,target){
							if(player.countCards('h')<=target.countCards('h')||target.countCards('h')<=target.countCards('e'))	return -1;
							return 0;
						}
					}
				},
				subSkill: {
					lose: {},
				}
			},
			yong: {
				init: function(player) {
					if (!player.storage.yong) {
						player.storage.yong = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '咏',
				intro: {
					content: 'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							storage.length=0;
						}
					},
				}
			},
			yemuxingyong: {
				group: ['yong', 'yemuxingyong_gain', 'yemuxingyong_use'],
				subSkill: {
					gain: {
						round: 1,
						trigger: {
							global: 'phaseDiscardAfter',
						},
						filter: function(event, player) {
							if(event.player.isIn()){
								var find = false;
								event.player.getHistory('lose',function(evt){
									return evt.type=='discard'&&evt.getParent('phaseDiscard')==event&&evt.hs.filterInD('d').length>0;
								}).forEach(function(arr) {
									if (arr.cards != undefined) arr.cards.forEach(function(c) {
										find = true;
									})
								});
								return find;
							}
							return false;
						},
						check: function(event, player) {
							return true;
						},
						content: function() {
							"step 0"
							var cards=[];
							game.getGlobalHistory('cardMove',function(evt){
								if(evt.name=='cardsDiscard'&&evt.getParent('phaseDiscard')==trigger) cards.addArray(evt.cards.filterInD('d'));
							});
							game.countPlayer2(function(current){
								current.getHistory('lose',function(evt){
									if(evt.type!='discard'||evt.getParent('phaseDiscard')!=trigger) return;
									cards.addArray(evt.cards.filterInD('d'));
								})
							});
							event.cards = cards;
							if (event.cards.length) {
								game.cardsGotoSpecial(event.cards);
							}
							else {
								event.finish();
							}
							'step 1'
							player.storage.yong = player.storage.yong.concat(event.cards);
							player.showCards(player.storage.yong,'夜幕星咏');
							player.syncStorage('yong');
							player.markSkill('yong');
							"step 2"
							event.players=game.filterPlayer(function(current){
								return current!=player && current.countCards('he') > 0;
							});
							event.players.sortBySeat(player);
							"step 3"
							if(event.players.length){
								event.current=event.players.shift();
								event.current.animate('target');
								player.line(event.current,'green');
								if (event.current.countCards('he') && player.isAlive()) {
									event.current.chooseCard({color:'black'},'he', 
									'可将一张黑色牌置于' + get.translation(player)+ '武将牌上').set('ai',function(card){
										if(get.attitude(_status.event.player,_status.event.target) > 1) return 7-get.value(card);
										return -1;
									}).set('target', player);;
								}
							}
							else{
								player.showCards(player.storage.yong, "咏");
								game.delayx();
								event.finish();
							}
							"step 4"
							if (result.bool) {
								var card = result.cards[0];
								event.current.lose(card, ui.special, 'toStorage');
								player.storage.yong.push(card);
								event.current.$give(card, player, false);
								player.syncStorage('yong');
								player.markSkill('yong');
							}
							event.goto(3);
						},
					},
					use: {
						enable: 'phaseUse',
						filter: function(event, player) {
							if (!player.storage.yong.length) {
								return false;
							}
							return true;
						},
						content: function() {
							'step 0'
							player.chooseButton(['选择一张咏', player.storage.yong], 1);
							'step 1'
							if (result.bool) {
								var card = result.links[0];
								player.gain(result.links, 'fromStorage');
								player.storage.yong.remove(card);
								player.syncStorage('yong');
								player.markSkill('yong');
								player.$give(card, player, false);
								if (!player.storage.yong.length) {
									player.unmarkSkill('yong');
								}
							}
							else event.finish();
							'step 2'
							var chk = player.countCards('h') >= 2;
							if(chk){
								chk &= lib.filter.cardUsable({name:'jiu'},player, 
										event.getParent('chooseToUse'))
										&& player.canUse('jiu', player);
								game.players.forEach(function(p) {
									if (p != player && player.canUse('guohe', p)) chk = true; 
								})
								if (!chk) event.finish();
							}
							else{
								event.finish();
							}
							'step 3'
							player.chooseCardTarget({
								prompt: "选择两张手牌并对自己使用一张酒或对其它角色使用一张过河拆桥",
								position: 'h',
								selectCard: 2, 
								forced: true,
								filterTarget: function(card, player, target) {
									if (player == target) {
										return lib.filter.cardUsable({name:'jiu'},player, _status.event.getParent('chooseToUse'))
											&& player.canUse('jiu', player);
									}
									else {
										return player.canUse('guohe', target);
									}
								},
								ai1:function(card){
									return 6-get.value(card);
								},
								ai2:function(target){
									if(target!=player)	return get.effect(target,{name:'guohe'},player,player)-Math.random();
									return get.effect(player,{name:'jiu'},player,player)-Math.random()*3;
								},
							})
							'step 4'
							if (result.bool && result.targets.length && result.cards.length) {
								var tar = result.targets[0];
								if (tar == player) player.useCard({name: 'jiu'}, tar, result.cards);
								else player.useCard({name: 'guohe'}, tar, result.cards);
							}
						},
						ai:{
							order:9,
							result:{player:1}
						},
					},
				}
			},
			xinghejianduei: {
				skillAnimation:true,
				animationColor:'thunder',
				juexingji:true,
				unique:true,
				trigger:{
					global: 'roundStart'
				},
				filter:function(event,player){
					return !player.storage.xinghejianduei && player.hp <= game.roundNumber;
				},
				forced:true,
				content: function() {
					player.loseMaxHp();
					player.draw(event.num=game.countPlayer());
					// player.draw(10 - player.countCards('h'));
					player.addSkill('xinghejianduei_juexing');
					player.awakenSkill(event.name);
					player.storage[event.name]=true;
				},
				subSkill: {
					juexing: {
						mod: {
							maxHandcardBase:function(player,num){
								return num + player.storage.yong.length;
							},
							attackFrom:function(from,to,distance){
								return distance-from.storage.yong.length;
							},
						}
					}
				}
			},
			
			//夸
			kuali:{
				group:['kuali_zhuDong','kuali_jieshu'],
				subSkill:{
					zhuDong:{
						enable:"phaseUse",
						filter:function(event,player){
							if(player.hasSkill('kuali_used'))	return false;
							return game.hasPlayer(function(cur){
								return (cur.countCards('h')%player.countCards('h')==0)
								||(cur.hp%player.hp==0);
							});
						},
						content:function(){
							'step 0'
							var choice = 1;
							if(player.hp==1&&game.hasPlayer(function(cur){
								return cur.countCards('h')%player.countCards('h')==0&&cur!=player;
							}))	choice = 0;
							player.addTempSkill('kuali_used');
							player.chooseControlList(
								['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
								'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
								function(event,player){
									return _status.event.choice;
								}).set('choice',choice).set('prompt',get.prompt2('kuali_zhuDong'));
							'step 1'
							if(result.index==0){
								player.chooseTarget('###『夸力满满』###选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
									if(target==player) 				return false;
									return target.countCards('h')%player.countCards('h')==0;
								}).set('ai',function(target){
									var player = _status.event.player;
									return ui.selected.targets.length<(player.maxHp-player.hp);
								})						
							}
							if(result.index==1){
								var num = game.countPlayer(function(cur){
									return cur.hp%player.hp==0&&cur!=player;
								});
								player.draw(num);
								player.loseHp();
								_status.event.finish();
							}
							'step 2'
							if(result.bool&&result.targets.length)
							{
								var num = result.targets.length;
								player.chooseToDiscard(num,'弃置'+get.cnNumber(num)+'张牌并回复'+get.cnNumber(num)+'体力',true,'he');
								player.recover(num);
							}
						},
					},
					ai:{
						order:function(item,player){
							if(player.hp==1&&game.hasPlayer(function(cur){
								return cur.countCards('h')%player.countCards('h')==0&&cur!=player;
							}))	return 2;
							if(!player.needsToDiscard()&&game.countPlayer(function(cur){
								return cur.hp%player.hp==0&&cur!=player;
							})>2)	return 8;
							return 0;
						},
						result:{player:1}
					},
					jieshu:{
						trigger:{player:'phaseJieshuBegin'},
						priority:40,
						direct: true,
						filter:function(event,player){
							if(player.hasSkill('kuali_used'))	return false;
							return game.hasPlayer(function(cur){
								return (cur.countCards('h')%player.countCards('h')==0)
								||(cur.hp%player.hp==0);
							});
						},
						content:function(){
							'step 0'
							var choice = function(){
								if(player.hp==1&&game.hasPlayer(function(cur){
									return cur.countCards('h')%player.countCards('h')==0&&cur!=player;
								}))	return 0;
								if(game.countPlayer(function(cur){
									return cur.hp%player.hp==0&&cur!=player;
								})>1)	return 1;
								return -1;
							}
							player.addTempSkill('kuali_used');
							player.chooseControlList(
								['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
								'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
								function(event,player){
									return _status.event.choice;
								}).set('choice',choice).set('prompt',get.prompt2('kuali_jieshu'));
							'step 1'
							if(result.index==0){
								player.logSkill('kuali');
								player.chooseTarget('###『夸力满满』###选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
									if(target==player) 				return false;
									return target.countCards('h')%player.countCards('h')==0;
								}).set('ai',function(target){
									var player = _status.event.player;
									return ui.selected.targets.length<(player.maxHp-player.hp);
								})						
							}
							if(result.index==1){
								player.logSkill('kuali');
								var num = game.countPlayer(function(cur){
									return cur.hp%player.hp==0&&cur!=player;
								});
								player.draw(num);
								player.loseHp();
								_status.event.finish();
							}
							'step 2'
							if(result.bool&&result.targets.length)
							{
								var num = result.targets.length;
								player.chooseToDiscard(num,'弃置'+get.cnNumber(num)+'张牌并回复'+get.cnNumber(num)+'体力',true,'he');
								player.recover(num);
							}
						},
					},
					used:{},
				},
			},
			youyi:{
				trigger:{
					global: 'phaseBegin'
				},
				round:1,
				priority:80,
				direct: true,
				filter:function(event, player){	
					return event.player!=player&&player.countCards('he');
				},
				content:function(){
					'step 0'
					var next=player.chooseCard(get.prompt2('youyi'),'he');
					next.set('ai',function(card){
						if(get.name(card)=='shan') return 90;
						return 80-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('youyi');
						player.showCards(result.cards);
					}
					'step 2'
					if(result.cards){
						var target = trigger.player;
						player.$giveAuto(result.cards,target);
						target.gain(result.cards,player,'gain2').gaintag.add('youyishiyue');
						player.storage.youyi = result.cards[0];
						target.storage.youyishiyue = result.cards[0];
						target.addTempSkill('youyishiyue','phaseAfter');
					}
				},
				group:['youyi_dam'],
				subSkill:{				
					dam:{
						trigger:{global:'damageBegin'},
						priority:80,
						check:function(event,player){
							return 1-get.damageEffect(event.player,event.source,player);
						},	
						filter:function(event,player){
							if(!event.source||!event.source.hasSkill('youyishiyue'))	return false;
							var shi = event.source.storage.youyishiyue;
							shi = player.storage.youyi||shi;
							return event.source.countGainableCards(player,'hej',function(card){
								return card==shi;
							});
						},
						prompt:'是否收回“誓约”牌？',
						content:function(){
							trigger.changeToZero();
							player.line(trigger.source,'thunder');
							trigger.source.$giveAuto(result.cards,player);
							player.gain(player.storage.youyi,trigger.source);
						}
					},
				},
			},
			youyishiyue:{
				onremove:function(player){
					player.removeGaintag('youyishiyue');
				},
				intro:{
					name:'誓约牌',
					content:'当前的“誓约”牌为$当你造成伤害时，湊阿库娅可令你将“誓约”牌交给她以防止之。 \n 本回合结束时，你可以弃置“誓约”牌令你或其回复1点体力。',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							game.log(storage,'誓约解除');
							delete player.storage.youyishiyue;
						}
					},
				},
				locked:true,
				mark:'card',
				group:['youyishiyue_rec'],
				subSkill:{
					//弃“誓约”牌回复
					rec:{
						trigger:{player:'phaseEnd'},
						direct:true,
						priority:80,
						filter:function(event,player){
							var shi,damaged = player.isDamaged();
							game.hasPlayer(function(cur){
								if(cur.hasSkill('youyi')){
									if(cur.isDamaged())	damaged = true;
									shi=cur.storage.youyi;
									return true;
								}
								else{
									return false;
								}
							});
							shi = player.storage.youyishiyue||shi;
							return damaged&&player.countDiscardableCards(player,'hej',function(card){
								return card==shi;
							});
						},
						content:function(){
							'step 0'
							game.broadcastAll(function(player){
								var shi;
								var aqua;
								game.hasPlayer(function(cur){
									if(cur.hasSkill('youyi')){
										aqua = cur
										shi = cur.storage.youyi;
									}
								});
								event.card = player.storage.youyishiyue||shi;
								player.chooseTarget('让你或她回复一点体力',1,function(card,player,target){
									return [player,aqua].contains(target)&&target.isDamaged();
								}).set('ai',function(target){
									return get.recoverEffect(target,player,player)+Math.random();
								});
							}, player);
							'step 1'
							if(result.bool){
								event.target = result.targets[0];
								player.discard(event.card);
								player.logSkill('youyishiyue',event.target);
								event.target.recover(player);
							}
						},
					},
			
			
				},
			},
			//兔宝
			pekoyu:{
				init:function(player){
					player.storage.pekoyu=[];
				},
				marktext:"peko",
				intro:{
					name:'嚣张咚鼓',
					content:function (storage,player,skill){
						if(storage.length){
							return '本回合已通过花色为'+ get.translation(storage) +'的牌发动了技能';
						}
						else{
							return '本回合尚未发动技能';
						}
					},
				},
				trigger:{player:'useCardAfter'},
				forced:false,
				priority:111,
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					if(!(get.type(event.card) =='basic'||get.type(event.card)=='trick'))	return false;
					if(event.result.bool == false || event.result.wuxied)					return false;
					if(!player.storage.pekoyu.length)										return true;
					for(var i=0;i<player.storage.pekoyu.length;i++){
						if(get.suit(event.card)==player.storage.pekoyu[i])					return false
					}
					return !(event.result.bool == false || event.result.wuxied);			
				},
				content: function() {
					'step 0'
					player.storage.pekoyu.add(get.suit(trigger.card));
					player.draw(),
					player.chooseToDiscard('###『嚣张咚鼓』###然后，弃置一张牌','h',true).set('ai',function(card){
						var name = card.name;
						if(name=='jiu') 			return 12;
						if(get.type(card)=='trick')	return 4;
						return 10-get.value(card);													
					});
					'step 1'
					if(result.cards){
						if(get.name(result.cards[0],'player')=='jiu'||
							(player.hasSkill('hongshaoturou_viewAs')&&(result.cards[0].name=='shan'||result.cards[0].name=='tao')))
						player.chooseTarget('###『嚣张咚鼓』###选择一名角色，令其摸两张牌').set('ai',function(target){
							var player=_status.event.player;
							if(player.countCards('h')<player.getHandcardLimit())	return target==player;
							return get.attitude(player,target)*(target.isDamaged()?2:1);
						});
					}
					'step 2'
					if(result.bool&&result.targets&&result.targets.length){
						var target = result.targets[0];
						player.line(target,'thunder');
						target.draw(2,player);
					}
				},
				group:['pekoyu_update', 'pekoyu_back'],
				subSkill:{
					update:{
						trigger:{player:'phaseBegin'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.markSkill('pekoyu');
						}
					},
					back:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('pekoyu');
							player.storage.pekoyu = [];
						}
					},
				},
			},
			hongshaoturou:{
				filter:function(event,player){
					return !player.isLinked();
				},
				enable:"phaseUse",
				usable:1,
				content:function(){
					player.link(true);
					player.addMark('hongshaoturou',1,false);
					player.addTempSkill('hongshaoturou_viewAs','phaseAfter');
					player.addTempSkill('hongshaoturou_shao','phaseAfter');
					var buff = '.player_buff';
					game.broadcastAll(function(player, buff){
						player.node.hongshaoturou= ui.create.div(buff ,player.node.avatar);
					}, player, buff);
				},
				onremove: function(player, skill) {
					player.removeSkill('hongshaoturou_shao');
				},
				subSkill:{
					viewAs:{
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
					shao:{
						trigger:{player:'phaseEnd'},
						marktext: '炎',
						mark: true,
						forced: true,
						intro: {
							content:'当前回合结束后受到一点火焰伤害',
							name:'自煲自足',
						},
						onremove:function(player, skill) {
							game.broadcastAll(function(player){
								if(player.node.hongshaoturou){
									player.node.hongshaoturou.delete();
									delete player.node.hongshaoturou;
								}
							}, player);
						},
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.damage('fire');
							player.removeSkill('hongshaoturou_shao');	
						}
					},
				}
			},
			//Civia
			kuangxin:{
				trigger:{global:'useCardToPlayered'},
				usable:1,
				filter:function(event,player){
					if(event.targets.length!=1)		return false;
					if(event.targets[0]==player)	return false;
					return get.tag(event.card,'damage')&&event.targets[0].countCards('h')&&player.countCards('h');
				},
				content:function(){
					'step 0'
					event.target = trigger.targets[0];
					event.target.chooseCard('h',true).set('visible', true).set('prompt',get.translation('kuangxin')+'：选择一张牌与对方交换');
					'step 1'
					if(result.bool){
						event.card = result.cards[0];
						player.chooseCard('h',true).set('visible', true).set('prompt',get.translation('kuangxin')+'：选择一张牌与对方交换');
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						trigger.targets[0].gain(result.cards[0],player,'giveAuto');
						player.gain(event.card,trigger.targets[0],'giveAuto');
						trigger.targets[0].addTempSkill('kuangxin2','phaseEnd');
						trigger.targets[0].storage.kuangxin2.add(trigger.card);
						trigger.targets[0].storage.kuangxin2.add(player);
						trigger.targets[0].syncStorage('kuangxin2');
						player.storage.kuangxin_draw.add(trigger.card);
						player.storage.kuangxin_draw.add(trigger.targets[0]);
					}
				},
				group:['kuangxin_draw','kuangxin_back'],
				subSkill:{
					draw:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						trigger:{global:'useCardAfter'},
						forced:true,
						priority:66,
						filter:function(event,player){
							if(!(player.storage.kuangxin_draw.contains(event.targets[0])&&player.storage.kuangxin_draw.contains(event.card)))	return false
							if(!event.targets[0].storage.kuangxin2)		return false;
							return event.targets[0].storage.kuangxin2.contains(player);
						},
						content:function(){
							'step 0'
							player.chooseTarget('『旷心』：令你或其摸一张牌').set('filterTarget',function(card,player,target){
								return target==player||target==player.storage.kuangxin_draw[1];
							})
							'step 1'
							if(result.bool&&result.targets&&result.targets[0]){
								result.targets[0].draw(player);
							}
						},
					},
					back:{
						trigger:{global:'phaseEnd'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.kuangxin_draw)
							player.storage.kuangxin_draw=[];
						},

					}
				},
			},
			kuangxin2:{
				firstDo:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage'],
				},
				filter:function(event,player){
					return player.storage.kuangxin2&&event.card&&player.storage.kuangxin2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:14,
				content:function(){
					player.removeSkill('kuangxin2');
				},
			},
			danyan:{
				trigger:{player:'loseEnd'},
				priority:22,
				frequent:true,
				filter:function(event,player){
					// if(game.hasPlayer(function(cur){
					// 	return	cur.getHistory('damage',function(evt){
					// 		return evt.source==player;
					// 	}).length>0
					// }))
					// {
					// 	return false;
					// }
					var num=0;
					player.getHistory('sourceDamage',function(evt){
						num+=evt.num;
					});
					if(num||!event.hs.length)	return false;
					var canG=0;
					event.hs.forEach(function(car){
						game.hasPlayer(function(cur){
							if(player.canUse(car,cur))	canG++;
						});;
					})
					return canG&&(event.name=='cardsDiscard'||(event.name=='lose'&&event.getParent().name=='discard'));
				},
				content:function(){
					'step 0'
					event.cards = trigger.hs;
					var next=player.chooseCardButton(1,'『弹言』：选择使用的牌',event.cards);
					next.set('filterButton',function(button){
						var player = _status.event.player;
						return game.hasPlayer(function(cur){
							return player.canUse(button.link,cur)
						});
					});;
					'step 1'
					if(result.bool){
						player.chooseUseTarget(result.links[0],true,'noanimate','nopopup');
					}

				},
			},
			qingjie:{
				mod:{
					globalFrom:function(from,to,distance){
						if(distance>1&&!(to.getEquip(3)||to.getEquip(4)))	return 1;
					},
					globalTo:function(from,to,distance){
						var dist = distance;
						if(to.countCards('h')>from.countCards('h'))
						{
							dist+=to.countCards('h')-from.countCards('h');
						}
	//					if(to.hp>from.hp){
	//						dist+=to.hp-from.hp;
	//					}
						return dist;
					},
				},
			},
			//Echo
			hangao:{
				enable:'phaseUse',
				usable:1,
	//			selectCard:1,
	//			filterCard:function (card,player){
	//			return get.suit(card)=='spade';
	//			},
				filter:function(event,player){
					var gao = player.getCards('he').filter(function(ca){
						return get.suit(ca)=='spade';
					});
					return gao.length;
				},
				position:'he',
				filterCard:function(card){
					return get.suit(card)=='spade';
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				discard:false,
				visible:true,
				prepare:'give',
				content:function(){
					target.gain(cards,player);
					target.storage.hangaohouxu = player;
					target.storage.hangaohouxu.hangao = cards[0];
					target.syncStorage('hangaohouxu');
					target.addTempSkill('hangaohouxu',{player:'phaseAfter'});
				},
			},
			hangaohouxu:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"♠",
				locked:true,
				intro:{
					name:'函告',
	//				content:'cards',
					content:function (storage,player,skill){
						return '在回合结束时展示手牌';
					},
					markcount:function(storage,player){
						return 0;
					},
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
				mark:'character',
				forced:true,
				priority:42,
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					return player.storage.hangaohouxu.isAlive()&&!player.storage.hangaohouxu.isOut();
				},
				content:function(){
					player.showCards(player.getCards('h'),'函告后续');
					game.delay(0.5);
					var history=player.getHistory('useCard');
					var heaG=1,diaG=1;
					for(var i=0;i<history.length;i++){
						console.log(history[i].cards[0]);
						if(history[i].cards[0]==player.storage.hangaohouxu.hangao)	diaG=0;
						if(!history[i].targets) continue;
						for(var j=0;j<history[i].targets.length;j++){
							if(history[i].targets[j]==player.storage.hangaohouxu)	heaG=0;
						}
					}
					if(heaG){
						player.storage.hangaohouxu.gain(player,player.getCards('he').filter(function(ca){
							return get.suit(ca)=='heart';
						}),'giveAuto');
					}
					if(diaG&&!player.getCards('h').contains(player.storage.hangaohouxu.hangao)){
						player.storage.hangaohouxu.gain(player,player.getCards('he').filter(function(ca){
							return get.suit(ca)=='diamond';
						}),'giveAuto');
					}
					player.removeSkill('hangaohouxu');
				}
			},
			yinglve:{
				trigger:{player:'phaseJieshuBegin'},
				priority:42,
				filter:function(event,player){
					return player.countDisabled()!=5;
				},
				content:function(){
					'step 0'
					player.chooseToDisable().set('ai',function(event,player,list){
						if(list.contains('equip2')) 											return 'equip2';
						if(list.contains('equip1')&&player.countCards('h',{name:'sha'})>2)		return 'equip1';
						if(list.contains('equip5')&&player.countCards('h',{type:'trick'})>=1)	return 'equip5';
						return list.randomGet();
					});
					'step 1'
					player.chooseUseTarget('###『影掠』###视为使用一张没有距离限制的【顺手牵羊】',{name:'shunshou'},true,'nodistance');
				},
				mod:{
					selectTarget:function(card,player,range){
						if(get.name(card)=='shunshou'){
							return range[1]=player.countDisabled()||range[1];
						}
					},
					attackFrom:function(from,to,distance){
						return distance-from.countDisabled();
					},
				},
			},
			//Artia
			shangdong:{
				marktext:"冻",
				locked:true,
				intro:{
					name:'殇冻',
					content:function (storage,player,skill){
						return '受到伤害时加'+storage;
					},
				},
				mark:true,
				onremove:function(player){
					delete player.storage.shangdong;
				},
			},
			shuangzhi:{
				trigger:{global:'loseAfter'},
				priority:222,
				direct:true,
				filter:function(event,player){
					if(event.player.storage.shuangzhi2&&event.player.storage.shuangzhi2>=2)	return false;
					if(event.player.isAlive()&&event.player!=player
					&&!(event.getParent().name=="useCard"||event.getParent().name=="useSkill")
					&&event.cards.filterInD('d').length){
						return true;
					}
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					event.target.addTempSkill('shuangzhi2');
					if(!event.target.storage.shuangzhi2)	event.target.storage.shuangzhi2=0;
					event.target.storage.shuangzhi2+=trigger.cards.filterInD('d').length;
					if(event.target.storage.shuangzhi2<2)	event.finish();
					else player.chooseBool(get.prompt2('shuangzhi')).set('ai',function(){
						return get.attitude(player,event.target)<1
					});
					'step 1'
					if(result.bool){
						player.logSkill('shuangzhi',event.target);
						var list = ['受到1点无来源伤害','受到的伤害+1直到其回合开始']
						event.target.chooseControlList('选择其中的一项',list,true,function(event,player){
							return _status.event.choice;
						}).set('choice',((_status.currentPhase==event.target)?0:1));
					}else	event.finish();
					'step 2'
					if(result.index==0){
						event.target.damage('nosource');
					}
					else{
						event.target.addSkill('shangdong');
						event.target.addMark('shangdong',1);
					}
				},
				group:['shuangzhi_init','shuangzhi_addDam'],
				subSkill:{
					init:{
						trigger:{global:'phaseBefore'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return event.player.hasMark('shangdong');
						},
						content:function(){
							trigger.player.unmarkSkill('shangdong');
							trigger.player.removeSkill('shangdong');
							trigger.player.syncStorage('shangdong');
						}
					},
					addDam:{
						trigger:{global:'damageBegin3'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return event.player.hasMark('shangdong');
						},
						content:function(){
							trigger.num+=trigger.player.countMark('shangdong');
						},
					},
				},
			},
			shuangzhi2:{
				onremove:function(player){
					delete player.storage.shuangzhi2;
				},
			},
			shenghua:{
				trigger:{global:'roundStart'},
				priority:222,
				round:1,
				filter:function(event,player){
					return game.players.length-1;
				},
				content:function(){
					'step 0'
					var next=player.chooseTarget(2,function(card,player,target){
						return true;
					});
					next.set('targetprompt',['失去体力','回复体力']);
					next.set('prompt','指定两名角色，分别失去一点体力和回复一点体力');
					next.set('forced',false);
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(target.hp==1&&sgnatt<=0){
								return 9;
							}else if(target.hp==1&&sgnatt>=1){
								return -10;
							}else{
								return 9-att
							}
						}else{
							if(target.hp==target.maxHp&&sgnatt<=0){
								return 9;
							}else if(target.hp<target.maxHp&&sgnatt>=1){
								return 7;
							}else if(target.hp<target.maxHp&&sgnatt<=0){
								return -10;
							}else{
								return 9-att;
							}
						}
					});
					'step 1'
					if(result.bool){
						result.targets[0].loseHp();
						result.targets[0].addTempSkill('shenghua_lose','roundStart');
						result.targets[1].recover();
						result.targets[1].addTempSkill('shenghua_gain','roundStart');
					}
				},
			},
			shenghua_lose:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"生",
				locked:true,
				intro:{
					name:'生化之握-',
					content:function (storage,player,skill){
						return '在轮次结束时回复体力';
					},
				},
				mark:true,
				forced:true,
				priority:420,
				onremove:function(player){
					if(player.maxHp-player.hp){
						game.log('希握后续效果');
					}
					game.delay(0.5);
					player.recover();
				},
				content:function(){
				}
			},
			shenghua_gain:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"生",
				locked:true,
				intro:{
					name:'生化之握+',
					content:function (storage,player,skill){
						return '在轮次结束时失去体力';
					},
				},
				mark:true,
				forced:true,
				priority:420,
				onremove:function(player){
					game.log('希握后续效果');
					game.delay(0.5);
					player.loseHp();
				},
				content:function(){
				}
			},
			//Doris
			shenhai:{
				marktext:'海',
				intro:{
					name:"光辉深海",
					content:function (storage,player,skill){
						if(storage)	return "<li>当前回合已通过类型为"+get.translation(storage)+"的牌发动了技能";
						return "<li>当前回合未发动技能";
					},
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{player:'useCard2'},
				priority:42,
				filter:function(event,player){
					if(!player.isPhaseUsing())			return false;
					if(get.type(event.card)=='delay')	return false;
					if(!player.getLastUsed(1))			return false;
					if(player.storage.shenhai.length!=3&&player.storage.shenhai.contains(get.type(event.card)))	return false;
					var num = player.storage.paomo_contains.length?player.storage.paomo_contains[0]:get.number(player.getLastUsed(1).card);
					if(player.storage.paomo_contains&&player.storage.paomo_contains.length){
						player.unmarkSkill('paomo_contains');
						player.storage.paomo_contains.length=0;
					}
					return event.card.isCard&&player.getLastUsed(1)&&get.number(event.card)>num;
				},
				content:function(){
					'step 0'
					if(player.storage.shenhai.length===3){
						var list = ['令一名其他角色使用','额外结算一次','增加或减少一个目标'];
						player.chooseControlList(list,true,function(){
							return 1;
						});
						event.goto(1);
					}else{
						if(get.type(trigger.card)=='equip'){
							player.chooseTarget('令一名其他角色使用',function(card,player,target){
								if(target.isDisabled(get.subtype(_status.event.card)))	return false;
								return target!=player;
							}).set('ai',function(target){
								var player = _status.event.player;
								var card = _status.event.card;
								return get.effect(target,card,target,player);
							}).set('card',trigger.card);
							event.goto(4);
						}
						else if(get.type(trigger.card)=='basic'){
							player.storage.shenhai.add(get.type(trigger.card));
							event.goto(5);
						}
						else if(get.type(trigger.card)=='trick'){
							var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
							player.chooseTarget(get.prompt('shenhai'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								return get.effect(target,trigger.card,player,player)*(_status.event.targets.contains(target)?-1:1);
							}).set('targets',trigger.targets).set('card',trigger.card);
							event.goto(2);
						}
					}
					'step 1'
					if(!result.bool&&player.storage.shenhai.length!=3){
						event.finish();
					}
					if(result.index==0){
						player.chooseTarget('令一名其他角色使用',function(card,player,target){
							if(get.type(trigger.card)=='equip'&&target.isDisabled(get.subtype(card)))	return false;
							return target!=player;
						});
						event.goto(4);
					}
					else if(result.index==1){
						if(get.type(trigger.card)=='equip')		event.finish();
						event.goto(5);
					}
					else if(result.index==2){
						if(get.type(trigger.card)=='equip')		event.finish();
						else{
							var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
							player.chooseTarget(get.prompt('shenhai'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								return get.effect(target,trigger.card,player,player)*(_status.event.targets.contains(target)?-1:1);
							}).set('targets',trigger.targets).set('card',trigger.card);
							event.goto(2);
						}
					}
					'step 2'//改变目标
					player.storage.shenhai.add(get.type(trigger.card));
					if(!event.isMine()) game.delayx();
					event.targets=result.targets;
					'step 3'
					if(event.targets){
						player.logSkill('shenhai',event.targets);
						if(trigger.targets.contains(event.targets[0]))	trigger.targets.removeArray(event.targets);
						else trigger.targets.addArray(event.targets);
					}
					event.finish();
					'step 4'//改变使用者
					if(result.targets&&result.targets.length){
						player.storage.shenhai.add(get.type(trigger.card));
						game.broadcastAll(function(player,target,card,trigger){
							target.gain(card,player,'giveAuto');
							trigger.getParent().player=target;
							trigger.player=target;
							if(get.type(trigger.card)=='equip')	trigger.targets.splice(0,1,target);
						},trigger.player, result.targets[0], trigger.card,trigger)
					}
					event.finish();
					'step 5'//改变结算
					player.storage.shenhai_jiesuan.length=0;
					player.storage.shenhai_jiesuan.add(trigger.card);
					event.finish();
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.number(card)){
							var cards = player.getCards('h');
							var numx = 0
							for(var i = 0;i<cards.length;i++){
								if(cards[i]!=card&&get.number(cards[i])>get.number(card)&&player.getCardUsable(cards[i])&&player.hasUseTarget(cards[i])){
									numx++;
								}
							}
							if(get.type(card)=='equip')	return num+4*numx;
							return num+8*numx;
						}
					},
				},
				group:['shenhai_jiesuan','shenhai_init'],
				subSkill:{
					jiesuan:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						trigger:{player:'useCardAfter'},
						forced: true,
						priority:42,
						filter:function(event,player){
							if(!player.isPhaseUsing())			return false;
							player.markSkill('shenhai');
							player.updateMark();
							if(get.type(event.card)=='delay')	return false;
							return player.storage.shenhai_jiesuan[0]==event.card;
						},
						content:function(){
							if(trigger.targets)
							trigger.targets.forEach(function(target){
								player.useCard(trigger.card,target);
							});
						}
					},
					init:{
						trigger:{player:'phaseEnd'},
						forced: true,
						silent: true,
						priority:42,
						content:function(){
							player.unmarkSkill('shenhai');
							player.storage.shenhai_jiesuan.length = 0;
							player.storage.shenhai.length = 0;
						}
					}
				}
			},
			paomo:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{global:'useCardAfter'},
				priority:42,
				filter:function(event,player){
					if(player!=_status.currentPhase)	return false;
					if(player==event.player)			return false;
					return event.card.isCard&&!player.storage.paomo.contains(event.player)&&event.player.getHistory('useCard').length==0;
				},
				check:function(event,player){

				},
				content:function(){
					player.storage.paomo.add(trigger.player);
					if(player.getLastUsed(1)){
						if(player.storage.paomo_contains&&player.storage.paomo_contains.length)		player.storage.paomo_contains.length=0;
						player.storage.paomo_contains.add(get.number(trigger.card));
						player.markSkill('paomo_contains');}
					player.draw();
					trigger.player.draw();
				},
				group:['paomo_contains','paomo_init'],
				subSkill:{
					contains:{
						marktext:'恋',
						intro:{
							name:"泡沫爱恋",
							content:function (storage,player,skill){
								if(storage)	return "<li>上一张使用的牌点数变为"+get.translation(storage);
								return "<li>当前回合未发动技能";
							},
						},
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						mark:true,
					},
					init:{
						trigger:{player:'phaseEnd'},
						forced: true,
						silent: true,
						priority:42,
						content:function(){
							player.unmarkSkill('paomo_contains');
							player.storage.paomo_contains.length = 0;
							player.storage.paomo.length = 0;
						}
					}
				}
			},
			//Yogiri
			shisang:{
				trigger:{player:'useCard1'},
				priority:42,
				check:function(event,player){
					var eff1=0,eff2=0;
					for(var i=0;i<event.targets;i++){
						eff1 += get.effect(event.targets[i],event.card,player,player)
						eff2 += get.recoverEffect(event.targets[i],player,player);
					}
					return (eff2-eff1)>0;
				},
				filter:function(event,player){
					return player.isPhaseUsing()&&!player.hasSkill('shisang_used')&&event.targets&&event.targets.length;
				},
				prompt2:function(event,player){
					if(player.hasSkill('wanjie_change'))	return '出牌阶段限一次，可以将此牌的效果改为 <font color=#fc8>受到你造成的1点伤害</font>';
					return '出牌阶段限一次，可以将此牌的效果改为 令目标回复1点体力';
				},
				content:function(){
					'step 0'
					player.addTempSkill('shisang_used','phaseUseEnd');
					if(!trigger.addedSkill)	trigger.addedSkill = [];
					trigger.addedSkill.add('shisang');
			//		if(player.storage.shisang_clear)	delete player.storage.shisang_clear;
					if(player.storage.shisang2)	delete player.storage.shisang2;
					lib.skill.shisang2.trigger = {player:[get.name(trigger.card)+'Begin'/** ,get.name(trigger.card)+'ContentBefore'*/]};
					'step 1'
					player.storage.shisang2 = trigger.card;
					player.addTempSkill('shisang2',{player:'useCardAfter'});
			/*		if(player.hasSkill('wanjie_change')){
						trigger.getParent().setContent(function(){
							targets.forEach(function(target){
								target.damage(player);
							})
						});
					}else{
						trigger.getParent().setContent(function(){
							targets.forEach(function(target){
								target.recover();
							})
						});
					}
				*/
			/*		player.storage.shisang_clear = get.info(trigger.card).content;
					if(player.hasSkill('wanjie_change')){
						get.info(trigger.card).content = function(){
							target.damage(player);
						}
					}else{
						get.info(trigger.card).content = function(){
							target.recover();
						}
					}
					'step 2'
					if(get.itemtype(trigger.card)=='card'){
						var next = game.createEvent('sanchaji_clear');
						next.card = trigger.card;
						next.cardContent = player.storage.shisang_clear;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function(){
							get.info(next).content = cardContent;
						});
					}
				*/
				},
			//	group:'shisang_clear',
				subSkill:{
					used:{},
					clear:{
						trigger:{global:['damage','damageZero','recoverEnd','useCardEnd']},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return false;
							if(!player.hasSkill('shisang_used'))		return false;
							if((event.name=='useCard'&&event.addedSkill&&event.addedSkill.contains('shisang')))			return true;
							if(!(event.getParent(2).addedSkill&&event.getParent(2).addedSkill.contains('shisang')))		return false;
							return (event.player==event.getParent(2).targets[event.getParent(2).targets.length-1]);
						},
						content:function(){
							if(get.info(trigger.card).content != player.storage.shisang_clear){
								get.info(trigger.card).content = player.storage.shisang_clear;
							}
						},
					},
				}
			},
			shisang2:{
				trigger:{global:'Xbegin'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.card == player.storage.shisang2;
				},
				content:function(){
					if(player.hasSkill('wanjie_change')){
						trigger.setContent(function(){
							target.damage(player);
						});
					}else{
						trigger.setContent(function(){
							target.recover();
						});
					}
				},
			},
			wanjie:{
				enable:'phaseUse',
				filterCard:true,
				selectCard:-1,
				discard:false,
				lose:false,
				filter:function(event,player){
					return player.isPhaseUsing()&&!player.hasSkill('wanjie_used')&&player.countDiscardableCards(player,'h');
				},
				content:function(){
					'step 0'
					player.showHandcards();
					player.chooseCard(true,lib.filter.cardDiscardable,'###『腕解』选择一种颜色的牌弃置###若弃置黑色，你摸两张牌；若弃置红色，本回合『食尚』的“回复1点体力”改为“受到你造成的1点伤害”').set('ai',function(card){
						var player=_status.event.player;
						var cardTo = player.getCards('h',{color:'black'});
						return cardTo.contains(card);
					});
					'step 1'
					if(result.bool){
						player.discard(player.getCards('h',function(card){
							return get.color(card)==get.color(result.cards[0]);
						}));
						if(get.color(result.cards[0])=='black'){
							player.draw(2);
						}
						if(get.color(result.cards[0])=='red'){
							player.addTempSkill('wanjie_change');
						}
					}
					player.addTempSkill('wanjie_used','phaseUseEnd');
				},
				ai:{
					order:function(item,player){
						var cardTo = player.getCards('h',{color:'black'});
						if(cardTo.length==1)	return 10;
						return 1;
					},
					result:{player:1}
				},
				subSkill:{
					used:{},
					change:{},
				}
			},
			//蘑菇人
			maoge:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:'书',
				mark:true,
				hiddenCard:function(player,name){
					if(!player.storage.maoge||player.storage.maoge.length<=player.countCards('h')) return false;
					for(var i=0;i<player.storage.maoge.length;i++){
						if(player.storage.maoge[i].name==name) return true;
					}
					return false;
				},
				intro:{
					name:'书',
					content:function(storage,player){
						if(!storage||!storage.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							return get.translation(storage);
						}
						else{
							return '共有'+get.cnNumber(storage.length)+'张牌';
						}
					},
					mark:function(dialog,storage,player){
						if(!storage||!storage.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							dialog.addAuto(storage);
						}
						else{
							return '共有'+get.cnNumber(storage.length)+'张牌';
						}
					},
					markcount:function(storage,player){
						if(storage&&storage.length) return storage.length;
						return 0;
					}
				},
				trigger:{global:'gameDrawAfter',player:['drawBegin','enterGame']},
				forced:true,
				silent:true,
				popup:false,
				lastDo:true,
				content:function(){
					if(trigger.name=='gameDraw'){
						var cards=player.getCards('h');
						player.lose(cards,ui.special,'toStorage');
					}else{
						var cards=get.cards(trigger.num);
					}
					player.$draw(cards.length);
					player.markAuto('maoge',cards);
					game.log(player,'获得了'+get.cnNumber(cards.length)+'张“书”');
					trigger.changeToZero();
				},
				group:['maoge_nouse','maoge_use','maoge_respond','maoge_drawPhase'],
				subSkill:{
					drawPhase:{
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						filter:function(event,player){
							return player.storage.maoge.length<player.countCards('h')&&!event.numFixed;
						},
						content:function(){
							trigger.num++;
						}
					},
					nouse:{
						mod:{
							cardEnabled2:function(card,player){
								if(player.storage.maoge.length>player.countCards('h')){
									return get.position(card)!='h';
								}
							}
						}
					},
					use:{
						enable:'chooseToUse',
						filter:function(event,player){
							if(player.storage.maoge&&player.storage.maoge.length>player.countCards('h')){
								for(var i=0;i<player.storage.maoge.length;i++){
									if(event.filterCard(player.storage.maoge[i],player,event)) return true;
								}
							}
							return false;
						},
						chooseButton:{
							dialog:function(event,player){
								return ui.create.dialog('『帽阁』',player.storage.maoge,'hidden');
							},
							filter:function(button,player){
								var evt=_status.event.getParent();
								if(evt&&evt.filterCard){
									if(evt.getParent().name!='phaseUse'){
										return evt.filterCard(button.link,player,evt);
									}
									return player.hasUseTarget(button.link)&&evt.filterCard(button.link,player,evt);
								}
								return true;
							},
							check:function(button){
								if(button.link.name=='du') return 10;
								var player=_status.event.player;
								if(player.getUseValue(button.link)>0) return get.order(button.link);
								return -1;
							},
							backup:function(links,player){
								return {
									prompt:'选择'+get.translation(links)+'的目标',
									filterCard:function(){return false},
									selectCard:-1,
									viewAs:links[0],
									onuse:function(result,player){
										if(player.storage.maoge&&player.storage.maoge.length){
											player.storage.maoge.remove(result.card);
										}
										player.updateMarks();
									}
								}
							},
						},
						ai:{
							order:function(item,player){
								var event=_status.event;
								if(event.type!='phase') return 4;
								if(!player) return -1;
								if(!player.storage.maoge||!player.storage.maoge.length) return -1;
								var order=0;
								for(var i=0;i<player.storage.maoge.length;i++){
									if(player.getUseValue(player.storage.maoge[i])>0){
										var order2=get.order(player.storage.maoge[i]);
										if(order2>order) order=order2
									}
								}
								return order+0.1;
							},
							result:{
								player:function(player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								}
							},
							useful:-1,
							value:-1
						}
					},
					respond:{
						trigger:{player:'chooseToRespondBegin'},
						filter:function(event,player){
							if(event.responded) return false;
							if(player.storage.maoge&&player.storage.maoge.length)	return player.storage.maoge.length>player.countCards('h');
							return false;
						},
						direct:true,
						content:function(){
							"step 0"
							player.chooseButton(['『帽阁』',player.storage.maoge]).set('filterButton',function(button){
								var evt=_status.event.getTrigger();
								if(evt&&evt.filterCard){
									return evt.filterCard(button.link,_status.event.player,evt)&&lib.filter.cardRespondable(button.link,_status.event.player,evt);
								}
								return true;
							}).set('ai',function(button){
								var evt=_status.event.getTrigger();
								if(evt&&evt.ai){
									var tmp=_status.event;
									_status.event=evt;
									var result=evt.ai(button.link,_status.event.player,evt);
									_status.event=tmp;
									return result;
								}
								return 1;
							});
							"step 1"
							if(result.bool){
								trigger.untrigger();
								trigger.responded=true;
								trigger.result={bool:true,card:result.links[0],cards:result.links.slice(0)};
								if(player.storage.maoge&&player.storage.maoge.length){
									player.storage.maoge.remove(result.links[0]);
								}
								player.updateMarks();
							}
						},
						ai:{
							order:4,
							useful:-1,
							value:-1
						}
					},
				},
			},
			bianlan:{
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(player.storage.maoge&&player.storage.maoge.length)	return event.targets&&event.targets.length;
					return false;
				},
				forced:true,
				silent:true,
				popup:false,
				lastDo:true,
				content:function(){
					'step 0'
					player.chooseButton(['###是否发动『遍览』？###选择一种花色的“书”',player.storage.maoge]).set('filterButton',function(button){
						return true;
					});
					'step 1'
					if(result.bool){
						player.logSkill('bianlan')
						event.suit = get.suit(result.links[0]);
						event.targets = trigger.targets;
						var shus = player.storage.maoge.filter(function(card){
							return get.suit(card)==event.suit;
						});
						player.storage.maoge.removeArray(shus);
						player.updateMarks();
						player.showCards(shus,'获得一种花色的书');
						game.delay(1);
						player.gain(shus,'giveAuto');
						if(game.hasPlayer(function(cur){
							return event.targets.contains(cur)&&!player.storage.bianlan.contains(cur);
						})){
							player.chooseTarget('###『遍览』###可以令一名目标摸一张牌',function(card,player,target){
								return _status.event.targets.contains(target)&&!player.storage.bianlan.contains(target);
							}).set('targets',event.targets);
						}else{
							event.finish();
						}
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.storage[event.name].add(result.targets[0])
						result.targets[0].draw();
					}
				},
				ai:{
					combo:'maoge',
				},
				group:'bianlan_init',
				subSkill:{
					init:{
						trigger:{global:['gameDrawAfter','phaseAfter'],player:'enterGame'},
						forced:true,
						silent:true,
						popup:false,
						lastDo:true,
						content:function(){
							player.storage.bianlan = [];
						},
					},
				},
			},
			futian:{
				init:function(player,skill){
					player.storage[skill] = [];
				},
				trigger:{player:'phaseBegin'},
				limited:true,
				unique:true,
				skillAnimation:true,
				animationColor:'fire',
				filter:function(event,player){
					return player.storage.maoge&&player.storage.maoge.length;
				},
				check:function(event,player){
					return player.storage.maoge&&player.storage.maoge.length>6;
				},
				content:function(){
					'step 0'
					player.awakenSkill(event.name);
					event.hc = player.getCards('h');
					player.lose(event.hc,ui.special,'toStorage');
					event.shus = player.storage.maoge.splice(0);
			//		player.unmarkAuto('maoge',event.shus);
			//		player.updateMarks();
					'step 1'
					player.markAuto('maoge',event.hc);
					player.updateMarks();
					'step 2'
					player.gain(event.shus,'giveAuto');
					player.addTempSkill('futian_futian');
				},
				subSkill:{
					futian:{
						hiddenCard:function(player,name){
							if(player.storage.maoge&&player.storage.maoge.length>player.countCards('h')) return false;
							var list = get.inpile('trick',function(card){
								var player = _status.event.player;
								if(player.storage.futian.contains(card))	return false;
								return true;
							});
							for(var i=0;i<list.length;i++){
								if(list[i]==name) return true;
							}
							return false;
						},
						enable:'chooseToUse',
						filter:function(event,player){
							return player.countCards('he')>=2&&player.storage.maoge.length<=player.countCards('h');
						},
						chooseButton:{
							dialog:function(event,player){
								var list = get.inpile('trick',function(card){
									var player = _status.event.player;
									if(player.storage.futian.contains(card))	return false;
									return true;
								});
								for(var i=0;i<list.length;i++){
									list[i]=['锦囊','',list[i]];
								}
								if(list.length==0){
									return ui.create.dialog('『覆天』已无可用牌');
								}
								return ui.create.dialog('『覆天』',[list,'vcard']);
							},
							filter:function(button,player){
								return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
							},
							check:function(button){
								var player=_status.event.player;
								if(player.countCards('h',button.link[2])>0) return 0;
								if(button.link[2]=='wugu') return 0;
								var effect=player.getUseValue(button.link[2]);
								if(effect>0) return effect;
								return 0;
							},
							backup:function(links,player){
								return {
									filterCard:true,
									selectCard:2,
									popname:true,
									check:function(card){
										return 6-get.value(card);
									},
									position:'he',
									viewAs:{name:links[0][2]},
									onuse:function(result,player){
										player.storage.futian.add(result.card.name);
									},
								}
							},
							prompt:function(links,player){
								return '###『覆天』###将两张牌当做【'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'】使用';
							}
						},
					},
				},
			},

		},
		characterReplace:{
			TokinoSora:['re_TokinoSora','TokinoSora'],
			RobokoSan:['re_RobokoSan','RobokoSan'],
			ShirakamiFubuki:['re_ShirakamiFubuki','ShirakamiFubuki'],
			HoshimatiSuisei:['re_HoshimatiSuisei','HoshimatiSuisei'],
			AkiRosenthal:['re_AkiRosenthal','AkiRosenthal'],
			SakuraMiko:['re_SakuraMiko','SakuraMiko'],
			NatsuiroMatsuri:['re_NatsuiroMatsuri','NatsuiroMatsuri'],
			AkaiHaato:['re_AkaiHaato','AkaiHaato'],
			UsadaPekora:['re_UsadaPekora','UsadaPekora'],
			ŌokamiMio:['re_ŌokamiMio','ŌokamiMio'],
			SpadeEcho:['re_SpadeEcho','SpadeEcho'],

			Ciyana:['Ciyana','Civia'],
			MinatoAqua:['MinatoAqua','sea_MinatoAqua'],
		},
		translate:{
			hololive_1:'一期生',
			hololive_wuyin:'无印',
			hololive_2and3:'二&三期生',
			OurGirls: 'OurGirls',

			TokinoSora:'时乃空',
			taiyangzhiyin:'太阳之音',
			taiyangzhiyin_info:'你使用牌指定目标时，此牌点数每比10大1点，你便可选择不重复的一项：令之无法响应；为之额外指定一名目标；或摸一张牌。',
			renjiazhizhu:'仁家之主',
			renjiazhizhu_info:'<font color=#ff4>主公技</font> 你的回合开始时，其他同势力角色可以展示并交给你一张牌，本回合这些点数的牌点数均改为J。',
			renjiazhizhu_tag:'仁家之主',

			YozoraMel:'夜空梅露',
			juhun:'聚魂',
			juhun_info:'<font color=#f66>锁定技</font> 一回合一次，当一名角色受到伤害后，将牌堆顶牌置于你武将牌上。每轮开始时，你获得武将牌上所有牌。当你的手牌数为全场最多时，摸牌阶段你少摸一张牌。',
			meilu:'没露',
			meilu_info:'<font color=#f66>锁定技</font> 准备阶段，若你的手牌数比体力值多三或以上，你翻面。当你的武将牌背面朝上时，你使用【杀】没有次数限制；当你的武将牌翻至正面时，你回复 1 点体力。',

			AkaiHaato:'赤井心',
			liaolishiyan:'料理实验',
			liaolishiyan_info:'摸牌阶段，你可改为展示并获得牌堆顶的两张牌，然后根据其中的花色执行对应效果：♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。出牌阶段限一次，你可以重铸与当回合“料理实验”花色相同的两张牌令一名角色执行对应效果。',
			liaolishiyan2:'料理实验',
			liaolishiyan2_info:'出牌阶段限一次，你可以重铸与当回合“料理实验”花色相同的两张牌令一名角色执行对应效果。♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。',
			momizhiyan:'抹蜜之言',
			momizhiyan_info:'当你使用牌指定目标后，你可弃置一张牌令其中一名目标执行弃置牌花色在“料理实验”的对应效果。每回合限一次。',

			NatsuiroMatsuri:'夏色祭',
			huxi1:'呼吸',
			huxi1_info:'出牌阶段限一次，你可以令攻击范围内的一名其他角色与你同时展示一张手牌并交换，若你获得了红色牌，你可以摸一张牌并令你本回合使用的下一张牌不受距离与次数限制；若没有人获得红色牌，你失去 1 点体力。',
			lianmeng:'连梦',
			lianmeng_info:'<font color=#f66>锁定技</font> 当你使用武器牌或造成伤害后，你需对本回合未成为过“呼吸”目标中距离你最近的角色立即发动一次“呼吸”。当你于回合外获得其他角色的牌后，弃置你装备区的防具牌。',

			RobokoSan:'萝卜子',
			gaonengzhanxie:'高能战械',
			gaonengzhanxie_info:'<font color=#f66>锁定技</font> 你出牌阶段可使用【杀】的次数等于你装备区内牌数+1。当你于回合内使用【杀】后，你摸X张牌，然后若你还可使用【杀】，你弃置等量的牌。（X为你本阶段已使用过的【杀】的数量)',
			ranyouxielou:'燃油泄漏',
			ranyouxielou_info:'<font color=#f66>锁定技</font> 你受到属性伤害时，来源需选择至少一项：改为令你回复等量体力，或令你获得来源牌。你攻击范围内其他角色受到火焰伤害时，若你的手牌数不小于手牌上限，你弃置一张牌令此伤害+1。',

			ShirakamiFubuki:'白上吹雪',
			baihuqingguo:'白狐倾国',
			baihuqingguo_info:'其他角色的出牌阶段开始时，你可弃一张牌，若如此做，该角色于此阶段使用的牌只能以你或其自己为目标。',
			huyanluanyu:'狐言乱语',
			huyanluanyu_info:'每当你受到1点伤害后，（记你此时手牌数为X）你可令手牌数多于X的角色各交给你一张牌，然后你交给手牌数少于X的角色各一张牌。',
			yuanlv:'远虑',
			yuanlv_info:'你使用过锦囊牌或受到过伤害的回合结束时，可以摸等同你体力上限的牌，然后将等同你体力值的牌以任意顺序置于牌堆顶。每轮每项限一次。',
			jinyuan:'近援',
			jinyuan_info:'出牌阶段限一次，你可以观看一名角色的手牌，然后你可交给其一张牌，若为其原手牌中没有的花色，其可以立即使用之。',
			zhongjian:'中坚',
			zhongjian1:'中坚',
			zhongjian_info:'<font color=#ff4>主公技</font> 每轮限一次,当一张普通锦囊牌指定目标后,你可以选择同势力一名其他角色的一张手牌,此牌本回合视为【无懈可击】。',

			AkiRosenthal: '亚琦罗森塔尔',
			meiwu: '魅舞',
			meiwu_info: '当你于一回合内首次成为黑色牌的唯一目标时，你可以将目标转移给另一名其他角色，然后若此牌被抵消，你交给其一张牌。',
			huichu: '慧厨',
			huichu_info: '体力值最少的角色回合开始时，你可以展示所有手牌，若均为♥，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。',
			
			
			HoshimatiSuisei:'星街彗星',
			yemuxingyong: '夜幕星咏',
			yemuxingyong_info: '每轮限一次，一个弃牌阶段结束时，你可将本阶段进入弃牌堆的牌置于武将牌上，称为“咏”。然后其他角色也可将一张黑色牌置于你武将牌上。出牌阶段，你可获得一张“咏”，然后立即将两张手牌当【过河拆桥】或【酒】使用。',
			yong: '咏',
			xinghejianduei:'星河舰队',
			xinghejianduei_info:'<font color=#ccf>觉醒技</font> 一轮开始时，若你的体力值不大于游戏轮数，你减 1 点体力上限并摸等同于存活角色数的手牌，然后你的攻击范围和手牌上限始终增加“咏”的数量。',

			SakuraMiko: '樱巫女',
			haodu: '豪赌',
			haodu_info: '出牌阶段限X次（X为你已损失的体力值且至少为1)，你可以将至少一张手牌交给一名其他角色并声明点数、花色、类型，然后你展示其一张手牌。根据与声明相同的项依次执行对应效果：点数，你与其交换手牌；类型，令其弃置两张牌；花色，你获得其一张牌。			',
		
			MinatoAqua: '湊阿库娅',
			kuali: '夸力满满',
			kuali_info: '出牌/结束阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。每回合限一次。',
			kuali_zhuDong_info: '出牌阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。每回合限一次。',
			kuali_jieshu_info: '结束阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。每回合限一次。',
			youyi: '友谊誓约',
			youyi_info: '每轮限一次，其他角色的回合开始时，你可以展示并交给其一张“誓约”牌。本回合内，当其造成伤害时，你可令其将“誓约”牌交给你以防止之。该回合结束时，其可以弃置“誓约”牌令你或其回复1点体力。',
			youyishiyue: '誓约',
			youyishiyue_info: '友谊誓约生效中',
			youyishiyue_rec_info: '弃置“誓约”牌，令你或湊阿库娅回复一点体力。',
			
			UsadaPekora: '兔田佩克拉',
			pekoyu: '嚣张咚鼓',
			pekoyu_info: '回合内，当你的非装备牌生效后，若本回合未因此花色的牌发动此技能，你可以摸一张牌然后弃置一张牌。若你因此弃置了【酒】，你可以令一名角色摸两张牌。',
			hongshaoturou: '自煲自足',
			hongshaoturou_info: '出牌阶段限一次，你可以横置武将牌，令你在回合结束时受到1点火焰伤害。然后本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。',

			UruhaRushia: '润羽露西娅',
			NakiriAyame: '百鬼绫目',
			TsunomakiWatame: '角卷绵芽',
			YukihanaLamy: '雪花菈米',
			ŌzoraSubaru: '新·大空昴',

			Civia: '希薇娅',
			kuangxin: '旷心',
			kuangxin2: '旷心',
			kuangxin_info: '每回合限一次,当其他角色成为【杀】或伤害类锦囊牌的唯一目标时，你可以令你与其各选择一张牌交换,此牌结算后,若其未受到此牌造成的伤害,你可以令你或其摸一张牌。',
			danyan: '弹言',
			danyan_info: '你的手牌因弃置而进入弃牌堆时,若本回合你没有造成过伤害,你可以使用其中的一张牌。',
			qingjie: '轻捷',
			qingjie_info: '<font color=#f66>锁定技</font> 你计算与装备区内没有坐骑牌的角色的距离视为1；其他角色计算与你的距离时，你每比其多一张手牌，距离便+1。',

			SpadeEcho: '黑桃影',
			hangao: '函告',
			hangao_info: '出牌阶段限一次，你可以将一张♠牌交给一名其他角色，该角色于下个回合结束时展示所有手牌，然后若其本回合没有对你使用过牌，你获得其所有的♥牌；若你本轮交出的♠牌未被其使用且不在其手牌，你获得其所有的♦牌。',
			yinglve: '影掠',
			yinglve_info: '结束阶段，你可以废除一个装备栏视为使用一张无距离限制的【顺手牵羊】；你的攻击范围+X且你使用【顺手牵羊】可选择的目标数为X。（X为你废除的装备栏数）',
			feichu_equip1:'废除',
			feichu_equip2:'废除',
			feichu_equip3:'废除',
			feichu_equip4:'废除',
			feichu_equip5:'废除',
			
			Artia: '阿媂娅',
			shuangzhi: '殇冻',
			shuangzhi_info: '其他角色一回合内弃置第二张牌后，你可以令其选择一项：受到1点无来源伤害；或受到的伤害+1直到其回合开始。',
			shenghua: '希握',
			shenghua_info: '一轮开始时，你可以令一名角色失去1点体力，另一名角色回复1点体力。本轮结束时前者回复1点体力，后者失去1点体力。',
			
			Doris: '朵莉丝',
			shenhai: '曜海',
			shenhai_info: '出牌阶段每类型限一次，当你使用一张1.装备牌2.基本牌3.通常锦囊牌时，若该牌点数大于你本回合使用的上一张牌，你可以执行对应标号的项：1.令一名其他角色使用2.此牌额外结算一次3.此牌增加或减少一个目标。当你于一回合内发动三次本技能后，解除次数和标号限制。',
			paomo: '儚恋',
			paomo_info: '你的回合内，当其他角色于本回合第一次使用实体牌后，你可以令你上一张使用的牌的点数视为此牌的点数，然后与其各摸一张牌。',

			Yogiri: '夜霧',
			shisang: '食尚',
			shisang_info: '出牌阶段限一次，你使用牌指定目标后，可以将此牌的效果改为令目标回复1点体力。',
			wanjie: '腕解',
			wanjie_info: '出牌阶段限一次，你可以展示所有手牌并弃置其中黑色牌，然后摸两张牌；或弃置其中红色牌，然后将本回合『食尚』的“回复1点体力”改为“受到你造成的1点伤害”。',
			
			Rosalyn: '罗莎琳',
			maoge: '帽阁',
			maoge_info: '<font color=#f66>锁定技</font> 你摸的牌均改为置于武将牌上，称为“书”。你的手牌数不小于“书”数时，摸牌阶段额外摸一张牌；你的手牌数小于“书”数时，你能且只能使用或打出“书”。',
			bianlan: '遍览',
			bianlan_info: '当你使用牌指定目标后，你可以获得一种花色的“书”。然后你可以令其中一名本回合未因此摸牌的目标摸一张牌。',
			futian: '覆天',
			futian_info: '<font color=#abf>限定技</font> 回合开始时，你可以交换手牌与“书”，然后本回合你可以将任意两张牌当一张未以此法使用过的通常锦囊牌使用。',

		},
	};
});
