'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'vtuber',
		connect:true,
		character:{
			/**绊爱 */
			KizunaAI:['female','upd8',4,['ailian','qixu'],['zhu']],
			/**犬山 */
			InuyamaTamaki:['male','key',3,['rongyaochengyuan','hundunliandong']],
			/**Mishiro */
			ShirayukiMishiro:['female','key',3,['tianyi','nveyu']],
			/**小白 */
			Siro:['female', 'dotlive', 4, ['zhongxinghezou','xiugong'],['zhu']],
			/**巴恰鲁 */
			Bacharu:['male', 'dotlive', 4, ['zuodun','baidao']],
			/**小希小桃 */
			XiaoxiXiaotao:['female','qun',3,['yipengyidou','renleiguancha']],
			/**辉夜月 */
			KaguyaLuna:['female','qun',3,['jiajiupaidui','kuangzuiluanwu']],
			/**兔妈妈 */
			InabaHaneru:['female','nanashi',1,['huangtu','wudao','yinyuan'],['zhu']],
			/**BFM */
			UmoriHinako:['female','nanashi',4,['hongyi','jueshou']],
			/**patra */
			SuouPatra: ['female','nanashi',4,['mianmo','tiaolv'],['forbidai']],
			/**天开司 */
			TenkaiTsukasa: ['male','upd8',4,['pojie','dazhen']],
			/**泠鸢 */
			Yousa:['female','VirtuaReal',3,['niaoji','ysxiangxing']],
			/**贝拉 */
			Bella: ['female','asoul','3/4',['aswusheng', 'gunxun']],
			/**嘉然 */
			Diana: ['female','asoul',4,['quanyu', 'wulian']],
			/**珈乐 */
			Carol: ['female','asoul',4,['shixi', 'xueta','yuezhi']],
		},
		characterTitle:{
			KizunaAI:'#r绊虚之始',
			KaguyaLuna:'#p不羁的夜空之月',
			XiaoxiXiaotao:'#p研虚之实',

			sp_Ava: '#rA-SOUL',
			sp_Diana: '#rA-SOUL',
			Ava: '#rA-SOUL',
			Bella: '#rA-SOUL',
			Diana: '#rA-SOUL',
			Carol: '#rA-SOUL',
			EQueen: '#rA-SOUL',
		},
		characterIntro:{
			KizunaAI:'绊爱者，沛国焦郡人也，生于V始元年，以人工智障号之，有《FAQ赋》流传于世，爱有贤相，名曰望，左右心害其能，因谗之，望行仁义而怀anti，遂还相位，是以绊爱得王V界，威加四海，世人多之.',
			InuyamaTamaki:'犬山玉姬者，草莽微末之士也，原为东都一亭长，后绊爱首义，豪杰并起，犬山自叹曰，金鳞岂是池中物，遂聚族起义，然命运多舛，先败朝廷，又为四天王猜忌，幸而频频与杏社、虹社联动，渐得民心，立国时已四十有六。犬山帐下将军皆封之曰姬，世人戏称之曰娘子军，犬山亦不屑一顾。',
			XiaoxiXiaotao:'小希者，魔都之望族也，魔都的破坏者，屡欲炸虚研村，后为小桃止之，魔都土妹，穿模之神，多有传说流传于世，小桃者，小希之后辈也，昔有伯乐识千里马，小桃制小希亦是之矣，有沙雕观察广为人知。',
			KaguyaLuna:'辉夜月者，燕赵之侠客也，生于V始元年，性豪爽，声奇特，有可卡因酱之美名，luna少时绊爱交好，亲涉矢石披坚执锐，成绊爱之功业，然rap一战，恩断义绝，自领军建国，国号为辉夜月channel，追随者数以兆记。',
			UmoriHinako: '宇森雏子，异界之蝙蝠者，随黄兔因幡氏战于列阳东，伐乌桓、鲜卑、高句丽诸部，取之以红旗，修律，重末，百姓安，震周之诸侯。雏子善战，屡自鼓乐助御敌，谓之《攻击战》，后友人常效之。然雏子初修律，列阳东遭百年不遇之饥，敌者饥之为“绝收将军”，雏子不意此事。V始十九年，为仇设计所刺，不幸卒。后二年，地尽数入于京畿神乐咩之手，咩与雏子为旧识，遂善置此地旧民。',
			InabaHaneru: '因幡哈涅鲁，异界之黄兔者，精通东瀛书花五道，起势以后，割据幽州及扶余，后建社，号曰‘佚’。佚社初效始皇绊爱之治，怀柔四方，广纳封臣，固有宇森雏子、周防帕特拉之能臣，然因幡氏深知功不足自坐此位，终不称王，后竟服于绊爱势。所幸周无大患，因幡氏亦与神乐咩犬山玉姬之势远交联合，佚社渐广，绊爱势溃后，即背，改与魔族周防帕特拉共治。至于雏子卒，因幡甚悲，至常自怨，引怀柔之首共治，杏户氏与龙龙崎氏由此入朝。后之佚社，终黯淡于杏国虹社者。',

			Qiankesaier:'',
		},
		skill:{
			ailian:{
				audio:1,
				enable:'phaseUse',
				position:'h',
				filter:function(event,player){
					if(player.hasSkill('ailianUsable')) return false;
					return player.countCards('h')>0;
				},
				content: function(){
					var trigger=_status.event;
					'step 0'
					if(!player.storage.targets) player.storage.targets=[];
					if(player.countCards('h')>0){
						player.chooseTarget('指定一个给予牌的目标',function(card,player,target){
							//get.distance(target,current,'pure')==1
							if(target==player) return false;
							if(player.storage.targets){
								if(player.storage.targets.length==0) return true;
								for(var i =0; i< player.storage.targets.length;i++){
									if(player.storage.targets[i].group==target.group){
										return false;
									}
								}
								return true
							}
							else{
								return true
							}
						},function(target){
							var player = _status.event.player;
							if(get.attitude(player,target)<=0)	return 0;
							else return get.attitude(player,target);
						});
					}
					else{
					event.goto(3);
					}
					'step 1'
					//console.log(result);
					if(result&&result.bool==false){
						event.goto(3);
					}
					else{
						if(result.targets){
								if(!player.storage.targets) player.storage.targets=[];
							if(!trigger.targets.contains(result.targets[0])){
								trigger.targets.addArray(result.targets);
								player.storage.targets.addArray(result.targets);
							}
							trigger.target=result.targets[0];
						}
						player.chooseCard(true, 'h', '选择要给出的牌',[1,Infinity]).set('ai',function(card){
							if(player.isZhu)	return 6-get.useful(card);
							return 7-get.useful(card);
						})
					}
					'step 2'
					if(result.bool==true){
						trigger.cards.addArray(result.cards);
						trigger.target.gain(result.cards,event.player,'give');
						if(player.countCards('h')){
							event.goto(0);
						}
					}
					else{
						trigger.targets.pop();
						player.storage.targets.pop();
					}
					'step 3'
					var difType=true;
					var TypeList=[];
					if(trigger.targets&&trigger.targets.length>0){
						for(var i=0;i<trigger.cards.length;i++){
							TypeList.add(get.type(trigger.cards[i]));
							if(TypeList.indexOf(get.type(trigger.cards[i]))!=i){
								difType=false;
								break;
							}
						}
					}
					else{
						event.goto(10);
					}
					if(difType==false){
					event.goto(6);
					}
					'step 4'
					player.chooseTarget('是否令'+ trigger.cards.length.toString() +'名角色横置？',trigger.cards.length,function(card,player,target){
						return true;
					});
					'step 5'
					if(result.bool==true){
						result.targets.forEach(element => {
							element.link(); 
						});
					}
					'step 6'
					var distanceGroup=false;
					for(var i=0;i<trigger.targets.length;i++){
						distanceGroup=false;
						for(var j=0;j<trigger.targets.length;j++){
							if(i==j){
								continue;
							}
							else if(get.distance(player.storage.targets[i],player.storage.targets[j],'pure')==1){
								distanceGroup=true;
								break;
							}
						}
						if(distanceGroup==false){
							break;
						}
					}
					if(distanceGroup==false){
					event.goto(10);
					}
					'step 7'
					if(trigger.targets.length>1){
						if(trigger.targets.length>game.countPlayer()-1)
							player.chooseControl(['jiu','tao','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
						else{
							var playersNum=0;
							for(var i=0;i<game.players.length;i++){
								if(lib.filter.filterTarget({name:'sha',isCard:true},player,game.players[i])){
									playersNum++;
								}
							}
							// console.log(lib.filter.filterTarget({name:'sha',isCard:true},player,game.players[0]));
							if(playersNum>=trigger.targets.length&&player.getCardUsable({name:'sha'}))
								player.chooseControl(['jiu','sha','tao','雷杀','火杀','冰杀','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
							else
								player.chooseControl(['jiu','tao','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
						}
					}
					else{
						event.goto(10);
					}
					'step 8'
					if(result.control!='cancel2'){
						var usecard={name:result.control,isCard:true};
						switch (usecard.name) {
							case '雷杀':
								usecard.name='sha';
								usecard.nature='thunder';
								break;
							case '火杀':
								usecard.name='sha';
								usecard.nature='fire';
								break;
							case '冰杀':
								usecard.name='sha';
								usecard.nature='ice';
								break;
							default:
								break;
					}
						trigger.usecard=usecard;
						if(trigger.usecard.name=='sha'){
							player.chooseTarget('选择'+ trigger.targets.length.toString() +'个目标',trigger.targets.length,function(card,player,target){
								if(player==target) return false;
								return lib.filter.filterTarget({name:'sha',isCard:true},player,target)
							});
						}
						else if(trigger.usecard.name!='sha'){
							player.chooseTarget('选择'+ trigger.targets.length.toString() +'个目标',trigger.targets.length,function(card,player,target){
								return true;
							});
						}
						else{
							event.goto(10);
						}
					}
					else{
					event.goto(10);
					}
					'step 9'
					//console.log(result);
					if(result.targets)
						trigger.targets=result.targets;
					else
						trigger.targets=[];
					for(var i=0;i<trigger.targets.length;i++){
					//console.log(trigger.usecard);
						player.useCard(trigger.usecard,trigger.targets[i],false);
						if(trigger.usecard.name=='sha') player.getStat().card.sha++;
						// console.log(player.getStat().card.sha);
					}
					'step 10'
					if(trigger.targets&&trigger.targets.length==0&&trigger.cards.length==0){
						if(player.hasSkill('ailianUsable'))
							player.removeSkill('ailianUsable');
					}
					else{
						player.addSkill('ailianUsable');
						delete player.storage.targets;
						event.finish();
					}
				},
				ai:{
					order:function(skill,player){
						if(game.hasPlayer(function(cur){
							return cur!=player&&get.attitude(player,cur)>0;
						})){
							if(player.needsToDiscard()){
								return 1+Math.random();
							}
							return 5+Math.random();
						}
						else	return 0;
					},
					result:{
						player:function(player,target){
							if(player.needsToDiscard()) return Math.random();
							return Math.random()-0.6;
						}
					},
					threaten:0.8
				},
			},
			ailianUsable:{
				trigger:{global:['phaseUseAfter','phaseAfter']},
				silent:true,
				filter:function(event){
					return event.skill!='ailian';
				},
				content:function(){
					player.removeSkill('ailianUsable');
				}
			},
			qixu:{
				unique:true,
				group:['qixu1','qixu2','qixu4'],
				zhuSkill:true,
			},
			qixu1:{
				trigger:{player:['chooseToRespondBefore']},
				check:function(event){
					if(event.qixu) return false;
					return true;
				},
				filter:function(event,player){
					if(event.responded) return false;
					//if(player.storage.qixuing) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu3')) return false;
					if(!event.filterCard({name:'sha'},player,event)) return false;
					return game.hasPlayer(function(current){
						return current!=player;
					});
				},
				content:function(){
					"step 0"
					if(!player.hasSkill('qixu3'))
						player.addSkill('qixu3');
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.getParent(2).step=0;
						event.finish();
					}
					else if(event.current){
						//player.storage.qixuing=true;
						var next=event.current.chooseCard(get.translation(player)+'声明使用一张杀，是否替弃置一张杀阻止',
						function(card,player,event){
							event=event||_status.event;
							return card.name=='sha';
						},{name:'sha'},1);
						next.set('ai',function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)+1);
						});
						next.set('source',player);
						next.set('qixu',true);
						next.set('skillwarn','阻止'+get.translation(player)+'打出一张杀');
						next.noOrdering=true;
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					//player.storage.qixuing=false;
					if(!result.bool){
						event.current=event.current.next;
						if(event.current==player){
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					else{
						event.current.discard(result.cards);
						event.finish();
					}
					'step 2'
					trigger.result={bool:true,card:{name:'sha',isCard:true}};
					trigger.responded=true;
					trigger.animate=false;
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
					event.finish();
				}
			},
			qixu2:{
				enable:'chooseToUse',
				prompt:'选择一名目标角色。若其他角色不弃置【杀】响应，则视为你对其使用【杀】。',
				filter:function(event,player){
					if(event.filterCard&&!event.filterCard({name:'sha'},player,event)) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu3')) return false;
					if(!lib.filter.cardUsable({name:'sha'},player)) return false;
					return game.hasPlayer(function(current){
						return current!=player;
					});
				},
				filterTarget:function(card,player,target){
					if(_status.event._backup&&
						typeof _status.event._backup.filterTarget=='function'&&
						!_status.event._backup.filterTarget({name:'sha'},player,target)){
						return false;
					}
					return player.canUse({name:'sha'},target);
				},
				content:function(){
					"step 0"
					if(!player.hasSkill('qixu3'))
						player.addSkill('qixu3');
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.getParent(2).step=0;
						event.finish();
					}
					else if(event.current){
						var next=event.current.chooseCard(get.translation(player)+'对'+get.translation(target)+'使用一张杀，是否替弃置一张杀阻止',
						function(card,player,event){
							event=event||_status.event;
							return card.name=='sha';
						},{name:'sha'},1);
						next.set('ai',function(card){
							var event=_status.event;
							return -get.effect(event.target,card,event.source,event.player);
						});
						next.set('source',player);
						next.set('target',target);
						next.set('qixu',true);
						next.set('skillwarn','阻止'+get.translation(player)+'打出一张杀');
						//next.noOrdering=true;
						//next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					if(result.bool){
						event.current.discard(result.cards);
						event.finish();
					}
					else{
						event.current=event.current.next;
						if(event.current==player){
							event.getParent(2).step=0;
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					'step 2'
					if(result.cards&&result.cards.length){
						player.useCard({name:'sha',isCard:true},result.cards,target).animate=false;
					}
					else{
						player.useCard({name:'sha',isCard:true},target).animate=false;
					}
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.hasZhuSkill('qixu')) return false;
						return true;
					},
					result:{
						target:function(player,target){
							if(player.hasSkill('qixu3')) return 0;
							return get.effect(target,{name:'sha'},player,target);
						}
					},
					order:function(){
						return get.order({name:'sha'})-0.1;
					},
				}
			},
			qixu3:{
				trigger:{
					global: 'roundStart'
				},
				mark:true,
				intro:{content:'一轮后重置(杀)'},
				silent:true,
				// filter:function(event){
				// 	return event.skill!='qixu2'&&event.skill!='qixu4';
				// },
				content:function(){
					player.removeSkill('qixu3');
				}
			},
			qixu4:{
				unique:true,
				trigger:{player:['chooseToRespondBefore','chooseToUseBefore']},
				filter:function(event,player){
					if(event.responded) return false;
					//if(player.storage.qixu4) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu5')) return false;
					if(!event.filterCard({name:'shan'},player,event)) return false;
					return true;
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					"step 0"
					player.addSkill('qixu5');
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.goto(2);
					}
					else if(event.current){
							//player.storage.qixu4=true;
							// var next=event.current.chooseToDiscard('弃置一张闪阻止'+get.translation(player)+'发动技能？',{name:'shan'},
							// function(card,player,event){
							// 	event=event||_status.event;
							// 	return card.name=='shan';
							// },1);
							var next=event.current.chooseCard(get.translation(player)+'声明使用一张闪，是否替弃置一张闪阻止',{name:'shan'},
							// function(card,player,event){
							// 	return card.name=='shan';
							// },
							1,false);
							// next.set('ai',function(card){
							// 	var event=_status.event;
							// 	return get.effect(event.target,card,event.event.source,event.player);
							// });
							next.set('ai',function(){
								var event=_status.event;
								return (3-get.attitude(event.player,event.source));
							});
							next.set('skillwarn','阻止'+get.translation(player)+'技能生效');
							next.autochoose=lib.filter.autoRespondShan;
							next.set('source',player);
					}
					"step 1"
					//player.storage.qixu4=false;
					//console.log(result);
					if(result.bool){
						event.current.discard(result.cards);
						event.finish();
					}
					else{
						event.current=event.current.next;
						if(event.current==player){
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					'step 2'
					trigger.result={bool:true,card:{name:'shan',isCard:true}};
					trigger.responded=true;
					trigger.animate=false;
					//player.addSkill('qixu3');
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
					event.finish();
				},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(player.storage.qixu) return false;
						if(!player.hasZhuSkill('qixu')) return false;
						return true;
					},
				},
			},
			qixu5:{
				trigger:{
					global: 'roundStart'
				},
				mark:true,
				intro:{content:'一轮后重置(闪)'},
				silent:true,
				// filter:function(event){
				// 	return event.skill!='qixu2'&&event.skill!='qixu4';
				// },
				content:function(){
					player.removeSkill('qixu5');
				}
			},
			rongyaochengyuan:{
				trigger:{
					player:"damageBegin3",
				},
				//alter:true,
				filter:function (event,player){
					if(event.source==undefined||event.source==player) return false;
					if(event.source.hasSkill('rongyaochengyuan_homolive')) return false;
					return true;
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseBool('是否发动技能,给目标添加homolive标记,并抵挡此次伤害');
					'step 1'
					if(result.bool){
						player.logSkill(trigger.source);
						trigger.source.addSkill('rongyaochengyuan_homolive');
					}
					else{
						event.finish();
					}
					'step 2'
					trigger.num=0;
				},
				subSkill:{
					homolive:{
						mark:true,
						marktext:'HO',
						intro:{
							name:'Homolive',
							content:'我一直都是Homolive的一员啊！'
						},
					},
				},
			},
			hundunliandong:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					if(player.storage.targets==null) {
						player.storage.targets=[];
						player.storage.targets.add(player);
					}
					if(event.dropCardsType==null){
						event.dropCardsType=[];
						event.dropCards=[];
						event.playerIndex=0;
						event.dialogId=0;
					}
					player.chooseTarget('指定一个不同势力目标参与联动',function(card,player,target){
						//get.distance(target,current,'pure')==1
						if(target==player) return false;
						//window.console.log(player.storage);get.distance(target,player.storage.targets[i],'pure')<=1
						if(player.storage.targets){
							if(player.storage.targets.length==0) return true;
							if(target.hasSkill('rongyaochengyuan_homolive')){
								for(var i =0; i< player.storage.targets.length;i++){
									if(player.storage.targets[i].hasSkill('rongyaochengyuan_homolive')){
										return false;
									}
								}
								return true;
							}
							for(var i =0; i< player.storage.targets.length;i++){
								if(player.storage.targets[i].group==target.group){
									return false;
								}
							}
							return true
						}
						else{
							return true
						}
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target)<1;
					});
					'step 1'
					if(result&&result.bool==false){
						event.goto(2);
					}
					else{
						player.storage.targets.add(result.targets[0]);
						event.goto(0);
					}
					'step 2'
					if(player.storage.targets.length>1){
						if(player.storage.targets[event.playerIndex].countCards('he')){
							event.handcardsCount= player.storage.targets[event.playerIndex].countCards('h');
							player.storage.targets[event.playerIndex].chooseToDiscard(true,1,'he','弃置一张牌');
						}
						else{
							event.handcardsCount=-1;
						}
					}
					else{
						event.goto(4);
					}
					'step 3'
					if(event.handcardsCount!=-1){
						if(player.storage.targets[event.playerIndex].countCards('h')==0&&event.handcardsCount!=0){
							event.goto(4);
						}
						else{
							if(result.cards&&result.cards.length){
								event.dropCards.add(result.cards[0]);
								if(!event.dropCardsType.contains(get.suit(result.cards[0]))){
									event.dropCardsType.add(get.suit(result.cards[0]));
								}
							}
							///显示当前弃牌框，待改进
							ui.clear();
							for(var i=0;i<ui.dialogs.length;i++){
								if(ui.dialogs[i].videoId==event.dialogId){
									var dialog=ui.dialogs[i];
									dialog.close();
									_status.dieClose.remove(dialog);
									break;
								}
							}
							game.broadcast(function(id){
								var dialog=get.idDialog(id);
								if(dialog){
									dialog.close();
									_status.dieClose.remove(dialog);
								}
							},event.dialogId);
							var dialog=ui.create.dialog('混沌联动',event.dropCards,true);
							_status.dieClose.push(dialog);
							dialog.videoId=lib.status.videoId++;
							game.broadcast(function(cards,id){
								var dialog=ui.create.dialog('混沌联动',cards,true);
								_status.dieClose.push(dialog);
								dialog.videoId=id;
							},event.dropCards,dialog.videoId);
							event.dialogId=dialog.videoId;
							///显示当前弃牌框，待改进
							if(event.dropCardsType.length>3){
								event.goto(4);
							}
							else{
								event.playerIndex++;
								if(event.playerIndex>=player.storage.targets.length){
									event.playerIndex=0;
								}
								event.goto(2);
							}
						}
					}
					else{
						player.storage.targets.splice(event.playerIndex,1);
						if(event.playerIndex<player.storage.targets.length){
							event.goto(2);
						}
						else{
							event.playerIndex=0;
							event.goto(2);
						}
					}
					'step 4'
					delete player.storage.targets;
					///显示当前弃牌框，待改进
					ui.clear();
					for(var i=0;i<ui.dialogs.length;i++){
						if(ui.dialogs[i].videoId==event.dialogId){
							var dialog=ui.dialogs[i];
							dialog.close();
							_status.dieClose.remove(dialog);
							break;
						}
					}
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialogId);
					event.finish();
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if((get.mode()!='identity'||game.roundNumber>1)&&player.countCards('h')>1)	return 1;
							else return -0.2;
						},
					},
				},

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
				filter:function(event,player){
					if (!(get.itemtype(event.cards) == 'cards')) return false
					// if (event.getParent().triggeredTargets3.length > 1) return false;
					return get.number(event.card)&&!player.hasSkill('zhongxinghezou_used');
				},
				check:function(event,player){
					var effect=0;
					if(event.card.name=='wuxie'||event.card.name=='shan'){
						if(get.attitude(player,event.starget)<-1){
							effect=-1;
						}
					}
					else if(event.targets&&event.targets.length){
						for(var i=0;i<event.targets.length;i++){
							effect+=get.effect(event.targets[i],event.card,event.player,player);
						}
					}
					return get.number(event.card)<6||effect<3;
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
					if (result.bool&&result.targets[0]) {
						event.starget = result.targets[0];
						var att = get.attitude(event.starget,player);
						var num = get.number(trigger.card);
						var effect=0;
						if(trigger.card.name=='wuxie'||trigger.card.name=='shan'){
							if(get.attitude(player,event.starget)<-1){
								effect=-1;
							}
						}
						else if(trigger.targets&&trigger.targets.length){
							for(var i=0;i<trigger.targets.length;i++){
								effect+=get.effect(trigger.targets[i],trigger.card,event.starget,player);
							}
						}
						event.starget.chooseCard(true, 'h','众星合奏：亮出一张手牌').set('ai',function(card){
							var att = _status.event.att;
							var num = _status.event.num;
							var player = _status.event.player;
							var effect = _status.event.effect;
							if(get.number(card)+num==12){
								if(att>0||get.recoverEffect(player,player,player)) return	8-get.useful(card);
								else	return 0;
							}
							else if(get.number(card)+num<12){
								return -effect-get.useful(card);
							}
							else{
								return 4-get.useful(card);
							}
						}).set('att',att).set('num',num).set('effect',effect)
					}
					else {
						event.finish();
					}
					'step 2'
					if (result.bool && result.cards.length) {
						player.addTempSkill('zhongxinghezou_used')
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
					used:{},
				}
			},
			xiugong:{
				trigger:{player:'phaseUseBegin'},
				priority:199,
				filter:function(event,player){
					return game.hasPlayer(function(cur){
						return cur!=player;
					});
				},
				check:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					player.chooseTarget('选择『天道宿宫』的目标',true,function(card,player,target){
						return target!=player
					});
					'step 1'
					if(result.bool){
						event.target = result.targets[0];
						event.num = event.target.countCards('h');
						if(event.num>0){
							event.reality = event.target.countCards('h',{type:['trick','delay']});
							var rand = 1.5*Math.pow(Math.random(),event.num)
							if(player.hasSkillTag('viewHandcard',null,event.target,true))	rand = 1;
							var list = ['0张'];
							for(var i=1;i<=event.num;i++){
								list.push(i+'张');
							}
							player.chooseControl('dialogcontrol',list,true).set('ai',function(){
								var num = _status.event.num;
								console.log(event.getRand());
								console.log(_status.event.rand);
								if(_status.event.rand>event.getRand()){
									console.log(_status.event.reality)
									return _status.event.reality+'张';
								}
								if(event.getRand()<1/num)	return _status.event.reality+'张';
								return list.randomGet();
							}).set('prompt','猜测'+get.translation(event.target)+'手牌中锦囊牌的数量').set('num',event.num).set('rand',rand).set('reality',event.reality);
						}else{
							player.draw();
							event.finish();
						}
					}
					'step 2'
					if(result.control){
						game.log(player,'猜测',event.target,'手中有'+result.control+'锦囊牌');
						player.popup(result.control);
						var num = result.control.substring(0,1);
						event.target.showHandcards();
						if(num==event.reality){
							player.draw();
							if(player.storage.xiugong_times==0)	player.storage.xiugong_times = num;
						}
					}
				},
				group:['xiugong_times','xiugong_clear'],
				subSkill:{
					times:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=0;
						},
						trigger:{player:'useCard2'},
						firstDo:true,
						forced:true,
						filter:function(event,player){
							console.log(player.storage.xiugong_times)
							return player.storage.xiugong_times>0&&player.hasSkill('zhongxinghezou_used');
						},
						content:function(){
							player.storage.xiugong_times--;
							player.removeSkill('zhongxinghezou_used');
						},
					},
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.baidao_times!=0;
						},
						content:function(){
							player.storage.baidao_times=0;
						},
					}
				}
			},
			zuodun:{
				audio:2,
				trigger:{global:'damageBegin3'},
				usable:1,
				priority:1,
				popup:false,
				filter:function(event,player){
					return event.player!=player&&event.num;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>1;
				},
				content:function(){
					player.logSkill('zuodun',trigger.player);
					trigger.player = player;
					game.asyncDraw([player,trigger.source]);
					if(!player.hasSkill('zhongxinghezou')){
						player.addTempSkill('zhongxinghezou',{player:'phaseAfter'});
					}
				},
				derivation:'zhongxinghezou',
			},
			baidao:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h');
				},
				filterCard:true,
				selectCard:-1,
				position:'h',
				discard:false,
				lose:false,
				content:function(){
					player.showHandcards();
					var overJ = cards.filter(function(card){
						return get.number(card)>11;
					});
					var under3 = cards.filter(function(card){
						return get.number(card)<3;
					});
					player.recover(overJ.length);
					if(under3.length&&player.hasSkill('zhongxinghezou')){
						if(player.getStat().skill.zhongxinghezou){
							player.getStat().skill.zhongxinghezou--;
							player.storage.baidao_times+=(under3.length-1);
						}else{
							player.storage.baidao_times+=under3.length;
						}
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player,target){
							if(player.countCards('h',function(card){
								return get.number(card)>11;
							})&&player.hp<player.maxHp)	return 2;
							else return -0.2;
						},
					},
				},
				group:['baidao_times','baidao_clear'],
				subSkill:{
					times:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=0;
						},
						trigger:{player:'useCard2'},
						firstDo:true,
						forced:true,
						filter:function(event,player){
							console.log(player.storage.baidao_times)
							return player.storage.baidao_times>0&&player.hasSkill('zhongxinghezou_used');
						},
						content:function(){
							player.storage.baidao_times--;
							player.removeSkill('zhongxinghezou_used');
						},
					},
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.baidao_times!=0;
						},
						content:function(){
							player.storage.baidao_times=0;
						},
					}
				}
			},
			yipengyidou:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target);
					"step 1"
					event.resultBool=result.bool;
					event.loop=true;//循环一次（询问是否发动效果后）
					event.cards=[];
					"step 2"
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==trigger||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							if(get.type(card)!='equip'&&get.type(card)!='delay'&&!get.info(card).multitarget&&get.info(card).name!='shan'){
								if((event.loop&&event.resultBool)||(!event.loop&&!event.resultBool)){
									if(game.hasPlayer(function(current){
										return player.canUse(card,current);
									})){
									event.cards.add(card);
									}
								}
								else if((event.loop&&!event.resultBool)||(!event.loop&&event.resultBool)){
									if(game.hasPlayer(function(current){
										return event.target.canUse(card,current);
									})){
									event.cards.add(card);
									}
								}
							}
						}
					},trigger);
					if(event.cards.length<=0){
						event.finish();
					}
					else{
						game.cardsGotoOrdering(event.cards).relatedEvent=event.getParent();
						var dialog=ui.create.dialog('一捧一逗',event.cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=lib.status.videoId++;
						game.addVideo('cardDialog',null,['一捧一逗',get.cardsInfo(event.cards),dialog.videoId]);
						event.getParent().preResult=dialog.videoId;
						game.broadcast(function(cards,id){
							var dialog=ui.create.dialog('一捧一逗',cards,true);
							_status.dieClose.push(dialog);
							dialog.videoId=id;
						},event.cards,dialog.videoId);
						event.dialog=dialog;
					}
					"step 3"
					if(event.resultBool){
						player.chooseCard(1,'he','是否将一张牌当其中一张牌打出?');
					}
					else{
						event.target.chooseCard(1,'he','是否将一张牌当其中一张牌打出?');
					}
					"step 4"
					if(result.bool){
						console.log(result);
						event.viewAsCards=result.cards;
						if(event.resultBool){
							game.log(player,'观看了','#y弃牌堆的牌');
							var chooseButton=player.chooseButton(true,function(button){
								return get.value(button.link,_status.event.player);
							}).set('dialog',event.dialog.videoId);
							event.chooseButton=chooseButton;
						}
						else{
							game.log(event.target,'观看了','#y弃牌堆的牌');
							var chooseButton=event.target.chooseButton(true,function(button){
								return get.value(button.link,_status.event.player);
							}).set('dialog',event.dialog.videoId);
							event.chooseButton=chooseButton;
						}
					}
					else{
						event.goto(6);
					}
					"step 5"
					if(!result.links[0]){
						event.goto(6);
					}
					else{
						event.cardUse = result.links[0];
						if(event.resultBool){
							if(player.hasUseTarget(event.cardUse)){
								//player.chooseUseTarget(result.links[0],true,false);
								player.chooseUseTarget(result.links[0],event.viewAsCards,true,false).viewAs=true;
							}
						}
						else{
							if(event.target.hasUseTarget(event.cardUse)){
								event.target.chooseUseTarget(result.links[0],event.viewAsCards,true,false).viewAs=true;
							}
						}
					}
					"step 6"
					ui.clear();
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
					if(event.loop){
						event.loop=false;
						event.resultBool=!event.resultBool;
						if(event.resultBool){
							player.chooseBool('同样发动一次效果，或取消使对方回复一点体力').set('ai',function(){
								var player = _status.event.player;
								var target = _status.event.getParent().target;
								if(get.recoverEffect(target,player,player)>1)	return 0;
								else return -0.2+Math.random();
							});
						}
						else{
							event.target.chooseBool('同样发动一次效果，或取消使对方回复一点体力').set('ai',function(){
								var player = _status.event.player;
								var target = _status.event.getParent().player;
								if(get.recoverEffect(target,player,player)>1)	return 0;
								else return -0.2+Math.random();
							});
						}
					}
					else{
						event.finish();
					}
					"step 7"
					if(result.bool){
						event.goto(2);
					}
					else{
						if(event.resultBool){
							event.target.recover();
						}
						else{
							player.recover();
						}
					}
				},
				ai:{
					order:8,
					result:{
						target:0.5,
					},
				},
			},
			renleiguancha:{
				trigger:{player:'phaseEnd'},
				content:function(){
					'step 0'
					player.chooseTarget(1,'选择观察目标',function(card,player,target){
						return player!=target;
					});
					'step 1'
					if(result.bool){
						result.targets[0].addSkill('renleiguancha_mark');
					}
				},
				group:['renleiguancha_phaseStart','renleiguancha_damage','renleiguancha_die'],
				subSkill:{
					mark:{
						mark:true,
						intro:{
							content:'造成伤害，杀死玩家与死亡都被列入了观察项目'
						},
					},
					phaseStart:{
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							return player.hasSkill('renleiguancha_damaged')||player.hasSkill('renleiguancha_dead')||game.filterPlayer(function(current){
								if(current.hasSkill('renleiguancha_mark')){
									return true;
								}
								else
									return false;
							}).length>0
						},
						content:function(){
							'step 0'
							game.filterPlayer(function(current){
								if(current.hasSkill('renleiguancha_mark')){
									current.removeSkill('renleiguancha_mark');
									return true;
								}
								else
									return false;
							});
							if(!player.hasSkill('renleiguancha_damaged')&&!player.hasSkill('renleiguancha_dead')){
								player.draw(2);
								player.loseHp();
								event.finish();
							}
							'step 1'
							if(player.hasSkill('renleiguancha_damaged')){
								player.draw(1);
								player.removeSkill('renleiguancha_damaged');
							}
							'step 2'
							if(player.hasSkill('renleiguancha_dead')){
								player.removeSkill('renleiguancha_dead');
								player.chooseTarget(1,'对一名角色造成一点伤害');
							}
							else{
								event.finish();
							}
							'step 3'
							if(result.bool){
								result.targets[0].damage(player);
							}
						}
					},
					damage:{
						trigger:{global:'damageAfter'},
						forced:true,
						filter:function(event,player){
							if(event.source){
								return event.source.hasSkill('renleiguancha_mark');//||event.player.hasSkill('renleiguancha_mark');
							}
							else
								return false;
								//return event.player.hasSkill('renleiguancha_mark');
						},
						content:function(){
							player.addSkill('renleiguancha_damaged');
						}
					},
					die:{
						trigger:{global:'dieBefore'},
						forced:true,
						filter:function(event,player){
							if(event.source){
								return event.source.hasSkill('renleiguancha_mark')||event.player.hasSkill('renleiguancha_mark');
							}
							else
								return event.player.hasSkill('renleiguancha_mark');
						},
						content:function(){
							player.addSkill('renleiguancha_dead');
						}
					},
					damaged:{
						mark:true,
						marktext:'伤',
						intro:{
							content:'观察目标造成了伤害'
						},
					},
					dead:{
						mark:true,
						marktext:'亡',
						intro:{
							content:'观察目标死亡或杀死过角色'
						},
					}
				}
			},
			jiajiupaidui:{
				audio:3,
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.hasSkill('jiajiupaidui_tag')) return false;
					return event.filterCard({name:'jiu',isCard:true},player,event);
				},
				filterTarget:function(card,player,target){
					return target.countCards('he');
				},
				selectTarget:2,
				multitarget:true,
				content:function(){
					"step 0"
					player.addSkill('jiajiupaidui_tag');
					event.targets=targets;
					event.discardNum=targets.length;
					"step 1"
					if(event.discardNum>1){
						event.one=event.targets[0].chooseCard(1,'he','弃置一张牌(若其中有♠或点数9，则视为'+get.translation(player)+'使用了一张酒)',true);
						event.two=event.targets[1].chooseCard(1,'he','弃置一张牌(若其中有♠或点数9，则视为'+get.translation(player)+'使用了一张酒)',true);
					}
					else{
						event.onlyOne=event.targets[0].chooseCard(2,'he','弃置两张牌(若其中有♠或点数9，则视为'+get.translation(player)+'使用了一张酒)',true);
					}
					"step 2"
					event.discardCards=[];
					if(event.onlyOne!=undefined){
						event.discardCards.addArray(event.onlyOne.result.cards);
					}
					else{
						event.discardCards.addArray(event.one.result.cards);
						event.discardCards.addArray(event.two.result.cards);
					}
					"step 3"
					event.targets[0].lose(event.one.result.cards,ui.ordering);
					event.targets[1].lose(event.two.result.cards,ui.ordering);
					event.targets[0].$throw(event.one.result.cards);
					game.log(event.targets[0],'弃置了',event.one.result.cards)
					event.targets[1].$throw(event.two.result.cards);
					game.log(event.targets[1],'弃置了',event.two.result.cards)
					game.delayx();
					//game.cardsDiscard(event.discardCards);
					//game.log()
					event.isJiu=false;
					event.allJiu=true;
					event.discardCards.forEach(discard => {
						if(get.suit(discard)=='spade'||get.number(discard)==9)
							event.isJiu=true;
						else{
							event.allJiu=false;
						}
					});
					if(event.isJiu){
						if(_status.event.getParent(2).type=='dying'){
							event.dying=player;
							event.type='dying';
						}
						player.useCard({name:'jiu',isCard:true},player);
					}
					else{
						event.finish();
					}
					"step 4"
					player.getStat().card.jiu--;
					if(event.allJiu){
						player.removeSkill('jiajiupaidui_tag');
						player.draw();
					}
				},
				ai:{
					order:9,
					result:{
						player:0.8,
						target:-1,
						expose:0.4,
					},
					threaten:1.2
				},
				subSkill:{
					tag:{
						trigger:{global:'roundStart'},
						direct:true,
						mark:true,
						intro:{
							content:'下轮开始后可以再次使用技能'
						},
						content:function(){
							player.removeSkill('jiajiupaidui_tag');
						}
					},
				}
			},
			kuangzuiluanwu:{
				audio:1,
				// group:['kuangzuiluanwu_tag'],
				// subSkill:{
				//	tag:{
				unique:true,
				enable:'phaseUse',
				limited:true,
				skillAnimation:'epic',
				animationColor:'thunder',
				filter:function(card,player,target){
					return player.storage.jiu;
				},
				content:function(){
					'step 0'
					player.awakenSkill('kuangzuiluanwu');
					player.addSkill('kuangzuiluanwu_damage');
					'step 1'
					player.chooseTarget(player.storage.jiu,'选择杀的目标',function(card,player,target){
						return lib.filter.targetEnabled2({name:'sha'},player,target);
						//return player.canUse({name:'sha'},target);
					})
					'step 2'
					if(result.bool){
						if(result.targets){
							event.shaEvent=player.useCard({name:'sha'},result.targets);
						}
					}
					'step 3'
					player.addSkill('kuangzuiluanwu_count');
					player.removeSkill('kuangzuiluanwu_damage');
				},
				intro:{
					content:function(storage, player, skill){
						if(player.storage.jiu)
							return '未发动。当前使用酒计数:'+(player.storage.jiu).toString()
						else
							return '未发动。当前使用酒计数:0'
					}
				},
				subSkill:{
					count:{
						mark:true,
						marktext:"酒",
						trigger:{player:'phaseEnd'},
						direct:true,
						content:function(){
							if(player.hasSkill('kuangzuiluanwu_damage'))
								player.removeSkill('kuangzuiluanwu_damage');
						},
						intro:{
							content:function(storage, player, skill){
								if(player.storage.jiu)
									return '已发动。当前使用酒计数:'+(player.storage.jiu).toString()
								else
									return '已发动。当前使用酒计数:0'
							}
						},
					},
					damage:{
						trigger:{global:'damage'},
						direct:true,
						content:function(){
							player.loseMaxHp();
						}
					}
				}
			},
			//黄兔
			huangtu:{
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return game.countPlayer(function(cur){
						return !cur.storage.nohp&&cur.maxHp!=Infinity&&cur!=player;
					});
				},
				audio:6,
				content:function(){
					'step 0'
					player.chooseTarget('请选择『颂恩』的目标',lib.translate.huangtu_info,true,function(card,player,target){
						if(target.storage.nohp||target.maxHp==Infinity)	return false
						return target!=player&&(!player.storage.huangtu2||!player.storage.huangtu2.contains(target));
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return att+1;
						if(att==0) return Math.random();
						return att;
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						if(!player.storage.huangtu2) player.storage.huangtu2=[];
						player.storage.huangtu2.add(event.target);
						player.addSkill('huangtu2');
						player.addSkill('huangtu3');
					}
					'step 2'
					var target = event.target;
					target.storage.huangtu_mark = player;
					target.addSkill('huangtu_mark');
					'step 3'
					var target = event.target;
					player.gainMaxHp(target.maxHp);
					player.recover(target.maxHp);
				}
			},
			huangtu_mark:{
				mark:'character',
				intro:{
					name:'颂恩',
					content:'当你在$的回合外体力变化时，$体力进行同样的变化，当$在自己的回合内合体力变化时，你体力进行同样的变化'
				},
				onremove:true,
			},
			huangtu2:{
				trigger:{global:['damageEnd','recoverEnd','loseHpEnd']},
				forced:true,
				filter:function(event,player){
					if(player==_status.currentPhase&&player==event.player)	return true;
					if(event.player.isDead()||event.num==0) return false;
					return player.storage.huangtu2&&player.storage.huangtu2.contains(event.player)&&player!=_status.currentPhase;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					if(trigger.player==player){
						var target = player.storage.huangtu2[0];
						target[trigger.name](trigger.num,'nosource');
						if(target.storage.huangtu_mark!=player){
							target.storage.huangtu_mark = player;
						}
						target.markSkill('huangtu_mark');
						event.finish();
					}
					'step 1'
					var target = trigger.player;
					if(target.storage.huangtu_mark!=player){
						target.storage.huangtu_mark = player;
					}
					target.markSkill('huangtu_mark');
					game.delayx();
					'step 2'
					player[trigger.name](trigger.num,'nosource');
				},
				onremove:function(player){
					if(!player.storage.huangtu2) return;
					var splayer = player.storage.huangtu2[0];
					splayer.removeSkill('huangtu_mark');
					delete player.storage.huangtu2;
				},
			},
			huangtu3:{
				trigger:{global:'dieBegin'},
				silent:true,
				filter:function(event,player){
					return event.player==player||player.storage.huangtu2&&player.storage.huangtu2.contains(player);
				},
				content:function(){
					if(player==event.player) player.removeSkill('huangtu2');
					else player.storage.huangtu2.remove(event.player);
				}
			},
			wudao:{
				init:function(player,skill){
					var list = [];
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						if(get.type(name)=='basic') list.push(name);
					}
					if(!player.storage[skill]) player.storage[skill] = list;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',function(card,player){
						return event.player.storage.wudao.contains(get.name(card));
					})>0;
				},
				filterCard:function(card,player,event){
					return player.storage.wudao.contains(get.name(card));
				},
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				position:'h',
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					player.draw();
//					console.log(player.storage.wudao);
					player.storage.wudao.remove(get.name(event.cards[0]));
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:1,
					},
				},
				group:['wudao_useEnd','wudao_clear'],
				subSkill:{
					useEnd:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.wudao.length==0;
						},
						content:function(){
							'step 0'
							if(player.storage.wudao.length){
								event.finish();
							}else{
								player.logSkill('wudao');
							}
							'step 1'
							var list=['摸两张牌','回复体力'];
							game.broadcastAll(function(player,list){
								var dialog = ui.create.dialog('选择一项',[list,'vcard']);
								player.chooseButton(dialog,true);
							}, player, list)
							'step 2'
							if(result.buttons[0].link[2]=='摸两张牌'){
								player.draw(2);
							}
							if(result.buttons[0].link[2]=='回复体力'){
								player.recover();
							}
						}
					},
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							var list = [];
							for(var i=0;i<lib.inpile.length;i++){
								var name=lib.inpile[i];
								if(get.type(name)=='basic') list.push(name);
							}
							player.storage.wudao = list;
						},
					},
				}
			},
			yinyuan:{
				zhuSkill:true,
				trigger:{player:'wudao_useEndAfter'},
				filter:function(event,player){
					if(!player.hasZhuSkill('yinyuan')) return false;
					return event._result;
				},
				content:function(){
					'step 0'
					var next = player.chooseTarget();
					next.set('filterTarget',function(card,player,target){
						return target!=player&&target.group==player.group;
					});
					if(trigger._result&&trigger._result.length){
						next.set('prompt2','失去一点体力上限，令其回复一点体力');
					}else if(trigger._result&&trigger._result.links&&trigger._result.links[0][3]=='回复体力'){
						next.set('prompt2','失去一点体力上限，令其摸两张牌');
					}
					'step 1'
					if(result.bool){
						player.loseMaxHp();
						if(trigger._result&&trigger._result.length){
							result.targets[0].recover(player);
						}else if(trigger._result&&trigger._result.links&&trigger._result.links[0][3]=='回复体力'){
							result.targets[0].draw(2,player);
						}
					}
				}
			},
			//蝙蝠妹
			hongyi:{
				trigger:{global:'judgeAfter'},
				usable:1,
				filter:function(event,player){
					return event.result.color=='red'&&player!=_status.currentPhase&&_status.currentPhase.countCards('he');
				},
				content:function(){
					'step 0'
					_status.currentPhase.chooseCard('he',true,'『红移』：你需要交给'+get.translation(player)+'一张牌');
					'step 1'
					if(result.bool)
					player.gain(result.cards[0],_status.currentPhase,'giveAuto');
				}
			},
			jueshou:{
				enable: 'phaseUse',
				filter:function(event,player){
					if(player.hasSkill('jueshou_used'))	return false;
					var cards=player.getCards('he',{color:'black'});
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i],'trick')!='trick') return true;
					}
					return false;
				},
				position:'he',
				filterCard:function(card,player){
					if(get.type(card,'trick')=='trick') return false;
					return get.color(card)=='black'&&get.owner(card)==player;
				},
				check:function(card){
					return 7-get.value(card);
				},
				discard:false,
				prepare:'throw',
				filterTarget:function(card,player,target){
					if(get.suit(card)=='club') return lib.filter.targetEnabled2({name:'bingliang'},player,target)
					return lib.filter.filterTarget({name:'bingliang'},player,target);
				},
				content:function(){
					player.addTempSkill('jueshou_used','phaseUseEnd');
					player.useCard({name:'bingliang'},target,cards).animate=false;
					if(get.type(cards[0])=='equip'){
						player.addTempSkill('jueshou_dist',{player:'phaseZhunbeiBegin'});
					}
				},
				subSkill:{
					dist:{
						mod:{
							globalTo:function(from,to,distance){
								return distance+1;
							},
						},
					},
					used:{},
				},
				ai:{
					result:{
						target:function(player,target){
							return get.effect(target,{name:'bingliang'},player,target);
						}
					},
					order:9,
				}
			},
		},
		card:{
			"feichu_equip1":{
				type:"equip",
				subtype:"equip1",
			},
			"feichu_equip2":{
				type:"equip",
				subtype:"equip2",
			},
			"feichu_equip3":{
				type:"equip",
				subtype:"equip3",
			},
			"feichu_equip4":{
				type:"equip",
				subtype:"equip4",
			},
			"feichu_equip5":{
				type:"equip",
				subtype:"equip5",
			},
			disable_judge:{},
		},
		characterReplace:{
			KizunaAI:['re_KizunaAI','KizunaAI'],
			KaguyaLuna:['re_KaguyaLuna','KaguyaLuna'],
			XiaoxiXiaotao:['re_XiaoxiXiaotao','XiaoxiXiaotao'],
			InuyamaTamaki:['re_InuyamaTamaki','InuyamaTamaki'],
		},
		translate:{
			vtuber_upd8:'UPD8',
			KizunaAI:'绊爱',
			KizunaAI_info:'绊爱',
			ailian:'爱链',
			ailian_info:'出牌阶段限一次，你可以将任意手牌展示并交给势力不重复的其他角色，若给出的牌类型均不同，你可以令等量角色横置；若获得牌的角色互相相邻，你可以视为使用了一张指定目标数等于获得牌角色数的基本牌。',
			qixu:'启虚',
			qixu1:'启虚',
			qixu2:'启虚',
			qixu3:'杀启虚',
			qixu4:'启虚',
			qixu5:'闪启虚',
			qixu_info:'<font color=#ff4>主公技</font> 当你需要使用或打出【杀】或【闪】时，你可以声明之，若没有角色弃置一张声明牌，则视为你使用或打出了此牌。每轮每项限一次。',
			
			InuyamaTamaki:'犬山玉姬',
			InuyamaTamaki_info:'犬山玉姬',
			rongyaochengyuan:'荣誉成员',
			rongyaochengyuan_info:'其他势力角色对你造成伤害时，若其没有“homolive”标记，你可令其获得一个，然后防止此伤害。',
			hundunliandong:'混沌联动',
			hundunliandong_info:'出牌阶段限一次，你可以指定包括你在内势力各不同的任意名角色，从你开始依次弃一张牌直到：共有四种花色；或有角色因此失去最后一张手牌。此技能计算势力时，拥有“homolive”标记的角色视为同一势力',
			
			Siro: '电脑少女小白',
			zhongxinghezou: '众星合奏',
			zhongxinghezou_info: '每回合限一次。你使用实体牌指定目标后，可令目标外的一名角色亮出一张牌。若两牌点数之和：小于12，你获得亮出牌令你使用的牌无效；不小于12，你使用的牌结算后，亮出牌的角色对同目标使用亮出牌；等于12，你获得亮出牌并令亮出牌的角色回复1点体力。',
			xiugong: '天道宿宫',
			xiugong_info: '出牌阶段开始时，你可以猜测一名其他角色手牌中锦囊牌的数量并令其展示手牌，若猜测正确，你摸一张牌并令你本回合的『众星合奏』增加等量次数上限。',

			Bacharu: '巴恰鲁',
			zuodun: '我身作盾',
			zuodun_info: '每回合限一次，其他角色受到伤害时，你可将此伤害转移给你，然后你与伤害来源各摸一张牌并获得“众星合奏”直到你的回合结束。',
			baidao: '白道游星',
			baidao_info: '出牌阶段限一次，你可以展示所有手牌，每有一张点数大于J便回复1点体力；每有一张点数小于3，你本回合便可额外发动一次“众星合奏”。',

			XiaoxiXiaotao:'小希小桃',
			XiaoxiXiaotao_info:'小希小桃',
			yipengyidou:'一捧一逗',
			yipengyidou_info:'出牌阶段限一次，你可与一名其他角色拼点，赢的角色可以立即将一张牌当本阶段进入弃牌堆的一张基本牌或通常单体锦囊牌使用。然后没赢的角色也可如此做；或令赢的角色回复1点体力。',
			renleiguancha:'人类观察',
			renleiguancha_info:'结束阶段，你可以选择一名其他角色。你的下回合开始时，若该角色在期间：造成过伤害~你摸一张牌；死亡或杀死过角色~你造成1点伤害；以上皆无~你摸两张牌并失去1点体力。',
			
			KaguyaLuna:'辉夜月',
			KaguyaLuna_info:'辉夜月',
			jiajiupaidui:'假酒派对',
			jiajiupaidui_info:'每轮限一次，当你需要使用【酒】时，你可以令两名角色各弃置一张牌，若其中包含♠或点数9，视为你使用之（不计入次数）。若均为♠或点数9，你摸一张牌并重置此技能。',
			kuangzuiluanwu:'狂醉乱舞',
			kuangzuiluanwu_info:'<font color=#daa>限定技</font> 出牌阶段，你可以视为使用了一张目标数为X的【杀】，你每因此造成一次伤害，便扣减1点体力上限。（X为你本回合使用【酒】的次数）',
		
			InabaHaneru: '因幡はねる',
			huangtu: '颂恩',
			huangtu_info: '<font color=#f66>锁定技</font> 游戏开始时，你选择一名其他角色，增加与其相同的体力上限和体力。回合外，其体力变化时，你的体力进行同样的变化；回合内，你体力变化时，其体力进行同样的变化。',
			wudao: '五道',
			wudao_info: '出牌阶段，你可以重铸一张基本牌，你以此法重铸的牌须与本回合之前重铸的牌名不同。出牌阶段结束时，若本回合你重铸了所有牌名的基本牌，你可以摸两张牌或回复1点体力。',
			wudao_useEnd_info: '本回合你重铸了所有牌名的基本牌，你可以摸两张牌或回复1点体力。',
			yinyuan: '缘斩',
			yinyuan_info: '<font color=#ff4>主公技</font> 若你在出牌阶段结束时发动『五道』，你可以扣减一点体力上限，令其他一名同势力角色执行未被选择一项。',

			UmoriHinako: '宇森ひなこ',
			hongyi: '红移',
			hongyi_info: '每回合限一次。当出现红色判定结果后，你可以令当前回合角色交给你一张牌。',
			jueshou: '绝收',
			jueshou_info: '出牌阶段限一次，你可以将一张黑色基本牌或装备牌当作【兵粮寸断】使用，若为♣，则此【兵粮寸断】无距离限制；若为装备牌，其他角色计算与你的距离+1直到你下个回合开始。',

		},
	};
});
