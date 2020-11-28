'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'Beginner',
        connect:true,
        character:{
            /**绊爱 */
			re_KizunaAI:['female','upd8',4,['re_ailian'],['zhu']],
			/**辉夜月 */
			re_KaguyaLuna:['female','qun',3,['re_jiajiupaidui']],
			/**未来明 */
			re_MiraiAkari: ['female', 'qun', 4, ['duanli']],
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
            re_TokinoSora:['female','holo',4,['taiyangzhiyin'],['zhu']],
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
			/**小希小桃 */
			re_XiaoxiXiaotao:['female','qun',3,['re_doupeng','re_xuyan']],
			/**犬山 */
			re_InuyamaTamaki:['male','key',3,['rongyaochengyuan','re_hundunliandong']],
			/**咩宝 */
			re_KaguraMea: ['female', 'qun', 4, ['re_luecai', 're_xiaoyan']],

			
			/**Re修女克蕾雅 */
			re_SisterClearie:['female','nijisanji',4,['shenyou','shenfa']],
			/**Re莉泽 */
			re_LizeHelesta:['female','nijisanji',4,['yubing']],
        },
        characterIntro:{
			re_SisterClearie:	'神のご加護があらんことを      --《DOMAG》',
		},
        skill:{
			//re老爱
            re_ailian:{
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
				discard:false,
				filter:function(event,player){
                    return player.countCards('h')>0;
                },
                content: function(){
					'step 0'
					targets[0].gain(cards,player,'giveAuto');
					'step 1'
					event.num = player.storage.re_ailian_clear;
					player.storage.re_ailian.add(targets[0]);
					player.storage.re_ailian_clear+=cards.length;
					'step 2'
					if(player.storage.re_ailian_clear>=2&&event.num<2){
						var list=get.inpile('basic');
						for(var i=0;i<list.length;i++){
							list[i]=['基本','',list[i]];
						}
						player.chooseButton(ui.create.dialog('选择使用一张基本牌',[list,'vcard'],'hidden'))
					}else{
						event.finish();
					}
					'step 3'
					if(result.bool){
						player.chooseUseTarget({name:result.buttons[0].link[2]},false);
					}
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
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player){
					return event.filterCard({name:'jiu',isCard:true},player,event);
				},
				content:function(){
					"step 0"
					player.chooseTarget('指定一名角色弃置一张牌',function(card,player,target){
						return target.countCards('he')>0;
					});
					"step 1"
					if(result.bool&&result.targets.length>0){
						player.logSkill('jiajiupaidui',result.targets);
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					"step 2"
					event.onlyOne=event.targets[0].chooseToDiscard('he','弃置一张牌(若其中有♠或点数9，则视为'+get.translation(player)+'使用了一张酒)',true);
					event.onlyOne.set('ai',function(card){
						if(att>1)	return (get.suit(card)=='spade'||get.number(card)==9);
					});
					event.onlyOne.set('att',get.sgnAttitude(target,player))
					"step 3"
					event.discardCards=[];
					if(event.onlyOne!=undefined){
						event.discardCards.addArray(event.onlyOne.result.cards);
					}
					"step 4"
					event.targets[0].lose(event.onlyOne.result.cards,ui.ordering);
					event.targets[0].$throw(event.onlyOne.result.cards);
					game.log(event.targets[0],'弃置了',event.onlyOne.result.cards)
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
					"step 5"
					player.getStat().card.jiu--;
				},
			},
			tinenghuifu1:{
				trigger:{player:'loseAfter'},
				forced:true,	
				nopop:false,//player是否logSkill('此技能')，true为不
				filter:function(event,player){
					return event.es&&event.es.length>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.es.length;
					"step 1"
					event.count--;
					player.recover();
					"step 2"
					if(event.count>0){
						//console.log(event.count);
						player.chooseBool(get.prompt2('tinenghuifu1')).set('frequentSkill','tinenghuifu1').ai=lib.filter.all;
					}
					"step 3"
					if(result.bool){
						//game.delay();
						result.bool=false;
						event.goto(1);
					}
				},
				group:['tinenghuifu1_hp'],
				subSkill:{
					hp:{
						trigger:{player:['loseHpEnd','damageEnd']},
						forced:true,	
						nopop:true,//player是否logSkill('此技能')，true为不
						content:function(){
							player.draw(1);
							player.logSkill('tinenghuifu');
						}
					}
				}
				
			},
			re_dianmingguzhen:{
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
						if(event.judgeGroup==null)
							event.judgeGroup=[];
					}
					'step 7'
					event.equiptype=parseInt(event.equiptype.slice(5));
                    event.players=game.filterPlayer(function(current){
						return (current!=player)&&(!current.getEquip(event.equiptype));
                    });
					event.players.sortBySeat(player);
					'step 8'
                    if(event.playersIndex==null){
                        event.playersIndex=0;
                    }
                    if(event.playersIndex<event.players.length){
						////getCards('e',{subtype:['equip3','equip4','equip6']}));
						if(!event.players[event.playersIndex].getEquip(event.equiptype)){
							player.useCard({name:'sha',nature:'thunder',isCard:true},event.players[event.playersIndex],false);
							//player.getStat().card.sha--;
						}
					}
					'step 9'
					if(!result.bool){
						event.judgeGroup.add(event.players[event.playersIndex]);
					}
					event.playersIndex++;
					if(event.playersIndex<event.players.length){
						event.goto(8);
					}
					'step 10'
					if(event.judgeGroup.length>0){
						var shanString='<br>';
						for(var i=0;i<event.judgeGroup.length;i++){
							shanString+=(get.translation(event.judgeGroup[i])+',');
						}
						player.chooseBool('是否对所有闪避者追加闪电判定？'+shanString);
					}
					else{
						event.finish();
					}
					'step 11'
					if(!result.bool){
						event.finish();
					}
					'step 12'
						//console.log(player.getStat().card.sha);
					if(event.judgeGroup.length>0){
						event.judgeGroup[0].judge(function(card){
							if(get.suit(card)=='spade'&&(get.number(card)>=2&&get.number(card)<=9)) return 2;
						});
					}
					else{
						event.finish();
					}
					'step 13'
					game.delay();
					if(event.judgeGroup.length>0){
						if(result.judge==2){
							event.judgeGroup[0].damage(3,'thunder','nosource');
						}
						event.judgeGroup.shift();
						event.goto(12)
					}
					else{
						event.finish();
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
			},
			//re小明
			duanli: {
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
			//re小白
			lingsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					player.draw(2);
					player.chooseToDiscard(2,'he',true)
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
							lib.skill.lingsi_discard.prompt2 =prompt2
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
			//狐叔
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
						})
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
			//re狗妈
			re_DDzhanshou:{
				trigger:{global:'phaseEnd'},
				priority:77,
				filter:function(event,player){
					var history = event.player.getHistory('useCard');
					console.log(history)
					var DD = false
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
						var list = ['摸一张牌','对其使用杀']
						player.chooseButton(ui.create.dialog('DD斩首！',[list,'vcard']));
					}
					'step 1'
					console.log(result.buttons[0].link);
					if(result.buttons[0].link[2] == '摸一张牌'){
						player.draw();
					}
					if(result.buttons[0].link[2] == '对其使用杀'){
						player.chooseToUse({
							preTarget:trigger.player,
							filterCard:{name:'sha'},
							filterTarget:function(card,player,target){
								return target==_status.event.preTarget;
							},
							addCount:false,
							nodistance:true,
							prompt:'DD斩首！',
						});
					}

				},
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
			fengxue:{
				trigger:{
					player:'phaseUseBefore'
				},
				content:function(){
					'step 0'
					player.logSkill('fengxue');
					trigger.cancel();
					'step 1'
					event.players=[];
					event.players=game.filterPlayer(function(current){
						return (current!=player)&&current.hp>=player.hp;
					});
					'step 2'
					ui.clear();
					var num;
					num=event.players.length+1;
					var cards=get.cards(num);
					event.cards=cards;
					event.gains=[];
					event.discards=[];
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					game.log(player,'观看了','#y牌堆顶的牌');
					//var content=['牌堆顶的'+event.cards.length+'张牌',event.cards];
					//player.chooseControl('ok').set('dialog',content);
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 3'
					if(!result.links[0]){
						ui.clear();
						event.finish();
					}
					else{
						var bool=game.hasPlayer(function(current){
							return player.canUse(result.links[0],current);
						});
						if(bool){
							player.chooseUseTarget(result.links[0],true,false);
						}
						else event.discards.push(result.links[0]);
						event.cards.remove(result.links[0]);
					}
					'step 4'
					//player.gain(event.cards,'gain2');
					// if(event.discards.length){
					// 	player.$throw(event.discards);
					// 	game.cardsDiscard(event.discards);
					// }
					ui.clear();
					'step 5'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
					if(event.cards.length==0){
						event.finish();
					}
					'step 6'
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学(获取一种花色牌)',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 7'
					if(result.links[0]){
						game.log(player,'选择了',get.translation(get.suit(result.links[0])+'2'));
						event.cards.forEach(card => {
							if(get.suit(card)==get.suit(result.links[0])){
								event.gains.push(card);
							}
							else{
								event.discards.push(card);
							}
						});
					}
					if(event.discards.length){
						player.$throw(event.discards);
						game.cardsDiscard(event.discards);
					}
					if(event.gains.length){
						//game.log(player,'获得了',event.gains);
						player.gain(event.gains,'gain2');
					}
					'step 8'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
				},
				check:function(event,player){
					if(player.hp<2) return false;
					if(player.countCards('h')<1) return true;
					if(player.countCards('e')>=2) return true;
					return false;
				},
				ai:{
					result:{
						player:function(player){
							if(player.hp<2) return -2;
							if(player.countCards('e')>=2) return 1;
							return -2;
						}
					},
				}
			},
			yuepi:{
				trigger:{
					player:'phaseDiscardBefore',
				},
				filter:function (event,player){
					return (player.countCards('h')>=player.countCards('e'))&&player.countCards('e')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',player.countCards('e'),true,'请选择重铸的牌');
					'step 1'
					player.lose(result.cards, ui.discardPile);
					player.$throw(result.cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
					'step 2'
					player.draw(player.countCards('e'));
					player.addTempSkill('yuepi_handLimit');
				},
				subSkill:{
					handLimit:{
						mod:{
							maxHandcard:function (player,num){
								return num+player.countCards('e');
							},
						}
					}
				}
			},
			cangxiong:{
				trigger:{
					global:'changeHp'
				},
				filter:function (event,player){
					if(!event.player||event.player==player||player.countCards('h')==0) return false;
					return event.player.hp==1;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',[1,Infinity],true,'请选择要给对方的牌').set('ai',function(card){
						if((event.player.countCards('h')+ui.selected.cards.length)>(player.countCards('h')-ui.selected.cards.length)) return -1;
						return 7-get.value(card);
					});;
					'step 1'
					if(result.cards){
						trigger.player.gain(result.cards,player,'giveAuto');
					}
					'step 2'
					if(trigger.player.countCards('h')>player.countCards('h')){
						if(player.storage.outPlayers==null){
							player.storage.outPlayers=[];
						}
						player.storage.outPlayers.push(trigger.player);
						trigger.player.addTempSkill('cangxiong_diao',{target:'phaseBegin'});//移除游戏
						game.broadcastAll(function(splayer){
								splayer.out('cangxiong_diao');
							},trigger.player
						)
					}
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
										splayer.in('cangxiong_diao');
									},player
								)
							}
							return true;
							//player.in('cangxiong_diao');
							//player.in('cangxiong_diao');
							//

						},
						intro:{
							content:'移除游戏外'
						},
						content:function(){
							game.broadcastAll(function(splayer){
								_status.dying.remove(splayer);
							},player)
							player.removeSkill('cangxiong_diao');
						}
					},
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0
				},
				ai:{
					basic:{
						order:10
					},
					result:{
						target:function(player,target){
							return get.attitude(player,target)
						},
					},
					threaten:1.3
				}
			},
			nochongzhu:{

            },
            //re兔头
			re_bingdielei:{
                group:'re_bingdielei_damageBy',
				subSkill:{
					damageBy:{
						trigger:{player:'damageBegin4'},
						priority:99,
						filter:function(event,player){
							console.log(event);
							return event.num;
						},
						direct:true,
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							player.markSkill(event.name);
							player.logSkill(event.name);
							player.addTempSkill('re_bingdielei_anotherPhase');
						},
					},
					anotherPhase:{
						trigger:{global:'phaseEnd'},
						marktext: '并',
						mark:true,
						forced:true,
						intro: {
							content:'当前回合结束后获得一个额外回合',
							name:'并蒂恶蕾',
						},
						content:function(){
							player.markSkill(event.name);
							game.delayx();
							player.logSkill(event.name);
							player.insertPhase();
						}
					}
				}
            },
            //re德龙
			re_zhenyin: {
				trigger: {
					player: 'useCardToPlayered',
				},
				filter: function(event, player) {
					return event.name == 'useCardToPlayered' 
						&& event.targets.length == 1
                        && event.targets[0].countCards('ej')
                        && get.color(event.card)=='black';
					
				},
				content: function() {
					'step 0'
					event.A = trigger.targets[0];
					event.B = event.A.next;
					if (!event.A.countCards('ej')) event.finish();
					player.choosePlayerCard('ej', event.A);
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
				trigger: {
					player: ['loseAfter', 'damageAfter'],
				},
				filter: function(event, player) {
					return event.name=='damage' || (event.name='lose'&&event.cards.length > 2);
				},
				priority:98,
				content: function() {
					player.draw();
				},
			},
			//reAlice
			re_dianmingguzhen:{
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
						player.chooseUseTarget({name:'sha',nature:'thunder'},'是否视为使用一张【杀】？',false);
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
			},
			//re修女
			shenyou:{
				marktext:'神',
				intro:{
					name:"神佑",
					content:function (storage,player,skill){
						return get.info(skill);
					},
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
			},
			shenfa:{
				trigger:{player:['loseAfter']},
                priority:1,
				filter:function(event,player){
					return event.cards.length&&event.hs.length;
				},
				content:function(){
					'step 0'
					event.num=trigger.cards.length;
					'step 1'
					var next=player.chooseTarget('令一名其他角色获得『神佑』直到回合结束');
					next.set('filterTarget',function(card,player,target){
						return !target.hasSkill('shenyou');
					});
					'step 2'
					if(result.bool){
						result.targets[0].addTempSkill('shenyou');
						event.num--;
						if(event.num){
							event.goto(1);
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
					return player.getHandcardLimit()&&(get.name(event.card)=='sha'||get.type(event.card)=='trick')
						&&!(event.result.bool == false || event.result.wuxied);
				},
				content:function(){
					player.draw(2);
					player.storage.yubing++;
					player.markSkill('yubing');
				},
				marktext:"教",
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
						trigger:{player:'phaseAfter'},
						forced: true,
						silent: true,
						priority:42,
						content:function(){
							player.storage.yubing = 0;
						}
					},
				},
			},

			//re下地
			re_yinliu: {
				enable:'phaseUse',
				filter:function(event,player){
					return	(player.countCards('he') >= 1
						&&!player.hasSkill('re_yinliu_used'));
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
                            if(player.getStat().card.sha==2){
								player.draw();
							}
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
					event.card = target.draw()[0];
					'step 1'
                    if(event.cardUsable){
                        var bool=game.hasPlayer(function(current){
                            return target.canUse(event.card,current);
                        });
                        if(!bool){
                            event.cardUsable=false;
                        }
                    }
                    if(event.cardUsable){
                        target.chooseUseTarget(event.card,'可选择一个目标直接使用该牌');
                    }
                }
			},
			//re星姐
			cansha:{
				trigger: {player: 'useCardAfter'},
				priority:3,
				filter: function(event, player) {
					return (get.name(event.card)=='sha'||get.name(event.card)=='huohe')
						&&!(event.result.bool == false || event.result.wuxied);
				},
				content:function(){
					trigger.targets.forEach(function(tar){
						if(get.name(trigger.card)=='sha'){
							player.useCard({name:'guohe'},tar);
						}else if(get.name(trigger.card)=='guohe'){
							player.useCard({name:'sha'},tar);
						}
					})
				}
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
					event.chk = player.countCards('h') == player.countCards('h', {suit: 'heart'});
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
						player.lose(result.cards, ui.discardPile);
						player.$throw(result.cards);
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
					var list=['摸三张牌','回复体力'];
					player.chooseButton(ui.create.dialog('选择一项',[list,'vcard']),true);
					'step 1'
					if(result.buttons[0].link[2]=='摸三张牌'){
						player.draw(3);
					}
					if(result.buttons[0].link[2]=='回复体力'){
						player.recover();
					}
					'step 2'
					player.judge(function(card){
						if(get.suit(card,'player')=='heart') return 4;
						return -1;
					});
					'step 3'
					if(result.bool){
					}else{
						player.addTempSkill('huangyou_used');
					}
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
							player.chooseBool('是否使对方回复一点体力');
						}
						else{
							event.target.chooseBool('是否使对方回复一点体力');
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
				}
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
				content:function(){
					'step 0'
					if(player.storage.targets==null) {
						player.storage.targets=[];
					}
					if(event.dropCardsType==null){
						event.dropCardsType=[];
						event.dropCards=[];
						event.playerIndex=0;
						event.dialogId=0;
					}
					player.chooseTarget('指定一个不同势力目标参与联动',function(card,player,target){
						if(!player.countCards('he'))	return false;
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
							return true;
						}
						else{
							return true;
						}
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
					while(player.storage.targets.length>=1){
						player.storage.targets.shift().chooseToDiscard(true,1,'he','弃置一张牌');
					}
				}
			},
			//reMEA
			re_luecai: {
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
				check:function(card){
					return 1;
				},
				content: function() {
					'step 0'
					target.chooseCard('he', true);
					'step 1'
					player.gain(result.cards[0],target,'giveAuto');
					player.addTempSkill('re_luecai_used','phaseUseEnd')
				},
				subSkill:{
					used:{}
				},
			},
			re_xiaoyan: {
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
        translate:{
			
            re_KizunaAI:'新·绊爱',
			re_ailian:'爱链',
			re_ailian_info:'出牌阶段每名角色限一次，你可以将任意张手牌交给一名其他角色，然后当你于此阶段以此法给出第二张牌时，你可以视为使用一张基本牌。',
			
			re_KaguyaLuna:'新·辉夜月',
			re_jiajiupaidui:'假酒派对',
			re_jiajiupaidui_info:'每回合限一次，当你需要使用【酒】时，你可以令一名角色弃一张牌，若为♠或点数9，视为你使用之。',

			re_MiraiAkari:'新·未来明',
			duanli:'断离',
			duanli_info:'出牌阶段限一次，你可以弃置所有手牌，然后你于回合结束时摸等量的牌。',

			re_kaguraNaNa:'新·神乐七奈',
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
			dunzou: '遁走',
			dunzou_info: '回合外，当你被♣牌指定并结算后，你可以令你于本回合视为不存在。',
			dunzou_enable: '遁走',


			re_ShizukaRin:'新·静凛',
			re_mozhaotuji:'魔爪突击',
			re_mozhaotuji_info:'每回合限一次。你可以将你的一个阶段变为出牌阶段。你使用过至少两张牌的出牌阶段结束时，摸一张牌。',

			re_MitoTsukino:'新·月之美兔',
			re_MitoTsukino_info:'月之美兔',
			re_bingdielei:'并蒂恶蕾',
            re_bingdielei_info:'你造成或受到过伤害的额定回合结束时，获得一个额外回合。',
            
			SuzukaUtako: '铃鹿诗子',
			meici: '美词',
			meici_info: '其他角色的回合开始时，若其手牌为全场最多，其本回合使用锦囊牌后，你可以观看其手牌并重铸其中一张，若因此重铸了基本牌，你也可重铸一张牌。',
			danlian: '耽恋',
			danlian_info: '一个回合结束时，若本回合不因使用而进入弃牌堆的牌不小于当前回合角色的体力值，你可选择其中一张♦或♣牌并选择另一名其他角色，当前回合角色将♦牌当【乐不思蜀】，♣牌当【决斗】对你选择的角色使用。每轮每种花色限一次。',
			
			re_HiguchiKaede: '新·樋口枫',
			re_zhenyin: '震音',
			re_zhenyin_info: '每回合限一次。当你使用黑色牌指定目标后，可以将目标区域内的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。',
			
			re_UshimiIchigo: '新·宇志海莓',
			re_shuangren: '双刃',
			re_shuangren_info: '<font color=#f66>锁定技</font> 你的黑色【杀】可以额外指定一名角色为目标；你的红色【杀】无距离与次数限制。',
			re_jitui: '急退',
			re_jitui_info: '当你受到伤害后或一次性失去了两张以上的牌后，你可以摸一张牌。',
			
            re_MononobeAlice:'新·物述有栖',
			re_dianmingguzhen:'电鸣鼓震',
			re_dianmingguzhen_info:'出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你可视为使用一张雷【杀】。',

			re_SisterClearie: '新·克蕾雅',
			shenyou: '神佑',
			shenyou_info: '<font color=#f66>锁定技</font> 锁定技。你受到来自基本牌的伤害+1；其它的伤害-1。',
			shenfa: '神罚',
			shenfa_info: '当你失去一张手牌时，你可以令一名其他角色获得『神佑』直到回合结束。',

			re_LizeHelesta: '新·莉泽',
			yubing: '语冰',
			yubing_info: '你使用【杀】或通常锦囊牌后，若未被抵消，你可以令你不为零的手牌上限-1直到回合结束，然后摸两张牌。',


			re_TokinoSora: '新·时乃空',

			re_RobokoSan:'新·萝卜子',
            re_zhanxie:'战械',
            re_zhanxie_info:'<font color=#f66>锁定技</font> 你出牌阶段可使用三张【杀】。当你使用第二张【杀】时，摸一张牌；使用第三张【杀】时，摸两张牌。',
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
            re_huichu_info: '每轮限一次。一名角色的回合开始时，你可以展示所有手牌，若均为♥，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。',
			
			re_SakuraMiko: '新·樱巫女',
			huangyou: '黄油',
			huangyou_info: '出牌阶段，你可以弃置两张红色牌摸三张牌或回复1点体力，然后判定一次，若不为♥，本回合不能再发动此技能。',
			qidao: '祈祷',
			qidao_info: '当一张判定牌生效前，你可以弃一张牌重新判定。',

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
			re_xiaoyan_info: '<font color=#f66>锁定技</font> 锁定技。你对手牌数小于你的角色使用牌不可被响应。',

        }
    }
}
)