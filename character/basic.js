'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'basic',
		connect:true,
		character:{
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			KaguraMea: ['female', 'qun', 4, ['luecai', 'xiaoyan']],
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			kaguraNaNa: ['female', 'qun', 3, ['DDzhanshou', 'xinluezhili'], ['zhu']],
			Siro: ['female', 'dotlive', 4, ['zhongxinghezou']],
			HanazonoSerena: ['female', 'qun', 3, ['jiumao', 'enfan', 'shiqi']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],

			His_HoshinoNiya: ['male', 'qun', 3, ['shushi', 'zengzhi']],
		},
		characterIntro:{
			KaguraMea: '',
			MiraiAkari: "因为人物设计是曾经创造过初音未来的KEI，因此经常被人称为初音的妹妹。Mirai Akari是一名失忆少女，为了让大家了解自己开始做视频。同时是一位NEET，且拥有一套别墅并作为背景。",
			kaguraNaNa: "大家好辣！我是从唐辛子星来的，神乐七奈！平常是扮成插画师，偷偷地（？）辛略地球。",
			Siro: "siro（V始二年），字小白，别号电脑少女，母孕时梦海豚入怀，小白诞即能言，孩提之时即多识胡语，尤善海豚之言，既加冠，应召入宫，拜左将军V海豚候领幽州牧，善骑射，有神弓曰AKM，军中皆呼战神。",
			HanazonoSerena: "被您收养的猫娘。主人！从现在开始请多关照喵。",
			XiaDi: '',
			Nekomasu: '虚拟口癖萝莉狐娘YouTuber大叔',
			NekomiyaHinata: '“这不是猫耳，这是头发啦！”',
		},
		skill:{
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
							for(var i=0;i<trigger.targets.length;i++){
								trigger.directHit.add(trigger.targets[0]);
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
				trigger:{player:'useCardToPlayered'},
				priority:8,
				filter:function(event,player){
					return event.card.name=='sha'&&!(event.target.maxHp/2 < event.target.hp)&&player.countCards('he')>0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt('songzang'),'he');
							
					'step 1'	//无法被响应	
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
					if(!event.target||event.target!=player||event.player==player) return false;
					if(player.inRange(event.player)) return false; 	//使用牌者在攻击距离外
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
			//			}
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

			zhongxinghezou: {
				init: function(player) {
					if (!player.storage.zhongxinghezou) {
						player.storage.zhongxinghezou = [];
					}
				},
				trigger: {
					player:'useCard2'
				},
				usable: 1,
				filter:function(event,player){
					if (!(get.itemtype(event.cards) == 'cards')) return false
					// if (event.getParent().triggeredTargets3.length > 1) return false;
					return true;
				},
				content: function() {
					'step 0'
					event.ctargets = trigger.targets;
					player.chooseTarget(get.prompt2('zhongxinghezou'),function(card,player,target){
						return !_status.event.targets.contains(target) && target.countCards('h');
					}).set('ai',function(target){
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if (result.bool) {
						event.starget = result.targets[0];
						event.starget.chooseCard(true, 'h');
					}
					else {
						event.finish();
					}
					'step 2'
					if (result.bool && result.cards.length) {
						event.starget.showCards(result.cards);
						event.card = result.cards[0];
						var num = get.number(event.card) + get.number(trigger.card);
						if (num < 12) {
							// trigger.targets.length=0;
							// trigger.getParent().triggeredTargets2.length=0;
							player.gain(result.cards,event.starget,'give');
							trigger.cancel();
						}
						if (num >= 12) {
							player.storage.zhongxinghezou.push({
								source: trigger.card.cardid,
								user:event.starget,
								card: event.card,
								targets: event.ctargets,
							});
						}
						if (num == 12) {
							player.draw();
							event.starget.recover();
						}
					}
					else {
						event.finish();
					}
				},
				group: ['zhongxinghezou_use'],
				subSkill: {
					use: {
						forced: true,
						trigger: {
							player: 'useCardAfter',
						},
						filter: function(event, player) {
							if (!event.card.isCard) return false;
							if (!player.storage.zhongxinghezou.length) return false;
							return true;
						},
						content: function() {
							player.storage.zhongxinghezou.forEach(function(item) {
								if (item.source == trigger.card.cardid) {
									item.targets.forEach(function(tar) {
										if (item.user.canUse(item.card,tar)) {
											item.user.useCard(item.card, tar);
										}
									})
									player.storage.zhongxinghezou.remove(item);
								}
							})
						}
					},
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
				filter: function(event, player) {
					return	(player.countCards('he') >= 2 ||
							player.countCards('h')) && 
							!player.hasSkill('yinliu_used');
				},
				content: function() {
					'step 0'
					var list = [];
					//if (player.countCards('he') >= 2) list.push('弃置两张牌');
					if (player.countCards('he')) list.push('弃置牌并发动技能');
					if (list.length) {
						player.addTempSkill('yinliu_used');
						player.chooseControl(list);
					}
					else event.finish();
					'step 1'
					//if (result.control == '弃置两张牌') event.control = 0;
					if (result.control == '弃置牌并发动技能') event.control = 0;
					if (event.control == 0) {
						player.chooseCard('he', [1,3], true);
					}
					else {
						event.cards = player.getCards('h');
					}
					'step 2'
					if (event.control == 0 && result.bool) {
						event.cards = result.cards;
					} 
					'step 3'
					player.discard(event.cards);
					'step 4'
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
					used: {},
					end: {
						trigger: {
							player: 'phaseEnd',
						},
						filter: function(event, player) {
							return player.countCards('he') >= 2 || player.countCards('h');
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
				trigger:{player:'phaseUseBegin'},
				priority:41,
				filter:function(event,player){
					console.log(ui.cardPile.childElementCount)
					return ui.cardPile.childElementCount>1;
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						player.chooseCardButton(Math.min(game.countPlayer(),5),true,get.cards(Math.min(game.countPlayer(),5)),'【书史】：按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
							return get.value(button.link);
						});
					}, player);
					'step 1'
					if(result.bool){
						var list=result.links.slice(0);
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
					}
				},
			},
			zengzhi:{
				trigger:{player:'useCardAfter'},
				priority:41,
				filter:function(event,player){
					if(!player.isPhaseUsing())			return false;
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
		},
		translate:{
			
			NekomiyaHinata:'猫宫日向',
			yuchong: '一命通关',
			yuchong_info: '<font color=#f66>锁定技</font> 你装备区内的武器牌不能被弃置。你在装备武器时，你手牌中的武器牌均视为不可被响应的杀。',
			songzang: '送葬天使',
			songzang_info: '你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可以弃一张牌令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。',
			zhimao: '只箱只猫',
			zhimao_info: '当你成为普通锦囊牌的目标时，若来源在你攻击范围外，你可选择一项：取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。',

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

			Siro: '电脑少女小白',
			zhongxinghezou: '众星合奏',
			zhongxinghezou_info: '每回合限一次。你使用实体牌指定目标后，可令目标外的一名角色亮出一张牌。若两牌点数之和：小于12，你获得亮出牌令你使用的牌无效；不小于12，你使用的牌结算后，亮出牌的角色对同目标使用亮出牌；等于12，你获得亮出牌并令亮出牌的角色回复1点体力。',

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


			His_HoshinoNiya: '史官·星野妮娅',
			shushi: '书史',
			shushi_info: '出牌阶段开始时，你可以观看牌堆顶的X张牌，然后以任意顺序放回。（X为存活角色数且至多为5）',
			zengzhi: '增殖',
			zengzhi_info: '当你的实体锦囊牌结算后，你可以进行一次判定，若花色与该锦囊牌相同，视为你使用了一张同样的锦囊牌。',
		},
	};
});
