'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'doudizhu',
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
				game.prepareArena(3);
			}
			"step 1"
			_status.mode=get.config('doudizhu_mode');
			if(_status.connectMode){
				_status.mode=lib.configOL.doudizhu_mode;
				game.waitForPlayer(function(){
						lib.configOL.number=3;
				});
			}
			else if(_status.mode=='online'){
				lib.card.list=lib.online_cardPile.slice(0);
				lib.inpile.addArray(['nanman','wanjian','taoyuan','wugu']);
				game.fixedPile=true;
			}
			"step 2"
			if(_status.connectMode){
				if(_status.mode=='online'){
					lib.card.list=lib.online_cardPile.slice(0);
					lib.inpile.addArray(['nanman','wanjian','taoyuan','wugu']);
					game.fixedPile=true;
				}
				if(lib.configOL.number<3){
					lib.configOL.number=3;
				}
				game.randomMapOL();
			}
			else{
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
					name:players[i].name1,
					name2:players[i].name2,
					identity:players[i].identity
				});
			}
			_status.videoInited=true;
			game.addVideo('init',null,info);
			if(_status.mode=='kaihei') game.addGlobalSkill('kaihei');

			var next=game.gameDraw(game.zhu||_status.firstAct||game.me);
			if(_status.mode=='online'){
				game.zhu.$equip(game.createCard('diqi','club',13));
				next.num=function(player){
					var num=4;
					if(player==game.zhu){
						if(lib.character[player.name1]&&get.infoHp(lib.character[player.name1][2])>3) num++;
						if(lib.character[player.name2]&&get.infoHp(lib.character[player.name2][2])>3) num++;
					}
					return num;
				};
			}
			if(_status.mode!='online'&&_status.connectMode&&lib.configOL.change_card) game.replaceHandcards(game.players.slice(0));
			game.phaseLoop(game.zhu||_status.firstAct||game.me);
			game.zhu.showGiveup();
		},
		game:{
			recommendDizhu:[
				're_guojia','re_huanggai','re_lvbu','re_guanyu','re_sunquan','re_xusheng','re_wuyi','re_sunben',
				'xuyou','zhangchunhua','caochong','zhangsong','zhongyao','wangyi',
				'caochun','maliang','sp_diaochan','quyi','sp_zhaoyun','shamoke',
				'lijue','liuzan','wenyang','shen_lvmeng','shen_ganning',
				'jiakui','wangyuanji','lingcao','miheng',
				'sp_key_yuri','key_hinata','key_rin','key_kyousuke',
				'ns_chendao','jiakui','haozhao',
			],
			addRecord:function(bool){
				if(typeof bool=='boolean'){
					var data=lib.config.gameRecord.doudizhu.data;
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
					lib.config.gameRecord.doudizhu.str=str;
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
			updateRoundNumber:function(){
				if(_status.mode=='online'){
					game.broadcastAll(function(num1,num2,top,bonusNum){
						if(ui.cardPileNumber){
							var str=num1+'轮 公共牌堆: '+num2;
							if(game.me&&game.me.storage.doudizhu_cardPile&&game.me.storage.doudizhu_cardPile.length) str+=(' 个人牌堆: '+game.me.storage.doudizhu_cardPile.length);
							if(bonusNum) str+=('<br>本场叫价: '+bonusNum*100);
							ui.cardPileNumber.innerHTML=str;
						}
						_status.pileTop=top;
					},game.roundNumber,ui.cardPile.childNodes.length,ui.cardPile.firstChild,game.bonusNum);
					return;
				}
				game.broadcastAll(function(num1,num2,top){
					if(ui.cardPileNumber) ui.cardPileNumber.innerHTML=num1+'轮 剩余牌: '+num2;
					_status.pileTop=top;
				},game.roundNumber,ui.cardPile.childNodes.length,ui.cardPile.firstChild);
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
				var namex;
				switch(_status.mode){
					case 'normal':namex='休闲斗地主';break;
					case 'kaihei':namex='开黑斗地主';break;
					case 'huanle':namex='欢乐斗地主';break;
					case 'online':namex='智斗三国';break;
				}
				var name=[
					str,
					namex+' - '+lib.translate[game.me.identity+'2']
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
				var me=game.me._trueMe||game.me;
				if(game.zhu.isAlive()){
					if(_status.mode!='online'&&game.players.length>1) return;
					if(me==game.zhu){
						game.over(true);
					}
					else{
						game.over(false);
					}
				}
				else {
					if(me==game.zhu){
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
				else return player.identity=='fan';
			},
			chooseCharacterZhidou:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					game.no_continue_game=true;
					lib.init.onfree();
					"step 1"
					ui.arena.classList.add('choose-character');
					var i;
					var groups=[];
					event.list=[];
					event.map={};
					var chara=(get.config('character_online')||lib.characterOnline);
					for(i in chara){
						var list=chara[i];
						for(var j=0;j<list.length;j++){
							if(!lib.character[list[j]]||(i=='key'&&lib.filter.characterDisabled(list[j]))) list.splice(j--,1);
						}
						if(list.length>=3){
							groups.push(i);
							event.list.addArray(list);
						}
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					event.controls=['不叫地主','一倍','两倍','三倍'];
					for(var player of game.players){
						var id=player.playerid;
						player._group=groups.randomRemove(1)[0];
						event.map[id]=chara[player._group].randomGets(3);
						player.storage.doudizhu_cardPile=get.cards(20).sort(function(a,b){
							if(a.name!=b.name) return lib.sort.card(a.name,b.name);
							else if(a.suit!=b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b);
							else return a.number-b.number;
						});
					}
					event.dialog=ui.create.dialog('你的选将框与底牌',[event.map[game.me.playerid],'character'],game.me.storage.doudizhu_cardPile);
					event.start=game.players.randomGet();
					event.current=event.start;
					game.delay(4);
					"step 2"
					if(event.current==game.me) event.dialog.content.firstChild.innerHTML='是否叫地主？';
					else{
						event.dialog.content.firstChild.innerHTML='请等待其他玩家叫地主';
						game.delay(2);
					}
					event.current.chooseControl(event.controls).set('ai',function(){
						return _status.event.getParent().controls.randomGet();
					});
					"step 3"
					event.current._control=result.control;
					event.current.chat(result.control);
					if(result.control=='三倍'){
						game.bonusNum=3;
						game.zhu=event.current;
						return;
					}
					else if(result.control!='不叫地主'){
						event.controls.splice(1,event.controls.indexOf(result.control));
						event.tempDizhu=event.current;
						if(result.control=='二倍') game.bonusNum=2;
					}
					event.current=event.current.next;
					if(event.current==event.start&&(event.start==event.tempDizhu||event.start._control=='不叫地主')){
						game.zhu=event.tempDizhu||event.start.previous;
					}
					else if(event.current==event.start.next&&event.current._control){
						game.zhu=event.tempDizhu;
					}
					else event.goto(2);
					if(event.current==event.start.previous&&!event.tempDizhu) event.controls.remove('不叫地主');
					"step 4"
					game.updateRoundNumber();
					for(var player of game.players){
						player.identity=player==game.zhu?'zhu':'fan';
						player.showIdentity();
					}
					event.dialog.content.firstChild.innerHTML='请选择'+get.cnNumber(game.me==game.zhu?2:1)+'张武将牌';
					game.me.chooseButton(event.dialog,true,game.me==game.zhu?2:1).set('filterButton',function(button){
						return typeof button.link=='string';
					});
					"step 5"
					game.me.init(result.links[0],result.links[1]);
					for(var player of game.players){
						if(player!=game.me){
							if(player==game.zhu){
								var list=event.map[player.playerid].randomGets(2);
								player.init(list[0],list[1]);
							}
							else player.init(event.map[player.playerid].randomGet());
						}
						player.markSkill('doudizhu_cardPile');
					}
					game.zhu.hp=4;
					game.zhu.maxHp=4;
					game.zhu.update();
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			
			chooseCharacterHuanle:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					game.no_continue_game=true;
					var i;
					event.list=[];
					event.list2=[];
					var list4=[];
					if(!event.map) event.map={};
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							var name=ix.randomGet();
							event.list.push(name);
							if(game.recommendDizhu.contains(name)) event.list2.push(name);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(list4.contains(i)||lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						if(game.recommendDizhu.contains(i)) event.list2.push(i);
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					event.controls=['不叫','叫地主'];
					for(var player of game.players){
						var id=player.playerid;
						if(!event.map[id]) event.map[id]=[];
						event.map[id].addArray(event.list2.randomRemove(1));
						event.list.removeArray(event.map[id]);
						event.map[id].addArray(event.list.randomRemove(4-event.map[id].length));
						event.list2.removeArray(event.map[id]);
					}
					event.dialog=ui.create.dialog('你的选将框',[event.map[game.me.playerid],'character']);
					event.start=game.players.randomGet();
					event.current=event.start;
					lib.init.onfree();
					game.delay(2.5);
					"step 1"
					event.current.chooseControl(event.controls).set('ai',function(){
						return Math.random()>0.5?'不叫':'叫地主';
					});
					if(event.current==game.me){
						event.dialog.content.childNodes[0].innerHTML='是否抢地主？';
					}
					"step 2"
					event.current.chat(result.control);
					if(result.control=='叫地主'||event.current==event.start.next){
						game.zhu=result.control=='叫地主'?event.current:event.current.next;
						for(var player of game.players){
							player.identity=player==game.zhu?'zhu':'fan';
							player.showIdentity();
						}
						event.dialog.close();
						event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
					}
					else{
						event.current=event.current.next;
						event.goto(1);
						game.delay(1.5);
					}
					"step 3"
					game.me.chooseButton(['请选择你的武将',[event.map[game.me.playerid],'character']],true);
					"step 4"
					game.me.init(result.links[0]);
					for(var player of game.players){
						if(player!=game.me) player.init(event.map[player.playerid].randomGet());
					}
					game.zhu.hp++;
					game.zhu.maxHp++;
					game.zhu.update();
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			
			chooseCharacterKaihei:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					game.no_continue_game=true;
					var i;
					var identityList=['zhu','fan','fan'];
					game.saveConfig('continue_name');
					event.list=[];
					var list4=[];
					identityList.randomSort();
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
					
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(ix.randomGet());
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(list4.contains(i)||lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					for(var player of game.players){
						player._characterChoice=event.list.randomRemove(player.identity=='zhu'?5:3);
						if(player.identity=='fan') player._friend=(player.next.identity=='fan'?player.next:player.previous);
					}
					var createDialog=['选择武将'];
					createDialog.push([game.me._characterChoice,'character']);
					if(game.me._friend){
						createDialog.push('队友的武将');
						createDialog.push([game.me._friend._characterChoice,'character']);
					}
					game.me.chooseButton(createDialog,true).set('onfree',true).set('filterButton',function(button){
						return _status.event.player._characterChoice.contains(button.link);
					});
					"step 1"
					game.me.init(result.links[0]);
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=game.me) game.players[i].init(game.players[i]._characterChoice.randomGet());
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
						if(game.players[i]==game.zhu){
							game.players[i].hp++;
							game.players[i].maxHp++;
							game.players[i].update();
						}
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

				});
			},
			chooseCharacter:function(){
				if(_status.mode=='kaihei'){
					game.chooseCharacterKaihei();
					return;
				}
				if(_status.mode=='huanle'){
					game.chooseCharacterHuanle();
					return;
				}
				if(_status.mode=='online'){
					game.chooseCharacterZhidou();
					return;
				}
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
					var listc=list.slice(0,2);
					for(var i=0;i<listc.length;i++){
						var listx=lib.characterReplace[listc[i]];
						if(listx&&listx.length) listc[i]=listx.randomGet();
					}
					if(get.config('double_character')){
						player.init(listc[0],listc[1]);
					}
					else{
						player.init(listc[0]);
					}
					if(player==game.zhu){
						player.hp++;
						player.maxHp++;
						player.update();
					}
					if(back){
						list.remove(get.sourceCharacter(player.name1));
						list.remove(get.sourceCharacter(player.name2));
						for(var i=0;i<list.length;i++){
							back.push(list[i]);
						}
					}
					if(typeof lib.config.test_game=='string'&&player==game.me.next){
						player.init(lib.config.test_game);
					}
					player.node.name.dataset.nature=get.groupnature(player.group);
				}
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var list;
					var list4=[];
					var identityList=['zhu','fan','fan'];
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
									dialog.buttons=ui.create.buttons(list,'characterx',buttons);
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
					//选将框分配
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(chosen.contains(ix[j])||lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(i);
							list4.addArray(ix);
						}
					}
					for(i in lib.character){
						if(chosen.contains(i)||list4.contains(i)) continue;
						if(lib.filter.characterDisabled(i)) continue;
						event.list.push(i);
						list4.push(i);
					}
					event.list.randomSort();
					_status.characterlist=list4.slice(0);
					var num=get.config('choice_'+game.me.identity);
					list=event.list.slice(0,num);
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
						dialog=ui.create.dialog(str,'hidden',[list,'characterx']);
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
							_status.event.dialog.buttons=ui.create.buttons(list,'characterx',buttons);
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
					event.list.remove(get.sourceCharacter(game.me.name1));
					event.list.remove(get.sourceCharacter(game.me.name2));
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
						_status.characterlist.remove(get.sourceCharacter(game.players[i].name1));
						_status.characterlist.remove(get.sourceCharacter(game.players[i].name2));
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);

				});
			},
			
			chooseCharacterKaiheiOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['fan','fan','fan'];
					var aiList=game.filterPlayer(function(current){
						return current!=game.me&&!current.isOnline();
					});
					if(aiList.length==1){
						identityList[game.players.indexOf(aiList[0])]='zhu';
					}
					else{
						identityList[0]='zhu';
						identityList.randomSort();
					}
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						game.players[i].identityShown=true;
						if(identityList[i]=='zhu') game.zhu=game.players[i];
					}
					event.list=[];
					var list4=[];
					
					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(ix.randomGet());
							list4.addArray(ix);
						}
					}
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
					}
					_status.characterlist=event.list.slice(0);
					
					var map={};
					for(var player of game.players){
						player._characterChoice=event.list.randomRemove(player.identity=='zhu'?5:3);
						if(player.identity=='fan') player._friend=(player.next.identity=='fan'?player.next:player.previous);
						map[player.playerid]=player._characterChoice;
					}
					game.broadcast(function(map){
						for(var i in map){
							lib.playerOL[i]._characterChoice=map[i];
						}
					},map);
					"step 1"
					var list=[];
					for(var i=0;i<game.players.length;i++){
						var dialog=['请选择武将',[game.players[i]._characterChoice,'character']];
						if(game.players[i]._friend){
							dialog.push('队友的武将');
							dialog.push([game.players[i]._friend._characterChoice,'character']);
						}
						list.push([game.players[i],dialog,true,function(){return Math.random()},function(button){
							return _status.event.player._characterChoice.contains(button.link);
						}]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0]);
					});
					"step 2"
					for(var i in lib.playerOL){
						if(!result[i]||result[i]=='ai'||!result[i].links||!result[i].links.length){
							result[i]=lib.playerOL[i]._characterChoice.randomGet();
						}
						else{
							result[i]=result[i].links[0];
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterHuanleOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					event.list=[];
					event.list2=[];
					var list4=[];
					event.controls=['不叫','叫地主'];
					if(!event.map) event.map={};
					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							var name=ix.randomGet();
							event.list.push(name);
							if(game.recommendDizhu.contains(name)) event.list2.push(name);
							list4.addArray(ix);
						}
					}
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
						if(game.recommendDizhu.contains(i)) event.list2.push(i);
					}
					for(var player of game.players){
						var id=player.playerid;
						if(!event.map[id]) event.map[id]=[];
						event.map[id].addArray(event.list2.randomRemove(1));
						event.list.removeArray(event.map[id]);
						event.map[id].addArray(event.list.randomRemove(4-event.map[id].length));
						event.list2.removeArray(event.map[id]);
					}
					_status.characterlist=event.list.slice(0);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(map,id){
						ui.create.dialog('你的选将框',[map[game.me.playerid],'character']).videoId=id;
					},event.map,event.videoId);
					event.start=game.players.randomGet();
					event.current=event.start;
					if(event.current!=game.me||!event.current.isOnline()) game.delay(3);
					"step 1"
					event.current.chooseControl(event.controls).set('ai',function(){
						return Math.random()>0.5?'不叫':'叫地主';
					});
					"step 2"
					event.current.chat(result.control);
					if(result.control=='叫地主'||event.current==event.start.next){
						game.zhu=result.control=='叫地主'?event.current:event.current.next;
						for(var player of game.players){
							player.identity=player==game.zhu?'zhu':'fan';
							player.showIdentity();
							player.identityShown=true;
						}
						game.broadcastAll('closeDialog',event.videoId)
						event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
					}
					else{
						event.current=event.current.next;
						event.goto(1);
					}
					"step 3"
					var list=[];
					var str='选择角色';
					for(var i=0;i<game.players.length;i++){
						list.push([game.players[i],[str,[event.map[game.players[i].playerid],'character']],true]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1]);
					});
					"step 4"
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list2.remove(result[i].links[j]);
							}
						}
					}
					for(var i in result){
						if(result[i]=='ai'){
							result[i]=event.list2.randomRemove(lib.configOL.double_character?2:1);
						}
						else{
							result[i]=result[i].links
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterZhidouOL:function(){
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					var groups=[];
					event.list=[];
					event.map={};
					var chara=(get.config('character_online')||lib.characterOnline);
					for(i in chara){
						var list=chara[i];
						for(var j=0;j<list.length;j++){
							if(!lib.character[list[j]]||lib.connectBanned.contains(list[j])||(i=='key'&&lib.filter.characterDisabled(list[j],libCharacter))) list.splice(j--,1);
						}
						if(list.length>=3){
							groups.push(i);
							event.list.addArray(list);
						}
					}
					event.list.randomSort();
					_status.characterlist=event.list.slice(0);
					event.controls=['不叫地主','一倍','两倍','三倍'];
					for(var player of game.players){
						var id=player.playerid;
						player._group=groups.randomRemove(1)[0];
						event.map[id]=chara[player._group].randomGets(3);
						player.storage.doudizhu_cardPile=get.cards(20).sort(function(a,b){
							if(a.name!=b.name) return lib.sort.card(a.name,b.name);
							else if(a.suit!=b.suit) return lib.suit.indexOf(a)-lib.suit.indexOf(b);
							else return a.number-b.number;
						});
						player.markSkill('doudizhu_cardPile');
					}
					event.start=game.players.randomGet();
					event.current=event.start;
					
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(map,id){
						ui.create.dialog('你的选将框和底牌',[map[game.me.playerid],'character'],game.me.storage.doudizhu_cardPile).videoId=id;
					},event.map,event.videoId);
					game.delay(4);
					"step 1"
					game.broadcastAll(function(id,current){
						var dialog=get.idDialog(id);
						if(dialog){
							if(game.me==current) dialog.content.firstChild.innerHTML='是否叫地主？';
							else dialog.content.firstChild.innerHTML='请等待其他玩家叫地主';
						}
					},event.videoId,event.current);
					if(event.current!=game.me&&!event.current.isOnline()) game.delay(2);
					event.current.chooseControl(event.controls).set('ai',function(){
						return _status.event.getParent().controls.randomGet();
					});
					"step 2"
					event.current._control=result.control;
					event.current.chat(result.control);
					if(result.control=='三倍'){
						game.bonusNum=3;
						game.zhu=event.current;
						return;
					}
					else if(result.control!='不叫地主'){
						event.controls.splice(1,event.controls.indexOf(result.control));
						event.tempDizhu=event.current;
						if(result.control=='二倍') game.bonusNum=2;
					}
					event.current=event.current.next;
					if(event.current==event.start&&(event.start==event.tempDizhu||event.start._control=='不叫地主')){
						game.zhu=event.tempDizhu||event.start.previous;
					}
					else if(event.current==event.start.next&&event.current._control){
						game.zhu=event.tempDizhu;
					}
					else event.goto(1);
					if(event.current==event.start.previous&&!event.tempDizhu) event.controls.remove('不叫地主');
					"step 3"
					for(var player of game.players){
						player.identity=player==game.zhu?'zhu':'fan';
						player.showIdentity();
						player.identityShown=true;
					}
					game.broadcastAll('closeDialog',event.videoId);
					var list=[];
					for(var i=0;i<game.players.length;i++){
						list.push([game.players[i],['选择'+(game.players[i]==game.zhu?'两':'一')+'张武将牌',[event.map[game.players[i].playerid],'character']],true,game.players[i]==game.zhu?2:1]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1]);
					});
					"step 4"
					for(var i in result){
						if(result[i]=='ai'){
							result[i]=event.map[i].randomRemove(lib.playerOL[i]==game.zhu?2:1);
						}
						else{
							result[i]=result[i].links;
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1]);
						}
					}
					
					game.zhu.hp=4;
					game.zhu.maxHp=4;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1]);
							}
						}
						game.zhu=zhu;
						game.zhu.hp=4;
						game.zhu.maxHp=4;
						game.zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
			chooseCharacterOL:function(){
				if(_status.mode=='kaihei'){
					game.chooseCharacterKaiheiOL();
					return;
				}
				else if(_status.mode=='huanle'){
					game.chooseCharacterHuanleOL();
					return;
				}
				else if(_status.mode=='online'){
					game.chooseCharacterZhidouOL();
					return;
				}
				var next=game.createEvent('chooseCharacter',false);
				next.setContent(function(){
					"step 0"
					ui.arena.classList.add('choose-character');
					var i;
					var identityList=['zhu','fan','fan'];
					identityList.randomSort();
					for(i=0;i<game.players.length;i++){
						game.players[i].identity=identityList[i];
						game.players[i].showIdentity();
						game.players[i].identityShown=true;
						if(identityList[i]=='zhu') game.zhu=game.players[i];
					}

					var list;
					var list4=[];
					event.list=[];

					var libCharacter={};
					for(var i=0;i<lib.configOL.characterPack.length;i++){
						var pack=lib.characterPack[lib.configOL.characterPack[i]];
						for(var j in pack){
							if(j=='zuoci') continue;
							if(lib.character[j]) libCharacter[j]=pack[j];
						}
					}
					for(i in lib.characterReplace){
						var ix=lib.characterReplace[i];
						for(var j=0;j<ix.length;j++){
							if(!libCharacter[ix[j]]||lib.filter.characterDisabled(ix[j],libCharacter)) ix.splice(j--,1);
						}
						if(ix.length){
							event.list.push(i);
							list4.addArray(ix);
						}
					}
					game.broadcast(function(list){
						for(var i in lib.characterReplace){
							var ix=lib.characterReplace[i];
							for(var j=0;j<ix.length;j++){
								if(!list.contains(ix[j])) ix.splice(j--,1);
							}
						}
					},list4);
					for(i in libCharacter){
						if(list4.contains(i)||lib.filter.characterDisabled(i,libCharacter)) continue;
						event.list.push(i);
						list4.push(i)
					}
					_status.characterlist=list4;
					"step 1"
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
					
					for(var i=0;i<game.players.length;i++){
							var num3=0;
							if(game.players[i]==game.zhu) num3=3;
							var str='选择角色';
							list.push([game.players[i],[str,[event.list.randomRemove(num+num3),'characterx']],selectButton,true]);
					}
					game.me.chooseButtonOL(list,function(player,result){
						if(game.online||player==game.me) player.init(result.links[0],result.links[1]);
					});
					"step 2"
					for(var i in result){
						if(result[i]&&result[i].links){
							for(var j=0;j<result[i].links.length;j++){
								event.list.remove(get.sourceCharacter(result[i].links[j]));
							}
						}
					}
					for(var i in result){
						if(result[i]=='ai'){
							var listc=event.list.randomRemove(lib.configOL.double_character?2:1);
							for(var i=0;i<listc.length;i++){
								var listx=lib.characterReplace[listc[i]];
								if(listx&&listx.length) listc[i]=listx.randomGet();
							}
							result[i]=listc;
						}
						else{
							result[i]=result[i].links
						}
						if(!lib.playerOL[i].name){
							lib.playerOL[i].init(result[i][0],result[i][1]);
						}
					}
					
					game.zhu.maxHp++;
					game.zhu.hp++;
					game.zhu.update();
					
					game.broadcast(function(result,zhu){
						for(var i in result){
							if(!lib.playerOL[i].name){
								lib.playerOL[i].init(result[i][0],result[i][1]);
							}
						}
						game.zhu=zhu;
						zhu.maxHp++;
						zhu.hp++;
						zhu.update();
						
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
					},result,game.zhu);
					for(var i=0;i<game.players.length;i++){
						_status.characterlist.remove(game.players[i].name1);
						_status.characterlist.remove(game.players[i].name2);
					}
					setTimeout(function(){
						ui.arena.classList.remove('choose-character');
					},500);
				});
			},
		},
		translate:{
			zhu:"主",
			fan:"反",
			zhu2:"地主",
			fan2:"农民",
			random2:"随机",
			_feiyang:"飞扬",
			_bahu:"跋扈",
			_feiyang_info:"判定阶段开始时，若你的判定区有牌，则你可以弃置两张手牌，然后弃置你判定区的一张牌。每回合限一次。",
			_bahu_info:"锁定技，准备阶段开始时，你摸一张牌。出牌阶段，你可以多使用一张【杀】。",
			kaihei:'强易',
			kaihei_info:'出牌阶段，你可以获得一名其他角色的至多两张牌，然后交给其等量的牌。每名角色每局游戏限一次。',
			doudizhu_cardPile:'底牌',
			_gongshoujintui:'攻守进退',
			gongshoujianbei:'攻守兼备',
			gongshoujianbei_info:'出牌阶段，你可选择：①将此牌当做【万箭齐发】使用。②将此牌当做【桃园结义】使用。',
			jintuiziru:'进退自如',
			jintuiziru_info:'出牌阶段，你可选择：①将此牌当做【南蛮入侵】使用。②将此牌当做【五谷丰登】使用。',
			diqi:'地契',
			diqi_skill:'地契',
			diqi_info:'当你受到伤害时，你可以弃置此牌，防止此伤害。当此牌离开你的装备区后，销毁之。',
			_juzhong:'聚众',
			juzhong_jiu:'聚众',
			zhadan:'炸弹',
			zhadan_info:'当一张牌被使用时，对此牌使用。取消此牌的所有目标，且本局游戏的底价翻倍。',
			jiwangkailai:'继往开来',
			jiwangkailai_info:'出牌阶段，对包含你自己在内的一名角色使用。目标角色选择一项：①弃置所有手牌，然后摸等量的牌。②将所有手牌当做一张不为【继往开来】的普通锦囊牌使用。',
		},
		element:{
			player:{
				getTopCards:function(num){
					if(typeof num!='number') num=1;
					if(num==0) {card=true;num=1;}
					if(num<0) num=1;
					var cards;
					var player=this;
					if(player.storage.doudizhu_cardPile&&player.storage.doudizhu_cardPile.length){
						cards=player.storage.doudizhu_cardPile.randomRemove(num);
						if(player.storage.doudizhu_cardPile.length) player.markSkill('doudizhu_cardPile');
						else player.unmarkSkill('doudizhu_cardPile');
					}
					else cards=[];
					if(cards.length<num) cards.addArray(get.cards(num-cards.length));
					else game.updateRoundNumber();
					return cards;
				},
				hasZhuSkill:function(){return false;},
				$dieAfter:function(){
					if(_status.video) return;
					if(!this.node.dieidentity){
						var str={zhu:'地主',fan:'农民'}[this.identity];
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
		get:{
			rawAttitude:function(from,to){
				if(from.identity==to.identity) return 10;
				return -10;
			},
		},
		skill:{
			_gongshoujintui:{
				enable:'chooseToUse',
				filter:function(event,player){
					var cards=player.getCards('hs');
					for(var i of cards){
						var name=get.name(i,player);
						if(name=='gongshoujianbei'){
							if(event.filterCard({
								name:'wanjian',
								isCard:true,
								cards:[i],
							},player,event)||event.filterCard({
								name:'taoyuan',
								isCard:true,
								cards:[i],
							},player,event)) return true;
						}
						if(name=='jintuiziru'){
							if(event.filterCard({
								name:'nanman',
								isCard:true,
								cards:[i],
							},player,event)||event.filterCard({
								name:'wugu',
								isCard:true,
								cards:[i],
							},player,event)) return true;
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						if(player.countCards('hs','gongshoujianbei')){
							list.push(['锦囊','','wanjian']);
							list.push(['锦囊','','taoyuan']);
						}
						if(player.countCards('hs','jintuiziru')){
							list.push(['锦囊','','nanman']);
							list.push(['锦囊','','wugu']);
						}
						return ui.create.dialog('攻守兼备/进退自如',[list,'vcard'],'hidden');
					},
					filter:function(button,player){
						var name=button.link[2];
						var rawname=((name=='wanjian'||name=='taoyuan')?'gongshoujianbei':'jintuiziru');
						var cards=player.getCards('hs');
						var evt=_status.event.getParent();
						for(var i of cards){
							if(get.name(i,player)==rawname&&evt.filterCard({
								name:name,
								isCard:true,
								cards:[i],
							},player,evt)) return true;
						}
						return false;
					},
					check:function(button){
						return _status.event.player.getUseValue({name:button.link[2],isCard:true});
					},
					backup:function(links){
						var name=links[0][2];
						var rawname=((name=='wanjian'||name=='taoyuan')?'gongshoujianbei':'jintuiziru');
						return {
							viewAs:{name:name,isCard:true},
							filterCard:{name:rawname},
							ai1:()=>1,
						}
					},
					prompt:function(links){
						var name=links[0][2];
						var rawname=((name=='wanjian'||name=='taoyuan')?'gongshoujianbei':'jintuiziru');
						return '将一张'+get.translation(rawname)+'当做'+get.translation(name)+'使用';
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
			},
			doudizhu_cardPile:{
				intro:{
					content:'cardCount',
				},
			},
			kaihei:{
				enable:'phaseUse',
				filter:function(event,player){
					return player==game.zhu&&game.hasPlayer(function(current){
						return lib.skill.kaihei.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					return player!=target&&!target.storage.kaihei&&target.countGainableCards(player,'he')>0;
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,[1,2],'he',true);
					target.storage.kaihei=true;
					'step 1'
					if(!result.bool||!result.cards.length){
						event.finish();return;
					}
					var num=result.cards.length;
					var hs=player.getCards('he');
					if(hs.length){
						if(hs.length<=num) event._result={bool:true,cards:hs};
						else player.chooseCard('he',true,num,'选择交给'+get.translation(target)+get.cnNumber(num)+'张牌');
					}
					else event.finish();
					'step 2'
					if(result.bool&&result.cards&&result.cards.length) target.gain(result.cards,player,'giveAuto');
				},
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,target){
						if(player==target||player.identity!='fan'||target.identity!='fan') return false;
					},
				},
			},
			_feiyang:{
				trigger:{player:'phaseJudgeBegin'},
				direct:true,
				filter:function(event,player){
					return _status.mode!='online'&&player==game.zhu&&player.countCards('j')&&player.countCards('h')>1;
				},
				content:function(){
					"step 0"
					player.chooseToDiscard('h',2,'是否发动【飞扬】，弃置两张手牌并弃置自己判定区的一张牌？').set('logSkill','_feiyang').ai=function(card){
						return 6-get.value(card);
					};
					"step 1"
					if(result.bool){
						player.discardPlayerCard(player,'j',true);
					}
				},
			},
			_bahu:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return _status.mode!='online'&&player==game.zhu;
				},
				content:function(){
					player.draw();
				},
				mod:{
					cardUsable:function(card,player,num){
						if(_status.mode!='online'&&player==game.zhu&&card.name=='sha') return num+1;
					},
				},
			},
			_dieAfterDraw:{
				trigger:{global:'dieAfter'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return _status.mode!='online'&&event.player.identity==player.identity;
				},
				content:function(){
					player.chooseDrawRecover(2);
					player.showGiveup();
				},
			},
			diqi_skill:{
				trigger:{player:'damageBegin2'},
				filter:function(event,player){
					var card=player.getEquip('diqi');
					return get.itemtype(card)=='card'&&lib.filter.cardDiscardable(card,player,'diqi_skill');
				},
				check:function(event,player){
					return event.num>=Math.min(player.hp,2);
				},
				prompt2:function(event,player){
					return '弃置'+get.translation(player.getEquip('diqi'))+'并防止即将受到的'+get.cnNumber(event.num)+'点伤害';
				},
				content:function(){
					player.discard(player.getEquip('diqi'));
					trigger.cancel();
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			_juzhong:{
				trigger:{global:'useCard'},
				direct:true,
				ruleSkill:true,
				filter:function(event,player){
					return _status.mode=='online'&&!event.all_excluded&&event.player.isFriendOf(player)&&event.player!=player&&lib.skill._juzhong.infos[event.card.name]&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('是否响应【聚众】？',get.translation(trigger.player)+'使用了'+get.translation(trigger.card)+'。你可弃置一张名称相同的牌，令'+lib.skill._juzhong.infos[trigger.card.name][0],function(card,player){
						return get.name(card,player)==_status.event.getTrigger().card.name;
					}).set('ai',lib.skill._juzhong.infos[trigger.card.name][2]).logSkill=['_juzhong',trigger.player];
					'step 1'
					if(result.bool){
						lib.skill._juzhong.infos[trigger.card.name][1]();
						if(!event.goon) event.finish();
					}
					else event.finish();
					'step 2'
					trigger.player.chooseTarget('你可选择一名角色，弃置其的一张牌',function(card,player,target){
						return target.countDiscardableCards(player,'he')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var nh=target.countCards('h');
						if(att>0){
							if(target.getEquip('baiyin')&&target.isDamaged()&&
								get.recoverEffect(target,player,player)>0){
								if(target.hp==1&&!target.hujia) return 1.6*att;
								if(target.hp==2) return 0.01*att;
								return 0;
							}
						}
						var es=target.getCards('e');
						var noe=(es.length==0||target.hasSkillTag('noe'));
						var noe2=(es.filter(function(esx){
							return get.value(esx,target)>0;
						}).length==0);
						var noh=(nh==0||target.hasSkillTag('noh'));
						if(noh&&(noe||noe2)) return 0;
						if(att<=0&&!target.countCards('he')) return 1.5*att;
						return -1.5*att;
					});
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						trigger.player.line(target,'green');
						trigger.player.discardPlayerCard(target,true,'he');
					}
				},
				infos:{
					sha:['此【杀】的伤害值基数+1。',function(){
						var evt=_status.event._trigger;
						if(!evt.baseDamage) evt.baseDamage=1;
						evt.baseDamage++;
					},function(card){
						var evt=_status.event.getTrigger();
						if(!evt.targets.length) return 0;
						if(evt.targets[0].hasShan()||evt.targets[0].hasSkillTag('filterDamage',null,{
							player:evt.targets[0],
							card:evt.card,
						})) return 0;
						return 1;
					}],
					shan:['其可弃置一名角色的一张牌。',function(){
						_status.event.goon=true;
					},function(card){
						if(game.zhu.countCards('he',function(card){
							return get.value(card,game.zhu)>=6;
						})) return 7-get.value(card);
						if(game.zhu.countCards('he',function(card){
							return get.value(card,game.zhu)>0
						})) return 5-get.value(card);
						return 0;
					}],
					tao:['其摸两张牌。',function(){
						_status.event._trigger.player.draw(2);
					},function(card){
						return 6-get.value(card);
					}],
					jiu:['其本回合的伤害值或回复值+1。',function(){
						var player=_status.event._trigger.player;
						player.addTempSkill('juzhong_jiu');
						player.addMark('juzhong_jiu',1,false);
					},function(card){
						return 6-get.value(card);
					}],
				},
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,target){
						if(_status.mode!='online'||player==target||player.identity!=target.identity) return false;
					},
				},
			},
			juzhong_jiu:{
				trigger:{
					player:'recoverBegin',
					source:'damageBegin1',
				},
				forced:true,
				popup:false,
				content:function(){
					trigger.num+=player.countMark('juzhong_jiu');
				},
				onremove:true,
				intro:{content:'本回合的伤害值和回复值+#'},
			},
			_zhadan:{
				trigger:{player:'useCard'},
				priority:5,
				popup:false,
				forced:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('h','zhadan');
					});
				},
				forceLoad:true,
				content:function(){
					'step 0'
					event.source=trigger.player;
					event.card=trigger.card;
					event.targets=trigger.targets;
					event._global_waiting=true;
					event.filterCard=function(card,player){
						if(get.name(card)!='zhadan'||get.itemtype(card)!='card') return false;
						return lib.filter.cardEnabled(card,player,'forceEnable');
					};
					event.send=function(player,card,source,targets,id,id2,skillState){
						if(skillState){
							player.applySkills(skillState);
						}
						var str=get.translation(source);
						if(targets&&targets.length){
							str+='对'+get.translation(targets);
						}
						str+='使用了';
						str+=get.translation(card);
						str+='，是否对其使用【炸弹】？';

						var next=player.chooseToUse({
							filterCard:function(card,player){
								if(get.name(card)!='zhadan'||get.itemtype(card)!='card') return false;
								return lib.filter.cardEnabled(card,player,'forceEnable');
							},
							prompt:str,
							_global_waiting:true,
							ai1:function(card){
								var evt=_status.event.getParent('_zhadan')._trigger,player=_status.event.player;
								if(!evt) return 0;
								if(get.attitude(player,evt.player)>0) return 0;
								var eff=0;
								if(!targets.length) return Math.random()-0.5;
								for(var i of targets) eff-=get.effect(i,evt.card,evt.player,player);
								return eff-8;
							},
							source:source,
							source2:targets,
							id:id,
							id2:id2
						});
						next.set('respondTo',[source,card]);

						if(game.online){
							_status.event._resultid=id;
							game.resume();
						}
						else{
							next.nouse=true;
						}
					};
					'step 1'
					var list=game.filterPlayer(function(current){
						return current.countCards('h',function(card){
							if(get.name(card)!='zhadan'||get.itemtype(card)!='card') return false;
							return lib.filter.cardEnabled(card,player,'forceEnable');
						});
					});
					event.list=list;
					event.id=get.id();
					list.sort(function(a,b){
						return get.distance(event.source,a,'absolute')-get.distance(event.source,b,'absolute');
					});
					'step 2'
					if(event.list.length==0){
						event.finish();
					}
					else if(_status.connectMode&&(event.list[0].isOnline()||event.list[0]==game.me)){
						event.goto(4);
					}
					else{
						event.current=event.list.shift();
						event.send(event.current,event.card,event.source,event.targets,event.id,trigger.parent.id);
					}
					'step 3'
					if(result.bool){
						event.zhadanresult=event.current;
						event.zhadanresult2=result;
						event.goto(8);
					}
					else{
						event.goto(2);
					}
					'step 4'
					var id=event.id;
					var sendback=function(result,player){
						if(result&&result.id==id&&!event.zhadanresult&&result.bool){
							event.zhadanresult=player;
							event.zhadanresult2=result;
							game.broadcast('cancel',id);
							if(_status.event.id==id&&_status.event.name=='chooseToUse'&&_status.paused){
								return (function(){
									event.resultOL=_status.event.resultOL;
									ui.click.cancel();
									if(ui.confirm) ui.confirm.close();
								});
							}
						}
						else{
							if(_status.event.id==id&&_status.event.name=='chooseToUse'&&_status.paused){
								return (function(){
									event.resultOL=_status.event.resultOL;
								});
							}
						}
					};

					var withme=false;
					var withol=false;
					var list=event.list;
					for(var i=0;i<list.length;i++){
						if(list[i].isOnline()){
							withol=true;
							list[i].wait(sendback);
							list[i].send(event.send,list[i],event.card,event.source,event.targets,event.id,trigger.parent.id,get.skillState(list[i]));
							list.splice(i--,1);
						}
						else if(list[i]==game.me){
							withme=true;
							event.send(list[i],event.card,event.source,event.targets,event.id,trigger.parent.id);
							list.splice(i--,1);
						}
					}
					if(!withme){
						event.goto(6);
					}
					if(_status.connectMode){
						if(withme||withol){
							for(var i=0;i<game.players.length;i++){
								game.players[i].showTimer();
							}
						}
					}
					event.withol=withol;
					'step 5'
					if(result&&result.bool&&!event.zhadanresult){
						game.broadcast('cancel',event.id);
						event.zhadanresult=game.me;
						event.zhadanresult2=result;
					}
					'step 6'
					if(event.withol&&!event.resultOL){
						game.pause();
					}
					'step 7'
					for(var i=0;i<game.players.length;i++){
						game.players[i].hideTimer();
					}
					'step 8'
					if(event.zhadanresult){
						event.zhadanresult.$fullscreenpop('炸弹',get.groupnature(event.zhadanresult))
						var next=event.zhadanresult.useResult(event.zhadanresult2);
						next.respondTo=[trigger.player,trigger.card];
						game.bonusNum*=2;
						game.updateRoundNumber();
					}
				}
			},
		},
		card:{
			gongshoujianbei:{
				fullskin:true,
				type:'trick',
			},
			jintuiziru:{
				fullskin:true,
				type:'trick',
			},
			diqi:{
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:['diqi_skill'],
				destroy:'diqi_skill',
				ai:{
					basic:{
						equipValue:6
					},
				},
			},
			zhadan:{
				audio:true,
				fullskin:true,
				type:'trick',
				ai:{
					basic:{
						useful:[6,4],
						value:[6,4],
					},
					result:{player:1},
				},
				notarget:true,
				content:function(){
					var evt=event.getParent(2)._trigger;
					evt.targets.length=0;
					evt.all_excluded=true;
					game.log(evt.card,'的效果被炸弹抵消了');
				},
			},
			jiwangkailai:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:function(card,player){
					var hs=player.getCards('h',function(cardx){
						return cardx!=card&&(!card.cards||!card.cards.contains(cardx));
					});
					if(!hs.length) return false;
					var use=true,discard=true;
					for(var i of hs){
						if(use&&!game.checkMod(i,player,'unchanged','cardEnabled2',player)) use=false;
						if(discard&&!lib.filter.cardDiscardable(i,player,'jiwangkailai')) discard=false;
						if(!use&&!discard) return false;
					}
					return true;
				},
				selectTarget:-1,
				toself:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				content:function(){
					'step 0'
					var hs=player.getCards('h');
					if(hs.length){
						var use=true,discard=true;
						for(var i of hs){
							if(use&&!game.checkMod(i,player,'unchanged','cardEnabled2',player)) use=false;
							if(discard&&!lib.filter.cardDiscardable(i,player,'jiwangkailai')) discard=false;
							if(!use&&!discard) break;
						}
						if(use&&discard) player.chooseControl().set('prompt','继往开来：请选择一项').set('choiceList',[
							'弃置所有手牌，然后摸等量的牌',
							'将所有手牌当做一张普通锦囊牌使用',
						]).set('ai',function(){
							if(_status.event.player.countCards('h')>2) return 0;
							return 1;
						});
						else if(use) event._result={index:1};
						else if(discard) event._result={index:0};
						else event.finish();
					}
					else event.finish();
					'step 1'
					var cards=player.getCards('h');
					if(result.index==0){
						player.discard(cards);
						player.draw(cards.length);
						event.finish();
					}
					else{
						var list=[];
						for(var i of lib.inpile){
							if(i!='jiwangkailai'&&get.type(i)=='trick'&&lib.filter.filterCard({name:i,cards:cards},player)) list.push(['锦囊','',i]);
						}
						if(list.length){
							player.chooseButton(['继往开来：选择要使用的牌',[list,'vcard']],true).set('ai',function(button){
								var player=_status.event.player;
								return player.getUseValue({name:button.link[2],cards:player.getCards('h')});
							});
						}
						else event.finish();
					}
					'step 2'
					if(result.bool) player.chooseUseTarget({name:result.links[0][2]},player.getCards('h'),true);
				},
				ai:{
					basic:{
						order:0.5,
						useful:3,
						value:5
					},
					result:{
						target:function(player,target){
							if(target.needsToDiscard(1)||!target.countCards('h',function(card){
								return get.value(card,player)>=5.5;
							})) return 1;
							return 0;
						},
					},
					tag:{
						draw:2
					}
				}
			},
		},
		characterOnline:{
			nijisanji:[
				'MononobeAlice','ShizukaRin','UshimiIchigo','SisterClearie','LizeHelesta','SuzuharaLulu','KagamiHayato',
				'KenmochiDouya','YukishiroMahiro','OnomachiHaruka','SakuraRitsuki','re_AngeKatrina','AmamiyaKokoro','re_AibaUiha',
				'Azusa','Shaun',
			],
			holo:[
				'TokinoSora','NatsuiroMatsuri','RobokoSan','ShirakamiFubuki','AkiRosenthal','HoshimatiSuisei','NekomataOkayu',
				'SakuraMiko','MinatoAqua','UsadaPekora','ŌokamiMio','re_UruhaRushia','re_NakiriAyame','re_ŌzoraSubaru',
				'Civia','SpadeEcho','Artia','Doris','Yogiri',
			],
			vtuber:[
				'ShirayukiMishiro','KaguyaLuna','UmoriHinako','SuouPatra','TenkaiTsukasa','Yousa','MiraiAkari','Kaf','Rim',
				're_YuNi','re_TomariMari','re_Omesis','re_NijikawaRaki','re_KizunaAI',
				'Bella','Carol','Diana','EQueen',
			],
			clubs:[
				'KaguraMea','TakatsukiRitsu','MorinagaMiu','OtomeOto','HanazonoSerena','MashiroKanon',
				'Nekomasu','Eilene','Yomemi','ShizukuLulu','re_MinamiNami','kaguraNaNa','Menherachan','ShikaiYue',
				'Ciyana','Pudding','AyanaNana','AkiRinco',
			],
		},
		online_cardPile:[
			['spade',1,'guding'],
			['spade',1,'zhadan'],
			['spade',2,'tengjia'],
			['spade',2,'cixiong'],
			['spade',3,'jiu'],
			['spade',3,'guohe'],
			['spade',4,'sha','thunder'],
			['spade',4,'guohe'],
			['spade',5,'sha','thunder'],
			['spade',5,'qinglong'],
			['spade',6,'sha','thunder'],
			['spade',6,'jiwangkailai'],
			['spade',7,'sha','thunder'],
			['spade',7,'jintuiziru'],
			['spade',8,'sha','thunder'],
			['spade',8,'sha'],
			['spade',9,'jiu'],
			['spade',9,'sha'],
			['spade',10,'gongshoujianbei'],
			['spade',10,'sha'],
			['spade',11,'tiesuo'],
			['spade',11,'shunshou'],
			['spade',12,'tiesuo'],
			['spade',12,'zhangba'],
			['spade',13,'wuxie'],
			['spade',13,'dawanma'],
			
			['club',1,'baiyin'],
			['club',1,'zhuge'],
			['club',2,'tengjia'],
			['club',2,'bagua'],
			['club',3,'jiu'],
			['club',3,'sha'],
			['club',4,'jintuiziru'],
			['club',4,'sha'],
			['club',5,'sha','thunder'],
			['club',5,'dilu'],
			['club',6,'sha','thunder'],
			['club',6,'sha'],
			['club',7,'sha','thunder'],
			['club',7,'sha'],
			['club',8,'sha','thunder'],
			['club',8,'sha'],
			['club',9,'jiu'],
			['club',9,'sha'],
			['club',10,'tiesuo'],
			['club',10,'sha'],
			['club',11,'tiesuo'],
			['club',11,'sha'],
			['club',12,'tiesuo'],
			['club',12,'wuxie'],
			['club',13,'tiesuo'],
			['club',13,'jiedao'],
			['club',13,'wuxie'],
			
			['heart',1,'wuxie'],
			['heart',1,'gongshoujianbei'],
			['heart',1,'zhadan'],
			['heart',2,'huogong'],
			['heart',2,'shan'],
			['heart',3,'huogong'],
			['heart',3,'wuzhong'],
			['heart',4,'sha','fire'],
			['heart',4,'tao'],
			['heart',5,'tao'],
			['heart',5,'chitu'],
			['heart',6,'tao'],
			['heart',6,'jiwangkailai'],
			['heart',7,'sha','fire'],
			['heart',7,'tao'],
			['heart',8,'shan'],
			['heart',8,'wuzhong'],
			['heart',9,'shan'],
			['heart',9,'tao'],
			['heart',10,'sha','fire'],
			['heart',10,'sha'],
			['heart',11,'shan'],
			['heart',11,'wuzhong'],
			['heart',12,'shan'],
			['heart',12,'guohe'],
			['heart',13,'wuxie'],
			['heart',13,'zhuahuang'],
			
			['diamond',1,'zhuque'],
			['diamond',1,'juedou'],
			['diamond',2,'tao'],
			['diamond',2,'shan'],
			['diamond',3,'tao'],
			['diamond',3,'shan'],
			['diamond',4,'sha','fire'],
			['diamond',4,'shunshou'],
			['diamond',5,'sha','fire'],
			['diamond',5,'guanshi'],
			['diamond',6,'shan'],
			['diamond',6,'sha'],
			['diamond',7,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'shan'],
			['diamond',8,'shan'],
			['diamond',9,'jiu'],
			['diamond',9,'shan'],
			['diamond',10,'shan'],
			['diamond',10,'sha'],
			['diamond',11,'shan'],
			['diamond',11,'shan'],
			['diamond',12,'huogong'],
			['diamond',12,'tao'],
			['diamond',13,'xiliu'],
			['diamond',13,'sha'],
			['diamond',13,'wuxie']
		],
		help:{
			'斗地主':'<div style="margin:10px">游戏规则</div><ul style="margin-top:0"><li>游戏人数<br>游戏人数为3人（地主x1 + 农民x2）。<li>胜利条件<br>农民：地主死亡。<br>地主：所有农民死亡且自己存活。'+
			'<li>死亡奖惩<br>当有农民死亡时，若另一名农民存活，则其可以选择摸两张牌或回复一点体力。<li>地主专属技能<br>地主可以使用专属技能【飞扬】和【跋扈】。<br>【飞扬】判定阶段开始时，若你的判定区有牌，则你可以弃置两张手牌，然后弃置你判定区的一张牌。每回合限一次。<br>【跋扈】锁定技，准备阶段开始时，你摸一张牌。出牌阶段，你可以多使用一张【杀】。</ul>',
		}
	};
});
