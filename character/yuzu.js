'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		connectBanned:['sp_MinatoAqua', 'sp_MononobeAlice'],
		character:{
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			SisterClearie:['female','nijisanji',3,['zhenxin','zhuwei']],
			MinatoAqua:['female','holo',3,['kuali','youyi']],
			UsadaPekora:['female','holo',3,['pekoyu','hongshaoturou']],
			Paryi:['male','qun',4,['tiantang','haoren']],
			Civia:['female','holo',3,['kuangxin','danyan','qingjie']],

			sp_MinatoAqua:['female','shen',2,['shenghuang','renzhan', 'kuase']],
			sp_MononobeAlice:['female','shen',3,['xianjing','chahui', 'duandai']]
		},
		characterIntro:{
			NekomiyaHinata: '“这不是猫耳，这是头发啦！”',
			SisterClearie:	'“今日也愿神加护于你……”',
			MinatoAqua:'“余裕余裕~”',
			UsadaPekora: '“哈↑哈↑哈↑哈↑”',
			Paryi:'kimo~',
			Civia:'“听我说，DD会带来世界和平~”',

			sp_MinatoAqua:'',
			sp_MononobeAlice:'',
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
								player.useCard({name:'sha',isCard:true},target).animate=false;
							}	
							else if(result.index==0){
								player.draw();
								trigger.cancel();
							}						
			//			}
			//			else{
			//				if(result.index==1){
			//					player.line(target);
			//					player.useCard({name:'sha',isCard:true},target).animate=false;
			//				}	
			//				else						player.draw();
							
			//			}
					
			//		'step2'
			//		trigger.cancel();
				}									
				
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
							trigger.num=0;
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
							if(!event.source.hp)		return false
							return player.hp<event.source.hp;
						},
						content:function(){
							trigger.num=0;
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
			//夸
			kuali:{
				init:function (player){
					player.storage.kuali=0;
				},
				group:['kuali_zhuDong','kuali_jieshu'],
				subSkill:{
					zhuDong:{
						enable:"phaseUse",
						usable:1,
						filter:function(event,player){
							return game.hasPlayer(function(cur){
								return (cur.countCards('h')%player.countCards('h')==0&&cur.countCards('h')>0)||(cur.hp%player.hp==0);
							});
						},
						content:function(){
							'step 0'
							player.storage.kuali++;
							player.chooseControlList(
								['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
								'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
								true,function(event,player){
									return _status.event.index;
								});
							'step 1'
							if(result.index==0){
								player.chooseTarget('选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
									if(target==player) 				return false;
									return target.countCards('h')%player.countCards('h')==0;
								});						
							}
							if(result.index==1){
								var num=-1;
								game.hasPlayer(function(cur){
									if(cur.hp%player.hp==0)
									num++;
								});
								player.draw(num);
								player.loseHp();
								_status.event.finish();
							}
							'step 2'
							if(result.bool&&result.targets.length)
							{
								var num=0;
								num=Number(result.targets.length);
								player.chooseToDiscard(num,'弃置'+num+'张牌并回复等量体力','he');
								player.recover(num);
							}
						},
					},
				
			
					jieshu:{
						trigger:{player:'phaseEnd'},
						usable:1,
						priority:40,
						filter:function(event,player){
								if(player.storage.kuali!=0){
									player.storage.kuali=0;
									return false;
								}
								return game.hasPlayer(function(cur){
									return (cur.countCards('h')%player.countCards('h')==0&&cur.countCards('h')>0)
									||(cur.hp%player.hp==0&&cur.hp>0);
								});
							},
							content:function(){
								'step 0'
								player.storage.kuali++;
								player.chooseControlList(
									['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
									'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
									true,function(event,player){
										return _status.event.index;
									});
								'step 1'
								if(result.index==0){
									player.chooseTarget('选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
										if(target==player) 				return false;
										return target.countCards('h')%player.countCards('h')==0;
									});						
								}
								if(result.index==1){
									var num=-1;
									game.hasPlayer(function(cur){
										if(cur.hp%player.hp==0)
										num++;
									});
									player.draw(num);
									player.loseHp();
									event.finish();
								}
								'step 2'
									if(result.bool&&result.targets.length)
									{
										var num=0;
										num=Number(result.targets.length);
										player.chooseToDiscard(num,'弃置'+num+'张牌并回复等量体力','he');
										player.recover(num);
									}
								},
						},
					},
			},
			youyi:{
				trigger:{
					global: 'phaseBegin'
				},
				round:1,
				priority:80,
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
						target.gain(result.cards,player);
						target.markSkill('youyi');
						target.addTempSkill('youyishiyue','phaseAfter');
						target.addTempSkill('youyishiyue_lose','phaseEnd');
						target.addTempSkill('youyishiyue_rec','phaseAfter');
						player.storage.youyi=result.cards[0];
					}
				},
				group:['youyi_dam'],
				subSkill:{				
					dam:{
						trigger:{global:'damageBegin'},
						priority:80,
						check:function(event,player){
							return (get.attitude(player,event.player)>0);
						},	
						filter:function(event,player){
							if(event.source==player||!event.source)	return false;
							return event.source.hasSkill('youyishiyue');
						},
						prompt:'是否收回“誓约”牌',
							content:function(){
							trigger.num=0;
							player.line(trigger.source,'thunder');
							trigger.source.$giveAuto(result.cards,player);
							player.gain(player.storage.youyi,trigger.source);
							trigger.source.removeSkill('youyishiyue');
							trigger.source.updateMarks();
						}
					},
				},
			},
			youyishiyue:{
				marktext:"誓",
				locked:true,
				intro:{
					name:'誓约牌',
					content:function (storage,player,skill){
						var su,na,nu,shi;
						game.hasPlayer(function(cur){
							if(cur.hasSkill('youyi')){
								shi=cur.storage.youyi;
								su=get.suit(shi);
								na=get.name(shi);
								nu=shi.number;
							}
						});
						return '当前的“誓约”牌为'+get.translation(su)+get.translation(nu)+get.translation(na)+'当你造成伤害时，湊阿库娅可令你将“誓约”牌交给她以防止之。该回合结束时，你可以弃置“誓约”牌令你或其回复1点体力。 \n （若此牌离开你的区域，此状态结束）';
					},
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'誓约解除');
							storage.length=0;
						}
					},
				},
				mark:true,
				group:['youyishiyue_lose','youyishiyue_rec'],
				subSkill:{
					lose:{
						trigger:{player:['loseAfter']},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							var shi;
							var bo=game.hasPlayer(function(cur){
								if(cur.hasSkill('youyi')){
									shi=cur.storage.youyi;
									return true;
								}
								else{
									return false;
								}
							});
							if(!(event.getParent().cards||event.cards))											return false;
							if(event.getParent().name=="useCard"&&get.type(event.getParent().card)=='equip')	return false;
							if(event.getParent().card!=null&&(get.name(event.getParent().card) =='shandian'||get.name(event.getParent().card) =='fulei'))		return false;
		//					console.log(event);
							if(event.cards){
								for(var i=0;i<event.cards.length;i++){
									if(event.cards[i]==shi)		return true;
								}
							}
							else if(event.getParent().cards){
								for(var i=0;i<event.getParent().cards.length;i++){
									if(event.getParent().cards[i]==shi)		return true;
								}
							}
						},
						content:function(){
							player.removeSkill('youyishiyue');
							player.updateMarks();
						},
					},
					rec:{
						trigger:{player:'phaseEnd'},
						forced:false,
						priority:80,
						filter:function(event,player){
							return game.hasPlayer(function(cur){
								return cur.hasSkill('youyi');
							})
						},
						content:function(){
							//弃“誓约”牌回复
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
								_status.event.card = shi;
			//					player.choosePlayerCard('弃置誓约牌','hej',function(card,player){
			//						return card=shi;
			//					});
								player.chooseTarget('让你或她回复一点体力',1,function(card,player,target){
									return target==player||target==aqua;
								});
							}, player);
							'step 1'
							if(result.bool){
								var shi = _status.event.card;
								result.targets[0].recover();
								player.lose(shi);
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
				locked:true,
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
			//		console.log(player.getLastUsed(1));
		/*			var evt=player.getLastUsed(1);
					if(!evt||!evt.card) return true;
						var ark=[get.suit(evt.card)];
						for(var i=2;;i++){
							var evt=player.getLastUsed(i);
							if(!evt||!evt.card){
								ark.push(get.suit(evt.card));
							}
							else break;
						}
					for(var i=0;i<ark.length;i++){
						if(get.suit(event.card)==ark[i])							return false
					}
		*/			console.log(player.storage.pekoyu);
					for(var i=0;i<player.storage.pekoyu.length;i++){
						if(get.suit(event.card)==player.storage.pekoyu[i])					return false
					}
					return !(event.result.bool == false || event.result.wuxied);			
				},
				content: function() {
					'step 0'
					player.storage.pekoyu.add(get.suit(trigger.card));
					console.log(player.storage.pekoyu);
					player.draw(),
					player.chooseToDiscard('然后，弃置一张牌','h').set('ai',function(card){
						var name = card.name;
						if(name=='jiu') 			return 120;
						if(get.type(card)=='trick')	return 40;
						return 100-get.value(card);													
					});
					'step 1'
					if(result.cards){
						if(get.name(result.cards[0],'player')=='jiu'||
							(player.hasSkill('hongshaoturou_viewAs')&&(result.cards[0].name=='shan'||result.cards[0].name=='tao')))
						player.chooseTarget('选择一名角色，令其摸两张牌').set('ai',function(target){
							var player=_status.event.player;
							return get.attitude(player,target)*(target.isDamaged()?2:1);
						});
					}
					'step 2'
					if(result.bool&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.draw(2);
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
				enable:"phaseUse",
				usable:1,
				content:function(){
					player.link();
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
			},
			hongshaoturou_viewAs:{
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
			hongshaoturou_shao:{
				trigger:{player:['phaseEnd']},
				marktext: '炎',
				mark: true,
				forced: true,
				intro: {
					content:'当前回合结束后受到一点火焰伤害',
					name:'自煲自足',
				},
				onremove: function(player, skill) {
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
			//帕里
			paryi:{
				marktext:"P",
				locked:true,
				intro:{
					name:'帕里家常',
					content:function (storage,player,skill){
						return '已经历了'+storage+'次【天堂之扉】';
					},
				},
			},
			tiantang:{
				priority:987,
				global:'paryi',
				trigger:{
					global: 'phaseBegin'
				},
				priority:81,
				filter:function(event, player){
					if((!(player.storage.haoren===true))&&event.player==player)	return false;
					if(player.countCards('he')<(event.player.storage.paryi||1))	return false;
					return true;
				},
				content:function(){
					'step 0'
					var num = trigger.player.storage.paryi||1;
					player.chooseToDiscard(num,'he');
					'step 1'
					if(result.bool){
						if(!(player.storage.haoren===true)){
							player.storage.haoren++;
						}
						player.markSkill('haoren');
						var target = trigger.player;
						if(target.storage.paryi>0){
							target.storage.paryi++;
						}
						else{
							target.storage.paryi=1;
						}
						target.markSkill('paryi');
						target.syncStorage('paryi');
						event.videoId = lib.status.videoId++;
						var suitlist = [
							['heart', '', 'heart', 'heart', 'div2'],
							['diamond', '', 'diamond', 'diamond', 'div2'],
							['club', '', 'club', 'club', 'div2'],
							['spade', '', 'spade', 'spade', 'div2']
						];
						game.broadcastAll(function(id, suitlist){
							var dialog=ui.create.dialog('天堂之扉 声明');
							dialog.addText('花色');
							dialog.add([suitlist, 'vcard']);
							dialog.videoId = id;
						}, event.videoId, suitlist);
					}
					else event.finish();
					'step 2'
					var next = player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.storage.tiantang = result.links[0][2];
						game.log('帕里声明了'+get.translation(player.storage.tiantang));
						var target = trigger.player;
						var list= [['观看并弃置声明花色牌'],['摸两张牌']];;
						if(!target.countCards('he'))	list.shift();
						event.videoId = lib.status.videoId++;
						game.broadcastAll(function(id, choicelist){
							var dialog=ui.create.dialog('选择一项');
							choicelist.forEach(element=>{
								dialog.add([element,'vcard']);
							})
							dialog.videoId = id;
						}, event.videoId, list);
					}
					else event.finish();
					'step 4'
					player.chooseButton().set('dialog',event.videoId).set('prompt',get.prompt('tiantang'));
					'step 5'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
                        result.links.forEach(element => {
                            if(element[2]=='观看并弃置声明花色牌'){
                        		var next=player.discardPlayerCard("弃置一张声明花色的牌", trigger.player, 'he').set('visible', true);
								next.set('filterButton',function(card){
									return get.suit(card.link)==player.storage.tiantang;
								});
								var fC=0;
								trigger.player.getCards('he').forEach(function(tB){
									if(get.suit(tB)==player.storage.tiantang)	fC++;
								})
								if(fC){
									next.set('forced',true);
								}
								trigger.player.phaseUse();
								if(player.storage.haoren===true){
									trigger.player.addTempSkill('tiantangzhifei_yisheng','phaseUseEnd');
									trigger.player.addTempSkill('yinliu','phaseUseEnd');
								}
                            }
                            if(element[2]=='摸两张牌'){
								trigger.player.draw(2);
								trigger.player.addTempSkill('tiantangzhifei_xianzhi','phaseEnd');
								trigger.player.storage.tiantangzhifei_xianzhi=player.storage.tiantang;
                            }
                        });
					}
				},
			},
			tiantangzhifei:{
				group:['tiantangzhifei_yisheng','tiantangzhifei_xianzhi'],
				subSkill:{
					yisheng:{
						marktext:"流",
						locked:true,
						intro:{
							name:'回流',
							content:function (storage,player,skill){
								return '暂时获得技能【引流】';
							},
						},
						mark:true,
					},
					xianzhi:{
						marktext:"断",
						locked:true,
						intro:{
							name:'断臂',
							content:function (storage,player,skill){
								return '只能使用花色为'+get.translation(storage)+'的牌';
							},
						},
						mark:true,
						mod:{
							cardEnabled:function(card,player,now){
								return game.hasPlayer(function(cur){
									if(cur.hasSkill('tiantang')){
										return get.suit(card)==cur.storage.tiantang;
									}
								});
								
							},
						},
					},
				}
			},
			haoren:{
				skillAnimation:true,
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player){
					player.storage.haoren=0;
				},
				marktext:"井",
				locked:true,
				intro:{
					name:'挖井人',
					content:function (storage,player,skill){
						return '已发动了'+storage+'次【天堂之扉】';
					},
				},
				trigger:{player:'tiantangAfter'},
				filter:function(event,player){
					return player.storage.haoren>game.countPlayer();
				},
				content:function(){
					player.loseMaxHp();
					player.storage.haoren=true;
					player.awakenSkill('haoren');
					player.unmarkSkill('haoren');
				},
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
					player.choosePlayerCard(trigger.targets[0],'h',true).set('visible', true);
					game.log(player,'观看了',trigger.targets[0],'的手牌')
					'step 1'
					if(result.bool){
						event.card = result.cards[0];
						player.choosePlayerCard(player,'h',true);
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
							player.draw();
							player.storage.kuangxin_draw[1].draw();
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
	//				player:['damageCancelled','damageZero'],
	//				target:['shaMiss','useCardToExcluded'],
					player:['damage'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.kuangxin2&&event.card&&player.storage.kuangxin2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:14,
				content:function(){
	//				player.draw();
	//				console.log(player.storage.kuangxin2);
	//				player.storage.kuangxin2[1].draw();
	//				player.storage.kuangxin2.remove(trigger.card);
	//				if(!player.storage.kuangxin2.length) 
					player.removeSkill('kuangxin2');
				},
			},
			danyan:{
				trigger:{player:'loseEnd'},
				priority:22,
				filter:function(event,player){
					console.log(event);
					return event.name=='cardsDiscard'||(event.name=='lose'&&event.getParent().name=='discard');
				},
				content:function(){
					'step 0'
					event.cards = trigger.cards;
					var next=player.chooseCardButton(1,'选择使用的牌',event.cards);
		//			next.set('filterButton',function(button){
		//				return player.canUse(button.link,false);
		//			});;
					'step 1'
					if(result.bool){
						var card = result.links[0];
						player.chooseUseTarget(card,true,'noanimate','nopopup');
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

			//圣皇夸
			shenghuang:{
				init:function(player){
					player.storage.shenghuang=0;
					if(get.zhu(player)==player&&game.players.length>4) player.maxHp--;
				},
				global:['shenghuang_put', 'shenghuang_rec'],
				group:['shenghuang_draw', 'shenghuang_lose', 'shenghuang_ret'],
				subSkill:{
					put:{
						trigger:{global:'phaseBegin'},
						forced:true,
						silent:true,
						popup:false,
						priority:777,
						filter:function (event,player){
							return player.hp;
						},
						content:function(){
							player.storage.shenghuang_put = player.hp;
						}
					},
					draw:{
						init:function(player){
							if(get.zhu(player)==player&&game.players.length>4)
							{player.storage.shenghuang_draw=4;}
							else
							{player.storage.shenghuang_draw=3;}
							if(player.hasSkill('shenghuang_draw'))  player.markSkill('shenghuang_draw');
						},
						marktext: '圣',
						mark: true,
						intro: {
							content:function (storage,player,skill){
								return '剩余'+storage+'张数值为2的体力卡';
							},
							name:'剩余体力卡',
						},
						forced:true,
						priority:777,
						skillAnimation:true,
						animationColor:'gray',
						trigger:{
							player:"dying",
						},
						filter:function (event,player){
							return player.storage.shenghuang_draw>0
						},
						content:function(){
							player.maxHp=2;
							player.recover(player.maxHp-player.hp);
							player.storage.shenghuang_draw--;
							player.syncStorage('shenghuang_draw');
							if(!player.storage.shenghuang_draw){
								player.unmarkSkill('shenghuang_draw');
								player.removeSkill('shenghuang_draw');
							}
						},
					},
					lose:{
						marktext: '愈',
						intro: {
							content:'当前回合已失去了黑色牌，在本回合结束时，其他角色将体力回复至回合开始时的状态。',
							name:'圣皇之愈',
						},
						trigger:{player:'loseAfter'},
						forced:true,
						priority:777,
						filter:function(event,player){
							if(!(event.getParent().cards||event.card))									return false;
		//					if(event.getParent().name=="useCard"||event.getParent().name=="useSkill")	return false;
							var cards = event.getParent().cards;
							var bc=0;
							for(var i=0;i<cards.length;i++){
								if(get.color(cards[i]) == 'black')	bc++;
							}
							return bc;
						},
						content:function(){
							player.storage.shenghuang++;
							player.markSkill('shenghuang_lose');
						},
					},
					ret:{
						forced:true,
						silent:true,
						popup:false,
						priority:888,
						trigger:{global:'phaseAfter'},
						filter:function(event,player){
							return player.storage.shenghuang;
						},
						content:function(){
							player.storage.shenghuang=0;
							player.unmarkSkill('shenghuang_lose');
						}
					},
					rec:{
						forced:true,
						priority:777,
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							if(player.hasSkill('shenghuang'))					return false;
							if(player.storage.shenghuang_put == undefined)		return false;
							if(!game.hasPlayer(function(cur){
								return cur.hasSkill('shenghuang')&&cur.storage.shenghuang>0;
							}))													return false;
							return player.storage.shenghuang_put > player.hp;
						},
						content:function(){
							var vq=player.storage.shenghuang_put-player.hp;
							if(vq>0){
								player.recover(vq);
							}
						},
					}
				},
			},
			renzhan:{
				priority:777,
				trigger:{global:'damageEnd'},
				forced:false,
				usable:1,
	//			skillAnimation:true,
	//			animationColor:'wood',
				init:function(player){
					player.storage.renzhan = [];
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0&&get.effect(event.player,{name:'sha'},player,player)>0;
				},
				filter:function(event,player){
					return event.player!=player&&event.player.hp>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.loseHp();
					var card=get.cards()[0];
					var cards=[];
					cards.push(card);
					while(get.name(card)!='sha'){
						card=get.cards()[0];
						cards.push(card);
					}
					player.storage.renzhan = cards;
					console.log(cards);
					player.showCards(player.storage.renzhan,'瞬息刃斩亮出牌堆');
					game.delay(2);
					player.chooseControlList(
						['获得这些牌',
						'获得其中的【杀】并对一名角色使用任意张【杀】'],
						true,function(event,player){
							return _status.event.index;
						});
					'step 1'
					if(result.index==0)	
					{
						cards = player.storage.renzhan;
						game.log(player,'获得了', cards);
						player.gain(cards);
						_status.event.finish();
					}
					else if(result.index==1)
					{
						var cards = [];
						player.storage.renzhan.forEach(function(card){
							if(get.name(card)!='sha')	return;
							cards.push(card);
						});
						player.storage.renzhan = cards;
						player.showCards(player.storage.renzhan,'获得其中的【杀】');
						game.delay(2);
						player.gain(cards);
					}
					'step 2'
					game.broadcastAll(function(player){
						var next=player.chooseTarget(function(card,player,target){
							return player!=target;
						});
						next.set('targetprompt',['RUA']);
						next.set('prompt','指定一名角色，对其使用任意张【杀】');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return 50-att;
						});
					}, player)
					console.log('OK');
					'step 3'
					if(result.bool){
						_status.event.target = result.targets[0];
						var target = result.targets[0];
						console.log(target);
						game.log(player,'刃斩的目标为',target);
						target.addTempSkill('renzhan2','phaseEnd');
						target.storage.renzhan2 = 0;
						console.log('OK');
						console.log(player.hasCard('sha','h'));
						player.logSkill('renzhan',target);
						player.chooseToUse('对'+get.translation(target)+'使用杀',{name:'sha'},target ,-1);
					}
					else{
						_status.event.finish();
					}
					'step 4'
					if(result.bool){
						var target = _status.event.target;
						if(!(target.storage.renzhan2||target.isDead()||target.isOut())){
						player.chooseToUse('对'+get.translation(target)+'继续使用杀',{name:'sha'},target ,-1);
					}}
					else{
						event.finish();
					}
					'step 5'
					if(result.bool){
						var target = _status.event.target;
						if(!(target.storage.renzhan2||target.isDead()||target.isOut())){
							event.goto(4);
						}
					}
					target.unmarkSkill('renzhan2');
					target.removeSkill('renzhan2');
				},
				ai:{
					　　maixie:true,
				},
			},
			renzhan2:{
				marktext:"危",
				locked:true,
				intro:{
					name:'危',
					content:'成为瞬息刃斩的目标',
				},
				mark:true,
				firstDo:true,
				silent:true,
				forced:true,
				popup:false,
				trigger:{player:'dying'},
				filter:function(event,player){
					return player.isAlive();
				},
				content:function(){
					console.log('OK');
					player.storage.renzhan2++;
				},
			},
			kuase:{
				unique:true,
				limited:true,
				skillAnimation:true,
				priority:888,
				animationStr:'夸色☆超级梦想',
				trigger:{global:'phaseAfter'},
				prompt:function(){
					var player=_status.event.player;
					return '是否发动“阿库娅色☆超级梦想” \n （本回合所有角色回复体力之和为'+player.storage.kuase_date+'点）';
				},
				filter:function(event,player){
					return player.storage.kuase_date;
				},
				content:function(){
					var dream = player.storage.kuase_date ;
		//			game.hasPlayer(function(cur){
		//				dream += (cur.hp-cur.storage.shenghuang_put);
		//				var damT = cur.getHistory('damage');
		//				var dam = 0;
		//				damT.forEach(function(da){
		//					if(da.num){
		//						dam += da.num;
		//					}
		//				});
		//				dream += dam;			
		//				console.log(dream);
		//			});
					player.draw(dream);
					player.getStat().card.sha=0;
					player.phaseUse();
					player.storage.kuase = true;
					player.awakenSkill('kuase');
				},
				group:['kuase_date','kuase_ret'],
				subSkill:{
					date:{
						init:function(player){
							player.storage.kuase_date = 0;
						},
						forced:true,
						silent:true,
						popup:false,
						priority:777,
						trigger:{global:'recoverAfter'},
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.storage.kuase_date += trigger.num;
						},
					},
					ret:{
						forced:true,
						silent:true,
						popup:false,
						priority:666,
						trigger:{global:'phaseAfter'},
						filter:function(event,player){
							return player.storage.kuase_date;
						},
						content:function(){
							player.storage.kuase_date=0;
						}
					}
				}
			},
			//SP爱丽丝
			xianjing:{
				init:function(player){
					player.storage.xianjing = [];
				},
				marktext:"仙",
				locked:true,
				intro:{
					name:'仙境奇遇',
					content:function (storage,player,skill){
						if(storage.length == 1){
							return '上一张使用的牌，花色为'+ get.translation(storage);
						}
						else if(storage.length > 1){
							return '先前使用的牌，花色为'+ get.translation(storage);
						}
						else{
							return '本回合尚未使用牌';
						}
					},
				},
				trigger:{player:'useCardAfter'},
				forced:false,
				priority:555,
				filter:function(event,player){
					if(!player.storage.xianjing.length){
						return false;
					}else if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(event.card)=='spade')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(event.card)=='diamond')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(event.card)=='club')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(event.card)=='heart')
					){
						return true;
					}
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next=player.chooseTarget(function(card,player,target){
							return true;
						});
						next.set('targetprompt',['JK']);
						next.set('prompt','指定一名角色，令其摸一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						result.targets[0].draw();
					}
				},
				group:['xianjing_update', 'xianjing_back', 'xianjing_discard'],
				subSkill:{
					update:{
						trigger:{player:'useCardAfter'},
						forced:true,
						silent:true,
						priority:544,
						content:function(){
							if(!player.storage.xianjing.length){
								player.storage.xianjing.add(get.suit(trigger.card));
							}
							else if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(trigger.card)=='spade')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(trigger.card)=='diamond')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(trigger.card)=='club')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(trigger.card)=='heart')
							){
								player.storage.xianjing.push(get.suit(trigger.card));
							}else{
								player.storage.xianjing.splice(0, player.storage.xianjing.length, get.suit(trigger.card));
							}
							player.markSkill('xianjing');
							if(player.storage.xianjing.length==4){
								player.storage.duandai++;
								player.markSkill('duandai');
							}
						},
					},
					back:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('xianjing');
							player.storage.xianjing = [];
						}
					},
					discard:{
						trigger:{global:'phaseEnd'},
						forced:false,
						priority:555,
						prompt:'你可选择一项：令一名其他角色获得“小兔子”标记，或令所有“小兔子”各摸一张牌。',
						filter:function(event,player){
							var suits = [];
							game.getGlobalHistory('cardMove',function(evt){
			//					console.log(evt);
								if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.getParent().name=='discard')){
										for(var i=0;i<evt.cards.length;i++){
											suits.add(get.suit(evt.cards[i]));
										}
									}
								});
							if(suits.length == 4)	return true;
						},
						content:function(){
							'step 0'
							player.chooseControlList(
								['令一名其他角色获得“小兔子”标记',
								'令所有“小兔子”各摸一张牌'],
								true,function(event,player){
									return _status.event.index;
								});
							'step 1'
							if(result.index==0){
								game.broadcastAll(function(player){
									var next=player.chooseTarget(function(card,player,target){
										return target!=player&&!target.hasSkill('xiaotuzi');
									});
									next.set('targetprompt',['小兔子']);
									next.set('prompt','指定一名角色，令其成为小兔子');
									next.set('forced',false);
									next.set('ai',function(target){
										var att=get.attitude(player,target);
										return att;
									});
								}, player);
							}
							else if(result.index==1){
								game.hasPlayer(function(cur){
									if(cur.hasSkill('xiaotuzi')){
										cur.draw();
									}
								})
							}
							else{
								event.finish();
							}
							'step 2'
							if(result.bool){
								result.targets[0].addSkill('xiaotuzi');
								result.targets[0].markSkill('xiaotuzi');
							}
						}
					}
				},
			},
			chahui:{
				forced:false,
				priority:543,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					return game.hasPlayer(function(cur){
						return cur.hasSkill('xiaotuzi')&&cur.countCards('h');
					});
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next = player.chooseTarget(function(card, player, target){
							return target!=player&&target.hasSkill('xiaotuzi');
						});
						next.set('prompt','指定一名小兔子，令其出一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						_status.event.target = result.targets[0];
						game.broadcastAll(function(target){
							var next = target.chooseCard('h',1,'是否紧跟爱丽丝之后使用一张牌');
							next.set('forced',false);
							next.set('ai',function(card){
								if(get.name(card)=='shan')	return 10;
								var player;
								game.hasPlayer(function(cur){
									if(cur.hasSkill('chahui'))	player = cur;
								});
								if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(card)=='spade')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(card)=='diamond')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(card)=='club')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(card)=='heart')
								){
									return 100;
								}
							});
						}, _status.event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = result.cards[0];
						if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(event.card)=='spade')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(event.card)=='diamond')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(event.card)=='club')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(event.card)=='heart')
						){
							player.gain(event.card);
							game.log(player, '获得了', event.card)
							player.chooseUseTarget(event.card, true);
						}
						else{
							_status.event.target.chooseUseTarget(event.card, true);
						}
					}
					else{
						event.finish();
					}
				},
			},
			xiaotuzi:{
				forced:false,
				marktext:"🐇",
				mark:true,
				locked:true,
				priority:543,
				intro:{
					name:'<font color=#ee2>小兔子标记</font>',
					content:'成为了爱丽丝的小兔子',
				},
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					return game.hasPlayer(function(cur){
						return cur.hasSkill('chahui')&&cur.countCards('h');
					});
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next = player.chooseTarget(function(card, player, target){
							return target!=player&&target.hasSkill('chahui');
						});
						next.set('prompt','指定爱丽丝，令其出一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						_status.event.target = result.targets[0];
						game.broadcastAll(function(target,trigger){
							var next = target.chooseCard('h',1,'是否紧跟小兔子之后使用一张牌');
							next.set('forced',false);
							next.set('ai',function(card){
								if(get.name(card)=='shan')	return 10;
								if((get.suit(trigger.card)=='heart' && get.suit(card)=='spade')
								||(get.suit(trigger.card)=='spade' && get.suit(card)=='diamond')
								||(get.suit(trigger.card)=='diamond' && get.suit(card)=='club')
								||(get.suit(trigger.card)=='club' && get.suit(card)=='heart')
								){
									return 100;
								}
							});
						}, _status.event.target, trigger);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = result.cards[0];
						if((get.suit(trigger.card)=='heart' && get.suit(event.card)=='spade')
						||(get.suit(trigger.card)=='spade' && get.suit(event.card)=='diamond')
						||(get.suit(trigger.card)=='diamond' && get.suit(event.card)=='club')
						||(get.suit(trigger.card)=='club' && get.suit(event.card)=='heart')
						){
							player.gain(event.card);
							game.log(player, '获得了', event.card)
							player.chooseUseTarget(event.card, true);
						}
						else{
							_status.event.target.chooseUseTarget(event.card, true);
						}
					}
					else{
						event.finish();
					}
				},
				group:['xiaotuzi_lose'],
				subSkill:{
					lose:{
						trigger:{global:'dieBegin'},
						filter:function(event,player){
							return event.player.hasSkill('xianjing');
						},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('xiaotuzi');
							player.removeSkill('xiaotuzi');
						},
					},
				},
			},
			duandai:{
				init:function(player){
					player.storage.duandai = 0;
				},
				locked:true,
				notemp:true,
				marktext: 'Alice',
				intro: {
					content: '已完成一组Alice序列，可以在回合结束时回复体力值',
				},
				skillAnimation:true,
				priority:543,
				animationStr:'嚣张缎带',
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					if(player.hp == player.maxHp)	return false;
					return player.storage.duandai;
				},
				content:function(){
					player.recover(player.maxHp-player.hp);
					player.storage.duandai = 0;
					player.unmarkSkill('duandai');
				}
			},
			
		}, 
		translate:{
			NekomiyaHinata:'猫宫日向',
			yuchong: '一命通关',
			yuchong_info: '<font color=#f66>锁定技</font> 你装备区内的武器牌不能被弃置。你在装备武器时，你手牌中的武器牌均视为不可被响应的杀。',
			songzang: '送葬天使',
			songzang_info: '你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可以弃一张牌令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。',
			zhimao: '只箱只猫',
			zhimao_info: '当你成为非延时性锦囊牌的目标时，若来源在你攻击范围外，你可选择一项：取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。',
			SisterClearie:'修女·克蕾雅',
			zhenxin: '真信之诚',
			zhenxin_info: '<font color=#f66>锁定技</font> 防止每回合你第一次对体力值小于你的角色造成的伤害；防止体力值大于你的角色每回合对你造成的第一次伤害。',
			zhuwei: '助危之心',
			zhuwei_info: '其他角色的结束阶段，若其手牌或体力为全场最少，其可以与你各摸一张牌，然后你可以移动你或其装备区的一张牌。',
			MinatoAqua: '湊阿库娅',
			kuali: '夸力满满',
			kuali_info: '出牌/结束阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。每回合限一次。',
			youyi: '友谊誓约',
			youyi_info: '每轮限一次，其他角色的回合开始时，你可以展示并交给其一张“誓约”牌。本回合内，当其造成伤害时，你可令其将“誓约”牌交给你以防止之。该回合结束时，其可以弃置“誓约”牌令你或其回复1点体力。',
			youyishiyue: '友谊誓约',
			youyishiyue_info: '友谊誓约生效中',
			UsadaPekora: '兔田佩克拉',
			pekoyu: '嚣张咚鼓',
			pekoyu_info: '回合内，当你的非装备牌生效后，若本回合未因此花色的牌发动此技能，你可以摸一张牌然后弃置一张牌。若你因此弃置了【酒】，你可以令一名角色摸两张牌。',
			hongshaoturou: '自煲自足',
			hongshaoturou_info: '出牌阶段限一次，你可以横置武将牌，令你在回合结束时受到1点火焰伤害。然后本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。',
			Paryi: '帕里',
			tiantang: '天堂之扉',
			tiantang_info: '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）',
			haoren: '好人一生',
			haoren_info: '<font color=#fcd>觉醒技</font> 你发动“天堂之扉”后，若发动次数大于存活人数，你扣减1点体力上限，将“天堂之扉”的“其他”改为“一名”；且在“天堂之扉”的额外出牌阶段内，当前回合角色获得“引流”。',
			Civia: '希薇娅',
			kuangxin: '旷心',
			kuangxin2: '旷心',
			kuangxin_info: '每回合限一次。其他角色成为【杀】或伤害类锦囊牌的唯一目标时，你可以观看其手牌并用一张手牌交换其中一张牌，此牌结算后，若其未受到此牌造成的伤害，你与其各摸一张牌。',
			danyan: '弹言',
			danyan_info: '你的牌因弃置而进入弃牌堆时,你可以使用其中的一张牌。',
			qingjie: '轻捷',
			qingjie_info: '<font color=#f66>锁定技</font> 你你计算与装备区内没有坐骑牌的角色的距离视为1；其他角色计算与你的距离时，你每比其多一张手牌，距离便+1。',

			sp_MinatoAqua:'皇·湊阿库娅',
			shenghuang: '圣皇之愈',
			shenghuang_info: '<font color=#f66>锁定技</font> 当你进入濒死状态时，更换新的体力牌。你失去过黑色牌的回合结束时，其他角色将体力回复至回合开始时的状态。',
			renzhan: '瞬息刃斩',
			renzhan_info: '每回合限一次。其他角色受到伤害后，若其未濒死，你可以失去1点体力，亮出牌堆顶牌直到出现【杀】，然后获得这些牌；或获得其中的【杀】并对一名角色使用任意张【杀】，直到其进入濒死状态。',
			kuase: '夸色梦想',
			kuase_info: '<font color=#f5c>限定技</font> 一个回合结束时，若有角色在回合内回复体力，你可以摸X张牌然后执行一个额外的出牌阶段。（X为所有角色本回合回复的体力值之和）',
			
			sp_MononobeAlice: '皇·物述有栖',
			xianjing: '仙境奇遇',
			xianjing_info: '当你使用一张牌后，若与本回合被使用的上一张牌在Alice序列（♥️、♠️、♦️、♣️、♥️......）中连续，你可以令一名角色摸一张牌。一个回合结束时，若此回合进入弃牌堆的牌包含所有花色，你可选择一项：令一名其他角色获得“小兔子”标记，或令所有“小兔子”各摸一张牌。',
			chahui: '茶会交流',
			chahui_info: '你于出牌阶段使用牌后，可以令一名小兔子选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌视为你使用，否则结束出牌阶段。小兔子于出牌阶段使用牌后也可以对你如此做。',
			duandai: '嚣张缎带',
			duandai_info: '回合结束时，若本回合你使用牌完成过一组Alice序列，你可以回复所有体力。',
			xiaotuzi: '小兔子',
			xiaotuzi_info: '成为了爱丽丝的小兔子，于出牌阶段使用牌后，可以令一名爱丽丝选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌视为你使用',
		},
	};
});