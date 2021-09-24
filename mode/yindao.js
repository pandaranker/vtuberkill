'use strict';
game.import('mode',function(lib,game,ui,get,ai,_status){
	return {
		name:'yindao',
		changbanCharacter:[],
		yindaoPile:[
			['spade',5,'sha'],
			['spade',7,'sha'],
			['spade',8,'sha'],
			['spade',10,'sha'],
			['heart',10,'sha'],
			['heart',11,'sha'],
			['club',4,'sha'],
			['club',5,'sha'],
			['club',6,'sha'],
			['club',8,'sha'],
			['club',9,'sha'],
			['club',10,'sha'],
			['club',11,'sha'],
			['diamond',6,'sha'],
			['diamond',9,'sha'],
			['diamond',11,'sha'],
			['heart',2,'shan'],
			['heart',5,'shan'],
			['diamond',2,'shan'],
			['diamond',3,'shan'],
			['diamond',7,'shan'],
			['diamond',8,'shan'],
			['diamond',10,'shan'],
			['diamond',11,'shan'],
			['heart',3,'tao'],
			['heart',4,'tao'],
			['heart',9,'tao'],
			['diamond',12,'tao'],
			['club',12,'bingliang'],
			['spade',3,'guohe'],
			['diamond',12,'guohe'],
			['club',3,'guohe'],
			['club',1,'juedou'],
			['spade',1,'juedou'],
			['heart',6,'lebu'],
			['spade',1,'nanman'],
			['club',7,'shuiyanqijunx'],
			['spade',4,'shunshou'],
			['spade',11,'shunshou'],
			['diamond',4,'shunshou'],
			['heart',1,'wanjian'],
			['heart',5,'wuxie'],
			['club',5,'wuxie'],
			['heart',7,'wuzhong'],
			['heart',8,'wuzhong'],
			['diamond',5,'guanshi'],
			['spade',9,'hanbing'],
			['spade',6,'qinggang'],
			['spade',12,'zhangba'],
			['diamond',1,'zhuge'],
			['spade',2,'bagua'],
			['club',2,'renwang'],
		],
		characterSingle:{},
		startBefore:function(){
			_status.mode='yindao';
			for(var i in lib.characterSingle){
				lib.character[i]=lib.characterSingle[i];
				if(!lib.character[i][4]){
					lib.character[i][4]=[];
				}
			}
			for(var j in lib.yindaoTranslate) lib.translate[j]=lib.yindaoTranslate[j];
			if(!lib.yindao)	lib.yindao={
				completeNumber:0,
				addFellow:function(name){
					game.fan.dataset.position = 2;
					ui.arena.setNumber(3);
					game.fellow = game.addFellow(1, name);
					game.fellow.gain(get.cards(4));
					game.fellow.identity = 'zhong';
					game.fellow.setIdentity();
					game.fellow.identityShown = true;
					game.fellow.node.identity.classList.remove('guessing');
					_status.event.getParent('phaseLoop').player = game.fellow;
				},
			}
		},
		start:function(){
			'step 0'
			var playback=localStorage.getItem(lib.configprefix+'playback');
			if(playback){
				event.finish();
			}
			else if(!_status.connectMode){
				game.prepareArena(2);
			}
			'step 1'
			_status.mode='yindao';
			lib.card.list=lib.yindaoPile.slice(0);
			'step 2'
			for(var i=0;i<game.players.length;i++){
				game.players[i].getId();
			}
			game.changeCharacter0();
			'step 3'
			game.syncState();
			
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
			'step 4'
			event.player = game.me;
			event.trigger('gameStart');
			'step 5'
			if(_status.reYindao){
				_status.reYindao = false;
				event.goto(4);
			}
			game.delay(3);
			'step 6'
			game.over();
		},
		game:{
			getVideoName:function(){
				var str=get.translation(game.me.name);
				if(game.me.name2){
					str+='/'+get.translation(game.me.name2);
				}
				var name=[
					str,
					'引导'+' - '+lib.translate[game.me.identity+'2']
				];
				return name;
			},
			showIdentity:function(){},
			checkResult:function(){
				game.over((game.me._trueMe||game.me).isAlive());
			},
			checkOnlineResult:function(player){
				return game.me.isAlive();
			},
			changeCharacter0:function(){
				var next=game.createEvent('changeCharacter',false);
				next.setContent(function(){
					'step 0'
					var map=['zhu','fan'];
					game.me.identity=map[0];
					game.me.next.identity=map[1];
					game.me.showIdentity();
					game.me.next.showIdentity();
					'step 1'
					game.me.init('qiudi');
					game.me.next.init('shanbao');
					'step 2'
					lib.init.onfree();
				});
			},
		},
		element:{
			player:{
				hasZhuSkill:function(){return false;},
				dieAfter:function(){
					game.checkResult();
				},
				logAi:function(targets,card){},
				showIdentity:function(){
					game.broadcastAll(function(player,identity){
						player.identity=identity;
						game[identity]=player;
						player.side=identity=='zhu';
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
			attitude:function(from,to){
				if(from.identity==to.identity) return 10;
				return -10;
			},
		},
		skill:{
			_yindaoA:{
				trigger:{player:'gameStart'},
				silent:true,
				popup:false,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					galgame.sce("yindaoA0");
					'step 1'
					galgame.sce("yindaoA1");
					'step 2'
					switch(result.bool){
						case '纯路人，什么是三国杀？':{
							galgame.sce("yindaoB");
						}
						case '听说过，也玩过类似的桌游':{
							galgame.sce("yindaoC");
							_status.oneYindao = true
							break;
						}
						case '只接触过原版的三国杀':{
							galgame.sce("yindaoD");
						}
						case '我是资深杀友，各种版本的三国杀都有玩':{

						}
					}
					'step 3'
					if(_status.oneYindao){
						event.trigger('yindaoCard');
					}	
					'step 4'
					galgame.sce("over");
					'step 5'
					switch(result.bool){
						case '再引导一次':{_status.reYindao = true;break;}
						case '进入身份模式':{
							game.saveConfig('mode','identity');
							game.reload();break;
						}
						case '进入国战模式':{
							game.saveConfig('mode','guozhan');
							game.reload();break;
						}
					}
					'step 6'
					if(_status.reYindao){
						event.goto(1);
						_status.reYindao = false;
					}
					else{
						game.over();
					}
					
				},
			},
			_yindaoCard:{
				trigger:{player:'yindaoCard'},
				silent:true,
				popup:false,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					player.gain(game.createCard('sha'),'gain2');
					game.delay(2);
					'step 1'
					galgame.sce("yindaoCard1");
					'step 2'
					player.chooseToUse({
						prompt:'###选择手牌中的【杀】，再选择〖扇宝〗，就可以使用出这张【杀】###（一张牌被使用后会离开手牌区，并在“结算”后进入名为“弃牌堆的地方）',
						filterCard:function(card,player){
							return card.name=='sha'&&lib.filter.filterCard.apply(this,arguments);
						},
						addCount:false,
						forced:true,
					});
					'step 3'
					player.gain(game.createCard('shan'),'gain2');
					player.next.gain(game.createCard('sha'),'gain2');
					game.delay(2);
					'step 4'
					galgame.sce("yindaoCard2");
					'step 5'
					player.next.chooseToUse({
						filterCard:function(card,player){
							return card.name=='sha'&&lib.filter.filterCard.apply(this,arguments);
						},
						addCount:false,
						forced:true,
					});
					'step 6'
					switch(result.bool){
		
					}
				},
			},
			_yindaoD:{
				trigger:{global:'yindaoD'},
				silent:true,
				popup:false,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					galgame.sce("yindao0");
					'step 1'
					galgame.sce("yindao1");
					'step 2'
					switch(result.bool){
		
					}
				},
			},
			_yindaoJiben:{
				trigger:{global:'yindaoJiben'},
				silent:true,
				popup:false,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					galgame.sce("yindao0");
					'step 1'
					galgame.sce("yindao1");
					'step 2'
					switch(result.bool){
		
					}
				},
			}
		},
		yindaoTranslate:{
		},
		translate:{
			zhu:"先",
			fan:"后",
			zhu2:"先手",
			fan2:"后手",
		},
	};
});
