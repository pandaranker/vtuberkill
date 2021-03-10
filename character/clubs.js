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
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			kaguraNaNa: ['female', 'qun', 3, ['DDzhanshou', 'xinluezhili'], ['zhu']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],
			Eilene: ['female','eilene','4/6',['duanfu','daichang','hongtu'],['zhu']],
			Yomemi:['female','eilene',3,['mokuai','yaoji']],
			/**雫るる */
			ShizukuLulu:['female','qun',3,['duixian','gutai']],
			/**花谱 */
			Kaf:['female','qun',3,['liuhua','yinshi']],
			/**泠鸢 */
			Yousa:['female','VirtuaReal',3,['niaoji','ysxiangxing']],
			/**P家诸人 */
			Paryi:['male','paryi',4,['tiantang','haoren'],['forbidai']],
			TakatsukiRitsu:['female','paryi',3,['shengya','liangshan','chongshi']],
			MorinagaMiu:['female','paryi',3,['guanzhai','zhishu']],
			OtomeOto:['female','paryi',3,['xiaogui','qiepian','changxiang'],['zhu']],
			HisekiErio:['female','paryi',4,['huange','qishi','yongtuan'],['zhu']],
			HanazonoSerena: ['female', 'paryi', 3, ['jiumao', 'enfan', 'shiqi']],

			His_HoshinoNiya: ['female', 'qun', 3, ['shushi', 'zengzhi']],
			/**茜科塞尔 */
			Qiankesaier:['male','qun',4,['shuangshoujiaoying','anyingxuemai']],
			/*黑川*/
			heichuan:['male','qun', 3, ['zhengtibuming', 'lunhuizuzhou']],//, 'mingyunniezao'
		},
		characterSort:{
			clubs:{
				ParyiPro:['Paryi','TakatsukiRitsu','MorinagaMiu','HanazonoSerena','OtomeOto','HisekiErio'],
				KurokawaPresents:['Qiankesaier','heichuan'],
			}
		},
		characterIntro:{
			Paryi: '帕里，巴蜀富豪者也，累世公卿，广散金帛，养士三千，昔绊爱首义，左右劝帕里图之，帕里由此建国，聚诸奇士建国帕里破一期，天时地利人和皆不顺，诸士心皆背，P家无疾而终，帕里亦败走青城，后党锢事泄，杏国树倒猴散，P家有团长绯赤艾利欧接连败诸侯，中兴P家，OTO、古守血遊等士亦借此征战，P家之势渐盛。',
			OtomeOto: 'oto者，名歌姬也，曾学于教坊司，能歌善舞，以《初音未来的消失》之传说名曲惊煞一众善才，后烽烟四起，oto批皮入V界，人情炎凉，难以经营，如此经年，后杏溃败，oto喃喃自言曰：好风凭借力，送我上青云。有友曰绯赤艾利欧，两人相持生活数十年，V始二十年，杏礼崩乐坏，团长尽收杏社之地，亲迎oto，oto亦欣然前往，paryi系重归荣光，此二人先导也。',
			TakatsukiRitsu: '阿律者，帕里之衙内也，清楚三铳士之一，以超美丽3d与烂活闻名，常联动yyut，一日律问直播间观众爱者，众人皆曰yyut，律遂破防光速下播，杏溃败后，众v皆如终获青天，有欣欣向荣之势，独律未增半分，郁郁寡欢，此后毕业之，是矣，烂活可供一时，可供一世乎？',

			Yomemi: ' ',
			KaguraMea: '神乐咩者，东瀛之歌女也，迫于生计西来中原，有《money》、《你好我很可爱》之名曲流传世间，咩性格直爽，以此获众拥簇，却亦因此惹祸上身，V始二十二年，西都陷落，咩于京畿聚众建国，国号曰咩，定元咩啊元年，与杏虹分庭抗礼。',
			MiraiAkari: "未来明（V始二年），生于荆楚郡望，少时猎虎不慎坠马，遂记忆尽失，同族有长者初音未来，携明识山见水，阿满童年如此。V始十九年，绊爱既首义，天下豪杰并起，明亦王于西南，定国号为ENTUM，后为小人夺之，满知无经纬之才，遁入山中，不闻世事。",
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
				enable:"phaseUse", 
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0
				},
				filterCard:function(card){
					return true;
				},
				check:function(card){
					return 5-get.value(card);
				},
				selectCard:[1,Infinity],
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				selectTarget:function(){
					var player = _status.event.player;
					var min = 1;
					var max = Math.floor(player.countCards('e'))||1;
					return [min,max];
				},
				discard:true,
				multitarget:false,
				targetprompt:[],
				content:function(){
					'step 0'
					_status.event.target = target;
					var type = [];
					for(var i=0;i<cards.length;i++){
						type.add(get.type(cards[i],'trick',cards[i].original=='h'?player:false));
					}
					var num = type.length;
					var cards = get.cards(num);
					player.showCards(cards,'致命药剂亮出牌堆');
					var suits = [];
					for(var i=0;i<cards.length;i++){
						suits.push(get.suit(cards[i]));
					}
					_status.event.suits = suits;
					_status.event.time = 0;
					'step 1'
			//		var time = _status.event.time;
					game.broadcastAll(function(target, suits){
						console.log(suits);
						var next=target.discardPlayerCard("弃置与亮出牌花色和数量（"+get.translation(suits)+"）相同的牌", target, 'he');
						next.set('selectButton',suits.length);
						next.set('filterButton',function(card){
							if(ui.selected.buttons.length){
								console.log(ui.selected.buttons);
								return get.suit(card) == suits[ui.selected.buttons.length];
							}
							else{
								return get.suit(card) == suits[0];
							}
						});
						next.set('forced',false);
					}, _status.event.target, _status.event.suits);
			//		_status.event.time++;
					'step 2'
					if(!result.cards||result.cards.length<_status.event.suits.length){
						event.target.damage('player',1);
					}
				},
				ai:{order:5,result:{target:-1}},
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
				//使用牌者在攻击距离外	if(player.inRange(event.player)) return false;
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
						filter:function(event,player){
							return event.card&&get.name(event.card) =='juedou'&&event.getParent(2).name=='useCard'&&event.getParent(2).addedSkill&&event.getParent(2).addedSkill.contains('duixian')&&event.player!=player&&event.player.countCards('he');
						},
						content:function(){
							player.discardPlayerCard('###『守峡』###弃置对方一张牌',trigger.player,'he');
						},
					}
				},
			},
			gutai:{
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					if(event.player!=player&&event.getParent().player!=player)	return false;
					return event.card&&get.type(event.card)=='trick'&&event.getParent().name==event.card.name&&event.getParent().targets.contains(event.player)&&event.getParent().targets[event.getParent().targets.length-1]!=event.player;
				},
				content:function(){
			//		if(!trigger.getParent(2).addedSkill)	trigger.getParent(2).addedSkill = [];
			//		trigger.getParent(2).addedSkill.add('gutai');
					var shouxia = trigger.getParent().targets.splice(trigger.getParent().targets.indexOf(trigger.player));
					player.logSkill('gutai',shouxia)
				},
			//	group:['gutai_cancelDam','gutai_gainBy'],
			/*	subSkill:{
					cancelDam:{
						trigger:{global:'damageBegin3'},
						forced:	true,
						silent: true,
						popup: false,
						filter:function(event,player){
							return event.card&&event.getParent(2).name=='useCard'&&event.getParent(2).addedSkill&&event.getParent(2).addedSkill.contains('gutai');
						},
						content:function(){
							player.logSkill('gutai',trigger.player);
							trigger.changeToZero();
						},
					},
					gainBy:{
						trigger:{global:'useCardAfter'},
						forced:	true,
						filter:function(event,player){
							if(event.player==player)	return false;
							return event.targets.contains(player)&&get.type(event.card)=='trick'&&!game.hasPlayer(function(cur){
								return player.getHistory('damage',function(evt){
									return evt.card==event.card;
								}).length>0
							});
						},
						content:function(){
							player.gain(trigger.cards,'giveAuto');
						},
					},
				},*/
			},
			//Kaf
			liuhua:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mark:true,
				intro:{
					name:'化羽',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.gain(storage,'gainAuto');
							storage.length=0;
						}
					},
				},
				trigger:{global:'phaseAfter'},
				lastDo: true,
				filter:function(event,player){
					return player.countCards('h')&&game.countPlayer2(function(cur){
						return cur.getHistory('damage').length;
					});
				},
				content:function(){
					'step 0'
					player.showHandcards();
					event.cards = player.getCards('h');
			/*		if(player.storage.liuhua.length){
						for(var i = 0;i<player.storage.liuhua.length;i++){
							for(var j = 0;j<event.cards.length;j++){
								if(get.suit(player.storage.liuhua[i])==get.suit(event.cards[j])){
									event.finish();
								}
							}
						}
					}*/
					'step 1'
					player.lose(event.cards,ui.special,'toStorage');
					player.$give(event.cards,player,false);
					player.markAuto('liuhua',event.cards);
					game.log(player,'将',event.cards,'置于武将牌上');
					player.insertPhase();
				},
				group:'liuhua_regain',
				subSkill:{
					regain:{
						trigger:{player:['phaseBegin','turnOverEnd']},
						firstDo:true,
						direct:true,
						filter:function(event,player){
							if((event.name=='phase'&&event.skill!='liuhua')||(event.name=='turnOver'&&(!event.getParent()._trigger||event.getParent()._trigger.skill!='liuhua')))	return false;
							if(player.storage.liuhua.length<3)	return false;
							var list = [];
							player.storage.liuhua.forEach(function(hua){
								list.add(get.suit(hua))
							});
							return list.length>=3;
						},
						content:function(){
							'step 0'
							var list = [];
							player.storage.liuhua.forEach(function(hua){
								list.add(get.suit(hua))
							});
							var next = player.chooseCardButton(list.length,'###'+get.translation('liuhua')+'###获得武将牌上的不同花色牌各一张',player.storage.liuhua,true);
							next.set('filterButton',function(button){
								var suit=get.suit(button.link);
								for(var i=0;i<ui.selected.buttons.length;i++){
									if(get.suit(ui.selected.buttons[i].link)==suit) return false;
								}
								return true;
							});
							next.set('ai',function(button){
								return get.value(button.link);
							});
							'step 1'
							if(result.bool){
								game.delay(0.5);
								player.logSkill('liuhua');
								player.unmarkAuto('liuhua',result.links);
								player.gain(result.links,player,'gain2')
								player.turnOver();
							}
						},
					},
				}
			},
			yinshi:{
				trigger:{player:'phaseBefore'},
				firstDo:true,
				forced:true,
				filter:function(event,player){
					return event.skill;
				},
				content:function(){
					'step 0'
					player.storage.yinshi_use = _status.currentPhase;
					'step 1'
					player.addTempSkill('yinshi_use');
				},
				subSkill:{
					use:{
						mark:'character',
						intro:{
							content:function(storage,player){
								if(storage==player)	return '使用牌只能指定自己为目标';
								return '使用牌只能指定自己或$为目标';
							}
						},
						onremove:true,
						mod:{
							playerEnabled:function(card,player,target){
								if(player!=target&&player.storage.yinshi_use!=target) return false;
							}
						}
					}
				}
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
				locked: true,
				filterTarget:function(card,player,target){
					if (player==target) return false;
					if (target.countCards('he') == 0 || target.countCards('h') == player.countCards('h')) return false;
					return target;
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
					target.$give(event.card, player, false);
					target.lose(event.card, ui.special, 'toStorage');
					player.storage.caibu.push(event.card);
					player.syncStorage('caibu');
					player.markSkill('caibu');
					player.showCards(player.storage.caibu, '财布');
				},
				ai:{order:10,result:{target:-1},expose:0.4,},
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
				}
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
				popup: false,
				trigger: {
					global:'useCardAfter'
				},
				filter:function(event,player){
					return event.card.name=='tao'
						&&event.player!=player
						&&get.itemtype(event.cards)=='cards'
						&&get.position(event.cards[0],true)=='o';
				},
				content:function() {
					'step 0'
					player.logSkill('seqinghuashen');
					trigger.player.draw();
					'step 1'
					var target = trigger.player;
					if (target.countGainableCards(player, 'he')) {
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
				filter:function(event,player){
					return event.targets.length;
				},
				check: function(event, player) {
					return true;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('DDzhanshou'),function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if (result.bool) {
						event.tar = result.targets[0];
						if (player.hasZhuSkill('xinluezhili') && player != event.tar) {
							event.tar.addSkill('xinluezhili_draw');
						}
						// player.logSkill('DDzhanshou', event.tar);
						var count = (event.tar.countCards('h') >= player.countCards('h')) 
									+ (event.tar.hp >= player.hp) 
									+ (event.tar.countCards('e') >= player.countCards('e'));
						player.choosePlayerCard(event.tar, 'he', [1, count], "移除至多" + count + "张牌");
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
						event.tar.markSkill('DDzhanshou_card');
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
				content: function() {
					var target = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					if (target.length) {
						target[0].draw();
					}
				}
			},


			maoliang: {
				mark:true,
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
				global: 'jiumao_put',
				group: ['jiumao_gain'],
				subSkill: {
					put: {
						trigger: {
							player: 'phaseDiscardBegin',
						},
						check: function(event, player) {
							var target = game.findPlayer(function(cur) {
								return cur.hasSkill('jiumao');
							})
							return target&&get.attitude(player, target)>0;
						},
						filter: function(event, player) {
							return !player.hasSkill('jiumao') && player.countCards('he')
								&& game.hasPlayer(function(cur) {
									return cur.hasSkill('jiumao');
								});
						},
						content: function() {
							'step 0'
							player.chooseCard(get.prompt('jiumao'), 'he', [1, Infinity]).set('ai', function(card) {
								if (player.needsToDiscard()&&ui.selected.cards.length<player) return 6 - get.useful(card);
								else return 2 - get.useful(card);
							}).set('prompt','###『啾猫』###你在弃牌阶段开始时，可将任意数量的牌放在自己武将牌旁，称为“猫粮”')
							'step 1'
							if (result.bool) {
								player.lose(result.cards, ui.special, 'visible', 'toStorage');
								player.$give(result.cards, player, false);
								if (player.storage.maoliang) {
									player.storage.maoliang = player.storage.maoliang.concat(result.cards);
								}
								else {
									player.storage.maoliang = result.cards;
								}
								// game.addVideo('storage', player, ['maoliang',get.cardsInfo(player.storage.maoliang),'cards']);
								player.addSkill('maoliang');
								player.markSkill('maoliang');
								player.showCards(player.storage.maoliang, "猫粮");
							}
							else event.finish();
							'step 2'
							game.delayx();
						}
					},
					gain: {
						popup: false,
						trigger: {
							player: 'phaseBegin',
						},
						content: function() {
							'step 0'
							event.targets = game.filterPlayer(function(cur) {
								return cur.hasSkill('maoliang');
							});
							event.videoId=lib.status.videoId++;
							game.broadcastAll(function(targets, id) {
								var dialog = ui.create.dialog('选择猫粮');
								targets.forEach(function(p) {
									if (p.storage.maoliang.length) {
										dialog.addText(get.translation(p));
										dialog.add(p.storage.maoliang);
									}
								})
								dialog.videoId = id;
							}, event.targets, event.videoId);
							var next = player.chooseButton([1, player.maxHp]);
							next.set('dialog', event.videoId);
							'step 1'
							game.broadcastAll('closeDialog', event.videoId)
							if (result.bool) {
								event.cards = result.links;
								player.logSkill('jiumao');
								event.targets.forEach(function(p) {
									var all = p.storage.maoliang;
									var cho = [];
									p.storage.maoliang = [];
									all.forEach(function(card) {
										if (event.cards.indexOf(card) != -1) {
											cho.push(card);
											p.addTempSkill('jiumao_cancel');
										}
										else {
											p.storage.maoliang.push(card);
										}
									})
									p.$give(cho, player, false);
									player.gain(cho, 'fromStorage');
									p.syncStorage('maoliang');
									p.markSkill('maoliang');
									game.log(player, "获得了", p, "的猫粮：", cho);
								})
								player.line(game.filterPlayer(function(cur) {
									return cur.hasSkill('jiumao_cancel');
								}), 'green');
							}
						}
					},
					cancel: {
						mod: {
							targetEnabled: function(card, player, target) {
								if (get.color(card) == 'black' && player.hasSkill('jiumao')) {
									return false;
								}
							}
						}
					},
				}
			},
			enfan: {
				popup: false, 
				trigger: {
					global:'dying'
				},
				filter: function(event, player) {
					return event.player.hasSkill('jiumao') || event.player.hasSkill('maoliang');
				},
				content: function() {
					'step 0'
					event.targets = game.filterPlayer(function(cur) {
						return cur.hasSkill('maoliang');
					});
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(targets, id, current) {
						var dialog = ui.create.dialog('选择猫粮');
						targets.forEach(function(p) {
							if (p != current && p.storage.maoliang.length) {
								dialog.addText(get.translation(p));
								dialog.add(p.storage.maoliang);
							}
						})
						dialog.videoId = id;
					}, event.targets, event.videoId,trigger.player)
					var next = player.chooseButton([1, player.maxHp]);
					next.set('dialog', event.videoId);
					'step 1'
					game.broadcastAll('closeDialog',event.videoId);
					if (result.bool) {
						event.cards = result.links;
						var targets = [];
						var less = false;
						event.targets.forEach(function(p) {
							var temp = p.storage.maoliang;
							p.storage.maoliang = [];
							temp.forEach(function(card) {
								if (event.cards.indexOf(card) != -1) {
									p.$give(card, trigger.player, false);
									trigger.player.gain(card, 'fromStorage');
									targets.push(p);
								}
								else {
									p.storage.maoliang.push(card);
									less = true;
								}
							})
							p.syncStorage('maoliang');
							p.markSkill('maoliang');
						})
						if (!less) {
							trigger.player.recover();
						}
						player.logSkill('enfan', trigger.player);
						trigger.player.line(targets, 'green');
					}
					else event.finish();
				}
			},
			shiqi: {
				audio:1,
				forced: true,
				trigger: {
					player: 'phaseZhunbeiBegin',
				},
				filter: function(event, player) {
					var cnt = game.filterPlayer(function(cur) {
						return player.countCards('h') < cur.countCards('h');
					})
					return cnt == 0;
				},
				content: function() {
					player.addTempSkill('shiqi_addDam');

					var buff = '.player_buff';
					game.broadcastAll(function(player, buff){
						player.node.shiqi= ui.create.div(buff ,player.node.avatar);
						player.node.shiqi2 = ui.create.div(buff ,player.node.avatar2);
					}, player, buff);
				},
				subSkill: {
					addDam: {
						direct: true, 
						silent: true,
						trigger: {
							source: 'damageBegin',
						},
						content: function() {
							player.removeSkill('shiqi_addDam');
							trigger.num++;
						},
						onremove: function(player, skill) {
							game.broadcastAll(function(player){
								player.node.shiqi.delete();
								player.node.shiqi2.delete();
								delete player.node.shiqi;
								delete player.node.shiqi2;
							}, player);
						}
					}
				}
			},

			yinliu: {
				enable: 'phaseUse',
				usable:1,
				filter: function(event, player) {
					return	player.countCards('he')>0;
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
						return cur.hp > player.hp;
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
						player.drawTo(max);
						event.tar.drawTo(max);
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
					if(player.countCards('h',{type:'trick'})<3)	att = 0;
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
					}else{
						player.storage.shushi += result.index;
						game.broadcastAll(function(player){
							player.chooseCardButton(result.index,get.cards(result.index),true,'『书史』：按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
								return get.value(button.link);
							});
						}, player);
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
						direct:true,
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
					if(!player.isPhaseUsing())												return false;
					if(get.name(event.card)=='jiedao'||get.name(event.card)=='shengdong')	return false;
					return event.card.isCard&&get.type(event.card)=='trick';
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						return get.suit(card)==get.suit(trigger.card)?1:-1;
					});
					'step 1'
					if(trigger.targets&&result.bool)
					trigger.targets.forEach(function(target){
						player.useCard({name:trigger.card.name},target);
					});
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
							player.getStat().card.sha--;
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
                init:function(player, skill){
                    player.lastRecover = player.recover;
                    player.recover = function(){
                        var next = this.lastRecover();
                        if(!next)return;
                        for(var i=0;i<arguments.length;++i){
							if(get.itemtype(arguments[i])=='player'){
								next.source = _status.event.player;
							}
                        }
                        if(typeof(next.source)==='undefined') next.source = _status.event.player;
                    };
                },
                onremove:function(player, skill){
                    if(!player.lastRecover) return;
                    delete player.recover;
                    player.recover = player.lastRecover;
                    delete player.lastRecover;
                },
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
								var num=get.attitude(_status.event.player,target);
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
            }
		},
		characterReplace:{
			MiraiAkari:['re_MiraiAkari','MiraiAkari'],
			kaguraNaNa:['re_kaguraNaNa','kaguraNaNa'],
			Siro:['re_Siro','Siro'],
			Nekomasu:['re_Nekomasu','Nekomasu'],
			XiaDi:['re_XiaDi','XiaDi'],
		},
		translate:{
			
			ParyiPro: '帕里坡',
			KurokawaPresents: 'Kurokawa Presents',


			Yomemi:'ヨメミ',
			mokuai:'模块搭载',
			mokuai_info:'<font color=#f66>锁定技</font> 你的【杀】和“致命药剂”可指定的目标数为X；你每次回复体力固定回复X点。（X为你装备区内牌数且至少为1）。',
			yaoji:'致命药剂',
			yaoji_info:'出牌阶段限一次，你可以选择一名角色，弃置任意张牌，然后亮出牌堆顶等于其类型数的牌。目标角色需依次选择：弃置与这些亮出牌等量且花色相同的牌；或受到你造成的1点伤害。',
			
			NekomiyaHinata:'猫宫日向',
			yuchong: '一命通关',
			yuchong_info: '<font color=#f66>锁定技</font> 你装备区内的武器牌不能被弃置。你在装备武器时，你手牌中的武器牌均视为不记次数的【杀】。',
			songzang: '送葬天使',
			songzang_info: '你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。',
			zhimao: '只箱只猫',
			zhimao_info: '当你成为普通锦囊牌的目标时，若来源与你不相邻，你可选择一项：取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。',

			KaguraMea: '神乐めあ',
			luecai: '掠财',
			luecai_info: '出牌阶段限一次，你可以将手牌数大于你的角色的一张牌置于你的武将牌上，或令一名手牌数小于你的角色将一张牌置于你的武将牌上，称为“财布”。准备阶段，若你的武将牌上有“财布”，你可以移去任意数量的”财布“摸等量的牌。',
			xiaoyan: '嚣言',
			xiaoyan_info: '<font color=#f66>锁定技</font> 你对手牌数小于你的角色使用牌不可被响应。当你造成或受到伤害时，若有花色与来源牌相同的“财布”，此伤害+1。',
			caibu: '财布',


			MiraiAkari: '未来明',
			shiyilijia: '失忆离家',
			shiyilijia_info: '出牌阶段限一次，你可弃置所有手牌，若如此做，你于回合结束时摸等量的牌。',
			seqinghuashen: '色情化身',
			seqinghuashen_info: '其他角色的【桃】因使用进入弃牌堆时，你可以令其摸一张牌，然后你获得其一张牌。',

			kaguraNaNa: '神乐七奈',
			DDzhanshou: 'DD斩首',
			DDzhanshou_info: '当你使用牌指定目标后，你可选择其中一名目标角色，该角色每满足一项你便可将其一张牌移出游戏直到此回合结束：手牌数不少于你；体力值不少于你；装备区牌数不少于你。然后若该角色没有手牌，其摸一张牌。', 
			xinluezhili: '辛略之力', 
			xinluezhili_draw: '辛略之力',
			xinluezhili_info: '<font color=#ff4>主公技</font> 当其他角色因“DD斩首”失去最后一张手牌时，其可令你摸一张牌', 

			HanazonoSerena: '花園セレナ',
			maoliang: '猫粮',
			jiumao: '啾猫',
			jiumao_info: '其他角色在弃牌阶段开始时，可将任意数量的牌放在其武将牌旁，称为“猫粮”。你的回合开始时，可获得数量不大于你体力上限的“猫粮”，若如此做，你无法使用黑色牌指定你获得牌的来源为目标直到回合结束。',
			enfan: '恩返',
			enfan_info: '发动过“啾猫”的角色濒死时，你可把其以外角色的数量不大于你体力上限的“猫粮”交给该名角色，然后若场上没有“猫粮”，其回复1点体力',
			shiqi: '势起',
			shiqi_info: '<font color=#f66>锁定技</font> 准备阶段，若你的手牌数为全场最多，本回合你造成的第一次伤害+1。',

			XiaDi: '下地',
			yinliu: '引流',
			yinliu_info: '出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。若你以此法弃置了所有手牌，本回合结束时你可再次发动此技能。',
			dunzou: '遁走',
			dunzou_info: '你于其他角色的回合被♣牌指定并结算后，你可以令你于本回合视为不存在。',
			dunzou_enable: '遁走',

			Nekomasu: 'ねこます',
			milijianying: '迷离剑影',
			milijianying_info: '<font color=#f66>锁定技</font> 你始终拥有装备【节奏双剑】的效果。当你使用一张【杀】后，改变你的性别。',
			dianyinchuancheng: '点引承传',
			dianyinchuancheng_info: '当你受到 1 点伤害后，你可以与一名与你手牌数差不大于 X 的角色交换手牌，然后手牌较少的一方将手牌数调整至与较多一方相同。（X为体力值大于你的角色数）',

			
			ShizukuLulu: '雫るる',
			duixian: '稽杀',
			duixian_info: '每回合限一次，你对其他角色使用【杀】或其他角色使用【杀】指定你为目标时，你可将其改为【决斗】。若其因此受到伤害，你可弃置其一张牌，若你因此受到伤害，你摸两张牌。',
			gutai: '守峡',
			gutai_info: '当你使用牌造成伤害后，你可以取消此牌的剩余目标；当你于回合外成为牌的目标后，若此牌造成伤害，你可以取消此牌的剩余目标。',

			Kaf: '花谱',
			liuhua: '化羽',
			liuhua_info: '有角色受到伤害的回合结束时，你可以将所有手牌置于武将牌上并执行一个额外回合，然后若你武将牌上有至少三种花色的牌，你获得每种花色牌各一张并翻面。',
			yinshi: '遗世',
			yinshi_info: '<font color=#f66>锁定技</font> 你在你的额外回合内使用牌只能指定你或上一回合角色为目标。',


			His_HoshinoNiya: '星野妮娅·史官',
			shushi: '书史',
			shushi_info: '你的主要阶段开始时，你可以观看牌堆顶的任意张牌，并以任意顺序放回。你每回合至多以此法观看X张牌，且每少观看一张本回合手牌上限便+1。（X为场上人数且至少为5）',
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
			zhengtibuming_info: '游戏开始时，你随机获得三张武将牌作为“替身”，然后亮出其中一张。获得亮出“替身”的通常技，且性别和势力视为与“替身”相同。回合开始或结束时，你可以选择一项：更改亮出的“替身”；或随机更换一张“替身”。当你受到1点伤害后，你可以获得一张新的“替身”。',
			lunhuizuzhou: '轮回诅咒',
			lunhuizuzhou_info: '<font color=#f66>锁定技</font> 其他角色不能以任何方式让你回复体力。你死亡后，令一名其他角色获得此技能。',
			mingyunniezao: '命运捏造',
			mingyunniezao_info: '主公技。当其它同势力角色的判定牌生效前，你可以观看牌堆顶的五张牌，选择其中一张替代之，然后将其余牌以任意顺序放回牌堆顶。'
			
		},
	};
});
