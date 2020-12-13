'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'clubs',
		connect:true,
		character:{
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			KaguraMea: ['female', 'qun', 4, ['luecai', 'xiaoyan']],
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			kaguraNaNa: ['female', 'qun', 3, ['DDzhanshou', 'xinluezhili'], ['zhu']],
			HanazonoSerena: ['female', 'paryi', 3, ['jiumao', 'enfan', 'shiqi']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],
			Yomemi:['female','Eilene',3,['mokuai','yaoji']],
			/**雫るる */
			ShizukuLulu:['female','qun',3,['duixian','gutai']],
			/**P家诸人 */
			Paryi:['male','paryi',4,['tiantang','haoren']],
			TakatsukiRitsu:['female','paryi',3,['shengya','liangshan','chongshi']],
			MorinagaMiu:['female','paryi',3,['guanzhai','zhishu']],
			OtomeOto:['female','paryi',3,['xiaogui','qiepian','changxiang'],['zhu']],

			His_HoshinoNiya: ['female', 'qun', 3, ['shushi', 'zengzhi']],
			/**茜科塞尔 */
			Qiankesaier:['male','qun',4,['shuangshoujiaoying','anyingxuemai']],
		},
		characterSort:{
			clubs:{
                ParyiPro:['Paryi','TakatsukiRitsu','MorinagaMiu','OtomeOto'],
			}
		},
		characterIntro:{
			Yomemi:' ',
			KaguraMea: '神乐咩者，东瀛之歌女也，迫于生计西来中原，有《money》、《你好我很可爱》之名曲流传世间，咩性格直爽，以此获众拥簇，却亦因此惹祸上身，V始二十二年，西都陷落，咩于京畿聚众建国，国号曰咩，定元咩啊元年，与杏虹分庭抗礼。',
			MiraiAkari: "未来明（V始二年），生于荆楚郡望，少时猎虎不慎坠马，遂记忆尽失，同族有长者初音未来，携明识山见水，阿满童年如此。V始十九年，绊爱既首义，天下豪杰并起，明亦王于西南，定国号为ENTUM，后为小人夺之，满知无经纬之才，遁入山中，不闻世事。",
			kaguraNaNa: "神乐七奈（V始三年），蜀郡唐辛人也，尤善丹青，图写特妙，元昭重之，V始三年，诞女百鬼绫目，益州牧帕里既败，七奈自修同族聚众起兵，拥者百万。谚曰，多言必失，是矣！七奈失言为中原诸侯所恶，蜀地之人亦仇中原，如此至今。",
			Siro: "siro（V始二年），字小白，别号电脑少女，母孕时梦海豚入怀，小白诞即能言，孩提之时即多识胡语，尤善海豚之言，既加冠，应召入宫，拜左将军V海豚候领幽州牧，善骑射，有神弓曰AKM，军中皆呼战神。",
			HanazonoSerena: "花园sarena者（V始三年），青城之猫灵也，清楚三铳士之一，为报帕里之恩追随之，虽体弱多病然擅行刺，V始三年，以松饼鸩杀汉中太守，帕里pro遂建国巴蜀，花园猫不谙世事，常为好事者钓之。V始九年，朝廷出兵百万击巴蜀，大破蜀军，花园猫身中数刀，仍负帕里逃出益州，复还青城，人不知所踪。",
			XiaDi: '下地者，V8之健将也，自群雄并起，囚人草莽之徒自成一国，名曰V8，V8奉绅宝为主，总领V8事宜，次年勒夫以鸩杀之，夺绅宝之权，下地作丹青《不要以为这样就赢了》缅之，领自家军离V8，后为勒夫击，大败，遁于江城。',
			Nekomasu: '狐叔者，原国相也，屡谏朝廷，针砭时弊，谗人间之，放于巴蜀，巴蜀有奇人曰野良喵，叔与野良一见如故，尝与青城饮之，后绊爱起义，屡请狐叔，狐叔自认忠于朝廷，屡拒之，叔素修黄帝之道，善养生之经，建宗“养生”，后日竟成第一宗。',
			NekomiyaHinata: '“这不是猫耳，这是头发啦！”',
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
					console.log('OK')
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
			},
			//猫宫
			yuchong:{
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
						mod:{
							cardname:function(card,player){
								if(player.getEquip(1)){
									if(get.subtype(card)=='equip1'){  
										return 'sha';
									}
								}
							},
						},
						trigger:{player:['useCard1']},
						firstDo:true,
						forced:	true,
						filter:function(event,player){
							if(!player.getEquip(1))		return false;
							return get.subtype(event.cards[0])=='equip1';
						},
						content:function(){
							player.getStat().card.sha--;
			//				for(var i=0;i<trigger.targets.length;i++){
			//					trigger.directHit.add(trigger.targets[0]);
			//				}						
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
						target:function(card,player,target,current){
							if(card.name=='sha'&&current<0) return 0.7;
						}
					}
				}
			},
			songzang2:{
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
				forced:true,
				priority:15,
				filter:function(event,player){
					if(!event.player||event.target!=player||event.player==player) return false;
				//使用牌者在攻击距离外	if(player.inRange(event.player)) return false;
					if(player.next==event.player || player.previous==event.player)	return false;
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
				}									
				
			},
			//lulu
			duixian:{
				trigger:{player:'useCardToPlayer',target:'useCardToPlayer'},
				usable:1,
				filter:function(event,player){
					return get.name(event.card) =='sha';
				},
				content:function(){
					if(!trigger.getParent().addedSkill)	trigger.getParent().addedSkill = [];
					trigger.getParent().addedSkill.add('duixian');
					trigger.card.name = 'juedou';
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
					console.log(trigger.getParent());
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
				group: ['caibu', 'luecai_draw'],
				enable: 'phaseUse',
				usable: 1,
				locked: true,
				filterTarget:function(card,player,target){
					if (player==target) return false;
					if (target.countCards('he') == 0 || target.countCards('h') == player.countCards('h')) return false;
					return target;
				},
				check() {
					return 1;
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
				subSkill: {
					draw: {
						trigger: {
							player: 'phaseBegin'
						},
						filter: function(event, player) {
							return player.storage.caibu.length > 0;
						},
						content: function() {
							'step 0'
							player.chooseCardButton('移去任意张财布', [1, Infinity], player.storage.caibu);
							'step 1'
							if (result.bool) {
								var cards = result.links;
								player.$throw(cards);
								game.cardsDiscard(cards);
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
						forced: true,
						trigger: {
							source: 'damageBefore',
							player: 'damageBefore'
						},
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
				content:function() {
					'step 0'
					player.storage.shiyilijia = player.countCards('h');
					'step 1'
					var cards=player.getCards('h');
					player.discard(cards);
				},
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
							console.log(get.attitude(player, target));
							return target && get.attitude(player, target) > 0;
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
								if (player.needsToDiscard()) return 5 - get.useful(card);
								else return 2 - get.useful(card);
							});
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
				direct: true,
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
					player.logSkill('shiqi');
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
					player.chooseToDiscard('###『引流』###弃置至多三张牌','he', [1,3], true);
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
			}
		},
		translate:{
			
			ParyiPro: '帕里坡',

			Yomemi:'ヨメミ',
			mokuai:'模块搭载',
			mokuai_info:'<font color=#f00>锁定技</font> 你的【杀】和“致命药剂”可指定的目标数为X；你每次回复体力固定回复X点。（X为你装备区内牌数且至少为1）。',
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
			milijianying_info: '<font color=#f66>锁定技</font> 你始终拥有装备【雌雄双股剑】的效果。当你使用一张【杀】后，改变你的性别。',
			dianyinchuancheng: '点引承传',
			dianyinchuancheng_info: '当你受到 1 点伤害后，你可以与一名与你手牌数差不大于 X 的角色交换手牌，然后手牌较少的一方将手牌数调整至与较多一方相同。（X为体力值大于你的角色数）',

			
			ShizukuLulu: '雫るる',
			duixian: '稽杀',
			duixian_info: '每回合限一次，你对其他角色使用【杀】或其他角色使用【杀】指定你为目标时，你可将其改为【决斗】。若其因此受到伤害，你可弃置其一张牌，若你因此受到伤害，你摸两张牌。',
			gutai: '守峡',
			gutai_info: '当你使用牌造成伤害后，你可以取消此牌的剩余目标；当你于回合外成为牌的目标后，若此牌造成伤害，你可以取消此牌的剩余目标。',


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
		},
	};
});
