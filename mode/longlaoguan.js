'use strict';

game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'longlaoguan',
		start:function(){
			"step 0"
			var playback=localStorage.getItem(lib.configprefix+'playback');
			if(playback){
				ui.create.me();
				ui.arena.style.display='none';
				ui.system.style.display='none';
				_status.playback=playback;
				localStorage.removeItem(lib.configprefix+'playback');
				var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
				store.get(parseInt(playback)).onsuccess=function(e){
					if(e.target.result){
						game.playVideoContent(e.target.result.video);
					}
					else{
						alert('播放失败：找不到录像');
						game.reload();
					}
				}
				event.finish();
			}
			else if(!_status.connectMode){
				game.prepareArena(4);
			}
			"step 1"
			if(_status.connectMode){
				game.waitForPlayer(function(){
						lib.configOL.number=4;
				});
			}
			"step 2"
			if(_status.connectMode){
				if(lib.configOL.number<4){
					lib.configOL.number=4;
				}
				var list=[
					//3张独轮车
					["spade","5","dulun"],
					["club","9","dulun"],
					["diamond","11","dulun"],
					//2张穿甲
					["heart","13","chuanjia"],
					["club","5","chuanjia"],
					//
					["diamond","1","zhinengdulun"],
					//
					["spade","2","longjiao"],
					//
					["spade","6","longwei"],
					//
					//["heart","10","takeover"],
					//2张逼宫
					["club","9","bigong"],
					["heart","8","bigong"],
				];
				lib.card.list.addArray(list);
				game.fixedPile=true;
				game.broadcastAll(function(pack1,pack2){
					//lib.connectCardPack.add('mode_longlaoguan');
					//console.log(lib.connectCardPack);
					//console.log(lib.card);
					lib.characterPack.mode_longlaoguan=pack1;
					//lib.card=pack2;
					for(var i in pack1){
						lib.character[i]=pack1[i];
						if(!lib.character[i][4]){
							lib.character[i][4]=[];
						}
						if(!lib.translate[i]){
							lib.translate[i]=lib.translate[i.slice(3)];
						}
					}
				},lib.characterPack.mode_longlaoguan,lib.card);
				game.randomMapOL();
			}
			else{
				game.broadcastAll(function(pack1,pack2){
					lib.characterPack.mode_longlaoguan=pack1;
					lib.cardPack.mode_longlaoguan=pack2
					var list=[
						//3张独轮车
						["spade","5","dulun"],
						["club","9","dulun"],
						["diamond","11","dulun"],
						//2张穿甲
						["heart","13","chuanjia"],
						["club","5","chuanjia"],
						//
						["diamond","1","zhinengdulun"],
						//
						["spade","2","longjiao"],
						//
						["spade","6","longwei"],
						//
						//["heart","10","takeover"],
						//2张逼宫
						["club","9","bigong"],
						["heart","8","bigong"],
					];
					lib.card.list.addArray(list);
					ui.create.cardsAsync();
					game.fixedPile=true;
					for(var i in pack1){
						// if(!lib.configOL.onlyguozhan){
						// 	if(lib.character[i.slice(3)]) continue;
						// }
						lib.character[i]=pack1[i];
						if(!lib.character[i][4]){
							lib.character[i][4]=[];
						}
						if(!lib.translate[i]){
							lib.translate[i]=lib.translate[i.slice(3)];
						}
					}
				},lib.characterPack.mode_longlaoguan,lib.cardPack.mode_longlaoguan);
				for(var i=0;i<game.players.length;i++){
					game.players[i].getId();
				}
				game.chooseCharacter();
			}
			"step 3"
			if(ui.coin){
				_status.coinCoeff=get.coinCoeff([game.me.name]);
			}
			game.showIdentity(true);
			var map={};
			for(var i in lib.playerOL){
				map[i]=lib.playerOL[i].identity;
			}
			game.broadcast(function(map){
				for(var i in map){
					lib.playerOL[i].identity=map[i];
					lib.playerOL[i].setIdentity();
					lib.playerOL[i].ai.shown=1;
				}
			},map);
			
			game.syncState();
			event.trigger('gameStart');
			
			var players=get.players(lib.sort.position);
			var info=[];
			for(var i=0;i<players.length;i++){
				info.push({
					name:players[i].name,
					name2:players[i].name2,
					identity:players[i].identity
				});
			}
			_status.videoInited=true;
			game.addVideo('init',null,info);

			game.gameDraw(game.zhu||_status.firstAct||game.me);
			if(_status.connectMode&&lib.configOL.change_card) game.replaceHandcards(game.players.slice(0));
			"step 4"
			event.trigger('phaseLoopBefore');
			"step 5"
			game.phaseLoopLonglaoguan(game.zhu||_status.firstAct||game.me);
			game.zhu.showGiveup();
		},
		game:{
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.longlaoguan.data;
					var identity=game.me.identity;
					if(!data[identity]){
						data[identity]=[0,0];
					}
					if(bool){
						data[identity][0]++;
					}
					else{
						data[identity][1]++;
					}
					var list=['zhu','fan'];
					var str='';
					for(var i=0;i<list.length;i++){
						if(data[list[i]]){
							str+=lib.translate[list[i]+'2']+'：'+data[list[i]][0]+'胜'+' '+data[list[i]][1]+'负<br>';
						}
					}
					lib.config.gameRecord.longlaoguan.str=str;
					game.saveConfig('gameRecord',lib.config.gameRecord);
				}
			},
			getState:function(){
				var state={};
				for(var i in lib.playerOL){
					var player=lib.playerOL[i];
					state[i]={identity:player.identity};
				}
				return state;
			},
			updateState:function(state){
				for(var i in state){
					var player=lib.playerOL[i];
					if(player){
						player.identity=state[i].identity;
					}
				}
			},
			getRoomInfo:function(uiintro){
				uiintro.add('<div class="text chat">双将模式：'+(lib.configOL.double_character?'开启':'关闭'));
				// uiintro.add('<div class="text chat">屏蔽弱将：'+(lib.configOL.ban_weak?'开启':'关闭'));
				// var last=uiintro.add('<div class="text chat">屏蔽强将：'+(lib.configOL.ban_strong?'开启':'关闭'));
				if(lib.configOL.banned.length){
					uiintro.add('<div class="text chat">禁用武将：'+get.translation(lib.configOL.banned));
				}
				if(lib.configOL.bannedcards.length){
					uiintro.add('<div class="text chat">禁用卡牌：'+get.translation(lib.configOL.bannedcards));
				}
				uiintro.style.paddingBottom='8px';
			},
			getVideoName:function(){
				var str=get.translation(game.me.name);
				if(game.me.name2){
					str+='/'+get.translation(game.me.name2);
				}
				var name=[
					str,
					'龙牢关'+' - '+lib.translate[game.me.identity+'2']
				];
				return name;
			},
			showIdentity:function(me){
				for(var i=0;i<game.players.length;i++){
					// if(me===false&&game.players[i]==game.me) continue;
					game.players[i].node.identity.classList.remove('guessing');
					game.players[i].identityShown=true;
					game.players[i].ai.shown=1;
					game.players[i].setIdentity(game.players[i].identity);
					if(game.players[i].identity=='zhu'){
						game.players[i].isZhu=true;
					}
				}
				if(_status.clickingidentity){
					for(var i=0;i<_status.clickingidentity[1].length;i++){
						_status.clickingidentity[1][i].delete();
						_status.clickingidentity[1][i].style.transform='';
					}
					delete _status.clickingidentity;
				}
			},
			checkResult:function(){
				if(game.zhu.isAlive()){
					if(game.players.length>1){
						for(let i=0;i<game.players.length;i++){
							if(game.players[i]==game.zhu){
								continue;
							}
							if(game.players[i].storage.reviving==0||game.players[i].storage.reviving==null){
								return
							}
						}
						if(game.me==game.zhu){
							game.over(true);
						}
						else{
							game.over(false);
						}
					}
					if(game.me==game.zhu){
						game.over(true);
					}
					else{
						game.over(false);
					}
				}
				else if(game.zhu.storage.state!='second'){
					game.zhu.storage.state='second'
				}
				else {
					if(game.me==game.zhu){
						game.over(false);
					}
					else{
						game.over(true);
					}
				}
			},
			checkOnlineResult:function(player){
				if(game.zhu.isAlive()){
					return player.identity=='zhu';
				}
				else if(game.zhu.storage.state!='second'){
					game.zhu.storage.state='second';
					return false;
				}
				else return player.identity=='fan';
			},
			chooseCharacter:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.showConfig=true;
				next.addPlayer=function(player){
					var list=lib.config.mode_config.identity.identity[game.players.length-3].slice(0);
					var list2=lib.config.mode_config.identity.identity[game.players.length-2].slice(0);
					for(var i=0;i<list.length;i++) list2.remove(list[i]);
					player.identity=list2[0];
					player.setIdentity('cai');
				};
				next.removePlayer=function(){
					return game.players.randomGet(game.me,game.zhu);
				};
				next.ai=function(player,list,list2,back){
					if(get.config('double_character')){
						player.init(list[0],list[1]);
					}
					else{
						player.init(list[0]);
					}
					if(player==game.zhu){
							player.hp++;
							player.maxHp++;
							player.update();
					}
					if(back){
						list.remove(player.name);
						list.remove(player.name2);
						for(var i=0;i<list.length;i++){
							back.push(list[i]);
						}
					}
					if(typeof lib.config.test_game=='string'&&player==game.me.next){
						player.init(lib.config.test_game);
					}
					if(get.config('choose_group')&&player.group=='shen'){
							var list=lib.group.slice(0);
							list.remove('shen');
							if(list.length) player.group=list.randomGet();
						}
						player.node.name.dataset.nature=get.groupnature(player.group);
				}
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var list;
					var list2=[];
					var list3=[];
					var identityList=['zhu','fan','fan','fan'];
					var chosen=lib.config.continue_name||[];
					game.saveConfig('continue_name');
					event.chosen=chosen;

					var addSetting=function(dialog){
						dialog.add('选择身份').classList.add('add-setting');
						var table=document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						
						var listi=['random','zhu','fan'];
						for(var i=0;i<listi.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link=listi[i];
							if(td.link===game.me.identity){
								td.classList.add('bluebg');
							}
							table.appendChild(td);
							td.innerHTML='<span>'+get.translation(listi[i]+'2')+'</span>';
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								_status.tempNoButton=true;
								setTimeout(function(){
									_status.tempNoButton=false;
								},500);
								var link=this.link;
								if(game.zhu.name){
									if(link!='random'){
										_status.event.parent.fixedseat=get.distance(game.me,game.zhu,'absolute');
									}
									game.zhu.uninit();
									delete game.zhu.isZhu;
									delete game.zhu.identityShown;
								}
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								current=seats.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								if(link=='random'){
									link=['zhu','fan'].randomGet();
									for(var i=0;i<this.parentNode.childElementCount;i++){
										if(this.parentNode.childNodes[i].link==link){
											this.parentNode.childNodes[i].classList.add('bluebg');
										}
									}
								}
								else{
									this.classList.add('bluebg');
								}
								num=get.config('choice_'+link);
								_status.event.parent.swapnodialog=function(dialog,list){
									var buttons=ui.create.div('.buttons');
									var node=dialog.buttons[0].parentNode;
									dialog.buttons=ui.create.buttons(list,'character',buttons);
									dialog.content.insertBefore(buttons,node);
									buttons.animate('start');
									node.remove();
									game.uncheck();
									game.check();
									for(var i=0;i<seats.childElementCount;i++){
										if(get.distance(game.zhu,game.me,'absolute')===seats.childNodes[i].link){
											seats.childNodes[i].classList.add('bluebg');
										}
									}
								}
								_status.event=_status.event.parent;
								_status.event.step=0;
								_status.event.identity=link;
								if(link!=(event.zhongmode?'mingzhong':'zhu')){
									seats.previousSibling.style.display='';
									seats.style.display='';
								}
								else{
									seats.previousSibling.style.display='none';
									seats.style.display='none';
								}
								game.resume();
							});
						}
						dialog.content.appendChild(table);

						dialog.add('选择座位').classList.add('add-setting');
						var seats=document.createElement('div');
						seats.classList.add('add-setting');
						seats.style.margin='0';
						seats.style.width='100%';
						seats.style.position='relative';
						for(var i=2;i<=game.players.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML=get.cnNumber(i,true);
							td.link=i-1;
							seats.appendChild(td);
							if(get.distance(game.zhu,game.me,'absolute')===i-1){
								td.classList.add('bluebg');
							}
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								if(get.distance(game.zhu,game.me,'absolute')==this.link) return;
								var current=this.parentNode.querySelector('.bluebg');
								if(current){
									current.classList.remove('bluebg');
								}
								this.classList.add('bluebg');
								for(var i=0;i<game.players.length;i++){
									if(get.distance(game.players[i],game.me,'absolute')==this.link){
										game.swapSeat(game.zhu,game.players[i],false);return;
									}
								}
							});
						}
						dialog.content.appendChild(seats);
						if(game.me==game.zhu){
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}

						dialog.add(ui.create.div('.placeholder.add-setting'));
						dialog.add(ui.create.div('.placeholder.add-setting'));
						if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
					};
					var removeSetting=function(){
						var dialog=_status.event.dialog;
						if(dialog){
							dialog.style.height='';
							delete dialog._scrollset;
							var list=Array.from(dialog.querySelectorAll('.add-setting'));
							while(list.length){
								list.shift().remove();
							}
							ui.update();
						}
					};
					event.addSetting=addSetting;
					event.removeSetting=removeSetting;
					event.list=[];
					identityList.randomSort();
					if(event.identity){
						identityList.remove(event.identity);
						identityList.unshift(event.identity);
						if(event.fixedseat){
							var zhuIdentity='zhu';
							if(zhuIdentity!=event.identity){
								identityList.remove(zhuIdentity);
								identityList.splice(event.fixedseat,0,zhuIdentity);
							}
							delete event.fixedseat;
						}
						delete event.identity;
					}
					for(i=0;i<game.players.length;i++){
							game.players[i].identity=identityList[i];
							game.players[i].showIdentity();
							if(identityList[i]=='zhu'){
								game.zhu=game.players[i];
							}
					}

					if(!game.zhu) game.zhu=game.me;
					else{
						game.zhu.setIdentity();
						game.zhu.identityShown=true;
						game.zhu.isZhu=(game.zhu.identity=='zhu');
						game.zhu.node.identity.classList.remove('guessing');
						game.me.setIdentity();
						game.me.node.identity.classList.remove('guessing');
					}
					for(i in lib.character){
						if(i=='AjatarCoco') continue;
						if(i=='KiryuuCoco') continue;
						if(chosen.contains(i)) continue;
						if(lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						if(lib.character[i][4]&&lib.character[i][4].contains('zhu')){
							list2.push(i);
						}
						else{
							list3.push(i);
						}
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					list3.randomSort();
					var num=get.config('choice_'+game.me.identity);
					list=event.list.slice(0,num);
					// if(game.me==game.zhu){
					// 	list=['KiryuuCoco'];
					// }
					delete event.swapnochoose;
					var dialog;
					if(event.swapnodialog){
						dialog=ui.dialog;
						event.swapnodialog(dialog,list);
						delete event.swapnodialog;
					}
					else{
						var str='选择角色';
						if(_status.brawl&&_status.brawl.chooseCharacterStr){
							str=_status.brawl.chooseCharacterStr;
						}
						dialog=ui.create.dialog(str,'hidden',[list,'character']);
						if(!_status.brawl||!_status.brawl.noAddSetting){
							if(get.config('change_identity')){
								addSetting(dialog);
							}
						}
					}
					dialog.setCaption('选择角色');
					game.me.setIdentity();
					
					if(!event.chosen.length){
						game.me.chooseButton(dialog,true).set('onfree',true).selectButton=function(){
							return get.config('double_character')?2:1
						};
					}
					else{
						lib.init.onfree();
					}
					ui.create.cheat=function(){
						_status.createControl=ui.cheat2;
						ui.cheat=ui.create.control('更换',function(){
							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
								return;
							}
							if(game.changeCoin){
								game.changeCoin(-3);
							}
							
							event.list.randomSort();
							list=event.list.slice(0,num);
							
							var buttons=ui.create.div('.buttons');
							var node=_status.event.dialog.buttons[0].parentNode;
							_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
							_status.event.dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
						});
						delete _status.createControl;
					};
					if(lib.onfree){
						lib.onfree.push(function(){
							event.dialogxx=ui.create.characterDialog('heightset');
							if(ui.cheat2){
								ui.cheat2.animate('controlpressdownx',500);
								ui.cheat2.classList.remove('disabled');
							}
						});
					}
					else{
						event.dialogxx=ui.create.characterDialog('heightset');
					}

					ui.create.cheat2=function(){
						ui.cheat2=ui.create.control('自由选将',function(){
							if(this.dialog==_status.event.dialog){
								if(game.changeCoin){
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog=this.backup;
								this.backup.open();
								delete this.backup;
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.animate('controlpressdownx',500);
									ui.cheat.classList.remove('disabled');
								}
							}
							else{
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								this.backup=_status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog=_status.event.parent.dialogxx;
								this.dialog=_status.event.dialog;
								this.dialog.open();
								game.uncheck();
								game.check();
								if(ui.cheat){
									ui.cheat.classList.add('disabled');
								}
							}
						});
						if(lib.onfree){
							ui.cheat2.classList.add('disabled');
						}
					}
					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
						if(!ui.cheat&&get.config('change_choice'))
						ui.create.cheat();
						if(!ui.cheat2&&get.config('free_choose'))
						ui.create.cheat2();
					}
					"step 1"
					if(ui.cheat){
						ui.cheat.close();
						delete ui.cheat;
					}
					if(ui.cheat2){
						ui.cheat2.close();
						delete ui.cheat2;
					}
					var chooseGroup=false;
					if(event.chosen.length){
						if(lib.character[event.chosen[0]][1]=='shen'){
							chooseGroup=true;
						}
					}
					else if(event.modchosen){
						if(event.modchosen[0]=='random') event.modchosen[0]=result.buttons[0].link;
						else event.modchosen[1]=result.buttons[0].link;
					}
					else if(result.buttons.length==2){
						event.choosed=[result.buttons[0].link,result.buttons[1].link];
						game.addRecentCharacter(result.buttons[0].link,result.buttons[1].link);
						if(lib.character[event.choosed[0]][1]=='shen'){
							chooseGroup=true;
						}
					}
					else{
						event.choosed=[result.buttons[0].link];
						if(lib.character[event.choosed[0]][1]=='shen'){
							chooseGroup=true;
						}
						game.addRecentCharacter(result.buttons[0].link);
					}
					"step 2"
					if(event.chosen.length){
						game.me.init(event.chosen[0],event.chosen[1]);
					}
					else if(event.modchosen){
						game.me.init(event.modchosen[0],event.modchosen[1]);
					}
					else if(event.choosed.length==2){
						game.me.init(event.choosed[0],event.choosed[1]);
					}
					else{
						game.me.init(event.choosed[0]);
					}
					event.list.remove(game.me.name);
					event.list.remove(game.me.name2);
					if(game.me==game.zhu){
						game.me.hp++;
						game.me.maxHp++;
						game.me.update();
					}
					
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me){
							event.list.randomSort();
							event.ai(game.players[i],event.list.splice(0,get.config('choice_'+game.players[i].identity)),null,event.list)
						}
					}
					"step 3"
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					"step 4"
					game.zhu.init('KiryuuCoco');
					game.zhu.update();
					game.broadcast(function(zhu,name,name2){
						if(game.zhu!=game.me){
							zhu.init(name,name2);
						}
					},game.zhu,game.zhu.name,game.zhu.name2);
				});
			},
			chooseCharacterOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['zhu','fan','fan','fan'];
					identityList.randomSort();
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						game.players[i].identityShown=true;
						if(identityList[i]=='zhu') game.zhu=game.players[i];
					}

					var list;
					var list2=[];
					var list3=[];
					event.list=[];
					event.list2=[];

					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(i=='AjatarCoco') continue;
							if(i=='KiryuuCoco') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in libCharacter){
						if(lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
						event.list2.push(i);
					}
					_status.characterlist=event.list.slice(0);
					'step 1'
					//game.zhu.init('KiryuuCoco')
					game.broadcastAll(function(player,name){
						for(var i in lib.playerOL){
							if(lib.playerOL[i]==player)
							lib.playerOL[i].init(name,null)
						}
					},game.zhu,'KiryuuCoco')
					// game.broadcastAll(function(zhu,name){
					// 	zhu.init(name);
					// 	zhu.update();
					// },game.zhu,'KiryuuCoco')
					// game.broadcast(function(zhu,name,name2){
					// 	if(game.zhu!=game.me){
					// 		zhu.init(name,name2);
					// 	}
					// },game.zhu,game.zhu.name,game.zhu.name2);
					"step 2"
					var list=[];
					var selectButton=(lib.configOL.double_character?2:1);

					var num,num2=0;
					num=Math.floor(event.list.length/game.players.length);
					num2=event.list.length-num*game.players.length;
					if(num>5){
						num=5;
					}
					if(num2>2){
						num2=2;
					}
					
					list=event.list2.randomGets(5);

					var next=game.zhu.next.chooseButton(true);
					next.set('selectButton',(lib.configOL.double_character?2:1));
					next.set('createDialog',['选择角色',[list,'character']]);
					// next.set('callback',function(player,result){
					// 	for(var i in lib.playerOL){
					// 		if(lib.playerOL[i]==player)
					// 		lib.playerOL[i].init(result.links[0],result.links[1])
					// 	}
					// 	// game.broadcast(function(result,player){
					// 	// 	player.init(result.links[0],result.links[1]);
					// 	// 	player.update()
					// 	// },result,player)
					// });
					"step 3"
					game.broadcastAll(function(player,result){
						for(var i in lib.playerOL){
							if(lib.playerOL[i]==player)
							lib.playerOL[i].init(result.links[0],result.links[1])
						}
					},game.zhu.next,result)
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list2.remove(result[i].links[j]);
							}
						}
					}

					list=event.list2.randomGets(5);
					var next=game.zhu.next.next.chooseButton(true);
					next.set('selectButton',(lib.configOL.double_character?2:1));
					next.set('createDialog',['选择角色',[list,'character']]);
					// next.set('callback',function(player,result){
					// 	for(var i in lib.playerOL){
					// 		if(lib.playerOL[i]==player)
					// 		lib.playerOL[i].init(result.links[0],result.links[1])
					// 	}
					// 	// game.broadcast(function(result,player){
					// 	// 	player.init(result.links[0],result.links[1]);
					// 	// 	player.update()
					// 	// },result,player)
					// });
					"step 4"
					game.broadcastAll(function(player,result){
						for(var i in lib.playerOL){
							if(lib.playerOL[i]==player)
							lib.playerOL[i].init(result.links[0],result.links[1])
						}
					},game.zhu.next.next,result)
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list2.remove(result[i].links[j]);
							}
						}
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].name){
							_status.characterlist.remove(game.players[i].name);
							_status.characterlist.remove(game.players[i].name2);
							event.list2.remove(game.players[i].name);
							event.list2.remove(game.players[i].name2);
						}
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

					list=event.list2.randomGets(5);

					var next=game.zhu.next.next.next.chooseButton(true);
					next.set('selectButton',(lib.configOL.double_character?2:1));
					next.set('createDialog',['选择角色',[list,'character']]);
					// next.set('callback',function(player,result){
					// 	for(var i in lib.playerOL){
					// 		if(lib.playerOL[i]==player)
					// 		lib.playerOL[i].init(result.links[0],result.links[1])
					// 	}
					// 	// game.broadcast(function(result,player){
					// 	// 	player.init(result.links[0],result.links[1]);
					// 	// 	player.update()
					// 	// },result,player)
					// });
					"step 5"
					game.broadcastAll(function(player,result){
						for(var i in lib.playerOL){
							if(lib.playerOL[i]==player)
							lib.playerOL[i].init(result.links[0],result.links[1])
						}
					},game.zhu.next.next.next,result)
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list2.remove(result[i].links[j]);
							}
						}
					}
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].name){
							_status.characterlist.remove(game.players[i].name);
							_status.characterlist.remove(game.players[i].name2);
							event.list2.remove(game.players[i].name);
							event.list2.remove(game.players[i].name2);
						}
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

				});
			},
			phaseLoopLonglaoguan:function(player){
				var next=game.createEvent('phaseLoop');
				next.player=player;
				next.setContent(function(){
					"step 0"
					for(var i=0;i<lib.onphase.length;i++){
						lib.onphase[i]();
					}
					player.phase();
					if(_status.roundStart!=game.zhu){
						_status.roundStart=game.zhu;
					}
					"step 1"
					if(!game.players.contains(event.player.next)){
						event.player=game.findNext(event.player.next);
					}
					else{
						event.player=event.player.next;
					}
					if(game.zhu.storage.changeState){
						event.player=game.zhu;
						game.zhu.storage.changeState=false;
					}
					event.goto(0);
				});
			}
		},
		translate:{
			zhu:"龙",
			fan:"反抗军",
			zhu2:"龙皇",
			fan2:"反抗军",
			random2:"随机",

			KiryuuCoco:'桐生可可',
			KiryuuCoco_info:'桐生可可',
			AjatarCoco:'恶龙可可',
			AjatarCoco_info:'恶龙可可',
			zaoankeke: '早安一刀',
			zaoankeke_info: '锁定技 当你使用【杀】指定目标后，目标需弃置一张牌；若此【杀】为属性杀，则改为交给你一张牌。',
			jierizhanbei: '扳手战备',
			jierizhanbei_info: '锁定技 你使用过装备牌的回合内手牌上限视为5.回合结束时，若本回合你没有使用过装备牌，你随机从牌堆内获得一张装备牌。',
			esuyingye: '滥觞之至',
			esuyingye_info: '回合开始时，你可以将你装备区或判定区的一张牌弃置，若为装备区的牌，本回合你下一张牌造成的伤害+1。',
			elongkeke:'恶龙可可',
			elongkeke_info: '死亡时，进入恶龙形态',
			yanzheshengdun:'演者圣盾',
			yanzheshengdun_info:'进入此形态后，你随机获得一个本局未出现的Hololive武将的所有技能，然后增加该武将的体力上限与体力值。',
			zhengzhengrishang:'蒸蒸日上',
			zhengzhengrishang_info:'锁定技 出牌阶段开始时，你将手牌调整至全场唯一最多。若已为最多，则改为获得一张【逼宫】。一个回合结束时，你将手牌调整至不为全场最少。',
			yugaimizhang:'欲盖弥彰',
			yugaimizhang_info:'锁定技 你的手牌上限始终为5。一轮开始时，亮出牌堆顶牌，本轮内你成为此花色牌目标的回合结束时，你可以使用一张牌，此牌可以额外指定任意目标。',
			zuoyututan:'坐於涂炭',
			zuoyututan_info:'锁定技 转换技。一轮开始时，令所有反抗军①随机废除一个装备栏②手牌上限-1③获得一张进入弃牌堆后即移出游戏的【毒】。形态切换后，复原反抗军。',
			// _feiyang:"飞扬",
			// _bahu:"跋扈",
			// _feiyang_info:"判定阶段开始时，若你的判定区有牌，则你可以弃置两张手牌，然后弃置你判定区的一张牌。每回合限一次。",
			// _bahu_info:"锁定技 准备阶段开始时，你摸一张牌。出牌阶段，你可以多使用一张【杀】。",
			// dulun: '独轮车',
			// dulun_info: '出牌阶段，对一名反抗军使用，其可以立即使用一张不可被响应的【杀】或摸一张牌。',
			// chuanjia: '穿甲弹',
			// chuanjia_info: '出牌阶段，对桐生可可使用，本回合其成为【杀】的目标后需弃置装备区内的一张牌。',
			// zhinengdulun: '智能独轮车',
			// zhinengdulun_info: '回合开始时，你视为使用一张【独轮车】。',
			// longjiao: '龙角',
			// longjiao_info: '反抗军无法装备。每回合可以额外使用一张【杀】。在反抗军的回合进入弃牌堆时，改为置于牌堆顶。',
			// longwei: '龙尾',
			// longwei_info: '反抗军无法装备。若为桐生可可形态，则获得“欲盖弥彰”，若为恶龙形态，则获得“滥觞之至”。在反抗军的回合进入弃牌堆时，改为洗入牌堆。',
			// takeover: '所向无前',
			// takeover_info: '为所有反抗军装备【智能独轮车】，使用后移出游戏。',
			// bigong: '逼宫',
			// bigong_info: '对一名反抗军使用，令其选择一项：本轮内失去所有技能，或交给桐生可可两张不同类型的牌，使用后移出游戏。',
			// bigong_clear: '逼宫后续',
			chuanjia_po: 'fuck',

			zuoyututanLimit: '手牌减少',
			mode_longlaoguan_card_config:'龙牢关卡牌',
		},
		element:{
			player:{
				hasZhuSkill:function(){return false;},
				$dieAfter:function(){
					if(_status.video) return;
					if(!this.node.dieidentity){
						var str={zhu:'龙皇',fan:'重整'}[this.identity];
						var node=ui.create.div('.damage.dieidentity',str,this);
						ui.refresh(node);
						node.style.opacity=1;
						this.node.dieidentity=node;
					}
					var trans=this.style.transform;
					if(trans){
						if(trans.indexOf('rotateY')!=-1){
							this.node.dieidentity.style.transform='rotateY(180deg)';
						}
						else if(trans.indexOf('rotateX')!=-1){
							this.node.dieidentity.style.transform='rotateX(180deg)';
						}
						else{
							this.node.dieidentity.style.transform='';
						}
					}
					else{
						this.node.dieidentity.style.transform='';
					}
				},
				dieAfter:function(source){
					game.checkResult();
				},
				logAi:function(targets,card){},
				showIdentity:function(){
					game.broadcastAll(function(player,identity){
						player.identity=identity;
						player.node.identity.classList.remove('guessing');
						player.identityShown=true;
						player.ai.shown=1;
						player.setIdentity();
						if(player.identity=='zhu'){
							player.isZhu=true;
						}
						if(_status.clickingidentity){
							for(var i=0;i<_status.clickingidentity[1].length;i++){
								_status.clickingidentity[1][i].delete();
								_status.clickingidentity[1][i].style.transform='';
							}
							delete _status.clickingidentity;
						}
					},this,this.identity);
				}
			}
		},
		characterPack:{
			mode_longlaoguan:{
				KiryuuCoco:['female','holo',5,['zaoankeke', 'jierizhanbei','esuyingye','elongkeke','zuoyututan']],
				AjatarCoco:['female','holo',1,['yanzheshengdun','zaoankeke', 'zhengzhengrishang','yugaimizhang','zuoyututan']]
			}
		},
		cardPack:{
			mode_longlaoguan:['dulun','chuanjia','zhinengdulun','longjiao','longwei','takeover','bigong']
		},
		get:{
			attitude:function(from,to){
				if(from.identity==to.identity) return 10;
				return -10;
			},
		},
		skill:{
			/** 龙皇技能*/
			zaoankeke:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				priority:29,
				logTarget:'target',
				filter:function(event,player){
					if(event.target==player)				return false;
					if(event.target.countCards('he')==0)	return false;
					return event.card.name =='sha';
				},
				content:function(){	
					'step 0'
					var target=trigger.target;

					if(trigger.getParent().card.nature)		//如果此杀为属性杀
					{				
						player.line(target,'green');
						target.chooseCard('参加“早安可可”录制，需要交给'+get.translation(player)+'一张牌','he',true).set('ai',function(card){
							var name = card.name;
							if(name=='shan') return 30;
							return 100-get.value(card);											
						});											
					}
					else							
					{
						target.chooseToDiscard('参加“早安可可”录制，需要弃置一张牌','he',true).set('ai',function(card){
							var name = card.name;
							if(name=='shan') return 30;
							return 100-get.value(card);													
						});				
					}
					'step 1'
					if(trigger.getParent().card.nature){
						player.gain(result.cards,target,'give');
					}
				}
			},
			jierizhanbei:{
				group:['jierizhanbei_useE' , 'jierizhanbei_getE'],
				subSkill:{
					useE:{
						init:function(player){
							player.storage.jierizhanbei=0;
						},
						trigger:{player:'useCard'},
						forced:true,
						priority:17,
						usable:1,
						filter:function(event,player){
							return get.type(event.card)=='equip';
						},
						content:function(){
							player.storage.jierizhanbei++;
						},
						mod:{
							maxHandcard:function(player,num){
								if(player.storage.jierizhanbei>0)	return 5;
							},
						},
					},
					getE:{
						init:function (player){
							player.storage.jierizhanbei=0;
						},
						trigger:{player:'phaseEnd'},
						forced:true,
						priority:13,
						filter:function(event,player){
							var num = player.storage.jierizhanbei
							if(num!=0){									
								player.storage.jierizhanbei=0;
								return false;
							}
							return true;
						},
						content:function(){
							console.log(player.storage.jierizhanbei);
								var getC = get.cardPile2(function(card){
									return get.type(card)=='equip';
								})
								if(getC){
									player.gain(getC,'gain2');
								}
								else{
									game.log(player,'牌堆中没有装备牌了');
								}
							
						}
					}
				}
			},
			esuyingye:{
				trigger:{player:'phaseBegin'},
				forced:false,
				priority:31,
				filter:function(event,player){
					return event.player==player&&player.countDiscardableCards(player,'ej')>0;
				},
				content:function(){
					'step 0'
					var nh=trigger.player.countCards('h');
					var eff=get.effect(trigger.player,{name:'sha',isCard:true},player,player);
					player.discardPlayerCard('请开始自己的表演',player,'ej').set('ai',function(button){
						var name=button.link.viewAs||button.link.name;
						var nh=_status.event.nh;
						if(name=='lebu'&&nh>trigger.player.hp) return 150;
						if(name=='bingliang'&&nh<trigger.player.hp) return 150;
						return 100-get.value(button.link);													
					}).set('nh',nh);
					'step 1'
					if(result.cards){
						var getC = result.cards[0];
						if(get.type(getC) =='equip'){
							player.logSkill('esuyingye');
							player.addTempSkill('esuyingye_addDam');
							var buff = '.player_buff';
							game.broadcastAll(function(player, buff){
								player.node.esuyingye= ui.create.div(buff ,player.node.avatar);
							}, player, buff);
						}
					}
				},
				subSkill: {
					addDam: {
						direct: true, 
						silent: true,
						trigger: {
							source: 'damageBegin',
						},
						content: function() {
							trigger.num++;
							player.removeSkill('esuyingye_addDam');						
						},
						onremove: function(player, skill) {
							game.broadcastAll(function(player){
								player.node.esuyingye.delete();
								delete player.node.esuyingye;
							}, player);
						}
					}
				}
			},
			elongkeke:{
				trigger:{player:'dieBefore'},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event){
					event.player.setAvatar('KiryuuCoco','AjatarCoco');
					return true;
				},
				contentBefore:function(){
				},
				content:function(){
					'step 0'
					if(event._trigger.reason=='nosource'){
						player.storage.state='second';
						event.finish();
					}
					else{
						trigger.cancel();
						player.revive(1);
					}
					'step 1'
					player.markSkill('elongkeke');
					game.delayx();
					'step 2'
					var libCharacter={};
					var list=[];
					for(var i in lib.character){
						if(i=='KiryuuCoco'||i=='AjatarCoco') continue;
						if(i=='Civia'||i=='SpadeEcho'||i=='Artia'||i=='Doris'||i=='Yogiri'||i=='Rosalyn') continue;
						var group=lib.character[i][1];
						//if(group=='shen') continue;
						if(group=='holo'){
							if(game.filterPlayer(function(current){
								if(current.name==i){
									return true;
								} 
							}).length>0) continue;
							list.push(i)
						}
					}
					var newPerson=list.randomGets(1);
					game.broadcastAll(function(player,name){
						// for(var i in lib.playerOL){
						// 	if(lib.playerOL[i]==game.zhu)
							player.init('AjatarCoco',name)
						//}
					},game.zhu,newPerson)
					//player.init('AjatarCoco',newPerson);
					player.storage.state='second';
					game.zhu.maxHp=1+Number(lib.character[newPerson][2]);
					game.zhu.hp=1+Number(lib.character[newPerson][2]);
					'step 3'
					game.zhu.update();
					game.zhu.storage.changeState=true;
					game.filterPlayer(function(current){
						// if(current.isOut()){
						// 	return false;
						// }
						if(current==player){
							return false;
						}
						if(current.hasSkill('zuoyututanLimit')){
							current.removeSkill('zuoyututanLimit');
						}
						for(let i=1;i<7;i++){
							if(current.isDisabled(i)){
								current.enableEquip(i);
							}
						}
					})
					'step 4'
					lib.inpile.add('takeover')
					var takecard=game.createCard2('takeover','heart',10)
					ui.cardPile.insertBefore(takecard,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childElementCount-1)]);
					var evt=_status.event.getParent('phase');
					if(evt){
						//game.resetSkills();
						_status.event=evt;
						_status.event.finish();
						// _status.event.untrigger(true);
					}
				},
			},
			
			/** 恶龙技能 */
			yanzheshengdun:{
				
			},
			zhengzhengrishang:{
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				filter:function(event,player){
					return player==game.zhu;
				},
				content:function(){
					'step 0'
					if(player.isMaxHandcard(false)){
						var takecard=game.createCard2('bigong','heart',1);
						player.gain(takecard);
						event.finish();
					}
					else{
						event.maxHandcardPlayer=game.filterPlayer(function(current){
							return current.isMaxHandcard(false);
						});
					}
					'step 1'
					let getcard = event.maxHandcardPlayer[0].countCards('h')-player.countCards('h');
					player.draw(getcard);
				},
				group:['zhengzhengrishang_endDraw'],
				subSkill:{
					endDraw:{
						trigger:{global:'phaseEnd'},
						frequent:true,
						filter:function(event,player){
							return player==game.zhu;
						},
						content:function(){
							'step 0'
							if(player.isMinHandcard(false)){
								player.draw(1);
							}
							else{
								event.finish();
							}
							'step 1'
							event.goto(0);
						},
					}
				},
				ai:{
					threaten:1.3
				}
			},
			yugaimizhang:{
				trigger:{global:'roundStart'},
				forced: true,
				mark:true,
				content:function(){
					'step 0'
					event.card=get.cards()[0];
					if(player.storage.yugaimizhang==undefined) player.storage.yugaimizhang=[];
					if(player.storage.yugaimizhang.length>0){
						game.cardsDiscard(player.storage.yugaimizhang);
						player.storage.yugaimizhang=[];
					}
					player.storage.yugaimizhang=[event.card];
					player.syncStorage('yugaimizhang');
					//event.trigger("addCardToStorage");
					game.cardsGotoSpecial(event.card);
					player.showCards(player.storage.yugaimizhang,'欲盖弥彰')
					//player.markSkill('yugaimizhang');
					'step 1'
				},
				group:['yugaimizhang_limit','yugaimizhang_target'],
				subSkill:{
					limit:{
						mod:{
							maxHandcard:function (player,num){
								return 5;
							},
						}
					},
					target:{
						trigger:{global:'useCard2'},
						direct:true,
						filter:function(event,player){
							if(player.countCards('h')==0) return false;
							if(!player.storage.yugaimizhang){
								return false
							}
							if(player.storage.yugaimizhang.length==0){
								return false
							}
							if(event.targets&&event.targets[0]==player&&get.suit(event.cards)==get.suit(game.zhu.storage.yugaimizhang))
								return true; 
							else 
								return false;
						},
						content:function(){
							if(!player.hasSkill('yugaimizhang_use'))
								player.addTempSkill('yugaimizhang_use');
						}
					},
					use:{
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							return (player.countCards('h')>0)
						},
						content:function(){
							'step 0'
							player.chooseButton(['选择一张牌使用', player.getCards('h')], 1).set('filterButton',function(button,player){
								var bool=game.hasPlayer(function(current){
									return player.canUse(button.link,current);
								})
								return bool;
							}).set('ai',function(button){
								return get.value(button.link,_status.event.player);
							});
							'step 1'
							if(result.bool){
								event.usecard=result.links[0];
								var bool=game.hasPlayer(function(current){
									return player.canUse(event.usecard,current);
								});
								if(bool){
									//player.chooseTarget(result.links[0],true,false);
									var targetNumber=Infinity;
									if(get.type(event.usecard)=='delay'||get.type(event.usecard)=='equip'){
										targetNumber=1;
									}
									game.broadcastAll(
										player.chooseTarget('选择使用目标',[1,Infinity],function(card,player,target){
											return player.canUse(event.usecard,target);
										})
									)
								}
								else{
									event.finish();
								}
							}
							else{
								event.finish();
							}
							'step 2'
							player.useCard(event.usecard, result.targets)
						}
					}
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							delete player.storage.yugaimizhang;
						}
					}
				}
			},
			zuoyututan:{
				init:function (player){
					player.storage.zuoyututan=1;
					player.storage.zuoyututanUse=true;
				},
				mark:true,
				locked:false,
				zhuanhuanji:true,
				marktext:'碳',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.zuoyututan==1) return '随机废除一个装备栏';
						else if(player.storage.zuoyututan==1) return '手牌上限-1';
						else return '获得一张进入弃牌堆后即移出游戏的【毒】'
					},
				},
				group:["zuoyututan_1","zuoyututan_2","zuoyututan_3","zuoyututan_clear"],
				subSkill:{
					'1':{
						trigger:{global:'roundStart'},
						filter:function(event,player){
							if(player.storage.zuoyututan!=1){
								return false;
							}
							return !player.hasSkill('zuoyututan_stop');
						},
						forced: true,
						content:function(){
							'step 0'
							var list=[];
							for(var i=1;i<6;i++){
								list.push(i);
							}
							event.disableEquip=list.randomGet();
							player.markSkill('zuoyututan');
							game.log('所有反抗军废除'+get.translation('equip'+event.disableEquip));
							'step 1'
							game.filterPlayer(function(current){
								if(current.isOut()){
									return false;
								}
								if(current==player){
									return false;
								}
								if(!current.isDisabled(event.disableEquip)){
									current.disableEquip(event.disableEquip);
								}
							})
							game.delayx();
							'step 2'
							player.storage.zuoyututan=2;
							player.storage.zuoyututanUse=false;
							player.addTempSkill('zuoyututan_stop');
							player.syncStorage('zuoyututan');
						},
					},
					'2':{
						trigger:{global:'roundStart'},
						filter:function(event,player){
							if(player.storage.zuoyututan!=2){
								return false;
							}
							return !player.hasSkill('zuoyututan_stop');
						},
						forced: true,
						content:function(){
							'step 0'
							var list=[];
							for(var i=1;i<6;i++){
								list.push(i);
							}
							event.disableEquip=list.randomGet();
							player.markSkill('zuoyututan');
							game.log('所有反抗军手牌上限-1');
							'step 1'
							game.filterPlayer(function(current){
								if(current.isOut()){
									return false;
								}
								if(current==player){
									return false;
								}
								if(current.hasSkill('zuoyututanLimit')){
									current.storage.zuoyututanLimit++;
								}
								else{
									current.addSkill('zuoyututanLimit');
								}
							})
							game.delayx();
							'step 2'
							player.storage.zuoyututan=3;
							player.storage.zuoyututanUse=false;
							player.addTempSkill('zuoyututan_stop');
							player.syncStorage('zuoyututan');
						},
					},
					'3':{
						trigger:{global:'roundStart'},
						filter:function(event,player){
							if(player.storage.zuoyututan!=3){
								return false;
							}
							return !player.hasSkill('zuoyututan_stop');
						},
						forced: true,
						content:function(){
							'step 0'
							var list=[];
							for(var i=1;i<6;i++){
								list.push(i);
							}
							event.disableEquip=list.randomGet();
							player.markSkill('zuoyututan');
							game.log('所有反抗军获得一张【毒】');
							'step 1'
							game.filterPlayer(function(current){
								if(current.isOut()){
									return false;
								}
								if(current==player){
									return false;
								}
								var newcard=game.createCard2('du','spade',1);
								game.zhu.$giveAuto(newcard,current);
								current.gain(newcard);
							})
							game.delayx();
							'step 2'
							player.storage.zuoyututan=1;
							player.storage.zuoyututanUse=false;
							player.addTempSkill('zuoyututan_stop');
							player.syncStorage('zuoyututan');
						},
					},
					clear:{
						trigger:{global:'loseAfter'},
						filter:function(event,player){
							if(_status.event.getParent('gain')!=={}&&_status.event.getParent('gain')!=null) return false;
							if(!event.visible) return false;
							if(event.player==player) return false;
							for(var i=0;i<event.cards2.length;i++){
								if(get.name(event.cards2[i])=='du'&&get.suit(event.cards2[i],event.player)=='club'&&get.number(event.cards2[i])==1){
									return true;
								}
							}
							return false;
						},
						direct:true,
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							var cards=[];
							for(var i=0;i<trigger.cards2.length;i++){
								if(get.name(event.cards2[i])=='du'&&get.suit(event.cards2[i],event.player)=='club'&&get.number(event.cards2[i])==1){
									cards.push(trigger.cards2[i]);
								}
							}
							if(cards.length){
								game.cardsGotoSpecial(cards);
							}
						}
					},
					stop:{

					}
				},
			},
			zuoyututanLimit:{
				init:function(player){
					player.storage.zuoyututanLimit=1;
				},
				mark:true,
				intro:{
					content:function(storage,player,skill){
						return '手牌上限减少'+player.storage.zuoyututanLimit;
					}
				},
				marktext:'碳',
				mod:{
					maxHandcard:function(player,num){
						return num-player.storage.zuoyututanLimit;
					},
				}
			},
			/**卡牌技能 */
			
			
			/**从反抗军先锋开始，所以跳过初始第一回合 */
			_skipFirstPhase:{
				trigger:{global:'phaseBefore'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return (event.player==game.zhu)&&(game.phaseNumber==0);
				},
				content:function(){
					var evt=_status.event.getParent('phase');
					if(evt){
						//game.resetSkills();
						_status.event=evt;
						game.phaseNumber=0;
						_status.event.finish();
						// _status.event.untrigger(true);
					}
				},
			},
			/**使用技能实现给龙皇插入回合 */
			_anotherPhase:{
				trigger:{player:'phaseAfter'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					//console.log(_status.event.getParent('phase'));
					if(_status.event.getParent('phase').skill){
						return false;
					}
					if(game.zhu.storage.state=='second'){
						return false;
					}
					var trueNext=player.next
					while(trueNext.storage.reviving&&trueNext.storage.reviving>0){
						if(trueNext==game.zhu){
							return false
						}
						trueNext=trueNext.next
					}
					return player!=game.zhu&&(trueNext!=game.zhu)
				},
				content:function(){
					if(game.zhu.isOut()){
						game.zhu.in();
						game.broadcastAll(function(splayer){
							_status.dying.remove(splayer);
						},player)
					}
					game.zhu.insertPhase();
				},
			},
			/**死亡时其他人摸牌 */
			_dieAfterDraw:{
				trigger:{global:'dieAfter'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.player.identity==player.identity;
				},
				content:function(){
					player.chooseDrawRecover(2);
					player.showGiveup();
				},
			},
			/**每轮开始的时候重整 */
			_revivePlayer:{
				trigger:{global:'roundStart'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return event.player==player&&player==game.zhu;
				},
				content:function(){
					'step 0'
					event.deadlist=game.dead;
					for(let i=0;i<event.deadlist.length;i=0){
						event.deadlist[i].storage.reviving=0;
						game.broadcastAll(function(splayer){
							splayer.revive(1);
							for(let i=1;i<7;i++){
								if(splayer.isDisabled(i)){
									splayer.enableEquip(i);
								}
							}
							if(splayer.hasSkill('zuoyututanLimit')){
								splayer.removeSkill('zuoyututanLimit');
							}
						},event.deadlist[i])
					}
					// event.deadlist.forEach(element => {
					// });
					'step 1'
					event.outlist=[];
					for(let i=0;i<game.players.length;i++){
						if(game.players[i].storage.reviving==0){
							game.broadcastAll(function(splayer){
								splayer.out('reviving');
							},game.players[i])
						}
						if(game.players[i].isOut()&&game.players[i].storage.reviving>=0) {
							event.outlist.add(game.players[i]);
						}
					}
					'step 2'
					for(let i=0;i<event.outlist.length;i++){
						if(event.outlist[i].storage.reviving==0){
							event.outlist[i].hp=1;
						}
						else if(event.outlist[i].hp>=event.outlist[i].maxHp){
							event.outlist[i].directgain(get.cards(1));
						}
						else{
							event.outlist[i].hp+=1;
						}
						event.outlist[i].storage.reviving++;
						if(event.outlist[i].storage.reviving>5){
							event.outlist[i].storage.reviving=null;
							game.broadcastAll(function(splayer){
								splayer.in('reviving');
							},event.outlist[i])
						}
						event.outlist[i].update();
					}
				}
			}
		},
		help:{
			'龙牢关':'<div style="margin:10px">游戏规则</div><ul style="margin-top:0"><li>游戏人数<br>游戏人数为4人。<li>胜利条件<br>反抗军：龙皇死亡。<br>龙皇：所有反抗军死亡且自己存活。'+
			'<li>死亡奖惩<br>当有反抗军死亡时，其他反抗军，可以选择摸两张牌或回复一点体力。<li>龙皇专属技能<br><br><br></ul>',
		}
	};
});
