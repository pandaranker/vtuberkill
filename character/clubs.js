'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'clubs',
		connect:true,
		character:{
			//神乐组
			KaguraMea: ['female', 'kagura', 4, ['luecai', 'xiaoyan']],
			YaotomeNoe: ['female', 'kagura', 4, ['huiyuan', 'suoshi']],

			Ciyana: ['female','qun',3,['yankui', 'danyan']],
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			kaguraNaNa: ['female', 'qun', 3, ['DDzhanshou', 'xinluezhili'], ['zhu']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],
			/**艾琳 */
			Eilene: ['female','eilene',4,['daimeng','changsheng'],['zhu']],
			/**嫁实 */
			Yomemi:['female','eilene',3,['mokuai','yaoji']],
			/**萌实 */
			Moemi: ['female','eilene',4,['chengzhang','mengdong']],
			/**夏实萌惠 */
			NatsumiMoe: ['female','eilene',4,['moemanyi','cuchuan'],['yingV']],
			/**雫るる */
			ShizukuLulu:['female','qun',3,['duixian','gutai']],
			
			/**P家诸人 */
			Paryi:['male','paryi',4,['tiantang','haoren']],
			TakatsukiRitsu:['female','paryi',3,['shengya','liangshan','chongshi']],
			MorinagaMiu:['female','paryi',3,['guanzhai','zhishu']],
			OtomeOto:['female','paryi',3,['yuxia','lianjue','changxiang'],['zhu']],
			HisekiErio:['female','paryi',4,['huange','qishi','yongtuan'],['zhu']],
			HanazonoSerena: ['female', 'paryi', 4, ['jiumao', 'enfan', 'shiqi'],['zhu']],
			/**真白花音 */
			MashiroKanon: ['female', 'paryi', 3, ['chenzhu', 'yutuo']],

			/**星宫汐 */
			HosimiyaSio: ['female','qun',4,['yuanyao','gongni'],],
			/**耳朵 */
			Hiiro: ['female','qun',4,['jiace','xiangying'],['yingV']],
			/**猫雷NyaRu */
			NecoraNyaru: ['female','qun',3,['miaolu','benglei'],],
			
			
			/**进击的冰糖 */
			bingtang: ['female', 'xuyan', 4, ['xiou'],['guoV']],
			/**张京华 */
			zhangjinghua: ['male', 'qun', 3, ['xiemen', 'jiai']],
			/**NoiR */
			NoiR: ['female', 'qun', 3 ,['mozouqiyin', 'budingpaidui']],
			/**晴步子 */
			Bafuko: ['female','qun',4,['shangsheng','jinghua']],
			/**阳向心美 */
			HinataCocomi: ['female','qun',4,['qijian','yizhan','jushi'],['zhu']],
			/**紫海由爱 */
			ShikaiYue: ['female','qun',3,['lianyin','guixiang'],],
			/**纸木铗 */
			KamikiHasami: ['female','qun',4,['quzhuan','yuanjiu'],],
			/**黑桐亚里亚 */
			KurokiriAria: ['female','qun',4,['xuanying','houfan'],],
			/**早稻叽 */
			Zaodaoji: ['female','chaos',4,['guangan','lanxuan','zonghe'],['zhu','guoV']],
			/**牛牛子 */
			Niuniuzi: ['female','chaos',4,['qiying','hengxuan'],['guoV']],
			
			/**喵喵人 */
			Nyanners: ['female','vshojo',3,['shenghuo','dipo','miaoche'],['zhu','yingV']],
			/**Veibae */
			Veibae: ['female','vshojo',4,['zhexun','yuci'],['yingV']],
			/**铁耗子 */
			Ironmouse: ['female','vshojo',3,['haosun','banmao'],['yingV']],
			/**Froot */
			Froot: ['female','vshojo',4,['exiao','jinmei'],['yingV']],
		},
		characterSort:{
			clubs:{
				paryi2:['Paryi','TakatsukiRitsu','MorinagaMiu','HanazonoSerena','OtomeOto','HisekiErio','MashiroKanon'],
				VirtuaReal2:['Azusa','Shaun','Miqiutu'],
				vshojo2:['Nyanners','Veibae','Ironmouse','Froot'],
			}
		},
		characterTitle:{
			OtomeOto:'#pChucolala',
			HisekiErio:'#pChucolala',
			MashiroKanon:'#pChucolala',

			HayamiSaki: '#gChobits-live',
			KiyoInga: '#gChobits-live',
		},
		characterIntro:{
			Paryi: '帕里，巴蜀富豪者也，累世公卿，广散金帛，养士三千，昔绊爱首义，左右劝帕里图之，帕里由此建国，聚诸奇士建国帕里破一期，天时地利人和皆不顺，诸士心皆背，P家无疾而终，帕里亦败走青城，后党锢事泄，杏国树倒猴散，P家有团长绯赤艾利欧接连败诸侯，中兴P家，OTO、古守血遊等士亦借此征战，P家之势渐盛。',
			OtomeOto: 'oto者，名歌姬也，曾学于教坊司，能歌善舞，以《初音未来的消失》之传说名曲惊煞一众善才，后烽烟四起，oto批皮入V界，人情炎凉，难以经营，如此经年，后杏溃败，oto喃喃自言曰：好风凭借力，送我上青云。有友曰绯赤艾利欧，两人相持生活数十年，V始二十年，杏礼崩乐坏，团长尽收杏社之地，亲迎oto，oto亦欣然前往，paryi系重归荣光，此二人先导也。',
			TakatsukiRitsu: '阿律者，帕里之衙内也，清楚三铳士之一，以超美丽3d与烂活闻名，常联动yyut，一日律问直播间观众爱者，众人皆曰yyut，律遂破防光速下播，杏溃败后，众v皆如终获青天，有欣欣向荣之势，独律未增半分，郁郁寡欢，此后毕业之，是矣，烂活可供一时，可供一世乎？',

			KaguraMea: '神乐咩者，东瀛之歌女也，迫于生计西来中原，有《money》、《你好我很可爱》之名曲流传世间，咩性格直爽，以此获众拥簇，却亦因此惹祸上身，V始二十二年，西都陷落，咩于京畿聚众建国，国号曰咩，定元咩啊元年，与杏虹分庭抗礼。',
			kaguraNaNa: "神乐七奈（V始三年），蜀郡唐辛人也，尤善丹青，图写特妙，元昭重之，V始三年，诞女百鬼绫目，益州牧帕里既败，七奈自修同族聚众起兵，拥者百万。谚曰，多言必失，是矣！七奈失言为中原诸侯所恶，蜀地之人亦仇中原，如此至今。",
			Siro: "siro（V始二年），字小白，别号电脑少女，母孕时梦海豚入怀，小白诞即能言，孩提之时即多识胡语，尤善海豚之言，既加冠，应召入宫，拜左将军V海豚候领幽州牧，善骑射，有神弓曰AKM，军中皆呼战神。",
			HanazonoSerena: "花园sarena者（V始三年），青城之猫灵也，清楚三铳士之一，为报帕里之恩追随之，虽体弱多病然擅行刺，V始三年，以松饼鸩杀汉中太守，帕里pro遂建国巴蜀，花园猫不谙世事，常为好事者钓之。V始九年，朝廷出兵百万击巴蜀，大破蜀军，花园猫身中数刀，仍负帕里逃出益州，复还青城，人不知所踪。",
			XiaDi: '下地者，V8之健将也，自群雄并起，囚人草莽之徒自成一国，名曰V8，V8奉绅宝为主，总领V8事宜，次年勒夫以鸩杀之，夺绅宝之权，下地作丹青《不要以为这样就赢了》缅之，领自家军离V8，后为勒夫击，大败，遁于江城。',
			Nekomasu: '狐叔者，原国相也，屡谏朝廷，针砭时弊，谗人间之，放于巴蜀，巴蜀有奇人曰野良喵，叔与野良一见如故，尝与青城饮之，后绊爱起义，屡请狐叔，狐叔自认忠于朝廷，屡拒之，叔素修黄帝之道，善养生之经，建宗“养生”，后日竟成第一宗。',
			NekomiyaHinata: '“猫宫日向者，游侠也，尤善射术，有“飞将”之称，以一人一枪往艾伦格百次余，屠者以千计，日向好游戏，性天然，行事率真常为联动对象捉弄，节目效果斐然，日向家境贫寒，尚不能备衣物，以塑料袋蔽身，为邻人笑，邻人有九石玉、隐神木荫者素与日向交好，昔绊爱首义，日向与玉、木荫筹划建国，后为小人所泄，破之，日向遁于江湖，转个人势，与玉、木荫经营。”',
		},
		skill:{
			//Yomemi
			mokuai:{
				mod:{
					selectTarget:function(card,player,range){
						if(get.name(card)=='sha')
							return range[1]=Math.floor(player.countCards('e'))||1;
					},
				},
				forced:true,
				priority:220,
				trigger:{player:'recoverBegin'},
				filter:function(event,player){
					return true;
				},
				content:function(){
					trigger.num = player.countCards('e')||1;
				},
			},
			yaoji:{
				audio:3,
				audioname:['jike'],
				enable:"phaseUse", 
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0
				},
				filterCard:function(card){
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.type2(card)==get.type2(ui.selected.cards[i]))	return false;
					}
					return true;
				},
				check:function(card){
					if(ui.selected.cards.length)	return 4-get.value(card);
					return 6-get.value(card);
				},
				complexCard:true,
				selectCard:[1,Infinity],
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				selectTarget:function(){
					var player = _status.event.player;
					if(!player.hasSkill('mokuai'))	return 1;
					var min = 1;
					var max = Math.floor(player.countCards('e'))||1;
					return [min,max];
				},
				discard:true,
				multitarget:true,
				//targetprompt:[],
				content:function(){
					'step 0'
					event.targs = targets.slice(0);
					var type = [];
					for(var i=0;i<cards.length;i++){
						type.add(get.type2(cards[i],cards[i].original=='h'?player:false));
					}
					var num = type.length;
					var cards = get.cards(num);
					player.showCards(cards,'致命药剂亮出牌堆');
					var suits = [];
					for(var i=0;i<cards.length;i++){
						suits.push(get.suit(cards[i]));
					}
					event.suits = suits;
					game.cardsGotoOrdering(cards);
					'step 1'
					event.targ = event.targs.shift();
					var suits = event.suits;
					var next=event.targ.chooseToDiscard("弃置与亮出牌花色和数量（"+get.translation(suits)+"）相同的牌", 'he');
					next.set('selectCard',suits.length);
					next.set('complexCard',true);
					next.set('suits',suits);
					next.set('filterCard',function(card){
						var suits = _status.event.suits;
						if(ui.selected.cards.length){
							return get.suit(card) == suits[ui.selected.cards.length];
						}
						else{
							return get.suit(card) == suits[0];
						}
					});
					next.set('ai',function(card){
						return 8-get.useful(card);
					});
					next.autochoose=function(){
						return this.player.countCards('he')==0;
					};
					'step 2'
					if(!result.cards||result.cards.length<_status.event.suits.length){
						event.targ.damage('player',1);
					}
					if(event.targs.length)	event.goto(1);
				},
				ai:{order:2,result:{target:-1}},
			},
			//艾琳
			daimeng:{
				audio:3,
				enable:'phaseUse',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[1,2,3,4];
				},
				filter:function(event,player){
					if(!player.storage.daimeng)	return false;
					for(var i of player.storage.daimeng){
						if(!game.hasPlayer(function(cur){
							return cur.countCards('h')>=(player.countCards('h')+i);
						}))		return true;
					}
				},
				content:function(){
					'step 0'
					event.videoId = lib.status.videoId++;
					var numberlist = [];
					for(var i of player.storage.daimeng){
						var c = get.cnNumber(i);
						numberlist.push(['', i, c, i, 'div3']);
					}
					game.broadcastAll(function(id,numberlist){
						var dialog=ui.create.dialog('『贷梦』 选择摸牌：');
						dialog.addText('张数');
						dialog.add([numberlist, 'vcard']);
						dialog.videoId = id;
					}, event.videoId,numberlist);
					'step 1'
					var next = player.chooseButton(true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						var now = button.link;
						var player = _status.event.player;
						return !game.hasPlayer(function(cur){
							return cur.countCards('h')>=(player.countCards('h')+now[1]);
						});
					});
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						event.num = result.links[0][1];
						player.storage.daimeng.remove(event.num);
						player.draw(event.num);
					}
					else event.finish();
					'step 3'
					switch(event.num){
						case 1:player.recover();break;
						case 2:player.link(true);break;
						case 3:player.turnOver();break;
						case 4:{
							var evt=_status.event.getParent('phaseUse');
							if(evt&&evt.name=='phaseUse'){
								evt.skipped=true;
							}
						}break;
					}
				},
				intro:{
					content:'已摸$张牌'
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if(player.needsToDiscard()&&player.storage.daimeng[0]==4)	return -1;
							return 1;
						}
					}
				},
			},
			changsheng:{
				unique:true,
				skillAnimation:true,
				animationColor:'fire',
				trigger:{player:'dying'},
				priority:10,
				filter:function(event,player){
					return player.hp<3&&player.storage.changsheng!='over';
				},
				forced:true,
				content:function(){
					'step 0'
					player.discard(player.getCards('hej'));
					player.recover(3-player.hp);
					'step 1'
					if(player.storage.daimeng.length!=4){
						var next = game.createEvent('resetSkill');
						[next.player,next.resetSkill] = [player,'daimeng']
						next.setContent(function(){
							player.popup('重置');
							player.storage.daimeng=[1,2,3,4];
						});
					}
					'step 2'
					player.storage.changsheng='over';
					player.awakenSkill('changsheng');
					trigger.player.addTempSkill('changsheng_diao',{target:'phaseBegin'});
					game.broadcastAll(function(splayer){
							splayer.out('changsheng_diao');
						},trigger.player
					)
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
										splayer.in('changsheng_diao');
									},player
								)
							}
							return true;
	
						},
						intro:{
							content:'移除游戏外'
						},
						content:function(){
							game.broadcastAll(function(splayer){
								_status.dying.remove(splayer);
							},player)
							player.removeSkill('changsheng_diao');
						}
					},
				}
			},
			//猫宫
			yuchong:{
				audio:2,
				group:['yuchong_unbeDis','yuchong_unRes'],
			//	group:['yuchong_dist' , 'yuchong_uneq'],
			//	subSkill: 
			//	{			
			//		dist:{			
			//			mod:{
								//距离变化
			//					attackFrom:function(from,to,distance){
			//						if(from.getEquip(1))
			//						{
			//							return distance-1; 
			//						}                
			//					},
			//					globalTo:function(from,to,distance){
			//						if(to.getEquip(1))
			//						{
			//							return distance+1;
			//						}
			//					},
								//无法弃置
				subSkill:{
					unbeDis:{
						mod:{
							canBeDiscarded:function(card,player,target,name,now){
								if(get.subtype(card)=='equip1'){
										return false;
									}
								},
							}
					},
					unRes:{
						audio:'yuchong',
						mod:{
							cardname:function(card,player){
								if(player.getEquip(1)){
									if(get.subtype(card)=='equip1'){  
										return 'sha';
									}
								}
							},
						},
						trigger:{player:'useCard1'},
						firstDo:true,
						forced:	true,
						filter:function(event,player){
							if(!player.getEquip(1))		return false;
							return get.subtype(event.cards[0])=='equip1';
						},
						content:function(){
							if(trigger.addCount!==false){
								trigger.addCount=false;
								var stat=player.getStat();
								if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
							}
						},
					}
				}
			//		},
					//无视防具
					/*uneq:{
						
						trigger:{player:'useCardToPlayered'},
						forced:true,
						priority:9,
						filter:function(event,player){
							if(!player.getEquip(1))		return false;
							return event.card.name=='sha'||get.type(event.card)=='trick';
						},
						logTarget:'target',
						content:function(){
								player.addTempSkill('unequip');
						},
					}*/
			//	}
			},										
			songzang:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				priority:8,
				filter:function(event,player){
					return event.card.name=='sha'&&!(event.target.maxHp/2 < event.target.hp);
				},
				logTarget:'target',
				content:function(){
						//无法被响应	
					//trigger.getParent().directHit.add(trigger.target);
						//伤害+1
					trigger.getParent().baseDamage++;
					trigger.target.addTempSkill('songzang2');
					trigger.target.addTempSkill('songzang4');
					trigger.target.storage.songzang2.add(trigger.card);
				},
				ai:{
					damageBonus:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||!get.tag(arg.card,'damage')
						){
							return arg.card.name=='sha'&&!(arg.target.maxHp/2 < arg.target.hp);
						}
					},
					effect:{
						player:function(card,player,target,current){
							if(card.name=='sha'&&current<0) return 0.5;
						}
					}
				}
			},
			songzang2:{
				firstDo:true,
				//ai:{unequip2:true},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage','damageCancelled','damageZero'],
					target:['shaMiss','useCardToExcluded'],
				},
				filter:function(event,player){
					return player.storage.songzang2&&event.card&&player.storage.songzang2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.songzang2.remove(trigger.card);
					if(!player.storage.songzang2.length) player.removeSkill('songzang2');
				},
			},
			songzang3:{
				mod:{
					cardSavable:function(card){
						if(card.name=='tao') return false;
					},
				},
			},
			songzang4:{
				trigger:{player:'dyingBegin'},
				forced:true,
				silent:true,
				firstDo:true,
				filter:function(event,player){
					return event.getParent(2).songzang_buffed=true;
				},
				content:function(){
					player.addTempSkill('songzang3',{global:['dyingEnd','phaseEnd']});
				},
			},
			zhimao:{
				trigger:{target:'useCardToBegin'},
			//	forced:true,
				priority:15,
				filter:function(event,player){
					if(!event.player||event.player==player) return false;
				//使用牌者在攻击范围外	if(player.inRange(event.player)) return false;
					if(get.distance(event.player,player,'pure')==1)	return false;
					return (get.type(event.card)=='trick');		//牌为锦囊牌
				},
				content:function(){
					'step 0'
					var target = trigger.player;			
					if(target.getEquip(1)){
						player.chooseControlList(
							['取消之并抽一张牌',
							'获得'+get.translation(target)+'的武器牌，视为对其使用【杀】'],
							true,function(event,player){
							return _status.event.index;
						});
					}
					else{
			//			player.chooseControlList(
			//				['抽一张牌',
			//				'视为对其使用【杀】'],
			//				true,function(event,player){
			//				return _status.event.index;
			//			});
						player.draw();
						trigger.cancel();
					}
					'step 1'
					var target = trigger.player;
			//			if(target.getEquip(1)){
						if(result.index==1){
							player.line(target);
							player.gain(target.getEquip(1),target,'give','bySelf');
							player.useCard({name:'sha',isCard:false},target).animate=false;
						}	
						else if(result.index==0){
							player.draw();
							trigger.cancel();
						}						
			//		}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card,'trick')=='trick'&&get.distance(player,target,'pure')>1) return 'zeroplayertarget';
						},
					}
				}
			},
			//lulu
			duixian:{
				trigger:{player:'useCardToPlayer',target:'useCardToPlayer'},
				usable:1,
				filter:function(event,player){
					return get.name(event.card) =='sha';
				},
				check:function(event,player){
					return event.target == player||!event.target.hasSkillTag('notrick');
				},
				prompt2:function(event,player){
					return '你可将'+(event.player==player?'你':get.translation(event.player))+'使用的'+get.translation(event.card)+'改为【决斗】';
				},
				content:function(){
					'step 0'
					if(!trigger.getParent().addedSkill)	trigger.getParent().addedSkill = [];
					trigger.getParent().addedSkill.add('duixian');
					'step 1'
					trigger.card.name = 'juedou';
					if(get.itemtype(trigger.card)=='card'){
						var next=game.createEvent('duixian_clear');
						next.card=trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function(){
							card.name = sha;
						});
					}
				},
				group:['duixian_drawBy','duixian_disCard'],
				subSkill:{
					drawBy:{
						trigger:{global:'damageEnd'},
						forced:	true,
						filter:function(event,player){
							return event.card&&get.name(event.card) =='juedou'&&event.getParent(2).name=='useCard'&&event.getParent(2).addedSkill&&event.getParent(2).addedSkill.contains('duixian')&&event.player==player;
						},
						content:function(){
							player.draw(2);
						},
					},
					disCard:{
						trigger:{global:'damage'},
						prompt2:'你可弃置对方一张牌',
						frequent:true,
						filter:function(event,player){
							return event.card&&get.name(event.card) =='juedou'&&event.getParent(2).name=='useCard'&&event.getParent(2).addedSkill&&event.getParent(2).addedSkill.contains('duixian')&&event.player!=player&&event.player.countCards('he');
						},
						content:function(){
							player.discardPlayerCard('###『守峡』###弃置对方一张牌',trigger.player,'he');
						},
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.name(card)=='sha'){
								if(target.hasSha())		return [1,0,0,-2];
								if(target.hp==1)		return [1,0,1,0];
								return [1,1,0,-1];
							}
						}
					}
				}
			},
			gutai:{
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					if(event.player!=player&&event.getParent().player!=player)	return false;
					return event.card&&event.getParent().name==event.card.name&&event.getParent().targets.contains(event.player)&&event.getParent().targets[event.getParent().targets.length-1]!=event.player;
				},
				check:function(event,player){
					var shouxia = event.getParent().targets.splice(event.getParent().targets.indexOf(event.player));
					var effect = 0;
					for(var i=0;i<shouxia.length;i++){
						effect+=get.effect(shouxia[i],event.card,event.getParent().player,player);
					}
					return effect<0;
				},
				logTarget:function(event){
					var targets=  event.getParent().targets.slice(0);
					return targets.splice(targets.indexOf(event.player)+1);
				},
				content:function(){
					trigger.getParent().targets.splice(trigger.getParent().targets.indexOf(trigger.player)+1);
				},
			},

			caibu: {
				init: function(player) {
					if (!player.storage.caibu) {
						player.storage.caibu = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '财',
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
			luecai: {
				audio:2,
				group: ['caibu', 'luecai_draw'],
				enable: 'phaseUse',
				usable: 1,
				filterTarget:function(card,player,target){
					if(target.countCards('he')==0||target.countCards('h')==player.countCards('h')) return false;
					return true;
				},
				content: function() {
					'step 0'
					if (target.countCards('h') > player.countCards('h')) {
						player.choosePlayerCard(target, 'he', true);
					}
					else if (target.countCards('h') < player.countCards('h')) {
						target.chooseCard('he', true)
					}
					'step 1'
					if (target.countCards('h') > player.countCards('h')) {
						event.card = result.links[0];
					}
					else if (target.countCards('h') < player.countCards('h')) {
						event.card = result.cards[0];
					} 
					'step 2'
					if(result.bool){
						target.$give(event.card, player, false);
						target.lose(event.card, ui.special, 'toStorage');
						player.storage.caibu.push(event.card);
						player.syncStorage('caibu');
						player.markSkill('caibu');
						player.showCards(player.storage.caibu, '财布');
					}
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if (target.countCards('h') > player.countCards('h')){
								return lib.card.shunshou.ai.result.target.apply(this,arguments);
							}
							else{
								return -1.5;
							} 
						},
						player:function(player,target){
							return 1.5;
						},
					},
					expose:0.2,
					threaten:1.1
				},
				subSkill: {
					draw: {
						//audio:false,
						trigger: {
							player: 'phaseBegin'
						},
						filter: function(event, player) {
							return player.storage.caibu.length > 0;
						},
						silent:true,
						content: function() {
							'step 0'
							player.chooseCardButton(get.prompt('luecai')+'移去任意张财布', [1, Infinity], player.storage.caibu);
							'step 1'
							if (result.bool) {
								player.logSkill('luecai_draw');
								var cards = result.links;
								player.$throw(cards);
								game.cardsDiscard(cards);
								//game.trySkillAudio('luecai_draw',player);
								cards.forEach(function(card) {
									player.storage.caibu.remove(card);
								});
								player.syncStorage('caibu');
								player.draw(cards.length);
							}
							'step 2'
							if (!player.storage.caibu.length) {
								player.unmarkSkill('caibu');
							}
						}
					}
				},
			},
			xiaoyan: {
				group: ['caibu', 'xiaoyan_res', 'xiaoyan_dam', 'xiaoyan_highlight', 'xiaoyan_clear'],
				subSkill: {
					res: {
						direct: true,
						trigger:{
							player:"useCard",
						},
						// filter:function(event,player){
						// 	return event.card
						// 		&& (
						// 			get.type(event.card)=='trick'||get.type(event.card)=='basic' 
						// 			&& !['shan','tao','jiu','du'].contains(event.card.name)
						// 		)
						// 		&& game.hasPlayer(function(current){
						// 			return current!=player && current.countCards('h') < player.countCards('h')
						// 				&& event.targets.contains(current);
						// 		});
						// },
						content:function(){
							trigger.directHit.addArray(game.filterPlayer(function(current){
								return current.countCards('h') < player.countCards('h')
							}));
						},
					},
					dam: {
						audio:'xiaoyan',
						forced: true,
						trigger: {
							source: 'damageBegin1',
							player: 'damageBegin3'
						},
						firstDo:true,
						filter: function(event, player) {
							if (!event.card || !get.suit(event.card)) return false;
							var chk = false;
							player.storage.caibu.forEach(function(c) {
								if (get.suit(c) == get.suit(event.card)) chk = true;
							});
							return chk;
						},
						content: function() {
							trigger.num++;
						},
						ai:{
							damageBonus:true,
							skillTagFilter:function(player,tag,arg){
								if(!arg||!arg.card||!get.tag(arg.card,'damage')
								){
									var chk = false;
									player.storage.caibu.forEach(function(c){
										if(get.suit(c)==get.suit(arg.card))	chk = true;
									});
									return chk;
								}
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'damage')&&target.storage.caibu&&target.storage.caibu.length){
										var chk = false;
										target.storage.caibu.forEach(function(c) {
											if (get.suit(c) == get.suit(card)) chk = true;
										});
										if(chk)	return [1,0,2,-1];
									}
								},
								player:function(card,player,target,current){
									if(get.tag(card,'damage')&&player.storage.caibu&&player.storage.caibu.length){
										var chk = false;
										player.storage.caibu.forEach(function(c) {
											if (get.suit(c) == get.suit(card)) chk = true;
										});
										if(chk)	return [1,0,2,-1];
									}
								}
							}
						}
					},
					highlight: {
						direct: true,
						trigger: {
							player: 'useCardToPlayered',
							target: 'useCardToPlayered',
						},
						filter: function(event, player) {
							if (!event.card || !get.suit(event.card)) return false;
							if (!get.tag(event.card,'damage')) return false;
							var chk = false;
							player.storage.caibu.forEach(function(c) {
								if (get.suit(c) == get.suit(event.card)) chk = true;
							});
							return chk;
						},
						content: function() {
							var buff = trigger.player == player ? '.player_buff' : '.player_nerf';
							game.broadcastAll(function(player, buff){
								player.node.xiaoyan = ui.create.div(buff ,player.node.avatar);
								player.node.xiaoyan2 = ui.create.div(buff ,player.node.avatar2);
							}, player, buff);
							game.delayx();
						}
					},
					clear: {
						direct: true,
						silent: true,
						trigger: {
							global: ['useCardAfter', 'respondAfter'],
						},
						content: function() {
							if(player.node.xiaoyan){
								game.broadcastAll(function(player){
									player.node.xiaoyan.delete();
									player.node.xiaoyan2.delete();
									delete player.node.xiaoyan;
									delete player.node.xiaoyan2;
								}, player);
							}
						}
					}
				}
			},

			shiyilijia: {
				audio:2,
				group: ['shiyilijia_draw'],
				enable: 'phaseUse',
				usable: 1,
				init: function(player) {
					if (player.storage.shiyilijia == undefined) {
						player.storage.shiyilijia = 0;
					}
				},
				filter: function(event, player) {
					return player.countCards('h');
				},
				filterCard:lib.filter.cardDiscardable,
				selectCard:-1,
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 7-get.value(card)
				},
				content:function() {
					player.storage.shiyilijia = cards.length;
					player.discard(cards);
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.name(card)=='tao'){
							var damage = (player.maxHp-player.hp)*2;
							return num+damage;
						}
					},
				},
				ai:{order:4,result:{player:1}},
				subSkill: {
					draw: {
						forced: true,
						trigger: {
							player: 'phaseEnd'
						},
						filter: function(event, player) {
							return player.storage.shiyilijia;
						},
						content: function() {
							'step 0'
							player.draw(player.storage.shiyilijia);
							'step 1'
							player.storage.shiyilijia = 0;
						}
					}
				}
			},
			seqinghuashen: {
				audio:2,
				trigger: {global:'useCardAfter'},
				logTarget:'player',
				filter:function(event,player){
					return event.card.name=='tao'
						&&event.player!=player
						&&get.itemtype(event.cards)=='cards'
						&&get.position(event.cards[0],true)=='o';
				},
				content:function() {
					'step 0'
					trigger.player.draw(player);
					'step 1'
					var target = trigger.player;
					if (target.countGainableCards(player,'he')) {
						player.gainPlayerCard('he',target,true);
					}
				}
			},

			xinluezhili: {
				unique:true,
				zhuSkill:true,
			},
			DDzhanshou: {
				audio:3,
				trigger: {
					player:'useCard2'
				},
				direct:true,
				log:false,
				filter:function(event,player){
					return event.targets&&event.targets.length;
				},
				check: function(event, player) {
					return event.targets.filter(function(target){
						if(get.attitude(_status.event.player,target)>0&&target.countCards('h')<=3)	return true;
						if(get.attitude(_status.event.player,target)<=0&&target.countCards('he')>3)	return false;
						return false;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('DDzhanshou'),function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						if(get.attitude(_status.event.player,target)<0&&target.countCards('h')==0)	return 0;
						if(get.attitude(_status.event.player,target)>0&&target.countCards('h')<=3)	return 4+get.attitude(_status.event.player,target);
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if (result.bool) {
						event.tar = result.targets[0];
						if (player.hasZhuSkill('xinluezhili') && player != event.tar) {
							event.tar.addSkill('xinluezhili_draw');
						}
						var count = (event.tar.countCards('h') >= player.countCards('h')) 
									+ (event.tar.hp >= player.hp) 
									+ (event.tar.countCards('e') >= player.countCards('e'));
						player.choosePlayerCard(event.tar, 'he', [1, count], "移除至多" + count + "张牌").set('ai',function(button){
							var player=_status.event.player;
							var target=_status.event.target;
							var count=_status.event.count;
							var info = get.info(button.link)
							if(get.attitude(player,target)>=0){
								if(target.countCards('h')<=count){
									if(ui.selected.buttons.length<target.countCards('h')&&get.position(button.link)=='h'){
										return 12;
									}
								}
								if(info.onLose&&get.position(button.link)=='e')		return 8;
								if(get.value(button.link,target)<0)	return 6;
								return 0;
							}
							else{
								if(info.onLose&&get.position(button.link)=='e')		return 0;
								return get.value(button.link);
							}
						}).set('count',count);
					}
					'step 2'
					if(result.bool){
						player.logSkill('DDzhanshou', event.tar);
						if(event.tar.storage.DDzhanshou_card){
							event.tar.storage.DDzhanshou_card = event.tar.storage.DDzhanshou_card.concat(result.links);
						}
						else {
							event.tar.storage.DDzhanshou_card = result.links.slice(0);
						}
						// game.addVideo('storage', event.tar, ['DDzhanshou_card',get.cardsInfo(event.tar.storage.DDzhanshou_card),'cards']);
						event.tar.addSkill('DDzhanshou_card');
						event.tar.lose(result.links,ui.special,'toStorage');
					}
					'step 3'
					if (event.tar && event.tar.countCards('h') == 0) {
						event.tar.draw();
					}
					'step 4'
					if (event.tar && event.tar.hasSkill('xinluezhili_draw')) {
						event.tar.removeSkill('xinluezhili_draw');
					}
				},
				subSkill: {
					card: {
						trigger:{
							global:'phaseEnd'
						},
						audio:false,
						mark:true,
						direct:true,
						intro:{
							content:'cardCount',
							onunmark:function(storage,player){
								if(storage&&storage.length){
									player.$throw(storage,1000);
									game.cardsDiscard(storage);
									game.log(storage,'被置入了弃牌堆');
									storage.length=0;
								}
							},
						},
						content:function(){
							if(player.storage.DDzhanshou_card){
								player.gain(player.storage.DDzhanshou_card,'fromStorage');
								delete player.storage.DDzhanshou_card;
							}
							player.removeSkill('DDzhanshou_card');
						},
					}
				}
			},
			xinluezhili_draw: {
				trigger: {
					player: 'loseAfter',
				},
				filter: function(event, player) {
					if (player.countCards('h')) return false;
					var target = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					return event.hs&&event.hs.length>0 && target.length;
				},
				filter: function(event, player) {
					var targets = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					return get.attitude(player,targets[0])>0;
				},
				content: function() {
					var targets = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					if (targets.length) {
						targets[0].draw(player);
					}
				}
			},


			maoliang: {
				init:function (player){
					player.storage.maoliang=[];
				},
				marktext: '粮',
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							storage.length=0;
						}
					},
				},
			},
			jiumao: {
				audio:2,
				trigger: {
					player: 'phaseUseEnd',
				},
				filter: function(event, player) {
					return event.player.countCards('h');
				},
				direct:true,
				content: function() {
					'step 0'
					event.target = trigger.player;
					event.target.chooseCard('he', [1, Infinity]).set('ai', function(card) {
						var player = _status.event.player;
						if (player.needsToDiscard()&&ui.selected.cards.length<player.countCards('h')) return 6 - get.useful(card);
						else return 2 - get.useful(card);
					}).set('prompt','###'+get.prompt('jiumao',player)+'###你在弃牌阶段开始时，可将任意数量的牌放在'+get.translation(player)+'武将牌旁，称为“猫粮”');
					'step 1'
					if (result.bool) {
						player.logSkill('maoliang',event.target);
						event.target.loseToSpecial(result.cards,'maoliang',player);
						event.target.$give(result.cards, player, false);
						if(!player.storage.maoliang){
							player.storage.maoliang = [];
						}
						player.storage.maoliang.addArray(result.cards);
						player.markSkill('maoliang');
						player.showCards(player.storage.maoliang, "猫粮");
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				group: ['maoliang','jiumao_cardDisable','jiumao_lose'],
				subSkill:{
					used:{},
					cardDisable:{
						mod:{
							cardEnabled2:function(cardx,player){
								if(player.countCards('s',function(card){
									return card.hasGaintag('maoliang');
								})){
									if(get.position(cardx)=='s'&&cardx.hasGaintag('maoliang')&&player.hasSkill('jiumao_used'))	return false;
								}
							}
						},
						trigger:{
							player:'useCard1',
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function (event,player){
							return player.getHistory('lose',function(evt){
								if(evt.getParent()!=event) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('maoliang')) return true;
								}
								return false;
							}).length>0;
						},
						content:function (){
							player.addTempSkill('jiumao_used');
						},
					},
					lose:{
						trigger:{player:'loseEnd'},
						firstDo:true,
						silent:true,
						filter:function(event,player){
							if(!event.ss||!event.ss.length) return false;
							var maoliang=player.getStorage('maoliang');
							if(!maoliang.length) return false;
							return event.ss.filter(function(card){
								return maoliang.contains(card);
							}).length>0;
						},
						content:function(){
							player.storage.maoliang.removeArray(trigger.ss);
							player.updateMarks();
						},
					}
				},
			},
			enfan: {
				subSkill:{
					count:{
						trigger:{
							global:"recoverBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function (event,player){
							if(!event.card) return false;
							if(!event.source||event.source!=player) return false;
							if(!event.player.isDying()) return false;
							if(event.player.storage.yizhan_mark!=undefined) return false;
							return true;
						},
						content:function (){
							trigger.enfan=true;
						},
						sub:true,
					},
				},
				audio:true,
				group:['enfan_count'],
				trigger:{
					global:"recoverAfter",
				},
				filter:function (event,player){
					if(event.player.isDying()) return false;
					return event.enfan==true;
				},
				direct:true,
				content:function (){
					'step 0'
					event.target = trigger.player;
					player.chooseCard('s',[1,Infinity],function(card){
						return card.hasGaintag('maoliang')
					}).set('logSkill',['enfan',event.target]).set('ai',function(card){
						var target = _status.event.target;
						return get.value(card,target)/1.5-target.countCards('h');
					}).set('target',event.target).set('prompt',get.prompt2('enfan',player));
					'step 1'
					if(result.bool&&result.cards){
						player.give(result.cards,event.target,false);
					}
					else	event.finish();
					'step 2'
					if(player.countCards('h')==event.target.countCards('h')&&player.storage.maoliang.length){
						console.log(2)
						event.target.chooseCardButton(player.storage.maoliang.slice(0)).set('filterButton',function(button){
							var player = _status.event.player;
							return ['basic','trick'].contains(get.type(button.link))&&player.hasUseTarget(button.link);
						}).set('ai',function(button){
							var player = _status.event.player;
							return player.getUseValue(button.link);
						}).set('prompt','可以视为使用一张'+get.translation(player)+'的“猫粮”');
					}
					else	event.finish();
					'step 3'
					if(result.bool&&result.links){
						var card = result.links[0];
						event.target.chooseUseTarget(game.createCard(card));
					}
				},
			},
			shiqi: {
				audio:1,
				trigger:{global:'phaseDrawBegin'},
				forced:true,
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('shiqi')||event.player.group!=player.group)	return false;
					return true;
				},
				logTarget:'player',
				content: function() {
					trigger.num++;
				},
			},

			yinliu: {
				enable: 'phaseUse',
				usable:1,
				filter: function(event, player) {
					return	player.countDiscardableCards(player,'he')>0;
				},
				content: function() {
					'step 0'
					player.chooseToDiscard('###『引流』###弃置至多三张牌','he', [1,3], true).set('ai',function(card){
						var suit = get.suit(card);
						for(var i=0;i<ui.selected.cards.length;i++){
							if(suit==get.suit(ui.selected.cards[i])) return -Math.random();
						}
						if (player.needsToDiscard()) return 7-get.useful(card)+Math.random();
						else return 5-get.useful(card)+Math.random();
					});
					'step 1'
					if(result.bool&&result.cards){
						event.cards = result.cards;
					}else{
						event.finish();
					}
					'step 2'
					game.delayx();
					if(player.countCards('h')==0){
						player.addTempSkill('yinliu_end');
					}
					while (true) {
						var card=get.cards()[0]
						player.showCards(card);
						player.gain(card, 'gain2');
						var chk = false;
						event.cards.forEach(function(cur) {
							if (get.suit(cur) == get.suit(card)) chk = true;
						})
						if (!chk) break;
					}
				},
				ai:{
					order:5,
					result:{
						player:1,
					},
				},
				subSkill: {
					end: {
						trigger: {
							player: 'phaseEnd',
						},
						filter: function(event, player) {
							return player.countCards('he')>0;
						},
						content: function () {
							player.insertEvent('yinliu', lib.skill.yinliu.content);
						},
					}
				}
			},
			dunzou: {
				trigger: {
					global:'useCardAfter',
				},
				filter: function(event, player) {
					//console.log(_status.currentPhase);
					return 	player!=_status.currentPhase &&
							// event.player != player &&
							event.card && 
							get.suit(event.card) == 'club' &&
							event.targets.contains(player);
				},
				content: function () {
					player.addTempSkill('dunzou_enable',{target:'phaseBegin'});//移除游戏
					game.broadcastAll(function(splayer){
						splayer.out('dunzou_enable');
					},player)
				},
			},
			dunzou_enable:{
				trigger:{global:'phaseEnd'},
				mark:true,
				direct:true,
				filter:function(event,player){
					game.broadcastAll(function(splayer){
						splayer.in('dunzou_enable');
					},player)
					//
					return true;
				},
				intro:{
					content:'移除游戏外'
				},
				content:function(){
					game.broadcastAll(function(splayer){
						_status.dying.remove(splayer);
					},player)
					player.removeSkill('dunzou_enable');
				}
			},

			milijianying: {
				direct: true,
				mark: true,
				marktext: '性',
				locked: true,
				intro: {
					content: function(storage, player, skill) {
						return "当前为" + get.translation(player.sex);
					},
				},
				trigger: {
					player: 'useCardAfter',
				},
				filter: function(event, player) {
					return get.name(event.card) == 'sha';
				},
				content: function() {
					if (player.sex == 'female') {
						player.sex = 'male';
					}
					else {
						player.sex = 'female'
					}
					player.markSkill('milijianying');
				},
				group: 'milijianying_cixiong',
				subSkill: {
					cixiong: {
						equipSkill:true,
						noHidden:true,
						inherit:'cixiong_skill',
					},
				}
			},
			dianyinchuancheng: {
				trigger: {
					player:'damageEnd',
				},
				direct: true,
				content: function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					if(event.count)
						event.count--;
					var X = game.countPlayer(function(cur) {
						return cur.hp >= player.hp;
					})
					player.storage.Xvalue=X;
					player.chooseTarget("你可以与一名与你手牌数差不大于" + player.storage.Xvalue + "的角色交换手牌",function(card,player,target){
						return Math.abs(player.countCards('h') - target.countCards('h')) <= player.storage.Xvalue
							// && target != player;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return Math.abs(player.countCards('h') - target.countCards('h'));
						}
						return att/3;
					});
					"step 2"
					delete player.storage.Xvalue;
					if(result.bool){
						event.tar = result.targets[0];
						player.logSkill('dianyinchuancheng', event.tar);
						player.swapHandcards(event.tar);
					}
					else{
						event.finish();
					}
					'step 3'
					if (event.tar) {
						var max = Math.max(player.countCards('h'), event.tar.countCards('h'));
						if(max>player.countCards('h'))	player.gain(get.cards(max-player.countCards('h')),'draw','log');
						if(max>event.tar.countCards('h'))	event.tar.gain(get.cards(max-event.tar.countCards('h')),'draw','log');
						if (event.count) event.goto(1);
					}
				},
			},

			shushi:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				trigger:{player:['phaseJudgeBegin','phaseDrawBegin','phaseUseBegin','phaseDiscardBegin']},
				priority:41,
				filter:function(event,player){
					return (player.storage.shushi<Math.max(game.countPlayer(),5));
				},
				prompt:function(event,player){
					return get.translation(event.name)+'开始,'+get.prompt('shushi');
				},
				content:function(){
					'step 0'
					var list = ['不观看牌'];
					var att = 5;
					var prompt2 = player.storage.shushi?'你本回合已看'+get.cnNumber(player.storage.shushi)+'张牌':'你本回合未看牌';
					if(player.countCards('h',{type:'trick'})<2||['phaseDraw','phaseUse'].contains(trigger.name))	att = 0;
					for(var i=1;i<=(Math.max(game.countPlayer(),5)-player.storage.shushi);i++){
						list.push('观看'+get.cnNumber(i)+'张牌');
					}
					player.chooseControlList(prompt2
					,list,true,function(){
						return _status.event.att;
					}).set('att',att);
					'step 1'
					if(result.index == 0){
						event.finish();
					}else if(result.index){
						player.storage.shushi += result.index;
						player.chooseCardButton(result.index,get.cards(result.index),true,'『书史』：按顺序将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
							var player = _status.event.player;
							var next = _status.event.phase=='phaseJudge'?player:player.getNext();
							var att = get.attitude(player,next);
							var card = button.link;
							var judge = next.getCards('j')[ui.selected.buttons.length];
							if(judge){
								return get.judge(judge)(card)*att;
							}
							return next.getUseValue(card)*att;
						}).set('phase',trigger.name)
					}
					'step 2'
					if(result.bool){
						var list=result.links.slice(0);
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
					}
				},
				mod:{
					maxHandcard:function(player,num){
						return num+=Math.max(game.countPlayer(),5)-player.storage.shushi;
					},
				},
				group:'shushi_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.shushi;
						},
						content:function(){
							player.storage.shushi = 0;
						}
					},
				},
				ai:{
					guanxing:true,
				}
			},
			zengzhi:{
				trigger:{player:'useCardAfter'},
				priority:41,
				filter:function(event,player){
					if(!player.isPhaseUsing()||!event.card.isCard)				return false;
					var card=event.card;
					var info=get.info(card);
					if(info.type!='trick'||info.allowMultiple==false)	return false;
					if(event.targets&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return event.targets.contains(current)&&lib.filter.targetEnabled2(card,player,current);
						})){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					event.card = trigger.card;
					player.judge(function(card){
						return get.suit(card)==get.suit(_status.event.getParent('zengzhi').card)?2:-2;
					});
					'step 1'
					if(result.bool){
						var card=game.createCard(event.card.name,event.card.suit,event.card.number,event.card.nature);
						player.useCard(card,(trigger._targets||trigger.targets).slice(0),trigger.cards).skill = trigger.skill||'zengzhi';
					}
				},
			},
			
			shuangshoujiaoying:{
				trigger:{player:'shaBegin'},
				content:function(){
					'step 0'
					player.chooseBool('【确定】展示对方手牌，【取消】展示自己手牌');
					'step 1'
					event.replayers=[];
					if(result.bool){
						event.chooseBool=true;
						event.replayers=trigger.targets;
					}
					else{
						event.chooseBool=false;
						event.replayers.add(player);
					}
					'step 2'
					if(event.replayers.length>0){
						event.replayer=event.replayers[0];
						event.cards=event.replayer.getCards('h');
						event.replayer.showHandcards();
						game.delayx();
					}
					else{
						event.finish();
					}
					'step 3'
					event.recards=[];
					if(event.cards&&event.cards.length>0){
						if(player.storage.anyingxuemai){
							for( i of event.cards){
								if(get.suit(i)=='heart'||get.suit(i)=='diamond'){
									event.recards.add(i);
								}
							}
						}
						else{
							for( i of event.cards){
								if(i.name=='shan'){
									event.recards.add(i);
								}
							}
						}
					}
					if(event.recards.length>0){
						event.replayer.lose(event.recards, ui.discardPile);
						event.replayer.$throw(event.recards);
						game.log(event.replayer, '将', event.recards, '置入了弃牌堆');
						event.replayer.draw(event.recards.length);
					}
					'step 4'
					if(event.recards.length>0){
						if(event.replayers.contains(event.replayer)&&event.chooseBool){
							player.draw(1);
						}
						if(player==event.replayer){
							if(trigger.getParent().addCount!==false){
								trigger.getParent().addCount=false;
								var stat=player.getStat();
								if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card.sha--;
							}
						}
					}
					event.replayers.shift();
					if(event.replayers.length>0){
						event.goto(1)
					}
				}
			},
			shuangshoujiaoying_gai:{
				trigger:{player:'shaBegin'},
				content:function(){
					'step 0'
					player.chooseBool('【确定】展示对方手牌，【取消】展示自己手牌');
					'step 1'
					event.replayers=[];
					if(result.bool){
						event.chooseBool=true;
						event.replayers=trigger.targets;
					}
					else{
						event.chooseBool=false;
						event.replayers.add(player);
					}
					'step 2'
					if(event.replayers.length>0){
						event.replayer=event.replayers[0];
						event.cards=event.replayer.getCards('h');
						event.replayer.showHandcards();
						game.delayx();
					}
					else{
						event.finish();
					}
					'step 3'
					event.recards=[];
					if(event.cards&&event.cards.length>0){
						for( i of event.cards){
							if(get.suit(i)=='heart'||get.suit(i)=='diamond'){
								event.recards.add(i);
							}
						}
					}
					if(event.recards.length>0){
						event.replayer.lose(event.recards, ui.discardPile);
						event.replayer.$throw(event.recards);
						game.log(event.replayer, '将', event.recards, '置入了弃牌堆');
						event.replayer.draw(event.recards.length);
					}
					'step 4'
					if(event.recards.length>0){
						if(event.replayers.contains(event.replayer)&&event.chooseBool){
							player.draw(1);
						}
						if(player==event.replayer){
							player.getStat().card.sha--;
						}
					}
					event.replayers.shift();
					if(event.replayers.length>0){
						event.goto(1)
					}
				}
			},
			anyingxuemai:{
				trigger:{
					player:"dying",
				},
				skillAnimation:true,
				animationColor:'metal',
				audio:2,
				unique:true,
				limited:true,
				// enable:'chooseToUse',
				//viewAs:{name:'tao'},
				init:function(player){
					player.storage.anyingxuemai=false;
				},
				mark:true,
				filter:function(event,player){
					//console.log(event,player);
					if(event.name!='dying') return false;
					//if(player!=event.dying) return false;
					if(player.storage.anyingxuemai) return false;
					if(player.countCards('h')==0) return false;
					return true;
				},
				content:function(){
					"step 0"
					player.awakenSkill('anyingxuemai');
					player.showHandcards();
					var handcards=player.getCards('h');
					var suitlist=[0,0,0,0];
					for(i of handcards){
						if(get.suit(i)=='spade'){
							suitlist[0]++;
						}
						if(get.suit(i)=='heart'){
							suitlist[1]++;
						}
						if(get.suit(i)=='diamond'){
							suitlist[2]++;
						}
						if(get.suit(i)=='club'){
							suitlist[3]++;
						}
					}
					suitlist.sort();
					var recoverHp=0;
					for(i of suitlist){
						if(i!=0){
							recoverHp=i;
							break;
						}
					}
					player.recover(recoverHp);
					"step 1"
					player.storage.anyingxuemai=true;
					player.removeSkill('shuangshoujiaoying');
					player.addSkill('shuangshoujiaoying_gai');
				},
			},
			//heichuan
			zhengtibuming:{
				audio:5,
				unique: true,
				popup: false,
				trigger:{
					player: ['phaseBegin','phaseEnd','zhengtibuming']
				},
				filter:function(event,player,name){
					return player.storage.zhengtibuming&&player.storage.zhengtibuming.character.length>0;
				},
				group: ['zhengtibuming_init', 'zhengtibuming_onDamaged'],
				init:function(player, skill){
					if(!player.storage[skill]) player.storage[skill]={
						character:[],
						characterskillMap:{}
					};
				},
				content:function(){
					var opts = ['更改亮出的“替身”','随机更换一张“替身”','返回'];
					'step 0'
					//create Dialog
					console.log('zt 0')
					_status.noclearcountdown = true;//mark
					event.videoId=lib.status.videoId++;
					var cards = player.storage.zhengtibuming.character;
					if(player.isOnline2()){//mark
						player.send(function(cards,id){
							var dialog=ui.create.dialog('是否发动【替身】？',[cards,'character']);
							dialog.videoId=id;
						},cards,event.videoId);
					}
					event.dialog=ui.create.dialog(get.prompt('zhengtibuming'),[cards,'character']);
					if(!event.isMine()){
						event.dialog.style.display='none';
					}
					event.dialog.videoId = event.videoId;
					event.closeDialog = (player, videoId)=>{
						if(player.isOnline2()){
							player.send('closeDialog', videoId);
						}
						event.dialog.close();
						delete _status.noclearcountdown;
						if(!_status.noclearcountdown){
							game.stopCountChoose();
						}
					};
					event.setDialogPrompt=function(id,prompt){
						var dialog=get.idDialog(id);//通过id获取dialog
						if(dialog){
							dialog.content.childNodes[0].innerHTML=prompt;
						}
					}
					event.configPrompt=(id, prompt)=>{
						if(!event.dialog||event.dialog.content.childNodes[0].innerHTML==prompt)return;
						if(player.isOnline2()){
							player.send(this.setDialogPrompt,id,prompt);
						}
						else if(event.isMine()){
							this.setDialogPrompt(id,prompt);
						}
					}
					//choose one control
					if(event.triggername=='zhengtibuming') {
						event._result={control:opts[0]};
					}else {
						//ai
						var cond = event.triggername=='phaseBegin'?'in':'out';
						var aiChoiceSkill = -Infinity;
						for(var i in player.storage.zhengtibuming.characterskillMap){
							var sks = player.storage.zhengtibuming.characterskillMap[i];
							if(!sks)continue;
							for(var j in sks){
								if(get.skillRank(sks[j], cond)>get.skillRank(aiChoiceSkill, cond)){
									aiChoiceSkill = sks[j];
								}
							}
						}

						if(aiChoiceSkill == player.storage.zhengtibuming.currentSkill || get.skillRank(aiChoiceSkill, cond) < 1){
							event.aiOpt=opts[1];
						}else{
							event.aiOpt = opts[0];
						}
						event.aiChoiceSkill = aiChoiceSkill;
						player.chooseControl(opts[0], opts[1],'cancel2').set('ai',function(){
							return _status.event.aiOpt;
						}).set('aiOpt',event.aiOpt);;
					}
					'step 1'
					if(result.control==opts[0]){
						event.goto(3);
					}else if(result.control!=opts[1]){
						event.closeDialog(player, event.videoId);
						event.finish();
						return;
					}
					if(!event.logged){
						player.logSkill('zhengtibuming');
						event.logged=true;
					}
					'step 2'
					event.configPrompt(event.videoId, opts[1]);
					event.closeDialog(player, event.videoId);
					var list = [];
					for(var i=0;i< player.storage.zhengtibuming.character.length;++i){
						var ch = player.storage.zhengtibuming.character[i];
						if(player.storage.zhengtibuming.current && ch == player.storage.zhengtibuming.current) continue;
						list.push(ch);
					}
					if(list.length){
						var selectedTishenId = Math.floor(Math.random()*list.length);
						var selectedTishenName = list[selectedTishenId];
						lib.skill.zhengtibuming.exchangeTishen(player, selectedTishenName);
					}
					event.finish();
					'step 3'
					event.configPrompt(event.videoId, opts[0]);
					//choose one character
					player.chooseButton(true).set('dialog',event.videoId).set('dialog',event.videoId).set('ai',(button)=>{
						return player.storage.zhengtibuming.characterskillMap[button.link].contains(_status.event.aiChoiceSkill)?2.5:0;
					}).set('aiChoiceSkill',event.aiChoiceSkill);;
					'step 4'
					if(result.bool){
						event.prepareCard = result.links[0];
						var func=function(card,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].classList.add('selectedx');
									}
									else{
										dialog.buttons[i].classList.add('unselectable');
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.prepareCard,event.videoId);
						}
						else if(event.isMine()){
							func(event.prepareCard,event.videoId);
						}
						//choose one skill or go back
						var list=player.storage.zhengtibuming.characterskillMap[event.prepareCard].slice(0);
						list.push(opts[2]);
						//ai
						if(!list.contains(event.aiChoiceSkill)) event.aiOpt = list[0];
						else event.aiOpt = event.aiChoiceSkill;
						player.chooseControl(list).set('ai',()=>{
							return _status.event.aiOpt;
						}).set('aiOpt', event.aiOpt);;
					}else{
						event.goto(3);
					}
					'step 5'
						if(result.control == opts[2]){
							var func=function(id){
								var dialog=get.idDialog(id);
								if(dialog){
									for(var i=0;i<dialog.buttons.length;i++){
										dialog.buttons[i].classList.remove('selectedx');
										dialog.buttons[i].classList.remove('unselectable');
									}
								}
							}
							if(player.isOnline2()){
								player.send(func,event.videoId);
							}
							else if(event.isMine()){
								func(event.videoId);
							}
							event.goto(3);
						}else{
							event.closeDialog(player, event.videoId);
							event.finish();
							if(player.storage.zhengtibuming.current!=event.prepareCard){
								player.storage.zhengtibuming.current=event.prepareCard;
								game.broadcastAll(function(character,player){
									player.sex=lib.character[character][0];
									player.group=lib.character[character][1];
									player.node.name.dataset.nature=get.groupnature(player.group);
								},event.prepareCard,player);
							}
							var selectedSkill = result.control;
							player.storage.zhengtibuming.currentSkill=selectedSkill;
							if(!player.additionalSkills.zhengtibuming||!player.additionalSkills.zhengtibuming.contains(selectedSkill)){
								player.addAdditionalSkill('zhengtibuming',selectedSkill);
								player.flashAvatar('zhengtibuming', event.prepareCard);
								game.log(player,'获得技能','#g【'+get.translation(selectedSkill)+'】');
								player.popup(selectedSkill);//mark
								player.syncStorage('zhengtibuming');
								player.updateMarks('zhengtibuming');
							}
						}
				},
				banned:['Kaf'],
				characterFilter:function(character, player){//true is right.
					var info = lib.character[character];
					if(info[1]=='shen')	return false;
					if(Number(info[2])<4&&info[3].length&&info[3].length<=2&&(character.indexOf('re_')!=0&&character.indexOf('sea_')!=0)&&player.hp>1)	return false;//&&Math.random()<0.4
					return character.indexOf('heichuan')==-1&&!player.storage.zhengtibuming.character.contains(character)&&!lib.skill.zhengtibuming.banned.contains(character);
				},
				addTishen:function(player){
					if(!player.storage.zhengtibuming) return;
					if(!_status.characterlist){//mark
						if(_status.connectMode) var list=get.charactersOL();
						else{
							list=get.gainableCharacters(true);
						}
						game.countPlayer2(function(current){
							list.remove(current.name);
							list.remove(current.name1);
							list.remove(current.name2);
							if(current.storage.zhengtibuming&&current.storage.zhengtibuming.character) list.remove(current.storage.zhengtibuming.character);
						});
						_status.characterlist=list;
					}
					if(!_status.characterlist.length) return;
					var selectedId;
					var rollCnt = 0;
					do{
						++rollCnt;
						if(rollCnt > 256){
							var list = [];
							for(var i=0;i<_status.characterlist.length;++i){
								var name = _status.characterlist[i];
								if(!lib.skill.zhengtibuming.characterFilter(name, player))	continue;
								list.push(i);
							}
							if(!list.length) return;
							selectedId = list[Math.floor(Math.random()*list.length)];
							break;
						}
						selectedId = Math.floor(Math.random() * _status.characterlist.length);
					}while(!lib.skill.zhengtibuming.characterFilter(_status.characterlist[selectedId], player));
					var name = _status.characterlist[selectedId];
					var allSkills=lib.character[name][3];
					var skills = [];
					for(var i=0;i<allSkills.length;++i){
						var info = lib.skill[allSkills[i]];
						if(info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill) continue;
						skills.push(allSkills[i]);
					}

					if(skills.length){
						player.storage.zhengtibuming.character.push(name);
						player.storage.zhengtibuming.characterskillMap[name]=skills;
						_status.characterlist.remove(name);
						return name;
					}
					return undefined;
				},
				removeTishens:function(player,links){
					if(!player.storage.zhengtibuming||!links) return;
					if(!(links instanceof Array)) return;
					player.storage.zhengtibuming.character.removeArray(links);
					_status.characterlist.addArray(links);
					game.log(player,'移去了',get.cnNumber(links.length)+'张','#g【替身】')//log
				},
				exchangeTishen:function(player, oriTishen){
					var name = lib.skill.zhengtibuming.addTishen(player);
					if(name){
						lib.skill.zhengtibuming.removeTishens(player, [oriTishen]);
						game.log(player,'获得了',get.cnNumber(1)+'张','#g【替身】')//log
						lib.skill.zhengtibuming.drawCharacters(player,[name]);
					}
				},
				addTishens:function(player, cnt){
					if(!cnt)return;
					var list = [];
					for(var i=0;i<cnt;++i){
						var name = lib.skill.zhengtibuming.addTishen(player);
						if(name) list.push(name);
					}
					if(list.length){
						game.log(player,'获得了',get.cnNumber(list.length)+'张','#g【替身】')//log
						lib.skill.zhengtibuming.drawCharacters(player,list);
					}
				},
				drawCharacters:function(player,list){//copy//mark
					game.broadcastAll(function(player,list){
						if(player.isUnderControl(true)){
							var cards=[];
							for(var i=0;i<list.length;i++){
								var cardname='tishen_card'+list[i];
								lib.card[cardname]={
									fullimage:true,
									image:'character:'+list[i]
								}
								lib.translate[cardname]=get.rawName2(list[i]);
								cards.push(game.createCard(cardname,'',''));
							}
							player.$draw(cards,'nobroadcast');
						}
					},player,list);
				},
				intro:{
					onunmark:function(storage,player){
						_status.characterlist.addArray(storage.character);
						storage.character=[];
					},
					mark:function(dialog,storage,player){
						if(storage&&storage.current) dialog.addSmall([[storage.current],'character']);
						if(storage&&storage.currentSkill) 
							dialog.add('<div><div class="skill">'
								+get.translation(storage.currentSkill).slice(0,2)
								+'</div><div>'+get.skillInfoTranslation(storage.currentSkill,player)
								+'</div></div>');
						if(storage&&storage.character.length){
							if(player.isUnderControl(true)){
								dialog.addSmall([storage.character,'character']);
							}
							else{
								dialog.addText('共有'+get.cnNumber(storage.character.length)+'张“替身”');
							}
						}
						else{
							return '没有替身';
						}
					},
					content:function(storage,player){
							return '共有'+get.cnNumber(storage.character.length)+'张“替身”'
					},
					markcount:function(storage,player){
						if(storage&&storage.character) return storage.character.length;
						return 0;
					}
				},
				subSkill:{
					init:{
						trigger:{
							global:'gameDrawAfter',
							player:'enterGame'
						},
						forced: true,
						popup: false,
						content:function(){
							lib.skill.zhengtibuming.addTishens(player, 3);
							player.syncStorage('zhengtibuming');
							player.markSkill('zhengtibuming');
							var next=game.createEvent('zhengtibuming');
							next.player=player;
							next._trigger=trigger;
							next.triggername='zhengtibuming';
							next.setContent(lib.skill.zhengtibuming.content);
						}
					},
					onDamaged:{
						trigger:{player:'damageEnd'},
						forced: true,
						popup: false,
						content:function(){
							if(trigger.num&&trigger.num>0){
								lib.skill.zhengtibuming.addTishens(player,trigger.num);
								player.syncStorage('zhengtibuming');
								player.updateMarks('zhengtibuming');
							} 
						},
					}
				}
			},
			lunhuizuzhou:{
				locked: true,
				direct: true,
				trigger:{
					player:'recoverBegin'
				},
				group: 'lunhuizuzhou_onDie',
				content:function(){
					if(trigger.source!=trigger.player){
						trigger.cancel();
					}
				},
				// init:function(player, skill){
				// 	player.lastRecover = player.recover;
				// 	player.recover = function(){
				// 		var next = this.lastRecover();
				// 		if(!next)return;
				// 		for(var i=0;i<arguments.length;++i){
				// 			if(get.itemtype(arguments[i])=='player'){
				// 				next.source = _status.event.player;
				// 			}
				// 		}
				// 		if(typeof(next.source)==='undefined') next.source = _status.event.player;
				// 	};
				// },
				// onremove:function(player, skill){
				// 	if(!player.lastRecover) return;
				// 	delete player.recover;
				// 	player.recover = player.lastRecover;
				// 	delete player.lastRecover;
				// },
				subSkill:{
					onDie:{
						trigger:{player:'die'},
						direct:true,
						skillAnimation:true,
						animationColor:'wood',
						forceDie:true,
						content:function(){
							"step 0"
							player.chooseTarget(get.prompt2('lunhuizuzhou'),function(card,player,target){
								return player!=target;//&&_status.event.sourcex!=target;
							}).set('forceDie',true).set('ai',function(target){
								var num=10-get.attitude(_status.event.player,target);
								if(num>0){
									if(target.hp==1){
										num+=2;
									}
									if(target.hp<target.maxHp){
										num+=2;
									}
								}
								return num;
							}).set('sourcex',trigger.source);
							"step 1"
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('lunhuizuzhou',target);
								target.addSkill('lunhuizuzhou');
							}
                        },
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'recover')&&player!=target) return 'zeroplayertarget';
						}
					}
				}
			},
			mingyunniezao:{
				trigger:{global:'judge'},
				zhuSkill: true,
				popup: false,
				filter:function(event,player){
					return player.hasZhuSkill('mingyunniezao')&& event.player.group == player.group && event.player != player;//同势力
				},
				content:function(){//TODO
					"step 0"
					var next=player.chooseBool(
						get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'
						+ get.translation(trigger.player.judging[0])+'，'+get.prompt('mingyunniezao')).set('ai',()=>{
							return Math.random()>0.7;
						});//ai
					"step 1"
					if(result.bool){
						var cards = get.cards(5);
						event.cards = cards;
						player.chooseCardButton('选择牌堆顶的一张牌替代'+get.translation(trigger.player.judging[0]),cards,true).set(
							'ai',
							(button)=>{
								if(!button||!button.link)return 0;
								var trigger = _status.event.getTrigger();
								var player =_status.event.player;
								var oriJudgeCard =_status.event.oriJudgeCard;
								var result=trigger.judge(button.link)-trigger.judge(oriJudgeCard);
								var attitude=get.attitude(player,trigger.player);
								if(attitude==0||result==0)return 0;
								if(attitude >0){
									return result - trigger.judge(button.link)/2;
								}else{
									return -result - trigger.judge(button.link)/2;
								}
							}
							).set('oriJudgeCard', trigger.player.judging[0]);//ai
						}
						else{
							event.finish();
						}
						'step 2'
						if(result.bool){
							event.replaceCard = result.links[0];
							var lastCards = [];
							for(var i=0;i<event.cards.length;++i){
								if(event.cards[i] == event.replaceCard)continue;
								lastCards.push(event.cards[i]);
							}
							if(lastCards.length){
								player.chooseCardButton(lastCards, lastCards.length, '按顺序选择（先选择的在上），将其余牌置于牌堆顶',true).set(
									'ai',
									()=>{
										return 1+Math.random();   
									}
								);//ai
							}
						}else{
							event.finish();
						}
						'step 3'
						if(result.bool){
							var orderdCards=result.links.slice(0);
							while(orderdCards.length){
								ui.cardPile.insertBefore(orderdCards.pop(),ui.cardPile.firstChild);
							}
							player.respond(event.replaceCard, 'mingyunniezao', 'highlight');//mark
							if(trigger.player.judging[0].clone){//mark
								trigger.player.judging[0].clone.classList.remove('thrownhighlight');
								game.broadcast(function(card){
									if(card.clone){
										card.clone.classList.remove('thrownhighlight');
									}
								},trigger.player.judging[0]);
								game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
							}
							game.cardsDiscard(trigger.player.judging[0]);//mark.
							trigger.player.judging[0]=event.replaceCard;
							trigger.orderingCards.addArray([event.replaceCard]);//处理区
							player.logSkill('mingyunniezao');
							game.log(trigger.player,'的判定牌改为',event.replaceCard);
							game.delay(2);//mark
							
						}else{
							event.finish();
						}
				}
			},
			//真白花音
			chenzhu:{
				intro:{
					name: '辰铸',
					content: 'cards'
				},
				init:function(player){
					if(!player.storage.chenzhu)player.storage.chenzhu = [];
				},
				group: ['chenzhu_useWeapon', 'chenzhu_phaseBegin'],
				subSkill:{
					useWeapon:{
						trigger:{global:'useCardEnd'},
						direct: true,
						filter:function(event, player){
							//使用武器牌
							return get.subtype(event.cards[0])=='equip1';
						},
						content:function(){
							//牌堆顶一张牌
							var cards = get.cards();
							//置于武将牌上
							player.markAuto('chenzhu', cards);

							player.$draw(cards);
							game.log(player, '将', cards, '置于武将牌上');
						}
					},
					phaseBegin:{
						trigger:{global:'phaseBegin'},
						filter:function(event, player){
							//回合开始的角色有装备武器牌
							return player.storage.chenzhu&&player.storage.chenzhu.length
							&&event.player&&event.player.getCards('e', {subtype:'equip1'}).length > 0;
						},
						content:function(){
							'step 0'
							if(player.storage.chenzhu&&player.storage.chenzhu.length>0){
								player.chooseButton(['从武将牌上选择一张牌', player.storage.chenzhu], 1, true);
							}else{
								event._result = {bool: false};
							}
							'step 1'
							if(result.bool){
								//从武将牌上选择一张牌
								var cards = result.links;
								player.gain(cards,'gain2');
								player.unmarkAuto('chenzhu',cards);
							}
							'step 2'
							//获取武器牌名
							var weapon = trigger.player.getCards('e', {subtype:'equip1'})[0];
							var oriName = weapon.name;
							var weaponCards = [];
							
							for(var i=0;i<lib.inpile.length;++i){
								if(get.subtype(lib.inpile[i]) == 'equip1') {
									weapon.name = lib.inpile[i];
									weaponCards.push(game.createCard(weapon));
								}
							}
							weapon.name = oriName;

							if(!weaponCards.length){
								event.finish();
								return;
							}
							if(!trigger.player.storage.chenzhu_weaponNameTemp)trigger.player.storage.chenzhu_weaponNameTemp = {};
							trigger.player.storage.chenzhu_weaponNameTemp.card = weapon;
							trigger.player.storage.chenzhu_weaponNameTemp.oriName = oriName;
							event.weapon = weapon;
							//选择一个武器牌名
							player.chooseButton(['将'+get.translation(weapon)+'改变为：', weaponCards], true, 1);
							'step 3'
							if(result.bool){
								//更新武器牌
								game.broadcastAll(function(card, name){
									if(card&&name){
										card.name = name;
										card.init(card);
									}
								}, event.weapon, result.links[0].name);
								//直到下一回合
								trigger.player.addTempSkill('chenzhu_weaponNameTemp', {player:'phaseAfter'});
							}else{
								delete player.storage.chenzhu_weaponNameTemp;
							}
						}
					},
					weaponNameTemp:{
						onremove:function(player){
							if(!player.storage.chenzhu_weaponNameTemp){
								return;
							}
							//恢复原武器牌
							game.broadcastAll(function(card, name){
								if(card&&name){
									card.name = name;
									card.init(card);
								}
							}, player.storage.chenzhu_weaponNameTemp.card, player.storage.chenzhu_weaponNameTemp.oriName);
							delete player.storage.chenzhu_weaponNameTemp;
						}
					}
				}
			},
			yutuo:{
				audio:2,
				mark: true,
				trigger:{player: 'damageBegin'},
				filter:function(event, player){
					return !player.hasSkill('yutuo_disableTag');
				},
				content:function(){
					'step 0'
					player.addSkill('yutuo_disableTag');
					//令你受到的伤害-1
					--trigger.num;
					//如果有其他未废除的装备栏，则废除当前栏；
					//否则结束事件
					var cntDisabled = player.countDisabled();
					if(!player.isDisabled(player.storage.yutuo))++cntDisabled;
					
					if(cntDisabled<5&&!player.getCards('e', {subtype:'equip'+player.storage.yutuo}).length ){
						//player.disableEquip(player.storage.yutuo);
					}else{
						event.finish();
						return;
					}
					//equip list
					var list=[];
					for(var i=1;i<6;i++){
						if(i==player.storage.yutuo)continue;
						if(player.isDisabled(i)) continue;
						list.push('equip'+i);
					}
					list.push('cancel2');
					//选择一个其他未废除的装备栏
					var next=player.chooseControl(list);
					next.set('prompt','请选择一个其他未废除的装备栏<br>（若不选择，此技能进入冷却）');
					next.set('ai', function(event,player,list){
						var list = _status.event.list;
						if(list) return list.randomGet();
						return 'cancel2';
					}).set('list', list);
					'step 1'
					if(!result.control||result.control=='cancel2'){
						event.finish();
						return;
					}
					player.disableEquip(player.storage.yutuo);
					player.storage.yutuo = parseInt(result.control[5]);
					player.syncStorage('yutuo');
					player.markSkill('yutuo');
					player.removeSkill('yutuo_disableTag');
				},
				init:function(player){
					if(!player.storage.yutuo)player.storage.yutuo=2;
					player.syncStorage('yutuo');
					player.markSkill('yutuo');
				},
				intro:{
					content:function(storage,player){
						
						var pos={equip1:'武器栏',equip2:'防具栏',equip3:'+1马栏',equip4:'-1马栏',equip5:'宝物栏'}['equip'+storage];
						if(pos) return '若你的<'+pos+'>没有牌，你可废除<'+pos+'>并以一个未废除的装备栏修改<'+pos+'>，重置此技能。';
					}
				},
				group: 'yutuo_reset',
				subSkill:{
					disableTag:{},
					reset:{
						direct: true,
						log: false,
						trigger:{global:'roundStart'},
						content:function(){
							player.removeSkill('yutuo_disableTag');
						}
					}
				}
			},
			//进击的冰糖 bintang
			xiou:{
				audio:5,
				group: 'xiou_gainHand',
				init:function(player){
					player.storage.xiou = {};
				},
				subSkill:{
					gainHand:{
						audio:'xiou',
						trigger:{player: 'phaseZhunbeiBegin' },
						filter:function(event, player){
							return game.hasPlayer(function(cur){
								return cur!=player&&cur.countGainableCards(player,'h');
							});
						},
						content:function(){
							'step 0'
							var filterTarget = function(card,player,target){
								return player!=target&&target.countGainableCards(player,'h');
							};
							player.chooseTarget(
								'选择一名其他角色，获取其所有手牌',
								filterTarget, true
							).set('ai', function(target){
								var evt = _status.event;
								var att = get.attitude(evt.player, target);
								if(target.hasSkill('yiqu')) return 2+3*att+target.countGainableCards(player,'h');
								return att+target.countGainableCards(player,'h');
							});
							'step 1'
							var p1 = result.targets[0];
							//添加临时技能xiou_phaseJieshuTrigger
							player.addTempSkill('xiou_phaseJieshuTrigger', 'phaseJieshuAfter');
							player.storage.xiou.p1 = p1;
							var hardCards = p1.getGainableCards(player,'h');
							if(!hardCards||!hardCards.length){
								event.finish();
								return;
							}
							event.p1HandCardCount = hardCards.length;
							event.p1 = p1;
							//调用gain获取P1手牌
							player.gain(hardCards, p1, 'giveAuto', 'bySelf');
							'step 2'
							var cnt = player.countCards('he');
							cnt = Math.min(event.p1HandCardCount, cnt);
							if(cnt>0){
								//选择等量(如果不足则全部)的牌
								player.chooseCard('he', cnt, '交给'+get.translation(event.p1)+get.cnNumber(cnt)+'张牌', true).set('ai', function(card){
									return 8 - get.value(card) + Math.random()*2;
								});
							}else{
								event.finish();
							}
							'step 3'
							//选择的牌交给P1
							event.p1.gain(result.cards, player, 'giveAuto');
						}
					},
					phaseJieshuTrigger:{
						audio:'xiou',
						trigger:{player:'phaseJieshuBegin'},
						log: false,
						prompt2: function(event, player){
							if(player.storage.xiou&&player.storage.xiou.p1)
								return '你与'+get.translation(player.storage.xiou.p1)+'各摸一张牌';
							return '你与其各摸一张牌';  
						},
						filter:function(event, player){
							//伤害’次数
							var dCnt = 0;
							player.getHistory('sourceDamage',function(evt){
								if(evt.player==player.storage.xiou.p1)	++dCnt;
							});
							//本回合没有造成伤害
							return dCnt <=0;
						},
						content:function(){
							//各摸一张牌
							game.asyncDraw([player,player.storage.xiou.p1]);
							delete player.storage.xiou.p1;
						},
						ai:{
							expose:0.1,
						},
					}
				}
			},
			//张京华 zhangjinghua
			xiemen:{
				trigger:{
					player: ['useCardBegin', 'respondBegin'], //你使用或打出牌时
				},
				frequent: true,
				content:function(){
					var players = game.players.slice(0);//遍历角色
					for(var i=0;i<players.length;++i){
						var p = players[i];
						//跳过自己
						if(p == player) continue;
						//随机获得角色p的一张手牌
						var card = p.getCards('h').randomGet();
						if(!card) continue;//没有手牌则跳过
						if(!p.storage.xiemen_reset)p.storage.xiemen_reset=[];
						p.storage.xiemen_reset.push(card);
						p.lose(card, ui.special, 'toStorage');

						//角色p添加临时技能xiemen_reset，用于在回合结束时重新获得被移除的手牌
						if(!p.hasSkill('xiemen_reset')) p.addSkill('xiemen_reset');
						// p.markAuto('xiemen_reset', card);
					}
				},
				subSkill:{
					reset:{
						trigger:{
							global: 'phaseEnd'
						},
						direct: true,
						content:function(){
							if(player.storage.xiemen_reset&&player.storage.xiemen_reset.length){
								player.gain(player.storage.xiemen_reset, 'fromStorage');
                                delete player.storage.xiemen_reset;
							}

							player.removeSkill('xiemen_reset');
						}
					}
				}

			},
			jiai:{
				audio:5,
				enable: ['chooseToUse','chooseToRespond'],
				hiddenCard:function(player,name){
					var event = _status.event;
					var filterCard = event.filterCard||function(card, player, event){
						return true;
					};
					var jiaiCards = lib.skill.jiai.jiaiCards.slice(0);
					for(var i=0;i<jiaiCards.length;++i){
						if(!filterCard(jiaiCards[i], player, event)){
							jiaiCards.splice(i--, 1);
						}
					}
					for(var i=0; i< lib.inpile.length;++i){
						if( get.type(lib.inpile[i]) != 'basic') continue;
						var card = {name: lib.inpile[i]};
						if( filterCard(card, player, event)){
							jiaiCards.push(lib.inpile[i]);
						}
						
					}
					if(!jiaiCards.contains(name)||player.getCards('h').length<2) return false;
					return true;
				},
				filter:function(event, player){
					if( player.getCards('h').length < 2) return false;
					var filterCard = event.filterCard||function(card, player, event){
						return true;
					};
					var jiaiCards = lib.skill.jiai.jiaiCards.slice(0);
					for(var i=0;i<jiaiCards.length;++i){
						if(!filterCard(jiaiCards[i], player, event)){
							jiaiCards.splice(i--, 1);
						}
					}
					for(var i=0; i< lib.inpile.length;++i){
						if( get.type(lib.inpile[i]) != 'basic') continue;
						var card = {name: lib.inpile[i]};
						if( filterCard(card, player, event)){
							jiaiCards.push(card);
						}
						
					}
					return jiaiCards.length>0; 
				},
				//如果需要非普通牌，可以在这里添加
				jiaiCards:[
					// {name:'sha', nature:'yami'},
				],
				usable:1,
				chooseButton:{
					dialog:function(event,player){
						//选择可使用的基本牌，使用或打出
						var jiaiCards = lib.skill.jiai.jiaiCards.slice(0);
						for(var i=0;i<jiaiCards.length;++i){
							if(!event.filterCard(jiaiCards[i], player, event)){
								jiaiCards.splice(i--, 1);
							}
						}
						for(var i=0; i< lib.inpile.length;++i){
							if( get.type(lib.inpile[i]) != 'basic') continue;
							var card = {name: lib.inpile[i]};
							if( event.filterCard(card, player, event)){
								jiaiCards.push(card);
							}
							
						}
						return ui.create.dialog('###『集爱』###选择一张基本牌',[jiaiCards,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link.name, nature: button.link.nature};
						if(_status.event.getParent().type!='phase'||game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							return Math.random()*5;
						}
						return 0;
					},
					backup:function(links,player){
						//将两张手牌当作选择的基本牌
						return {
							audio:'jiai',
							audioname:['jike','Miki'],
							selectCard:2,
							position:'h',
							filterCard:function(card, player, target){
								return true;
							},
							check:function(card,player,target){
								if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
								else return 6-get.value(card);
							},
							viewAs:{name:links[0].name, nature: links[0].nature},
							// onrespond:function(result, player){
							// 	//当你以此法响应其他角色使用的牌时，摸一张牌
							// 	if(_status.event.respondTo&&_status.event.respondTo[0]!=player) player.draw();
							// },
							onrespond:function(){return this.onuse.apply(this,arguments)},
							onuse:function(result, player){
								if(_status.event.respondTo&&_status.event.respondTo[0]!=player) player.draw();
							}
						}
					},
					prompt:function(links,player){
						var str = '使用或打出';
						if(_status.event.name == 'chooseToUse')str='使用';
						else if(_status.event.name == 'chooseToRespond')str = '打出';
						return '选择两张手牌当作'+get.translation(links[0])+str;
					}
				},
				ai:{
					order: 0.5,
					respondSha:true,
					respondShan:true,
					save:true,
					skillTagFilter:function(player,tag){
						switch(tag){
							case 'respondSha':{
								if(player.countCards('h')<2) return false;
								break;
							}
							case 'respondShan':{
								if(player.countCards('h')<2) return false;
								break;
							}
							case 'save':{
								if(player.countCards('h')<2) return false;
								break;
							}
						}
					},
					result:{
						player: 0.5,
					}
				},
			},
			//NoiR
			mozouqiyin:{
				trigger:{
					global: 'phaseBegin'
				},
				direct:true,
				init:function(player){
					if(!player.storage.mozouqiyin) player.storage.mozouqiyin = '小';
				},
				filter:function(event, player){
					//有牌可以使用，且角色不是自己时可以使用
					if(player.storage.budingpaidui.current&&player.storage.budingpaidui.current!=player.storage.mozouqiyin){
						player.storage.mozouqiyin = player.storage.budingpaidui.current;
					}
					if(event.player == player) return false;
					if(player.countCards('h', function(card){
						return lib.filter.cardEnabled(card,player,'forceEnable');
					})){
						return true;
					};
					return false;
				},
				// prompt:function(event,player){
				// 	return '你可使用一张牌，若未造成伤害，然后本回合'+get.translation(event.player)+'跳过弃牌阶段且不能使用点数（'+(player.storage.mozouqiyin||'小')+'）于此牌的牌';
				// },
				// check:function(event, player){
				// 	if(player.countCards('h', function(card){
				// 		return lib.filter.cardEnabled(card,player,'forceEnable')&&lib.filter.cardUsable(card,player);
				// 	})){
				// 		return true;
				// 	};
				// 	return false;
				// },
				content:function(){
					'step 0'
					var p = trigger.player;
					event.chooseToUseEvt = player.chooseToUse('###'+get.prompt('mozouqiyin')+'###你可使用一张牌，若未造成伤害，然后本回合'+get.translation(event.player)+'跳过弃牌阶段且不能使用点数（'+(player.storage.mozouqiyin||'小')+'）于此牌的牌').set('ai1', function(card){
						var att =  get.attitude(player, p);
						if(att > 0){
							if(player.storage.mozouqiyin == '小'){
								return 100 - p.countCards('h', function(current){
									return current.number < card.number;
								});
							}else if(player.storage.mozouqiyin == '大'){
								return 100 - p.countCards('h', function(current){
									return current.number > card.number;
								});
							}else{
								return p.countCards('h', function(current){
									return current.number == card.number;
								})?10:100;
							}
						}else if(att < 0){
							if(player.storage.mozouqiyin == '小'){
								return p.countCards('h', function(current){
									return current.number < card.number;
								});
							}else if(player.storage.mozouqiyin == '大'){
								return p.countCards('h', function(current){
									return current.number > card.number;
								});
							}else{
								return -100;
							}
						}else{
							return 0;
						}
					});
                    event.sourceDamageHistory = player.getHistory('sourceDamage').slice(0);
					'step 1'
					var p = trigger.player;

					if(!result.bool){
						event.finish();
						return;
					}
					var card = result.cards[0]||result.used||result.card;
					if(!card){
						event.finish();
						return;
					}

                    //如果造成伤害则结束
                    var history = player.getHistory('sourceDamage');
                    for(var i=0; i< history.length;++i){
                        if(event.sourceDamageHistory.contains(history[i])) continue;
                        var causeDamage = true;
                        break;
                    }
                    if(causeDamage){
                        event.finish();
                        return;
                    }
					//本回合其跳过弃牌阶段，且不能使用点数（storage.cond）于(storage.nmber)的牌
					p.storage.mozouqiyin_disableCard = {
						number: card.number,
						cond: player.storage.mozouqiyin
					};
					p.syncStorage('mozouqiyin_disableCard');
					p.addTempSkill('mozouqiyin_disableCard', {player:'phaseEnd'});
					player.logSkill('mozouqiyin',p);
				},
				subSkill:{
					disableCard:{
						trigger:{
							player: 'phaseDiscardBefore'
						},
						direct: true,
						log: false,
						content:function(){
							//跳过弃牌阶段
							trigger.cancel();
						},
						mark: true,
						//禁止使用xxx
						mod:{
							cardUsable:function(card,player,num){
								if(typeof card != 'object') return;
								var number = get.number(card, player);
								if(typeof number != 'number'){
									number = parseInt(number);
									if(isNaN(number)) return;
								}
								var storage = player.storage.mozouqiyin_disableCard;
								return lib.skill.budingpaidui.checkNumber( storage.number, number, storage.cond)?0:num;
							},
							cardEnabled2:function(card, player, ori){
								var number = get.number(card, player);
								if(typeof number != 'number'){
									number = parseInt(number);
									if(isNaN(number)) return;
								}
								var storage = player.storage.mozouqiyin_disableCard;
								return lib.skill.budingpaidui.checkNumber( storage.number, number, storage.cond)?false:ori;
							}
						},
						marktext:'默',
						intro:{
							name:'默奏起音的效果',
							mark:function(dialog, storage, player){
								var cardnum = storage.number;
								if([1,11,12,13].contains(cardnum)){
									cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum];
								}
								dialog.addText('禁止使用点数（'+storage.cond+'）于'+cardnum+'的牌');
								dialog.addText('本回合跳过弃牌阶段');
							}
						},
						onremove:function(player){
							delete player.storage.mozouqiyin_disableCard;
						}
					}
				}
			},
			budingpaidui:{
				trigger:{
					player: 'useCardAfter'
				},
				mark: true,
				init:function(player){
					if(!player.storage.budingpaidui) player.storage.budingpaidui = {};
					if(!player.storage.budingpaidui.current) player.storage.budingpaidui.current = '小';
					if(!player.storage.budingpaidui.left) player.storage.budingpaidui.left = ['小', '大', '等'];
				},
				filter:function(event, player){
					//没有剩余选项时重置
					if(!player.storage.budingpaidui.left||player.storage.budingpaidui.left.length<=0){
						player.storage.budingpaidui.left = ['小', '大', '等'];
                        player.syncStorage('budingpaidui');
                        player.markSkill('budingpaidui');
					}
					var curCard = player.storage._usedCardRecord&&player.storage._usedCardRecord[player.storage._usedCardRecord.length-1];
					var lstCard = player.storage._usedCardRecord&&player.storage._usedCardRecord[player.storage._usedCardRecord.length-2];
					//跳过第一次使用牌
					if(lstCard == null||curCard == null) return;
					return lib.skill.budingpaidui.checkNumber(lstCard.number, curCard.number, player);
				},
				check:function(event, player){
					if(player.storage.budingpaidui&&player.storage.budingpaidui.left&&player.storage.budingpaidui.left.length>1){
						return true;
					}
					return false;
				},
				//检查点数是否满足条件
				//lstNum:   上一张牌点数
				//curNum:   当前使用的牌点数
				//item:     条件
				//      string:         传入比较条件直接比较，['小','大','等'] 任意一个，返回结果
				//      player:         传入角色，通过角色的storage比较，如果对应storage不存在就返回false
				//      其他(undefined): 默认使用当前事件（_status.event）角色
				//return:
				//      true:   满足条件
				//      false:  不满足条件或者条件获取失败
				checkNumber:function(lstNum, curNum, item){
					if(typeof item == 'string') var str = item;
					else{
						var player = item;
						if(!player) player = _status.event.player;
						if(!player||!player.storage.budingpaidui||!player.storage.budingpaidui.current) return false;
						var str = player.storage.budingpaidui.current;
					}

					if(str == '小'){
						return curNum < lstNum;
					}
					if(str == '大'){
						return curNum > lstNum;
					}
					if(str == '等'){
						return curNum == lstNum;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					var curCard = player.storage._usedCardRecord&&player.storage._usedCardRecord[player.storage._usedCardRecord.length-1];
					var left = player.storage.budingpaidui.left;
					var aiChoice = left[0];
					for(var i=0; i<left.length;++i){
						if(player.countCards('h', function(card){
							return player.hasUseTarget(card) && lib.skill.budingpaidui.checkNumber(curCard.number, card.number, left[i]);
						})>0){
							aiChoice = left[i];
							break;
						}
					}
					player.chooseControl(player.storage.budingpaidui.left)
						.set('prompt', '选择一项替代之前（）内的内容')
						.set('ai', function(){
							return _status.event.aiChoice;
						}).set('aiChoice', aiChoice);
					'step 2'
					player.storage.budingpaidui.current = result.control;
					player.storage.budingpaidui.left.splice(result.index, 1);
					player.syncStorage('budingpaidui');
					player.markSkill('budingpaidui');
					
					if(player.storage.mozouqiyin) player.storage.mozouqiyin = result.control;
					game.countPlayer(function(current){
						if(current.hasSkill('mozouqiyin_disableCard')){
							current.storage.mozouqiyin_disableCard.cond = result.control;
							current.syncStorage('mozouqiyin_disableCard');
							current.markSkill('mozouqiyin_disableCard');
						}
					});
				},
				intro:{
					mark:function(dialog, storage, player){
						var lstCard = player.storage._usedCardRecord&&player.storage._usedCardRecord[player.storage._usedCardRecord.length-1];
						if(!lstCard){
							dialog.addText('你使用的下一张牌可能无法发动'+get.translation('budingpaidui'));
							return;
						}
						var cardnum = lstCard.number;
						if([1,11,12,13].contains(cardnum)){
							cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum];
						}
						dialog.addText('你使用的下一张牌点数（'+storage.current+'）于'+cardnum+'可能发动');
					}
				},
				group: 'budingpaidui_reset',
				subSkill:{
					reset:{
						trigger:{
							global: 'roundStart'
						},
                        firstDo: true,
						priority: 253,
						direct: true,
						log: false,
						content:function(){
							player.storage.budingpaidui.left =  ['小', '大', '等'];
							player.syncStorage('budingpaidui');
							player.markSkill('budingpaidui');
						}
					}
				}
			},
			_usedCardRecord:{
				trigger:{
					player: 'useCard'
				},
				direct: true,
				log: false,
				content:function(){
					if(!player.storage._usedCardRecord) player.storage._usedCardRecord = [];
					player.storage._usedCardRecord.push(trigger.card);
					player.syncStorage('_usedCardRecord');
					if(player.hasSkill('budingpaidui')){
						player.syncStorage('budingpaidui');
						player.markSkill('budingpaidui');
					}
				}
			}
		},
		characterReplace:{
			NekomiyaHinata:['re_NekomiyaHinata','NekomiyaHinata'],
			kaguraNaNa:['re_kaguraNaNa','kaguraNaNa'],
			Siro:['re_Siro','Siro'],
			Nekomasu:['re_Nekomasu','Nekomasu'],
			XiaDi:['re_XiaDi','XiaDi'],
			KaguraMea:['re_KaguraMea','KaguraMea'],
			OtomeOto:['re_OtomeOto','OtomeOto'],
			HisekiErio:['re_HisekiErio','HisekiErio'],
			HanazonoSerena:['re_HanazonoSerena','HanazonoSerena','old_HanazonoSerena'],

			Eilene:['Eilene','old_Eilene'],
		},
		dynamicTranslate:{
			mozouqiyin:function(player){
				var str = '小';
				if(player.storage.mozouqiyin) str = player.storage.mozouqiyin;
				return '其他角色的回合开始时，你可使用一张牌，若未造成伤害，本回合其跳过弃牌阶段且不能使用点数（'+player.storage.mozouqiyin+'）于此牌的牌。';
			},
			budingpaidui:function(player){
				var str = 'xiao';
				if(player.storage.budingpaidui&&player.storage.budingpaidui.current){
					str = player.storage.budingpaidui.current;
				}
				return '当你使用一张牌后，若点数（'+str+'）于前一张被使用的牌，你可摸一张牌，然后用以下未选过的一项替代之前（）内的内容：小，大，等。三项均被触发后或一轮开始时，重置选项。';
			}
		},
		translate:{
			
			Miqiutu: '蜜球兔',
			zhazong: '寻嬲',
			zhazong_info: '出牌阶段结束时，若你于此阶段没有使用过基本牌/装备牌/锦囊牌，你可以弃置一名角色手牌区/装备区/判定区各一张牌。',
			zhazong_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手</span>',
			mengnan: '梦喃',
			mengnan_info: '锁定技 当一张牌进入/离开你的判定区，你需要摸/弃一张牌，若此时不在判定阶段，张数+1。',

			Yomemi:'Yomemi',
			Yomemi_ab:'ヨメミ',
			mokuai:'模块搭载',
			mokuai_info:'锁定技 你的【杀】和『致命药剂』可指定的目标数为X；你每次回复体力固定回复X点。（X为你装备区内牌数且至少为1）。',
			yaoji:'致命药剂',
			yaoji_info:'出牌阶段限一次，你可以选择一名角色，弃置任意张类型不同牌，然后亮出牌堆顶等量牌。目标角色需依次选择：弃置与亮出牌等量且花色相同的牌；或受到你造成的1点伤害。',
			yaoji_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：直接伤害</span>',

			Eilene: '艾琳',
			daimeng: '贷梦',
			daimeng_info: '每项限一次。出牌阶段，你可以摸一张/两张/三张/四张牌使手牌数为全场唯一最多，然后回复1点体力/横置/翻面/立即结束此阶段。',
			daimeng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：爆发</span>',
			changsheng: '偿生',
			changsheng_info: '锁定技 你首次进入濒死状态时，弃置区域内所有牌，回复体力至3，重置『贷梦』，从游戏中除外直到你的下个回合开始。',

			NekomiyaHinata:'猫宫日向',
			yuchong: '一命通关',
			yuchong_info: '锁定技 你装备区内的武器牌不能被弃置。你装备着武器时，你手牌中的武器牌均视为不记次数的【杀】。',
			songzang: '送葬天使',
			songzang_info: '你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。',
			zhimao: '只箱只猫',
			zhimao_info: '当你成为普通锦囊牌的目标时，若来源与你不相邻，你可选择一项：<br>取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。',

			KaguraMea: '神乐めあ',
			luecai: '掠财',
			luecai_info: '出牌阶段限一次，你可以将手牌数大于你的角色的一张牌置于你的武将牌上，或令一名手牌数小于你的角色将一张牌置于你的武将牌上，称为“财布”。准备阶段，若你的武将牌上有“财布”，你可以移去任意数量的”财布“摸等量的牌。',
			luecai_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：顺手牵咩</span>',
			xiaoyan: '嚣言',
			xiaoyan_info: '锁定技 你对手牌数小于你的角色使用牌不可被响应。当你造成或受到伤害时，若有花色与来源牌相同的“财布”，此伤害+1。',
			xiaoyan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：强制命中 破军</span>',
			caibu: '财布',


			KamikiHasami: '纸木铗',
			quzhuan: '曲转',
			quzhuan_info: '每回合限一次，其他角色在你的回合内使用牌时，你可以在其结算后获得之。',
			yuanjiu: '援咎',
			yuanjiu_info: '一名角色的出牌阶段开始时，你可以交给其一张与装备区内某张牌花色相同的牌，视为对其使用了一张【酒】。',

			HinataCocomi: '阳向心美',
			qijian: '起鉴',
			qijian_info: '其他角色于自己的回合使用一张指定目标的红色牌后，你可以跟随之使用一张牌，若你未以此牌造成伤害，你摸一张牌并失去此技能直到本回合结束。',
			yizhan: '翼展',
			yizhan_info: '每名角色限一次，你令其脱离濒死状态时，你可以摸牌至手牌上限并将其势力改为“群”。',
			jushi: '聚识',
			jushi_info: '<font color=#fae>主公技</font> 锁定技 你于群势力角色的回合不会因『起鉴』的效果而失去『起鉴』；场上每有一名群势力角色，你的手牌上限+1。',

			kaguraNaNa: '神乐七奈',
			DDzhanshou: 'DD斩首',
			DDzhanshou_info: '当你使用牌指定目标后，你可选择其中一名目标角色，该角色每满足一项你便可将其一张牌移出游戏直到此回合结束：手牌数不少于你；体力值不少于你；装备区牌数不少于你。然后若该角色没有手牌，其摸一张牌。',
			DDzhanshou_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：连营 破军</span>',
			xinluezhili: '辛略之力', 
			xinluezhili_draw: '辛略之力',
			xinluezhili_info: '主公技 当其他角色因“DD斩首”失去最后一张手牌时，其可令你摸一张牌', 

			HanazonoSerena: '花園セレナ',
			maoliang: '猫粮',
			jiumao: '啾猫',
			jiumao_info: '一名角色出牌阶段结束时，可将任意手牌置于你武将牌上，称为“猫粮”。每回合限一次，你可将“猫粮”如手牌般使用或打出。',
			enfan: '恩返',
			enfan_info: '你令其他角色脱离濒死状态时，可以交给其任意数量的“猫粮”，然后若其手牌数与你相同，其可以视为使用一张你的“猫粮”。',
			enfan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：辅助</span>',
			shiqi: '势起',
			shiqi_info: '主公技 锁定技 同势力角色摸牌阶段多摸一张牌。',

			MashiroKanon: '真白花音',
			chenzhu: '辰铸',
			chenzhu_info: '有武器牌被使用时，你将牌堆顶牌置于你的武将牌上。装备武器的角色的回合开始时，你可获得武将牌上的一张牌，改变其武器牌名直到回合结束。',
			yutuo: '玉托',
			yutuo_info: '每轮限一次，你可以令你受到的伤害-1，然后若你的<防具栏>没有牌，你可废除<>并以一个未废除的装备栏修改<>，重置此技能。', 
			yutuo_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：减伤</span>',
			
			bingtang: '进击的冰糖',
			bingtang_ab: '冰糖',
			xiou: '戏偶',
			xiou_info: '准备阶段，你可以获得一名其他角色的所有手牌，然后交给其等量的牌。结束阶段，若你本回合没有对其造成过伤害，你与其各摸一张牌。',
			xiou_gainHand_info: '准备阶段，你可以获得一名其他角色的所有手牌，然后交给其等量的牌。结束阶段，若你本回合没有对其造成过伤害，你与其各摸一张牌。',
			xiou_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：辅助</span>',

			zhangjinghua: '张京华',
			xiemen: '斜门',
			xiemen_info: '你使用或打出牌时，可令其他角色各随机移除一张手牌直到回合结束。',
			xiemen_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：破军 易上手</span>',
			jiai: '集爱',
			jiai_info: '每回合限一次。你可以将两张手牌当任意基本牌使用或打出，当你以此法响应其他角色使用的牌时，摸一张牌。',

			XiaDi: '下地',
			yinliu: '引流',
			yinliu_info: '出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。若你以此法弃置了所有手牌，本回合结束时你可再次发动此技能。',
			yinliu_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：赌狗</span>',
			dunzou: '遁走',
			dunzou_info: '你于其他角色的回合被♣牌指定并结算后，你可以令你于本回合视为不存在。',
			dunzou_enable: '遁走',

			Nekomasu: 'ねこます',
			milijianying: '迷离剑影',
			milijianying_info: '锁定技 你始终拥有装备【节奏双剑】的效果。当你使用一张【杀】后，改变你的性别。',
			dianyinchuancheng: '点引承传',
			dianyinchuancheng_info: '当你受到 1 点伤害后，你可以与一名与你手牌数差不大于 X 的角色交换手牌，然后手牌较少的一方将手牌数调整至与较多一方相同。（X为体力值不少于你的角色数）',
			dianyinchuancheng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：卖血 辅助</span>',

			ShizukuLulu: '雫るる',
			duixian: '稽杀',
			duixian_info: '每回合限一次，你对其他角色使用【杀】或其他角色使用【杀】指定你为目标时，你可改之为【决斗】。若其因此受到伤害，你可弃置其一张牌，若你因此受到伤害，你摸两张牌。',
			duixian_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：强化出杀 卖血 易上手</span>',
			gutai: '守峡',
			gutai_info: '当一张牌造成伤害后，若你为使用者或目标之一，你可以取消此牌的剩余目标。',


			His_HoshinoNiya: '星野妮娅·史官',
			shushi: '书史',
			shushi_info: '你的主要阶段开始时，你可以观看牌堆顶的任意张牌，并以任意顺序放回。你每回合至多以此法观看X张牌，且每少观看一张本回合手牌上限便+1。（X为场上人数且至少为5）',
			shushi_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：观星</span>',
			zengzhi: '增殖',
			zengzhi_info: '当你的实体锦囊牌结算后，你可以进行一次判定，若花色与该锦囊牌相同，视为你使用了一张同样的锦囊牌。',
			
			Qiankesaier:'茜科塞尔',
			Qiankesaier_info:'茜科塞尔',
			shuangshoujiaoying:'双首角鹰',
			shuangshoujiaoying_gai:'双首角鹰',
			shuangshoujiaoying_info:'当你使用【杀】指定目标后，可以令你或目标展示手牌并重铸其中的【闪】。若为其重铸，你摸一张牌；若为你重铸，此【杀】不计入次数。',
			shuangshoujiaoying_gai_info:'当你使用【杀】指定目标后，可以令你或目标展示手牌并重铸其中的红色牌。若为其重铸，你摸一张牌；若为你重铸，此【杀】不计入次数。',
			anyingxuemai:'暗影血脉',
			anyingxuemai_info:'<font color=#daa>限定技</font>，你进入濒死状态时，可以展示所有手牌并回复其中最少花色牌数的体力。然后将“双首角鹰”的“【闪】”改为“红色牌”。',
			
			heichuan:'原初黑川',
			zhengtibuming: '正体不明',
			zhengtibuming_info: '游戏开始时，你随机获得三张武将牌作为“替身”，然后亮出其中一张。获得亮出“替身”的通常技，且性别和势力视为与“替身”相同。回合开始或结束时，你可以选择一项：<br>更改亮出的“替身”；或随机更换一张“替身”。当你受到1点伤害后，你可以获得一张新的“替身”。',
			lunhuizuzhou: '轮回诅咒',
			lunhuizuzhou_info: '锁定技 其他角色不能以任何方式让你回复体力。你死亡后，令一名其他角色获得此技能。',
			mingyunniezao: '命运捏造',
			mingyunniezao_info: '主公技。当其它同势力角色的判定牌生效前，你可以观看牌堆顶的五张牌，选择其中一张替代之，然后将其余牌以任意顺序放回牌堆顶。',

			NoiR: 'NoiR',
			mozouqiyin: '默奏起音',
			mozouqiyin_info: '其他角色的回合开始时，你可使用一张牌，若未造成伤害，本回合其跳过弃牌阶段且不能使用点数（小）于此牌的牌。',
			budingpaidui: '布丁派对',
			budingpaidui_info: '当你使用一张牌后，若点数（小）于前一张被使用的牌，你可摸一张牌，然后用以下未选过的一项替代之前（）内的内容：小，大，等。三项均被触发后或一轮开始时，重置选项。',
			budingpaidui_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：大连营</span>',

			MinamiNami: '美波七海',
			Noracat: '野良喵',
			Kano: '鹿乃',
			HanamaruHareru: '花丸晴琉',
		},
	};
});
