'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'Beginner',
		connect:true,
		character:{
			/**绊爱 */
			re_KizunaAI:['female','upd8',4,['re_ailian'],['zhu']],
			/**辉夜月 */
			re_KaguyaLuna:['female','qun',4,['re_jiajiupaidui']],
			/**未来明 */
			re_MiraiAkari: ['female', 'qun', 4, ['duanli','qingmi']],
			/**狗妈 */
			re_kaguraNaNa: ['female', 'qun', 4, ['re_DDzhanshou'], ['zhu']],
			/**小白 */
			re_Siro: ['female', 'dotlive', 3, ['lingsi']],
			/**狐叔 */
			re_Nekomasu: ['female', 'qun', 3, ['milijianying', 're_dianyin']],
			/**下地 */
			re_XiaDi: ['male', 'qun', 4, ['re_yinliu', 'dunzou']],
			/**物述有栖 */
			re_MononobeAlice:['female','nijisanji',3,['tinenghuifu1','re_dianmingguzhen']],
			/**静凛 */
			re_ShizukaRin:['female','nijisanji',4,['re_mozhaotuji']],
			/**家长麦 */
	//		IenagaMugi:['female','nijisanji',3,['fengxue','yuepi','cangxiong']],
			/**月之美兔 */
			re_MitoTsukino:['female','nijisanji',3,['re_bingdielei'],['zhu']],
			/**宇志海莓 */
			re_UshimiIchigo: ['female', 'nijisanji', 3, ['re_shuangren', 're_jitui']],
			/**铃鹿诗子 */
	//		SuzukaUtako: ['female', 'nijisanji', 3, ['meici', 'danlian']],
			/**樋口枫 */
			re_HiguchiKaede: ['female', 'nijisanji', 4, ['re_zhenyin']],
			/**时乃空 */
			re_TokinoSora:['female','holo',4,['re_taiyangzhiyin'],['zhu']],
			/**萝卜子 */
			re_RobokoSan:['female','holo',3,['re_zhanxie','re_chongdian']],
			/**白上吹雪 */
			re_ShirakamiFubuki:['female','holo',3,['re_yuanlv','re_jinyuan'],['zhu']],
			/**星街慧星 */
			re_HoshimatiSuisei:['female','holo',4,['cansha']],
			/**aki */
			re_AkiRosenthal: ['female', 'holo', 3, ['meiwu', 're_huichu']],
			/**樱巫女 */
			re_SakuraMiko: ['female', 'holo', 3, ['huangyou','qidao']],
			 /**夏色祭 */
			re_NatsuiroMatsuri:['female','holo',3,['re_huxi1']],
			 /**赤井心 */
			re_AkaiHaato:['female','holo',3,['chixin']],
			/**兔田佩克拉 */
			re_UsadaPekora:['female','holo',4,['qiangyun','tuquan']],
			/**润羽露西娅 */
			re_UruhaRushia:['female','holo',3,['juebi','zhanhou']],
			
			/**小希小桃 */
			re_XiaoxiXiaotao:['female','qun',3,['re_doupeng','re_xuyan']],
			/**犬山 */
			re_InuyamaTamaki:['male','key',3,['rongyaochengyuan','re_hundunliandong']],
			/**咩宝 */
			re_KaguraMea: ['female', 'qun', 3, ['re_luecai', 're_xiaoyan']],

			
			/**Re修女克蕾雅 */
			re_SisterClearie:['female','nijisanji',4,['shenyou','shenfa']],
			/**Re莉泽 */
			re_LizeHelesta:['female','nijisanji',3,['yubing']],
			/**Re安洁 */
			re_AngeKatrina:['female','nijisanji',3,['xiaoqiao','liancheng']],
			/**ReYuNi */
			re_YuNi:['female','upd8',4,['re_shengcai']],
			/**Re兔鞠 */
			re_TomariMari:['male','upd8',3,['liansheng','ruantang']],
			/**Omesis */
			re_Omesis:['female','upd8',4,['yaozhan','chongxin']],
		},
		characterIntro:{
			re_SisterClearie:	'神のご加護があらんことを      --《DOMAG》',
		},
		characterSort:{
			Beginner:{
		//		界限突破:[],
				hololive:['re_TokinoSora','re_RobokoSan','re_ShirakamiFubuki','re_HoshimatiSuisei','re_AkiRosenthal','re_SakuraMiko','re_NatsuiroMatsuri','re_UsadaPekora','re_AkaiHaato','re_UruhaRushia'],
			}
		},
		   skill:{
			//re老爱
			re_ailian:{
				audio:'ailian',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				enable:'phaseUse',
				selectCard:[1,Infinity],
				position:'h',
				filterCard:true,
				filterTarget:function(event,player,target){
					return target!=player&&!player.storage.re_ailian.contains(target);
				},
				check:function(card){
					if(ui.selected.cards.length>1) return 0;
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(player.hp==player.maxHp||player.storage.re_ailian_clear>1||player.countCards('h')<=1){
						if(ui.selected.cards.length){
							return -1;
						}
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(!players[i].isTurnedOver()&&
								!players[i].hasJudge('lebu')&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards('h')>player.hp) return 10-get.value(card);
						if(player.countCards('h')>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				discard:false,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content: function(){
					'step 0'
					event.num = player.storage.re_ailian_clear;
					targets[0].gain(cards,player,'giveAuto');
					'step 1'
					player.storage.re_ailian.add(targets[0]);
					player.storage.re_ailian_clear+=cards.length;
					'step 2'
					if(player.storage.re_ailian_clear>=2&&event.num<2){
						var list=get.inpile('basic',function(name){
							return name!='du'&&name!='shan';
						});
						for(var i=0;i<list.length;i++){
							list[i]=['基本','',list[i]];
						}
						event.videoId = lib.status.videoId++;
						game.broadcastAll(function(id, list){
							var dialog = ui.create.dialog('『爱链』选择使用一张基本牌',[list,'vcard']);
							dialog.videoId = id;
						}, event.videoId, list);
					}else{
						event.finish();
					}
					'step 3'
					player.chooseButton().set('dialog',event.videoId).set('ai',function(button){
						var player=_status.event.player;
						var name=button.link[2];
						switch(name){
							case 'tao':
								if(player.hp<player.maxHp) return 1.7+Math.random();
								return 0;
							case 'sha':
								if(player.hasUseTarget('sha')) return 1.2+Math.random();
								return 0;
							case 'jiu':
								if(player.getCardUsable('sha')==0||!player.hasSha()) return 0;
								return 1.2+Math.random();
							case 'qi':
								if(player.hp<player.maxHp) return 1.1+Math.random();
								return 0.9+Math.random();
							default: return 0;
						}
					});
					'step 4'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.chooseUseTarget({name:result.buttons[0].link[2]},false);
					}
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.re_ailian_clear<2&&player.countCards('h')>1){
							return 10;
						}
						return 1;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.storage.rende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									var players=game.filterPlayer();
									for(var i=0;i<players.length;i++){
										if(players[i]!=player&&get.attitude(player,players[i])>0){
											return 0;
										}
									}
								}
							}
						}
					},
					threaten:0.8,
				},
				group:['re_ailian_clear'],
				subSkill:{
					clear:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=0;
						},
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.storage.re_ailian.length=0;
							player.storage.re_ailian_clear=0;
						}
					}
				},
			},
			//re老月
			re_jiajiupaidui:{
				audio:'jiajiupaidui',
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player){
					return event.filterCard({name:'jiu',isCard:true},player,event);
				},
				filterTarget:function(card,player,target){
					return target.countCards('he');
				},
				content:function(){
					"step 0"
					var att = get.sgnAttitude(target,player)
					event.onlyOne=target.chooseToDiscard('he','弃置一张牌(若其中有♠或点数9，则视为'+get.translation(player)+'使用了一张酒)',true);
					event.onlyOne.set('ai',function(card){
						if(att>1)	return (get.suit(card)=='spade'||get.number(card)==9);
					});
					event.onlyOne.set('att',att);
					"step 1"
					event.discardCards=[];
					if(event.onlyOne!=undefined){
						event.discardCards.addArray(event.onlyOne.result.cards);
					}
					"step 2"
					target.lose(event.onlyOne.result.cards,ui.ordering);
					target.$throw(event.onlyOne.result.cards);
					game.log(target,'弃置了',event.onlyOne.result.cards)
					game.delayx();
					//game.cardsDiscard(event.discardCards);
					event.isJiu=false;
					event.discardCards.forEach(discard => {
						if(get.suit(discard)=='spade'||get.number(discard)==9)
							event.isJiu=true;
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
					"step 3"
					player.getStat().card.jiu--;
				},
				ai:{order:10,result:{target:-1}},
			},
			//re小明
			duanli: {
				audio:'shiyilijia',
				group: ['duanli_draw'],
				enable: 'phaseUse',
				usable: 1,
				init: function(player) {
					if (player.storage.duanli == undefined) {
						player.storage.duanli = 0;
					}
				},
				filter: function(event, player) {
					return player.countCards('h');
				},
				content:function() {
					'step 0'
					player.storage.duanli = player.countCards('h');
					'step 1'
					var cards=player.getCards('h');
					player.discard(cards);
				},
				ai:{order:4,result:{player:1}},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.name(card)=='tao'){
							var damage = (player.maxHp-player.hp)*2;
							return num+damage;
						}
					},
				},
				subSkill: {
					draw: {
						forced: true,
						trigger: {
							player: 'phaseEnd'
						},
						filter: function(event, player) {
							return player.storage.duanli;
						},
						content: function() {
							'step 0'
							player.draw(player.storage.duanli);
							'step 1'
							player.storage.duanli = 0;
						}
					}
				}
			},
			qingmi: {
				audio:'seqinghuashen',
				popup: false,
				trigger: {
					global:'useCardAfter'
				},
				direct:true,
				filter:function(event,player){
					return event.card.name=='tao'
						&&event.player!=player
						&&get.itemtype(event.cards)=='cards'
						&&get.position(event.cards[0],true)=='o';
				},
				content:function() {
					'step 0'
					trigger.player.chooseBool('是否让'+get.translation(player)+'摸一张牌').set('choice',get.attitude(trigger.player,player)>0);
					'step 1'
					if(result.bool){
						player.logSkill('qingmi');
						player.draw();
					}
				}
			},
			//re小白
			lingsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					player.draw(2);
					player.chooseToDiscard(2,'he',true).set('ai',function(card){
						if(get.type(card)=='basic'&&player.countCards('h',{type:'basic'})){
							return 12-get.value(card)+Math.random();
						}else if(get.type(card)!='basic'&&(player.countCards('he')-player.countCards('h',{type:'basic'})>=2)&&player.hp<player.maxHp){
							return 6+Math.random();
						}
						return Math.random();
					});
				},
				ai:{
					order:9,
					result:{
						player:1,
					},
				},
				group:'lingsi_discard',
				subSkill:{
					discard:{
						trigger:{player:['loseAfter','cardsDiscardAfter']},
						filter:function(event,player){
							if(!event.cards||event.cards.length<2)	return false;
							console.log(event.cards);
							if(event.name=='lose'&&event.position!=ui.discardPile) return false;
							var num1=0,num2=0;
							event.cards.forEach(function(card){
								if(get.type(card)=='basic'){
									num1++;
								}else{
									num2++;
								}
							});
							var prompt2 = '可以';
							if(num1>=2){
								prompt2 += '视为打出一张杀';
								if(num2>=2){
									prompt2 += ',且令一名角色回复一点体力';
								}
							}else if(num2>=2){
								prompt2 += '令一名角色回复一点体力'
							}
							lib.skill.lingsi_discard.prompt2 = prompt2;
							return Math.max(num1,num2)>=2;
						},
						prompt2:'',
						priority:22,
						content:function(){
							'step 0'
							var num1=0,num2=0;
							trigger.cards.forEach(function(card){
								if(get.type(card)=='basic'){
									num1++;
								}else{
									num2++;
								}
							});
							if(num1>=2){
								player.chooseUseTarget({name:'sha'},'可以视为打出一张杀',false).set('ai',function(target){
									var player=_status.event.player;
									return get.effect(target,{name:'sha'},player,player);
								});
							}
							if(num2>=2){
								player.chooseTarget('令一名角色回复一点体力',function(card,player,target){
									return target.hp<target.maxHp;
								}).ai=function(target){
									var att=get.attitude(_status.event.player,target);
									return att;
								};
								event.goto(1);
							}else{
								event.finish()
							}
							'step 1'
							if(result.targets&&result.targets.length){
								result.targets[0].recover();
							}
						},
					}
				},
			},
			//re狐叔
			re_dianyin:{
				trigger:{player:'damageEnd'},
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					var next=player.chooseTarget('令一名角色摸两张牌');
					next.set('prompt2','（若其手牌数少于你或为全场最少，改为摸三张牌）');
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						return att;
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						if(target.countCards('h')<player.countCards('h')||target.isMinHandcard()){
							target.draw(3);
						}
						else{
							target.draw(2);
						}
					}
					'step 3'
					if(--event.num>0){
						player.chooseBool(get.prompt2('dianyin'));
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool){
						player.logSkill('dianyin');
						event.goto(1);
					}
				},
			},
			//reYuNi
			re_shengcai:{
				trigger:{player:'useCardAfter'},
				priority:123,
				filter:function(event,player){
					console.log('OK');
					var repeat = 0;
					var another =0;
					game.hasPlayer(function(cur){
						cur.getHistory('useCard',function(evt){
							if(get.color(evt.card,cur)==get.color(event.card,player)){
								repeat ++;
							}else{
								another ++;
							};
						});
					});
					return repeat==1&&another;
				},
				content:function(){
					var stats = 0;
					game.hasPlayer(function(cur){
						var history = cur.getHistory('useCard',function(evt){
							if(get.color(evt.card,cur)==get.color(trigger.card,player)){

							}else{
								stats ++;
							};
						});
					});
					player.draw(stats);
				},
			},
			//reMari
			liansheng:{
				trigger:{player:'changeHp'},
				forced:true,
				silent:true,
				firstDo:true,
				content:function(){
					if(player.hp==player.maxHp&&player.sex=='female'){
						player.sex = 'male';
						player.markSkill('liansheng');
						game.log(player,'的性别变更为','#g'+get.translation(player.sex));
						if(_status.currentPhase.sex=='female')	player.draw();
					}
					if(player.hp<player.maxHp&&player.sex=='male'){
						player.sex = 'female';
						player.markSkill('liansheng');
						game.log(player,'的性别变更为','#g'+get.translation(player.sex));
						if(_status.currentPhase.sex=='female')	player.draw();
					}
				},
				mark:true,
				intro:{
					content:function(storage,player){
						return '当前性别：'+get.translation(player.sex);
					},
				},
			},
			ruantang:{
				trigger:{player:'phaseJudgeBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check = player.countCards('h')>=2&&player.hp<player.maxHp;
					player.chooseTarget(get.prompt('ruantang'),'令至多一名异性角色与自己各回复一点体力（选择自己则表示仅为自己回复体力）',function(card,player,target){
						return target==player||(target.sex!=player.sex&&target.isDamaged());
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						var att=get.attitude(_status.event.player,target);
						return att;
					});
					"step 1"
					if(result.bool){
						event.target = result.targets[0];
						var target = result.targets[0];
						if(target!=player){
							player.logSkill('ruantang',target);
							if(target.hp<target.maxHp)	event.recover1 = 1;
								target.recover();
						}else{
							player.logSkill('ruantang');
						}
						if(player.hp<player.maxHp)	event.recover2 = 1;
							player.recover();
					}else{
						event.finish();
					}
					'step 2'
					if(event.recover1&&event.target.hp==event.target.maxHp)	event.target.draw();
					if(event.recover2&&player.hp==player.maxHp)	player.draw();
					"step 3"
					trigger.cancel();
					player.skip('phaseDraw');
				},
			},
			//reOmesis
			yaozhan:{
				trigger:{player:['phaseDrawBefore','phaseUseBefore']},
				direct:true,
				content:function(){
					"step 0"
					var check = player.countCards('h')>2;
					if(trigger.name=='phaseUse'&&player.getHandcardLimit()>2)	check = player.countCards('h')<player.getHandcardLimit();
					player.chooseTarget('###是否发动『邀战』？###跳过'+get.translation(trigger.name)+'，视为对一名其他角色使用一张【决斗】',function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'juedou'},target);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'juedou'},_status.event.player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('yaozhan',result.targets);
						player.useCard({name:'juedou'},result.targets[0]);
						trigger.cancel();
					}
				}
			},
			chongxin:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mark:true,
				intro:{
					name:'崇新',
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
				trigger:{global:'judge'},
				filter:function(event,player){
					var suit0 = get.suit(event.player.judging[0]);
					return player.countCards('he',{suit:suit0})>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('chongxin'),'he',function(card){
						var judging=_status.event.judging;
						if(get.suit(card)!=get.suit(judging)) return false;
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					'step 1'
					if(result.bool){
						player.respond(result.cards,'highlight','noOrdering');
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = trigger.player.judging[0];
						player.gain(event.card,'gain2');
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}else{
						event.finish();
					}
					'step 3'
					player.chooseBool('是否将'+get.translation(event.card)+'置于武将牌上')
					'step 4'
					if(result.bool){
						var card = event.card;
						player.lose(card,ui.special,'toStorage');
						player.$give(card,player,false);
						player.markAuto('chongxin',[card]);
						game.log(player,'将',card,'置于武将牌上');
					}
					game.delay(1);
				},
				global:'chongxin2',
				ai:{
					rejudge:true,
					tag:{
						rejudge:0.2,
					}
				},
			},
			chongxin2:{
				mod:{
					cardEnabled:function(card,player,now){
						if(_status.event.type=='wuxie'&&_status.event.getParent().name == '_wuxie'&&_status.event.getParent().card.name == 'juedou'&&player!=_status.event.getParent().player){
							if(_status.event.getParent().player.hasSkill('chongxin')&&_status.event.getParent().player.storage.chongxin&&_status.event.getParent().player.storage.chongxin.length){
								var cards = _status.event.getParent().splayer.storage.chongxin;
								for(var i=0;i<cards.length;i++)
								if(get.suit(cards[i])==get.suit(card))	return false;
							}
						}
					},
					cardRespondable:function(card,player,now){
						if(_status.event.name == 'chooseToRespond'&&_status.event.getParent().name == 'juedou'&&player!=_status.event.splayer){
							if(_status.event.splayer.hasSkill('chongxin')&&_status.event.splayer.storage.chongxin&&_status.event.splayer.storage.chongxin.length){
								var cards = _status.event.splayer.storage.chongxin;
								for(var i=0;i<cards.length;i++)
								if(get.suit(cards[i])==get.suit(card))	return false;
							}
						}
					},
				},
			},
			//re狗妈
			re_DDzhanshou:{
				audio:'DDzhanshou',
				trigger:{global:'phaseEnd'},
				priority:77,
				filter:function(event,player){
					var history = event.player.getHistory('useCard');
					var DD = false;
					history.forEach(function(his){
						if(!(his.targets.contains(event.player)||his.targets.contains(player))&&get.color(his.card)=='red')		DD = true;
					});
					return DD;
				},
				content:function(){
					'step 0'
					if(trigger.player==player){
						player.draw();
						event.finish();
					}else{
						game.broadcastAll(function(player,target){
							player.chooseToUse({
								preTarget:target,
								filterCard:{name:'sha'},
								filterTarget:function(card,player,target){
									return target==_status.event.preTarget;
								},
								addCount:false,
								nodistance:true,
								prompt:'DD斩首！(若不出【杀】则摸一张牌）',
							});
						}, player, trigger.player);
					}
					'step 1'
					if(result.bool){
						event.finish();
					}else{
						player.draw();
					}

				},
			},
			//re空
			re_taiyangzhiyin:{
				audio:'taiyangzhiyin',
				trigger:{ player:'useCard2'},
				filter:function(event,player){
					return get.number(event.card)>10&&(player.storage.onlink==null||player.storage.onlink.indexOf(event.card.cardid)==-1);
				},
				priority: 1,
				forced:false,
				content:function (){
					var info=get.info(trigger.card);
					var players=game.filterPlayer();
					if(player.storage.onlink==null){
						player.storage.onlink=[];
					}//处理正处于连锁中的卡牌
					'step 0'
					var list=[['无法响应'],['额外目标'],['摸一张牌']];
					if(!game.hasPlayer(function(current) {
						return lib.filter.targetEnabled2(trigger.card, player, current)
							&& player.inRange(current)
							&& !trigger.targets.contains(current)
							&& (get.type(trigger.card)!='equip'&&get.type(trigger.card)!='delay')
					})) {
						list.splice(1,1);
					}
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(id, choicelist,Dvalue){
						var dialog=ui.create.dialog('选择'+Dvalue+'项');
						choicelist.forEach(element=>{
							dialog.add([element,'vcard']);
						})
						dialog.videoId = id;
					}, event.videoId, list, 1);
					player.storage.onlink.push(trigger.card.cardid);
					'step 1'
					player.chooseButton(1).set('dialog',event.videoId).set('prompt',get.prompt('re_taiyangzhiyin'));
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
				group:'re_taiyangzhiyin_clear',
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
			//re凛
			re_mozhaotuji:{
				group:['re_mozhaotuji_DrawOrStop','re_mozhaotuji_Ready','re_mozhaotuji_Judge','re_mozhaotuji_PhaseDraw','re_mozhaotuji_Discard','re_mozhaotuji_End'],
				/**转化阶段 */
				contentx:function(trigger,player){
					'step 0'
					trigger.cancel();
					var stat=player.getStat();
					stat.card={};
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
					'step 1'
					player.addTempSkill('re_mozhaotujiStop');
					player.phaseUse();
					'step 2'
					var stat=player.getStat();
					stat.card={};
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
				},
				subSkill:{
					DrawOrStop:{
						trigger:{global:'phaseUseAfter'},
						filter:function(event,player){
							if((player.getHistory('useCard').length)>=2)
								return true;
							else if((player.getHistory('useCard').length)==0)
								return player==_status.currentPhase;
							else
								return false;
						},
						priority: 14,
						forced:true,
						content:function(){
							'step 0'
							if((player.getHistory('useCard').length)>=2)
								player.draw(1);
						},
					},
					Ready:{
						trigger:{
							player:'phaseZhunbeiBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('re_mozhaotujiStop');
						},
						prompt:function(){
							return '把准备阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.re_mozhaotuji.contentx(trigger,player);
						},
					},
					Judge:{
						trigger:{
							player:'phaseJudgeBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('re_mozhaotujiStop');
						},
						prompt:function(){
							return '把判定阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.re_mozhaotuji.contentx(trigger,player);
						},
					},
					PhaseDraw:{
						trigger:{
							player:'phaseDrawBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('re_mozhaotujiStop');
						},
						prompt:function(){
							return '把摸牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.re_mozhaotuji.contentx(trigger,player);
						},
					},
					Discard:{
						trigger:{
							player:'phaseDiscardBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('re_mozhaotujiStop');
						},
						prompt:function(){
							return '把弃牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.re_mozhaotuji.contentx(trigger,player);
						},
					},
					End:{
						trigger:{
							player:'phaseJieshuBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('re_mozhaotujiStop');
						},
						prompt:function(){
							return '把结束阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.re_mozhaotuji.contentx(trigger,player);
						},
					},
				}
			},
			re_mozhaotujiStop:{

			},
			//re兔头
			re_bingdielei:{
				group:'re_bingdielei_lose',
				subSkill:{
					lose:{
						trigger:{player:'loseAfter'},
						priority:99,
						silent:true,
						popup: false,
						forced:true,
						filter:function(event,player){
							return event.cards.length;
						},
						direct:true,
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							player.markSkill(event.name);
							player.addTempSkill('re_bingdielei_anotherPhase');
						},
					},
					anotherPhase:{
						audio:'bingdielei',
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						round:1,
						intro: {
							content:'当前回合结束后若本轮没有获得过，可以获得一个额外回合',
							name:'并蒂恶蕾',
						},
						onremove:true,
						filter:function(event,player){
							return player.getHistory('lose').length;
						},
						content:function(){
							player.markSkill(event.name);
							game.delayx();
							player.logSkill(event.name);
							player.insertPhase();
						},
					},
				},
			},
			//re德龙
			re_zhenyin: {
				audio:'zhenyin',
				trigger: {
					player: 'useCardToPlayered',
				},
				filter: function(event, player) {
					var num;
					event.targets.forEach(function(tar){
						num+=tar.countCards('ej');
					})
					return event.name == 'useCardToPlayered' 
						&& event.targets.length
						&& num
						&& get.color(event.card)=='black';
					
				},
				content: function() {
					'step 1'
					game.broadcastAll(function(player,targets){
						player.chooseTarget('选择目标',function(card,player,target){
							return targets.contains(target);
						}).set('targets',targets);
					},player,trigger.targets)
					'step 0'
					event.A = result.targets[0];
					event.B = event.A.next;
					if (!event.A.countCards('hej')) event.finish();
					player.choosePlayerCard('hej', event.A);
					'step 1'
					if (result.bool) {
						var card = result.links[0];
						var dam = false;
						if(get.position(card)=='e'){
							var c = event.B.getEquip(get.subtype(card));
							if (c) {
								dam = true;
								game.log(c, '掉落了');
							}
							re = event.B.equip(card);
						}
						else {
							var cname = card.viewAs ? card.viewAs : get.name(card);
							event.B.getCards('j').forEach(function(c) {
								if (get.name(c) == cname) {
									game.log(c, '掉落了');
									game.cardsDiscard(c);
									dam = true;
								}
							})
							event.B.addJudge({name: cname}, [card]);
						}
						event.A.$give(card, event.B)
						if (dam) event.B.damage('nocard');
						game.delay();
					}
				}
			},
			//re海牛
			re_shuangren: {
				audio:'kuangbaoshuangren',
				trigger:{player:'shaBegin'},
				priority:98,
				forced:true,
				content:function(){},
				group: ['re_shuangren_red', 're_shuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange:function(card,player){
								if(_status.currentPhase==player && card.name=='sha' && get.color(card) == 'red') return true;
							},
							cardUsable:function (card,player,num){
								if(card.name=='sha' && get.color(card) == 'red') return Infinity;
							},
						},
					},
					black: {
						trigger:{player:'useCard2'},
						filter:function(event,player){
							if(event.card.name!='sha'||get.color(event.card) == 'red') return false;
							return game.hasPlayer(function(current){
								return !event.targets.contains(current)&&player.canUse(event.card,current);
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('re_shuangren'),'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
								return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target);
							}).set('sourcex',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!_status.connectMode) game.delayx();
								event.target=result.targets[0];
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('re_shuangren',event.target);
							trigger.targets.push(event.target);
						},
					},
				}
			},
			re_jitui: {
				audio:'guangsuxiabo',
				trigger: {
					player: ['loseAfter', 'damageAfter'],
				},
				filter: function(event, player) {
					if(event.name=='damage')	return true;
					var unB = event.cards.filter(function(card){
						return get.type(card)!='basic';
					})
					return player!=_status.currentPhase&&event.name=='lose'&&unB.length;
				},
				priority:98,
				content: function() {
					player.draw();
				},
			},
			//reAlice
			re_dianmingguzhen:{
				audio:'dianmingguzhen',
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					if(!game.hasPlayer(function(current){
						return current.countCards('e')>0;
					})) return false;
					return true
				},
				content:function(){
					'step 0'
					player.loseHp(1);
					'step 1'
					//console.log(lib.skill.re_dianmingguzhen.canMoveCard(player));
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							return target.countCards('e')>0;
						}
					});
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=player&&current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&current!=player&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张装备牌');
					next.set('forced',true);
					'step 2'
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					game.delay();
					'step 4'
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
						event.finish();
					}
					'step 5'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						event.targets[1].equip(link);
						event.targets[0].$give(link,event.targets[1]);
						event.equiptype=get.subtype(link);
						game.delay();
						event.result={bool:true};
					}
					'step 6'
					if(event.targets[0]!=player){
						event.finish();
					}
					else{
						player.chooseUseTarget({name:'sha',nature:'thunder'},'是否视为使用一张雷【杀】？',false);
					}
				},
				canMoveCard:function(player,withatt){
					return game.hasPlayer(function(current){
						if(player==current) return false;
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(player==current2) return false;
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att2!=get.sgn(get.value(es[i],current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.isEmpty(get.subtype(es[i]));
								})){
									return true;
								}
							}
						}
					});
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if(player.hp!=1)	return 1;
							else return -2;
						},
					/*	target:function(player,target){
							if(ui.selected.targets.length==0){
								if(target==player&&player.hp!=1)	return Math.random();	
								return -2;
							}
							else{
								return 2+Math.random();
							}
						}*/
					},
				},
			},
			//re修女
			shenyou:{
				marktext:'神',
				intro:{
					name:"神佑",
					content:'<font color=#f66>你受到来自基本牌的伤害+1；其它的伤害-1。</font>',
				},
				mark:true,
				trigger:{player:'damageBegin2'},
				forced: true,
				priority:1,
			/*      filter:function(event,player){
					if((event.getParent(2).skill&&event.getParent(2).skill.length)) return true;
					if(!event.getParent(1).card)		return false
					console.log(event.getParent(1));
					console.log(get.type(event.getParent(1).card,'trick'));
					return get.type(event.getParent(1).card,'trick')=='basic'||get.type(event.getParent(1).card,'trick')=='trick';
				},*/
				content:function(){
					if(get.type(trigger.getParent(1).card,'trick')=='basic'){
						trigger.num++;
					}
					else{
						trigger.num--;
					}
				},
				ai:{
					notrick:1,
				},
			},
			shenfa:{
				trigger:{player:'loseAfter'},
				priority:1,
				filter:function(event,player){
					if(!game.hasPlayer(function(cur){
						return !cur.hasSkill('shenyou');
					}))	return false;
					return event.cards.length&&event.hs.length;
				},
				direct:true,
				content:function(){
					'step 0'
					event.num=trigger.cards.length;
					'step 1'
					var next=player.chooseTarget('令一名其他角色获得『神佑』直到回合结束');
					next.set('filterTarget',function(card,player,target){
						return !target.hasSkill('shenyou');
					});
					next.set('ai',function(target){
						var player = _status.event.player;
						var evt = _status.event.getTrigger().getParent();
						if((player.hasSha()&&player.getCardUsable('sha')&&(player.countCards('h',function(card){
							return get.tag(card,'damage')&&get.type('card')=='trick';
						})<1)||(evt.name=='useCard'&&evt.card.name=='sha')
						)&&player.inRange(target))	return get.damageEffect(target,player,player);
						return get.attitude(player,target);
					})
					'step 2'
					if(result.bool){
						player.logSkill('shenfa',result.targets[0])
						result.targets[0].addTempSkill('shenyou');
						event.num--;
						if(event.num){
							event.goto(1);
						}else{
							event.finish();
						}
					}else{
						event.finish();
					}
				},
			},
			//莉泽
			yubing:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				trigger: {player: 'useCardAfter'},
				priority:14,
				filter: function(event, player) {
					return player.getHandcardLimit()&&(get.type(event.card)=='basic'||get.type(event.card)=='trick')
						&&!(event.result.bool == false || event.result.wuxied);
				},
				content:function(){
					player.storage.yubing++;
					player.markSkill('yubing');
					player.draw(2);
				},
				marktext:"冰",
				mark:true,
				intro:{
					content:'手牌上限-#',
				},
				mod:{
					maxHandcard:function (player,num){
						return num-player.storage.yubing;
					},
				},
				group:'yubing_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						forced: true,
						silent: true,
						priority:42,
						content:function(){
							player.storage.yubing = 0;
						}
					},
				},
			},
			//安啾
			xiaoqiao:{
				trigger:{player:'phaseDiscardBegin'},
				filter:function(event,player){
					return player.countCards('h');
				},
				direct:true,
				lastDo:true,
				content:function(){
					'step 0'
					player.chooseCardButton('###是否发动『小巧』？###展示任意张类型不同的手牌',player.getCards('h'),[1,3]).set('filterButton',function(button){
						var type = get.type(button.link,'trick');
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(type==get.type(ui.selected.buttons[i].link,'trick')) return false;
						}
						return true;
					});
					'step 1'
					if(result.bool){
						player.logSkill('xiaoqiao');
						var cards = result.links;
						player.showCards(cards,'『小巧』展示手牌');
						player.storage.xiaoqiao.addArray(cards);
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(player.storage.xiaoqiao&&player.storage.xiaoqiao.contains(card)){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&player.storage.xiaoqiao&&player.storage.xiaoqiao.contains(card)){
							return false;
						}
					},
				},
				group:'xiaoqiao_init',
				subSkill:{
					init:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.xiaoqiao = [];
						},
					}
				},
			},
			liancheng:{
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					if(player.storage.liancheng&&player.storage.liancheng==2)	return false;
					return player.countCards('h');
				},
				content:function(){
					'step 0'
					player.chooseCardButton('###『链成』###重铸任意张类型不同的手牌',player.getCards('h'),[1,3]).set('filterButton',function(button){
						var type = get.type(button.link,'trick');
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(type==get.type(ui.selected.buttons[i].link,'trick')) return false;
						}
						return true;
					});
					'step 1'
					if(result.bool){
						player.storage.liancheng++;
						var cards = result.links;
						player.lose(cards, ui.discardPile).set('visible', true);
						player.$throw(cards,1000);
						game.log(player,'将',cards,'置入了弃牌堆');
						player.draw(cards.length);
						if(player==_status.currentPhase||cards.filter(function(card){
							return get.type(card)=='equip';
						}).length==0)	event.finish();
					}else{
						event.finish();
					}
					'step 2'
					event.diff = player.countCards('h') - _status.currentPhase.countCards('h');
					if(event.diff==0){
						event.finish();
					}
					'step 3'
					var check = (event.diff>0)?(get.attitude(player,_status.currentPhase)>0):(get.attitude(player,_status.currentPhase)<0);
					var next = player.chooseBool('###『链成』###是否令当前回合角色调整手牌与你相同？');
					next.set('ai',function(){
						if(!_status.event.check) return 0;
						return 1;
					});
					next.set('check',check)
					'step 4'
					if(result.bool){
						if(event.diff>0){
							_status.currentPhase.gain(get.cards(event.diff),'draw');
						}else if(event.diff<0){
							_status.currentPhase.chooseToDiscard(-event.diff,true,'h');
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(player.storage.xiaoqiao&&player.storage.xiaoqiao.contains(card)){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&player.storage.xiaoqiao&&player.storage.xiaoqiao.contains(card)){
							return false;
						}
					},
				},
				group:'liancheng_init',
				subSkill:{
					init:{
						trigger:{global:'roundStart'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.liancheng = 0;
						},
					}
				},
			},

			//re下地
			re_yinliu: {
				enable:'phaseUse',
				filter:function(event,player){
					return	(player.countCards('he') >= 1
						&&!player.hasSkill('re_yinliu_used'));
				},
				check:function(card){
					return 7-get.value(card);
				},
				filterCard:true,
				position:'he',
				selectCard:[1,3],
				content:function(){
					event.cards = cards;
					player.addTempSkill('re_yinliu_used','phaseUseEnd');
					game.delayx();
					while (true){
						var card=get.cards()[0];
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
					order:6,
					result:{
						player:1,
					},
					threaten:0.6,
				},
				subSkill: {
					used:{},
				},
			},
			//re萝卜
			re_zhanxie:{
				priority:15,
				firstDo:true,
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha'){
							return num+2;
						} 
					},
					cardEnabled:function(card,player){
						if(card.name=='sha'&&(player.getStat().card.sha>2)) 
							return false
					}
				},
				group:['re_zhanxie_draw'],
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
							if(player.getStat().card.sha==3){
								player.draw(2);
							}
						},
					}
				}
			},
			re_chongdian:{
				forced:true,
				//charlotte:true,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='thunder';
				},
				content:function(){
					player.recover(trigger.num);
					trigger.cancel();
				},
				group:'re_chongdian_leisha',
				subSkill:{
					leisha:{
						enable:['chooseToUse','chooseToRespond'],
						filterCard:function(card){
							return get.type(card)=='equip';
						},
						position:'he',
						viewAs:{name:'sha',nature:'thunder'},
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.8
								}
							},
							respondSha:true,
							order:4,
							useful:-1,
						},
					},
				},
				ai:{
					nothunder:true
				},
			},
			//re狐狸
			re_yuanlv:{
				trigger:{player:['damageAfter','useCardAfter']},
				priority:2,
				usable:1,
				filter:function(event,player){
					if(event.name=='damage'||(event.name=='useCard'&&get.type(event.card,'trick')=='trick')){
						return true;
					}
					else
						return false;
				},
				content:function(){
					'step 0'
					player.draw(3);
					player.chooseCard(2,'he','选择放置到牌堆顶部的牌',true);
					'step 1'
					if(result.bool==true&&result.cards!=null){
						event.cards=result.cards
					}
					if(event.cards.length>0){
						player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
							var value=get.value(button.link);
							if(_status.event.reverse) return value;
							return -value;
						}).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
					}
					"step 2"
					if(result.bool&&result.links&&result.links.length) event.linkcards=result.links.slice(0);
					game.delay();
					'step 3'
					var cards=event.linkcards;
					player.lose(cards,ui.special);
					game.delay();
					'step 4'
					var cards=event.linkcards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				}
			},
			re_jinyuan:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					'step 0'
					target.draw();
					'step 1'
					event.card = result[0];
					if(target.hasUseTarget(event.card)){
						target.chooseUseTarget(event.card,'可选择一个目标直接使用该牌');
					}
				},
				ai:{
					order:6,
					result:{
						target:1,
					},
					threaten:0.6,
				},
			},
			//re星姐
			cansha:{
				trigger: {player: 'useCardAfter'},
				priority:3,
				filter: function(event, player) {
					return event.cards.length&&event.targets.length&&(get.name(event.card)=='sha'||get.name(event.card)=='guohe')
						&&!(event.result.bool == false || event.result.wuxied);
				},
				content:function(){
					if(get.name(trigger.card)=='sha'){
						player.chooseUseTarget({name:'guohe',isCard:false},false);
					}else if(get.name(trigger.card)=='guohe'){
						player.chooseUseTarget({name:'sha',isCard:false},false);
					}
				},
			},
			//reAKI
			re_huichu: {
				trigger: {
					global: 'phaseBegin',
				},
				round:1,
				filter: function(event, player) {
					return player.countCards('h');
				},
				content: function() {
					'step 0'
					player.showHandcards();
					event.chk = player.countCards('h') == player.countCards('h', {color: 'red'});
					'step 1'
					if (event.chk) {
						trigger.player.recover();
					}
					'step 2'
					if (!event.chk) {
						player.chooseCard("重铸任意张手牌", 'h', [1, Infinity]);
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
			//reMIKO
			huangyou:{
				enable:'phaseUse',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				selectCard:2,
				position:'he',
				filter:function(event,player){
					return player.countCards('he',{color:'red'})>1&&!player.hasSkill('huangyou_used');
				},
				content:function(){
					'step 0'
					if(player.hp==player.maxHp){
						player.draw(3);
						event.goto(4);
					}
					'step 1'
					var list=['摸三张牌','回复体力'];
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(id,list){
						var dialog = ui.create.dialog('选择一项',[list,'vcard']);
						dialog.videoId = id;
					}, event.videoId, list);
					'step 2'
					player.chooseButton(true).set('dialog',event.videoId);
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.buttons[0].link[2]=='摸三张牌'){
						player.draw(3);
					}
					if(result.buttons[0].link[2]=='回复体力'){
						player.recover();
					}
					'step 4'
					player.judge(function(card){
						if(get.suit(card,'player')=='heart') return 4;
						else{
							player.addTempSkill('huangyou_used');
							return -1;
						}
					});
				},
				ai:{
					order:8,
					result:{
						player:1,
					},
				},
				subSkill:{
					used:{},
				},
			},
			qidao:{
				trigger:{
					global:"judge",
				},
				filter:function (event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				priority:1,
				content:function (){
					"step 0"
					player.chooseToDiscard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('qidao'),'he',function(card){
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return (-result)-get.value(card)+Math.random();
						}
						else{
							return result-get.value(card);
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						trigger.player.judge();
					}
					else{
						event.finish();
					}
					'step 2'
	//				if(result.bool){
					console.log(result)
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.card;
						trigger.orderingCards.add(result.card);
						game.log(trigger.player,'重新判定后的判定牌为',result.card);
						game.delay(0.5);
	//				}
				},
			},
			//re夏色祭
			re_huxi1:{
				trigger:{player:'gainEnd'},
				filter:function(event,player){
					return game.hasPlayer(function(cur){
						if(player.storage.huxiGroup==null) return true;
						return !player.storage.huxiGroup.contains(cur)&&cur!=player;
					})&&event.getParent().skill!='re_huxi1'&&event.getParent(2).skill!='re_huxi1'&&event.getParent(3).skill!='re_huxi1';
				},
				content:function(){
					"step 0"
					var next = player.chooseCardTarget('请选择呼吸的对象与交换的牌',true).set('type','compare');
					next.set('filterTarget',function(card,player,target){
							if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(target))	return false;
							return target!=player&&player.countCards('h')&&target.countCards('h');
						},)
					"step 1"
					if(result.bool){
						event.target=result.targets[0];
						game.log(player,'想要呼吸',event.target);
						event.card1=result.cards[0];
						event.target.chooseCard('请选择交换的牌',true).set('type','compare');
					}else{
						event.finish();
					}
					"step 2"
					event.card2=result.cards[0];
					if(!event.resultOL&&event.ol){
						game.pause();
					}
					"step 3"
					player.lose(event.card1,ui.ordering);
					event.target.lose(event.card2,ui.ordering);
					"step 4"
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
					"step 5"
					event.result={
						getC:event.card2,
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
					"step 6"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
					player.gain(event.card2,'visible');
					player.$gain2(event.card2);
					game.delay(1);
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
					"step 7"
					if(get.color(event.result.getC)=='red'){
						player.draw(1);
						if(!player.hasSkill('re_huxi2')){
							player.addTempSkill('re_huxi2');
						}
					}
					if(player.storage.huxiGroup==null) player.storage.huxiGroup=[];
					player.storage.huxiGroup.add(target);
				},
				group:'re_huxi1_clear',
				subSkill:{
					clear:{
						firstDo:true,
						silent:true,
						direct:true,
						trigger:{
							player:['phaseAfter']
						},
						content:function(){
							delete player.storage.huxiGroup;
						}
					}
				}
			},
			re_huxi2:{
				trigger:{
					player:'useCard'
				},
				firstDo:true,
				direct:true,
				filter:function(event,player){
					console.log(get.name(event.card));
					return get.name(event.card)=='sha';
				},
				content:function(){
					player.getStat().card.sha--;
					if(player.hasSkill('re_huxi2')){
						player.removeSkill('re_huxi2');
					}
				},
			},
			//re赤心
			chixin:{
				trigger:{global:['loseAfter','cardsDiscardAfter']},
				filter:function(event,player){
					if(event.name=='cardsDiscard'&&event.getParent().name=='orderingDiscard'&&event.getParent().relatedEvent.name=='useCard') return false;
					if(event.name=='lose'&&(event.getParent().name=='useCard'||event.position!=ui.discardPile)) return false;
					var list=event.cards.filter(function(card){
						if(player.storage.chixin&&player.storage.chixin.contains(card))	return false;
						return get.suit(card)=='heart'&&get.position(card)=='d';
					});
					return list.length>0;
				},
				direct:true,
				content:function(){
					'step 0'
					event.cards = trigger.cards.filterInD('d');
					'step 1'
					event.videoId=lib.status.videoId++;
					var dialogx=['###『赤心』：进入弃牌堆的牌###获得其中一张红色牌；或将其中任意张牌以任意顺序置于牌堆顶（先选择的在上）'];
					dialogx.push(event.cards);
					if(player.isOnline2()){
						player.send(function(dialogx,id){
							ui.create.dialog.apply(null,dialogx).videoId=id;
						},dialogx,event.videoId);
					}
					event.dialog=ui.create.dialog.apply(null,dialogx);
					event.dialog.videoId=event.videoId;
					if(player!=game.me||_status.auto){
						event.dialog.style.display='none';
					}
					var next = player.chooseButton();
					next.set('selectButton',function(){
						if(ui.selected.buttons.length==0) return 2;
						else if(get.color(ui.selected.buttons[0].link)=='red'&&ui.dialog.buttons.length==1)	return 1;
						return [1,Infinity];
					});
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						return get.value(button.link)&&ui.selected.buttons.length==1;
					});
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==ui.dialog.buttons.length||ui.dialog.buttons.length==1;
					});
					'step 2'
					if(result.bool){
						event.links=result.links;
						var controls=['取消选择','将这些牌置于牌堆顶','获得这张牌'];
						if(event.links.length!=1||get.color(event.links[0])!='red'){
							controls.splice(2,1);
						}
						var func=function(cards,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var j=0;j<cards.length;j++){
									for(var i=0;i<dialog.buttons.length;i++){
										if(dialog.buttons[i].link==cards[j]){
											dialog.buttons[i].classList.add('glow');
										}
										else{
											dialog.buttons[i].classList.add('unselectable');
										}
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.links,event.videoId);
						}
						else if(player==game.me&&!_status.auto){
							func(event.links,event.videoId);
						}
						player.chooseControl(controls).set('ai',function(event,player){
							return _status.event.index;
						}).set('index',2);
					}else{
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						event.finish();					
					}
					'step 3'
					switch(result.index){
						case 0:{
							event.goto(1);
							break;
						}
						case 1:{
							var list=event.links.slice(0);
							while(list.length){
								ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
							}
							game.log(player,'将牌放在牌堆顶')
							break;
						}
						case 2:{
							if(!player.storage.chixin)	player.storage.chixin = [];
							player.storage.chixin.addArray(event.links)
							player.gain(event.links);
							game.log(player,'获得了',event.links);
							break;
						}
					}
					'step 4'
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
				},
				group:'chixin_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						priority:23,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.chixin&&player.storage.chixin.length){
								player.storage.chixin.length = 0;
							}
						}
					}
				},
			},
			//re粽子
			juebi:{
				group:['juebi_shan','juebi_dam'],
				subSkill:{
					shan:{
						enable:['chooseToUse','chooseToRespond'],
						filterCard:function (card){
							return get.type(card)!='basic';
						},
						viewAs:{name:'shan'},
						position:'he',
						prompt:'将一张非基本牌当【闪】使用或打出',
						check:function(card){return 8-get.value(card)},
						filter:function(event,player){
							return !player.getStat().damaged;
						},
					},
					dam:{
						trigger:{player:'damageEnd'},
						priority:199,
						direct:true,
						filter:function(event,player){
							return !player.hasSkill('juebi_addDam');
						},
						content:function(){
							player.addTempSkill('juebi_addDam','phaseAfter');
						},
					},
					addDam:{
						marktext: '壁',
						mark:true,
						intro: {
							content:'可以令下一次造成的伤害+1',
							name:'绝壁狂怒',
						},
						trigger:{source:'damageBegin2'},
						priority:199,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							'step 0'
							player.chooseBool('###『绝壁』###是否令本次造成的伤害+1',function(){
								return get.attitude(player,trigger.player)<0;
							});
							'step 1'
							if(result.bool){
								player.logSkill('juebi',trigger.player);
								trigger.num++;
							}
							if(player.hasSkill('juebi_addDam'))	player.removeSkill('juebi_addDam');
						},
						onremove:true,
					}
				}
			},
			zhanhou:{
				group:['zhanhou_damage','zhanhou_recover'],
				subSkill:{
					damage:{
						trigger:{player:'phaseUseBegin'},
						priority:199,
						prompt2:'『战吼』出牌阶段开始时，你可以受到1点伤害，视为使用一张【顺手牵羊】。',
						content:function(){
							player.damage();
							player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】',{name:'shunshou'},true);
						},
					},
					recover:{
						trigger:{global:'dieAfter'},
						priority:199,
						filter:function(event,player){
							return player.hp<player.maxHp;
						},
						prompt2:'『战吼』其他角色阵亡时，你可以回复1点体力，视为使用一张【顺手牵羊】。',
						content:function(){
							player.recover();
							player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】',{name:'shunshou'},true);
						},
					}
				}
			},
			//rePEKO
			qiangyun:{
				trigger:{global:'judge'},
				filter:function(event,player){
					return player==event.player&&player.countCards('he')>0;
				},
				direct:true,
				priority:2,
				content:function(){
					'step 0'
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('qiangyun'),'he',function(card){
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					'step 1'
					if(result.bool){
						event.card = result.cards[0];
						player.addTempSkill('qiangyun2');
						player.storage.qiangyun2=[event.card];
						player.respond(event.card,'highlight');
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
		//				player.$gain2(trigger.player.judging[0]);
		//				player.gain(trigger.player.judging[0]);
						trigger.player.judging[0]=event.card;
						if(!get.owner(event.card,'judge')){
							trigger.position.appendChild(event.card);
						}
						game.log(trigger.player,'的判定牌改为',event.card);
					}else{
						event.finish();
					}
					'step 3'
					game.delay(2.5);
				},
			},
			qiangyun2:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{global:'judgeAfter'},
				filter:function(event,player){
					return player.hasUseTarget(player.storage.qiangyun2[0]);
				},
				direct:true,
				priority:2,
				content:function(){
					event.card = player.storage.qiangyun2[0];
					player.addTempSkill('qiangyun3','useCardAfter');
					player.storage.qiangyun3=[event.card];
					player.chooseUseTarget('是否使用'+get.translation(event.card),event.card,false,'noanimate');
					if(player.hasSkill('qiangyun2'))	player.removeSkill('qiangyun2');
				},
				onremove:function(player){
					delete player.storage.qiangyun2;
				}
			},
			qiangyun3:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{source:'damageEnd'},
				filter:function(event,player){
					return player.storage.qiangyun3.contains(event.cards[0]);
				},
				direct:true,
				priority:2,
				content:function(){
					player.draw();
				},
				onremove:function(player){
					delete player.storage.qiangyun3;
				},
			},
			tuquan:{
				trigger:{player:'shaMiss'},
				forced: true,
				content:function(){
					player.judge(function(card){
						if(get.suit(card)=='spade') {
							game.broadcastAll(function(player,target){
								player.discardPlayerCard('结果为♠，请弃置对方一张牌',target,'he',true);
							},player,trigger.target);
							return 1;
						}
						else if(get.suit(card)=='heart'){ 
							player.chooseToDiscard('结果为♥，请弃置一张牌','he',true);
							return -1;
						}
			//			return 0;
					});
				},
			},
			//re希桃
			re_doupeng:{
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
					"step 2"
					if(event.resultBool){
						player.draw();
					}
					else{
						event.target.draw();
					}
					"step 3"
					if(event.loop){
						event.loop=false;
						event.resultBool=!event.resultBool;
						if(event.resultBool){
							player.chooseBool('是否使对方回复一点体力').set('ai',function(){
								return _status.event.check>0;
							}).set('check',get.attitude(player,event.target));
						}
						else{
							event.target.chooseBool('是否使对方回复一点体力').set('ai',function(){
								return _status.event.check>0;
							}).set('check',get.attitude(event.target,player));
						}
					}
					else{
						event.finish();
					}
					"step 4"
					if(result.bool){
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
						target:1,
					},
				},
			},
			re_xuyan:{
				trigger:{player:'phaseJieshuBegin'},
				content:function(){
					'step 0'
					player.chooseTarget(1,'选择观察目标',function(card,player,target){
						return player!=target;
					});
					'step 1'
					if(result.bool){
						result.targets[0].addSkill('re_xuyan_mark');
					}
				},
				group:['re_xuyan_phaseStart','re_xuyan_damage'],
				subSkill:{
					mark:{
						mark:true,
						intro:{
							content:'造成伤害被列入了观察项目'
						},
					},
					phaseStart:{
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							return player.hasSkill('re_xuyan_damaged')||player.hasSkill('re_xuyan_dead')||game.filterPlayer(function(current){
								if(current.hasSkill('re_xuyan_mark')){
									return true;
								}
								else
									return false;
							}).length>0
						},
						content:function(){
							'step 0'
							game.filterPlayer(function(current){
								if(current.hasSkill('re_xuyan_mark')){
									current.removeSkill('re_xuyan_mark');
									return true;
								}
								else
									return false;
							});
							'step 1'
							if(player.hasSkill('re_xuyan_damaged')){
								player.draw(1);
								player.removeSkill('re_xuyan_damaged');
							}else{
								player.chooseTarget(true,'令一名角色与你各失去1点体力');
							}
							'step 2'
							if(result.bool){
								player.loseHp();
								result.targets[0].loseHp();
							}
						}
					},
					damage:{
						trigger:{global:'damageAfter'},
						forced:true,
						filter:function(event,player){
							if(event.source){
								return event.source.hasSkill('re_xuyan_mark');
							}
							else
								return false;
						},
						content:function(){
							player.addSkill('re_xuyan_damaged');
						}
					},
					damaged:{
						mark:true,
						marktext:'伤',
						intro:{
							content:'观察目标造成了伤害'
						},
					},
				}
			},
			//re犬山
			re_hundunliandong:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					for(var i=0;i<ui.selected.targets.length;i++){
						if(ui.selected.targets[i].group==target.group) return false;
					}
					return true;
				},
				selectTarget:function(){
					return [1,ui.selected.targets.length+1];
				},
				complexTarget:true,
				multitarget:false,
				content:function(){
					target.chooseToDiscard(true,1,'he','混沌联动：弃置一张牌');
				},
				ai:{
					order:8,
					result:{
						target:-1,
					},
				},
			},
			//reMEA
			re_luecai: {
				audio:'luecai',
				enable: 'phaseUse',
				locked: true,
				filter:function(event,player){
					return !player.hasSkill('re_luecai_used')&&!player.isMaxHandcard();
				},
				filterTarget:function(card,player,target){
					if (player==target) return false;
					return target.countCards('h') > player.countCards('h');
				},
				selectTarget:-1,
				multitarget:false,
				content: function() {
					'step 0'
					target.chooseCard('he', true);
					'step 1'
					player.gain(result.cards[0],target,'giveAuto');
					player.addTempSkill('re_luecai_used','phaseUseEnd')
				},
				ai:{
					order:4,
					result:{
						target:function (player,target){
							if(target.countCards('h')>player.countCards('h')){
								return -1;
							}
							else{
								return 0;
							}
						},
					},
				},
				subSkill:{
					used:{}
				},
			},
			re_xiaoyan: {
				audio:'xiaoyan',
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

		   },
		characterReplace:{
			MononobeAlice:['re_MononobeAlice','MononobeAlice'],
			ShizukaRin:['re_ShizukaRin','ShizukaRin'],
			MitoTsukino:['re_MitoTsukino','MitoTsukino'],
			UshimiIchigo:['re_UshimiIchigo','UshimiIchigo'],
			HiguchiKaede:['re_HiguchiKaede','HiguchiKaede'],
			TokinoSora:['re_TokinoSora','TokinoSora'],
			RobokoSan:['re_RobokoSan','RobokoSan'],
			ShirakamiFubuki:['re_ShirakamiFubuki','ShirakamiFubuki'],
			HoshimatiSuisei:['re_HoshimatiSuisei','HoshimatiSuisei'],
			AkiRosenthal:['re_AkiRosenthal','AkiRosenthal'],
			SakuraMiko:['re_SakuraMiko','SakuraMiko'],
			NatsuiroMatsuri:['re_NatsuiroMatsuri','NatsuiroMatsuri'],
			AkaiHaato:['re_AkaiHaato','AkaiHaato'],
			UsadaPekora:['re_UsadaPekora','UsadaPekora'],
			
			XiaoxiXiaotao:['re_XiaoxiXiaotao','XiaoxiXiaotao'],
			InuyamaTamaki:['re_InuyamaTamaki','InuyamaTamaki'],
			KaguraMea:['re_KaguraMea','KaguraMea'],
			
			SisterClearie:['re_SisterClearie','SisterClearie'],
			LizeHelesta:['re_LizeHelesta','LizeHelesta'],
		},
		   translate:{
			hololive: 'HOLO',
			
			re_KizunaAI: '新·绊爱',
			re_ailian: '爱链',
			re_ailian_info: '出牌阶段每名角色限一次，你可以将任意张手牌交给一名其他角色，然后当你于此阶段以此法给出第二张牌时，你可以视为使用一张基本牌。',

			re_YuNi: '新·YuNi',
			re_shengcai: '声彩',
			re_shengcai_info: '当你使用一张牌后，若与本回合之前使用的过的牌颜色均不同，你可以摸X张牌。（X为本回合之前使用过的牌数）',
			
			re_TomariMari: '新·兎鞠まり',
			liansheng: '恋声',
			liansheng_info: '<font color=#f66>锁定技</font> 你未受伤时性别为男；受伤时性别为女。你的性别变化时，若当前回合角色为女性，你摸一张牌。',
			ruantang: '软糖',
			ruantang_info: '你可以跳过判定阶段和摸牌阶段，令至多一名异性角色与你各回复1点体力，然后体力因此回复至上限的角色摸一张牌。',

			re_Omesis: '新·欧米伽姐妹',
			yaozhan: '邀战',
			yaozhan_info: '你可以跳过摸牌阶段/出牌阶段，视为使用一张【决斗】。',
			chongxin: '崇新',
			chongxin_info: '场上的判定牌生效前，你可以用相同花色的牌替换之。然后你可以将获得的牌置于武将牌上，其他角色不能使用与之花色相同的牌响应你使用的【决斗】。',

			re_KaguyaLuna: '新·辉夜月',
			re_jiajiupaidui: '假酒派对',
			re_jiajiupaidui_info: '每回合限一次，当你需要使用【酒】时，你可以令一名角色弃一张牌，若为♠或点数9，视为你使用之。',

			re_MiraiAkari: '新·未来明',
			duanli: '断离',
			duanli_info: '出牌阶段限一次，你可以弃置所有手牌，然后你于回合结束时摸等量的牌。',
			qingmi: '情迷',
			qingmi_info: '其他角色使用【桃】后，可以令你摸一张牌。',

			re_kaguraNaNa: '新·神乐七奈',
			re_DDzhanshou: 'DD斩首',
			re_DDzhanshou_info: '一名角色的回合结束时，若本回合其对除你和其以外的角色使用过红色牌，你可以摸一张牌或对其使用一张【杀】。', 
			
			re_Siro: '新·小白',
			lingsi: '灵思',
			lingsi_info: '出牌阶段限一次，你可以摸两张牌然后弃两张牌。你一次性弃置至少两张基本牌后，可以视为使用一张【杀】；一次性弃置至少两张非基本牌后，可以令一名角色回复1点体力。',

			re_Nekomasu: '新·ねこます',
			re_dianyin: '点引承传',
			re_dianyin_info: '当你受到 1 点伤害后，你可以令一名角色摸两张牌，若其手牌数少于你或为全场最少，改为摸三张牌。',

			re_XiaDi: '新·下地',
			re_yinliu: '引流',
			re_yinliu_info: '出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。',

			re_ShizukaRin:'新·静凛',
			re_mozhaotuji:'魔爪突击',
			re_mozhaotuji_info:'每回合限一次。你可以将你的一个阶段变为出牌阶段。你使用过至少两张牌的出牌阶段结束时，摸一张牌。',

			re_MitoTsukino:'新·月之美兔',
			re_MitoTsukino_info:'月之美兔',
			re_bingdielei:'并蒂恶蕾',
			re_bingdielei_info:'每轮限一次。你失去过牌的回合结束时，你可以获得一个额外回合。',
			
			re_HiguchiKaede: '新·樋口枫',
			re_zhenyin: '震音',
			re_zhenyin_info: '每回合限一次。当你使用黑色牌指定目标后，可以将目标区域内的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。',
			
			re_UshimiIchigo: '新·宇志海莓',
			re_shuangren: '双刃',
			re_shuangren_info: '你的黑色【杀】可以额外指定一名角色为目标；你的红色【杀】无距离与次数限制。',
			re_jitui: '急退',
			re_jitui_info: '当你受到伤害后或在回合外失去非基本牌后，你可以摸一张牌。',
			
			re_MononobeAlice:'新·物述有栖',
			re_dianmingguzhen:'电鸣鼓震',
			re_dianmingguzhen_info:'出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你可视为使用一张雷【杀】。',

			re_SisterClearie: '新·克蕾雅',
			shenyou: '神佑',
			shenyou_info: '<font color=#f66>锁定技</font> 你受到来自基本牌的伤害+1；其它的伤害-1。',
			shenfa: '神罚',
			shenfa_info: '当你失去一张手牌时，你可以令一名其他角色获得『神佑』直到回合结束。',

			re_LizeHelesta: '新·莉泽',
			yubing: '语冰',
			yubing_info: '你使用基本牌或通常锦囊牌后，若未被抵消，你可以令你不为零的手牌上限-1直到回合结束，然后摸两张牌。',

			re_AngeKatrina: '新·安洁',
			xiaoqiao: '小巧',
			xiaoqiao_info: '弃牌阶段开始时，你可以展示任意张类型不同的手牌，本回合这些牌不计入手牌上限。',
			liancheng: '链成',
			liancheng_info: '一轮限两次。一个回合结束时，你可以重铸任意张类型不同的手牌。若你重铸了装备牌，你可以令当前回合角色调整手牌与你相同。',

			re_TokinoSora: '新·时乃空',
			re_taiyangzhiyin:'太阳之音',
			re_taiyangzhiyin_info:'你使用牌指定目标时，若此牌点数大于10，你可选择一项：令之无法响应；为之额外指定一名目标；或摸一张牌。',

			re_RobokoSan:'新·萝卜子',
			re_zhanxie:'战械',
			re_zhanxie_info:'<font color=#f66>锁定技</font> 你出牌阶段可使用三张【杀】。当你使用第三张【杀】时，摸两张牌。',
			re_chongdian:'机电',
			re_chongdian_info:'你受到雷电伤害时可改为回复等量体力；你的装备牌均可当【雷杀】使用。',
			
			re_ShirakamiFubuki: '新·白上吹雪',
			re_yuanlv:'远虑',
			re_yuanlv_info:'每回合限一次。你使用锦囊后或受到伤害后，你可以摸三张牌，然后将两张牌置于牌堆顶。',
			re_jinyuan:'近援',
			re_jinyuan_info:'出牌阶段，你可以弃一张牌令一名其他角色摸一张牌，然后其可以立即使用那张牌。',
			
			re_HoshimatiSuisei:'新·星街彗星',
			cansha: '残杀',
			cansha_info: '当你的实体【杀】生效后，你可以视为使用一张【过河拆桥】；当你的实体【过河拆桥】生效后，你可以视为使用一张【杀】。',

			re_AkiRosenthal: '新·亚琦',
			re_huichu: '慧厨',
			re_huichu_info: '每轮限一次。一名角色的回合开始时，你可以展示所有手牌，若均为红色，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。',
			
			re_SakuraMiko: '新·樱巫女',
			huangyou: '黄油',
			huangyou_info: '出牌阶段，你可以弃置两张红色牌摸三张牌或回复1点体力，然后判定一次，若不为♥，本回合不能再发动此技能。',
			qidao: '祈祷',
			qidao_info: '当一张判定牌生效前，你可以弃一张牌重新判定。',

			re_NatsuiroMatsuri:'新·夏色祭',
			re_huxi1:'呼吸',
			re_huxi1_info:'当你不因此技能获得牌后，你可以与一名本回合未“呼吸”过的角色交换一张手牌。然后若你获得了红色牌，你摸一张牌，使用的下一张【杀】不计入次数。',

			re_AkaiHaato: '新·赤井心',
			chixin: '赤心',
			chixin_info: '当有本回合未以此技能获得的♥牌不因使用进入弃牌堆时，若其中有牌，你可以获得其中一张红色牌；或将其中任意张牌以任意顺序置于牌堆顶。',
			
			re_UsadaPekora: '新·兔田佩克拉',
			qiangyun: '强运',
			qiangyun_info: '你的判定牌生效前，你可以打出一张牌代替之，然后你可以立即使用打出牌，且此牌造成伤害后，你摸一张牌。',
			tuquan: '兔拳',
			tuquan_info: '<font color=#f66>锁定技</font> 你的【杀】被【闪】抵消时，你进行判定，若为♠，你弃置目标一张牌，若为♥，你弃置一张牌。',
			
			re_UruhaRushia: '新·润羽露西娅',
			juebi: '绝壁',
			juebi_info: '在你未受到伤害的回合，你可以将非基本牌当【闪】使用或打出；你受到伤害后，可以令本回合下一次造成的伤害+1。',
			zhanhou: '战吼',
			zhanhou_info: '出牌阶段开始时/其他角色阵亡时，你可以受到1点伤害/回复1点体力，视为使用一张【顺手牵羊】。',

			re_XiaoxiXiaotao: '新·小希小桃',
			re_doupeng: '逗捧',
			re_doupeng_info: '出牌阶段限一次，你可以与一名其他角色拼点，赢的角色摸一张牌，没赢的角色可以令赢的角色回复1点体力。',
			re_xuyan: '虚研',
			re_xuyan_info: '结束阶段，你可以选择一名其他角色；你下个回合开始时，若该角色在此期间造成过伤害，你摸一张牌。否则你与一名角色各失去1点体力。',
			
			re_InuyamaTamaki: '新·犬山玉姬',
			re_hundunliandong: '混沌联动',
			re_hundunliandong_info: '出牌阶段限一次，你可以令任意势力不相同的角色各弃置一张牌。此技能计算势力时，有“homo”标记的角色视为同势力。',
			
			re_KaguraMea: '新·神乐めあ',
			re_luecai: '掠财',
			re_luecai_info: '出牌阶段限一次，你可以令手牌数大于你的角色依次交给你一张牌。',
			re_xiaoyan: '嚣言',
			re_xiaoyan_info: '<font color=#f66>锁定技</font> 你对手牌数小于你的角色使用牌不可被响应。',

		   }
	}
}
)