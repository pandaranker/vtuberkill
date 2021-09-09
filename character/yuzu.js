'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		character:{
			// ShitoAnon: ['female','paryi',3,['jiacan','fuhui']],

			// AngeKatrina:['female','nijisanji',3,['shencha','chuangzuo']],
			/**西西 */
			//YuikaSiina:['female','nijisanji',4,['tiaolian','jiaku']],
			
			/**Melody */
			Melody: ['female','vshojo',4,['kuangbiao','leizhu','tonggan'],['zhu','yingV']],

			/**扇宝 */
			shanbao: ['female','qun',4,['test','fengxu'],['guoV']],
			/**秋蒂 */
			qiudi: ['female','qun',3,['xiangnuo'],['guoV']],

			/**小柔 */
			Xiaorou: ['female','xuyan',3,['rouqing','guangying'],['guoV']],


			/**兰若Ruo */
			lanruo: ['female','qun',3,['dieyuan','shengyang'],['guoV']],
			/**兰若Re */
			lanre: ['female','qun',3,['daoyi','shengyin'],['guoV']],

			/**菜菜姐 */
			caicai: ['female','qun',5,['tibing','guangtui'],['guoV']],

			/**米白 */
			mibai: ['female','qun',4,['zhepie','chumo'],['guoV']],
			/**亚哈 */
			Ahab: ['female','qun',4,['ahbingyi','sujian'],['guoV']],

			/**白夜真宵 */
			ByakuyaMayoi: ['female','chaos',4,['bykuangxin'],['guoV']],
			/**高原守 */
			Mamoru: ['male','chaos','-3/3',['shoumi','yanwang'],['guoV']],

			/**无理 */
			Muri: ['female','VirtuaReal',3,['lique','zhangdeng'],['guoV']],
			/**小可 */
			xiaoke: ['female','VirtuaReal',4,['dianying','ganfen'],['guoV']],

			/**奈罗花 */
			Naraka: ['female','nijisanji',3,['echi','mudu'],],
			/**远北千南 */
			AchikitaChinami: ['female','nijisanji',3,['yingkuo','shengni'],],

			/**早见咲 */
			HayamiSaki: ['female','paryi',4,['tuncai','zhidu'],['zhu','guoV']],
			/**纪代因果 */
			KiyoInga: ['female','paryi',4,['huanxi','celv'],['yingV']],

			/**白玉 */
			Shiratama: ['female','qun',4,['meihua','shentian'],],
			/**琴吹梦 */
			KotobukiYume: ['female','qun',4,['xuanquan','rusu'],],

			/**永雏塔菲 */
			Taffy:['female','qun',3,['qianqi','chutan'],['guoV']],
			/**谢拉 */
			CierraRunis:['female','qun',3,['minghuahongxiao']],

			/**咩栗 */
			Merry:['female','qun',4,['qinhuo','lvecao','yangxi'],['guoV']],
			/**呜米 */
			Umy:['female','qun',4,['naisi','tuzai','wuneng'],['guoV']],

			/**林莉奈 */
			RinaHayashi:['female','qun',3,['xilv','bana'],['guoV']],
			/**姬拉 */
			Kira:['female','qun',4,['weiguang','liangqin'],['guoV']],

			/**李清歌 */
			liqingge:['female','HappyElements',4,['tage'],['guoV']],

			/**虾皇 */
			xiaoxiayu: ['female','xuefeng',4,['tanghuang','xiejiang'],['zhu','guoV']],
			/**龟龟 */
			tianxixi: ['female','xuefeng',3,['lache','danfu'],['guoV']],
			/**伊万 */
			iiivan: ['female','xuefeng',4,['shuipo','pianchao'],['guoV']],

			/**YY */
			yizhiYY: ['male','psp',4,['bianshi'],['guoV']],
			/**西魔幽 */
			AkumaYuu: ['male','psp',4,['akjianwu','tongzhao'],['guoV']],

			/**勾檀Mayumi */
			Mayumi: ['female','VirtuaReal',4,['jinzhou','gouhun'],['guoV']],
			/**阿萨Aza */
			Aza: ['male','VirtuaReal',3,['qiding','chouxin'],['guoV']],
			/**弥希MIKI */
			Miki: ['female','VirtuaReal',4,['xingxu','qingsui'],['guoV']],

			/**幸祜 */
			Koko: ['female','vwp',4,['xiezhen','wenzhou'],],

			/**新科娘 */
			xinkeniang: ['female','qun',4,['daimao','hongtou'],['zhu','guoV']],
			/**测试用角色 */
			Ruki: ['female','VirtuaReal',4,['beixie','hunzhan'],['guoV']],
		},
		characterSort:{
			yuzu:{
				TEST:['Ruki'],
			}
		},
		characterIntro:{
		},
		characterTitle:{
			Shiratama:'#y幼术师',

			liqingge:'#y战斗吧歌姬！',
		},
		skill:{
			//Ruki
			beixie:{
				trigger:{global:'gameDrawBegin',player:'enterGame'},
				direct:true,
				content:function(){
					'step 0'
					event.togain = [];
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						var current=ui.cardPile.childNodes[i];
						event.togain.push(current);
					}
					'step 1'
					player.chooseButton(['是否获得其中的一张牌？',event.togain]);
					'step 2'
					if(result.bool){
						player.logSkill(event.name);
						player.gain(result.links,'draw','log');
						if(get.subtype(result.links[0])=='equip1'){
							player.equip(result.links[0]);
						}
					}
				}
			},
			hunzhan:{
				trigger:{global:'damageAfter'},
				forced:true,
				filter:function(event, player){
					return true;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.player.chooseToUse({
						filterCard:function(card,player){
							return lib.filter.filterCard.apply(this,arguments);
						},
						prompt:get.prompt2('hunzhan')
					});
					'step 1'
					if(result.cards&&result.cards.length){
						player.draw();
					}
				}
			},
			//雪团
			chentu:{
				enable:'phaseUse',
				position:'h',
				usable:1,
				filterCard:true,
				selectCard:[1,Infinity],
				complexCard:true,
				check:function(card){
					var player = _status.event.player;
					var nh = player.countCards('h')-ui.selected.cards.length;
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isOut()||game.players[i]==player)	continue;
						if(game.players[i].countCards('h')<nh)	return 12-get.value(card);
					}
					return 5-get.value(card);
				},
				content:function(){
					if(player.isMinHandcard()){
						if(!player.storage.chentu)	player.storage.chentu = 0;
						player.storage.chentu+=cards.length;
						player.markSkill('chentu');
					}
				},
				marktext:'yuki',
				intro:{
					content:function(storage,player){
						var str='下个回合开始时，摸';
						str+=get.cnNumber(player.storage.chentu*2);
						str+='张牌';
						return str;
					},
				},
				group:['chentu_drawBy'],
				subSkill:{
					drawBy:{
						trigger:{player:'phaseBegin'},
						direct:true,
						filter:function(event, player){
							return player.storage.chentu;
						},
						content:function(){
							player.draw(player.storage.chentu*2);
							player.unmarkSkill('chentu');
							delete player.storage.chentu;
						}
					}
				},
				ai:{
					threaten:1.3,
					order:6,
					result:{player:4},
				}
			},
			sishu:{
				enable:'chooseToUse',
				filter:function(event,player){
					if(player!=_status.currentPhase)	return false;
					if(!player.countCards('h',{suit:'heart'})||
					!player.countCards('h',{suit:'spade'})||
					!player.countCards('h',{suit:'diamond'})||
					!player.countCards('h',{suit:'club'}))	return false;
					if(!game.hasPlayer(function(cur){
						return cur!=player;
					})){
						return false;
					}
					return event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)||
						event.filterCard({name:'shan'},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						console.log(_status.event.skill)
						_status.event.skillBy = 'sishu';
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						if(event.filterCard({name:'shan'},player,event)){
							list.push(['基本','','shan']);
						}
						delete _status.event.skillBy;
						return ui.create.dialog('饲鼠',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(card.name=='jiu') return get.order({name:'jiu'});
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2.95;
								else if(card.nature=='fire') return 2.92;
								else return 2.9;
							}
							else if(card.name=='tao'||card.name=='shan'){
								return 4;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(card){
								if(ui.selected.cards.length){
									for(var i of ui.selected.cards){
										if(get.suit(card)==get.suit(i))	return false;
									}
								}
								return get.suit(card);
							},
							complexCard:true,
							viewAs:{name:links[0][2],nature:links[0][3],isCard:true},
							selectCard:4,
							popname:true,
							log:false,
							precontent:function(){
								'step 0'
								event.cards = event.result.cards.slice(0);
								event.result.card.cards=[];
								event.result.cards=[];
								delete event.result.card.suit;
								delete event.result.card.number;
								'step 1'
								player.chooseTarget('选择收到这些牌的角色',true,lib.filter.notMe).ai=function(target){
									return get.attitude(player,target);
								}
								'step 2'
								if(result.bool){
									player.logSkill('sishu',result.targets);
									player.give(event.cards,result.targets[0],true);
								}
							},
						}
					},
					prompt:function(links,player){
						return '###选择交给其他角色的牌，以及'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'的目标###（注意是牌的目标。而不是收到牌的角色）';
					}
				},
				mod:{
					cardEnabled:function(card,player){
						if(player==_status.currentPhase&&get.type(card)=='basic'&&(_status.event.skillBy!='sishu'&&_status.event.skill!='sishu_backup'))	return false;
					},
					cardSavable:function(card,player){
						if(player==_status.currentPhase&&get.type(card)=='basic'&&(_status.event.skillBy!='sishu'&&_status.event.skill!='sishu_backup'))	return false;
					},
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						var nh=player.countCards('h');
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('h')<nh;
						})){
							if(event.type=='dying'){
								if(event.filterCard({name:'tao'},player,event)){
									return 0.5;
								}
							}
							else{
								if(event.filterCard({name:'tao'},player,event)||event.filterCard({name:'shan'},player,event)){
									return 4;
								}
								if(event.filterCard({name:'sha'},player,event)){
									return 2.9;
								}
							}
						}
						return 0;
					},
					save:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						return player.countCards('h')>=4;
					},
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							else{
								return 1;
							}
						}
					}
				}
			},
			//扇宝
			test:{
				trigger:{
					global:"gameDrawAfter",
					player:"enterGame",
				},
				forced:true,
				filter:function(event,player){
					return false;
				},
				content:function(){
					'step 0'
					galgame.sce("jiaochen1");
					'step 1'
					galgame.sce("jiaochen2");
			       'step 2'
					if (result.bool == "如何导入Galgame插件") {
						galgame.sce("daoru");
					}
					if (result.bool == "什么是事件？") {
						galgame.sce("shijian");
					}
					if (result.bool == "请你介绍下color标签及字体") {
						galgame.sce("color");
					}
					if (result.bool == "该怎么编写属于我的剧本？") {
						galgame.sce("jvben");
					}
					if (result.bool == "请你介绍下booth标签") {
						galgame.sce("booth");
					}
					if (result.bool == "请你介绍下right标签") {
						galgame.sce("right");
					}
					if (result.bool == "请你介绍下choose标签") {
						galgame.sce("choose");
					}
					if (result.bool == "请你介绍下none标签") {
						galgame.sce("none");
					}
					if (result.bool == "请你介绍下cg标签") {
						galgame.sce("cg");
					}
					if (result.bool == "请你介绍下audio标签") {
						galgame.sce("audio");
					}
					if (result.bool == "请你介绍下music标签") {
						galgame.sce("music");
					}
					if (result.bool == "请你介绍下background标签") {
						galgame.sce("background");
					}
					if (result.bool == "请你介绍下特殊对话标签") {
						galgame.sce("sp");
					}
					if (result.bool == "请你介绍下一般对话标签") {
						galgame.sce("duihua");
					}
					if (result.bool == "什么是标签？") {
						galgame.sce("biaoqian");
					}
					if (result.bool == '我都明白了，谢谢') {
						galgame.sce("end");
						event.finish();
					}
					else if (result.bool != "请你介绍下booth标签") {
						event.goto(1);
					}
			       'step 3'
					if(result.bool=="第一次？我们不是第一次见面嘛？"){
						galgame.sce("one");
					}
					'step 4'
					galgame.sce("booth2");
					event.goto(1);
				},
			},
			fengxu:{
				trigger: {
					player: 'useCardToPlayered',
				},
				filter: function(event, player) {
					return event.targets.length==1
						&& event.target==event.targets[0]
						&& event.target.countCards('hej');
				},
				check: function(event, player) {
					return get.attitude(player,event.target)<=0
					||(get.attitude(player,event.target)>0&&event.target.countCards('j'));
				},
				content: function() {
					'step 0'
					event.A = trigger.target;
					event.num = 0;
					'step 1'
					event.B = event.A.next;
					if (!event.A.countCards('hej')) event.finish();
					player.choosePlayerCard('hej', event.A,true).set('ai',function(button){
						var player = _status.event.player;
						var source = _status.event.target;
						var target = source.next;
						var link = button.link;
						if(get.position(link)=='j'){
							if(target.canAddJudge(link))	return get.effect(target,link,player,player)*get.attitude(player,target);
						}else if(get.position(link)=='e'){
							var subtype = get.subtype(link);
							if(!target.getEquip(subtype))	return get.effect(target,link,player,player)*get.attitude(player,target);
						}else{
							return get.value(link,target,'raw')*get.attitude(player,target);
						}
					});
					'step 2'
					if(result.bool){
						var card = result.links[0];
						if(get.position(card)=='e'){
							var c = event.B.getEquip(get.subtype(card));
							if (c) {
								event.change = true;
								dam = true;
								game.log(c, '掉落了');
							}
							re = event.B.equip(card);
						}
						else if(get.position(card)=='j'){
							var cname = card.viewAs ? card.viewAs : get.name(card);
							event.B.getCards('j').forEach(function(c) {
								if (get.name(c) == cname) {
									event.change = true;
									game.log(c, '掉落了');
									game.cardsDiscard(c);
								}
							})
							event.B.addJudge({name: cname}, [card]);
						}
						else{
							event.B.gain(card,event.A);
						}
						event.A.$give(card, event.B)
						game.delay();
					}
					'step 3'
					if(event.change){
						if(event.B==player&&event.num)	player.draw(event.num);
					}
					else if(event.num<5){
						event.A = event.B;
						event.num++;
						event.goto(1);
					}
				}
			},
			xiangnuo:{
				trigger:{
					player:['loseAfter','equipEnd'],
					global:['gainAfter','equipAfter','addJudgeAfter','loseAsyncAfter'],
				},
				direct:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=1;
				},
				filter: function(event, player) {
					if(player.storage.xiangnuo==1){
						return event.name=='equip'&&event.player==player;
					}
					else{
						var evt=event.getl(player);
						return evt&&evt.es&&evt.es.length>0&&game.countPlayer();
					}
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('xiangnuo')).ai=function(target){
						return get.attitude2(target)*(target.isMinHp()?4.5:2);
					};
					'step 1'
					if(result.bool){
						player.storage.xiangnuo = player.storage.xiangnuo==1?2:1;
						var target = result.targets[0];
						target.draw(2);
						if(target.isMinHp())	target.recover();
					}
				},
				group:'xiangnuo2',
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
						}
					},
					threaten:1.3
				}
			},
			xiangnuo2:{
				enable:'phaseUse',
				getResult:function(cards){
					var l=cards.length;
					var all=Math.pow(l,2);
					var list=[];
					for(var i=1;i<all;i++){
						var array=[];
						for(var j=0;j<l;j++){
							if(Math.floor((i%Math.pow(2,j+1))/Math.pow(2,j))>0) array.push(cards[j])
						}
						var num=0;
						for(var k of array){
							num+=get.number(k);
						}
						if(num==12) list.push(array);
					}
					if(list.length){
						list.sort(function(a,b){
							if(a.length!=b.length) return b.length-a.length;
							return get.value(a)-get.value(b);
						});
						return list[0];
					}
					return list;
				},
				usable:1,
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=12;
				},
				complexCard:true,
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==12) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				check:function(card){
					var evt=_status.event;
					if(!evt.minsi_choice) evt.minsi_choice=lib.skill.xiangnuo2.getResult(evt.player.getCards('he'));
					if(!evt.minsi_choice.contains(card)) return 0;
					return 1;
				},
				content:function(){
					'step 0'
					player.draw(cards.length).gaintag=['xiangnuo'];
					'step 1'
					player.storage.xiangnuo = player.storage.xiangnuo==1?2:1;
					// event.shanbao = function(name){
					// 	game.filterPlayer(function(cur){
					// 		if(cur.dataset.position>player.dataset.position)	cur.dataset.position++;
					// 	})
					// 	ui.arena.setNumber(game.countPlayer()+1);
					// 	game.fellow = game.addFellow(1, name);
					// 	game.fellow.gain(get.cards(4));
					// 	game.fellow.identity = 'zhong';
					// 	game.fellow.setIdentity();
					// 	game.fellow.identityShown = true;
					// 	game.fellow.node.identity.classList.remove('guessing');
					// 	_status.event.getParent('phaseLoop').player = game.fellow;
					// }('shanbao');
				},
				ai:{
					order:5,
					result:{player:1},
				},
			},
			//虾皇
			tanghuang:{
				trigger:{target:'useCardToTargeted'},
				logTarget:'player',
				usable:1,
				filter:function(event,player){
					var source=event.player;
					if(source==player) return false;
					return true;
				},
				check:function(event,player){
					var target=event.player;
					if(get.attitude(player,target)>=0){
						if((player.hujia||player.maxHp-player.hp>=2)&&player.hasSkillTag('xuefeng'))	return true;
						if(get.attitude(player,target)>0&&target.hujia&&target.hasSkillTag('xuefeng'))	return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					event.num = (player.maxHp-player.hp)||1;
					event.target = trigger.player;
					player.draw(event.num);
					game.delayx();
					'step 1'
					var list = [];
					if(event.target.countCards('he')){
						list.push('你的牌',event.target.getCards('he'));
					}
					if(player.countCards('h')){
						list.add(get.translation(player.name)+'的牌');
						list.push([player.getCards('h'),'blank'])
					}
					if(player.countCards('e')){
						list.add(get.translation(player.name)+'的牌');
						list.push(player.getCards('e'));
					}
					var chooseButton=event.target.chooseButton(event.num+3,true,list);
					chooseButton.set('target',player);
					chooseButton.set('num',event.num);
					chooseButton.set('ai',function(button){
						var player=_status.event.player;
						var target=_status.event.target;
						var num = _status.event.num
						var ps=[];
						var ts=[];
						for(var i=0;i<ui.selected.buttons.length;i++){
							var card=ui.selected.buttons[i].link;
							if(target.getCards('he').contains(card)) ts.push(card);
							else ps.push(card);
						}
						var card=button.link;
						var owner=get.owner(card);
						var val=get.value(card)||1;
						if(get.attitude(player,target)>0){
							if(target.hujia||player.hujia){}
							else if(num%2==0){
								if(owner==((ps.length>ts.length)?target:player))	return 10-val;
							}
						}
						if(owner==player){
							if(target.hujia&&target.hasSkillTag('xuefeng')){
								if(ps.length>1)	return 15-val;
								return 12-val;
							}
							return 7-val;
						}
						else{
							if(player.hujia&&player.hasSkillTag('xuefeng')){
								if(ts.length>1)	return 16-val;
								return 11-val;
							}
							return 5.5-val;
						}
					});
					chooseButton.set('filterButton',function(button){
						var player=_status.event.player;
						return lib.filter.canBeDiscarded(button.link,player,get.owner(button.link));
					});
					'step 2'
					if(result.bool){
						var list = result.links;
						var target = event.target;
						event.list1 = [];
						event.list2 = [];
						for(var i=0;i<list.length;i++){
							if(get.owner(list[i])==player){
								event.list1.push(list[i]);
							}else{
								event.list2.push(list[i]);
							};
						};
						if(event.list1.length&&event.list2.length){
							target.discard(event.list2).delay=false;
							player.discard(event.list1);
						}
						else if(event.list2.length){
							target.discard(event.list2);
						}
						else player.discard(event.list1);
						var dis = event.list1.length-event.list2.length;
						if(dis>0){
							event.dis = dis;
							event.more = player;
							event.less = target;
						}
						else if(dis<0){
							event.dis = -dis;
							event.more = target;
							event.less = player;
						}
					};
					'step 3'
					if(event.more){
						event.less.damage();
						event.more.draw(event.dis);
					}
				},
			},
			xiejiang:{
				trigger:{player:['drawEnd','changeHujiaEnd']},
				filter:function(event,player){
					if(event.name == 'draw') 	return event.num>=2;
					else	return event.num<0&&_status.currentPhase;
				},
				forced:true,
				content:function(){
					if(trigger.name=='draw'){
						player.changeHujia();
					}
					else{
						_status.currentPhase.draw(2);
					}
				},
				ai:{
					tag:{
						xuefeng:1,
					}
				}
			},
			//龟龟
			lache:{
				trigger:{player:['recoverAfter','discardAfter','changeHujiaEnd']},
				logTarget:function(event,player){
					if(event.name == 'recover')	return _status.currentPhase;
					return player;
				},
				filter:function(event,player){
					if(event.name == 'recover')	return _status.currentPhase;
					else if(player.hp<player.maxHp){
						if(event.name == 'discard')	return event.cards.length>=2;
						else	return event.num<0;
					}
				},
				prompt2:function(event,player){
					if(event.name == 'recover')		return '令其摸两张牌';
					return '回复一点体力';
				},
				check:function(event,player){
					var target=_status.currentPhase;
					if(event.name == 'recover')	return get.attitude(player,target)>0;
					else	return true;
				},
				content:function(){
					if(trigger.name=='recover'){
						_status.currentPhase.draw(2);
					}
					else{
						if(_status.currentPhase!=player)	player.draw(Math.abs(trigger.num||trigger.cards.length));
						player.recover();
					}
				},
			},
			danfu:{
				trigger:{player:['phaseJieshuBegin','changeHujiaAfter']},
				filter:function(event,player){
					if(event.name == 'phaseJieshu') 	return !player.getStat('damage');
					else	return event.num<0&&_status.currentPhase;
				},
				forced:true,
				content:function(){
					if(trigger.name=='phaseJieshu'){
						player.loseHp();
						player.changeHujia();
					}
					else{
						for(var i=0;i>trigger.num;i--){
							_status.currentPhase.draw();
						}
					}
				},
				ai:{
					tag:{
						xuefeng:1,
					}
				}
			},
			//伊万
			shuipo:{
				trigger:{player:['discardAfter','changeHujiaEnd','useCardAfter']},
				filter:function(event,player){
					if(event.name == 'useCard')	return get.type2(event.card)=='trick'&&!player.hasSkill('shuipo_used');
					else if(event.name == 'discard')	return event.cards.length>=3;
					else	return !player.hujia;
				},
				forced:true,
				content:function(){
					if(trigger.name=='useCard'){
						player.loseHp();
						player.chooseToDiscard([1,Infinity],'he',true,'『水魄』：请弃置任意张牌')
						player.addTempSkill('shuipo_used','phaseNext');
					}
					else{
						player.recover();
						player.draw();
					}
				},
				subSkill:{
					used:{},
				},
				ai:{
					tag:{
						xuefeng:1,
					}
				}
			},
			ming_pianchao:{},
			pianchao:{
				mod:{
					aiValue:function(player,card,num){
						if(card.hasGaintag&&card.hasGaintag('ming_')&&player.hasUseTarget(card)) return num/(10*player.getUseValue(card));
					},
				},
				trigger:{player:['loseHpAfter','discardEnd']},
				filter:function(event,player){
					console.log(event)
					if(event.name == 'loseHp') 	return player.countCards('h',function(card){
						return !card.hasGaintag('ming_');
					})>=2;
					else{
						return player.getHistory('lose',function(evt){
							if(evt.getParent()!=event) return false;
							for(var i in evt.gaintag_map){
								if(evt.gaintag_map[i].contains('ming_')) return true;
							}
							return false;
						}).length>0;
					}
				},
				direct:true,
				content:function(){
					'step 0'
					if(trigger.name=='loseHp'){
						player.chooseCard('h','###'+get.prompt('pianchao')+'###亮出两张手牌并获得1点护甲',2,function(card){
							return !card.hasGaintag('ming_');
						});
					}
					else{
						event.cards = trigger.cards.filter(function(card){
							return player.getHistory('lose',function(evt){
								if(evt.getParent()!=trigger) return false;
								if(evt.gaintag_map[card.cardid]&&evt.gaintag_map[card.cardid].contains('ming_')) return true;
								return false;
							}).length>0;
						});
						var next=player.chooseCardButton(1,'###'+get.prompt('pianchao')+'###使用其中一张牌',event.cards);
						next.set('filterButton',function(button){
							var player = _status.event.player;
							return player.hasUseTarget(button.link);
						});
						next.set('ai',function(button){
							var player = _status.event.player;
							return player.getUseValue(button.link);
						});
					}
					'step 1'
					if(result.bool){
						if(trigger.name=='loseHp'){
							player.logSkill('pianchao')
							player.addGaintag(result.cards,'ming_pianchao');
							player.changeHujia();
						}
						else{
							player.logSkill('pianchao')
							player.chooseUseTarget(result.links[0],true,'nopopup');
							player.addTempSkill('pianchao_phaseUseBy',{});
						}
					}
				},
				subSkill:{
					phaseUseBy:{
						mark:true,
						marktext:'片',
						intro:{content:'于下个额定阶段结束后进行一个额外的出牌阶段'},
						trigger:{global:'phaseNext'},
						forced:true,
						content:function(){
							player.removeSkill('pianchao_phaseUseBy');
							player.phaseUse();
						},
					},
				},
			},
			//Ciyana
			yankui:{
				trigger:{global:'phaseZhunbei'},
				direct:true,
				filter:function(event, player){
					return player!=event.player&&player.countCards('he',function(card){
						return !player.storage.yankui_mark||!player.storage.yankui_mark.contains(get.type2(card));
					})>1&&event.player.countGainableCards(player,'h');
				},
				check:function(event, player){
					if(player.hasUnknown(4))	return false;
					return true;
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					game.broadcastAll(function(player){
						player.chooseToDiscard(get.prompt2('yankui'),'he',function(card){
							return !player.storage.yankui_mark||!player.storage.yankui_mark.contains(get.type2(card));
						}).ai = function(card){
							var player = _status.event.player;
							var target = _status.event.getTrigger().player;
							var use = 0;
							if(player.hasUseTarget(card))	use+=player.getUseValue(card)*2;
							if(get.attitude(player,target)<1) return 6-get.useful(card)+use;
							return 0;
						};
					}, player)
					'step 1'
					if(result.cards&&result.cards.length){
						player.logSkill(event.target);
						if(!player.storage.yankui_mark)	player.storage.yankui_mark = [];
						for(var i=0;i<result.cards.length;i++){
							player.storage.yankui_mark.add(get.type2(result.cards[0]));
						}
						var next = player.gainPlayerCard(event.target,'h',true,'visibleMove');
						next.set('visible',true);
						next.set('ai',function(button){
							var player = _status.event.player;
							var target = _status.event.getTrigger().player;
							if(get.attitude(player,target)>0){
								if(target.countCards('h',{name:'sha'})>1&&get.type(button.link)!='basic'&&get.name(button.link)!='sha')	return 6+get.value(button.link);
								if(target.countCards('j')&&target.needsToDiscard()&&get.type(button.link)!='basic')	return 5+get.value(button.link);
							}
							return get.value(button.link);
						});
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.links){
						player.addTempSkill('yankui_mark','roundStart');
						event.card = result.links[0];
						if(get.type(event.card)!='basic'){
							event.target.skip('phaseJudge');
							event.target.skip('phaseDiscard');
							event.target.addTempSkill('yankui1');
						}else{
							event.target.addTempSkill('yankui2');
						}
					}
				},
				//group:'yankui_mark',
				subSkill:{
					mark:{
						mark:true,
						marktext:'魇',
						intro:{
							name:'魇窥',
							content:function(storage,player){
								var str='<ul style="padding-top:0;margin-top:0"><p>本轮次已弃置的牌类型</p>';
								for(var i=0;i<storage.length;i++){
									str+='<li>'+get.translation(storage[i]);
								}
								str+='</ul>'
								return str;
							},
						},
						onremove:function (player,skill){
							player.unmarkSkill(skill);
							delete player.storage[skill]
						},
					},
				},
			},
			yankui1:{
				mark:true,
				marktext:'魇',
				intro:{name:'魇窥 - 非基本牌',content:'跳过本回合下一个判定阶段和弃牌阶段'},
			},
			yankui2:{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=='sha') return num+1;
					},
				},
				mark:true,
				marktext:'魇',
				intro:{name:'魇窥 - 基本牌',content:'本回合内可以多使用一张【杀】'},
			},
			//noe
			huiyuan:{
				audio:4,
				trigger:{global:'useCard1'},
				filter:function(event, player){
					return player.countCards('h')<event.player.countCards('h')&&get.type(event.card)=='basic';
				},
				usable:1,
				check:function(event, player){
					return get.attitude(player,event.player)>0;
				},
				content:function(){
					game.asyncDraw([player,trigger.player]);
				},
			},
			suoshi:{
				audio:2,
				trigger:{player:'damageBegin3'},
				filter:function(event, player){
					return player.countCards('h');
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(cur){
						return cur.isMaxHandcard();
					});
					player.chooseCardTarget({
						prompt:get.prompt2('suoshi'),
						position:'h',
						filterTarget:function(card,player,target){
							return player!=target&&target.isMaxHandcard();
						},
						filterCard:lib.filter.cardDiscardable,
						ai1:function(card){
							if(_status.event.goon) return 6-get.value(card);
							return 0;
						},
						ai2:function(target){
							var player=_status.event.player;
							return get.attitude(player,target);
						},
						goon:function(target){
							var player=_status.event.player;
							return !player.isMinHandcard()&&(player.countCards('h')<3&&get.attitude(player,target)>0);
						}(list[0]),
					});
					'step 1'
					if(result.bool&&result.targets.length){
						event.cards = result.cards.slice(0);
						event.target = result.targets[0];
						player.logSkill('suoshi',event.target);
						player.give(event.cards,event.target);
					}

				},
				group:['suoshi_addDam'],
				subSkill:{
					addDam:{
						trigger:{player:'damageBegin'},
						forced:true,
						filter:function(event, player){
							return !player.isMinHandcard();
						},
						content:function(){
							trigger.num++;
						}
					}
				}
			},
			//帕里
			paryi:{
				marktext:"P",
				locked:true,
				intro:{
					name:'帕里家常',
					content:function (storage,player,skill){
						return '已经历了'+storage+'次『天扉』';
					},
				},
			},
			tiantang:{
				audio:2,
				priority:987,
				global:'paryi',
				trigger:{
					global: 'phaseBegin'
				},
				filter:function(event,player){
					if(player.countCards('he')<(event.player.storage.paryi||1))	return false;
					return true;
				},
				check:function(event,player){
					if(player.storage.haoren!==true)	return (event.player.storage.paryi||1)<=2&&get.attitude(player,event.player)<1&&!event.player.hasJudge('lebu');
					return event.player.needsToDiscard()&&get.attitude(player,event.player)<0||event.player.countCards('h')==0&&event.player.getHandcardLimit()>=3&&get.attitude(player,event.player)>=0;
				},
				content:function(){
					'step 0'
					if(player.storage.tiantang)	player.storage.tiantang.length = 0;
					var num = trigger.player.storage.paryi||1;
					if(player.storage.haoren===true)	player.chooseCard(num,'he','『天扉』：重铸'+get.cnNumber(num)+'张牌').ai=get.unuseful3;
					else	player.chooseToDiscard(num,'he','『天扉』：弃置'+get.cnNumber(num)+'张牌').ai=get.unuseful2;
					'step 1'
					if(result.bool){
						event.target = trigger.player;
						if(player.storage.haoren!==true){
							player.addMark('haoren');
						}
						else{
							player.lose(result.cards, ui.discardPile).set('visible', true);
							player.$throw(result.cards,1000);
							game.log(player, '将', result.cards, '置入了弃牌堆');
							player.draw(result.cards.length);
						}
						var target = event.target;
						if(target.storage.paryi){
							target.storage.paryi++;
						}
						else{
							target.storage.paryi=1;
						}
						target.markSkill('paryi');
						event.videoId = lib.status.videoId++;
						var suitlist = [
							['heart', '', 'heart', 'heart'],
							['diamond', '', 'diamond', 'diamond'],
							['club', '', 'club', 'club'],
							['spade', '', 'spade', 'spade']
						];
						game.broadcastAll(function(id, suitlist){
							var dialog=ui.create.dialog('『天扉』声明');
							dialog.addText('花色');
							dialog.add([suitlist, 'vcard']);
							dialog.videoId = id;
						}, event.videoId, suitlist);
					}
					else event.finish();
					'step 2'
					player.chooseButton().set('dialog',event.videoId);
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.storage.tiantang = result.links[0][2];
						player.chat(get.translation(player.storage.tiantang));
						game.log(player,'声明了',player.storage.tiantang);
						var target = event.target;
						var list= [[['观','','观看并弃置牌']],[['摸','','摸两张牌']]];
						if(player.storage.haoren===true)	list= [[['观','','观看并重铸牌']],[['摸','','摸两张牌']]];
						if(!target.countDiscardableCards(player,'he'))	list.shift();
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
					player.chooseButton(true).set('dialog',event.videoId).set('prompt',get.prompt('tiantang')).set('processAI',function(){
						return {
							bool:true,
							links:['摸','','摸两张牌'],
						}
					});
					'step 5'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						game.delayx();
						player.logSkill('tiantang', event.target,true,true,false);
						switch(result.links[0][0]){
							case '观': {	
								event.statClear = true;
								if(player.storage.haoren===true){
									var next=player.choosePlayerCard('『天扉』：重铸一张声明花色的牌', event.target, 'he').set('visible',true).set('complexSelect',true);
									next.set('filterButton',function(button){
										var player = _status.event.player;
										return get.suit(button.link)==player.storage.tiantang;
									});
									if(event.target.countCards('he',function(card){
										if(get.suit(card)==player.storage.tiantang)	return true;
									})){
										next.set('forced',true);
									}
								}
								else{
									var next=player.discardPlayerCard('『天扉』：弃置一张声明花色的牌', event.target, 'he').set('visible',true).set('complexSelect',true);
									next.set('filterButton',function(button){
										var player = _status.event.player;
										return get.suit(button.link)==player.storage.tiantang;
									});
									if(event.target.countCards('he',function(card){
										if(get.suit(card)==player.storage.tiantang)	return true;
									})){
										next.set('forced',true);
									}
								}
								break;
							}
							case '摸': {
								event.target.draw(2,player);
								event.target.addTempSkill('tiantangzhifei_xianzhi','phaseEnd');
								event.target.storage.tiantangzhifei_xianzhi = player.storage.tiantang;
								event.target.syncStorage('tiantangzhifei_xianzhi');
								event.finish();
								break;
							}
						}
					}
					else{
						event.finish();
					}
					'step 6'
					if(event.statClear){
						if(player.storage.haoren===true&&result.bool&&result.cards){
							event.target.lose(result.cards, ui.discardPile).set('visible', true);
							event.target.$throw(result.cards,1000);
							game.log(event.target, '将', result.cards, '置入了弃牌堆');
							event.target.draw(result.cards.length);
						}
						event.target.addTempSkill('tiantangzhifei_yisheng','phaseUseEnd');
						if(player.storage.haoren===true){
							event.target.markSkill('tiantangzhifei_yisheng');
							event.target.addTempSkill('yinliu','phaseUseEnd');
						}
						event.target.phaseUse();
					}
					'step 7'
					if(event.statClear){
						var stat = event.target.getStat();
						for(var i in stat.skill){
							var bool=false;
							var info=lib.skill[i];
							if(info.enable!=undefined){
								if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
								else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
							}
							if(bool) stat.skill[i]=0;
						}
					}
				},
			},
			tiantangzhifei:{
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
						onremove:true,
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
						onremove:true,
						mark:true,
						mod:{
							cardEnabled:function(card,player,now){
								if(get.suit(card)!=player.storage.tiantangzhifei_xianzhi)	return false;
								
							},
						},
					},
				}
			},
			haoren:{
				audio:true,
				skillAnimation:true,
				animationStr:'好人一生',
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
						return '已发动了'+storage+'次『天扉』';
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
				ai:{
					combo:'tiantang',
				},
			},
			//ggl
			shengya:{
				audio:4,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=true;
				},
				marktext:"卒",
				intro:{
					name:'职业生涯结束',
					content:function (storage,player,skill){
						return '失去『职业生涯』直到下个回合开始';
					},
				},
				trigger:{player:'useCardAfter'},
				priority: 996,
				forced: true,
				filter:function(event,player){
					return player.storage.shengya&&player.isPhaseUsing()&&get.color(event.card)=='red';
				},
				content:function(){
					event.cards=get.cards(1);
					game.cardsGotoOrdering(event.cards);
					player.showCards(event.cards);
					game.delay(1);
					player.gain(event.cards);
					if(get.suit(event.cards[0])=='club'){
						player.loseHp();
						player.storage.shengya = false;
						player.markSkill('shengya');
					}
				},
				group:'shengya_init',
				subSkill:{
					init:{
						trigger:{player:'phaseBefore'},
						silent: true,
						forced:	true,
						priority: 996,
						content:function(){
							if(!player.storage.shengya){
								player.storage.shengya=true;
								player.unmarkSkill('shengya');
							}
						},
					},
				}
			},
			liangshan:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:"汉",
				intro:{
					name:'好汉歌',
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
				trigger:{global:'drawEnd'},
				priority:996,
				filter:function(event,player){
					return event.player!=player&&player==_status.currentPhase&&event.player.getHistory('gain').length==1;
				},
				content:function(){
					var card=game.cardsGotoSpecial(get.cards()).cards[0];
					game.log(player,'将',card,'置于武将牌上');
					player.storage.liangshan.push(card);
					player.$draw(card);
					game.delay();
					player.markSkill('liangshan');
				},
				group:['liangshan_use','liangshan_save'],
				subSkill:{
					use:{
						trigger:{global:'phaseBegin'},
						priority: 996,
						check:function(event,player){
							if(player.hasUnknown(1))	return false;
							return get.attitude(player,event.player)>0;
						},
						filter:function(event,player){
							return player.storage.liangshan.length;
						},
						prompt2:'一名角色回合开始时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
						content:function(){
							'step 0'
							player.chooseCardButton('交给其一张你武将牌上的牌', 1, player.storage.liangshan);
							'step 1'
							if (result.bool) {
								var card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player,'将',card,'交给了',trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
								player.storage.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}
					},
					save:{
						trigger:{global:'dying'},
						priority: 996,
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
						filter:function(event,player){
							return event.player.hp<=0&&player.storage.liangshan.length;
						},
						prompt2:'一名角色濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
						content:function(){
							'step 0'
							player.chooseCardButton('交给其一张你武将牌上的一张牌', 1, player.storage.liangshan);
							'step 1'
							if (result.bool) {
								var card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player,'将',card,'交给了',trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
								player.storage.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}
					}
				},
			},
			chongshi:{
				trigger:{player:'shaBegin'},
				priority: 996,
				frequent:true,
				content:function(){
					game.asyncDraw([player,trigger.target]);
					// player.draw();
					// trigger.target.draw();
				}
			},
			//miu
			guanzhai:{
				audio:5,
				trigger:{global:'phaseEnd'},
				priority:997,
				prompt2:function(event,player){
					var target = event.player;
					return '可以观看其手牌，并获得其中至多'+(target.hasSkill('zhai')?target.countMark('zhai')+1:1)+'张牌';
				},
				logTarget:'player',
				filter:function(event,player){
					var num = event.player.countUsed(null,true);
					return event.player!=player&&event.player.countCards('h')&&num<(event.player.hasSkill('zhai')?event.player.countMark('zhai')+2:2);
				},
				content:function(){
					'step 0'
					var str = '###『观宅』###获得其中至多'+(trigger.player.hasSkill('zhai')?trigger.player.countMark('zhai')+1:1)+'张牌';
					player.choosePlayerCard(trigger.player,[1,(trigger.player.hasSkill('zhai')?trigger.player.countMark('zhai')+1:1)],'h').set('visible', true).set('prompt',str);
					'step 1'
					if(result.bool){
						player.logSkill('guanzhai',trigger.player,true,true,false);
						player.gain(result.cards,trigger.player,'giveAuto');
					}
				},
			},
			zhai:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				marktext:'宅',
				intro:{
					name:'直往欲女',
					name2:'观宅',
					content:function (storage,player,skill){
						return '下个回合中，『观宅』（）内的数值+'+storage+'。';
					},
				},
				mark:true,
				onremove:true,
			},
			zhishu:{
				audio:3,
				trigger:{player:['phaseUseBegin','changeHp']},
				priority:997,
				filter:function(event,player){
					return player.countCards('h');
				},
				content:function(){
					'step 0'
					var next=player.chooseCardTarget('h', 1, '选择展示的手牌与目标');
					next.set('filterTarget',function(card,player,target){
						return target!=player;
					});
					next.set('ai2',function(target){
						var player = _status.event.player;
						return 7-get.attitude(player,target);
					})
					'step 1'
					if(result.bool){
						event.target = result.targets[0];
						player.showCards(result.cards,'『直抒』展示手牌');
						game.delayx();
						event.target.chooseCard('he','是否交给'+get.translation(player)+'一张花色为'+get.translation(get.suit(result.cards[0]))+'的牌？',function(card,player){
							return get.suit(card)==_status.event.suit;
						}).set('suit',get.suit(result.cards[0]))
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.gain(result.cards[0],event.target,'giveAuto');
					}else{
						event.target.addTempSkill('zhai',{player:'phaseAfter'});
						event.target.addMark('zhai',1);
						game.log(event.target,'拒绝交给',player,'相同花色的牌');
					}
				},
				ai:{
					combo:'guanzhai',
				},
			},
			//oto
			yuxia:{
				audio:4,
				hiddenCard:function(player,name){
					if(!lib.skill.yuxia.filter(false,player))	return false;
					var list = get.inpile('trick');
					for(var i=0;i<list.length;i++){
						if(list[i]==name) return true;
					}
					return false;
				},
				enable:'chooseToUse',
				filter:function(event,player){
					return player.countCards('he')>=3;
				},
				chooseButton:{
					dialog:function(event,player){
						var list = get.inpile('trick');
						for(var i=0;i<list.length;i++){
							list[i]=['锦囊','',list[i]];
						}
						return ui.create.dialog('『玉匣』',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2],nature:button.link[3]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards('h',button.link[2])>0) return 0;
						if(['wugu','jingluo'].contains(button.link[2])) return 0;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'yuxia',
							filterCard:function(card){
								return true;
							},
							selectCard:3,
							forceAuto:function(){
								return ui.selected.cards.length==3;
							},
							popname:true,
							check:function(card){
								return 7-get.value(card);
							},
							position:'hes',
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function(links,player){
						return '###『玉匣』###将三张牌当做【'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'】使用';
					}
				},
				ai:{
					order:6,
					result:{
						player:function(player){
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i]!=player&&get.attitude(player,players[i])>0){
									return 0.5;
								}
							}
							return 0;
						}
					},
				},
				group:'yuxia_after',
				subSkill:{
					after:{
						trigger:{player:'useCardEnd'},
						priority:66,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return event.cards.length==3&&event.skill=='yuxia_backup'&&event.cards.filterInD().length;
						},
						content:function(){
							'step 0'
							event.cards = trigger.cards.filterInD();
							player.chooseCardButton([0,3],true,event.cards,'『玉匣』：可以按顺序将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
								var player = _status.event.player;
								var now = _status.currentPhase;
								var next = now.getNext();
								var att = get.attitude(player,next);
								var card = button.link;
								var judge = next.getCards('j')[ui.selected.buttons.length];
								if(judge){
									return get.judge(judge)(card)*att;
								}
								return next.getUseValue(card)*att;
							});
							'step 1'
							if(result.bool&&result.links){
								var list=result.links.slice(0);
								if(list.length){
									event.cards.removeArray(list);
								}
								while(list.length){
									ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
								}
								game.log(player,'将牌放在牌堆顶')
								if(event.cards.length){
									game.cardsDiscard(event.cards);
									game.log(event.cards,'进入了弃牌堆')
								}
							}else{
								game.cardsDiscard(event.cards);
								game.log(event.cards,'进入了弃牌堆')
							}
						}
					}
				},
			},
			lianjue:{
				init:function(player,skill){
					player.storage[skill]=[];
				},
				marktext: '崛',
				intro: {
					content: 'cards',
					name:'以『连崛』使用过的锦囊牌',
				},
				trigger:{player:'phaseEnd'},
				priority:66,
				frequent:true,
				prompt2: '你可以选择一项：令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
				filter:function(event,player){
					return /*(player.storage.lianjue-player.countCards('h'))&&*/(Math.abs(player.storage.lianjue_start-player.countCards('h'))%3==0);
				},
				content:function(){
					'step 0'
					player.chooseControlList(['令至多三名角色各摸一张牌','视为使用一张未以此使用过的通常锦囊牌'],function(){
						return 1;
					});
					'step 1'
					switch(result.index){
						case 0: {
							player.chooseTarget([1,3],'令至多三名角色各摸一张牌').set('ai',function(target){
								var att=get.attitude(_status.event.player,target);
								if(att>1){
									return att;
								}
								return 0;
							});
							event.goto(2);
							break;
						}
						case 1: {
							event.videoId = lib.status.videoId++;
							var list=[];
							for(var i=0;i<lib.inpile.length;i++){
								var name=lib.inpile[i];
								var reapeat = 0;
								if(player.storage.lianjue.length){
									player.storage.lianjue.forEach(function(his){	
										if(get.name(his)==name) reapeat ++;
									});
								}
								if(reapeat||name=='wuxie'||name=='jinchan') continue;
								else if(get.type(name)=='trick') list.push(['锦囊','',name]);
							}
							game.broadcastAll(function(id, list){
								var dialog=ui.create.dialog('使用一张未以此使用过的通常锦囊牌',[list,'vcard']);
								dialog.videoId = id;
							}, event.videoId, list);
							event.goto(3);
							break;
						}
					}
					'step 2'
					if(result.targets&&result.targets.length){
						game.asyncDraw(result.targets);
					}
					event.finish();
					'step 3'
					var next = player.chooseButton(1);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						return player.getUseValue({name:button.link[2],isCard:true});
					});
					'step 4'
					game.broadcastAll('closeDialog', event.videoId);
					if (result.bool){
						var card = result.links[0];
						player.chooseUseTarget({name:card[2]},true);
						player.storage.lianjue.add(game.createCard(card[2]));
						player.syncStorage('lianjue');
						player.markSkill('lianjue');
					}
				},
				group:['lianjue_start'],
				subSkill:{
					start:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger:{player:'phaseBefore'},
						firstDo:true,
						forced:true,
						silent:true,
						popup:false,
						priority:66,
						content:function(){
							player.storage.lianjue_start = player.countCards('h');
						},
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&!player.needsToDiscard()&&Math.abs(player.storage.lianjue_start-player.countCards('h'))%3==0){
							return num-10;
						}
					},
				},
			},
			changxiang:{
				zhuSkill:true,
				trigger:{global:'dying'},
				priority:66,
				filter:function(event,player){
					if(!player.hasZhuSkill('changxiang')) return false;
					return event.player.hp<=0&&event.player!=player&&event.player.group==player.group&&player.countCards('he')>=player.hp;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(player.hp);
					'step 1'
					if(result.bool)
					player.useCard({name:'tao'},trigger.player);
				}
			},
			//团长
			xhhuanshi:{
				mark:true,
				intro:{
					name:'幻士',
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
			huange:{
				trigger:{global:'phaseBegin'},
				round:1,
				priority:996,
				filter:function(event,player){
					return game.countPlayer(function(cur){
						return cur.hp!=Infinity;
					});
				},
				check:function(event,player){
					if(event.player!=player&&get.attitude(player,event.player)<0&&event.player.inRange(player))	return true;
					return event.player==player&&game.roundNumber>1&&player.hasUseTarget('sha')&&!player.needsToDiscard();
				},
				popup:false,
				content:function(){
					'step 0'
					var next = player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌',true,function(card,player,target){
						return target.hp!=Infinity;
					});
					next.set('ai',function(target){
						if(player.inRange(target))	return 2-get.attitude(player,target);
						else return target.hp-(get.attitude(player,target)/2);
					})
					'step 1'
					if(result.bool){
						player.logSkill('huange',result.targets);
						player.draw(result.targets[0].hp);
						player.storage.huange_disc = result.targets[0];
						player.markSkill('huange_disc');
						player.addTempSkill('huange_disc');
					}
				},
				subSkill:{
					disc:{
						mark:'character',
						intro:{
							name:'幻歌',
							content:'回合结束时弃置$体力值的牌',
						},
						trigger:{global:'phaseEnd'},
						priority:996,
						onremove:true,
						forced:true,
						filter:function(event,player){
							return player.countDiscardableCards(player,'he');
						},
						content:function(){
							'step 0'
							if(player.storage.huange_disc.isIn()&&player.countCards('he')){
								var prompt2 = '';
								if(player.storage.qishi===true)	prompt2 += '将'+get.cnNumber(player.storage.huange_disc.hp)+'张牌置于武将牌上';
								else{	
									prompt2 += '弃置'+get.cnNumber(player.storage.huange_disc.hp)+'张牌';
								}
								player.chooseCard('he','###『幻歌』###'+prompt2,player.storage.huange_disc.hp,true,lib.filter.cardDiscardable);
							}else{
								event.goto(2);
							}
							'step 1'
							if(result.bool){
								if(player.storage.qishi===true){
									event.cards = result.cards;
									player.lose(result.cards,ui.special,'toStorage');
									player.$give(event.cards,player,false);
									player.markAuto('xhhuanshi',event.cards);
								}else{
									player.discard(result.cards);
								}
							}
							'step 2'
							player.unmarkSkill('huange_disc');
							delete player.storage.huange_disc;
						},
					}
				},
			},
			qishi:{
				audio:true,
				skillAnimation:true,
				animationStr:'希望之花',
				unique:true,
				juexingji:true,
				forced:true,
				trigger:{global:'roundStart'},
				firstDo:true,
				priority:996,
				filter:function(event,player){
					return player.storage.qishi_date&&player.storage.qishi_date.contains(player)&&player.storage.qishi_date.length>1;
				},
				content:function(){
					'step 0'
					player.unmarkSkill('qishi_date');
					player.loseMaxHp();
					event.cards = [];
					'step 1'
					var next=player.judge(function(card){
						if(get.color(card)=='black') return -1.5;
						return 1.5;
					});
					next.set('callback',function(){
						event.getParent().orderingCards.remove(card);
					});
					'step 2'
					if(result.bool){
						event.cards.push(result.card);
						event.goto(1);
					}
					else{
						event.cards.push(result.card);
					}
					'step 3'
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)!='o'){
							event.cards.splice(i,1);
							i--;
						}
					}
					if(event.cards.length){
						player.$gain2(event.cards,false)
						player.markAuto('xhhuanshi',event.cards);
					}
					'step 4'
					player.storage.qishi = true;
					player.awakenSkill('qishi');
					player.addSkill('xiban');
				},
				derivation:'xiban',
				group:['qishi_date','qishi_update'],
				subSkill:{
					date:{
						mark:true,
						intro:{
							name:'奇誓',
							content:function (storage,player,skill){
								var str = '本轮内';
								if(storage.contains(player))	str += ' 已受到伤害';
								if(storage!=[player])	str += ' 已造成伤害';
								return str;
							},
							onunmark:function(storage,player){
								if(storage&&storage.length){
									storage.length=0;
								}
							},
						},
						trigger:{player:'damageEnd',source:'damageEnd'},
						firstDo:true,
						priority:996,
						direct:true,
						filter:function(event,player){
							if(player.storage.qishi === true)	return false;
							if(player.storage.qishi_date&&player.storage.qishi_date.contains(event.player))	return false;
							return true;
						},
						content:function(){
							if(!player.storage.qishi_date)	player.storage.qishi_date = [];
							player.storage.qishi_date.add(trigger.player);
							player.markSkill('qishi_date');
						},
					},
					update:{
						trigger:{global:'roundStart'},
						lastDo:true,
						priority:996,
						direct:true,
						filter:function(event,player){
							if(player.storage.qishi === true)	return false;
							return true;
						},
						content:function(){
							player.unmarkSkill('qishi_date');
						}
					},
				},
				ai:{
					combo:'huange',
				},
			},
			xiban:{
				trigger:{global:'phaseEnd'},
				priority:99,
				frequent:true,
				filter:function(event,player){
					return event.player!=player&&event.player.getHistory('sourceDamage').length&&player.hp<=player.storage.xhhuanshi.length;
				},
				check:function(event,player){
					return player.isDamaged()||get.attitude(player,event.player)<0;
				},
				logTarget:function(event,player){
					return event.player;
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCardButton('###『系绊』###可以弃置'+get.cnNumber(player.hp)+'张“士” 对'+get.translation(event.target)+'发动技能',player.hp,player.storage.xhhuanshi);
					'step 1'
					if(result.bool){
						event.cards = result.links.slice(0);
						player.unmarkAuto('xhhuanshi',event.cards);
						player.$throw(event.cards,1000);
						game.cardsGotoOrdering(event.cards);
					}
					else	event.finish();
					'step 2'
					var next = event.target.chooseToDiscard('he',event.cards.length);
					if(player.isHealthy()){	
						next.set('forced',true);
					}
					else{
						next.set('prompt2','取消则令'+get.translation(player)+'回复一点体力')
					}
					next.set('source',player);
					next.set('ai',function(card){
						var source = _status.event.source;
						var player = _status.event.player;
						if(source.isDamaged()&&get.recoverEffect(source,player,player)>=0)	return -1;
						return	7-get.value(card);
					});
					'step 3'
					if(!result.bool){
						player.recover(event.target);
					}
				},
				ai:{
					combo:'huange',
				},
			},
			yongtuan:{
				audio:true,
				skillAnimation:true,
				animationStr:'一袋米要扛几楼',
				unique:true,
				limited:true,
				zhuSkill:true,
				trigger:{player:'xibanAfter'},
				priority:66,
				filter:function(event,player){
					if(!player.hasZhuSkill('yongtuan')) return false;
					return event.cards.length;
				},
				content:function(){
					'step 0'
					var next = player.chooseTarget(true,function(card,player,tar){
						return tar.group==_status.event.player.group;
					});
					next.set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						result.targets[0].gain(trigger.cards);
						player.storage.yongtuan = true;
						player.awakenSkill('yongtuan');
					}
				},
				ai:{
					combo:'huange',
				},
			},

			//冷鸟
			niaoji:{
				audio:true,
				audioname:['jike'],
				trigger:{source:'damageEnd',player:'damageEnd'},
				priority:99,
				lastDo:true,
				check:function(event,player){
					if(event.source&&event.source == player)	return get.attitude(player,event.player)<1;
					return true;
				},
				frequent:true,
				prompt:function(event,player){
					if(event.source&&event.source == player)	return '对'+get.translation(event.player)+'造成伤害，'+get.prompt('niaoji');
					return '受到来自'+get.translation(event.source)+'的伤害，'+get.prompt('niaoji');
				},
				filter:function(event,player){
					return event.source;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.suit(result)=='spade') return 2;
						if(get.suit(result)=='heart') return 2;
						return -1;
					};
					event.target = (player==trigger.source)?trigger.player:trigger.source;
					if(!event.target||!event.target.isIn()||event.target.countCards('he')<=0){
						func=function(result){
							if(get.suit(result)=='spade') return 0;
							if(get.suit(result)=='heart') return 2;
							return -1;
						};
					}
					player.judge(func);
					'step 1'
					if(result.bool){
						event.num = player.maxHp-player.hp+1;
						if(result.suit=='spade'){
							if([player.name,player.name1].contains('Yousa')){
								var audio = 'niaoji_spade'+Math.ceil(3*Math.random());
								game.playAudio('skill',audio);
								game.broadcast(function(audio){
									game.playAudio('skill',audio);
								},audio);
							}
							player.discardPlayerCard('###『鸟肌』###弃置'+get.translation(event.target)+get.cnNumber(event.num)+'张牌',event.target,event.num,true,'he');
						}else if(result.suit=='heart'){
							if([player.name,player.name1].contains('Yousa')){
								var audio = 'niaoji_heart'+Math.ceil(3*Math.random());
								game.playAudio('skill',audio);
								game.broadcast(function(audio){
									game.playAudio('skill',audio);
								},audio);
							}
							player.draw(event.num);
						}
					}
				},
			},
			ysxiangxing:{
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					if(player.inRange(target)) return true;
				},
				content:function(){
					'step 0'
					var next = player.chooseCardButton('###『翔星』###按顺序将卡牌置于牌堆顶（先选择的在上）',player.getCards('h'),player.countCards('h'),true);
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==_status.event.player.countCards('h');
					});
					next.set('ai',function(button){
						if(get.suit(button.link)=='heart')	return 8+Math.random();
						if(get.suit(button.link)=='spade')	return 6+Math.random();
						return 4+Math.random();
					})
					'step 1'
					if(result.bool&&result.links&&result.links.length)	event.cards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 2'
					player.lose(event.cards,ui.special);
					'step 3'
					var cards = event.cards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
					'step 4'
					target.damage(player);
				},
				ai:{
					order:function(item,player){
						if(player.countCards('h',{suit:'heart'}))	return 4;
						else return 1;
					},
					result:{
						player:function(player,target){
							var num = -player.countCards('h');
							if(player.countCards('h',{suit:'heart'}))	num+=(player.maxHp-player.hp+1);
							return num;
						},
						target:function(player,target){
							if(target.hasSkill('shenyou')) return 0;
							return get.damageEffect(target,player,target);
						}
					},
					expose:0.2,
				},
			},


			//mishiro
			tianyi:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mark:true,
				intro:{
					name:'衣',
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
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return !player.getEquip(2);
				},
				filterCard:function(card,player){
					return true;
				},
				check:function(card){
					return 7-get.value(card);
				},
		//		selectTarget:-1,
		//		filterTarget:function(card,player,target){
		//			return player==target;
		//		},
				discard:false,
				visible:true,
				toStorage:true,
		//		prepare:'give',
				content:function(){
					'step 0'
					player.$give(cards,player,false);
					player.markAuto('tianyi',cards);
					game.log(player,'将',cards,'置于武将牌上');
				},
				group:['tianyi_drawBy','tianyi_cancelBy','tianyi_clear'],
				subSkill:{
					drawBy:{
						trigger:{player:'useCard',target:'useCardToTarget'},
						priority:77,
						lastDo:true,
						forced:true,
						filter:function(event,player){
							if(get.type2(event.card)!='trick')	return false;
							if(player.storage.tianyi_drawBy && player.storage.tianyi_drawBy.contains(get.suit(event.card)))	return false;
							return player.storage.tianyi.length && get.suit(player.storage.tianyi[0])!=get.suit(event.card);
						},
						content:function(){
							player.draw();
							if(!player.storage.tianyi_drawBy)	player.storage.tianyi_drawBy = [];
							player.storage.tianyi_drawBy.add(get.suit(trigger.card));
						}
					},
					cancelBy:{
						trigger:{target:'useCardToTarget'},
						priority:77,
						lastDo:true,
						check:function(event,player){
							return get.effect(player,event.card,event.player,player)<-1;
						},
						prompt:function(event){
							return '被'+get.translation(event.card)+'指定为目标，'+get.prompt('tianyi');
						},
						filter:function(event,player){
							if(get.type2(event.card)!='trick')	return false;
							return player.storage.tianyi.length && get.suit(player.storage.tianyi[0])==get.suit(event.card);
						},
						content:function(){
							'step 0'
							player.unmarkSkill('tianyi');
							'step 1'
							trigger.getParent().cancel();
							'step 2'
							player.gain(trigger.getParent().cards,'giveAuto');
						}
					},
					clear:{
						trigger:{global:['gameDrawAfter','phaseAfter'],player:['enterGame','phaseZhunbeiBegin']},
						direct:true,
						firstDo:true,
						content:function(){
							'step 0'
							if(trigger.name=='phase'){
								delete player.storage.tianyi_drawBy;
								event.finish();
							}
							else if(trigger.name=='phaseZhunbei'&&player.storage.tianyi.length){
								event.moveCard = true;
							}
							'step 1'
							player.unmarkSkill('tianyi');
							'step 2'
							if(event.moveCard==true){
								player.moveCard('###'+get.prompt('tianyi')+'###可以移动场上的一张牌');
							}
						}
					},
				},
				ai:{order:4,result:{player:1}},
			},
			nveyu:{
				trigger:{source:'damageEnd'},
				priority:77,
				usable:1,
				lastDo:true,
				forced:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					trigger.player.recover();
					'step 1'
					game.asyncDraw([player,trigger.player]);
					'step 2'
					player.storage.nveyu_eff = trigger.player;
					player.addTempSkill('nveyu_eff');
				},
				subSkill:{
					eff:{
						mark:'character',
						intro:{
							name:'虐语',
							content:'对$使用牌无距离与次数限制',
						},
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.nveyu_eff) return true;
							},
							cardUsableTarget:function (card,player,target){
								if(player.storage.nveyu_eff==target) return true;
							},
						},
						onremove:true,
					}
				},
				ai:{
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')==1&&!player.hasSkill('nveyu_eff')&&!target.hujia&&target.hp>1){
								if(target.hasSkillTag('maixie'))	return [1,1,0,3];
								return [1,1,0,1];
							}
						}
					}
				}
			},
			//tm
			gonggan:{
				trigger:{global:'phaseBegin'},
				priority:23,
				direct:true,
				filter:function(event,player){
					return event.player!=player&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt2('gonggan')).set('ai',function(card){
						if(get.number(card)>10)			return 8-get.value(card)+Math.random();
						if(player.countCards('h')>=3)	return 5-get.value(card)+Math.random();
						if(player.countCards('h')==1)	return -get.value(card)+Math.random();
						return 2-get.value(card)+Math.random();
					});
					'step 1'
					if(result.bool){
						player.logSkill('gonggan', trigger.player);
						event.card = result.cards[0];
						player.showHandcards('『奇癖共感』展示手牌');
						game.delay(1);
					}else{
						event.finish();
					}
					'step 2'
					var suitlist = [
						['heart', '', 'heart', 'heart', 'div2'],
						['diamond', '', 'diamond', 'diamond', 'div2'],
						['club', '', 'club', 'club', 'div2'],
						['spade', '', 'spade', 'spade', 'div2']
					];
					game.broadcastAll(function(id, suitlist){
						var dialog=ui.create.dialog('奇癖共感 声明');
						dialog.addText('花色');
						dialog.add([suitlist, 'vcard']);
						dialog.videoId = id;
					}, event.videoId, suitlist);
					'step 3'
					var next = trigger.player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						var num = 0
						_status.event.cards.forEach(function(card){
							if(get.suit(card)==button.link[2])	num++;
						})
						return num+Math.random();
					});
					next.set('cards',player.getCards('h'));
					'step 4'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.storage.gonggan = result.links[0][2];
						trigger.player.chat(get.translation(player.storage.gonggan));
						game.log(trigger.player,'猜测为',player.storage.gonggan)
					}else{
						event.finish();
					}
					'step 5'
					if(player.storage.gonggan==get.suit(event.card)){
						trigger.player.gain(event.card,player,'giveAuto');
						var suit = 'gonggan_'+get.suit(event.card);
						player.addTempSkill('gonggan_num'+get.number(event.card));
						player.addTempSkill(suit);
					}else{
						player.addTempSkill('gonggan_num12');
					}
				},
				subSkill:{
					heart:{
						marktext:'♥',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♥',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='heart') return 'heart';
							},
						}
					},
					spade:{
						marktext:'♠',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♠',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='spade') return 'spade';
							},
						}
					},
					diamond:{
						marktext:'♦',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♦',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='diamond') return 'diamond';
							},
						}
					},
					club:{
						marktext:'♣',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♣',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='club') return 'club';
							},
						}
					},
					num1:{
						marktext:'1',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为1',
						},
						mod:{
							number:function(card,player,number){
								return number=1;
							},
						},
					},
					num2:{
						marktext:'2',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为2',
						},
						mod:{
							number:function(card,player,number){
								return number=2;
							},
						},
					},
					num3:{
						marktext:'3',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为3',
						},
						mod:{
							number:function(card,player,number){
								return number=3;
							},
						},
					},
					num4:{
						marktext:'4',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为4',
						},
						mod:{
							number:function(card,player,number){
								return number=4;
							},
						},
					},
					num5:{
						marktext:'5',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为5',
						},
						mod:{
							number:function(card,player,number){
								return number=5;
							},
						},
					},
					num6:{
						marktext:'6',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为6',
						},
						mod:{
							number:function(card,player,number){
								return number=6;
							},
						},
					},
					num7:{
						marktext:'7',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为7',
						},
						mod:{
							number:function(card,player,number){
								return number=7;
							},
						},
					},
					num8:{
						marktext:'8',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为8',
						},
						mod:{
							number:function(card,player,number){
								return number=8;
							},
						},
					},
					num9:{
						marktext:'9',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为9',
						},
						mod:{
							number:function(card,player,number){
								return number=9;
							},
						},
					},
					num10:{
						marktext:'10',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为10',
						},
						mod:{
							number:function(card,player,number){
								return number=10;
							},
						},
					},
					num11:{
						marktext:'J',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为J',
						},
						mod:{
							number:function(card,player,number){
								return number=11;
							},
						},
					},
					num12:{
						marktext:'Q',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为Q',
						},
						mod:{
							number:function(card,player,number){
								return number=12;
							},
						},
					},
					num13:{
						marktext:'K',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为K',
						},
						mod:{
							number:function(card,player,number){
								return number=13;
							},
						},
					},
				},
			},
			yeyu:{
				group:['yeyu_sha','yeyu_trick'],
				subSkill:{
					sha:{
						trigger:{global:'useCard2'},
						priority:23,
						popup:false,
						filter:function(event,player){
							if(event.player==player||get.name(event.card)!='sha')	return false;
							return (get.name(event.card)=='sha')&&player.countDiscardableCards(player,'he');
						},
						prompt2:'你可以弃置一张点数大于此【杀】的牌取消之',
						content:function(){
							'step 0'
							var next=player.chooseToDiscard('he','弃置一张点数大于此【杀】的牌取消之');
							next.set('filterCard',function(card,player){
								return get.number(card,player)>_status.event.num;
							});
							next.set('num',get.number(trigger.card))
							'step 1'
							if(result.bool){
								player.logSkill('yeyu',trigger.player);
								trigger.cancel();
							}
						},
					},
					trick:{
						trigger:{global:'useCard2'},
						priority:23,
						popup:false,
						filter:function(event,player){
							var card=event.card;
							var info=get.info(card);
							if(info.allowMultiple==false) return false;
							if(event.player==player||get.type(event.card)!='trick')	return false;
							return event.targets&&event.targets.length&&player.countCards('h',{suit:'club'});
						},
						prompt2:'你可以重铸一张梅花牌为之增加或减少一名目标',
						content:function(){
							'step 0'
							var next=player.chooseCard('he','重铸一张梅花牌');
							next.set('filterCard',function(card,player){
								return get.suit(card,player)=='club';
							});
							'step 1'
							if(result.bool){
								player.logSkill('yeyu');
								player.lose(result.cards, ui.discardPile).set('visible', true);
								player.$throw(result.cards);
								game.log(player, '将', result.cards, '置入了弃牌堆');
								player.draw();
								var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
								player.chooseTarget(get.prompt('yeyu'),function(card,player,target){
									var player = _status.event.player;
									var source = _status.event.source;
									if(_status.event.targets.contains(target)) return true;
									return lib.filter.targetEnabled2(_status.event.card,source,target)&&lib.filter.targetInRange(_status.event.card,source,target);
								}).set('prompt2',prompt2).set('ai',function(target){
									var trigger=_status.event.getTrigger();
									var player=_status.event.player;
									var source = _status.event.source;
									return get.effect(target,trigger.card,source,player)*(_status.event.targets.contains(target)?-1:1);
								}).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player);
							}else{
								event.finish();
							}
							'step 2'
							if(!event.isMine()) game.delayx();
							event.targets=result.targets;
							'step 3'
							if(event.targets){
								player.logSkill('yeyu',event.targets);
								if(trigger.targets.contains(event.targets[0]))	trigger.targets.removeArray(event.targets);
								else trigger.targets.addArray(event.targets);
							}
						},
					},
				},
			},
			//花那
			huawen:{
				audio:2,
				init:function(player,skill){
					if(!player.storage[skill])	player.storage[skill]=[];
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0&&target.sex == 'female';
				},
				content:function(){
					'step 0'
					player.storage.huawen.add(target);
					event.list1 = player.getCards('h');
					//player.showCards(event.list1,'『花吻交染』展示手牌');
					event.list2 = target.getCards('h');
					//target.showCards(event.list2,'『花吻交染』展示手牌');
					game.broadcastAll(function(id, list1, list2, player, target){
						var dialog=ui.create.dialog('『花吻交染』交换花色、点数、种类相同的牌各一张');
						dialog.addText(get.translation(player)+'的手牌');
						dialog.add([list1, 'card']);
						dialog.addText(get.translation(target)+'的手牌');
						dialog.add([list2, 'card']);
						dialog.videoId = id;
					}, event.videoId, event.list1, event.list2, player, target);
					game.delay(1);
					'step 1'
					var next = player.chooseButton(true).set('target',target).set('list1',event.list1).set('list2',event.list2);
					next.set('dialog',event.videoId);
					next.set('selectButton',function(){
						if(ui.selected.buttons.length%2==1){
							return [ui.selected.buttons.length+1,ui.selected.buttons.length+1];
						}
						return [0,6];
					});
					next.set('filterButton',function(button){
						var now = button.link;
						var links = ui.selected.buttons.map(function(button){
							return button.link;
						})
						return _status.event.process(links,now);
						// if(ui.selected.buttons.length%2==1){
						// 	var now = button.link, pre = ui.selected.buttons[ui.selected.buttons.length-1].link;
						// 	if(event.list1&&event.list1.length&&event.list1.contains(now)&&event.list1.contains(pre))	return false;
						// 	if(event.list1&&event.list2.length&&event.list2.contains(now)&&event.list2.contains(pre))	return false;
						// 	if(ui.selected.buttons.length>2){
						// 		var from = ui.selected.buttons;
						// 		if(from.length>4){
						// 			if((get.type(from[0].link)==get.type(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
						// 			||(get.type(from[2].link)==get.type(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
						// 				return get.number(now)==get.number(pre);
						// 			if((get.number(from[0].link)==get.number(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
						// 			||(get.number(from[2].link)==get.number(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
						// 				return get.type(now)==get.type(pre);
						// 			if((get.number(from[0].link)==get.number(from[1].link)&&get.type(from[2].link)==get.type(from[3].link))
						// 			||(get.number(from[2].link)==get.number(from[3].link)&&get.type(from[0].link)==get.type(from[1].link)))
						// 				return get.suit(now)==get.suit(pre);
						// 		}else{
						// 			if(get.type(from[0].link)==get.type(from[1].link))	return get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre);
						// 			if(get.suit(from[0].link)==get.suit(from[1].link))	return get.type(now)==get.type(pre)||get.number(now)==get.number(pre);
						// 			if(get.number(from[0].link)==get.number(from[1].link))	return get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre);
						// 		}
						// 	}else{
						// 		return (get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre));
						// 	}
						// 	return false;
						// }
						// return true;
					});
					next.set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var player = _status.event.player;
						var target = _status.event.target;
						var list1 = _status.event.list1.slice(0);
						var list2 = _status.event.list2.slice(0);
						var cards = list1.concat(list2);
						var links = [];
						if(get.attitude(player,target)<0){
							var saves = list2.filter(function(card){
								return ['tao','jiu','zong'].contains(get.name(card))
							})
							if(target.hp==1||player.hp==1||saves.length){
								var dones = [];
								saves.forEach(function(save){
									list1.forEach(function(card){
										if(_status.event.process([save],card)){
											dones.add(save);
											dones.add(card);
										}
									})
								})
								links.addArray(dones.splice(0,2));
							}
						}else{
							var dones = [];
							for(var i=0;i<list1.length;i++){
								var done = [list1[i]];
								var choices = cards.slice(0).remove(list1[i]);
								for(var j=0;j<choices.length;j++){
									if(done.length==6)	break;
									if(_status.event.process(done,choices[j])){
										done.push(choices[j]);
										choices.remove(choices[j]);
										j = 0;
									}
								}
								if(done.length%2==1)	done.pop();
								dones.push(done);
							}
							if(dones.length>0){
								dones.sort(function(a,b){
									return b.length-a.length;
								});
								console.log(dones)
								links.addArray(dones[0]);
							}
						}
						return {
							bool:true,
							links:links,
						}
					});
					next.set('process',function(selected,now){
						var last = selected.slice(0);
						var over = {
							type2:0,
							suit:0,
							number:0
						};
						var going = [];
						var overOne = 0;
						if(last.length%2==1){
							var pack = selected[selected.length-1];
						}
						for(var i=0;i<last.length;i+=2){
							if(!last[i+1])	continue;
							var go = [];
							for(var j in over){
								if(get[j](last[i])==get[j](last[i+1])){
									go.add(j);
								}
							}
							if(!go.length)	continue;
							for(var j=0;j<go.length;j++){
								going.add(go[j]);
								over[go[j]]+=(1/go.length);
							}
						}
						var list1 = _status.event.list1;
						var list2 = _status.event.list2;
						for(var j in over){
							overOne = Math.max(over[j]-1,overOne);
						}
						if(!pack){
							if(list1.contains(now)){
								for(var i=0;i<list2.length;i++){
									for(var j in over){
										if(over[j]+overOne>=1||(going.contains(j)&&going.length*2<=last.length))	continue;
										if(get[j](list2[i])==get[j](now)){
											return true;
										}
									}
								}
							}
							if(list2.contains(now)){
								for(var i=0;i<list1.length;i++){
									for(var j in over){
										if(over[j]+overOne>=1||(going.contains(j)&&going.length*2<=last.length))	continue;
										if(get[j](list1[i])==get[j](now)){
											return true;
										}
									}
								}
							}
						}
						else{
							if(list1.contains(pack)){
								if(!list2.contains(now))	return false;
								for(var j in over){
									if(over[j]+overOne>=1||(going.contains(j)&&going.length*2<=last.length))	continue;
									if(get[j](pack)==get[j](now)){
										return true;
									}
								}
							}
							if(list2.contains(pack)){
								if(!list1.contains(now))	return false;
								for(var j in over){
									if(over[j]+overOne>=1||(going.contains(j)&&going.length*2<=last.length))	continue;
									if(get[j](pack)==get[j](now)){
										return true;
									}
								}
							}
						}
						return false;
					})
					// next.set('ai',function(button){
					// 	var now = button.link;
					// 	if(ui.selected.buttons.length/2==1&&ui.selected.buttons.length%2==1)		return 10;
					// 	if(event.list1&&event.list1.length&&event.list1.contains(now))	return 9-get.value(button.link,_status.event.player);
					// 	return get.value(button.link,_status.event.player);
					// });
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool&&result.links){
						var cards1 = result.links.slice(0);
						var cards2 = result.links.slice(0);
						cards1 = cards1.filter(function(card){
							return event.list1.contains(card);
						})
						cards2 = cards2.filter(function(card){
							return event.list2.contains(card);
						})
						if(cards1.length&&cards2.length&&cards1.length==cards2.length){
							event.num = cards1.length;
							player.gain(cards2,target,'giveAuto').set('visible', true);
							target.gain(cards1,player,'giveAuto').set('visible', true);
							game.asyncDraw([player,target],event.num)
						}
						if(!event.num||event.num<3){
							player.loseHp();
							target.loseHp();
						}
					}else{
						event.finish();
					}
				},
				group:'huawen_clear',
				ai:{
					order:8.5,
					result:{
						target:function (player,target){
							if(target.countCards('h')>=3){
								return 2;
							}
							else if(target.countCards('h')>=1){
								return 0;
							}
							else if(target.hp==1){
								return -2;
							}
							else{
								return -1;
							}
						},
						player:function(player,target){
							if(player.countCards('h')>=3){
								return 2;
							}
							else if(player.countCards('h')>=1){
								return 0;
							}
							else if(player.hp==1){
								return -1;
							}
							else{
								return -0.5;
							}
						},
					}
				},
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						priority:23,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.huawen&&player.storage.huawen.length){
								player.storage.huawen.length = 0;
							}
						}
					}
				},
			},
			liaohu:{
				audio:2,
				trigger:{global:'phaseEnd'},
				priority:23,
				filter:function(event,player){
					return player.getStat('damage');
				},
				check:function(event,player){
					if(player.storage.huawen&&player.storage.huawen.length){
						return get.recoverEffect(player.storage.huawen[0],player,player);
					}else{
						return get.recoverEffect(player,player,player);
					}
				},
				content:function(){
					if(player.getStat().skill.huawen!=undefined){
						if(player.storage.huawen&&player.storage.huawen.length){
							player.storage.huawen[0].recover();
						}
					}else{
						player.recover();
					}
				},
			},
			//elu
			huangran:{
				trigger:{player:'damageBegin4'},
				priority: 99,
				filter:function(event,player){
					return event.num>=2&&event.nature=='fire'&&game.hasPlayer(function(cur){
						return cur!=player&&get.distance(player,cur)<=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget('###『煌燃』###选择一名角色与自己平摊伤害',function(card,player,target){
						return target!=player&&get.distance(player,target)<=1;
					}).set('ai',function(target){
						return 1-get.attitude(player,target)+Math.random();
					});
					'step 1'
					if(result.bool){
						if(trigger.num%2==0){
							trigger.num/=2;
							result.targets[0].damage(trigger.num,trigger.source,'fire');
							event.finish();
						}else{
							trigger.num--;
							trigger.num/=2;
							result.targets[0].damage(trigger.num,trigger.source,'fire');
							player.chooseTarget(true,'###『煌燃』###分配多余的一点伤害').set('ai',function(target){
								return 1-get.attitude(player,target)<0+Math.random();
							});
						}
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						result.targets[0].damage(1,trigger.source,'fire');
					}
				},
				group:'huangran_drawBy',
				subSkill:{
					drawBy:{
						trigger:{global:'damageEnd'},
						priority: 99,
						forced:true,
						filter:function(event,player){
							if(event.player.hasSkill('huangran_shao')) 	return false;
							return event.nature=='fire'&&event.getParent().name=='huangran';
						},
						content:function(){
							player.draw();
							trigger.player.addTempSkill('huangran_shao','huangranAfter');
						},
					},
					shao:{},
				}
			},
			yinzhen:{
				group:['yinzhen_fire','yinzhen_contains','yinzhen_getC'],
				subSkill:{
					fire:{
						trigger:{global:'damageBegin1'},
						priority: 999,
						usable: 1,
						forced:	true,
				/*		filter:function(event,player){
							return player!=event.source;
						},*/
						content:function(){
							trigger.nature='fire';
						},
					},
					contains:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						trigger:{global:'phaseBefore'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.yinzhen_contains.length = 0;
							game.hasPlayer(function(cur){
								if(cur!=player){
									player.storage.yinzhen_contains.push(cur);
									player.storage.yinzhen_contains.push(get.distance(cur,player));
								}
							})
						},
					},
					getC:{
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							for(var i=0;i<(player.storage.yinzhen_contains.length);i+=2){
								if(get.distance(player.storage.yinzhen_contains[i],player)<player.storage.yinzhen_contains[i+1]){
									player.logSkill('yinzhen',player.storage.yinzhen_contains[i]);
									player.gainPlayerCard('h',player.storage.yinzhen_contains[i],true).set('visible', true);
								}
							}
						},
					},
					
				},
			},
			senhu:{
				group:['senhu_tengjia2'],
			//	group:['senhu_tengjia1','senhu_tengjia2','senhu_tengjia3'],
				locked:true,
				ai:{
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=7.5) return 0;
							}
							if(!target.isEmpty(2)) return;
							return lib.skill.bagua_skill.ai.effect.target.apply(this,arguments);
						}
					}
				},
				subSkill:{
					tengjia1:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia1',
						filter:function(event,player){
							if(!lib.skill.tengjia1.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
					tengjia2:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia2',
						filter:function(event,player){
							if(!lib.skill.tengjia2.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
					tengjia3:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia3',
						filter:function(event,player){
							if(!lib.skill.tengjia3.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
				}
			},
			//ssk
			tiaolian:{
				trigger:{player:'useCardToPlayer', target:'useCardToTarget'},
				usable:1,
				clickChange:'休眠',
				clickable:function(player){
					if(player.storage.tiaolian_clickChange===undefined)	player.storage.tiaolian_clickChange = false;
					else	player.storage.tiaolian_clickChange = !player.storage.tiaolian_clickChange;
				},
				clickableFilter:function(player){
					return player.storage.tiaolian_clickChange!==false;
				},
				filter:function(event,player){
					if(player.storage.tiaolian_clickChange===false)	return false;
					if(event.player==player&&!game.hasPlayer(function(cur){
						return event.targets.contains(cur)&&cur!=player&&player.canCompare(cur);
					}))	return false;
					if(event.player!=player&&!player.canCompare(event.player))	return false;
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(trigger.targets.contains(player)&&trigger.player!=player){
						player.chooseToCompare(trigger.player);
					}
					'step 1'
					if(trigger.targets.contains(player)&&trigger.player!=player){
						if(result.bool){
							trigger.getParent().targets.remove(player);
							game.log(trigger.card,'不会对',player,'生效');
							if(trigger.getParent().targets.length==0)	trigger.getParent().cancel();
						}else{
							trigger.getParent().directHit.add(player);
							game.log(player,'不能响应',trigger.getParent().card);
						}
						event.finish();
					}
					'step 2'
					event.targets = trigger.targets;
					var next = player.chooseTarget('###『咆咲』###选择拼点的对象',true);
					next.set('filterTarget',function(card,player,target){
						return player.canCompare(target)&&_status.event.targets.contains(target);
					})
					next.set('selectTarget',[1,Infinity]);
					next.set('multitarget',true);
					next.set('multiline',true)
					next.set('targets',event.targets);
					'step 3'
					if(result.bool){
						player.chooseToCompare(result.targets).callback=lib.skill.tiaolian.callback;
					}
				},
			//	chat:['粗鄙之语','天地不容','谄谀之臣','皓首匹夫，苍髯老贼','二臣贼子','断脊之犬','我从未见过有如此厚颜无耻之人！'],
				callback:function(){
					if(event.num1<=event.num2){
			//			target.chat(lib.skill.tiaolian.chat[Math.floor(Math.random()*5)]);
						event.getParent().getTrigger().excluded.add(target);
						game.log(event.getParent().getTrigger().card,'不会对',target,'生效');
						game.delay();
					}
					else{
						event.getParent().getTrigger().directHit.add(target);
						game.log(target,'不能响应',event.getParent().getTrigger().card);
						game.delay();
					}
				},
			},
			jiaku:{
				trigger:{player:['chooseToCompareAfter','compareMultipleAfter'],target:['chooseToCompareAfter','compareMultipleAfter']},
				forced: true,
				filter:function(event,player){
					return !event.iwhile;
				},
				content:function(){
					if(player==trigger.player){
						if(trigger.num1>trigger.num2){
							player.gainPlayerCard('###『生笹』###获得对方的一张牌',trigger.target,true);
						}
						else{
							player.draw();
						}
					}else{
						if(trigger.num2>trigger.num1){
							player.gainPlayerCard('###『生笹』###获得对方的一张牌',trigger.player,true);
						}
						else{
							player.draw();
						}
					}
				},
			},
			//lize
			shencha:{
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return true;
				},
				check:function(event,player){
					return player.countCards('j')>0;
				},
				content:function(){
					'step 0'
					event.num = 3+player.countCards('j');
					event.getE = (player.countCards('e')==0);
					'step 1'
					event.cards = get.cards(event.num)
					'step 2'
					var prompt2 = '获得其中至多两张基础牌';
					var selectButton = [0,2]
					if(event.getE){
						prompt2+=',装备其中至多两张装备牌';
						selectButton[1]+=2;
					}
					var next =  player.chooseCardButton(event.cards,'###『审查』###'+prompt2);
					next.set('selectButton',selectButton)
					next.set('filterButton',function(button){
						var type = get.type2(button.link);
						var geting = [0,0]
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.type2(ui.selected.buttons[i].link)=='basic') geting[0]++;
							if(get.type2(ui.selected.buttons[i].link)=='equip') geting[1]++;
						}
						return (type=='basic'&&geting[0]<2)||(_status.event.getE&&type=='equip'&&geting[1]<2);
					});
					next.set('getE',event.getE)
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player)+Math.random();
					});
					'step 3'
					if(result.bool&&result.links.length){
						var cards = result.links.slice(0);
						event.cards.removeArray(cards);
						var basics = cards.filter(function(card){
							return get.type(card)=='basic'
						});
						var equips = cards.filter(function(card){
							return get.type(card)=='equip'
						});
						player.gain(basics,'gain2');
						equips.forEach(function(equip){
							player.equip(equip);
						});
					}
					'step 4'
					player.skip('phaseDraw');
					if(event.cards.length==0)	event.finish();
					if(event.cards.length==1)	event.goto(7);
					'step 5'
					player.chooseCardButton('###『权力审查』###请选择置于牌堆底的顺序（先选择的在下）',event.cards,event.cards.length,true);
					'step 6'
					event.cards = result.links.slice(0);
					'step 7'
					game.log(player,'将'+get.cnNumber(event.cards.length)+'张牌置于牌堆底');
					while(event.cards.length){
						var card=event.cards.pop();
						card.fix();
						ui.cardPile.appendChild(card);
					}
				},
			},
			helesta:{
				audio:'yubing',
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player,name){
					return event.num&&player.countDiscardableCards(player,'e');
				},
				content:function(){
					'step 0'
					player.discardPlayerCard('###'+get.prompt('helesta')+'###可以弃置装备区的一张牌使伤害-1',player,'e').set('ai',function(){
						if(player.isDamaged()||player.countCards('e')==1)	return 5+Math.random();
						return Math.random()-0.2;
					});
					'step 1'
					if(result.bool){
						trigger.num--;
					};
				},
				ai:{
					noe:true,
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
						}
					}
				},
				// mod:{
				// 	aiValue:function(player,card,num){
				// 		if(game.roundNumber>1&&get.type(card)=='equip'&&!get.cardtag(card,'gifts')){
				// 			if(get.position(card)=='e') return num/player.hp;
				// 			return num*player.hp;
				// 		}
				// 	},
				// },
				group:'helesta_iceshaBy',
				subSkill:{
					iceshaBy:{
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							return evt&&evt.es&&evt.es.length>0&&player.hasUseTarget({name:'sha',nature:'ice',isCard:true});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseUseTarget('###'+get.prompt('helesta')+'###视为使用一张冰【杀】并摸一张牌',{name:'sha',nature:'ice',isCard:true},false);
							'step 1'
							if(result.targets&&result.targets.length){
								player.logSkill('helesta');
								player.draw();
							}
						},
					}
				},
			},
			//ange
			chuangzuo:{},
			//露露
			zhongli:{
				audio:3,
				audioname:['jike'],
				mark:true,
				intro:{
					name:'本回合因『重力牵引』获得的牌',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{player:'phaseUseAfter'},
				priority:99,
				lastDo:true,
				forced:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.type(result)=='equip') return 2;
						return 0;
					};
					player.judge(func).callback=lib.skill.zhongli.callback;
					'step 1'
					if(result.judge>0){
						if(!event.cards)	event.cards = [];
						event.cards.add(result.card);
						event.goto(0);
					}
					'step 2'
					if(event.cards&&event.cards.length){
						for(var i =0;i<event.cards.length;i++){
							if(!player.storage.zhongli.contains(event.cards[i])){
								event.newPhaseUse = true;
							}
						}
					}else{
						event.finish();
					}
					'step 3'
					if(event.newPhaseUse){
						player.markAuto('zhongli',event.cards);
						if(player.maxHp>1)	player.loseMaxHp();
						player.phaseUse();
					}
					'step 4'
					var stat = player.getStat();
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
				callback:function(){
					if(get.type(event.judgeResult.name)=='equip'){
						player.gain(card,'gain2');
						// event.judgeResult.judge = 2;
					}
				},
				group:'zhongli_clear',
				subSkill:{
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						lastDo:true,
						priority:666,
						content:function(){
							player.unmarkSkill('zhongli');
						}
					},
				}
			},
			xinhuo:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>=2;
				},
				content:function(){
					'step 0'
					var next = player.chooseCardButton('###『薪火相传』###按顺序将卡牌置于牌堆顶（先选择的在上）',player.getCards('he'),2);
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==2;
					});
					next.set('ai',function(button){
						if(get.type(button.link)=='equip'){	
							if(typeof get.info(button.link).onLose=='function') return 10+Math.random();
							else return 7+Math.random();
						}
						if(get.name(button.link)=='sha'&&player.countCards('h',{name:'sha'})==1)	return 0;
						return 7-get.value(button.link)/2+Math.random();
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length)	event.cards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 2'
					game.log(player,'把两张牌放在了牌堆顶');
					player.lose(event.cards,ui.special);
					'step 3'
					var cards = event.cards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
					'step 4'
					if(player.hasSkill('xinhuo_chuanhuo')){
						player.storage.xinhuo_chuanhuo++;
						player.updateMarks();
					}else{
						player.addTempSkill('xinhuo_chuanhuo');
						player.storage.xinhuo_chuanhuo = 1;
						var buff = '.player_buff';
						game.broadcastAll(function(player, buff){
							player.node.xinhuo= ui.create.div(buff ,player.node.avatar);
						}, player, buff);
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.type2(card)=='trick'&&get.info(card).notarget!==true&&!player.needsToDiscard()){
							var evt=player.getStat().card;
							for(var i in evt){
								if(evt[i]&&get.type2(evt[i])=='trick'){
									return num-7;
								}
							}
						}
					},
				},
				ai:{
					order:function(item,player){
						var cards =  Object.entries(player.getStat().card);
						for(var i=0;i<cards.length;i++){
							if(get.type(cards[i][0])=='basic'){
								if(player.hasSha()&&player.countCards('he')>=3&&(!player.storage.xinhuo_chuanhuo||player.storage.xinhuo_chuanhuo<2)){
									return 7.1;
								}
							}
						}
						return 0;
					},
					result:{player:1},
				},
				subSkill:{
					chuanhuo:{
						audio:3,
						trigger:{player:'useCard'},
						forced:true,
						onremove:function(player){
							if(player.node.xinhuo){
								player.node.xinhuo.delete();
								delete player.node.xinhuo;
							}
							player.unmarkSkill('xinhuo_chuanhuo');
							delete player.storage.xinhuo_chuanhuo;
						},
						mod:{
							selectTarget:function(card,player,range){
								if(range[1]==-1) return;
								range[1]+=player.storage.xinhuo_chuanhuo;
							},
							cardUsable:function(card,player,num){
								return true;
							},
							targetInRange:function(card,player,target,now){
								return true;
							},
						},
						content:function(){
							player.removeSkill('xinhuo_chuanhuo');
						},
						mark:true,
						intro:{
							content:'下一张使用的牌无距离和次数限制且可额外指定$名目标',
							markcount:function(storage,player){
								return player.storage.xinhuo_chuanhuo;
							}
						},
						ai:{
							useSha:1,
						}
					},
				},
			},
			weizhuang:{
				audio:2,
				trigger:{player:'useCardAfter'},
				locked:true,
				direct:true,
				lastDo:true,
				filter:function(event,player){
					return (get.type2(event.card)=='trick' || get.type2(event.card)=='basic')&&event.targets.length>0;
				},
				content:function(){
					'step 0'
					if(!player.hasMark('weizhuang')){
						player.markSkill('weizhuang');
					}
					'step 1'
					if(get.type2(trigger.card)=='basic'&&player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='basic';
					}).length>1){
						player.logSkill('weizhuang');
						player.draw(trigger.targets.length);
					}else if(get.type2(trigger.card)=='trick'&&player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='trick';
					}).length>1){
						player.logSkill('weizhuang_discard');
						player.chooseToDiscard(trigger.targets.length,'he',true)
					}
				},
				mark:true,
				intro:{
					content:'使用基本牌/锦囊牌指定目标时，摸/弃X张牌（X为此牌指定的目标数）',
					onunmark:true,
				},
				group:['weizhuang_clear'],
				subSkill:{
					discard:{},
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						firstDo:true,
						priority:666,
						content:function(){
							player.unmarkSkill('weizhuang');
						}
					},
				},
			},
			//社长
			liebo:{
				trigger:{player:'useCardBefore'},
				filter:function(event,player){
					return get.color(event.card,player)=='black';
				},
				priority:12,
				forced:true,
				content:function(){
					if(!trigger.directHit)	trigger.directHit = [];
					trigger.directHit.addArray(game.players);
				},
				ai:{
					threaten:1.5,
					effect:{
						player:function(card,player,target,current){
							if(get.color(card)=='black'&&get.tag(card,'damage')){
								if(player.countDiscardableCards(target,'e'))	return [1,-0.5,1,-1];
								return [1,1,1,-1];
							}
						}
					}
				},
				group:'liebo_drawBy',
				subSkill:{
					drawBy:{
						trigger:{source:'damage'},
						filter:function(event,player){
							var evt = event.getParent();
							if(evt.name=='_lianhuan')	evt = event.getTrigger().getParent(2);
							else	evt = evt.getParent();
							if(evt.addedSkill&&evt.addedSkill.contains('liebo'))	return false;
							return get.color(event.card,player)=='black';
						},
						priority:12,
						forced:true,
						content:function(){
							'step 0'
							var evt = trigger.getParent();
							if(evt.name=='_lianhuan')	evt = trigger.getTrigger().getParent(2);
							else	evt = evt.getParent();
							if(!evt.addedSkill)	evt.addedSkill = [];
							evt.addedSkill.add('liebo');
							player.draw();
							'step 1'
							game.broadcastAll(function(player,target){
								player.discardPlayerCard('e',target);
							},trigger.player,player)
						},
					},
				},
				ai:{
					threaten:1.5
				}
			},
			zhongjizhimeng:{
				audio:true,
				audioname:['jike'],
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					var next = player.chooseCard('h',true,'『重机织梦』：展示一张手牌');
					next.set('ai',function(card){
						var player = _status.event.player;
						if(get.suit(card)=='red'&&player.hasUseTarget(card))	return 5+get.order(card);
						if(player.hasUseTarget(card))	return 2+get.order(card);
						return 6-get.value(card);
					})
					'step 1'
					if(result.bool){
						event.cards = result.cards;
						player.showCards(event.cards,'『重机织梦』展示手牌');
						player.addGaintag(event.cards,'zhongjizhimeng')
					}else{
						event.finish();
					}
				},
				mod:{
					color:function(card,player,color){
						if(!card.cards||card.cards.length!=1) return;
						for(var i of card.cards){
							if(i.hasGaintag('zhongjizhimeng')){
								if(color=='red')	return 'black';
								else if(color=='black')	return 'red';
							}
						}
					},
				},
				ai:{order:10,player:1},
				group:['zhongjizhimeng_lose','zhongjizhimeng_clear'],
				subSkill:{
					lose:{
						trigger:{player:'loseAfter'},
						filter:function(event,player){
							for(var i in event.gaintag_map){
								if(event.gaintag_map[i].contains('zhongjizhimeng')) return true;
							}
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget('###'+get.prompt('zhongjizhimeng')+'###令一名角色回复1点体力或摸两张牌').set('ai',function(target){
								return get.attitude(_status.event.player,target);
							});
							'step 1'
							if(result.bool){
								event.target = result.targets[0]
								event.target.classList.add('glow');
							}else{
								event.finish();
							}
							'step 2'
							var controls=['摸两张牌','回复一点体力','取消选择'];
							player.chooseControl(controls).set('ai',function(){
								return _status.event.index;
							}).set('index',0);
							'step 3'
							event.target.classList.remove('glow');
							switch(result.index){
								case 0:{
									player.logSkill('zhongjizhimeng',event.target);
									event.target.draw(2);
									break;
								}
								case 1:{
									player.logSkill('zhongjizhimeng',event.target);
									event.target.recover(player);
									break;
								}
								case 2:{
									event.goto(0);
									break;
								}
							}
						}
					},
					clear:{
						trigger:{player:['phaseAfter']},
						direct:true,
						firstDo:true,
						content:function(){
							player.removeGaintag('zhongjizhimeng');
						}
					},
				},
			},
			//阿喵喵
			miaomiao:{
				trigger:{source:'damageBegin3'},
				priority:3,
				direct:true,
				filter:function(event,player){
					return event.num == 1;
				},
				content:function(){
					'step 0'
					var check = 1;
					check -= get.recoverEffect(trigger.player,player,player);
					player.chooseTarget('『流泪喵喵』：令目标摸两张牌（取消则改本次伤害为回复）',function(card,player,target){
						return target==_status.event.target0;
					}).set('ai',function(target){
						if(_status.event.check>0)	return 0;
						return 1;
					}).set('check',check).set('target0',trigger.player);
					'step 1'
					if(result.bool){
						result.targets[0].draw(2);
						event.goto(3);
					}else{
						trigger.cancel(true);
					}
					'step 2'
					trigger.player.recover(player);
					'step 3'
					if(player.hasSkill('chengneng_used')){
						player.draw();
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&!player.needsToDiscard()){
							return num-10;
						}
					},
				},
				ai:{
					notricksource:true,
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')==1){
								var num = get.recoverEffect(target,player,player);
								return [0,num,0,num];
							}
						}
					}
				}
			},
			chengneng:{
				trigger:{global:'damageBegin3'},
				priority:3,
				direct:true,
				filter:function(event,player){
					return event.num&&event.player!=player&&player.countDiscardableCards(player,'he');
				},
				check:function(event,player){
					if(event.num==1)	 return get.recoverEffect(event.player,player,player);
					return 0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('chengneng'),'he')
					'step 1'
					if(result.bool){
						player.addTempSkill('chengneng_used')
						if(trigger.source==player)	event.goto(3);
					}else{
						event.finish();
					}
					'step 2'
					trigger.source = player;
					event.finish();
					'step 3'
					trigger.cancel();
					'step 4'
					trigger.player.loseHp(trigger.num);
				},
				subSkill:{
					used:{
						mark:true,
						marktext:"龙",
						intro:{
							name:'逞能龙息',
							content:'本回合已发动『逞能龙息』',

						}
					}
				},
			},
			//下巴
			shenglang:{
				enable:'phaseUse',
				viewAs:{name:'juedou'},
				usable:1,
				filter:function(event,player){
					return player.hasCard(function(card){
						return get.name(card)=='sha';
					});
				},
				filterCard:function(card,player){
					return get.name(card)=='sha';
				},
				check:function(card){
					return 8-get.value(card);
				},
				ai:{
					basic:{
						order:10
					},
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='directHit_ai'){
							if(arg&&get.name(arg.card)=='juedou') return true;
							return false;
						}
					},
					result:{player:1},
				},
				group:'shenglang_drawBy',
				subSkill:{
					drawBy:{
						trigger:{player:'phaseEnd'},
						priority:7,
						direct:true,
						filter:function(event,player){
							var num = 0,going = 0;
							game.getGlobalHistory('cardMove',function(evt){
								if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
								if(evt.player==player)	going++;
								if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
								for(var i=0;i<evt.cards.length;i++){
									var card=evt.cards[i];
									if(get.name(card)=='sha'&&get.suit(card)=='spade')	num++;
								}
							},event);
							return going&&num;
						},
						content:function(){
							var num = 0;
							game.getGlobalHistory('cardMove',function(evt){
								if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
								if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
								for(var i=0;i<evt.cards.length;i++){
									var card=evt.cards[i];
									if(get.name(card)=='sha'&&get.suit(card)=='spade')	num++;
								}
							},event);
							event.num = num;
							player.logSkill('shenglang');
							player.draw(event.num);
						}
					}
				}
			},
			nodao:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.getEquip(1)&&player.countCards('h','sha')>0;
				},
				filterCard:{name:'sha'},
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(result&&get.itemtype(event.cards)=='cards'){
						for(var i=0;i<result.length;i++)
						if(get.subtype(result[i])=='equip1'){
							event.card = result[i];
							player.chooseBool('『无刀之咎』：是否装备'+get.translation(event.card)+'并回复一点体力？');
						}
					}
					'step 2'
					if(result.bool){
						player.equip(event.card);
						player.recover();
					}
				},
				ai:{
					basic:{
						order:2
					},
					result:{
						player:function(player,target){
							if(player.getStat().card.juedou)	return 1;
							else return 0.5;
						},
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.subtype(card)=='equip1') return (num>1?1:num);
					},
					aiValue:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.subtype(card)=='equip1') return num/10;
						if(get.itemtype(card)=='card'&&player.getStat().card.juedou&&get.name(card)=='sha') return num/10;
					},
				},
			},
			//奈罗花
			ming_echi:{},
			echi:{
				trigger:{
					global:"gainAfter",
				},
				direct:true,
				filter:function (event,player){
					if(event.player==player)	return false;
					var evt=event.getParent('phaseDraw');
					if(!evt||evt.name!='phaseDraw'){
						return event.cards&&event.cards.length>0&&event.player.hp>=player.hp;
					}
				},
				content:function(){
					'step 0'
					event.tar = trigger.player;
					var check = get.attitude(player,event.player)<0;
					player.chooseCard(get.prompt2('echi',event.tar),function(card,player,target){
						return !card.hasGaintag('ming_');
					}).set('logSkill',['echi',event.tar]).set('ai',function(card){
						if(!_status.event.check)	return 0;
						if(get.type(card)=='equip')		return 12-get.value(card);
						return 8-get.value(card);
					}).set('check',check);
					'step 1'
					if(result.bool){
						event.cardtype = get.type2(result.cards[0])
						player.showCards(result.cards,'『阿斥』：亮出手牌');
						player.addGaintag(result.cards,'ming_echi');
						player.$give(result.cards,player,false);
						game.delayx();
					}
					else event.finish();
					'step 2'
					var type = event.cardtype;
					event.tar.chooseToDiscard('弃置一张为'+get.translation(type)+'牌的牌或失去一点体力',function(card,player,target){
						return get.type2(card)==_status.event.type;
					}).set('ai',function(card){
						if(player.hp==1)	return 11-get.value(card);
						return 6-get.value(card);
					}).set('type',type);
					'step 3'
					if(!result.bool){
						event.tar.loseHp();
					}
				}
			},
			mudu:{
				trigger:{
					global:['phaseZhunbeiEnd','phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd','phaseJieshuEnd']
				},
				filter:function(event,player){
					if(event.player==player||event.player.countCards('he')<2)	return false;
					if(player.getHistory('lose',function(evt){
						return evt.getParent(event.name)==event;
					}).length>=1) return true;
					return false;
				},
				check:function(event,player){
					return get.attitude(player,event.player)<=0;
				},
				popup:false,
				content:function(){
					'step 0'
					event.tar = trigger.player;
					player.choosePlayerCard(event.tar, 'he', 2, '移除'+get.translation(event.tar)+'两张牌',true).set('ai',function(button){
						var info = get.info(button.link);
						if(info.onLose&&get.position(button.link)=='e')		return 0;
						return get.value(button.link,player,'raw');
					}).set('logSkill',['mudu',event.tar]);
					'step 1'
					if(result&&get.itemtype(result.links)=='cards'){
						var str = 'mudu_card'+player.playerid;
						if(event.tar.storage[str]){
							event.tar.storage[str] = event.tar.storage[str].concat(result.links);
						}
						else {
							event.tar.storage[str] = result.links.slice(0);
						}
						event.tar.addSkill('mudu_card');
						event.tar.lose(result.links,ui.special,'toStorage');
					}
				},
				subSkill:{
					card:{
						mark:true,
						trigger:{
							global:'phaseEnd'
						},
						filter:function(event,player){
							return true;
						},
						forced:true,
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
							'step 0'
							var keys = Object.keys(player.storage);
							for(var i=0;i<keys.length;i++){
								if(keys[i].indexOf('mudu_card')==0)	keys[i]=keys[i].slice(9);
								else keys.splice(i--,1);
							}
							event.keys = keys;
							'step 1'
							var key = event.keys.pop();
							var source = game.filterPlayer(function(cur){return cur.playerid==key});
							var str = 'mudu_card'+key;
							if(!source.length){
								player.gain(player.storage[str],'fromStorage');
								delete player.storage[str];
							}
							else{
								source = source[0];
								player.chooseButton(['选择收回的牌',player.storage[str],'hidden'],true).set('callback',function(player,result){
									var cards = player.storage[str].slice(0).removeArray(result.links);
									var source = _status.event.source;
									player.gain(result.links);
									if(source.isIn()){
										player.$give(cards,source);
										source.gain(cards);
									}
									delete player.storage[str];
								}).set('source',source);
							}
							if(event.keys.length>0)	event.redo();
							else player.removeSkill('mudu_card');
						},
					},
				},
				ai:{
					threaten:1.3
				}
			},
			//远北千南
			yingkuo:{
				trigger:{
					player:['gainAfter','equipAfter'],
				},
				direct:true,
				filter:function (event,player){
					if(event.name=='equip'&&event.swapped)	return false;
					return game.hasPlayer(function(cur){
						if(cur==player)		return false;
						if(event.name=='equip')	return cur.countCards('e')==player.countCards('e');
						else	return cur.countCards('h')==player.countCards('h');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yingkuo'),function(card,player,target){
						if(player==target) return false;
						if(_status.event.type=='equip')	return target.countCards('e')==player.countCards('e');
						else	return target.countCards('h')==player.countCards('h');
					}).set('ai',function(target){
						return -get.attitude2(target);
					}).set('type',trigger.name);
					'step 1'
					if(result.bool){
						event.tar = result.targets[0];
						player.logSkill('yingkuo',event.tar);
						console.log((trigger.name=='equip'?'e':'h'))
						event.tar.chooseToDiscard((trigger.name=='equip'?'e':'h'),true);
					}
				}
			},
			shengni:{
				enable:'chooseToUse',
				viewAs:function(cards,player){
					if(player.storage.shengni_cardsDis){
						var cur = player.storage.shengni_cardsDis[0];
						return {
							name:get.name(cur),
							suit:get.suit(cur),
							number:get.number(cur),
							nature:get.nature(cur),
						};
					}
					return null;
				},
				filter:function(event,player){
					var filter=event.filterCard;
					return player.storage.shengni_cardsDis&&filter(player.storage.shengni_cardsDis[0],player,event);
				},
				check:function(card){
					var player=_status.event.player;
					return player.getUseValue(player.storage.shengni_cardsDis[0])>player.getUseValue(card);
				},
				filterCard:function(card,player,event){
					if(player.hasSkill('shengni_used')) return true;
					return false;
				},
				selectCard:function(){
					var player=_status.event.player;
					if(player.hasSkill('shengni_used')) return 1;
					return -1;
				},
				precontent:function(){
					player.addTempSkill('shengni_used');
				},
				ignoreMod:true,
				position:'h',
				group:['shengni_cardsDis','shengni_cardsDis2'],
				subSkill:{
					used:{},
					cardsDis:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						marktext:'拟',
						intro:{
							name:'声拟',
							content:function(storage,player){
								if(!storage)	return '上一次进入弃牌堆的牌不满足条件';
								return '上一次进入弃牌堆的基本牌/通常锦囊牌为'+get.translation(storage);
							}
						},
						sub:true,
						trigger:{global:['loseAfter','cardsDiscardAfter']},
						direct:true,
						filter:function(event,player){
							if(event.name=='cardsDiscard'&&(event.getParent().name!='orderingDiscard'
							||(!event.getParent().relatedEvent||!event.getParent().relatedEvent.player||event.getParent().relatedEvent.name=='judge'
							||event.getParent().relatedEvent.player==player)))	return false;
							if(event.name=='lose'&&(event.position!=ui.discardPile
							||event.player==player))	return false;
							return event.cards.filter(function(card){
								return get.position(card,true)=='d'&&['basic','trick'].contains(get.type(card));
							}).length>0;
						},
						content:function(){
							var cards = trigger.cards.filter(function(card){
								return get.position(card,true)=='d'&&['basic','trick'].contains(get.type(card));
							});
							player.storage.shengni_cardsDis = [cards.pop()];
							player.markSkill('shengni_cardsDis');
						},
					},
					cardsDis2:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						sub:true,
						trigger:{global:['loseAfter','cardsDiscardAfter']},
						direct:true,
						firstDo:true,
						filter:function(event,player){
							return event.cards.filter(function(card){
								return get.position(card,true)=='d';
							}).length>0;
						},
						content:function(){
							delete player.storage.shengni_cardsDis;
							player.markSkill('shengni_cardsDis');
						},
					},
				},
				ai:{
					threaten:1.3
				}
			},
			//凛月
			zhuqiao:{
				audio:5,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.zhuqiao<24;
				},
				check:function(card,cards){
					var player=_status.event.player;
					if(player.storage.zhuqiao_addCard&&player.storage.zhuqiao_addCard.contains(get.suit(card)))	return 6-get.value(card);
					return 9-get.value(card);
				},
				filterCard:true,
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				position:'he',
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					player.draw();
					player.storage.zhuqiao += get.number(cards[0]);
					if(!player.hasSkill('zhuqiao_addCard'))		player.addTempSkill('zhuqiao_addCard');
					if(!player.storage.zhuqiao_addCard)			player.storage.zhuqiao_addCard = [];
					player.storage.zhuqiao_addCard.add(get.suit(cards[0]));
					player.markSkill('zhuqiao_addCard');
				},
				ai:{
					basic:{
						order:1,
					},
					result:{
						player:0.5,
					},
					threaten:1.5
				},
				group:['zhuqiao_clear'],
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						priority:24,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.zhuqiao = 0;
						},
					},
					addCard:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						mark:true,
						intro:{
							content:'本回合重铸牌的花色：$',
						},
						trigger:{player:'phaseEnd'},
						priority:24,
						direct:true,
						filter:function(event,player,name){
							return game.countPlayer(function(cur){
								return player.storage.zhuqiao_addCard.length>cur.countCards('h');
							});
						},
						onremove:function(player){
							delete player.storage.zhuqiao_addCard;
						},
						content:function(){
							'step 0'
							event.num = player.storage.zhuqiao_addCard.length;
							player.chooseTarget('###'+get.prompt('zhuqiao')+'###令一名角色将手牌数补至'+get.cnNumber(event.num)+'张',function(card,player,target){
								return _status.event.num>target.countCards('h');
							}).set('ai',function(target){
								var player = _status.event.player;
								return (_status.event.num-target.countCards('h'))*get.attitude(player,target);
							}).set('num',event.num)
							'step 1'
							if(result.bool&&result.targets&&result.targets.length){
								event.target = result.targets[0];
								player.logSkill('zhuqiao',event.target);
								event.target.gain(get.cards(event.num-event.target.countCards('h')),'draw')
							}
						},
					},
				}
			},
			//开司
			pojie:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				trigger:{
					global:['loseAfter','equipAfter'],
				},
				marktext:"戒",
				mark:true,
				intro:{
					content:'弃牌阶段改为弃置#张牌',
				},
				filter:function(event,player){
					if(player!=_status.currentPhase)	return false;
					if(event.name=='equip'){
						return true;
					}
					return event.es&&event.es.length>0;
					// var evt=event.getl(event.player);
					// console.log(evt)
					// return evt&&evt.es&&evt.es.length>0;
				},
				content:function(){
					player.draw();
					player.addMark('pojie',1,false);
				},
				group:'pojie_phaseDiscard',
				subSkill:{
					phaseDiscard:{
						trigger:{player:['phaseDiscardBegin','phaseEnd']},
						direct:true,
						lastDo:true,
						priority:2,
						filter:function(event,player){
							return player.storage.pojie>0;
						},
						content:function(){
							'step 0'
							if(trigger.name=='phaseDiscard'){
								player.logSkill('pojie');
								if(!trigger.num)	trigger.num = player.storage.pojie;
							}
							'step 1'
							player.storage.pojie = 0;
							player.unmarkSkill('pojie');
						},

					},
				},
			},
			dazhen:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player,cards){
					return player.getEquip(1);
				},
				filterCard:function(card,player){
					return get.subtype(card) == 'equip1';
				},
				discard:false,
				lose:false,
				position:'e',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					'step 0'
					player.$give(cards,target,false);
					target.equip(cards[0]);
					'step 1'
					event.num =Math.abs(player.getHandcardLimit()-player.countCards('h'));
					target.chooseToDiscard('『大振』：需要弃置'+get.cnNumber(event.num)+'张牌',event.num,'he',true);
				},
				ai:{
					order:6,
					result:{
						target:function (player,target){
							if(player.countCards('h')>player.getHandcardLimit()){
								return -1;
							}
							else{
								return 0;
							}
						},
						player:function(player,target){
							if(target.getEquip(1))	return 1;
							else return -0.5;
						},
					},
					threaten:1.2,
				},
			},
			//早见咲
			tuncai:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = true;
				},
				trigger:{
					player:'discardAfter',
					global:'drawAfter',
				},
				round:1,
				filter:function(event,player){
					if(event.name=='draw')	return event.player!=player&&player.storage.tuncai;
					else	return event.cards.length&&!player.storage.tuncai;
				},
				check:function(event,player){
					if(player.storage.tuncai==true)	return event.num>=2;
					return true;
				},
				popup:false,
				content:function(){
					'step 0'
					if(trigger.name=='draw'){
						player.logSkill('tuncai',player);player.draw(trigger.num);player.storage.tuncai = !player.storage.tuncai;event.finish();
					}
					else	player.chooseTarget(get.prompt2('tuncai'),function(card,player,target){
						if(player==target) return false;
						return target.countCards('he');
					}).set('ai',function(target){
						return -get.attitude2(target);
					});
					'step 1'
					if(result.bool){
						event.tar = result.targets[0];
						player.logSkill('tuncai',event.tar);
						player.storage.tuncai = !player.storage.tuncai;
						event.tar.chooseToDiscard(trigger.cards.length,true,'he');
					}
				}
			},
			zhidu:{
				trigger:{global:['damageAfter','dying']},
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('zhidu')||event.player.group!=player.group)	return false;
					if(event.name=='damage')	return event.num>=2;
					return true;
				},
				content:function(){
					player.storage.tuncai = !player.storage.tuncai;
					game.delay();
					var roundname = 'tuncai_roundcount';
					if(player.hasMark(roundname)){
						player.popup('重置');
						var next = game.createEvent('resetSkill');
						[next.player,next.resetSkill] = [player,'tuncai']
						next.setContent(lib.element.content.resetRound);
					}
				},
				ai:{
					combo:'tuncai',
					threaten:1.3
				}
			},
			//纪代因果
			huanxi:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = true;
				},
				trigger:{
					player:['phaseUseBegin','phaseUseEnd'],
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				check:function(event,player){
					var cards = player.getCards('h');
					var value = 0;
					for(var i of cards){
						value+=get.value(i);
					}
					value/=player.countCards('h');
					return (value<6&&player.countCards('h')==player.hp)||value<4;
				},
				content:function(){
					'step 0'
					event.cards = player.getCards('h');
					player.discard(event.cards);
					'step 1'
					player.draw(event.cards.length);
					'step 2'
					var names = event.cards.map(function(i){
						return get.name(i);
					})
					if(!trigger.huanxi){
						trigger.huanxi = names;
					}
					else{
						if(trigger.huanxi.length+names.length==trigger.huanxi.addArray(names).length){
							if(player.hasSkill('celv_cardDisable')){
								var next = game.createEvent('resetSkill');
								[next.player,next.resetSkill] = [player,'celv']
								next.setContent(function(){
									player.popup('重置');
									player.removeSkill('celv_cardDisable');
								});
							}
						}
					}
				}
			},
			celv:{
				trigger:{player:['changeHp','discardAfter']},
				filter:function(event,player){
					if(event.name=='changeHp')	return event.num<0;
					return event.cards.length==player.hp;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('celv'),function(card,player,target){
						if(player==target) return false;
						return target.countGainableCards(player,'h');
					}).set('ai',function(target){
						return -get.attitude2(target);
					});
					'step 1'
					if(result.bool){
						event.tar = result.targets[0];
						player.logSkill('celv',event.tar);
						player.gainPlayerCard(event.tar,'h',true,'visibleMove');
					}
					'step 2'
					if(result.bool){
						var card = result.cards[0]
						player.showCards(card,'『册吕』获得手牌');
						if(!player.storage.celv_cardDisable)	player.storage.celv_cardDisable = [];
						player.storage.celv_cardDisable.add(get.name(card));
						if(!player.hasSkill('celv_cardDisable'))	player.addSkill('celv_cardDisable');
						player.markSkill('celv_cardDisable');
					}
				},
				subSkill:{
					cardDisable:{
						marktext:'吕',
						intro:{
							name:'春绿',
							content:'不能使用或打出：$'
						},
						onremove:true,
						mod:{
							cardEnabled2:function(card,player){
								if(player.storage.celv_cardDisable.contains(get.name(card,player)))	return false;
							},
						},
					}
				},
				ai:{
					combo:'tuncai',
					threaten:1.3
				}
			},


			//ptr
			mianmo:{
				audio:3,
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(player.hasSkill('mianmo_used'))	return false;
					return event.targets&&event.targets.length&&event.cards&&event.cards.length;
				},
				direct:true,
				firstDo:true,
				priority:4,
				content:function(){
					'step 0'
					event.num = 0;
					for(var i=0;i<trigger.cards.length;i++){
						event.num += get.number(trigger.cards[i],player);
					}
					event.card = trigger.cards[0];
					var next = player.chooseTarget();
					next.set('prompt',get.prompt2('mianmo').replace('之点数或合计点数',event.num));
					next.set('filterTarget',function(){
						return true;
					});
					next.set('complexTarget',true);
					next.set('selectTarget',function(){
						var num = _status.event.num,sum = 0;
						for(var j=0;j<ui.selected.targets.length;j++){
							sum += ui.selected.targets[j].hp;
						}
						if(num==sum) return [0,ui.selected.targets.length];
						else return [ui.selected.targets.length+1,ui.selected.targets.length+1];
					});
					next.set('num',event.num);
					next.set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					});
					'step 1'
					if(result.bool){
						event.targets = result.targets.slice(0);
						player.logSkill('mianmo',event.targets);
						if(player.storage.tiaolv_up&&player.storage.tiaolv_up.contains(event.card))		event.goto(4);
						if(player.storage.tiaolv_down&&player.storage.tiaolv_down.contains(event.card))	event.goto(6);
					}else{
						event.finish();
					}
					'step 2'
					if(event.targets.contains(player)){
						if(!player.canUse(event.card,player))	event.targets.remove(player);
					}else{
						player.addTempSkill('mianmo_used')
					}
					'step 3'
					trigger.targets = event.targets;
					event.finish();
					'step 4'
					player.chooseBool('眠魔：是否令目标各摸一张牌？').set('ai',function(){
						var player=_status.event.player;
						if(_status.event.targets.contains(player)) return true;
						return false;
					}).set('targets',event.targets);
					'step 5'
					if(result.bool){
						game.asyncDraw(event.targets);
					}
					event.goto(2);
					'step 6'
					player.chooseBool('眠魔：是否令目标横置？').set('ai',function(){
						return true;
					});
					'step 7'
					if(result.bool){
						event.targets.forEach(function(tar){
							if(!tar.isLinked()) tar.link();
						});
					}
					event.goto(2);
				},
				subSkill:{
					used:{},
				},
			},
			tiaolv:{
				audio:4,
				trigger:{player:'useCard1'},
				filter:function(event,player){
					return event.cards&&event.cards.length==1;
				},
				firstDo:true,
				direct:true,
				priority:5,
				content:function(){
					'step 0'
					player.chooseControl(['增加','减少','cancel2']).set('prompt',get.prompt2('tiaolv'));
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('tiaolv');
						switch (result.control) {
							case '增加':
								player.storage.tiaolv_up.addArray(trigger.cards);
								break;
							case '减少':
								player.storage.tiaolv_down.addArray(trigger.cards);
								break;
							default:
								break;
						}
					}
				},
				group:['tiaolv_up','tiaolv_down'],
				subSkill:{
					up:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						trigger:{player:'useCardAfter'},
						firstDo:true,
						silent:true,
						direct:true,
						priority:5,
						content:function(){
							if(player.storage[event.name].length)	player.storage[event.name].length=0;
						},
						mod:{
							number:function(card,player,number){
								var num = (player.maxHp-player.hp)||1;
								if(player.storage.tiaolv_up.contains(card))	return number+num;
							},
						},
					},
					down:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						trigger:{player:'useCardAfter'},
						firstDo:true,
						silent:true,
						direct:true,
						priority:5,
						content:function(){
							if(player.storage[event.name].length)	player.storage[event.name].length=0;
						},
						mod:{
							number:function(card,player,number){
								var num = (player.maxHp-player.hp)||1;
								if(player.storage.tiaolv_down.contains(card))	return number-num;
							},
						},
					},
				},
			},
			//狼半仙
			niwei:{
				marktext:'弼',
				intro:{
					name:'味增弼佐',
					content:function(storage,player){
						var str='<ul style="padding-top:0;margin-top:0"><p>本回合变为逆位的牌名</p>';
						for(var i=0;i<storage.length;i++){
							str+='<li>'+get.translation(storage[i]);
						}
						str+='</ul>'
						return str;
					},
				},
				onremove:function (player,skill){
					player.unmarkSkill(skill);
					delete player.storage[skill]
				},
			},
			ming_niwei:{
				trigger:{global:['shaBegin','shanBegin','taoBegin','jiuBegin']},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					if(event.player.hasSkill('niwei')&&event.player.storage.niwei&&event.player.storage.niwei.contains(event.name))	return true;
					if(event.player!=player)	return false;
					var loser = player.getHistory('lose',function(evt){
						 return (evt.type=='use'&&evt.getParent().card&&evt.getParent().card==event.card);
					});
					loser = loser[loser.length-1];
					console.log(loser);
					if(loser.getParent()){
						if(event.getParent()==loser.getParent()){
							for(var i in loser.gaintag_map){
								if(loser.gaintag_map[i].contains('ming_niwei')) return true;
							}
						}
					}
				},
				content:function(){
					var fun = lib.card['niwei_'+trigger.name].content;
					if(fun)	trigger.setContent(fun);
				},
				ai:{
					threaten:0.8,
				}
			},
			xuanxu:{
				audio:4,
				global:'xuanxu_put',
				group:'ming_niwei',
				trigger:{player:'phaseUseBegin'},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					return player.countCards('h',function(card){
						return get.type(card)=='basic'&&!card.hasGaintag('ming_');
					});
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('xuanxu'),[1,Infinity],function(card){
						return get.type(card)=='basic'&&!card.hasGaintag('ming_');
					}).set('ai',function(card){
						return 7-get.useful(card);
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						event.cards = result.cards.slice(0);
						player.showCards(event.cards,'『玄虚映实』亮出手牌');
						player.addGaintag(event.cards,'ming_niwei');
						game.delayx();
					}
				},
				subSkill:{
					put:{
						mod:{
							targetEnabled:function(card,player,target,now){
								if(!card.cards) return;
								for(var i of card.cards){
									if(!i.hasGaintag('ming_niwei')) return;
								}
								if(now===false)	return true;
								var info=get.info(card);
								var filter=info.filterTarget;
								var range=info.range;
								var outrange=info.outrange;
								if(typeof filter=='boolean') return !filter;
								if(range==undefined&&outrange==undefined){
									if(typeof filter=='function'){
										return !filter(card,player,target);
									}
								}else{
									return lib.filter.targetInRange(card,player,target)||!filter(card,player,target);
								}
							},
						}
					}
				},
				mod:{
					playerEnabled:function(card,player,target,now){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						var info=get.info(card);
						var filter=info.filterTarget;
						var range=info.range;
						var outrange=info.outrange;
						if(typeof filter=='boolean') return !filter;
						if(range==undefined&&outrange==undefined){
							if(typeof filter=='function'){
								return !filter(card,player,target);
							}
						}else{
							return lib.filter.targetInRange(card,player,target)||!filter(card,player,target);
						}
					},
					selectTarget:function(card,player,range){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						if(range[1]==-1)	range[1]=1;
					},
					targetInRange:function(card,player,target,now){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						var info=get.info(card);
						var range=info.range;
						var outrange=info.outrange;
						if(range==undefined&&outrange==undefined) return true;
						if(player.hasSkill('undist')||target.hasSkill('undist')) return true;
						for(var i in range){
							if(i=='attack'){
								if(target==player)	return true;
								if(player.inRange(target)) return false;
								var range2=player.getAttackRange();
								if(range2<=0) return true;
								var distance=get.distance(player,target);
								if(range[i]<=distance-range2) return true;
							}
							else{
								var distance=get.distance(player,target,i);
								if(range[i]<distance) return true;
							}
						}
						for(var i in outrange){
							if(i=='attack'){
								var range2=player.getAttackRange();
								if(range2<=0) return true;
								var distance=get.distance(player,target)+extra;
								if(outrange[i]>distance-range2+1) return true;
							}
							else{
								var distance=get.distance(player,target,i)+extra;
								if(outrange[i]>distance) return true;
							}
						}
						return false;
					},
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('ming_niwei')){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('ming_niwei')){
							return false;
						}
					},
				},
			},
			weizeng:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{global:'phaseBegin'},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					return event.player!=player&&player.countCards('h',function(card){
						return get.type(card)=='basic'&&card.hasGaintag('ming_');
					});
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCard(get.prompt2('weizeng'),[1,Infinity],function(card){
						return get.type(card)=='basic'&&card.hasGaintag('ming_');
					}).set('ai',function(card){
						if(card.hasGaintag('ming_niwei')||['shan','tao'].contains(get.name(card))) return 0;
						return random()-0.1;
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						event.cards = result.cards.slice(0);
						player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
							var value=get.value(button.link);
							if(_status.event.reverse) return value;
							return -value;
						}).set('reverse',((_status.currentPhase)?get.attitude(player,_status.currentPhase)>0:false));
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.links&&result.links.length){
						event.linkcards = result.links.slice(0);
						player.lose(event.cards,ui.special);
						event.target.addTempSkill('weizeng_put');
						event.target.addTempSkill('niwei');
						event.target.storage.weizeng_put = [];
						event.target.storage.weizeng_put.addArray(event.cards);
						game.log(player,'将',event.cards,'置于牌堆顶');
					}
					'step 3'
					var cards=event.linkcards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				subSkill:{
					put:{
						trigger:{player:'gainAfter'},
						direct:true,
						lastDo:true,
						priority:3,
						filter:function(event,player){
							if(player.storage.weizeng_put&&player.storage.weizeng_put.length){
								for(var i=0;i<event.cards.length;i++){
									if(player.storage.weizeng_put.contains(event.cards[i])){
										return true;
									}
								}
							}
						},
						content:function(){
							'step 0'
							event.cards = [];
							if(!player.storage.niwei)	player.storage.niwei = [];
							for(var i=0;i<trigger.cards.length;i++){
								if(player.storage.weizeng_put.contains(trigger.cards[i])){
									player.storage.niwei.add(trigger.cards[i].name);
									event.cards.contains(trigger.cards.splice(i--,1));
								}
							}
							'step 1'
							player.markSkill('niwei');
							player.storage.weizeng_put.removeArray(event.cards);
						},
						onremove:true,
					}
				},
			},
			//贝海王
			aswusheng:{
				init:function(player,skill){
					player.storage[skill] = 0;
				},
				trigger:{player:['useCard','respond']},
				direct:true,
				frequent:true,
				priority:5,
				filter:function(event,player){
					return get.type(event.card)=='basic'||player.storage.aswusheng>0;
				},
				logTarget:function(event,player){
					if(event.name=='respond')	return event.source;
					if(['sha','qi','jiu','tao'].contains(event.card.name))	return event.targets[0];
					if(event.respondTo) return event.respondTo[0];
				},
				mark:true,
				intro:{
					content:'连续使用或打出了&张基本牌',
				},
				content:function(){
					'step 0'
					if(get.type(trigger.card)!='basic'&&player.storage.aswusheng>0){
						player.storage.aswusheng = 0;
						player.markSkill('aswusheng');
						event.finish();
					}
					event.num = player.storage.aswusheng;
					'step 1'
					var goto = false;
					var logTarget = get.copy(lib.skill.aswusheng.logTarget);
					var target = logTarget(trigger,player);
					player.storage.aswusheng++;
					player.markSkill('aswusheng');
					switch(event.num){
						case 0:goto = (trigger.name=='useCard');break;
						case 1:goto = true;break;
						case 2:goto = (target.countGainableCards(player,'he')>0);break;
						case 3:goto = (player.hp<player.maxHp);break;
						default:break;
					}
					if(goto){
						event.target = target;
						var next = player.chooseBool(get.prompt2('aswusheng').replace(event.num,'<span class="yellowtext">'+event.num+'</span>'));
						next.set('ai',function(){return 1});
						next.set('frequentSkill',event.name);
					}else{
						event.finish(0)
					}
					'step 2'
					if(result.bool||event.frequent){
						player.logSkill(event.name,event.target);
						switch(event.num){
							case 0:{
								if(trigger.addCount!==false){
									trigger.addCount=false;
									var stat=player.getStat();
									if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
								}
							};break;
							case 1:{
								player.draw();
							};break;
							case 2:player.gainPlayerCard(event.target,'he');break;
							case 3:player.recover();break;
						}
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase){
							if(get.type(card)!='basic'){
								if(player.storage.aswusheng==0)	return num-2;
								if(player.countCards('hs',{name:'sha'})>=2&player.storage.aswusheng==1)	return num+10;
							}
							else if(get.name(card)!='sha'){
								if(player.countCards('hs',{name:'sha'})==1&&player.storage.aswusheng==1)	return num+6;
							}
						}
					},
				},
				ai:{
					presha:true,
					threaten:function(player,target){
						if(player.countCards('hs')) return 0.8;
					},
					skillTagFilter:function(player){
						return player.countCards('hs',{name:'sha'})>1&&[0,2].contains(player.storage.aswusheng);
					}
				}
			},
			gunxun:{
				enable:'phaseUse',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = true;
				},
				filter:function(event,player,cards){
					if(player.storage.gunxun)	return player.countCards('h',function(card){
						return !card.hasGaintag('ming_')&&get.color(card)=='red';
					});
					return player.countCards('h',function(card){
						return !card.hasGaintag('ming_')&&get.color(card)=='black';
					});
				},
				selectCard:[1,Infinity],
				filterCard:function(card,player){
					if(player.storage.gunxun)	return !card.hasGaintag('ming_')&&get.color(card)=='red';
					return !card.hasGaintag('ming_')&&get.color(card)=='black';
				},
				check:function(card){
					var player = _status.event.player;
					if(player.storage.gunxun&&player.countCards('hs','sha')<2)		return 6-get.value(card);
					if(!player.storage.gunxun&&player.countCards('hs','shan')>1)	return 2-get.value(card);
					return 5-get.value(card);
				},
				discard:false,
				lose:false,
				content:function(){
					'step 0'
					player.showCards(cards,'『棍训』亮出手牌');
					if(player.storage.gunxun) player.addGaintag(cards,'ming_gunxunsha');
					else player.addGaintag(cards,'ming_gunxunshan');
					game.delayx();
					'step 1'
					player.storage.gunxun = !player.storage.gunxun;
					var num = cards.length;
					if(game.hasPlayer(function(cur){
						return cur.countCards('e')<num;
					})){
						player.chooseTarget('『棍训』：令装备区牌数少于 '+get.cnNumber(num)+' 的一名角色失去所有非锁定技直到回合结束',function(card,player,target){
							return target.countCards('e')<_status.event.num;
						}).set('num',num).set('ai',function(target){
							var player = _status.event.player;
							return -get.attitude(player,target)+Math.random();
						})
					}
					'step 2'
					if(result.targets&&result.targets.length){
						var target = result.targets[0];
						event.target = target;
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
					}
				},
				mod:{
					cardname:function(card,player){
						if(card.hasGaintag&&card.hasGaintag('ming_gunxunshan'))	return 'shan';
						if(card.hasGaintag&&card.hasGaintag('ming_gunxunsha'))	return 'sha';
					},
				},
				ai:{
					order:7.5,
					result:{player:0.5},
				}
			},
			//嘉然
			quanyu:{
				audio:6,
				trigger:{global:'useCard1'},
				clickChange:'休眠',
				clickable:function(player){
					if(player.storage.quanyu_clickChange===undefined)	player.storage.quanyu_clickChange = false;
					else	player.storage.quanyu_clickChange = !player.storage.quanyu_clickChange;
				},
				clickableFilter:function(player){
					return player.storage.quanyu_clickChange!==false;
				},
				filter:function(event,player){
					if(player.storage.quanyu_clickChange===false)	return false;
					var suit = get.suit(event.card);
					return event.cards&&event.cards.length&&suit!='none'&&event.player!=player&&player.countCards('h',function(card){
						return suit==get.suit(card);
					})==0;
				},
				check:function(event,player){
					var handcards = player.getCards('h');
					var num = 4-get.suit3(handcards).length;
					if(player.hp<num)		return false;
					if(['shandian','du'].contains(event.card.name))		return false;
					if(event.targets&&event.targets.length&&get.attitude(player,event.player)<0){
						for(var i=0;i<event.targets.length;i++){
							if(get.effect(event.targets[i],event.card,event.player,player)<0)	return true;
						}
					}else{
						return get.attitude(player,event.player)<0;
					}
				},
				prompt2:function(event,player){
					return '你可以获得'+get.translation(event.player)+'使用的'+get.translation(event.card)+'，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。';
				},
				addDialog:function(event,player){
					return event.cards;
				},
				content:function(){
					'step 0'
					trigger.cancel();
					event.cards = trigger.cards;
					event.target = trigger.player;
					player.gain(event.cards,event.target,'gain2');
					'step 1'
					player.showHandcards('『全域』展示手牌');
					var handcards = player.getCards('h');
					event.num = 4-get.suit3(handcards).length;
					'step 2'
					if(event.num>0){
						player.damage(event.num,'nosource');
					}
				},
				ai:{
					expose:0.2,
				},
			},
			wulian:{
				audio:true,
				enable:'phaseUse',
				unique:true,
				limited:true,
				filter:function(event,player,cards){
					return player.isDamaged();
				},
				content:function(){
					'step 0'
					player.storage.wulian = true;
					player.awakenSkill('wulian');
					player.draw(player.maxHp-player.hp);
					'step 1'
					player.addTempSkill('lianpo','roundStart');
				},
				derivation:'lianpo',
				ai:{
					order:function(item,player){
						if((player.maxHp-player.hp)>=3) return 10;
						return 0;
					},
					result:{player:2},
				}
			},
			lianpo:{
				audio:4,
				//audioname:['Diana'],
				trigger:{global:'phaseAfter'},
				frequent:true,
				onremove:true,
				filter:function(event,player){
					return player.getStat('kill')>0;
				},
				content:function(){
					player.insertPhase();
				},
			},
			//乃琳
			yehua:{
				audio:3,
				trigger:{player:'phaseBegin'},
				//frequent:true,
				filter:function(event,player){
					return !player.isMaxHandcard(true);
				},
				check:function(event,player){
					var list=game.filterPlayer(function(current){
						return current.isMaxHandcard();
					}).sortBySeat();
					return (list[0].countCards('h')-player.countCards('h'))>=1;
				},
				content:function(){
					'step 0'
					var num = 1;
					var targets = game.filterPlayer(function(cur){
						return cur.isMaxHandcard();
					});
					num+=targets[0].countCards('h');
					num-=player.countCards('h');
					event.cards = get.cards(num);
					'step 1'
					player.gain(event.cards,'draw');
					'step 2'
					player.turnOver();
				},
			},
			fengqing:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				trigger:{player:['linkBegin','turnOverBegin']},
				direct:true,
				filter:function(event,player){
					return true;
				},
				process:function(change){
					switch(change){
						case 1:return '其下个准备阶段视为使用了【酒】';break;
						case 2:return '其下个准备阶段视为使用了【桃】';break;
						case 3:return '其跳过本回合的判定和弃牌阶段';break;
					}
				},
				content:function(){
					'step 0'
					event.change = player.storage.fengqing;
					player.chooseTarget(get.prompt('fengqing')).set('ai',function(target){
						var player = _status.event.player;
						var change = _status.event.change;
						switch(change){
							case 1:return get.effect(target,{name:'jiu'},target,player)||target==player;break;
							case 2:return get.effect(target,{name:'tao'},target,player);break;
							case 3:{
								if(target!=_status.currentPhase)	return 0;
								if(target.countCards('j')>0) return 2*get.attitude(player,target)+Math.random();
								return get.attitude(player,target)+Math.random();
								break;
							}
						}
						return get.attitude(player,target)+Math.random();
					}).set('prompt2',lib.skill.fengqing.process(event.change)).set('change',event.change)
					'step 1'
					if(result.targets&&result.targets.length){
						event.target = result.targets[0];
						player.logSkill('fengqing',event.target);
						switch(event.change){
							case 1:event.target.addSkill('fengqing_jiu');break;
							case 2:event.target.addSkill('fengqing_tao');break;
							case 3:{
								event.target.skip('phaseJudge');
								event.target.skip('phaseDiscard');
								break;
							}
						}
						player.storage.fengqing = (player.storage.fengqing==3)?1:player.storage.fengqing+1;
					}
				},
				effect:{
					target:function(card,player,target,current){
						if(['tiesuo','lulitongxin'].contains(card.name)){
							return [1,2];
						}
					},
				},
				subSkill:{
					jiu:{
						audio:2,
						mark:true,
						intro:{
							content:'下个准备阶段视为使用了【酒】'
						},
						trigger:{player:'phaseZhunbeiEnd'},
						forced:true,
						onremove:true,
						popup:'风情-酒',
						audioname:['EQueen'],
						filter:function(event,player){
							return lib.filter.filterCard({name:'jiu',isCard:false},player,event);
						},
						content:function(){
							player.chooseUseTarget({name:'jiu'},true,'noTargetDelay');
							player.removeSkill(event.name);
						},
					},
					tao:{
						audio:2,
						mark:true,
						intro:{
							content:'下个准备阶段视为使用了【桃】'
						},
						trigger:{player:'phaseZhunbeiEnd'},
						forced:true,
						onremove:true,
						popup:'风情-桃',
						audioname:['EQueen'],
						filter:function(event,player){
							return true;
							return lib.filter.filterCard({name:'tao',isCard:false},player,event);
						},
						content:function(){
							player.chooseUseTarget({name:'tao'},true,'noTargetDelay');
							player.removeSkill(event.name);
						},
					},
				},
			},
			//珈乐
			huangjia:{
				init:function(player,skill) {
					if(!player.storage[skill])	player.storage[skill] = true;
				},
				locked:true,
				notemp:true,
				mark:true,
				marktext: '👠',
				intro: {
					mark:function(dialog,content,player){
						console.log(player.storage.huangjia);
						dialog.addText('已成为皇珈骑士');
					},
					onunmark:function(storage,player){
						if(storage){
							storage = false;
						}
					},
				},
			},
			shixi:{
				marktext: '时',
				intro: {
					mark:function(dialog,content,player){
						dialog.addText('时隙:初始手牌');
						var list = player.storage.shixi.slice(0);
						dialog.addSmall(list);
					},
					content: 'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
				trigger:{global:'phaseLoopBefore',player:'enterGame'},
				forced:true,
				frequent:true,
				filter:function(event,player){
					return !player.storage.shixi;
				},
				content:function(){
					var cards = player.getCards('h');
					if(cards.length){
						if(!player.storage.shixi)	player.storage.shixi = []
						player.showCards(cards,'时隙:记录初始手牌');
						player.storage.shixi.addArray(cards);
						player.markSkill('shixi');
					}
				},
				group:['shixi_mark','shixi_draw'],
				subSkill:{
					mark:{
						marktext: '隙',
						intro: {
							mark:function(dialog,content,player){
								dialog.addText('时隙:已指定');
								var list = player.storage.shixi_mark.slice(0);
								dialog.addSmall(list);
							},
							content: 'cards',
							onunmark:function(storage,player){
								if(storage&&storage.length){
									storage.length=0;
								}
							},
						},
						trigger:{global:['loseAfter','cardsDiscardAfter']},
						filter:function(event,player){
							var record = player.getStorage('shixi').slice(0);
							if(!record)		return false;
							if(event.name=='cardsDiscard'&&(event.getParent().name!='orderingDiscard'
							||(!event.getParent().relatedEvent||!event.getParent().relatedEvent.player||event.getParent().relatedEvent.name=='judge'
							||!((player.storage.yuezhi===true&&event.getParent().relatedEvent.player.storage.huangjia)
							||event.getParent().relatedEvent.player==player)))) return false;
							if(event.name=='lose'&&(event.position!=ui.discardPile
							||!((player.storage.yuezhi===true&&event.player.storage.huangjia)
							||event.player==player)))	return false;
							if(event.player&&event.player!=player) console.log(event.player.storage.huangjia)
							var list = event.cards.filter(function(card){
								if(event.js&&event.js.contains(card))	return false;
								for(var i=0;i<record.length;i++){
									if(player.storage.shixi_mark&&player.storage.shixi_mark.contains(record[i]))	continue;
									if(get.suit(record[i])==get.suit(card))	return true;
								}
							});
							return list.length>0;
						},
						direct:true,
						content:function(){
							'step 0'
							var record = player.getStorage('shixi').slice(0);
							var list = trigger.cards.filter(function(card){
								for(var i=0;i<record.length;i++){
									if(player.storage.shixi_mark&&player.storage.shixi_mark.contains(record[i]))	continue;
									if(get.suit(record[i])==get.suit(card))	return true;
								}
							});
							event.record = record;
							event.list = list;
							event.num = 0;
							'step 1'
							if(event.list[event.num]){
								if(player.storage.shixi_mark)	event.record.removeArray(player.storage.shixi_mark);
								var filterButtons = event.record.filter(function(card){
									return get.suit(event.list[event.num])==get.suit(card);
								})
								if(event.record.length){
									if(lib.config.autoskilllist.contains('shixi')){
										player.chooseButton(['###'+get.prompt('shixi')+'###选择要指定的牌（与'+get.translation(event.list[event.num])
										+'花色相同）',event.record]).set('filterButton',function(button){
											var card=_status.event.card;
											return get.suit(button.link)==get.suit(card);
										}).set('ai',function(button){
											return get.value(button.link)+2*Math.random();
										}).set('card',event.list[event.num]);
									}
									else if(filterButtons.length){
										event._result={bool:true,links:[filterButtons.shift()]};
									}
								};
							}
							'step 2'
							if(result.bool&&result.links){
								if(!player.storage.shixi_mark)	player.storage.shixi_mark = [];
								player.storage.shixi_mark.addArray(result.links);
								player.markSkill('shixi_mark');
							}
							event.num++;
							if(event.list[event.num])	event.goto(1);
						},
					},
					draw:{
						trigger:{
							global:['phaseZhunbeiEnd','phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd','phaseJieshuEnd']
						},
						filter:function(event,player){
							return player.storage.shixi_mark&&player.storage.shixi_mark.length;
						},
						direct:true,
						content:function(){
							'step 0'
							event.num = Math.floor(player.storage.shixi_mark.length/2);
							'step 1'
							if(event.num>0){
								player.logSkill('shixi');
								player.draw(event.num);
								player.unmarkSkill('shixi_mark');
							}
						},
					},
				}
			},
			xueta:{
				audio:6,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					if(player.countCards('he')==0)	return false;
					return Array.isArray(event.respondTo)&&event.respondTo[0]&&event.respondTo[0]!=player;
				},
				direct:true,
				content:function(){
					'step 0'
					event.target = trigger.respondTo[0];
					player.chooseToDiscard('he',get.prompt2('xueta')).set('ai',function(card){
						if(!_status.event.check)	return 3-get.value(card);
						return 8-get.value(card);
					}).set('logSkill',['xueta',event.target,'fire']).set('check',!(get.attitude(player,event.target)<0&&player.storage.yuezhi));
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						event.target.draw(2);
						event.target.addSkill('huangjia');
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(!player.storage.huangjia){
								if(get.attitude(player,target)>0&&get.attitude(target,player)>0){
									if(get.tag(card,'respondShan')&&target.countCards('hs','shan')&&target.countCards('he')>target.countCards('h','shan')){
										return [1,2,1,1];
									}
									if(get.tag(card,'respondSha')&&target.countCards('hs','sha')&&target.countCards('he')>target.countCards('h','sha')){
										if(card.name=='juedou') return;
										return [1,2,1,1];
									}
								}
							}
						}
					}
				}
			},
			yuezhi:{
				audio:true,
				skillAnimation:true,
				animationStr:'音乐珈',
				unique:true,
				juexingji:true,
				forced:true,
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					var num = game.countPlayer(function(cur){
						return cur.storage.huangjia===true;
					});
					return num>=player.hp||num>=player.countCards('h');
				},
				content:function(){
					'step 0'
					player.gainMaxHp();
					player.awakenSkill('yuezhi');
					player.storage.yuezhi = true;
					'step 1'
					var record = player.storage.shixi.slice(0);
					record.forEach(function(card){
						if(get.position(card,true)=='d')	player.gain(card,'draw');
						else{
							player.recover();
							player.draw(2);
						}
						game.delay(0.4);
					})
				},
				ai:{
					combo:'shixi'
				}
			},
			//向晚
			yiqu:{
				trigger:{global:['chooseTargetAfter','chooseCardTargetAfter','chooseUseTargetAfter','useSkillAfter']},
				frequent:true,
				filter:function(event,player){
					var name = lib.skill.yiqu.process(event);
					var info=lib.skill[name];
					if(!info||info.equipSkill||info.ruleSkill)	return false;
					var result = event.result;
					var targets = [];
					if(event.name=='useSkill')		targets = event.targets||[event.target];
					else if(!result||result.bool!=true)		return false;
					else{
						targets = result.targets.slice(0);
					}
					return lib.translate[name+'_info']&&!player.hasSkill(name)&&targets.contains(player);
				},
				prompt2:function(event,player){
					var name = lib.skill.yiqu.process(event);
					return '你可以获得『'+get.translation(name)+'』，直到下次进入濒死状态';
				},
				process:function(event){
					var name = event.skill||event.getParent().name;
					if(name.length>3){
						var index = name.indexOf('_',4);
						if(index>3)	name = name.substring(0,index);
					}
					return name;
				},
				content:function(){
					var name = lib.skill.yiqu.process(trigger);
					player.addSkillLog(name);
					player.addAdditionalSkill('yiqu',name,true);
				},
				group:'yiqu_beDying',
				subSkill:{
					beDying:{
						trigger:{player:'dyingBefore'},
						forced:true,
						filter:function(event,player){
							return player.additionalSkills['yiqu'];
						},
						content:function(){
							player.removeAdditionalSkill('yiqu');
						}
					}
				}
			},
			wanxian:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.player!=player&&event.parent.name=='damage'
					&&event.parent.source&&[event.player,player].contains(event.parent.source)
					&&player.additionalSkills['yiqu']&&player.additionalSkills['yiqu'].length;
				},
				content:function(){
					'step 0'
					event.num = player.additionalSkills['yiqu'].length;
					player.removeAdditionalSkill('yiqu');
					'step 1'
					player.draw(event.num);
				},
				ai:{
					combo:'yiqu',
				},
			},
			//阿梓
			juehuo:{
				init:function(player,skill) {
					if(!player.storage[skill]){
						player.storage[skill] = {};
						player.storage[skill].ms = [];
						player.storage[skill].ans = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '绝活',
				intro: {
					mark:function(dialog,content,player){
						if(player.storage.juehuo.ms&&player.storage.juehuo.ms.length){
							var list = player.storage.juehuo.ms.slice(0);
							dialog.addText('明置绝活');
							dialog.addSmall(list);
						}
						if(player.storage.juehuo.ans&&player.storage.juehuo.ans.length){
							if(player.isUnderControl(true)){
								var list = player.storage.juehuo.ans.slice(0);
								dialog.addText('暗置绝活');
								dialog.addSmall(list);
							}
							else{
								dialog.addText('暗置绝活（'+get.cnNumber(player.storage.juehuo.ans.length)+'张）');
							}
						}
					},
					content: 'cards',
					onunmark:function(storage,player){
						if((storage&&storage.ms&&storage.ms.length)||(storage&&storage.ans&&storage.ans.length)){
							var cards = storage.ms.concat(storage.ans);
							player.$throw(cards,1000);
							game.cardsDiscard(cards);
							game.log(cards,'被置入了弃牌堆');
							storage.ms.length=0;
							storage.ans.length=0;
						}
					},
				}
			},
			zhiyue:{
				audio:8,
				trigger:{player:'useCardEnd'},
				frequent:true,
				filter:function(event,player){
					if(player.storage.juehuo.ans&&player.storage.juehuo.ms){
						var card = event.card;
						var list1 = player.storage.juehuo.ans.slice(0);
						var list2 = player.storage.juehuo.ms.slice(0);
						for(var i =0;i<list1.length;i++){
							if(get.type2(list1[i])==get.type2(card))	return true;
						}
						for(var i =0;i<list2.length;i++){
							if(get.suit(list2[i])==get.suit(card))	return true;
						}
						if(list1.length==0&&list2.length==0)		return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					event.card = trigger.card;
					var list1 = player.storage.juehuo.ans.slice(0);
					var list2 = player.storage.juehuo.ms.slice(0);
					var list = ['『指月』：选择绝活翻面'];
					if(list1&&list1.length){
						list.push('暗置绝活');
						list.push([list1,'card']);
					}
					if(list2&&list2.length){
						list.push('明置绝活');
						list.push([list2,'card']);
					}
					list.push('hidden');
					event.list1 = list1;
					event.list2 = list2;
					var next = player.chooseButton(list);
					next.set('selectButton',[1,event.list2.length+1]);
					next.set('filterButton',function(button){
						var card = _status.event.card;
						var evt = _status.event.getParent();
						var now = button.link;
						if(evt.list1&&evt.list1.length&&evt.list1.contains(now)){
							var selected = ui.selected.buttons;
							if(selected.length){
								for(var i=0;i<selected.length;i++){
									if(evt.list1.contains(selected[i].link)) return false;
								}
							}
							return get.type2(now)==get.type2(card);
						}
						if(evt.list2&&evt.list2.length&&evt.list2.contains(now)){
							return get.suit(now)==get.suit(card);
						}
					});
					next.set('card',event.card);
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						var cards1 = result.links.slice(0);
						var cards2 = result.links.slice(0);
						cards1 = cards1.filter(function(card){
							return event.list1.contains(card);
						});
						cards2 = cards2.filter(function(card){
							return event.list2.contains(card);
						});
						event.cards = cards1.concat(cards2)
						if(cards1&&cards1.length==event.list1.length){
							event.cards.push(get.cards()[0]);
						}
						if(cards2&&cards2.length){
							player.draw(cards2.length);
						}
						lib.skill.zhiyue.process(player,event.cards);
						game.delay(0.5);
					}
				},
				process:function(player,cards){
					if(player.storage.juehuo.ans&&player.storage.juehuo.ms){
						for(var i=0;i<cards.length;i++){
							if(player.storage.juehuo.ms.contains(cards[i])){
								player.$give(cards[i],player,false);
								player.storage.juehuo.ms.remove(cards[i]);
								player.storage.juehuo.ans.push(cards[i]);
							}else if(player.storage.juehuo.ans.contains(cards[i])){
								player.$give(cards[i],player,false);
								player.storage.juehuo.ans.remove(cards[i]);
								player.storage.juehuo.ms.push(cards[i]);
							}else{
								if(!drawAutos)	var drawAutos = [];
								drawAutos.add(cards[i]);
								game.cardsGotoSpecial(cards[i]);
								player.storage.juehuo.ans.push(cards[i]);
							}
						}
						if(drawAutos)	player.$drawAuto(drawAutos);
						player.markSkill('juehuo');
					}

				},
				ai:{
					threaten:1.5
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player.storage.juehuo){
							var suit = get.suit(card);
							var type = get.type2(card);
							var ans = player.storage.juehuo.ans.slice(0);
							var ms = player.storage.juehuo.ms.slice(0);
							for(var i=0;i<ans.length;i++){
								if(get.type2(ans[i])==type)	return num+7;
							}
							for(var i=0;i<ms.length;i++){
								if(get.suit(ms[i])==suit)	return num+5;
							}
						}
					},
				},
				group:['juehuo','zhiyue_start'],
				subSkill:{
					start:{
						forced:true,
						priority:10,
						trigger:{
							global:'gameStart',
							player:'enterGame',
						},
						content:function(){
							event.cards = get.cards();
							game.playAudio('skill','zhiyue0');
							lib.skill.zhiyue.process(player,event.cards);
						},
					}
				}
			},
			zhengniu:{
				audio:4,
				trigger:{player:['linkBefore','recoverBefore','drawBefore']},
				direct:true,
				filter:function(event,player){
					if(!player.storage.juehuo
						||!(player.storage.juehuo.ans&&player.storage.juehuo.ans.length
						||player.storage.juehuo.ms&&player.storage.juehuo.ms.length))				return false;
					if(!event.source||get.itemtype(event.source)!='player'||event.source==player)	return false;
					if(event.name=='link')	return !player.isLinked();
					return true
				},
				content:function(){
					'step 0'
					event.target = trigger.source;
					var check = get.attitude(player,event.target)>0;
					var list1 = player.storage.juehuo.ans.slice(0);
					var list2 = player.storage.juehuo.ms.slice(0);
					// if(list1&&list1.length){
					// 	dialog.addText('暗置绝活');
					// 	dialog.add([list1, 'card']);
					// }
					// if(list2&&list2.length){
					// 	dialog.addText('明置绝活');
					// 	dialog.add([list2, 'card']);
					// }
					var list = ['###'+get.prompt('zhengniu')+'###选择交给'+get.translation(event.target)+'的绝活'];
					if(list1&&list1.length){
						list.push('暗置绝活');
						list.push([list1,'card']);
					}
					if(list2&&list2.length){
						list.push('明置绝活');
						list.push([list2,'card']);
					}
					list.push('hidden');
					player.chooseButton(list).set('filterButton',function(button){
						return true;
					}).set('selectButton',[1,Infinity]).set('ai',function(button){
						if(!_status.event.check)	return -1;
						if((ui.dialog.buttons.length-ui.selected.buttons.length)<=3)	return -1;
						return get.value(button.link);
					}).set('check',check);
					'step 1'
					if(result.bool&&result.links){
						player.logSkill('zhengniu');
						player.storage.juehuo.ans.removeArray(result.links);
						player.storage.juehuo.ms.removeArray(result.links);
						player.$give(result.links,event.target);
						event.target.gain(result.links);
						player.updateMarks();
					}
				},
			},
			//勺宝
			juxiao:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return true;
				},
				frequent:true,
				content:function(){
					'step 0'
					player.chooseTarget([1,2],true,'###『句销』：令至多两名角色各摸一张牌###摸牌的角色不能使用【杀】直到回合结束').set('ai',function(target){
						var att = get.attitude(_status.event.player);
						if(target==_status.currentPhase&&(target.hasSha()||target.hasSkillTag('useSha'))){
							if(target.hasS)	return 2-att;
						}
					})
					'step 1'
					if(result.bool&&result.targets){
						player.logSkill('juxiao',result.targets);
						game.asyncDraw(result.targets);
						result.targets.forEach(function(tar){
							tar.addTempSkill('juxiao_xiao');
						})
					}
				},
				subSkill:{
					xiao:{
						mark:true,
						intro:{
							content:'无法使用杀直到回合结束'
						},
						mod:{
							cardEnabled:function(card){
								if(card.name=='sha') return false;
							}
						}
					}
				},
				ai:{
					expose:0.1,
					threaten:0.8,
					maixie:true,
				}
			},
			shshenyan:{
				audio:6,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h',);
				},
				content:function(){
					'step 0'
					player.showHandcards();
					game.delayx();
					if(!player.storage.shshenyan)	player.storage.shshenyan = [];
					'step 1'
					player.chooseCard('h','『神言』:弃置一种牌名的牌',true).set('ai',function(card){
						if(['sha'].contains(card.name))			return 5;
						if(!['sha','tao'].contains(card.name)&&get.type(card)=='basic')	return 6-get.value(card);
						return 1;
					});
					'step 2'
					if(result.bool&&result.cards){
						event.cname = get.name(result.cards[0]);
						event.discard = player.discard(player.getCards('h',event.cname));
					}else{
						event.finish();
					}
					'step 3'
					if(event.discard.cards){
						var cards = event.discard.cards;
						cards.forEach(function(card){
							player.storage.shshenyan.add(get.suit(card));
						});
						player.draw(cards.length)
					}else{
						event.finish();
					}
					'step 4'
					if(player.storage.shshenyan){
						if(!player.hasSkill('shshenyan_mark'))		player.addTempSkill('shshenyan_mark','phaseUseAfter');
						player.markSkill('shshenyan_mark');
						var num = player.storage.shshenyan.length;
						var list = get.inpile('trick');
						for(var i=0;i<list.length;i++){
							if(get.translation(list[i]).length!=num){
								list.splice(i--,1);
							}
							else	list[i]=['锦囊','',list[i]];
						}
						console.log(list)
						if(list.length){
							player.chooseButton(['是否选择一张长度'+num+'的锦囊牌视为使用之？',[list,'vcard'],'hidden']).set('ai',function(button){
								var card={name:button.link[2]};
								var value=get.value(card);
								return value;
							});
						}
					}
					'step 5'
					if(result.bool&&result.links&&result.links.length){
						player.chooseUseTarget({name:result.links[0][2]},true);
					}else{
						if(event.cname=='sha'){
							var next = game.createEvent('resetSkill');
							[next.player] = [player]
							next.setContent(function(){
								player.popup('重置');
								game.log(player,'重置了『神言』');
								player.getStat('skill').shshenyan--;
							});
						}
					}
				},
				subSkill:{
					mark:{
						marktext:"言",
						locked:true,
						intro:{
							name:'神言',
							content:function (storage,player,skill){
								if(player.storage.shshenyan.length){
									return '本阶段『神言』的弃置花色：'+ get.translation(player.storage.shshenyan);
								}
							},
						},
						onremove:function(player){
							player.storage.shshenyan.length = 0;
						},
					}
				},
				ai:{
					order:6,
					result:{
						player:1,
					},
				},
			},
			//三三
			zhezhuan:{
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player,cards){
					return player.countCards('he',{type:['trick','delay']})>=1;
				},
				hiddenCard:function(player,name){
					if(typeof lib.card[name].yingbian_prompt!='string')		return false;
					return name!='du'&&get.type(name)=='basic'&&player.countCards('he',{type:['trick','delay']});
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('辙转','hidden');
						dialog.add('应变标签');
						var table=document.createElement('div');
						var list = ['yingbian_kongchao','yingbian_canqu','yingbian_fujia','yingbian_zhuzhan'];
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						for(var i=0;i<list.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML='<span>'+get.translation(list[i]+'_tag')+'</span>';
							td.link=list[i];
							td.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							for(var j in lib.element.button){
								td[j]=lib.element.button[i];
							}
							table.appendChild(td);
							dialog.buttons.add(td);
						}
						dialog.content.appendChild(table);
						dialog.add('卡牌转换');
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=='du')		continue;
							if(!lib.card[name].yingbian_prompt)		continue;
							if(name=='sha'){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
							}
							else if(get.type(name)=='trick'){
								if(!player.countCards('h',{name:name}))	continue;
								list.push(['锦囊','',name]);
							}
							else if(get.type(name)=='basic'){
								list.push(['基本','',name])
							};
						}
						dialog.add([list,'vcard']);
						return dialog;
					},
					filter:function(button,player){
						if(ui.selected.buttons.length&&typeof button.link==typeof ui.selected.buttons[0].link) return false;
						if(typeof button.link=='object'){ 
							var evt = _status.event.getParent();
							var name = button.link[2];
							if(evt.filterCard&&typeof evt.filterCard=='function'){
								return	evt.filterCard({name:name,isCard:true},player);
							}
							return lib.filter.filterCard({name:name,isCard:true},player,evt);
						}
						return true;
					},
					select:2,
					check:function(button){
						var player=_status.event.player;
						if(typeof button.link=='string'){
							switch(button.link){
								case 'yingbian_kongchao':return 4.5;break;
								case 'yingbian_canqu':return player.hp==1;break;
								case 'yingbian_fujia':return 4.3;break;
								case 'yingbian_zhuzhan':return (3-player.hp)*1.5;break;
							}
						}
						var name=button.link[2];
						var evt=_status.event.getParent();
						if(get.type(name)=='basic'){
							if(name=='shan') return 2;
							if(evt.type=='dying'){
								if(get.attitude(player,evt.dying)<2) return false;
								return 1.9;
							}
							if(evt.type=='phase') return player.getUseValue({name:name,nature:button.link[3],isCard:true});
							return 1;
						}
						var player=_status.event.player;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						if(typeof links[1]=='string') links.reverse();
						var yingbian=[links[0],['yingbian_damage','yingbian_gain'].randomGet()];
						var name=links[1][2];
						var nature=links[1][3];
						return {
							filterCard:function(card,player){
								if(get.type2(card)!='trick')		return false;
								if(get.type2(name)=='trick')		return get.name(card)==name;
								return true;
							},
							selectCard:1,
							yingbian:yingbian,
							viewAs:{
								cardid:get.id(),
								name:name,
								nature:nature,
								isCard:true,
							},
							popname:true,
							precontent:function(){
								player.logSkill('zhezhuan');
								var yingbian = lib.skill.zhezhuan_backup.yingbian;
								console.log(_status.cardtag,lib.skill.zhezhuan_backup.yingbian,event);
								_status.cardtag[yingbian[0]].add(event.result.card.cardid);
								_status.cardtag[yingbian[1]].add(event.result.card.cardid);
							},
							
						}
					},
					prompt:function(links,player){
						if(typeof links[1]=='string') links.reverse();
						var yingbian=links[0];
						var name=links[1][2];
						var nature=links[1][3];
						return '视为使用一张带有'+get.translation(yingbian+'_tag')+'标签的'+(get.translation(nature)||'')+'【'+get.translation(name)+'】';
					},
				},
				ai:{
					order:12,
					result:{
						player:1
					},
					threaten:1.5
				},
				group:'zhezhuan_clear',
				subSkill:{
					clear:{
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						firstDo:true,
						priority:333,
						content:function(){
							if(_status.cardtag.yuzu&&_status.cardtag.yuzu.length)	delete _status.cardtag.yuzu;
						}
					}
				}
			},
			setu:{
				mark:true,
				intro:{
					name:'涩涂',
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
				enable:'phaseUse',
				usable:1,
				filter:function(event,player,cards){
					return player.countCards('he')>=2;
				},
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<18;
				},
				discard:false,
				toStorage:true,
				delay:false,
				visible:true,
				complexCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					if(get.number(card)<=2)	return 2+get.number(card)-get.value(card);
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.markAuto('setu',cards);
					'step 1'
					var cards = player.storage.setu;
					event.num = cards.length;
					var num = 1;
					for(var i=0;i<cards.length;i++){
						num *= get.number(cards[i]);
					}
					if(num>100)	event.going = true;
					'step 2'
					if(event.going===true){
						player.unmarkSkill('setu');
						player.draw(event.num);
						player.chooseTarget('『涩涂』：对一名角色造成一点伤害',true).set('ai',function(target){
							var player = _status.event.player;
							return get.damageEffect(target,player,player);
						});
					}
					'step 3'
					if(result.targets&&result.targets.length){
						event.target = result.targets[0];
						event.target.damage();
					}
				},
				ai:{
					order:7.5,
					result:{
						player:1,
					},
					threaten:1.5
				}
			},
			//樱井
			junxu:{
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event,player){
					return player.getHistory('useCard').length==player.hp;
				},
				content:function(){
					player.chooseDrawRecover(2,1,true,function(){
						if(player.hp==1&&player.isDamaged())	return 'recover_hp';
						if(_status.event.check)					return 'draw_card';
						if(player.isDamaged()&&player.isPhaseUsing()&&player.countCards('hs',function(card){
							return player.getUseValue({name:'sha',isCard:true})>0;
						})>=2)	return 'recover_hp';
						return 'draw_card';
					}).set('check',get.tag(trigger.card,'recover')>=1&&trigger.targets.contains(player));
				},
				ai:{
					threaten:1.5,
					noShan:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='noShan'){
							if(player.isHealthy())	return true;
							return false;
						}
					},
				}
			},
			jingniang:{
				enable:'phaseUse',
				filter:function(event,player,cards){
					return player.countCards('he');
				},
				filterCard:function(card){
					return true;
				},
				check:function(card){
					if(get.name(card)=='sha')	return 1-get.value(card);
					return 7-get.value(card);
				},
				content:function(){
					player.addTempSkill('jingniang_addDam');
					player.addMark('jingniang');
				},
				intro:{
					name:'醉酒',
					content:'mark'
				},
				position:'he',
				marktext:'酿',
				subSkill:{
					addDam:{
						trigger:{player:'useCard1'},
						forced:true,
						filter:function(event,player){
							return event.card&&event.card.name=='sha'&&player.countMark('jingniang');
						},
						content:function(){
							trigger.baseDamage+=player.countMark('jingniang');
							if(trigger.addCount!==false){
								trigger.addCount=false;
								trigger.player.getStat().card.sha--;
							}
						},
						onremove:function(player,skill){
							player.removeMark('jingniang',player.countMark('jingniang'),false);
						},
					},
				},
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(player.getUseValue({name:'sha',isCard:true})>0&&player.countCards('hs','sha')>=2){
								return 1;
							}
						},
					},
					threaten:1.2
				}
			},

			//步步
			tianlve:{
				audio:true,
				trigger:{player:'phaseUseBegin'},
				priority:199,
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('tianlve'),function(card,player,target){
						return target!=player;
					},function(target){
						var player = _status.event.player;
						return get.recoverEffect(target,player,player);
					});
					'step 1'
					if(result.targets&&result.targets.length){
						player.logSkill('tianlve',result.targets);
						event.target = result.targets[0];
						event.target.recover();
						player.storage.tianlve_pcr = event.target;
						player.addTempSkill('tianlve_pcr');
					}
				},
				subSkill:{
					pcr:{
						mark:'character',
						intro:{
							name:'甜略',
							content:'本阶段内你对$使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标',
						},
						onremove:function(player,skill){
							player.unmarkSkill('tianlve_pcr');
							delete player.storage.tianlve_pcr;
						},
						trigger:{player:'useCard'},
						priority:199,
						direct:true,
						filter:function(event,player){
							var card=event.card;
							var info=get.info(card);
							if(info.allowMultiple==false) return false;
							return event.targets&&event.targets.length==1&&event.targets[0]==player.storage.tianlve_pcr;
						},
						content:function(){
							'step 0'
							var prompt2='为'+get.translation(trigger.card)+'增加一个目标'
							player.chooseTarget(get.prompt('tianlve'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.card,player,player);
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool&&result.targets&&result.targets.length){
								if(!event.isMine()) game.delayx();
								event.targets = result.targets;
							}
							'step 2'
							if(event.targets){
								player.logSkill('tianlve',event.targets);
								trigger.targets.addArray(event.targets);
							}else{
								player.draw();
							}
						},
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.tianlve_pcr) return true;
							},
						},
					},
				}
			},
			luxian:{
				audio:true,
				group:'P_SP',
				trigger:{player:'phaseZhunbeiBegin'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				forceunique:true,
				filter:function(event,player){
					return player.isDamaged();
				},
				check:function(event,player){
					return player.countCards('hes')>=5||player.hp<=1;
				},
				content:function(){
					'step 0'
					var list;
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='psp') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='psp';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='psp';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('Pudding');
					if(list.length){
						player.chooseButton(true).set('ai',function(button){
							return 5||get.rank(button.link,true)-lib.character[button.link][2];
						}).set('createDialog',['『颅祭』：获得其中一名角色所有技能',[list.randomGets(3),'character']]);
					}else	event.finish()
					'step 1'
					if(result.links&&result.links.length){
						player.storage.luxian = true;
						player.awakenSkill('luxian');
						player.loseMaxHp();
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								player.addTempSkill(skills[j],'phaseAfter');
							}
						}
						player.storage.luxian_pcr = result.links[0];
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('luxian',result.links[0]);
						player.addTempSkill('luxian_pcr','phaseAfter');
						player.markSkill('P_SP');
					}
				},
				subSkill:{
					pcr:{
						onremove:function(player,skill){
							if(player.storage[skill]&&player.storage.P_SP.contains(player.storage[skill])){
								console.log(player.storage[skill])
								player.storage.P_SP.remove(player.storage[skill]);
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
							}
							delete player.storage[skill]
						}
					},
				}
			},
			//粉兔
			erni:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				group:['erni_going','erni_change'],
				hiddenCard:function(player,name){
					switch(player.storage.erni){
						case 1:if(name=='sha') return player.countCards('h');break;
						case 2:if(name=='shan') return player.countCards('h');break;
						case 3:if(name=='tao') return player.countCards('h');break;
					}
				},
				ai:{
					useSha:1,
					skillTagFilter:function(player,tag){
						switch(tag){
							case 'respondSha':{
								if(player.storage.erni!=1||!player.countCards('h')) return false;
								break;
							}
							case 'respondShan':{
								if(player.storage.erni!=2||!player.countCards('h')) return false;
								break;
							}
							case 'save':{
								if(player.storage.erni!=3||!player.countCards('h')) return false;
								break;
							}
						}
					},
					result:{player:1},
					respondSha:true,
					respondShan:true,
					save:true,
				},
				subSkill:{
					going:{
						enable:['chooseToUse','chooseToRespond'],
						//发动时提示的技能描述
						prompt:function(event,player){
							var player = player||event.player;
							var str = get.skillInfoTranslation('erni',player);
							return str;
						},
						viewAs:function(cards,player){
							var name = false;
							var suit = get.suit(cards[0],player);
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							//返回判断结果
							if(name) return {name:name,suit:suit};
							return null;
						},
						viewAsFilter:function(player){
							var cards = player.getCards('h');
							if(!cards.length)	return false;
							var filter=event.filterCard;
							var name = false;
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							for(var i=1;i<cards.length;i++){
								var suit = get.suit(cards[i],player);
								if(filter({name:name,suit:suit},player,event)) return true;
							}
							return false;
						},
						check:function(card){
							return 7-get.value(card);
						},
						filter:function(event,player) {
							return player.countCards('h');
						},
						filterCard:function(card,player,event){
							event=event||_status.event;
							var filter=event._backup.filterCard;
							var name = false;
							var suit = get.suit(card,player);
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							if(filter({name:name,suit:suit},player,event)) return true;
							return false;
						},
						precontent:function(){
							'step 0'
							event.cards = event.result.cards.slice(0);
							player.$throw(event.cards);
							player.lose(event.cards,ui.ordering);
							event.result.card.cards=[];
							event.result.cards=[];
							delete event.result.card.number;
							'step 1'
							game.broadcast(function(){
								ui.arena.classList.add('thrownhighlight');
							});
							ui.arena.classList.add('thrownhighlight');
							game.addVideo('thrownhighlight1');
							player.showCards(event.cards,'『耳匿』展示手牌');
							while(event.cards.length>0){
								var card=event.cards.pop();
								card.fix();
								ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
								game.updateRoundNumber();
							}
							'step 2'
							game.broadcastAll(function(){
								ui.arena.classList.remove('thrownhighlight');
							});
							game.addVideo('thrownhighlight2');
							if(event.clear!==false){
								game.broadcastAll(ui.clear);
							}
							if(player.storage.erni!=3)	player.storage.erni++;
							else	player.storage.erni = 1;
						},
					},
					change:{
						trigger:{player:['shouruAfter','chonghuangAfter','baoxiaoAfter','tianlveAfter','luxianAfter','useSkillAfter']},
						priority:199,
						prompt2:'转换一次『耳匿』',
						filter:function(event,player){
							name = event.name;
							if(name=='useSkill')	name = event.skill;
							if(['erni_change','erni_going'].contains(name))	return false;
							var info=lib.skill[name];
							if(info.equipSkill||info.ruleSkill||info.silent)	return false;
							return true;
						},
						content:function(){
							if(player.storage.erni!=3)	player.storage.erni++;
							else	player.storage.erni = 1;
						}
					}
				}
			},
			shouru:{
				audio:4,
				trigger:{player:['damageAfter','useCardAfter','respondAfter']},
				priority:199,
				frequent:true,
				filter:function(event,player){
					if(player.hasSkill('shouru_used'))	return false;
					return (event.name=='damage'||['useCard','respond'].contains(event.name)&&event.skill=='erni_going')&&game.hasPlayer(function(cur){
						return cur!=player&&get.distance(_status.currentPhase,cur,'pure')==1&&cur.countGainableCards(player,'he');
					});
				},
				content:function(){
					'step 0'
					event.source = trigger.player;
					player.chooseTarget(get.prompt2('shouru'),true,function(card,player,target){
						return target!=player&&get.distance(_status.currentPhase,target,'pure')==1&&target.countGainableCards(player,'he');
					},function(target){
						var player = _status.event.player;
						return 8-get.attitude(player,target);
					});
					'step 1'
					if(result.targets&&result.targets.length){
						player.addTempSkill('shouru_used')
						player.gainPlayerCard('he',result.targets[0],'『受乳』：获得其一张牌');
					}
				},
				ai:{
					expose:0.1,
					threaten:0.8,
				},
				subSkill:{
					used:{}
				},
			},
			chonghuang:{
				audio:true,
				group:'P_SP',
				trigger:{global:'changeHp'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				forceunique:true,
				filter:function(event,player){
					if(player.hasZhuSkill('yinzun')&&event.player.group==player.group){
						return event.player.hp==1;
					}
					return event.player==player&&player.hp==1;
				},
				content:function(){
					'step 0'
					var list;
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='psp') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='psp';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='psp';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('AyanaNana');
					if(list.length){
						player.chooseButton(true).set('ai',function(button){
							return 5||get.rank(button.link,true)-lib.character[button.link][2];
						}).set('createDialog',['『崇皇』：获得其中一名角色所有技能',[list.randomGets(3),'character']]);
					}else event.finish();
					'step 1'
					if(result.links&&result.links.length){
						player.storage.chonghuang = true;
						player.awakenSkill('chonghuang');
						player.loseMaxHp();
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								player.addTempSkill(skills[j],'roundStart');
							}
						}
						player.storage.chonghuang_kamen = result.links[0];
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('chonghuang',result.links[0]);
						player.addTempSkill('chonghuang_kamen','roundStart');
						player.markSkill('P_SP');
					}
				},
				subSkill:{
					kamen:{
						onremove:function(player,skill){
							console.log(player.storage.P_SP)
							if(player.hasSkill('P_SP')&&player.storage[skill]&&player.storage.P_SP.contains(player.storage[skill])){
								player.storage.P_SP.remove(player.storage[skill]);
								delete player.storage[skill]
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
							}
						}
					},
				}
			},
			yinzun:{
				unique:true,
				zhuSkill:true,
			},
			//阿秋
			jiren:{
				audio:6,
				audioname:['jike'],
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return true;
				},
				content:function(){
					var func=function(result){
						var num = 0
						if(get.subtype(result)=='equip1'){
							num+=get.value(result,player,'raw')/2;
						}
						if(get.color(result)=='red'){
							num+=1.5;
						}
						return num;
					};
					player.judge(func).callback=lib.skill.jiren.callback;
				},
				callback:function(){
					'step 0'
					if(event.judgeResult.color=='red'){
						player.draw();
					}
					if(get.subtype(event.judgeResult.name)=='equip1'){
						player.gain(card,'gain2');
					}
					if(event.judgeResult.suit){
						player.storage.jiren_going = [];
						player.storage.jiren_going.add(event.judgeResult.suit);
						if(!player.hasSkill('jiren_going'))	player.addTempSkill('jiren_going');
						player.markSkill('jiren_going');
					}
				},
				group:'jiren2',
				ai:{
					threaten:1.2,
					order:16,
					result:{player:1},
				},
				subSkill:{
					going:{
						audio:false,
						marktext:"祭",
						locked:true,
						intro:{
							name:'戮秋',
							content:function (storage,player,skill){
								if(storage.length){
									return '本回合上一次『祭刃』判定结果：'+ get.translation(storage);
								}
							},
						},
						onremove:true,
					},
				}
			},
			jiren2:{
				audio:false,
				enable:'phaseUse',
				filter:function(event,player){
					return player.getStat('skill').jiren;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					var next = game.createEvent('resetSkill');
					[next.player] = [player]
					next.setContent(function(){
						player.popup('重置');
						game.log(player,'重置了『祭刃』');
						player.getStat('skill').jiren--;
					});
				},
				ai:{
					order:function(item,player){
						if(player.awakenedSkills.contains('canxin')){
							if(player.isHealthy()||player.hp>3)	return 10;
						}
						else{
							if(player.storage.jiren_going&&player.hp>1){
								var num = player.countCards('hs',function(card){
									var info=get.info(card);
									if(info.allowMultiple==false) return false;
									return player.hasUseTarget(card);
								});
								if(num>=3)	return -1;
								return num/player.countCards('hs')<(player.hp/4);
							}
						}
					},
					result:{
						player:function(player,target){
							if(player.hasUnknown(3))	return 0;
							if(!player.storage.jiren_going)		return player.countCards('hs');
							else if(player.countCards('hs')>=4)	return 0.1;
							else return -1;
						},
					},
				},
			},
			luqiu:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				trigger:{global:['loseEnd','cardsDiscardEnd']},
				filter:function(event,player){
					var record = player.storage.jiren_going;
					if(!record)		return false;
					return event.cards&&event.cards.filter(function(card){
						return get.position(card,true)=='d'&&record.contains(get.suit(card));
					}).length;
				},
				direct:true,
				content:function(){
					'step 0'
					if(player.storage.luqiu==1){
						player.chooseTarget(get.prompt('luqiu')+'视为使用一张杀？',function(card,player,target){
							return player.canUse('sha',target);
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,{name:'sha'},player,player);
						}).set('prompt2',get.skillInfoTranslation('luqiu',player));
					}else if(player.storage.luqiu==2){
						player.chooseBool(function(){
							return 1;
						}).set('prompt','###'+get.prompt('luqiu')+'摸一张牌###'+get.skillInfoTranslation('luqiu',player));
					}else{
						player.chooseCard('he').set('ai',function(card){
							var player=_status.event.player;
							if(player.storage.jiren_going.contains(get.suit(card)))		return 12-get.value(card);
							return 10-get.value(card);
						}).set('prompt','###'+get.prompt('luqiu')+'弃一张牌###'+get.skillInfoTranslation('luqiu',player));
					}
					'step 1'
					if(result.bool){
						if(player.storage.luqiu<3)	player.storage.luqiu++;
						else	player.storage.luqiu = 1;
						if(result.targets&&result.targets.length)	player.useCard({name:'sha'},result.targets,false);
						else if(result.cards&&result.cards.length)	player.discard(result.cards);
						else	player.draw();
					}
				},
				mod:{
					aiValue:function(player,card,num){
						if(get.suit(card)&&player.storage.jiren_going&&player.storage.jiren_going.contains(get.suit(card))) return num/10;
					},
					aiOrder:function(player,card,num){
						if(get.suit(card)&&player.storage.jiren_going&&player.storage.jiren_going.contains(get.suit(card))) return num+8;
					},
				},
				ai:{
					combo:'jiren',
					useSha:2,
					effect:{
						player:function(card,player){
							if(get.suit(card)&&player.storage.jiren_going&&player.storage.jiren_going.contains(get.suit(card))){
								if(get.name(card)=='sha')	return [1,3];
								return [1,2];
							}
							if(get.name(card)=='sha')	return [1,2];
						}
					},
					result:{player:1},
				},
			},
			canxin:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				forceunique:true,
				filter:function(event,player){
					return player.countCards('he')>0&&player.isDamaged();
				},
				check:function(event,player){
					return player.storage.jiren_going&&player.countCards('he',function(card){
						return get.tag(card,'damage')
					})>0&&player.isDamaged();
				},
				content:function(){
					'step 0'
					player.storage.canxin = true;
					player.awakenSkill('canxin');
					'step 1'
					var next=player.chooseCard('he','###重铸一张牌###若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作');
					next.set('ai',function(card){
						if(get.tag(card,'damage'))	return 15-get.value(card);
						return 6-get.value(card);
					});
					'step 2'
					if(result.bool&&result.cards){
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw();
						var card = result.cards[0];
						if(get.tag(card,'damage'))	event.goto(1);
						else{
							player.recover();
							var evt=_status.event.getParent('phase');
							if(evt){
								evt.finish();
							}
						}
					}
				}
			},
			//红晓音
			quankai:{
				audio:7,
				trigger:{source:'damageEnd'},
				direct:true,
				round:1,
				filter:function(event,player){
					return event.player.isIn()&&event.player.countDiscardableCards(player,'hej')&&!player.hasSkill('quankai_round');
				},
				content:function(){
					'step 0'
					player.discardPlayerCard(trigger.player,'hej',get.prompt2('quankai'));
					'step 1'
					if(result.links&&result.links.length){
						player.logSkill('quankai',trigger.player);
						player.storage.quankai = result.links.slice(0);
						player.markSkill('quankai');
						player.addTempSkill('quankai_round','roundStart');
					}
				},
				mark:true,
				intro:{content:'cards'},
				group:'quankai_gainBy',
				subSkill:{
					round:{},
					gainBy:{
						trigger:{player:'useCardAfter'},
						direct:true,
						filter:function(event,player){
							var type=get.type2(event.card);
							return type=='trick'&&player.storage.quankai;
						},
						content:function(){
							'step 0'
							player.chooseCardButton('从弃牌堆获得上次『拳开』的弃牌，否则重置『拳开』',1,player.storage.quankai).set('filterButton',function(button){
								return _status.event.list.contains(button.link);
							}).set('list',player.storage.quankai.filterInD('d')).set('ai',function(button){
								return get.value(button.link)>0;
							});
							'step 1'
							if(result.bool&&result.links){
								player.logSkill('quankai');
								player.gain(result.links,'gain2');
							}else{
								var roundname = 'quankai_roundcount';
								if(player.hasMark(roundname)){
									player.popup('重置');
									var next = game.createEvent('resetSkill');
									[next.player,next.resetSkill] = [player,'quankai']
									next.setContent(lib.element.content.resetRound);
								}
							}
						},
					}
				}
			},
			heyuan:{
				audio:2,
				group:'P_SP',
				trigger:{player:'phaseDrawBegin1'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				forceunique:true,
				filter:function(event,player){
					return !event.numFixed&&player.isDamaged();
				},
				check:function(event,player){
					return player.countCards('hs',function(card){
						return get.tag(card,'damage');
					})>=3;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					player.storage.heyuan = true;
					player.awakenSkill('heyuan');
					event.num = 0;
					'step 1'
					if(event.num>1)		event.finish()
					else{
						var list;
						if(_status.characterlist){
							list=[];
							for(var i=0;i<_status.characterlist.length;i++){
								var name=_status.characterlist[i];
								if(lib.character[name][1]=='psp') list.push(name);
							}
						}
						else if(_status.connectMode){
							list=get.charactersOL(function(i){
								return lib.character[i][1]!='psp';
							});
						}
						else{
							list=get.gainableCharacters(function(info){
								return info[1]=='psp';
							});
						}
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
								list.add(players[i].name);
								list.add(players[i].name1);
								list.add(players[i].name2);
							}
						}
						list.remove(player.name);
						list.remove(player.name1);
						list.remove(player.name2);
						list.remove('KurenaiAkane');
						if(list.length){
							player.chooseButton(true).set('ai',function(button){
								return 5||get.rank(button.link,true)-lib.character[button.link][2];
							}).set('createDialog',['『合缘』：获得其中一名角色的所有'+(event.num>0?'':'非')+'限定技',[list.randomGets(3),'character']]);
						}else event.finish();
					}
					'step 2'
					if(result.links&&result.links.length){
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								if(lib.skill[skills[j]]&&
								(event.num?(lib.skill[skills[j]].limited):(!lib.skill[skills[j]].limited))){
									player.addTempSkill(skills[j],{player:'phaseBegin'});
								}
							}
						}
						if(!player.storage.heyuan_qiyuan)	player.storage.heyuan_qiyuan = [];
						player.storage.heyuan_qiyuan.addArray(result.links);
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('heyuan',result.links[0]);
						player.addTempSkill('heyuan_qiyuan',{player:'phaseBegin'});
						player.markSkill('P_SP');
					}
					'step 3'
					event.num++;
					event.goto(1);
				},
				subSkill:{
					qiyuan:{
						onremove:function(player,skill){
							console.log(player.storage.P_SP)
							if(player.hasSkill('P_SP')&&player.storage[skill]&&player.storage[skill].length){
								for(var i=0;i<player.storage[skill].length;i++){
									if(player.storage.P_SP.contains(player.storage[skill][i])){
										player.storage.P_SP.remove(player.storage[skill][i]);
									}
								}
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
								delete player.storage[skill]
							}
						}
					}
				}
			},
			//拉布里
			yangyao:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				audio:false,
				enable:'phaseUse',
				filter:function(event,player){
					var list =[];
					if(!player.isAuto)	return true;
					for(var i=0;i<ui.discardPile.childElementCount;i++){
						var card=ui.discardPile.childNodes[i];
						if(player.storage.yangyao&&player.storage.yangyao.contains(get.name(card))) continue;
						if(get.type2(card)=='trick'){
							list.push(card);
						}
					}
					return list.length;
				},
				filterCard:function(card,player){
					if(ui.selected.cards.length) return get.color(card)==get.color(ui.selected.cards[0]);
					return player.countCards('hes',{color:get.color(card)})>=2;
				},
				check:function(card){
					var player = _status.event.player;
					if(ui.selected.cards.length)	return 10-get.value(card);
					return 7-player.hp-get.value(card);
				},
				complexCard:true,
				selectCard:function(){
					if(ui.selected.cards.length) return 2;
					return [0,2];
				},
				filterTarget:true,
				position:'he',
				content:function(){
					'step 0'
					if(!cards.length) player.loseHp();
					'step 1'
					var list=[];
					for(var i=0;i<ui.discardPile.childElementCount;i++){
						var card=ui.discardPile.childNodes[i];
						if(player.storage.yangyao&&player.storage.yangyao.contains(get.name(card))) continue;
						if(get.type2(card)=='trick'){
							list.push(card);
						}
					}
					if(list.length){
						target.chooseCardButton('『秧耀』：选择获得一张锦囊牌',list,true).ai=function(button){
							return get.value(button.link);
						};
					}else	event.finish();
					'step 2'
					if(result.bool&&result.links){
						if(!player.storage.yangyao)		player.storage.yangyao = [];
						player.storage.yangyao.push(get.name(result.links[0]))
						target.gain(result.links,'gain2','log');
					}
				},
				group:'yangyao_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						priority:23,
						filter:function(event,player){
							return player.storage.yangyao.length;
						},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.yangyao&&player.storage.yangyao.length){
								player.storage.yangyao.length = 0;
							}
						}
					}
				},
				ai:{
					order:function(item,player){
						if(player.hp<=1&&player.countCards('hes')<=3)	return 0;
						if(player.isHealthy()||player.hp>3)		return 9;
						return 2;
					},
					result:{
						player:function(player,target){
							if(player.hp==1)	return -10;
							if(ui.selected.cards.length<2){
								return player.hp-6;
							}
							return -2.5;
						},
						target:function(player,target){
							var result = 0;
							for(var i=0;i<ui.discardPile.childElementCount;i++){
								var card=ui.discardPile.childNodes[i];
								if(player.storage.yangyao.contains(get.name(card))) continue;
								if(get.type2(card)=='trick'){
									result = Math.max(result,get.value(card,target,'raw'));
								}
							}
							return result;
						}
					},
				},
			},
			shili:{
				audio:true,
				trigger:{global:'phaseEnd'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'wood',
				forceunique:true,
				filter:function(event,player){
					if(!player.isDamaged())		return false;
					var history = player.getHistory('useCard');
					for(var i=0;i<history.length;i++){
						if(get.type2(history[i].card)!='basic') return true;
					}
				},
				check:function(event,player){
					var history = player.getHistory('useCard');
					var num = 0;
					for(var i=0;i<history.length;i++){
						if(get.type2(history[i].card)!='basic') num++;
					}
					if(player.hasUnknown(1)) return false;
					return num>=3;
				},
				content:function(){
					'step 0'
					var history = player.getHistory('useCard');
					var num = 0;
					for(var i=0;i<history.length;i++){
						if(get.type2(history[i].card)!='basic') num++;
					}
					event.num = num;
					player.storage.shili = true;
					player.awakenSkill('shili');
					player.chooseTarget('『拾璃』：令一名角色摸'+get.cnNumber(event.num)+'张牌并执行一个额外的出牌阶段',true,function(card,player,target){
						return target.isIn();
					}).set('num',event.num).ai=function(target){
						var att=get.attitude(_status.event.player,target);
						return att*_status.event.num;
					};
					'step 1'
					if(result.bool&&result.targets){
						event.target = result.targets[0];
						event.target.draw(event.num);
					}else	event.finish();
					'step 2'
					event.target.phaseUse();
				},
			},
			//西魔幽
			akjianwu:{
				trigger:{player:['useCard','respond']},
				priority:5,
				filter:function(event,player){
					var logTarget = get.copy(lib.skill.akjianwu.logTarget);
					var target = logTarget(event,player);
					return get.type(event.card)=='basic'&&player.canCompare(target);
				},
				check:function(event,player){
					var logTarget = get.copy(lib.skill.akjianwu.logTarget);
					var target = logTarget(event,player);
					return get.attitude(player,target)<0||event.card.name=='tao';
				},
				logTarget:function(event,player){
					if(event.name=='respond')	return event.source;
					if(['sha','qi','jiu','tao'].contains(event.card.name))	return event.targets[0];
					if(event.respondTo) return event.respondTo[0];
				},
				content:function(){
					'step 0'
					var logTarget = get.copy(lib.skill.akjianwu.logTarget);
					var target = logTarget(trigger,player);
					event.target = target;
					player.chooseToCompare(event.target);
					'step 1'
					if(result.winner&&result.loser){
						event.winner = result.winner;
						event.loser = result.loser;
						event.card = trigger.card;
						var list = ['于'+get.translation(event.card)+'结算后获得之','展示并获得对方的一张牌'];
						var check = 1;
						if(event.card.cards&&get.value(event.card.cards,event.winner,'raw')>event.loser.countGainableCards(event.winner,'he'))	check = 0;
						event.winner.chooseControlList(list,true,function(event,player){
							return _status.event.check;
						}).set('check',check);
					}
					else event.finish();
					'step 2'
					switch(result.index){
						case 0: {
							if(event.card.cards&&event.card.cards.length){
								var next=game.createEvent('akjianwu_gain2');
								event.next.remove(next);
								trigger.after.push(next);
								next.player=event.winner;
								next.cards=event.card.cards;
								next.setContent(lib.skill.akjianwu.akjianwu_gain2);
							}
							event.finish();
							break;
						}
						case 1: {
							if(event.loser.countGainableCards(event.winner,'he')>0)
							event.winner.gainPlayerCard(event.loser,'he',true,'visibleMove');
							break;
						}
					}
					'step 3'
					if(result.links){
						event.winner.chooseToUse({
							cards:result.links,
							filterCard:function(card){
								if(get.itemtype(card)!='card'||!_status.event.cards||!_status.event.cards.contains(card)) return false;
								if(lib.filter.filterCard.apply(this,arguments)){
									if(card.name=='sha')	return true;
									var range=get.select(get.info(card).selectTarget);
									if(range[0]==1&&range[1]==1) return true;
								}
							},
							prompt:'是否使用获得牌中的一张？',
						});
					}
				},
				akjianwu_gain2:function(){
					'step 0'
					event.gains = cards.filter(function(card){
						return card.isInPile();
					})
					if(event.gains.length)	player.gain(cards,'gain2');
					'step 1'
					player.chooseToUse({
						cards:event.gains,
						filterCard:function(card){
							if(get.itemtype(card)!='card'||!_status.event.cards||!_status.event.cards.contains(card)) return false;
							if(lib.filter.filterCard.apply(this,arguments)){
								if(card.name=='sha')	return true;
								var range=get.select(get.info(card).selectTarget);
								if(range[0]==1&&range[1]==1) return true;
							}
						},
						prompt:'是否使用获得牌中的一张？',
					});
				},
				ai:{
					threaten:function(player,target){
						if(target.countCards('hs')>=2) return 0.7;
					},
				}
			},
			tongzhao:{
				audio:true,
				group:'P_SP',
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'yami',
				forceunique:true,
				trigger:{player:['chooseToCompareAfter','compareMultipleAfter'],target:['chooseToCompareAfter','compareMultipleAfter']},
				filter:function(event,player){
					if(event.preserve)		return false;
					if(event.result.tie)	return true;
					if(player==event.player){
						return event.num1<=event.num2;
					}
					else{
						return event.num1>=event.num2;
					}
				},
				check:function(event,player){
					if(player.hasUnknown(1))	return event.result.tie;
					return player.countCards('hes')>=4;
				},
				content:function(){
					'step 0'
					player.storage.tongzhao = true;
					player.awakenSkill('tongzhao');
					if(trigger.result.tie){
						event.num = 1;
					}
					'step 1'
					if(event.num>1)		event.finish()
					else{
						var list;
						if(_status.characterlist){
							list=[];
							for(var i=0;i<_status.characterlist.length;i++){
								var name=_status.characterlist[i];
								if(lib.character[name][1]=='psp') list.push(name);
							}
						}
						else if(_status.connectMode){
							list=get.charactersOL(function(i){
								return lib.character[i][1]!='psp';
							});
						}
						else{
							list=get.gainableCharacters(function(info){
								return info[1]=='psp';
							});
						}
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
								list.add(players[i].name);
								list.add(players[i].name1);
								list.add(players[i].name2);
							}
						}
						list.remove(player.name);
						list.remove(player.name1);
						list.remove(player.name2);
						list.remove('AkumaYuu');
						if(list.length){
							player.chooseButton(true).set('ai',function(button){
								return 5||get.rank(button.link,true)-lib.character[button.link][2];
							}).set('createDialog',['『同召』：获得其中一名角色的所有技能',[list.randomGets(3),'character']]);
						}else event.finish();
					}
					'step 2'
					if(result.links&&result.links.length){
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								if(lib.skill[skills[j]]){
									player.addTempSkill(skills[j],{player:['loseHpAfter','damageAfter']});
								}
							}
						}
						if(!player.storage.tongzhao_wangzuo)	player.storage.tongzhao_wangzuo = [];
						player.storage.tongzhao_wangzuo.addArray(result.links);
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('tongzhao',result.links[0]);
						player.addTempSkill('tongzhao_wangzuo',{player:['loseHpAfter','damageAfter']});
						player.markSkill('P_SP');
					}
					'step 3'
					if(event.num>0){
						event.num--;
						event.goto(1);
					}
				},
				subSkill:{
					wangzuo:{
						onremove:function(player,skill){
							console.log(player.storage.P_SP)
							console.log(player.storage.tongzhao_wangzuo)
							if(player.hasSkill('P_SP')&&player.storage[skill]&&player.storage[skill].length){
								for(var i=0;i<player.storage[skill].length;i++){
									if(player.storage.P_SP.contains(player.storage[skill][i])){
										player.storage.P_SP.remove(player.storage[skill][i]);
									}
								}
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
								delete player.storage[skill]
							}
						}
					}
				}
			},
			//YY
			bianshi:{
				trigger:{global:'phaseBegin'},
				priority:23,
				direct:true,
				filter:function(event,player){
					return event.player.hp>=player.hp&&player.countCards('h',function(card){
						return !card.hasGaintag('ming_');
					});
				},
				content:function(){
					'step 0'
					var check = get.attitude(player,trigger.player)<=0&&trigger.player.countCards('h')>=2;
					player.chooseCard('h',get.prompt2('bianshi'),function(card){
						return !card.hasGaintag('ming_');
					}).set('ai',function(card){
						if(_status.event.check&&get.type2(card)!='equip')	return 8-get.value(card)+Math.random();
						else	return 0;
					}).set('check',check);
					'step 1'
					if(result.bool){
						event.target = trigger.player;
						player.showCards(result.cards,'『辨识』亮出手牌');
						player.addGaintag(result.cards,'ming_bianshi');
						game.delayx();
						player.logSkill('bianshi',event.target);
						event.target.storage.bianshi2 = get.type2(result.cards[0]);
						event.target.addTempSkill('bianshi2');
					}
				}
			},
			bianshi2:{
				trigger:{global:['loseEnd','cardsDiscardEnd']},
				filter:function(event,player){
					var record = player.storage.bianshi2;
					return event.cards&&event.cards.filter(function(card){
						return get.position(card,true)=='d'&&get.type2(card)==record;
					}).length>0;
				},
				forced:true,
				mark:true,
				intro:{content:'指定的类型：$'},
				onremove:['bianshi','bianshi2'],
				content:function(){
					'step 0'
					if(player.storage.bianshi&&player.storage.bianshi>=2){
						player.chooseToDiscard('『辨识』弃牌','he',true);
						event.finish();
					}else{
						player.draw();
					}
					'step 1'
					if(!player.storage.bianshi)	player.storage.bianshi = 1;
					else	player.storage.bianshi++;
					'step 2'
					if(player.storage.bianshi===2)	player.loseHp();
				}
			},
			ming_bianshi:{},
			
			P_SP:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:'P',
				intro:{
					onunmark:function(storage,player){
						if(_status.characterlist) _status.characterlist.addArray(storage);
						storage=[];
					},
					mark:function(dialog,storage,player){
						if(storage&&storage.length){
							dialog.addText('已叠加：'+get.cnNumber(storage.length)+'位P-SP角色');
							dialog.addSmall([storage,'character']);
						}
					},
					content:function(storage,player){
						return '已叠加：'+get.cnNumber(storage.length)+'位P-SP角色'
					},
					markcount:function(storage,player){
						if(storage&&storage.length) return storage.length;
						return 0;
					}
				},
			},
			//机萪
			qianjiwanbian:{
				audio:4,
				trigger:{source:'damageAfter',player:'phaseBegin'},
				priority:199,
				frequent:true,
				group:['qianjiwanbian_change','qianjiwanbian_clear'],
				filter:function(event,player){
					if(event.name=='damage'&&event.getParent()&&event.getParent().name!="trigger"&&event.getParent(2)&&event.getParent(2).qianjiwanbian)	return false;
					return true;
				},
				gainable:['前','千','钱','签','欠','浅','迁','倩','谦','倩','牵','乾','铅','遣','仟','纤','黔','嵌','钳','歉','虔','谴','堑',
					'技','级','及','机','祭','集','籍','基','即','记','急','吉','寄','季','极','继','计','纪','姬','己',
					'挤','剂','济','积','击','肌','忌','棘','疾','激','际','系','寂','迹','脊','辑','藉','稷','戟','骑','悸','觊','嫉',
					'完','玩','晚','碗','万','湾','丸','弯','婉','挽','腕','顽','绾','蜿','宛',
					'边','变','便','编','遍','扁','辩','鞭','辨','贬','匾','辫',
				],
				content:function(){
					'step 0'
					if(!player.storage.qianjiwanbian_change)	player.storage.qianjiwanbian_change = 'thunder';
					var list=lib.linked.slice(0);
					list.remove('kami');
					list.remove(player.storage.qianjiwanbian_change);
					event.map = {};
					for(var i=0;i<list.length;i++){
						event.map[get.rawName(list[i])] = list[i];
						list[i] = get.rawName(list[i]);
					}
					list.push('取消');
					player.chooseControl('dialogcontrol',list).set('ai',function(){
						return list.randomGets();
					}).set('prompt','『千机万变』：将（'+(get.rawName(player.storage.qianjiwanbian_change))+'）改写为：');
					'step 1'
					if(result.control!='取消'){
						player.storage.qianjiwanbian_change = event.map[result.control];
					}else{
						event.finish();
					}
					'step 2'
					if(_status.connectMode){

					}else{

					}
					var list=get.gainableSkills(function(info,skill){
						var name = get.translation(skill);
						for(var i=0;i<name.length;i++){
							if(lib.skill.qianjiwanbian.gainable.contains(name.substring(i,i+1)))	return true;
						}
					});
					//console.log(list);
					list.remove(player.getSkills());
					list.add('qianjiwanbian');
					player.discoverSkill(list);
					// list=list.randomGets(3);
					// event.skillai=function(){
					// 	return get.max(list,get.skillRank,'item');
					// };
					'step 3'
					var link=result.skill;
					console.log(link)
					if(link){
						if(trigger.getParent().name!="trigger"&&!trigger.getParent(2).qianjiwanbian)	trigger.getParent(2).qianjiwanbian = true;
						if(link!='qianjiwanbian'){
							player.addAdditionalSkill('qianjiwanbian',link,true);
							player.addSkillLog(link);
						}
						if(player.storage.qianjiwanbian_clear===true&&event.reapeat!=true){
							event.reapeat = true;
							event.goto(2);
						}
						if(link=='qianjiwanbian'&&player.storage.qianjiwanbian_clear!=true){
							game.playAudio('skill','qianjiwanbian_mua');
							player.storage.qianjiwanbian_clear = true;
							game.log(player,'改写了','#y『千机万变』');
						}
					}
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(get.tag(card,'damage')) return [1,0.5];
						},
					},
					threaten:3,
				},
				subSkill:{
					change:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 'thunder';
						},
						trigger:{source:'damageBegin2'},
						priority:199,
						prompt:function(event){
							var str = '可以将本次对'+get.translation(event.player)+'造成的伤害改为（';
							str+=get.rawName(_status.event.player.storage.qianjiwanbian_change);
							str+='）属性';
							return str;
						},
						filter:function(event,player){
							return player.storage.qianjiwanbian_change&&event.nature!=player.storage.qianjiwanbian_change;
						},
						content:function(){
							trigger.nature = player.storage.qianjiwanbian_change;
						}
					},
					clear:{
						audio:4,
						trigger:{player:'phaseBegin'},
						priority:200,
						forced:true,
						silent:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.storage.qianjiwanbian_clear = false;
							player.removeAdditionalSkill('qianjiwanbian');
						}
					}
				}
			},
			//新科娘
			daimao:{
				mod:{
					cardUsable:function(card,player,num){
						if(player.getStorage('daimao_mark').filter(function(daimao){
							return get.suit(daimao)==get.suit(card)
						}).length) return Infinity;
					},
					targetInRange:function(card,player,target){
						if(player.getStorage('daimao_mark').filter(function(daimao){
							return get.suit(daimao)==get.suit(card)
						}).length>0) return true;
					},
				},
				enable:'chooseToUse',
				skillAnimation:'epic',
				locked:true,
				filter:function(event,player){
					if(event.type!='dying') return false;
					if(player!=event.dying) return false;
					return player.countCards('hes',function(card){
						if(player.getStorage('daimao_mark').filter(function(daimao){
							return get.suit(daimao)==get.suit(card)
						}).length==0) return true;
					});
				},
				filterCard:function(card,player){
					if(player.getStorage('daimao_mark').filter(function(daimao){
						return get.suit(daimao)==get.suit(card)
					}).length==0) return true;
				},
				position:'he',
				content:function(){
					'step 0'
					var audio = 'daimao_'+player.getStorage('daimao_mark').length;
					game.playAudio('skill',audio);
					game.broadcast(function(audio){
						game.playAudio('skill',audio);
					},audio);
					player.$give(cards,player);
					player.lose(cards,ui.special,'toStorage');
					player.markAuto('daimao_mark',cards);
					'step 1'
					player.loseMaxHp();
					'step 2'
					player.recover(player.maxHp-player.hp);
					'step 3'
					player.draw(3);
				},
				ai:{
					skillTagFilter:function(player){
						if(player.hp>0) return false;
					},
					save:true,
					result:{
						player:3,
					},
					threaten:function(player,target){
						if(player.getStorage('daimao_mark')<=2) return 0.8;
					}
				},
				group:['daimao_mark','daimao_start'],
				subSkill:{
					mark:{
						locked:true,
						intro:{
							name:'呆毛',
							content:'cards',
							onunmark:'throw',
						},
					},
					start:{
						forced:true,
						priority:10,
						trigger:{
							global:'gameStart',
							player:'enterGame',
						},
						content:function(){
							if(!player.storage.daimao_mark) player.storage.daimao_mark = [];
							var cards = get.cards();
							game.cardsGotoSpecial(cards);
							player.$gain2(cards);
							player.markAuto('daimao_mark',cards);
						},
					}
				}
			},
			hongtou:{
				group:['hongtou2','hongtou_shan'],
				unique:true,
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('hongtou')||!game.hasPlayer(function(current){
						return current!=player&&current.isGuoV();
					})) return false;
					return !event.hongtou&&(event.type!='phase'||!player.hasSkill('hongtou3'));
				},
				enable:['chooseToUse','chooseToRespond'],
				viewAs:{name:'sha'},
				filterCard:function(){return false},
				selectCard:-1,
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.3;
					},
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.hasZhuSkill('hongtou')||!game.hasPlayer(function(current){
							return current!=player&&current.isGuoV();
						})) return false;
					},
				},
				subSkill:{
					shan:{
						unique:true,
						zhuSkill:true,
						trigger:{player:['chooseToRespondBefore','chooseToUseBefore']},
						filter:function(event,player){
							if(event.responded) return false;
							if(player.storage.hongtou_shaning) return false;
							if(!player.hasZhuSkill('hongtou_shan')) return false;
							if(!event.filterCard({name:'shan'},player,event)) return false;
							return game.hasPlayer(function(current){
								return current!=player&&current.isGuoV();
							});
						},
						check:function(event,player){
							if(get.damageEffect(player,event.player,player)>=0) return false;
							return true;
						},
						content:function(){
							"step 0"
							if(event.current==undefined) event.current=player.next;
							if(event.current==player){
								event.finish();
							}
							else if(event.current.isGuoV()){
								if((event.current==game.me&&!_status.auto)||(
									get.attitude(event.current,player)>2)||
									event.current.isOnline()){
									player.storage.hongtou_shaning=true;
									var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张闪？',{name:'shan'});
									next.set('ai',function(){
										var event=_status.event;
										return (get.attitude(event.player,event.source)-2);
									});
									next.set('skillwarn','替'+get.translation(player)+'打出一张闪');
									next.autochoose=lib.filter.autoRespondShan;
									next.set('source',player);
								}
							}
							"step 1"
							player.storage.hongtou_shaning=false;
							if(result.bool){
								event.finish();
								trigger.result={bool:true,card:{name:'shan',isCard:true}};
								trigger.responded=true;
								trigger.animate=false;
								if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
									event.current.ai.shown+=0.3;
									if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
								}
							}
							else{
								event.current=event.current.next;
								event.goto(0);
							}
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(player.storage.hongtou_shaning) return false;
								if(!player.hasZhuSkill('hongtou_shan')) return false;
								return game.hasPlayer(function(current){
									return current!=player&&current.isGuoV();
								});
							},
						},
					}
				}
			},
			hongtou2:{
				trigger:{player:['useCardBegin','respondBegin']},
				logTarget:'targets',
				filter:function(event,player){
					return event.skill=='hongtou';
				},
				forced:true,
				content:function(){
					"step 0"
					delete trigger.skill;
					trigger.getParent().set('hongtou',true);
					"step 1"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addTempSkill('hongtou3');
						event.finish();
						trigger.cancel();
						trigger.getParent().goto(0);
					}
					else if(event.current.isGuoV()){
						console.log(event.current)
						var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张杀？',{name:'sha'});
						next.set('ai',function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)-2);
						});
						next.set('source',player);
						next.set('hongtou',true);
						next.set('skillwarn','替'+get.translation(player)+'打出一张杀');
						next.noOrdering=true;
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 2"
					if(result.bool){
						event.finish();
						trigger.card=result.card;
						trigger.cards=result.cards;
						trigger.throw=false;
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(1);
					}
				}
			},
			hongtou3:{
				trigger:{global:['useCardAfter','useSkillAfter','phaseAfter']},
				silent:true,
				charlotte:true,
				filter:function(event){
					return event.skill!='hongtou';
				},
				content:function(){
					player.removeSkill('hongtou3');
				}
			},
			//叽叽
			guangan:{
				trigger:{global:'useCard2'},
				filter:function(event,player){
					if(player.storage.guangan>=game.countPlayer()-1)	return false;
					return event.player==player&&(event.targets.contains(player.getNext())||player.getStorage('zonghe').filter(function(zonghe){
						return event.targets.contains(zonghe);
					}).length)||(event.player==player.getPrevious()||player.getStorage('zonghe').contains(event.player))&&event.targets.contains(player);
				},
				frequent:true,
				content:function(){
					'step 0'
					player.draw();
					if(!player.storage.guangan)	player.storage.guangan = 0;
					player.storage.guangan++;
					'step 1'
					player.markSkill('guangan');
				},
				marktext:'叽',
				intro:{
					content:'本轮次已摸了&张牌',
					markcount:function(storage,player){
						return player.storage.guangan;
					}
				},
				group:'guangan_clear',
				subSkill:{
					clear:{
						trigger:{global:'roundStart'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							delete player.storage.guangan;
							player.unmarkSkill('guangan');
						}
					},
				}
			},
			lanxuan:{
				mod:{
					targetInRange:function(card,player,target){
						if(_status.event.logSkill=='lanxuan') return true;
					},
					cardUsable:function (card,player,num){
						if(_status.event.logSkill=='lanxuan') return Infinity;
					},
				},
				trigger:{source:'damageAfter'},
				filter:function(event,player){
					if(player.hasSkill('lanxuan_used1'))	return false;
					return player.countCards('hs',function(card){
						return player.hasUseTarget(card);
					});
				},
				direct:true,
				usable:1,
				content:function(){
					'step 0'
					player.chooseToUse({
						filterCard:function(card,player){
							return lib.filter.filterCard.apply(this,arguments);
						},
						prompt:get.prompt2('lanxuan')
					}).set('logSkill',['lanxuan']).set('targetRequired',true);
					'step 1'
					if(result.bool){
						player.addTempSkill('lanxuan_used1');
					}
				},
				group:'lanxuan_damageUse',
				subSkill:{
					damageUse:{
						trigger:{player:'damageAfter'},
						filter:function(event,player){
							if(player.hasSkill('lanxuan_used2'))	return false;
							return player.countCards('hs',function(card){
								return player.hasUseTarget(card);
							});
						},
						direct:true,
						usable:1,
						content:function(){
							'step 0'
							player.chooseToUse({
								filterCard:function(card,player){
									return lib.filter.filterCard.apply(this,arguments);
								},
								prompt:get.prompt2('lanxuan')
							}).set('logSkill',['lanxuan']).set('targetRequired',true);
							'step 1'
							if(result.bool){
								player.addTempSkill('lanxuan_used2');
							}
						},
					},
					used1:{},
					used2:{},
				},
				ai:{
					threaten:1.2,
				}
			},
			zonghe:{
				audio:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				unique:true,
				zhuSkill:true,
				trigger:{global:'gameDrawAfter',player:'enterGame'},
				filter:function(event,player){
					if(!player.hasZhuSkill('zonghe'))	return false;
					return game.hasPlayer(function(target){
						return target!=player&&!player.getStorage('zonghe').contains(target)
						&&(get.name(target) in lib.characterPack.clubs||target.group=='qun');
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zonghe'),function(card,player,target){
						return target!=player&&!player.getStorage('zonghe').contains(target)
						&&(get.name(target) in lib.characterPack.clubs||target.group=='qun');
					}).set('ai',function(target){
						var player = _status.event.player;
						if(target!=player.getNext())	return 5-get.attitude(player,target);
						return 3-get.attitude(player,target);
					});
					'step 1'
					if(result.bool&&result.targets){
						event.target = result.targets[0];
						player.logSkill('zonghe',event.target);
						player.storage.zonghe.add(event.target);
						player.storage.zonghe_mark = event.target;
						player.addSkill('zonghe_mark');
					}
				},
				subSkill:{
					mark:{
						mark:'character',
						locked:true,
						intro:{
							name:'纵合',
							content:'对$发动『珖黯』时无视座次限制',
						},
					}
				}
			},
			//牛牛子
			qiying:{
				trigger:{player:'damageAfter'},
				filter:function(event,player){
					if(player==_status.currentPhase)	return false;
					return lib.filter.cardEnabled({name:'nanman'},player);
				},
				check:function(event,player){
					var effect = 0;
					var players = game.players.slice(0);
					if(player.isTurnedOver()||player.isPhaseUsing())	effect+=3;
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&player.canUse('nanman',players[i]))	effect+=get.effect(players[i],{name:'nanman'},player,player);
					}
					return effect>0;
				},
				content:function(){
					'step 0'
					player.turnOver();
					'step 1'
					player.chooseUseTarget({name:'nanman'},true);
				}
			},
			hengxuan:{
				trigger:{player:'phaseJieshuBegin'},
				filter:function(event,player){
					return true;
				},
				check:function(event,player){
					return true;
				},
				frequent:true,
				content:function(){
					player.draw(2).gaintag=['hengxuan'];
				},
				group:'hengxuan_discardBy',
				subSkill:{
					discardBy:{
						mod:{
							aiValue:function(player,card,num){
								if(card.hasGaintag&&card.hasGaintag('hengxuan')) return num/10;
							},
						},
						trigger:{target:"useCardToTarget"},
						filter:function(event,player){
							return event.player!=player&&event.targets.length==1&&player.countCards('h',function(card){
								return card.hasGaintag('hengxuan');
							});
						},
						forced:true,
						content:function(){
							var hs=player.getCards('h',function(card){
								return card.hasGaintag('hengxuan');
							});
							if(hs.length) player.discard(hs);
						}
					}
				}
			},
			//高原守
			shoumi:{
				audio:2,
				trigger:{global:'gameDrawAfter',player:['enterGame','changeHp']},
				filter:function(event,player){
					if(event.name=='changeHp')	return event.num!=0;
					return true;
				},
				forced:true,
				content:function(){
					if(player.hp==0){
						delete player.nodying;
						console.log(player.nodying)
						if(trigger.num>0)	player.dying();
					}
					else{
						player.nodying=true;
						if(player.hp<0&&!player.hasSkill('shoumi_yingzi')){
							player.addAdditionalSkill('shoumi','shoumi_yingzi');
						}
						else if(player.hp>0&&!player.hasSkill('shoumi_guicai')){
							player.addAdditionalSkill('shoumi','shoumi_guicai');
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,cur){
							if(target.hp<0){
								if(get.tag(card,'recover')>0)	return [-1,0];
								if(target.hp==-1)	return [1,-1];
								if(get.tag(card,'damage')>=1||get.tag(card,'loseHp'))	return [-1.5,0];
							}
						}
					}
				},
			},
			shoumi_yingzi:{
				trigger:{player:'phaseDrawBegin2'},
				forced:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					trigger.num++;
				},
				ai:{
					threaten:1.5
				},
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					}
				}
			},
			shoumi_guicai:{
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('shoumi_guicai'),'he',function(card){
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
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'shoumi_guicai','highlight','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
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
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			yanwang:{
				trigger:{target:'useCardToTarget'},
				filter:function(event,player){
					return event.player!=player;
				},
				direct:true,
				content:function(){
					'step 0'
					player.line(trigger.player,'green');
					var check = get.recoverEffect(player,trigger.player,trigger.player);
					if(player.countCards('h')>0)	check+=0.5;
					check = check>0;
					trigger.player.chooseBool(get.prompt2('yanwang',player)).set('choice',check>0);
					'step 1'
					if(result.bool){
						trigger.player.logSkill('yanwang',player);
						player.recover(trigger.player);
					}else event.finish();
					'step 2'
					trigger.player.gainPlayerCard(player,'h',true,'visibleMove');
					'step 3'
					if(result.bool&&result.links){
						if(get.color(result.links[0])=='black'){
							if(!game.hasPlayer(function(current){
								return current!=player&&current!=trigger.player&&trigger.player.canUse('juedou',current);
							})){
								event.finish();
								return;
							}
							event.source = trigger.player;
							player.chooseTarget(true,function(card,player,target){
								var evt=_status.event.getParent();
								return evt.source.canUse({name:'juedou'},target);
							},'请选择一名角色，视为'+get.translation(trigger.player)+'对其使用【决斗】').set('ai',function(target){
								var evt=_status.event.getParent();
								return get.effect(target,{name:'juedou'},evt.source,_status.event.player)-2;
							});
						}
					}
					else event.finish();
					'step 4'
					if(result.targets){
						trigger.player.useCard({name:'juedou',isCard:true},result.targets[0],'noai');
					}
				},
			},
			//白夜真宵
			bykuangxin:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					if(event.cards==undefined)	event.cards=[];
					if(event.d10==undefined)	event.d10=[];
					next = player.judge(function(card){
						if(get.number(card)>10) return 1.5;
						return 0;
					});
					next.set('callback',function(){
						var evt = event.getParent('bykuangxin');
						if(get.number(card)>10){
							event.getParent().orderingCards.remove(card);
						}
						else{
							evt.d10.unshift(card);
							if(!evt.num){
								evt.num = 0;
							}
							evt.num++;
							if(evt.d100==undefined){
								evt.d100 = 0;
								if(get.number(card)!=10)	evt.d100+=get.number(card);
							}
							else{
								if(get.number(card)!=10||evt.d100==0)	evt.d100+=(get.number(card)*10);
							}
							if(evt.num==2){
								player.chat('1d100='+evt.d100);
								if(evt.d100>=96)		player.popup('大失败','yami');
								else if(evt.d100<=5)	player.popup('大成功','wood');
								else if(evt.d100<=40)	player.popup('成功','wood');
								else if(evt.d100>=61)	player.popup('失败','yami');
								game.delayx(1.5);
							}
						}
						game.delayx(0.2);
					});
					'step 1'
					if(event.num!=2){
						event.card=get.cards()[0];
						if(event.videoId==undefined)	event.videoId=lib.status.videoId++;
						if(result.number>10)	event.cards.push(result.card);
						for(var i of event.cards){
							event.card = i;
							game.addVideo('judge1',player,[get.cardInfo(event.card),false,event.videoId]);
							game.broadcastAll(function(player,card,str,id,cardid){
								var event;
								if(game.online){
									event={};
								}
								else{
									event=_status.event;
								}
								if(game.chess){
									event.node=card.copy('thrown','center',ui.arena).animate('start');
								}
								else{
									event.node=player.$throwordered(card.copy(),true);
								}
								if(lib.cardOL) lib.cardOL[cardid]=event.node;
								event.node.cardid=cardid;
								event.node.classList.add('thrownhighlight');
								ui.arena.classList.add('thrownhighlight');
								event.dialog=ui.create.dialog(str);
								event.dialog.classList.add('center');
								event.dialog.videoId=id;
							},player,event.card,false,event.videoId,get.id());
						}
						game.addVideo('centernode',null,get.cardsInfo(event.cards));
						event.goto(0);
					}
					else{
						if(event.videoId){
							game.addVideo('judge2',null,event.videoId);
							game.broadcast(function(id){
								var dialog=get.idDialog(id);
								if(dialog){
									dialog.close();
								}
								ui.arena.classList.remove('thrownhighlight');
							},event.videoId);
						}
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i],true)!='o'){
								event.cards.splice(i,1);
								i--;
							}
						}
						console.log(event.num,result.card,event.cards)
						player.gain(event.cards,'gain2').gaintag.add('bykuangxin');
					}
					'step 2'
					if(event.d100){
						player.showCards(event.d10,'『狂信』判定结果：'+event.d100);
						if(event.d100>=96){
							game.filterPlayer(function(cur){
								if(cur!=player)		player.randomGain('h',cur);
							})
						}
						else if(event.d100<=5){
							player.draw(2);
							player.gainMaxHp(true);
						}
						else if(event.d100<=40){
							player.recover();
						}
						else if(event.d100<=60){
						}
						else if(event.d100<=95){
							player.loseHp();
							if(player.needsToDiscard()){
								player.chooseToDiscard(player.needsToDiscard(),true);
							}
						}
					}
					'step 3'
					if(event.d100){
						if(event.d100>=96){
							player.loseMaxHp(true);
							if(lib.config.background_audio){
								game.playAudio('effect','damage2');
							}
							game.broadcast(function(){
								if(lib.config.background_audio){
									game.playAudio('effect','damage2');
								}
							});
							player.$damage(player);
						}
						else if(event.d100>=41&&event.d100<=60){
							if(player.hasUseTarget('juedou')){
								player.chooseUseTarget({name:'juedou',isCard:true},true);
							}
						}
					}
				},
				ai:{
					order:6,
					result:{
						player:1
					},
					order:11
				},
			},
			//小柔
			rouqing:{
				init:function(player,skill){
					player.storage[skill]=1;
					player.markSkill('rouqing');
				},
				marktext:'柔',
				intro:{
					content:function(storage,player){
						var str='下一次发动『柔情』时可以获得';
						if(player.storage.rouqing>4)	str+=get.cnNumber(4)+'张牌，并回复一点体力';
						else	str+=get.cnNumber(player.storage.rouqing||1)+'张牌';
						return	str;
					},
				},
				trigger:{global:'changeHp'},
				filter:function(event,player){
					return event.num<0;
				},
				usable:1,
				frequent:function(event,player){
					return player==event.player;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.num = -trigger.num;
					if(!player.storage.rouqing)		player.storage.rouqing = 1;
					event.min = 4-(player.storage.rouqing);
					if(event.min<0){
						event.min = 0;
						event.recover = true;
					}
					'step 1'
					event.num--;
					event.cards = get.cards(4);
					trigger.player.chooseCardButton([event.min,4],true,event.cards,'『柔情』：获得未被选择的牌并按顺序将选择的牌置于牌堆顶（先选择的在上）').set('ai',function(button){
						var min = 0;
						if(ui.selected.buttons.length>=event.min)	min = -5;
						var player = _status.event.player;
						var now = _status.currentPhase;
						var next = now.getNext();
						var att = get.attitude(player,next);
						var card = button.link;
						var judge = next.getCards('j')[ui.selected.buttons.length];
						if(judge){
							return get.judge(judge)(card)*att+min;
						}
						return next.getUseValue(card)*att+min;
					}).set('min',event.min);
					'step 2'
					if(result.bool&&result.links){
						player.storage.rouqing = 1;
						player.markSkill('rouqing');
						var list=result.links.slice(0);
						event.cards.removeArray(list);
						game.log(trigger.player,'将'+get.cnNumber(list.length)+'张牌放在牌堆顶');
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
						if(event.cards.length){
							trigger.player.gain(event.cards,'gain2');
						}
						if(event.recover)	player.recover();
					}
					'step 3'
					if(event.num>0)	event.goto(1);
				},
				ai:{
					threaten:1.9,
					maixie:true,
					maixie_hp:true,
				}
			},
			guangying:{
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				filter:function(event,player){
					if(event.getParent().name=='useCard') return false;
					var evt=event.getl(player);
					return evt&&evt.hs&&evt.hs.length>0;
				},
				forced:true,
				content:function(){
					if(!player.storage.rouqing)		player.storage.rouqing = 1;
					player.storage.rouqing++;
					player.markSkill('rouqing');
				},
				ai:{
					combo:'rouqing'
				}
			},
			//蜜球兔
			zhazong:{
				trigger:{player:'phaseUseEnd'},
				direct:true,
				audio:3,
				filter:function(event,player){
					return player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='basic'&&evt.getParent('phaseUse')==event;
					}).length==0||player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='equip'&&evt.getParent('phaseUse')==event;
					}).length==0||player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='trick'&&evt.getParent('phaseUse')==event;
					}).length==0;
				},
				content:function(){
					'step 0'
					var position = '';
					var str = '弃置一名角色';
					if(player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='basic'&&evt.getParent('phaseUse')==trigger;
					}).length==0){
						position+='h';
						str+=' 手牌区 ';
					}
					if(player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='equip'&&evt.getParent('phaseUse')==trigger;
					}).length==0){
						position+='e';
						str+=' 装备区 ';
					}
					if(player.getHistory('useCard',function(evt){
						return get.type2(evt.card)=='trick'&&evt.getParent('phaseUse')==trigger;
					}).length==0){
						position+='j';
						str+=' 判定区 ';
					}
					event.position = position;
					if(position.length){
						str+='各至多一张牌';
						player.chooseTarget(get.prompt('zhazong'),function(card,player,target){
							return target.countCards(_status.event.position);
						}).set('position',position).set('prompt2',str).set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							if(_status.event.position=='h')		return -att;
							return att*lib.card.guohe.ai.result.target(player,target);
						});
					}
					'step 1'
					if(result.bool&&result.targets){
						player.logSkill('zhazong',result.targets);
						event.target = result.targets[0];
						player.discardPlayerCard(event.target,event.position,[1,event.position.length],true).set('filterButton',function(button){
							for(var i=0;i<ui.selected.buttons.length;i++){
								if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						});
					}
				}
			},
			mengnan:{
				trigger:{
					player:['loseAfter','addJudgeAfter'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(event.name=='addJudge'&&event.player==player)	return true;
					var evt=event.getl(player);
					return evt&&evt.js&&evt.js.length>0&&!player.hasSkill('misuzu_zhongxing_haruko');
				},
				content:function(){
					var draw = false,num = 2;
					if(trigger.name=='addJudge'&&trigger.player==player)	draw = true
					var evt = trigger.getParent('phaseJudge');
					if(evt&&evt.name=='phaseJudge'){
						num = 1;
					}
					if(draw)	player.draw(num);
					else		player.chooseToDiscard(num,true);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.name(card)=='shandian'){
								return [1,1];
							}
						}
					}
				}
			},
			//无理
			lique:{
				trigger:{target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					return get.type(event.card)!='equip';
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.draw();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.hp<0)	return [0,1];
							if(get.type(card)!='equip')	return [1,2];
						}
					}
				}
			},
			zhangdeng:{
				trigger:{player:'dying'},
				forced:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					player.recover();
					game.delayx();
				},
				ai:{
					maixie_defend:true,
					threaten:function (player,target){
						if(target.hp==1) return 0.6;
						return 1;
					},
					effect:{
						target:function(card,player,target,current){
							if(target.hujia) return;
							if(player._zhangdeng_tmp) return;
							if(_status.event.getParent('useCard',true)||_status.event.getParent('_wuxie',true)) return;
							if(get.tag(card,'damage')){
								var basic = player.storage.shangdong||0;
								if(get.attitude(player,target)>0&&target.hp>1){
									return basic;
								}
								if(get.attitude(player,target)<0&&!player.hasSkillTag('damageBonus',false,{
									name:card?card.name:null,
									target:target,
									card:card
								})){
									if(card.name=='sha') return;
									var sha=false;
									player._zhangdeng_tmp=true;
									var num=player.countCards('h',function(card){
										if(card.name=='sha'){
											if(sha){
												return false;
											}
											else{
												sha=true;
											}
										}
										return get.effect(target,card,player,player)+basic>0;
									});
									delete player._zhangdeng_tmp;
									if(player.hasSkillTag('damage')){
										num++;
									}
									if(num<2){
										var enemies=player.getEnemies();
										if(enemies.length==1&&enemies[0]==target&&player.needsToDiscard()){
											return;
										}
										return basic;
									}
								}
							}
						}
					}
				}
			},
			//Aza
			qiding:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h');
				},
				filterTarget:function(card,player,target){
					return player.inRange(target);
				},
				content:function(){
					'step 0'
					target.viewHandcards(player);
					'step 1'
					event.list = ['受到一点伤害','令'+get.translation(player)+'观看并获得你的一张牌，且防止其对你的伤害直到本回合结束'];
					target.chooseControl('dialogcontrol',event.list).set('ai',function(){
						var player = _status.event.player;
						var source = _status.event.source;
						var controls = _status.event.controls.slice(0);
						if(get.attitude(player,source)>0||player.countCards('he')==0)	return 1;
						if(get.damageEffect(player,source,player)<0&&player.hp==1)		return 1;
						if(get.damageEffect(player,source,player)>0)	return 0;
						return controls.randomGet();
					}).set('source',player);
					'step 2'
					switch(result.control){
						case event.list[0]:{
							target.damage(player);
							game.delayx();
							break;
						}
						case event.list[1]:{
							player.gainPlayerCard(target,'he','visible');
							player.storage.qiding_respondDam = target;
							player.addTempSkill('qiding_respondDam');
							break;
						}
					}
				},
				subSkill:{
					respondDam:{
						mark:'character',
						intro:{
							name:'契定',
							content:'防止对$造成的伤害',
						},
						onremove:true,
						forced:true,
						trigger:{source:'damageBegin'},
						filter:function(event,player){
							return player.storage.qiding_respondDam==event.player;
						},
						content:function(){
							trigger.changeToZero();
						},
						ai:{
							effect:{
								player:function(card,player,target,current){
									if(target&&target==player.storage.qiding_respondDam&&get.tag(card,'damage'))	return 'zeroplayertarget';
								}
							}
						}
					}
				},
				ai:{
					order:6,
					result:{
						target:-1,
					},
					threaten:1.1,
				}
			},
			chouxin:{
				trigger:{player:'loseEnd'},
				filter:function(event,player){
					if(!event.visible) return false;
					for(var i=0;i<event.hs.length;i++){
						if(get.suit(event.hs[i])=='heart') return true;
					}
					return false;
				},
				forced:true,
				content:function(){
					if(player.isHealthy())	player.loseHp();
					else	player.recover();
					player.addTempSkill('chouxin_skipDiscard');
				},
				subSkill:{
					skipDiscard:{
						mark:true,
						intro:{
							name:'酬心',
							content:'跳过弃牌阶段',
						},
						trigger:{player:'phaseDiscardBefore'},
						forced:true,
						content:function(){
							trigger.cancel();
						},
					}
				}
			},
			//Miki
			xingxu:{
				trigger:{global:'phaseZhunbeiBegin'},
				check:function(event,player){
					if(get.attitude(player,event.player)>=1){
						return player.countCards('he')>=player.hp;
					}
					else{
						return player.countCards('he',function(card){
							var value=get.value(card);
							if(value<1) return true;
						})>=2;
					}
					return false;
				},
				logTarget:'player',
				filter:function(event,player){
					return player.countCards('he')>=2&&player!=event.player;
				},
				round:1,
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCard(2,true,'he','『星许』交给'+get.translation(event.target)+'两张牌').set('ai',function(card){
						return	att>=1?get.value(card):-get.value(card);
					}).set('att',get.attitude(player,event.target));
					'step 1'
					if(result.bool){
						event.cards = result.cards;
						player.give(event.cards,event.target,true);
						event.target.storage.xingxu_shiyue = player;
						event.target.storage.xingxu_shiyue2 = event.cards;
						event.target.addTempSkill('xingxu_shiyue');
						event.target.addTempSkill('xingxu_shiyue2');
					}
				},
				subSkill:{
					shiyue:{
						mark:'character',
						intro:{
							name:'星许',
							mark:function(dialog,content,player){
								if(content){
									dialog.addAuto([content]);
									dialog.addAuto(player.storage.xingxu_shiyue2);
								}
							},
							content:'被$发动了『星许』',
						},
						onremove:true,
						trigger:{player:'phaseEnd'},
						filter:function(event,player){
							if(!player.storage.xingxu_shiyue.isIn())	return false;
							return player.getHistory('sourceDamage',function(evt){
								return evt.player==player.storage.xingxu_shiyue;
							}).length;
						},
						forced:true,
						lastDo:true,
						content:function(){
							event.source = player.storage.xingxu_shiyue;
							player.line(event.source);
							event.source.recover(event.source);
							game.delayx();
						},
						ai:{
							effect:{
								player:function(card,player,target,current){
									if(target&&target==player.storage.xingxu_shiyue&&get.tag(card,'damage')&&!player.getHistory('sourceDamage',function(evt){
										return evt.player==player.storage.xingxu_shiyue;
									}).length)	return [1,0,1,1];
								}
							}
						}
					},
					shiyue2:{
						onremove:true,
						trigger:{player:'phaseEnd'},
						filter:function(event,player){
							if(!player.storage.xingxu_shiyue.isIn())	return false;
							var cards = player.storage.xingxu_shiyue2.slice(0);
							player.getHistory('useCard',function(evt){
								cards.removeArray(evt.cards);
							});
							console.log(player.storage.xingxu_shiyue2,cards)
							return cards.length==1;
						},
						direct:true,
						content:function(){
							'step 0'
							player.line(event.source);
							game.delayx();
							event.source = player.storage.xingxu_shiyue;
							event.cards = player.storage.xingxu_shiyue2.slice(0);
							player.getHistory('useCard',function(evt){
								event.cards.removeArray(evt.cards);
							});
							'step 1'
							if(event.cards.length==1&&player.hasUseTarget(event.cards[0])){
								event.source.chooseUseTarget(event.cards[0],'视为使用一张'+get.translation(event.cards[0]),true);
							}
						},
						mod:{
							aiOrder:function(player,card,num){
								if(get.attitude(player,player.storage.xingxu_shiyue)>1&&player.storage.xingxu_shiyue2){
									if(player.storage.xingxu_shiyue2.contains(card)&&player.getHistory('useCard',function(evt){
										return player.storage.xingxu_shiyue2.contains(evt.card);
									}).length==1){
										if(player.needsToDiscard())		return num-2;
										else	return num-8;
									}
								}
							},
						},
					}
				},
				ai:{
					expose:0.2
				},
			},
			qingsui:{
				init:function(player,skill){
					if(!player.storage[skill]){
						player.storage[skill] = 0;
					}
					player.addAdditionalSkill('qingsui','qingsui_jiai')
				},
				trigger:{player:['useCardAfter','qingsui_shengyinAfter','qingsui_quanyuAfter']},
				filter:function(event,player){
					if(event.name=='useCard')	return event.skill=='qingsui_jiai_backup';
					return true;
				},
				locked:true,
				direct:true,
				content:function(){
					'step 0'
					if(player.storage.qingsui==2)	player.storage.qingsui = 0;
					else	player.storage.qingsui++;
					player.addAdditionalSkill('qingsui',['qingsui_jiai','qingsui_shengyin','qingsui_quanyu'][player.storage.qingsui])
					'step 1'
					if(player.storage.qingsui==0){
						event.target = _status.currentPhase;
						if(event.target.countGainableCards(player,'he')&&event.target!=player){
							player.line(event.target);
							player.gainPlayerCard(event.target,'he');
						}
					}
				},
				subSkill:{
					jiai:{
						inherit:"jiai",
						filter:function(event, player){
							if(player.storage.qingsui!=0)	return false;
							if(player.countCards('h')<2)	return false;
							var filterCard = event.filterCard||function(card, player, event){
								return true;
							};
							var jiaiCards = [];
							for(var i=0; i< lib.inpile.length;++i){
								if( get.type(lib.inpile[i]) != 'basic') continue;
								var card = {name: lib.inpile[i]};
								if( filterCard(card, player, event)){
									jiaiCards.push(card);
								}
								
							}
							return jiaiCards.length>0; 
						},
					},
					shengyin:{
						inherit:"shengyin",
						filter:function(event,player){
							if(player.storage.qingsui!=1)	return false;
							return true;
						},
					},
					quanyu:{
						inherit:"quanyu",
						filter:function(event,player){
							if(player.storage.qingsui!=2)	return false;
							var suit = get.suit(event.card);
							return event.cards&&event.cards.length&&suit!='none'&&event.player!=player&&player.countCards('h',function(card){
								return suit==get.suit(card);
							})==0;
						},
					},
				},
			},
			//勾檀Mayumi
			level:{
				init:function(player,skill) {
					if(!player.storage.level){
						player.storage.level = 1;
					}
				},
				marktext:'级',
				intro:{
					content:'等级：#'
				}
			},
			jinzhou:{
				group:['level'],
				trigger:{player:'loseEnd'},
				forced:true,
				filter:function(event,player){
					return event.es.filter(function(card){
						return get.subtype(card)=='equip2';
					}).length;
				},
				content:function(){
					'step 0'
					if(!player.storage.level){
						player.storage.level = 1;
					}
					player.draw(player.storage.level);
					'step 1'
					game.playAudio('effect','hujia');
					game.broadcast(function(){
						game.playAudio('effect','hujia');
					});
					player.storage.level++;
					player.markSkill('level');
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&get.subtype(card)=='equip2')	return [1,2];
						}
					}
				}
			},
			gouhun:{
				group:['level'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					if(!player.storage.level){
						player.storage.level = 1;
					}
					var list=get.cards(player.storage.level+2);
					event.list=list;
					player.showCards(list,'『勾魂』亮出牌');
					'step 1'
					event.cards = event.list.slice(0);
					player.chooseCardButton(event.list,'获得其中一种类型的牌<br>（取消则+1等级）');
					'step 2'
					if(result.bool){
						var type = get.type2(result.links[0]);
						var cards = event.cards.filter(function(card){
							return get.type2(card)==type;
						});
						player.showCards(list,'『勾魂』获得牌');
						game.delayx();
						player.gain(cards,'gain2','log').gaintag.add('gouhun');
						event.cards.removeArray(cards);
					}
					else{
						game.playAudio('effect','hujia');
						game.broadcast(function(){
							game.playAudio('effect','hujia');
						});
						player.storage.level++;
						player.markSkill('level');
					}
					'step 3'
					game.cardsDiscard(event.cards);
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('gouhun')&&get.type2(card)=='trick'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('gouhun')&&get.type2(card)=='trick'){
							return false;
						}
					},
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('gouhun')&&get.type(card)=='basic') return num+0.1;
					},
				},
				group:'gouhun_reCount',
				subSkill:{
					reCount:{
						trigger:{player:'useCard1'},
						firstDo:true,
						silent:true,
						filter:function(event,player){
							return get.type(event.card)=='basic'&&event.cards.length==1&&player.getHistory('lose',function(evt){
								if(evt.getParent()!=event) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('gouhun')) return true;
								}
								return false;
							}).length>0;
						},
						content:function(){
							if(trigger.addCount!==false){
								trigger.addCount=false;
								var stat=player.getStat().card;
								if(stat.sha) stat.sha--;
							}
						},
					}
				},
				ai:{
					order:5,
					result:{
						player:1
					},
					threaten:1.5
				},
			},
			//小可
			mian:{
				init:function(player,skill) {
					if(!player.storage[skill]){
						player.storage[skill] = {};
						player.storage[skill].ms = [];
						player.storage[skill].ans = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '面条',
				intro: {
					mark:function(dialog,content,player){
						if(player.storage.mian.ms&&player.storage.mian.ms.length){
							var list = player.storage.mian.ms.slice(0);
							dialog.addText('明置面条');
							dialog.addSmall(list);
						}
						if(player.storage.mian.ans&&player.storage.mian.ans.length){
							if(player.isUnderControl(true)){
								var list = player.storage.mian.ans.slice(0);
								dialog.addText('暗置面条');
								dialog.addSmall(list);
							}
							else{
								dialog.addText('暗置面条（'+get.cnNumber(player.storage.mian.ans.length)+'张）');
							}
						}
					},
					content: 'cards',
					onunmark:function(storage,player){
						if((storage&&storage.ms&&storage.ms.length)||(storage&&storage.ans&&storage.ans.length)){
							var cards = storage.ms.concat(storage.ans);
							player.$throw(cards,1000);
							game.cardsDiscard(cards);
							game.log(cards,'被置入了弃牌堆');
							storage.ms.length=0;
							storage.ans.length=0;
						}
					},
				}
			},
			dianying:{
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					if(!event.source||!event.source.isIn())	return false;
					if(player.storage.mian.ans&&player.storage.mian.ms){
						return player.storage.mian.ms.length;
					}
					return false;
				},
				content:function(){
					'step 0'
					var list2 = player.storage.mian.ms.slice(0);
					var list = ['『店营』：可以获得任意碗明置的面条'];
					if(list2&&list2.length){
						list.push('明置面条');
						list.push([list2,'card']);
					}
					list.push('hidden');
					event.source = trigger.source;
					var next = event.source.chooseButton(list);
					next.set('selectButton',[1,Infinity]);
					next.set('target',player);
					next.set('ai',function(button){
						var player = _status.event.player;
						var target = _status.event.target;
						return get.attitude(player,target)<=0||get.value(button.link,player,'raw')>get.value(button.link,target,'raw');
					});
					'step 1'
					if(result.bool&&result.links){
						player.logSkill('dianying');
						event.source.line(player);
						player.storage.mian.ms.removeArray(result.links);
						player.updateMarks();
						player.$give(result.links,event.source);
						event.source.gain(result.links);
					}
				},
				process:function(player,cards){
					if(player.storage.mian.ans&&player.storage.mian.ms){
						for(var i=0;i<cards.length;i++){
							if(player.storage.mian.ms.contains(cards[i])){
								player.$give(cards[i],player,false);
								player.storage.mian.ms.remove(cards[i]);
								player.storage.mian.ans.push(cards[i]);
							}else if(player.storage.mian.ans.contains(cards[i])){
								player.$give(cards[i],player,false);
								player.storage.mian.ans.remove(cards[i]);
								player.storage.mian.ms.push(cards[i]);
							}else if(get.owner(cards[i])){
								var source = get.owner(cards[i]);
								if(!giveAutos)	var giveAutos = [];
								giveAutos.add(cards[i]);
								player.storage.mian.ans.push(cards[i]);
							}else{
								if(!drawAutos)	var drawAutos = [];
								drawAutos.add(cards[i]);
								game.cardsGotoSpecial(cards[i]);
								player.storage.mian.ans.push(cards[i]);
							}
						}
						if(drawAutos)	player.$drawAuto(drawAutos);
						if(source&&giveAutos){
							source.$giveAuto(giveAutos,player);
						}
						player.markSkill('mian');
					}

				},
				ai:{
					threaten:1.5
				},
				global:'dianying2',
				group:'mian',
			},
			dianying2:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')&&game.hasPlayer(function(cur){
						return cur.hasSkill('dianying')&&cur!=player;
					});
				},
				filterCard:true,
				selectCard:[1,2],
				filterTarget:function(card,player,target){
					return target.hasSkill('dianying')&&target!=player;
				},
				discard:false,
				toStorage:true,
				position:'he',
				usable:1,
				prompt:function(){
					var player=_status.event.player;
					var list=game.filterPlayer(function(current){
						return current.hasSkill('wengua');
					});
					var str='将一至二张牌交给'+get.translation(list);
					if(list.length>1) str+='中的一人';
					return str;
				},
				complexCard:true,
				check:function(card){
					if(!ui.selected.cards.length)	return 7-get.value(card);
					return 5-get.value(card);
				},
				content:function(){
					'step 0'
					lib.skill.dianying.process(target,cards);
					'step 1'
					var list1 = target.storage.mian.ans.slice(0);
					var list = ['『店营』：是否选择两碗面条明置'];
					if(list1&&list1.length){
						list.push('暗置面条');
						if(target.isUnderControl(true))	list.push([list1,'card']);
						else{
							list1.randomSort();
							list.push([list1,'blank']);
						}
					}
					list.push('hidden');
					var next = player.chooseButton(list);
					next.set('selectButton',2);
					next.set('target',target);
					next.set('ai',function(button){
						var player = _status.event.player;
						var target = _status.event.target;
						return get.attitude(player,target)<=0||get.recoverEffect(player,target,player)>0;
					});
					'step 2'
					if(result.bool&&result.links){
						player.line(target);
						lib.skill.dianying.process(target,result.links);
					}
					else{
						event.finish();
					}
					'step 3'
					player.recover(target);
				},
				ai:{
					order:6,
					result:{
						player:function(player,target){
							return Math.max(get.attitude(player,target),get.recoverEffect(player,target,player));
						},
						target:function(player,target){
							return 1;
						}
					}
				}
			},
			ganfen:{
				audio:2,
				trigger:{player:['phaseJudgeBefore','phaseDrawBefore','phaseUseBefore','phaseDiscardBefore']},
				clickChange:'停业',
				clickable:function(player){
					if(player.storage.ganfen_clickChange===undefined)	player.storage.ganfen_clickChange = false;
					else	player.storage.ganfen_clickChange = !player.storage.ganfen_clickChange;
				},
				clickableFilter:function(player){
					return player.storage.ganfen_clickChange!==false;
				},
				filter:function(event,player){
					if(player.storage.ganfen_clickChange===false)	return false;
					return player.hasSkill('mian');
				},
				prompt:function(event){
					var str = get.prompt('ganfen');
					str+='跳过';
					str+=get.translation(event.name);
					return str;
				},
				check:function(event,player){
					if(['phaseDraw','phaseUse'].contains(event.name)||player.hp<=1)	return false;
					if(event.name=='phaseJudge'&&player.countCards('j')>1)	return true;
					return player.hp>2&&player.countCards;
				},
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					player.damage();
					'step 2'
					event.cards = get.cards(3);
					lib.skill.dianying.process(player,event.cards);
				},
				group:'ganfen_fanmian',
				subSkill:{
					fanmian:{
						trigger:{player:'useCard'},
						filter:function(event,player){
							if(player.storage.ganfen_clickChange===false)	return false;
							if(player.storage.mian&&player.storage.mian.ans&&player.storage.mian.ms){
								if(player.storage.mian.ans.length||player.storage.mian.ms.length){
									for(var i=0;i<event.cards.length;i++){
										if(event.cards[i].original=='h') return true;
									}
								};
							}
							return false;
						},
						direct:true,
						content:function(){
							'step 0'
							event.card = trigger.card;
							var list1 = player.storage.mian.ans.slice(0);
							var list2 = player.storage.mian.ms.slice(0);
							var list = ['『擀奋』：选择面条翻面'];
							if(list1&&list1.length){
								list.push('暗置面条');
								list.push([list1,'card']);
							}
							if(list2&&list2.length){
								list.push('明置面条');
								list.push([list2,'card']);
							}
							list.push('hidden');
							event.list1 = list1;
							event.list2 = list2;
							var next = player.chooseButton(list);
							next.set('filterButton',function(button){
								var now = button.link;
								return true;
							});
							'step 1'
							if(result.bool&&result.links&&result.links.length){
								player.logSkill('ganfen');
								lib.skill.dianying.process(player,result.links);
								game.delay(0.5);
							}
						},
					}
				}
			},
			//园长
			dieyuan:{
				trigger:{global:'recoverAfter'},
				filter:function(event,player){
					return event.player!=player&&event.player.isIn();
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:function(event,player){
					return event.player;
				},
				content:function(){
					'step 0'
					event.gainnum = Math.abs(trigger.player.hp-player.hp)||1;
					trigger.player.draw(event.gainnum);
					'step 1'
					if(trigger.player.isIn()){
						event.gainnum = Math.abs(trigger.player.hp-player.hp)||1;
						trigger.player.chooseCard(event.gainnum,'he','将'+get.cnNumber(event.gainnum)+'张牌交给'+get.translation(player)).set('ai',function(card){
							if(_status.event.goon>0) return 0;
							if(_status.event.goon<0) return 1-get.value(card);
							return 5-get.value(card);
						}).set('goon',function(){
							if(get.recoverEffect(player,trigger.player,trigger.player)>0)	return 1;
							if(player.isHealthy()||get.attitude(player,trigger.player)<=0)	return -1;
							return 0;
						}());
					}
					else	event.finish();
					'step 2'
					if(!result.bool||!result.cards){
						player.recover(target);
					}
				},
				ai:{
					expose:0.1
				}
			},
			shengyang:{
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				check:function(card){
					var num=get.value(card);
					if(get.color(card)=='black'){
						if(num>=6) return 0;
						return 20-num;
					}
					else{
						if(_status.event.player.needsToDiscard()){
							return 7-num;
						}
					}
					return 0;
				},
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					event.gainnum = (Math.abs(target.hp-player.hp)||1)*2;
					var next = player.judge(function(card){
						if(get.number(card)<=_status.event.gainnum)	return 3;
						if(_status.event.gaintarget.isDamaged())	return 1;
						return -1;
					});
					next.set('gainnum',event.gainnum);
					next.set('gaintarget',target);
					next.set('callback',function(){
						var num = _status.event.getParent().gainnum;
						var target = _status.event.getParent().gaintarget;
						if(event.judgeResult.number<=num)	player.gainPlayerCard([1,num],target,true);
						else	target.recover();
						// if(event.judgeResult.color=='black') event.getParent().orderingCards.remove(card);
					});
				},
				ai:{
					order:8,
					expose:0.2,
					result:{
						target:function(player,target){
							return get.recoverEffect(target,player,target);
						}
					}
				}
			},
			//道姑
			daoyi:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				map:['color','number','suit','name'],
				trigger:{global:'judge'},
				filter:function(event,player){
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					if(lib.skill.daoyi.map[player.storage.daoyi]=='name'){
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							list.push([get.type2(name),'',name]);
						}
					}
					else{
						for(var i=0;i<lib[lib.skill.daoyi.map[player.storage.daoyi]].length;i++){
							var name=lib[lib.skill.daoyi.map[player.storage.daoyi]][i];
							list.push([lib.skill.daoyi.map[player.storage.daoyi],'',name]);
						}
					}
					var str=get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，是否发动『道易』，修改判定结果？';
					var dialog=ui.create.dialog(str,[list,'vcard'],'hidden');
					player.chooseButton(dialog).set('ai',function(button){
						var judging=_status.event.judging;
						var player = _status.event.player;
						var change = _status.event.change;
						var trigger=_status.event.getTrigger();
						var res1=trigger.judge(judging);
						var card = {
							name:get.name(judging),
							nature:get.nature(judging),
							suit:get.suit(judging),
							color:get.color(judging),
							number:get.number(judging),
						};
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0) return 0;
						card[change] = button.link[2];
						var now = trigger.judge(card);
						effect = (now-res1)*attitude;
						if(player.storage.daoyi==3&&_status.currentPhase&&_status.currentPhase.isIn())	effect+=(get.damageEffect(_status.currentPhase,player,player))*1.5;
						return effect;
					}).set('change',lib.skill.daoyi.map[player.storage.daoyi]).set('judging',trigger.player.judging[0]);
					'step 1'
					if(result.bool==true){
						var link = result.links[0][2];
						player.addExpose(0.25);
						player.logSkill('daoyi',trigger.player);
						player.popup(link);
						game.log(player,'将判定结果改为了','#y'+get.translation(link));
						if(!trigger.fixedResult)	trigger.fixedResult={};
						trigger.fixedResult[lib.skill.daoyi.map[player.storage.daoyi]] = link;
						console.log(trigger.fixedResult)
					}
					else	event.finish();
					'step 2'
					if(player.storage.daoyi<3)	player.storage.daoyi++;
					else{
						player.storage.daoyi = 0;
						if(_status.currentPhase&&_status.currentPhase.isIn()){
							player.line(_status.currentPhase);
							_status.currentPhase.damage(1,'thunder');
						}
					}
				},
			},
			shengyin:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function(){
					'step 0'
					target.chooseCard('h','『盛阴』：请展示一张牌',true);
					'step 1'
					if(result.cards){
						var card = result.cards[0];
						target.showCards(card,'『盛阴』展示手牌');
						event.card = card;
						event.color = get.color(card);
						event.type2 = get.type2(card);
					}
					else	event.finish();
					'step 2'
					var next = target.judge(function(card){
						if(get.color(card)==_status.event.color)	return 2;
						if(get.type2(card)==_status.event.type2)	return -1;
						return 0;
					});
					next.set('color',event.color);
					next.set('type2',event.type2);
					next.set('card0',event.card);
					next.set('source',player);
					next.set('callback',function(){
						var color = _status.event.getParent().color;
						var type2 = _status.event.getParent().type2;
						var card0 = _status.event.getParent().card0;
						var source = _status.event.getParent().source;
						if(get.type2(event.judgeResult.name)==type2)	source.gain(card0,player,'give');
						if(event.judgeResult.color==color)	game.asyncDraw([player,source]);
					});
				},
				ai:{
					order:8,
					expose:0.2,
					result:{
						target:function(player,target){
							return 2;
						}
					}
				}
			},
			//菜菜姐
			tibing:{
				trigger:{player:['phaseZhunbeiBegin','phaseJudgeBefore','phaseDrawBefore','phaseDiscardBefore','phaseJieshuBegin']},
				forced:true,
				direct:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					trigger.cancel();
				},
				group:['tibing_drawBy','tibing_discardBy'],
				subSkill:{
					drawBy:{
						trigger:{player:['phaseUseBegin']},
						forced:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							'step 0'
							player.draw(2);
							'step 1'
							player.gain(player.getCards('ej'),player,'giveAuto','log');
						},
					},
					discardBy:{
						trigger:{player:['phaseUseEnd']},
						forced:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							'step 0'
							player.showHandcards();
							'step 1'
							player.discard(player.getCards('h',{type:['equip','trick','delay']}));
						},
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='delay')	return [0.1,1];
						}
					}
				}
			},
			guangtui:{
				trigger:{global:'phaseDiscardBegin'},
				filter:function(event,player){
					return event.player!=player&&player.isDamaged();
				},
				check:function(event,player){
					return player.hp<=2||get.attitude(player,event.player);
				},
				content:function(){
					'step 0'
					player.loseMaxHp(true);
					'step 1'
					trigger.cancel(true);
					game.delayx();
					'step 2'
					player.phaseUse();
				},
				ai:{
					threaten:function (player,target){
						if(!target.isDamaged())	return 0.6;
					}
				}
			},
			//蓝蓝
			zhepie:{
				trigger:{player:['phaseZhunbeiBegin']},
				filter:function(event,player){
					return true;
				},
				usable:1,
				content:function(){
					'step 0'
					event.card = get.cards()[0];
					player.showCards(event.card);
					game.delayx();
					'step 1'
					player.chooseTarget(true).set('ai',function(target){
						var type2 = get.type2(_status.event.card);
						var att = get.attitude2(target);
						if(target.countCards('h',{type2:type2})<=1||type2=='equip'){
							if(target==player)	return 1+att;
							return att
						}
						if(type2=='basic'&&target.countCards('h',{type2:type2})>=1&&att<0){
							return -att;
						}
						return	get.value(card)*att/4;
					}).set('card',event.card).set('createDialog',
					['『折撇』：令一名角色获得此牌',
					[[event.card],'card']]);
					'step 2'
					if(result.bool){
						event.target = result.targets[0];
						player.line(event.target,'ocean');
						event.target.gain(event.card,'gain2','log');
						if(!event.target.storage.zhepie_cardDisable)	event.target.storage.zhepie_cardDisable = [];
						event.target.storage.zhepie_cardDisable.add(event.card);
						event.target.addTempSkill('zhepie_cardDisable');
						game.delayx();
					}
				},
				subSkill:{
					cardDisable:{
						mark:true,
						intro:{
							name:'折撇',
							content:'cards',
						},
						onremove:true,
						mod:{
							cardEnabled:function(card,player){
								if(player.getStorage('zhepie_cardDisable').filter(function(magic){
									return get.type2(magic)==get.type2(card);
								}).length)	return false;
							},
							cardSavable:function(card,player){
								if(player.getStorage('zhepie_cardDisable').filter(function(magic){
									return get.type2(magic)==get.type2(card);
								}).length)	return false;
							},
						},
					}
				},
				ai:{
					threaten:1.2,
				}
			},
			chumo:{
				trigger:{
					player:'loseAfter',
					global:'cardsDiscardAfter',
				},
				filter:function(event,player){
					if(event.name=='lose'){
						if(event.position!=ui.discardPile)	return false;
					}
					else{
						var evt=event.getParent();
						if(evt.name!='orderingDiscard'||!evt.relatedEvent||evt.relatedEvent.player!=player||!['useCard','respond'].contains(evt.relatedEvent.name)) return false;
					}
					return (event.cards2||event.cards).filterInD('d').length>0;
				},
				round:1,
				direct:1,
				content:function(){
					'step 0'
					var cards=(trigger.cards2||trigger.cards).filterInD('d');
					event.cards = cards;
					player.chooseTarget().set('ai',function(target){
						var att = get.attitude2(player,target);
						var num = 0;
						for(var i of _status.event.cards){
							if(get.value(i)<0&&att<0&&!num)		num+=1;
							if(get.value(i)>0&&att>0&&!num)		num+=att;
							if(!target.hasUseTarget(i))		num+=2;
						}
						return num;
					}).set('cards',cards).set('createDialog',
					[get.prompt('chumo'),
					[cards,'card']]);
					'step 1'
					if(result.bool){
						event.target = result.targets[0];
						player.logSkill('chumo',event.target);
						
						var evt=trigger.getParent().relatedEvent;
						if((trigger.name=='discard'&&!trigger.delay)||evt&&evt.name=='respond') game.delayx();
						if(event.cards.length==1){
							event._result = {links:[event.cards[0]]};
							event.goto(3);
						}
					}
					else event.finish();
					'step 2'
					player.chooseCardButton(event.cards,true,'选择令'+get.translation(event.target)+'获得的牌',function(button){
						var evt = _status.event.getParent();
						var att = get.attitude(evt.player,evt.target),i = button.link,value = get.value(i,target,'raw');
						if(!evt.target.hasUseTarget(i))	return att*value+4;
						return att*value;
					});
					'step 3'
					if(result.links&&result.links[0]){
						event.card = result.links[0];
						event.target.gain(event.card,'gain2','log');
						if(!event.target.hasUseTarget(event.card)){
							player.draw(2);
						};
					}
				},
				ai:{
					threaten:function (player,target){
						if(target.isDamaged())	return 1.2;
					}
				}
			},

			//亚哈
			ahbingyi:{
				trigger:{global:['drawBegin']},
				filter:function(event,player){
					return event.num&&event.player!=player&&event.player.isMaxHandcard();
				},
				check:function(event,player){
					if(event.num<2)	return false;
					return get.attitude(player,event.player)<-1&&player.hp>=3;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.loseHp();
					'step 1'
					trigger.cancel();
					game.delayx();
					'step 2'
					if(event.target.countDiscardableCards(player,'he')){
						player.discardPlayerCard(event.target,'he',true);
					}
				},
				ai:{
					threaten:1.1,
				}
			},
			sujian:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o';
				},
				content:function(){
					game.cardsGotoSpecial(trigger.cards);
					player.$gain2(trigger.cards);
					player.markAuto('sujian_su',trigger.cards);
				},
				group:['sujian_su','sujian_chooseBy','sujian_changeBy'],
				subSkill:{
					su:{
						init:function(player,skill){
							if(!player.storage[skill])	player.storage[skill] = [];
						},
						intro:{
							content: 'cards',
							locked:true,
							notemp:true,
							marktext: '🚨',
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
					chooseBy:{
						trigger:{player:'ahbingyiAfter'},
						filter:function(event,player){
							return player.countCards('h');
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseCard('h','发动『秉义』时，可以将一张手牌置于武将牌上').set('ai',function(card){
								return 7-get.value(card,player);
							}).set('logSkill','sujian');
							'step 1'
							if(result.bool&&result.cards){
								player.lose(result.cards,'toStorage');
								player.$gain2(result.cards);
								player.markAuto('sujian_su',result.cards);
							}
						},
					},
					changeBy:{
						trigger:{global:['useCard']},
						filter:function(event,player){
							if(!event.targets.length) return false;
							if(!player.getStorage('sujian_su').length) return false;
							return player.getStorage('sujian_su').filter(function(card){
								return get.name(event.card)==get.name(card)||get.suit(event.card)==get.suit(card);
							}).length;
						},
						direct:true,
						content:function(){
							'step 0'
							event.sujian = player.getStorage('sujian_su').slice(0);
							event.card = trigger.card;
							event.target = trigger.player;
							var check = 0;
							for(var i of trigger.targets){
								if(get.effect(i,event.card,event.target,player)<0)	check++;
							}
							if(check<event.sujian.length)	check = 0;
							player.chooseCardButton(event.sujian,'###'+get.prompt('sujian')+'###将一张对应'+get.translation(event.card)+'的“肃”置于牌堆顶').set('filterButton',function(button){
								var card = button.link;
								return get.name(_status.event.card0)==get.name(card)||get.suit(_status.event.card0)==get.suit(card);
							}).set('ai',function(button){
								if(!_status.event.check)	return -1;
								return 1;
							}).set('check',check).set('card0',event.card);
							'step 1'
							if(result.bool&&result.links){
								var card = result.links[0];
								player.logSkill('sujian',event.target);
								player.storage.sujian_su.remove(card);
								ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
								player.$throw(card,1000);
								game.log(player,'将'+get.translation(card)+'置于牌堆顶');
								player.updateMarks();
							}
							else	event.finish();
							'step 2'
							var prompt2='为'+get.translation(event.card)+'减少任意个目标'
							player.chooseTarget('『肃监』：选择目标角色',[1,Infinity],function(card,player,target){
								if(_status.event.targets.contains(target)) return true;
							}).set('prompt2',prompt2).set('ai',function(target){
								var card=_status.event.card;
								var player=_status.event.player;
								var source = _status.event.source;
								return get.effect(target,card,source,player)*(_status.event.targets.contains(target)?-1:1);
							}).set('targets',trigger.targets).set('card',event.card).set('source',event.target);
							'step 3'
							if(!event.isMine()) game.delayx();
							event.targets=result.targets;
							'step 4'
							if(event.targets){
								player.logSkill('sujian',event.targets);
								if(trigger.targets.contains(event.targets[0]))	trigger.targets.removeArray(event.targets);
							}
						}
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')) return [1,0.55];
						}
					}
				}
			},
			//Gaku
			exi:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target.countCards('h')&&target!=player;
				},
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					player.chooseToPSS(target);
					'step 1'
					if(!result.tie){
						var card = {name:'sha'};
						if(result.winner=='stone')	card.name = 'juedou';
						if(result.bool){
							player.draw(2);
							target.useCard(card,player,false,'noai');
						}
						else{
							target.draw(2);
							player.useCard(card,target,false,'noai');
						}
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
						target:-0.1,
					}
				}
			},
			suisui:{
				trigger:{player:'damageBegin3'},
				forced:true,
				usable:1,
				filter:function(event,player){
					return !event.source&&player.hp!=1||event.source&&player.hp==1;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					threaten:function (player,target){
						if(target.hp==1) return 0.5;
						return 1;
					},
				}
			},
			
			//星宫汐
			yuanyao:{
				enable:'phaseUse',
				filter:function(event,player){
					if(player.countCards('h')>player.maxHp||player.countCards('h')==player.hp)	return false;
					return (player.getStat('skill').yuanyao||0)<game.countPlayer(function(cur){
						return cur.sex=='female';
					});
				},
				complexCard:true,
				filterCard:function(event,player){
					if(player.countCards('h')>player.hp)		return true;
					return false;
				},
				selectCard:function(){
					var player=_status.event.player;
					if(player.countCards('h')>player.hp)		return (player.countCards('h')-player.hp);
					return -1;
				},
				discard:true,
				check:function(card){
					return 7.5-get.value(card);
				},
				content:function(){
					'step 0'
					if(cards&&cards.length){
						event.change = 'discard';
						event.num = cards.length;
					}
					else{
						event.change = 'draw';
						event.num = player.hp-player.countCards('h');
					}
					'step 1'
					switch(event.change){
						case 'discard':{
							player.recover(event.num);break;
						}
						case 'draw':{
							player.draw(event.num);player.loseHp(event.num);break;
						}
					}
				},
				ai:{
					order:1.5,
					result:{
						player:function(player){
							var num = game.countPlayer(function(cur){
								return cur.sex=='female';
							})-(player.getStat('skill').yuanyao||0);
							if(num>1)	return player.countCards('h');
							return player.countCards('h')-player.hp;
						},
					},
				},
			},
			gongni:{
				audio:true,
				trigger:{player:['phaseZhunbeiBegin','useCardAfter','respondAfter']},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'yami',
				forceunique:true,
				filter:function(event,player){
					if(event.name!='phaseZhunbei'&&_status.currentPhase==player)	return false;
					return game.countPlayer()==game.countPlayer(function(cur){
						return cur.isDamaged()&&cur.hp>=0;
					});
				},
				logTarget:function(event,player){
					return game.players;
				},
				check:function(event,player){
					var effect = 0;
					game.filterPlayer(function(cur){
						effect+=((cur.maxHp-cur.hp)-cur.hp)*get.attitude(player,target);
					})
					return effect>=3;
				},
				content:function(){
					'step 0'
					player.storage.gongni = true;
					player.awakenSkill('gongni');
					event.doon = [];
					event.current = player;
					'step 1'
					player.line(event.current,'ocean');
					event.current.hp = (event.current.maxHp-event.current.hp);
					event.current.$thunder();
					game.log(event.current,'的体力变为','#g'+event.current.hp);
					event.current.update();
					game.delayx(1.2);
					event.doon.add(event.current);
					'step 2'
					if(!event.doon.contains(event.current.next)){
						event.current = event.current.next;
						event.goto(1);
					}
				},
			},
			//紫海由爱
			lianyin:{
				trigger:{global:['useCard','respond']},
				priority:996,
				filter:function(event,player){
					if(event.name=='respond'&&!player.awakenedSkills.contains('guixiang'))	return false;
					if(!player.storage.lianyin)		player.storage.lianyin = 0;
					if(!player.storage.guixiang)	player.storage.guixiang = 0;
					return event.player!=player&&player==_status.currentPhase&&player.storage.lianyin<player.maxHp;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>-1;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					game.asyncDraw([player,trigger.player]);
					'step 1'
					player.storage.lianyin++;
					player.storage.guixiang++;
					player.markSkill('guixiang');
				},
				group:'lianyin_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.lianyin;
						},
						content:function(){
							player.storage.lianyin = 0;
						}
					},
				},
			},
			guixiang:{
				skillAnimation:true,
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player){
					player.storage.guixiang=0;
				},
				locked:true,
				intro:{
					content:'已发动了&次『联音』',
				},
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.storage.guixiang>=game.countPlayer();
				},
				content:function(){
					'step 0'
					player.gainMaxHp();
					'step 1'
					player.recover();
					'step 2'
					player.storage.guixiang=true;
					player.awakenSkill('guixiang');
					player.unmarkSkill('guixiang');
				},
				ai:{
					combo:'lianyin',
				},
			},
			//亚里亚
			xuanying:{
				trigger:{global:['useCard','respond']},
				priority:996,
				filter:function(event,player){
					if(event.name=='respond'&&!player.awakenedSkills.contains('houfan'))	return false;
					if(!player.storage.xuanying)		player.storage.xuanying = 0;
					return event.player!=player&&player==_status.currentPhase&&player.storage.xuanying<(player.countCards('e')||1);
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCard('###'+get.prompt('xuanying')+'###将一张牌交给'+get.translation(event.target),'he').set('target',event.target).ai=function(card){
						var player = _status.event.player;
						var target = _status.event.target;
						if(get.position(card)=='e')		return ((player.countCards('e')+1)||1)+get.value(card,target,'raw')*get.attitude(player,target);
						else if(get.type(card)=='equip')	return ((player.countCards('e'))||1)+get.value(card,target,'raw')*get.attitude(player,target);
						return 1+get.value(card,target,'raw')*get.attitude(player,target);
					};
					'step 1'
					if(result.bool&&result.cards){
						if(get.type(result.cards[0])=='equip')	event.drawNum = 'equip';
						player.give(result.cards,event.target,true);
					}else	event.finish();
					'step 2'
					player.chooseTarget('『玄荫』：令你或其摸'+get.cnNumber(event.drawNum=='equip'?player.countCards('e')+1:1)+'张牌',function(card,player,target){
						return player==target||target==_status.event.target;
					}).set('target',event.target).ai=function(target){
						if(target!=player&&target.hasSkillTag('nogain')) return 0;
						return get.attitude(player,target);
					};
					'step 3'
					if(result.bool&&result.targets){
						if(event.drawNum=='equip')	result.targets[0].draw(player.countCards('e')+1||1);
						else	result.targets[0].draw();
					}
				},
				group:'xuanying_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.xuanying;
						},
						content:function(){
							player.storage.xuanying = 0;
						}
					},
				},
			},
			houfan:{
				enable:'phaseUse',
				unique:true,
				limited:true,
				filter:function(event,player){
					return player.isMinHandcard();
				},
				content:function(){
					'step 0'
					player.loseMaxHp();
					event.num = 0;
					'step 1'
					var card=get.discardPile(function(card){
						return get.type(card)=='equip';
					});
					if(card){
						player.gain(card,'gain2');
						event.num++;
					}else	event.goto(3);
					'step 2'
					if(event.num<4)	event.goto(1);
					'step 3'
					player.storage.houfan=true;
					player.awakenSkill('houfan');
				},
				ai:{
					combo:'xuanying',
					order:function(item,player){
						var equips=[];
						for(var i=0;i<ui.discardPile.childElementCount;i++){
							var subtype=get.subtype(ui.discardPile.childNodes[i]);
							if(subtype&&player.countCards('h',{subtype:subtype})==0){
								equips.add(ui.discardPile.childNodes[i]);
							}
						}
						if(equips>=3) return 10;
						return 0;
					},
					result:{player:3},
				}
			},
			//纸木铗
			quzhuan:{
				trigger:{global:'useCardAfter'},
				usable:1,
				filter:function(event,player){
					return player==_status.currentPhase&&event.player!=player&&get.itemtype(event.cards)=='cards'&&event.cards.filterInD().length;
				},
				prompt2:function(event,player){
					return '你可以获得'+get.translation(event.cards.filterInD());
				},
				check:function(event,player){
					return event.cards.filterInD().length>1||get.value(event.cards.filterInD()[0],player)>1;
				},
				content:function(){
					player.gain(trigger.cards.filterInD(),'gain2');
				}
			},
			yuanjiu:{
				trigger:{global:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					var es = event.player.getCards('e');
					return es.length&&player.countDiscardableCards(player,'he',function(card){
						for(var i=0;i<es.length;i++){
							return get.suit(card)==get.suit(es[i]);
						}
					});
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					var suits = get.suit3(trigger.player.getCards('e'));
					player.chooseCard('he',get.prompt2('yuanjiu'),function(card){
						return _status.event.suits.contains(get.suit(card));
					}).set('suits',suits).set('ai',function(card){
						var target = _status.event.getParent().target;
						var player = _status.event.player;
						if(target.hasSha()&&target.getUseValue('jiu')>0&&get.attitude(player,target)>0)	return 11-get.value(card);
						return 0;
					}).set('logSkill',['yuanjiu',event.target]);
					'step 1'
					if(result.bool){
						player.give(result.cards,event.target,true);
					}else event.finish();
					'step 2'
					player.useCard({name:'jiu'},event.target);
				}
			},
			//ccm
			qijian:{
				audio:4,
				trigger:{global:'useCardAfter'},
				filter:function(event,player){
					if(player.hasSkill('qijian_lost'))	return false;
					return event.player==_status.currentPhase&&event.player!=player&&get.color(event.card)=='red'&&event.targets&&event.targets.length;
				},
				prompt2:function(event,player){
					return '你可以跟随'+get.translation(event.cards)+'使用一张牌';
				},
				check:function(event,player){
					return event.cards.length>1||get.value(event.cards[0],player)>1;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToUse({
						prompt:'###'+get.translation('qijian')+'###跟随'+get.translation(trigger.player)+'使用一张牌？',
						filterCard:function(card,player){
							return lib.filter.filterCard.apply(this,arguments);
						},
						addCount:false,
					}).set('ai1',function(card){
						var player = _status.event.player;
						var useBy = _status.event.useBy;
						if(get.tag(card,'damage')&&useBy.group=='qun'&&player.hasZhuSkill('jushi'))	return get.order(card)+10;
						return get.order(card);
					}).set('useBy',trigger.player).set('logSkill','qijian').set('targetRequired',true);
					'step 1'
					if(result.bool){
						if(player.getHistory('sourceDamage',function(evt){
							return evt.card.cardid==result.card.cardid&&result.targets.contains(evt.player);
						}).length==0){
							player.draw();
							if(trigger.player.group!='qun'||!player.hasZhuSkill('jushi'))	player.addTempSkill('qijian_lost');
						}
					}
				},
				subSkill:{
					lost:{}
				}
			},
			yizhan:{
				subSkill:{
					count:{
						trigger:{
							global:"recoverBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function (event,player){
							if(!event.card) return false;
							if(!event.source||event.source!=player) return false;
							if(!event.player.isDying()) return false;
							if(event.player.storage.yizhan_mark!=undefined) return false;
							return true;
						},
						content:function (){
							trigger.yizhan=true;
						},
						sub:true,
					},
					mark:{
						mark:'character',
						locked:true,
						intro:{
							name:'ccm的翅膀',
							content:'已被$发动『翼展』',
						},
					}
				},
				audio:true,
				group:['yizhan_count'],
				trigger:{
					global:"recoverAfter",
				},
				init:function (player){
					player.storage.yizhan=false;
				},
				filter:function (event,player){
					if(event.player.storage.yizhan) return false;
					if(event.player.isDying()) return false;
					return event.yizhan==true;
				},
				skillAnimation:true,
				animationColor:'fire',
				frequent:true,
				content:function (){
					'step 0'
					player.drawTo(player.getHandcardLimit());
					'step 1'
					trigger.player.changeGroup('qun');
					trigger.player.storage.yizhan_mark = player;
					trigger.player.addSkill('yizhan_mark');
				},
			},
			jushi:{
				unique:true,
				zhuSkill:true,
				mod:{
					maxHandcard:function(player,num){
						if(player.hasZhuSkill('jushi')&&game.countPlayer(function(cur){
							return cur.group&&cur.group=='qun';
						}))	return num+game.countPlayer(function(cur){
							return cur.group&&cur.group=='qun';
						});
					},
				},
			},
			//Buff
			shangsheng:{
				audio:5,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [-1,-1];
				},
				trigger:{player:'phaseBegin'},
				check:function(event,player){
					return true;
				},
				filter:function(event,player){
					return true;
				},
				frequent:true,
				content:function(){
					'step 0'
					player.chooseControl('dialogcontrol',['A.于摸牌阶段多摸1张牌','B.于出牌阶段多出1张【杀】','C.于弃牌阶段手牌上限+1']).set('ai',function(){
						var player = _status.event.player;
						var controls = _status.event.controls.slice(0);
						var map = ['A.于摸牌阶段多摸1张牌','B.于出牌阶段多出1张【杀】','C.于弃牌阶段手牌上限+1'];
						if(player.storage.shangsheng[0]==-1)	return controls.randomGet();
						else{
							if(player.storage.shangsheng[0]>=0)	controls.remove(map[player.storage.shangsheng[0]]);
							if(player.storage.shangsheng[1]>=0)	controls.remove(map[player.storage.shangsheng[1]]);
							if(controls.contains('B.于出牌阶段多出1张【杀】')&&player.countCards('hs','sha')>=2&&player.hasUseTarget({name:'sha',isCard:true}))	return 'B.于出牌阶段多出1张【杀】';
							return controls.randomGet();
						}
					}).set('prompt','『能力上升』：选择一项');
					'step 1'
					event.change = result.control;
					switch(event.change){
						case 'A.于摸牌阶段多摸1张牌':{
							player.addTempSkill('shangsheng_Buff0');break;
						}
						case 'B.于出牌阶段多出1张【杀】':{
							player.addTempSkill('shangsheng_Buff1');break;
						}
						case 'C.于弃牌阶段手牌上限+1':{
							player.addTempSkill('shangsheng_Buff2');break;
						}
					}
					'step 2'
					event.map = {
						'A.于摸牌阶段多摸1张牌':1,
						'B.于出牌阶段多出1张【杀】':2,
						'C.于弃牌阶段手牌上限+1':3,
					}
					if(player.storage.shangsheng[0]>=0&&player.storage.shangsheng[0]!=event.map[event.change]
					&&player.storage.shangsheng[1]>=0&&player.storage.shangsheng[1]!=event.map[event.change])	player.storage.shangsheng_Buff++;
					else if(player.storage.shangsheng_Buff>0)	player.storage.shangsheng_Buff--;
					'step 3'
					player.storage.shangsheng[1] = player.storage.shangsheng[0];
					player.storage.shangsheng[0] = event.map[event.change];
					player.markSkill('shangsheng_Buff');
				},
				group:'shangsheng_Buff',
				subSkill:{
					Buff0:{
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							var Buff = (player.storage.shangsheng_Buff)||1;
							trigger.num+=Buff;
						},
						mark:true,
						marktext:'A',
						intro:{name:'Buff',content:'本回合内于摸牌阶段多摸牌'},
					},
					Buff1:{
						mod:{
							cardUsable:function (card,player,num){
								var Buff = (player.storage.shangsheng_Buff)||1;
								if(card.name=='sha'&&player.isPhaseUsing()) return num+Buff;
							},
						},
						mark:true,
						marktext:'B',
						intro:{name:'Buff',content:'本回合内于出牌阶段可以多使用【杀】'},
					},
					Buff2:{
						trigger:{player:'phaseDiscardBegin'},
						forced:true,
						content:function(){},
						mod:{
							maxHandcard:function(player,num){
								var Buff = (player.storage.shangsheng_Buff)||1;
								return num+=Buff;
							},
						},
						mark:true,
						marktext:'C',
						intro:{name:'Buff',content:'本回合于弃牌阶段手牌上限上升'},
					},
					Buff:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 0;
						},
						marktext:"↑↑",
						locked:true,
						intro:{
							name:'能力值大上升↑↑',
							content:'Buff已叠加&层',
						},
					}
				}
			},
			jinghua:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.getStat().card.sha>0;
				},
				filterCard:function(card){
					return true;
				},
				complexCard:true,
				selectCard:function(){
					var player = _status.event.player;
					return player.getStat().card.sha;
				},
				complexTarget:true,
				multitarget:true,
				selectTarget:function(){
					if(!ui.selected.cards.length) return [1,1];
					return [ui.selected.cards.length,ui.selected.cards.length];
				},
				filterTarget:function(card,player,target){
					if(!ui.selected.cards.length) return false;
					return target!=player;
				},
				discard:false,
				lose:false,
				check:function(card){
					if(get.type(card)=='basic')	return 7-get.value(card);
					return 4-get.value(card);
				},
				content:function(){
					'step 0'
					event.shows = cards.slice(0);
					event.gains = targets.slice(0);
					if(!player.storage.jinghua)	player.storage.jinghua = [];
					player.storage.jinghua.addArray(event.gains);
					'step 1'
					var show = event.shows.shift();
					var gain = event.gains.shift();
					player.showCards(show,'『镜花水月』展示牌');
					gain.addSkill('jinghua2');
					player.give(show,gain,true);
					gain.markAuto('jinghua2',[show]);
					if(event.gains.length)	event.redo();
				},
				ai:{
					order:7,
					result:{
						target:-1,
					}
				}
			},
			jinghua2:{
				marktext:'镜',
				intro:{
					name:'镜花水月',
					content:'cards',
				},
				onremove:true,
				charlotte:true,
				mod:{
					cardEnabled:function(card,player){
						if(player.getStorage('jinghua2').filter(function(magic){
							return get.type2(magic)==get.type2(card);
						}).length)	return false;
					},
					// cardRespondable:function(card,player){
					// 	if(player.getStorage('jinghua2').filter(function(magic){
					// 		return get.type2(magic)==get.type2(card);
					// 	}).length)	return false;
					// },
					cardSavable:function(card,player){
						if(player.getStorage('jinghua2').filter(function(magic){
							return get.type2(magic)==get.type2(card);
						}).length)	return false;
					},
				},
				trigger:{
					global:'phaseBefore',
				},
				locked:true,
				direct:true,
				filter:function(event,player){
					return event.player.hasSkill('jinghua')&&event.player.getStorage('jinghua').contains(player);
				},
				content:function(){
					player.line(trigger.player);
					trigger.player.storage.jinghua.remove(player);
					player.removeSkill('jinghua2');
				},
			},
			//七濑胡桃
			shang:{
				marktext:'裳',
				intro:{
					name:'裳',
					content:'cards',
					onunmark:'throw',
				},
				locked:true,
				init:function(player,skill){
					if(!player.storage[skill])	player.storage[skill] = [];
				},
			},
			shangbei:{
				group:['shang','shangbei_give'],
				trigger:{player:'damageAfter'},
				frequent:true,
				content:function(){
					'step 0'
					var cards=[ui.cardPile.firstChild];
					event.cards=cards;
					player.showCards(event.cards,'『裳备』展示牌');
					'step 1'
					if(!player.getStorage('shang').contains(get.suit(event.cards[0],false))){
						if(!player.storage.shang)	return player.storage.shang = [];
						player.$draw(event.cards);
						player.markAuto('shang',game.cardsGotoSpecial(event.cards).cards);
						player.draw();
					}
				},
				subSkill:{
					give:{
						trigger:{player:'phaseUseBegin'},
						direct:true,
						filter:function(event,player){
							return player.getStorage('shang').length>0;
						},
						content:function(){
							'step 0'
							event.cards = player.getStorage('shang');
							'step 1'
							event.videoId=lib.status.videoId++;
							var dialogx=['###『裳备』：你的“裳”###选择某一类型的“裳”，然后令一名角色获得之'];
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
							'step 2'
							var next = player.chooseButton();
							next.set('selectButton',1);
							next.set('dialog',event.videoId);
							next.set('ai',function(button){
								return get.value(button.link);
							});
							'step 3'
							if(result.bool&&result.links){
								event.links=result.links;
								var func=function(cards,id){
									var dialog=get.idDialog(id);
									if(dialog){
										for(var j=0;j<cards.length;j++){
											for(var i=0;i<dialog.buttons.length;i++){
												if(get.type2(dialog.buttons[i].link)==get.type2(cards[j])){
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
								player.chooseTarget('『裳备』：令一名角色获得之').set('ai',function(target){
									var player = _status.event.player;
									var effect = get.attitude(player,target)*1.5;
									if(target!=player)	effect+=get.recoverEffect(player,player,player);
									return effect;
								});
							}else{
								if(player.isOnline2()){
									player.send('closeDialog',event.videoId);
								}
								event.dialog.close();
								event.finish();
							}
							'step 4'
							if(result.bool&&result.targets){
								event.target = result.targets[0];
								var type = get.type2(event.links[0]);
								event.cards = event.cards.filter(function(card){
									return get.type2(card)==type;
								});
								player.unmarkAuto('shang',event.cards);
								player.$give(event.cards,event.target);
								event.target.gain(event.cards,'giveAuto');
								if(event.target!=player)	player.recover();
							}else{
								for(var i=0;i<dialog.buttons.length;i++){
									dialog.buttons[i].classList.remove('glow');
								}
								event.goto(2);
							}
							'step 5'
							if(player.isOnline2()){
								player.send('closeDialog',event.videoId);
							}
							event.dialog.close();
						},
					}
				}
			},
			qianqing:{
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return player.getStorage('shang').length==0;
				},
				content:function(){
					player.damage('nosource');
				}
			},
			//Rim
			shenghua:{
				enable:'phaseUse',
				position:'h',
				filter:function(event,player){
					return player.countCards('h');
				},
				filterCard:true,
				selectCard:-1,
				check:function(card){
					if(get.type(card)=='equip')	return 10-get.value(card);
					return 6-get.value(card);
				},
				content:function(){
					player.draw(cards.length-player.countSkill('shenghua'));
				},
				ai:{
					order:function(item,player){
						if(player.countCards('h',{type:'equip'}))	return 4;
						else return 1;
					},
					result:{
						player:function(player){
							if(player.isTurnedOver()&&player.countCards('h',{type:'equip'}))	return 1;
							return 1-player.countSkill('shenghua');
						}
					}
				}
			},
			zhanchong:{
				trigger:{player:'loseEnd'},
				filter:function(event,player){
					if(event.getParent().name&&['useCard','addJudge'].contains(event.getParent().name)) return false;
					if(!event.visible) return false;
					for(var i=0;i<event.hs.length;i++){
						console.log(event)
						if(get.type(event.hs[i])=='equip') return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					event.num = trigger.hs.filter(function(chong){
						return get.type(chong)=='equip'
					}).length;
					'step 1'
					if(event.num>0){
						player.chooseTarget(get.prompt2('zhanchong')).set('ai',function(target){
							var player = _status.event.player;
							if(player.isTurnedOver())	return 4-get.attitude(player,target);
							return -0.5-get.attitude(player,target);
						});
					}else	event.finish();
					'step 2'
					if(result.bool&&result.targets[0]){
						event.target = result.targets[0];
						player.discardPlayerCard(result.targets[0],'he',true).set('ai',function(button){
							if(get.type(button.link)=='equip') return 2-get.value(button.link);
							return 1-get.value(button.link)+get.damageEffect(_status.event.target,_status.event.player,_status.event.player);
						})
					}else	event.finish();
					'step 3'
					if(result.bool){
						player.turnOver();
						event.num--;
						if(get.type(result.cards[0])!='equip'){
							event.target.damage(player);
						}
						event.goto(1);
					}
				},
			},
			//情绪
			baiqing:{
				init:function(player,skill){
					if(!player.storage[skill])	player.storage[skill] = 0;
				},
				trigger:{global:'useCard2'},
				filter:function(event,player){
					if(event.card.name!='sha')	return false;
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					if(!player.storage.baiqing)	player.storage.baiqing = 0;
					player.storage.baiqing++;
					player.markSkill('baiqing');
					console.log(player.storage.baiqing);
					'step 1'
					if(player.maxHp-player.hp+1==player.storage.baiqing){
						player.chooseBool(get.prompt2('baiqing')).ai=function(){
							return 1;
						};
					}
					'step 2'
					if(result.bool){
						event.cards = get.cards(player.storage.baiqing);
						player.showCards('『白情』亮出牌堆顶'+get.cnNumber(player.storage.baiqing)+'张牌',event.cards);
					}else	event.finish();
					'step 3'
					var discards = [];
					if(trigger.cards){
						event.cards = event.cards.filter(function(card){
							for(var i=0;i<trigger.cards.length;i++){
								if(get.color(trigger.cards[i])==get.color(card)){
									discards.add(card);
									return false;
								}
							}
							return true;
						})
					}
					if(discards.length){
						game.cardsDiscard(discards);
					}
					player.gain(event.cards,'log','gain2');
				},
				marktext:'ヰ',
				mark:true,
				intro:{
					content:'全场已使用#张杀',
				},
				group:'baiqing_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						priority:42,
						content:function(){
							player.unmarkSkill('baiqing');
							player.storage.baiqing = 0;
						}
					},
				},
			},
			shuangxing:{
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(get.type2(event.card)!='trick')	return false;
					return event.targets&&event.targets.length&&!event.targets.contains(player);
				},
				direct:true,
				content:function(){
					'step 0'
					var controls = ['令你本回合使用牌无次数限制','令其中一名目标对你使用一张【杀】，否则你获得其一张牌','取消'];
					player.chooseControl('dialogcontrol',controls).set('ai',function(){
						var player = _status.event.player;
						if(player.countCards('hs','sha')>2&&!player.hasSkill('shuangxing_chenhui')&&!player.hasUnknown(2))	return 0;
						return 1;
					}).set('prompt',get.prompt2('shuangxing'));
					'step 1'
					switch(result.control){
						case '令你本回合使用牌无次数限制':{
							player.logSkill('shuangxing');
							player.addTempSkill('shuangxing_chenhui');
							event.finish();
							break;
						}
						case '令其中一名目标对你使用一张【杀】，否则你获得其一张牌':{
							player.chooseTarget(get.prompt2('shuangxing'),function(card,player,target){
								return _status.event.targets.contains(target)&&target.countCards('h');
							}).set('ai',function(target){
								if(get.attitude(player,target)<0){
									if(player.maxHp-player.hp+1>player.storage.baiqing)	return 4;
									else	return 5-target.countCards('hs');
								}
								return 0;
							}).set('targets',trigger.targets);
							break;
						}
						default:event.finish();
					}
					'step 2'
					if(result.bool&&result.targets[0]){
						var target = result.targets[0];
						event.target = target;
						player.logSkill('shuangxing',target);
						target.chooseToUse(function(card,player,event){
							if(get.name(card)!='sha') return false;
							return lib.filter.filterCard.apply(this,arguments);
						},'『星徊』：对'+get.translation(player)+'使用一张杀，或令其获得你的一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
							if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
							return lib.filter.targetEnabled2.apply(this,arguments);
						}).set('sourcex',player);
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool==false&&event.target.countGainableCards(player,'he')>0){
						player.gainPlayerCard(event.target,'he',true);
					}
					else{
						event.finish();
					}
				},
				subSkill:{
					chenhui:{
						mark:true,
						intro:{
							content:'本回合使用牌无次数限制',
						},
						mod:{
							cardUsable:function(card,player,num){
								return Infinity;
							},
						},
					}
				}
			},
			//可不
			nisheng:{
				init:function(player,skill){
					if(!player.storage[skill])	player.storage[skill] = [];
				},
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					if(event.skill)	return false;
					return player.countCards('h',function(card1){
						var num = get.number(card1,player);
						if(player.getStorage('nisheng').contains(num))	return false;
						return player.countCards('h',function(card2){
							return card1!=card2&&num==get.number(card2,player);
						});
					})>=2;
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('nisheng'),'h',2,function(card,player){
						var num = get.number(card);
						if(player.getStorage('nisheng').contains(num))	return false;
						if(ui.selected.cards.length)	return num==get.number(ui.selected.cards[0]);
						return true;
					}).ai=get.unuseful2;
					'step 1'
					if(result.bool&&result.cards[0]){
						player.showCards(result.cards, '拟声');
						player.storage.nisheng.add(get.number(result.cards[0]));
						player.markSkill('nisheng');
						player.insertPhase();
					}
					else{
						event.finish();
					}
				},
				intro:{
					content:'已使用过的点数：#',
				},
			},
			jingyan:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.source&&event.source.isIn()&&event.source.countCards('he')/2>0;
				},
				check:function (event,player){
					return event.source.countCards('he')/2>=2||player.isTurnedOver();
				},
				logTarget:'source',
				content:function(){
					'step 0'
					player.turnOver();
					'step 1'
					player.gainPlayerCard(trigger.source,true,'he',Math.ceil(trigger.source.countCards('he')/2));
				},
			},
			//猫又小粥
			fantuan:{
				trigger:{player:'useCard2'},
				direct:true,
				filter:function(event){
					return get.type(event.card)=='delay';
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('fantuan')).set('ai',function(target){
						var player = _status.event.player;
						return get.recoverEffect(target,player,player)+get.attitude(player,target);
					});
					'step 1'
					if(result.bool&&result.targets[0]){
						result.targets[0].recover();
						result.targets[0].draw();
					}
				},
			},
			shengang:{
				group:['shengang_judge','shengang_useCard'],
				subSkill:{
					judge:{
						trigger:{global:['judgeAfter']},
						filter:function(event,player){
							if(!game.filterPlayer(function(cur){
								return get.distance(player,cur,'pure')==1;
							},[player]).contains(event.player))		return false;
							return event.card&&get.type(event.card)=='delay'&&get.position(event.card)=='d';
						},
						prompt2:function(event,player){
							return '获得'+get.translation(event.card);
						},
						check:function (event,player){
							return get.value(event.card)>3;
						},
						round:2,
						content:function(){
							player.gain(trigger.card,'gain2','log');
						},
					},
					useCard:{
						trigger:{global:['useCardAfter']},
						filter:function(event,player){
							if(!game.filterPlayer(function(cur){
								return get.distance(player,cur,'pure')==1;
							},[player]).contains(event.player))		return false;
							return event.cards&&event.cards.filterInD().length;
						},
						prompt2:function(event,player){
							return '获得'+get.translation(event.cards.filterInD());
						},
						check:function (event,player){
							return get.value(event.cards.filterInD())>3;
						},
						round:2,
						content:function(){
							player.gain(trigger.cards.filterInD(),'gain2','log');
						},
					}
				}
			},
			//喵喵人
			shenghuo:{
				audio:3,
				init:function(player,skill){
					player.markSkill('shenghuo');
					if(!player.storage[skill])	player.storage[skill] = 0;
				},
				enable:'phaseUse',
				position:'h',
				filter:function(event,player){
					return !player.getStat('skill').shenghuo||player.getStat('skill').shenghuo<player.storage.shenghuo+1;
				},
				content:function(){
					'step 0'
					event.topCards = get.cards(player.storage.shenghuo+1);
					event.bottomCards = get.bottomCards(player.storage.shenghuo+1);
					event.bottomCards.removeArray(event.topCards);
					var cards = event.topCards.concat(event.bottomCards);
					player.chooseButton([0,Infinity],true,['『圣火』：按顺序选择置于牌堆另一端的牌（先选择的在外侧）','牌堆顶',[event.topCards,'card'],'牌堆底',[event.bottomCards,'card']]).set('ai',function(button){
						var player=_status.event.player;
						var bottomCards=_status.event.bottomCards;
						var next=player.getNext();
						var att=get.attitude(player,next);
						var card=button.link;
						var judge=next.getCards('j')[ui.selected.buttons.filter(function(buttonx){
							return bottomCards.contains(buttonx.link);
						}).length];
						if(judge){
							if(bottomCards.contains(card))	return get.judge(judge)(card)*att;
							else	return -get.judge(judge)(card)*att;
						}
						if(bottomCards.contains(card))	return next.getUseValue(card)*att;
						return -next.getUseValue(card)*att;
					}).set('bottomCards',event.bottomCards);
					'step 1'
					if(result.bool&&result.links){
						var links = result.links.slice(0)
						var top = event.topCards.slice(0).removeArray(links);
						var bottom = event.bottomCards.slice(0).removeArray(links);
						for(var i=0;i<links.length;i++){
							if(event.topCards.contains(links[i]))	bottom.push(links[i]);
							if(event.bottomCards.contains(links[i]))	top.unshift(links[i]);
						}
						for(var i=top.length-1;i>-1;i--){
							ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
						}
						for(var i=0;i<bottom.length;i++){
							ui.cardPile.appendChild(bottom[i]);
						}
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.updateRoundNumber();
						game.delay(2);
					}
				},
				marktext:'Nya',
				mark:true,
				intro:{
					content:'上次受到的伤害值为#',
				},
				group:'shenghuo_change',
				subSkill:{
					change:{
						trigger:{player:'damage'},
						filter:function(event,player){
							return event.num>0;
						},
						direct:true,
						content:function(){
							player.storage.shenghuo = trigger.num;
							player.markSkill('shenghuo');
						}
					}
				},
				ai:{
					order:function(item,player){
						if(player.countCards('hs',function(card){
							return get.tag(card,'draw')
						}))	return 10;
						else return 1;
					},
					result:{
						player:function(player){
							return 1;
						}
					}
				},
			},
			dipo:{
				audio:1,
				trigger:{
					player:'drawBegin'
				},
				filter:function(event,player){
					return player.isDamaged();
				},
				forced:true,
				firstDo:true,
				content:function(){
					trigger.bottom = true;
					trigger.num++;
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					skillTagFilter:function(player){
						return player.isHealthy();
					},
					threaten:function(player,target){
						if(target.hp==target.maxHp) return 0.5;
						return 1.2;
					},
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'draw')&&target.isDamaged()) return [1,1];
						}
					}
				}
			},
			miaoche:{
				audio:2,
				trigger:{global:'loseAfter'},
				filter:function(event,player){
					if(!player.hasZhuSkill('miaoche')) return false;
					return event.type=='discard'&&event.getParent('phaseDiscard').player==event.player&&event.player.isYingV()&&event.cards2.filterInD('d').length>0;
				},
				zhuSkill:true,
				direct:true,
				content:function(){
					'step 0'
					if(trigger.delay===false) game.delay();
					var cards = trigger.cards2.filterInD('d');
					player.chooseCardButton(cards,'『喵车』：是否获得其中的一张牌？').set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('miaoche',trigger.player);
						player.gain(result.links[0],'gain2');
						game.delayx();
					}
				},
			},
			//铁耗子
			haosun:{
				audio:3,
				init:function(player,skill){
					if(!player.storage[skill])	player.storage[skill] = [];
				},
				trigger:{
					player:'phaseBegin'
				},
				filter:function(event,player){
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					var controls = ['回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张','声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张','取消'];
					player.chooseControl('dialogcontrol',controls).set('ai',function(){
						var player = _status.event.player;
						if(player.isDamaged()||player.getStorage('haosun').length>1)	return 0;
						return 1;
					}).set('prompt',get.prompt2('haosun'));
					'step 1'
					switch(result.control){
						case '回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张':{
							player.logSkill('haosun');
							player.recover();
							player.storage.banmao = true;
							player.storage.haosun = [];
							player.addTempSkill('haosun_drop');
							player.unmarkSkill('haosun');
							event.finish();
							break;
						}
						case '声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张':{
							player.chooseControl(get.inpile('basic',function(card){
								var player = _status.event.player;
								return lib.filter.cardEnabled({name:card},player,'forceEnable');
							})).set('prompt','声明一种你可以使用的基本牌并令你不能使用之').set('choice',get.inpile('basic',function(card){
								var player = _status.event.player;
								if(player.hasCard(card))	return false;
								return lib.filter.cardEnabled({name:card},player,'forceEnable');
							})).set('ai',function(target){
								var player = _status.event.player;
								var controls = _status.event.controls.slice(0);
								if(_status.event.choice&&_status.event.choice.length)	return _status.event.choice.randomGet();
								if(controls.contains('qi'))		return 'qi';
								if(controls.contains('tao')&&player.hp>=2)	return 'tao';
								if(controls.contains('jiu'))	return 'jiu';
								return controls.randomGet();
							});
							break;
						}
						default:event.finish();
					}
					'step 2'
					if(result.control){
						player.logSkill('haosun');
						player.popup(result.control);
						player.storage.haosun.add(result.control);
						player.addTempSkill('haosun_plus');
						player.markSkill('haosun');
						game.delayx();
					}
				},
				mod:{
					cardEnabled:function(card,player){
						if(player.getStorage('haosun').contains(get.name(card)))		return false;
					},
					cardSavable:function(card,player){
						if(player.getStorage('haosun').contains(get.name(card)))		return false;
					}
				},
				mark:true,
				intro:{
					content:'已禁用的基本牌：$',
				},
				subSkill:{
					drop:{
						trigger:{
							player:'drawBegin'
						},
						forced:true,
						firstDo:true,
						content:function(){
							trigger.num--;
						},
						mark:true,
						intro:{
							content:'摸牌量-1',
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(get.tag(card,'draw')) return 0;
								}
							}
						}
					},
					plus:{
						trigger:{
							player:'drawBegin'
						},
						forced:true,
						firstDo:true,
						content:function(){
							trigger.num++;
						},
						mark:true,
						intro:{
							content:'摸牌量+1',
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(get.tag(card,'draw')) return [1,1];
								}
							}
						}
					}
				}
			},
			banmao:{
				audio:2,
				trigger:{
					player:'damageEnd',source:'damageEnd'
				},
				filter:function(event,player){
					return event.source&&event.card&&get.name(event.card)=='sha';
				},
				forced:true,
				content:function(){
					trigger.source.draw();
				},
				mod:{
					cardEnabled:function(card,player){
						if(['shan','jiu'].contains(get.name(card))&&player.isHealthy()&&player.storage.banmao!==true)		return false;
					},
					cardSavable:function(card,player){
						if(['shan','jiu'].contains(get.name(card))&&player.isHealthy()&&player.storage.banmao!==true)		return false;
					}
				},
				derivation:'banmao_rewrite',
			},
			//Froot
			exiao:{
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event){
					return get.type(event.card)=='trick';
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						if(get.color(card)=='black') return 4;
						return -1;
					});
					'step 1'
					if(result.judge>0){
						trigger.nowuxie=true;
						game.delayx();
						if(get.position(result.card)=='d') player.gain(result.card,'gain2','log');
					}
				},
			},
			jinmei:{
				audio:2,
				trigger:{global:'phaseBegin'},
				round:1,
				priority:996,
				filter:function(event,player){
					return event.player!=player&&player.countCards('he',{color:'black'});
				},
				direct:true,
				content:function(){
					'step 0'
					var goon = get.attitude(player,trigger.player)<0&&!trigger.player.hasJudge('lebu')&&!trigger.player.hasJudge('bingliang');
					var next = player.chooseCard(get.prompt2('jinmei'),'he',{color:'black'}).set('goon',goon).set('ai',function(card){
						if(!goon)	return 0;
						return 5-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('jinmei',trigger.player);
						trigger.player.gain(result.cards,player,'giveAuto');
						trigger.player.addTempSkill('jinmei_drop')
					}
				},
				ai:{
					expose:0.1,
				},
				subSkill:{
					drop:{
						trigger:{
							player:'drawBegin'
						},
						forced:true,
						firstDo:true,
						content:function(){
							trigger.num--;
						},
						mark:true,
						intro:{
							content:'摸牌量-1',
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(get.tag(card,'draw')) return 0;
								}
							}
						}
					},
				}
			},
			//Veibae
			zhexun:{
				group:'zhexun0',
				audio:3,
			},
			zhexun0:{
				trigger:{player:'useCard2'},
				frequent:true,
				filter:function(event,player){
					var card=event.card;
					var info=get.info(card);
					if(info.allowMultiple==false) return false;
					var history = player.getHistory('useCard',function(evt){
						return get.color(event.card)==get.color(evt.card);
					}).length;
					return history>1&&history==player.getHistory('useCard').length;
				},
				content:function(){
					'step 0'
					trigger.directHit.addArray(game.players);
					'step 1'
					if(get.type2(trigger.card)!='equip'){
						var prompt2='为'+get.translation(trigger.card)+'额外指定一个目标';
						player.chooseTarget(get.prompt(event.name),function(card,player,target){
							var player=_status.event.player;
							if(_status.event.targets.contains(target)) return false;
							return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
						}).set('prompt2',prompt2).set('ai',function(target){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							return get.effect(target,trigger.card,player,player);
						}).set('targets',trigger.targets).set('card',trigger.card);
					}
					'step 2'
					if(result.targets){
						player.line(result.targets);
						game.log(result.targets,'成为了',trigger.card,'的额外目标');
						trigger.targets.addArray(result.targets);
					}
				},
			},
			yuci:{
				audio:2,
				trigger:{
					player:'drawBegin'
				},
				forced:true,
				firstDo:true,
				filter:function(event,player){
					if(player.hasSkill('yuci_used'))	return false;
					var another = player.next;
					var sex = false;
					while(another!=player){
						if(sex!=false&&another.sex!=sex)	return false;
						sex = another.sex;
						another = another.next;
					}
					return true;
				},
				content:function(){
					trigger.num++;
					player.addTempSkill('yuci_used','phaseNext');
				},
				subSkill:{
					used:{}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'draw')) return [1,1];
						}
					}
				}
			},
			//Melody
			kuangbiao:{
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return get.suit(event.card)=='heart'&&player.getHistory('lose',function(evt){
						if(evt.getParent()!=event)	return false;
						if(JSON.stringify(evt.hs)==JSON.stringify(event.cards))		return true;
						return false;
					}).length>0;
				},
				content:function(){
					'step 0'
					if(player.hp!=1)	player.loseHp();
					'step 1'
					player.directgains(trigger.cards,null,'kuangbiao');
				},
				mod:{
					cardname:function(card,player,name){
						if(get.suit(card)=='heart'&&get.position(card)=='h')	return 'wuzhong';
					},
					cardEnabled2:function(cardx,player){
						if(player.countCards('s',function(card){
							return card.hasGaintag('kuangbiao');
						})){
							if(get.position(cardx)=='s'&&cardx.hasGaintag('kuangbiao')&&!player.isDamaged())	return false;
						}
					}
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(get.suit(card)=='heart'&&get.position(card)=='h'){
								if(player.hp==1)	return [1,0.1,1,0];
								return [1,(player.hp-3)*2,1,0];
							}
						}
					}
				}
			},
			leizhu:{
				trigger:{player:'useCard2'},
				filter:function(event,player){
					return get.type2(event.card)=='trick';
				},
				direct:true,
				intro:{
					name2:'R18',
					content:'mark',
				},
				content:function(){
					'step 0'
					player.addMark('leizhu',1,false);
					if(player.countMark('leizhu')==3){
						player.removeMark('leizhu',3,false);
						var card=trigger.card;
						var info=get.info(card);
						if(info.allowMultiple==false||!trigger.targets||!game.hasPlayer(function(cur){
							return !trigger.targets.contains(cur)&&lib.filter.targetEnabled2(trigger.card,player,cur);
						}))	event.finish();
					}
					else	event.finish();
					'step 1'
					var prompt2='为'+get.translation(trigger.card)+'增加一个目标';
					player.chooseTarget(get.prompt(event.name),function(card,player,target){
						var player=_status.event.player;
						if(_status.event.targets.contains(target))	return false;
						return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						if(player.hp==1)	return false;
						return get.effect(target,trigger.card,player,player)+get.damageEffect(target,player,player);
					}).set('targets',trigger.targets).set('card',trigger.card);
					'step 2'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					if(event.targets){
						player.logSkill('leizhu',event.targets);
						trigger.targets.addArray(event.targets);
						player.damage();
						event.targets[0].damage();
					}
				},
			},
			tonggan:{
				unique:true,
				trigger:{
					global:'drawBegin'
				},
				zhuSkill:true,
				forced:true,
				firstDo:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('tonggan'))	return false;
					if(player.hasSkill('tonggan_used'))	return false;
					return event.player.group&&event.player.group==player.group;
				},
				logTarget:'player',
				content:function(){
					trigger.player.addTempSkill('tonggan_used','phaseNext');
					if(game.roundNumber%2==1)	return trigger.num--;
					if(game.roundNumber%2!=1)	return trigger.num++;
				},
				subSkill:{
					used:{}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'draw')&&!target.hasSkill('tonggan_used')){
								if(game.roundNumber%2==1)	return [0.2,0];
								if(game.roundNumber%2!=1)	return [1,2];
							}
						}
					}
				}
			},
			//耳朵
			jiace:{
				trigger:{target:'useCardToTarget'},
				filter:function(event,player){
					if(!event.targets||!event.targets.contains(player)) return false;
					if(event.player==player)	return false;
					var info=get.info(event.card);
					if(info.allowMultiple==false||info.multitarget)	return false;
					if(get.color(event.card)!='black')	return false;
					if(event.targets.length>=1)	return true;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt2('jiace'),{suit:get.suit(trigger.card)}).ai=get.unuseful2;
					'step 1'
					if(result.bool){
						player.logSkill('jiace',trigger.player);
						player.give(result.cards,trigger.player,true);
						if(!player.hasSkill('jiace_used')){
							if(!trigger.getParent().addedSkill)	trigger.getParent().addedSkill = [];
							trigger.getParent().addedSkill.add('jiace');
						}
					}
					else{
						event.finish();
					}
					'step 2'
					player.addTempSkill('jiace_used')
					var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
					player.chooseTarget(get.prompt('jiace'),function(card,player,target){
						var player = _status.event.player;
						var source = _status.event.source;
						if(_status.event.targets.contains(target)) return true;
						return lib.filter.targetEnabled2(_status.event.card,source,target)&&lib.filter.targetInRange(_status.event.card,source,target);
					}).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var source = _status.event.source;
						return get.effect(target,trigger.card,source,player)*(_status.event.targets.contains(target)?-1:1);
					}).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player);
					'step 3'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 4'
					if(event.targets){
						player.logSkill('jiace',event.targets);
						if(trigger.targets.contains(event.targets[0])) trigger.targets.removeArray(event.targets);
						else trigger.targets.addArray(event.targets);
					}
				},
				group:['jiace_gainBy'],
				subSkill:{
					used:{},
					gainBy:{
						trigger:{global:'useCardAfter'},
						forced:	true,
						filter:function(event,player){
							var cards = event.cards.filterInD();
							return cards.length&&event.addedSkill&&event.addedSkill.contains('jiace');
						},
						content:function(){
							var cards = trigger.cards.filterInD();
							player.gain(cards,'gain2');
						},
					},
				}
			},
			xiangying:{
				enable:'phaseUse',
				position:'h',
				usable:1,
				filter:function(event,player){
					return player.countCards('h',{color:'red'});
				},
				filterCard:function(card,player){
					return get.color(card)=='red';
				},
				selectCard:[1,Infinity],
				filterTarget:function(card,player,target){
					return target.countCards('h')<player.countCards('h');
				},
				discard:false,
				lose:false,
				prepare:'give2',
				content:function(){
					'step 0'
					target.gain(cards,player);
					'step 1'
					if(target.countCards('h')>player.countCards('h')){
						target.showHandcards();
					}
					else{
						event.finish();
					}
					'step 2'
					var num = Math.abs(target.countCards('h',{color:'red'})-target.countCards('h',{color:'black'}));
					player.draw(num);
				},
				ai:{
					order:10,
					result:{
						player:function(player,target){
							var num = ui.selected.cards.length*2+target.countCards('h');
							if(num<=player.countCards('h')) return -1;
							return Math.abs(num+target.countCards('h',{color:'red'})-target.countCards('h',{color:'black'}));
						},
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							return ui.selected.cards.length;
						}
					}
				}
			},
			//萌实
			chengzhang:{
				audio:3,
				trigger:{
					player:'loseAfter',
					global:['gainAfter','equipAfter','addJudgeAfter','loseAsyncAfter'],
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.isIn()&&target.hasUseTarget(card);
				},
				filter:function(event,player){
					var evt=event.getl(player);
					return evt&&evt.es&&evt.es.filter(function(card){
						return get.position(card,true)=='d'&&game.hasPlayer(function(target){
							return lib.skill.chengzhang.filterTarget;
						});
					}).length>0;
				},
				frequent:true,
				content:function(){
					'step 0'
					event.cards=trigger.getl(player).es.filter(function(card){
						return get.position(card,true)=='d'&&game.hasPlayer(function(target){
							return lib.skill.chengzhang.filterTarget;
						});
					});
					event.count=event.cards.length;
					'step 1'
					event.count--;
					player.chooseTarget(function(card,player,target){
						return target!=player&&target.isIn()&&target.hasUseTarget(_status.event.cardx);
					},'选择一名角色使用'+get.translation(event.cards[event.count])).set('ai',function(target){
						return get.attitude(_status.event.player,target)*get.value(_status.event.cardx,target);
					}).set('cardx',event.cards[event.count]);
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						if(target.hasUseTarget(event.cards[event.count]))	target.chooseUseTarget(event.cards[event.count],true);
					}
					'step 3'
					if(event.count)	event.goto(1);
				},
			},
			mengdong:{
				audio:3,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{player:'useCardToPlayered'},
				check:function(event,player){
					return true;
				},
				filter:function(event,player){
					return !player.getStorage('mengdong').contains(event.target)&&event.target.countCards('e')%2==1;
				},
				frequent:true,
				logTarget:'target',
				content:function(){
					player.storage.mengdong.add(trigger.target);
					player.markSkill('mengdong');
					player.draw();
				},
				group:'mengdong_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						priority:23,
						filter:function(event,player){
							return player.storage.mengdong&&player.storage.mengdong.length;
						},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.mengdong.length = 0;
						}
					}
				},
				ai:{
					result:{
						player:1,
					},
					effect:{
						player:function(card,player,target,current){
							if(target&&!player.getStorage('mengdong').contains(target)&&target.countCards('e')%2==1) return [1,1];
						}
					}
				}
			},
			//夏实萌惠
			moemanyi:{
				locked:true,
				mod:{
					targetEnabled:function(card,player,target,now){
						if(get.type(card)=='delay'){
							for(var i=0;i<game.players.length;i++){
								if(!(game.players[i].isOut()||game.players[i]==player)){
									if(game.players[i].getAttackRange()<player.getAttackRange())	return now;
								}
								return false;
							}
						}
						if(get.name(card)=='sha'&&get.color(card)=='black'){
							for(var i=0;i<game.players.length;i++){
								if(!(game.players[i].isOut()||game.players[i]==player)){
									if(game.players[i].getAttackRange()>player.getAttackRange())	return now;
								}
								return false;
							}
						}
					}
				},
			},
			cuchuan:{
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed&&game.hasPlayer(function(cur){
						return player!=cur&&get.distance(player,cur)<=1
					});
				},
				check:function(event,player){
					return game.countPlayer(function(cur){
						return player!=cur&&get.distance(player,cur)<=1
					})>=2;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					event.targets = game.filterPlayer(function(cur){
						return player!=cur&&get.distance(player,cur)<=1
					});
					'step 1'
					game.asyncDraw(event.targets);
					game.delayx();
					event.num = 0;
					'step 2'
					player.gainPlayerCard(event.targets[event.num],'he',true);
					event.num++;
					'step 3'
					if(event.targets[event.num])	event.goto(2);
				},
			},
			//春猿火
			huoju:{
				trigger:{global:'damageBegin'},
				forced:true,
				filter:function(event,player){
					if(!event.source)	return false;
					if(event.source==player||get.distance(player,event.source,'pure')==1){
						return event.nature!='fire';
					}
				},
				content:function(){
					trigger.nature = 'fire';
				},
				group:'huoju_turnOverBy',
				subSkill:{
					turnOverBy:{
						trigger:{player:'damageAfter',source:'damageAfter'},
						forced:true,
						filter:function(event,player){
							return event.nature=='fire'&&event.source&&event.source.isIn()
							&&(event.source.isMinHp()||event.source.isMinHandcard());
						},
						content:function(){
							'step 0'
							if(trigger.source.isMinHandcard()){
								trigger.source.turnOver();
								trigger.source.draw();
							}
							'step 1'
							if(trigger.source.isMinHp()){
								trigger.source.turnOver();
								trigger.source.recover();
							}
						},
					}
				}
			},
			zouyang:{
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(player.hasSkill('zouyang_used'))		return false;
					var card=event.card;
					var info=get.info(card);
					if(info.allowMultiple==false) return false;
					if(event.targets&&event.targets.length==1&&!info.multitarget){
						if(game.hasPlayer(function(current){
							return !event.targets.contains(current)&&get.distance(event.targets[0],current,'pure')==1;
						})){
							return true;
						}
					}
					return false;
				},
				logTarget:function(event,player){
					return game.filterPlayer(function(current){
						return !event.targets.contains(current)&&get.distance(event.targets[0],current,'pure')==1;
					});
				},
				check:function(event,player){
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&get.distance(event.targets[0],current,'pure')==1&&get.effect(current,event.card,player,player)>0;
					});
				},
				content:function(){
					'step 0'
					event.draws = [];
					event.targets = game.filterPlayer(function(current){
						return !trigger.targets.contains(current)&&get.distance(trigger.targets[0],current,'pure')==1;
					});
					for(var i of event.targets){
						if(lib.filter.targetEnabled2(trigger.card,trigger.player,i)){
							if(event._zouyang_tmp&&event._zouyang_tmp!='target')	event._zouyang_tmp = 'goon';
							else	event._zouyang_tmp = 'target';
						}else{
							event.draws.add(i);
							if(event._zouyang_tmp&&event._zouyang_tmp!='draw')	event._zouyang_tmp = 'goon';
							else	event._zouyang_tmp = 'draw';
						}
					}
					event.targets.removeArray(event.draws);
					'step 1'
					if(event._zouyang_tmp!='goon'){
						player.addTempSkill('zouyang_used');
					}
					'step 2'
					if(event.targets.length){
						trigger.targets.addArray(event.targets);
					}
					if(event.draws.length){
						game.asyncDraw(event.draws);
					}
				},
				subSkill:{
					used:{
						mark:true,
						intro:{
							content:'不能发动『奏扬』',
						},
						sub:true
					},
				}
			},
			//幸祜
			xiezhen:{
				trigger:{global:'damageBegin'},
				filter:function(event,player){
					return event.source!=player&&get.distance(event.source,player)<=1&&event.source.countDiscardableCards(player,'he');
				},
				check:function(event,player){
					return get.damageEffect(_status.event.player0,player,player)>0;
				},
				content:function(){
					'step 0'
					event.forced = true;
					event.target = trigger.source;
					player.turnOver();
					'step 1'
					player.discardPlayerCard('he',event.target,event.forced,'『谐振』：弃置'+get.translation(event.target)+'的一张牌').set('ai',function(button){
						var player = _status.event.player;
						var num = 10;
						if(get.position(button.link)=='e'){
							if(get.damageEffect(_status.event.player0,player,player)>0)	num+=6;
							if(get.damageEffect(_status.event.player0,player,player)<0)	num-=6;
						}
						return num-get.value(button.link)*_status.event.att;
					}).set('logSkill',['rejianchu',event.target]).set('player0',trigger.player).set('att',get.attitude(player,event.target)/2);
					'step 2'
					if(result.bool&&result.links&&result.links.length){
						if(get.type(result.links[0],null,result.links[0].original=='h'?event.target:false)=='equip'){
							event.forced = false;
							trigger.num++;
							game.delayx();
							if(event.target.countDiscardableCards(player,'he'))	event.goto(1);
						}
					}
				},
			},
			wenzhou:{
				trigger:{player:'damageEnd',global:'turnOverEnd'},
				filter:function(event,player){
					if(event.name=='damage')		return event.num>1;
					return !event.player.isTurnedOver();
				},
				logTarget:function(event,player){
					if(event.name=='damage')	return event.source;
					return event.player;
				},
				forced:true,
				content:function(){
					if(trigger.name=='damage')	trigger.source.turnOver();
					else	trigger.player.draw();
				},
			},
			//猫雷NyaRu
			miaolu:{
				audio:3,
				trigger:{global:'dying'},
				filter:function(event,player){
					return event.player.hp<=0&&event.player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var check;
					if(trigger.player.isUnderControl(true,player)||get.attitude(player,trigger.player)>0){
						check=trigger.player.hasCard(function(card){
							return get.type(card)!='basic';
						});
					}
					else{
						check=trigger.player.hasCard(function(card){
							return get.type(card)=='basic';
						});
					}
					player.discardPlayerCard(trigger.player,get.prompt('miaolu',trigger.player),'h').set('ai',function(button){
						if(!_status.event.check) return 0;
						if(_status.event.target.isUnderControl(true,_status.event.player)||get.recoverEffect(_status.event.target,_status.event.player,_status.event.player)>0){
							if(get.type(button.link)!='basic'){
								return 10-get.value(button.link);
							}
							return 0;
						}
						else{
							return Math.random();
						}
					}).set('check',check);
					"step 1"
					if(result.bool){
						player.logSkill('miaolu',trigger.player);
						event.card=result.links[0];
						player.showCards([event.card],get.translation(player)+'弃置的手牌');
					}
					else{
						event.finish();
					}
					"step 2"
					if(get.type(event.card)!='basic'){
						trigger.player.recover();
					}else{
						player.gain(event.card,'gain2','log');
					}
				},
				ai:{
					threaten:1.4
				}
			},
			benglei:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return (event.num>0);
				},
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					player.chooseTarget(get.prompt2('benglei')).set('ai',function(target){
						var player = _status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 2'
					if(result.bool){
						player.logSkill('benglei',result.targets);
						event.target = result.targets[0];
						event.target.judge(function(card){
							if(get.suit(card)=='spade')		return -3;
							if(get.suit(card)=='club')		return -2;
							return 0;
						}).callback=lib.skill.benglei.callback;
					}else	event.finish();
					'step 3'
					if(event.discardBy===true){
						if(event.target.countDiscardableCards(player,'he')){
							player.line(event.target);
							player.discardPlayerCard('he',event.target,true);
						}
						if(event.redoBy){
							delete event.redoBy;
						}
						else if(event.discardBy){
							delete event.discardBy;
						}
						event.redo();
					}
					'step 4'
					if(event.count>0) event.goto(1);
				},
				callback:function(){
					'step 0'
					var evt = _status.event.getParent('benglei');
					event.Nyaru = evt.player;
					if(event.judgeResult.suit=='spade'){
						var evt = _status.event.getParent('damage');
						if(evt&&evt.name=='damage'&&evt.num){
							player.damage(evt.num,'thunder',event.Nyaru);
						}
					}
					else if(event.judgeResult.suit=='club'){
						evt.discardBy = true;
						evt.redoBy = true;
					}
					else if(event.judgeResult.color=='red'){
						event.goto(2);
					}
					'step 1'
					game.delay(2);
					event.finish();
					'step 2'
					event.Nyaru.discardPlayerCard(player,get.prompt('miaolu',player),'h').set('ai',function(button){
						if(_status.event.target.isUnderControl(true,_status.event.player)||get.recoverEffect(_status.event.target,_status.event.player,_status.event.player)>0){
							if(get.type(button.link)!='basic'){
								return 10-get.value(button.link);
							}
							return 0;
						}
						else{
							return Math.random();
						}
					});
					'step 3'
					if(result.bool){
						event.Nyaru.logSkill('miaolu',player);
						event.card=result.links[0];
						event.Nyaru.showCards([event.card],get.translation(event.Nyaru)+'弃置的手牌');
					}
					else{
						event.finish();
					}
					'step 4'
					if(get.type(event.card)!='basic'){
						player.recover();
					}else{
						event.Nyaru.gain(event.card,'gain2','log');
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.countCards('he')>1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
								if(get.attitude(target,player)<0) return [1,1];
							}
						}
					}
				}
			},
			//琴吹梦
			xuanquan:{
				derivation:'zhihu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countDisabled()<5;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###『选权』###'+lib.translate.xuanquan_info);
					},
					chooseControl:function(event,player){
						var list=[];
						for(var i=1;i<6;i++){
							if(!player.isDisabled(i)) list.push('equip'+i);
						}
						list.push('cancel2');
						return list;
					},
					check:function(event,player){
						for(var i=5;i>0;i--){
							if(player.isEmpty(i)) return ('equip'+i);
						}
						return 'cancel2';
					},
					backup:function(result){
						var next=get.copy(lib.skill.xuanquanx);
						next.position=result.control;
						return next;
					},
				},
				group:['xuanquan_record'],
				subSkill:{
					record:{
						trigger:{global:'disableEquipAfter'},
						direct:true,
						content:function(){
							player.addTempSkill('xuanquan_drawBy');
						},
					},
					drawBy:{
						trigger:{global:'phaseEnd'},
						forced:true,
						content:function(){
							'step 0'
							player.removeSkill('xuanquan_record');
							'step 1'
							player.draw();
						},
						mark:true,
						intro:{
							content:'当前回合结束摸一张牌'
						}
					},
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(game.hasPlayer(function(target){
								if(player==target) return false;
								var hs=target.countCards('h');
								return hs>2&&get.attitude(player,target)>0;
							})) return 1;
							return 0;
						},
					},
				},
			},
			xuanquanx:{
				content:function(){
					'step 0'
					player.disableEquip(lib.skill.xuanquan_backup.position);
					'step 1'
					if(player.isAlive()&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					})){
						player.chooseTarget(true,'获得一名角色的一张牌并令其获得技能『选权』',function(card,player,target){
							if(player==target)	return false;
							return target.countGainableCards(player,'he')>0;
						}).set('ai',function(target){
							return get.attitude(_status.event.player,target)*(target.countCards('he')-2);
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target);
						player.gainPlayerCard(target,'he',true);
					}
					else event.finish();
					'step 3'
					if(result.bool&&result.links&&result.links.length){
						target=event.target;
						target.addSkill('xuanquan');
					}
				},
			},
			rusu:{
				trigger:{
					player:['loseAfter'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter'],
				},
				direct:true,
				filter:function(event,player){
					var evt=event.getl(player);
					return (evt&&evt.es&&evt.es.length>0&&player.countCards('he',{type:'equip'}))
					||(evt&&evt.js&&evt.js.length>0&&player.countCards('he',{type:['trick','delay']}));
				},
				content:function(){
					'step 0'
					var evt=trigger.getl(player);
					if(evt&&evt.js&&evt.js.length>0&&player.countCards('he',{type:['trick','delay']})){
						player.chooseCardTarget({
							filterCard:{type:['trick','delay']},
							position:'he',
							filterTarget:function(card,player,target){
								return target.canAddToJudge(card);
							},
							ai1:function(card){
								return 7-get.value(card);
							},
							ai2:function(target){
								return 1-get.attitude(_status.event.player,target);
							},
							prompt:'###'+get.prompt('rusu')+'###将一张锦囊牌置于选择目标的判定区'
						})
					}
					'step 1'
					if(result.bool&&result.cards&&result.targets){
						player.logSkill('rusu',result.targets);
						var thisTarget=result.targets[0];
						var thisCard=result.cards[0];
						thisTarget.addToJudge(thisCard,player);
					}
					'step 2'
					var evt=trigger.getl(player);
					if(evt&&evt.es&&evt.es.length>0&&player.countCards('he',{type:'equip'})){
						player.chooseCardTarget({
							filterCard:{type:'equip'},
							position:'he',
							filterTarget:function(card,player,target){
								return target.isEmpty(get.subtype(card));
							},
							ai1:function(card){
								return 6-get.value(card);
							},
							ai2:function(target){
								return get.attitude(_status.event.player,target)-3;
							},
							prompt:'###'+get.prompt('rusu')+'###将一张装备牌置于选择目标的判定区'
						})
					}
					else	event.finish();
					'step 3'
					if(result.bool&&result.cards&&result.targets){
						player.logSkill('rusu',result.targets);
						var thisTarget=result.targets[0];
						var thisCard=result.cards[0];
						thisTarget.equip(thisCard);
						event.target=thisTarget;
						if(thisTarget!=player){
							player.$give(thisCard,thisTarget,false);
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='delay'&&target.countCards('he',{type:['trick','delay']})) return [1,1];
						}
					},
				}
			},
			//hh
			jichu:{
				mod:{
					selectTarget:function(card,player,range){
						if(range[1]==-1) return;
						var evt = player.getLastUsed();
						if(evt&&evt.card&&get.type2(evt.card)=='trick'&&!['delay','equip'].contains(get.type(card)))	range[1]+=1;
					},
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player.isPhaseUsing()){
							var evt = player.getLastUsed();
							var order = num;
							if(evt&&evt.card&&get.type2(evt.card)=='trick'&&!['delay','equip'].contains(get.type(card))){
								order+=2;
							}
							if(evt&&evt.card&&get.suit(evt.card)=='diamond'){
								order+=2;
							}
							return order;
						}
					},
				},
				trigger:{player:'useCardAfter'},
				frequent:true,
				filter:function(event,player){
					var evt=player.getLastUsed(1);
					if(!evt||!evt.card) return false;
					return get.suit(evt.card)=='diamond'&&!(event.result.bool == false || event.iswuxied);
				},
				content:function(){
					player.draw();
				},
			},
			mingshizhige:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.num>0;
				},
				check:function (event,player){
					return player.countCards('h',function(card){
						return player.getUseValue(card)>0;
					});
				},
				content:function(){
					'step 0'
					event.cards = player.getCards('h');
					var num = event.cards.length;
					player.lose(event.cards, ui.discardPile).set('visible', true);
					player.$throw(event.cards,1000);
					game.log(player,'将',event.cards,'置入了弃牌堆');
					player.draw(num);
					game.delayx();
					'step 1'
					player.chooseCardButton(event.cards,'是否使用其中的一张？').set('filterButton',function(button){
						return _status.event.player.hasUseTarget(button.link);
					}).set('ai',function(button){
						return _status.event.player.getUseValue(button.link);
					});
					'step 2'
					if(result.bool){
						player.chooseUseTarget(true,result.links[0]);
					}
				},
			},
			//白玉
			meihua:{
				trigger:{global:['loseAfter','cardsDiscardAfter']},
				filter:function(event,player){
					if(event.type=='discard')	return false;
					return event.cards.filter(function(card){
						return get.position(card,true)=='d'&&get.suit(card)=='club';
					}).length>0;
				},
				addDialog:function(event,player){
					return event.cards.filter(function(card){
						return get.position(card,true)=='d'&&get.suit(card)=='club';
					});
				},
				check:function(event,player){
					return event.cards.filter(function(card){
						return get.position(card,true)=='d'&&get.suit(card)=='club'&&get.value(card,player)>3;
					}).length;
				},
				round:1,
				content:function(){
					'step 0'
					var cards = trigger.cards.filter(function(card){
						return get.position(card,true)=='d'&&get.suit(card)=='club';
					});
					if(cards.length==1){
						event.cards = cards;
					}
					else{
						player.chooseCardButton(cards,true).set('ai',function(button){
							return get.value(button.link,_status.event.player)-3;
						});
					}
					'step 1'
					if(result.bool&&result.links){
						event.cards = result.links.slice(0);
					}
					player.gain(event.cards,'gain2','log');
				},
			},
			shentian:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.viewHandcards(target);
					'step 1'
					player.judge();
					'step 2'
					var suit=result.suit;
					player.chooseButton(['请选择重铸'+get.translation(target)+'的手牌',target.getCards('h')],[1,Infinity]).set('filterButton',function(button){
						if(_status.event.suit==get.suit(button.link))	return false;
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link))	return false;
						}
						return true;
					}).set('suit',suit).set('att',get.attitude(player,target)).set('ai',function(button){
						if(_status.event.att<=0)	return get.value(button.link)-4;
						return 4-get.value(button.link);
					});
					'step 3'
					if(result.bool){
						var cards = result.links;
						target.lose(cards, ui.discardPile).set('visible', true);
						target.$throw(cards,1000);
						game.log(target,'将',cards,'置入了弃牌堆');
						target.draw(cards.length);
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							if(target.countCards('h')>2){
								if(get.attitude(player,target)>0)	return 1;
								else	return -1;
							}
							return -0.1;
						}
					}
				},
			},
			//苏姐
			mishu:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					if(event.player==player)	return false;
					var cards =[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							cards.add(card);
						}
					});
					return cards.length&&_status.currentPhase.isIn();
				},
				content:function(){
					'step 0'
					var cards =[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							cards.add(card);
						}
					});
					event.discards = cards;
					var list = ['获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力','令其获得本回合进入弃牌堆的一种类型的牌，且若这些牌点数之积大于13，对其造成1点伤害','取消'];
					list.removeArray(player.storage.mishu);
					if(list.length){
						var next = player.chooseControl('dialogcontrol',list).set('ai',function(){
							var evt = _status.event.getParent();
							var controls = _status.event.controls.slice(0);
							if(evt.discards.length>=4&&controls.contains('获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力'))	return 0;
							return _status.event.att;
						}).set('check',(get.attitude(player,_status.currentPhase)>0)?0:1).set('prompt',get.prompt2('mishu')).set('addDialog',[cards]);
					}else	event.finish();
					'step 1'
					if(result.control&&result.control!='取消'){
						var prompt = result.control;
						event.target = _status.currentPhase;
						event.control = result.control;
						prompt.replace(/其/,get.translation(_status.currentPhase));
						var next = player.chooseCardButton(event.discards,prompt);
						if(event.control=='获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力'){
							next.set('filterButton',function(button){
								for(var i=0;i<ui.selected.buttons.length;i++){
									if(get.type2(ui.selected.buttons[i].link)==get.type2(button.link)) return false;
								}
								return true;
							});
							next.set('selectButton',function(){
								var types = [];
								for(var i of event.discards){
									types.add(get.type2(i))
								}
								return types.length;
							}());
						}
						else{
							next.set('filterButton',function(button){
								return true;
							});
							next.set('ai',function(button){
								var cards = [];
								var type = get.type2(button.link);
								var player = _status.event.player;
								var target = _status.event.target;
								cards.concat(_status.event.discards.filter(function(card){
									return type==get.type2(card);
								}))
								var eff = get.attitude(player,target)*get.value(cards,target,'raw');
								var num = 1;
								for(var i of cards){
									num*=get.number(i);
								}
								if(num>13)	eff+=get.damageEffect(target,player,player);
								return eff;
							});
							next.set('discards',event.discards);
							next.set('target',event.target);
						}
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.links&&result.links.length){
						player.storage.mishu.add(event.control);
						if(event.control=='获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力'){
							var num = 0; 
							var count = 0;
							var cards = result.links;
							for(var i of cards){
								num+=get.number(i);
							}
							for(var i=1;i<=num;i++){
								if(num%i==0){
									count++;
								}
							}
							player.gain(cards,'gain2','log');
							if(count<=2)	event.target.recover();
						}
						else{
							var num = 1;
							var cards = event.discards.filter(function(card){
								return get.type2(result.links[0])==get.type2(card);
							});
							for(var i of cards){
								num*=get.number(i);
							}
							event.target.gain(cards,'gain2','log');
							if(num>13)	event.target.damage();

						}
					}
				},
				group:'mishu_clear',
				subSkill:{
					clear:{
						trigger:{
							global:'roundStart'
						},
						firstDo:true,
						direct:true,
						filter:function(event,player){
							return player.storage.mishu.length;
						},
						content:function(){
							player.storage.mishu = [];
						}
					}
				}
			},
			xingchen:{
				trigger:{player:'damageAfter'},
				priority:2,
				filter:function(event,player){
					if(event.name=='damage'||(event.name=='useCard'&&get.type(event.card,'trick')=='trick')){
						return true;
					}
					else	return false;
				},
				content:function(){
					'step 0'
					player.draw(5);
					'step 1'
					player.chooseCard(5,'he','『未卜星辰』：选择放置到牌堆顶部的牌',true);
					'step 2'
					if(result.bool==true&&result.cards!=null){
						event.cards=result.cards
					}
					if(event.cards.length>0){
						player.chooseButton(true,event.cards.length,['『未卜星辰』：按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
							var player = _status.event.player;
							var now = _status.currentPhase;
							var next = now.getNext();
							var att = get.attitude(player,next);
							var card = button.link;
							var judge = next.getCards('j')[ui.selected.buttons.length];
							if(judge){
								return get.judge(judge)(card)*att;
							}
							return next.getUseValue(card)*att;
						});
					}
					'step 3'
					if(result.bool&&result.links&&result.links.length) event.linkcards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 4'
					var cards=event.linkcards;
					player.lose(cards,ui.special);
					game.delay();
					'step 5'
					var cards=event.linkcards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				ai:{
					maixie:true,
				}
			},
			//谢拉
			minghuahongxiao:{
				trigger:{player:['useCard','discardAfter']},
				filter:function(event,player){
					return (event.name=='useCard'&&player!=_status.currentPhase&&event.cards.length&&event.cards.length)
					||(event.name=='discard'&&player==_status.currentPhase&&event.cards.length);
				},
				check:function (event,player){
					if(event.name=='useCard'&&player.isPhaseUsing()&&player.countCards('h')&&get.type2(event.card)=='trick')	return false;
					return true;
				},
				content:function(){
					'step 0'
					event.list = [];
					for(var i of trigger.cards){
						event.list.add(get.type2(i));
					}
					'step 1'
					if(event.list.contains('basic'))	player.addSkill('minghuahongxiao_change');
					'step 2'
					if(event.list.contains('trick')){
						var evt=_status.event.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'){
							evt.skipped=true;
						}
						player.chooseTarget('令一名没有手牌的角色摸两张牌',function(card,player,target){
							return target.countCards('h')==0;
						});
					}else	event.goto(4);
					'step 3'
					if(result.bool&&result.targets&&result.targets[0]){
						result.targets[0].draw(2);
					}
					'step 4'
					if(event.list.contains('equip'))	player.recover();
				},
				subSkill:{
					change:{
						trigger:{global:'useCard2'},
						priority:23,
						popup:false,
						direct:true,
						filter:function(event,player){
							var card=event.card;
							var info=get.info(card);
							if(info.allowMultiple==false) return false;
							return event.targets&&event.targets.length;
						},
						content:function(){
							'step 0'
							if(['equip','delay'].contains(get.type(trigger.card))||!game.hasPlayer(function(cur){
								return !trigger.targets.contains(cur)&&lib.filter.targetEnabled2(trigger.card,player,cur);
							}))		event.goto(4);
							'step 1'
							var prompt2='为'+get.translation(trigger.card)+'增加一个目标';
							player.chooseTarget(get.prompt('minghuahongxiao_change'),function(card,player,target){
								var player = _status.event.player;
								var source = _status.event.source;
								if(_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card,source,target)&&lib.filter.targetInRange(_status.event.card,source,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var player=_status.event.player;
								var source = _status.event.source;
								return get.effect(target,_status.event.card,source,player)*(_status.event.targets.contains(target)?-1:1);
							}).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player);
							'step 2'
							if(!event.isMine()) game.delayx();
							event.targets=result.targets;
							'step 3'
							if(event.targets){
								player.logSkill('minghuahongxiao_change',event.targets);
								if(trigger.targets.contains(event.targets[0]))	trigger.targets.removeArray(event.targets);
								else trigger.targets.addArray(event.targets);
							}
							'step 4'
							player.removeSkill('minghuahongxiao_change');
						},
					}
				}
			},
			//永雏塔菲
			qianqi:{
				init:function(player,skill){
					player.storage[skill] = 0;
				},
				trigger:{global:'phaseBegin'},
				filter:function(event,player){
					return player.countCards('he')>player.storage.qianqi||1;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('qianqi',trigger.player),'he',player.storage.qianqi||1).set('logSkill',['qianqi',trigger.player]);
					'step 1'
					if(result.bool){
						event.target = trigger.player;
						game.delay();
						var list = lib.phaseName.slice(0);
						player.chooseButton(['『迁奇』：选择两个阶段调换位置（若不选则执行另一个效果）',[list,'vcard'],'hidden'],2).set('prompt',get.prompt('tiangou'));
					}
					else event.finish();
					'step 2'
					if(result.bool&&result.links){
						var steps = result.links.slice(0);
						var stepList = (trigger.stepList||lib.phaseName).slice(0);
						var index0 = stepList.indexOf(result.links[0][2]),index1 = stepList.indexOf(result.links[1][2]);
						[stepList[index0],stepList[index1]] = [stepList[index1],stepList[index0]];
						trigger.stepList = stepList;
					}
					else{
						event.target.storage.qianqi_change = player.storage.qianqi||1
						event.target.addTempSkill('qianqi_change');
					}
					player.storage.qianqi++;
					player.addTempSkill('qianqi_clear');
					player.markSkill('qianqi');
				},
				intro:{
					content:'『迁奇』发动次数：#',
				},
				subSkill:{
					change:{
						trigger:{player:'useCard2'},
						priority:23,
						forced:true,
						lastDo:true,
						mark:true,
						intro:{
							content:'本回合使用的前&张牌，目标锁定为1',
						},
						filter:function(event,player){
							if(player.countUsed(null,true)>player.storage.qianqi_change)	return false;
							var card=event.card;
							var info=get.info(card);
							if(info.allowMultiple==false) return false;
							return event.targets&&event.targets.length&&event.targets.length!=1;
						},
						content:function(){
							'step 0'
							player.chooseTarget('『迁奇』：将目标数锁定为1',function(card,player,target){
								if(_status.event.targets.contains(target)) return true;
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.card,player,player);
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(!event.isMine()) game.delayx();
							event.targets=result.targets;
							'step 2'
							if(event.targets){
								player.logSkill('qianqi_change',event.targets);
								trigger.targets = event.targets;
							}
						},
					},
					clear:{
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							return !game.countPlayer2(function(cur){
								return cur.getHistory('damage').length;
							});;
						},
						forced:true,
						content:function(){
							'step 0'
							player.storage.qianqi = 0;
							player.unmarkSkill('qianqi');
							game.log(player,'重置了『迁奇』计数');
							game.delay(0.5);
						},
					}
				}
			},
			chutan:{
				init:function(player,skill){
					player.storage[skill] = [];
				},
				enable:'phaseUse',
				filter:function(event,player){
					return game.countPlayer(function(cur){
						return cur!=player;
					})>=2;
				},
				filterCard:function(card,player){
					return true;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				selectTarget:2,
				position:'he',
				check:function(card){
					return 6-get.value(card);
				},
				usable:1,
				line:false,
				log:'notarget',
				content:function(){
					'step 0'
					if(!player.storage.chutan)	player.storage.chutan = [];
					player.storage.chutan.add(target);
					target.storage.chutan_next = player;
					player.addTempSkill('chutan_next',{player:'phaseBegin'});
				},
				ai:{
					order:10,
					result:{
						player:1,
					}
				},
				subSkill:{
					next:{
						mark:true,
						intro:{
							content:'『雏探』标记了两名角色'
						},
						onremove:function(player){
							player.storage.chutan.forEach(function(chu){
								if(chu.storage.chutan_next==player)		delete chu.storage.chutan_next;
							})
							delete player.storage.chutan;
						},
						trigger:{global:'phaseEnd'},
						priority:23,
						forced:true,
						filter:function(event,player){
							var chus = player.getStorage('chutan').slice(0);
							if(!chus.contains(event.player))	return false;
							chus.remove(event.player);
							return event.player.getHistory('useCard',function(evt){
								return evt.targets.contains(chus[0]);
							}).length>0;
						},
						logTarget:'player',
						content:function(){
							var cards = [];
							trigger.player.getHistory('useCard',function(evt){
								cards.addArray(evt.cards);
							})
							player.gain(cards,'gain2','log');
						},
					}
				}
			},
			//咩栗
			qinhuo:{
				trigger:{global:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					if(event.cards&&get.name(event.card)=='huogong'&&!event.player.getHistory('sourceDamage',function(evt){
						return event==evt.getParent('useCard');
					}).length)	return true;
				},
				content:function(){
					'step 0'
					player.chooseTarget(function(card,player,target){
						return target!=_status.event.source;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkillTag('nogain')) att/=10;
						if(target.hasJudge('lebu')) att/=2;
						return get.value(_status.event.cardx,target,'raw')*att;
					}).set('cardx',trigger.cards).set('source',trigger.player).set('createDialog',
					[get.prompt('qinhuo'),
					'small',get.skillInfoTranslation('qinhuo',player),'令一名角色获得这些牌',
					[trigger.cards,'card']]);
					'step 1'
					if(result.bool){
						var target = result.targets[0];
						player.logSkill('qinhuo',target);
						target.gain(trigger.cards,'gain2');
					}
				},
			},
			lvecao:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return player.hasUseTarget({name:'tiesuo'});
				},
				check:function (event,player){
					return true;
				},
				frequent:true,
				content:function(){
					player.chooseUseTarget({name:'tiesuo'},true).set('addedSkill',['lvecao']);
				},
				group:'lvecao_fadian',
				subSkill:{
					fadian:{
						trigger:{global:'linkEnd'},
						filter:function(event,player){
							var evt = event.getParent('useCard');
							if(evt.getParent('chooseUseTarget').addedSkill&&evt.getParent('chooseUseTarget').addedSkill.contains('lvecao')){
								return evt.card.name=='tiesuo'&&evt.player==player&&!event.player.isLinked()&&event.player.countGainableCards(player,'hej',function(card){
									if(get.position(card)!='e'&&get.position(card)!='j'&&!card.hasGaintag('ming_'))	return false;
									return true;
								});
							}
						},
						direct:true,
						content:function(){
							player.gainPlayerCard(trigger.player,'hej','获得其区域内一张可见牌').set('filterButton',function(button){
								if(get.position(button.link)!='e'&&get.position(button.link)!='j'&&!button.link.hasGaintag('ming_'))	return false;
								return true;
							}).set('logSkill','lvecao_fadian');
						},
						ai:{
							effect:{
								player:function(card,player,target,current){
									if(_status.event.name=='chooseUseTarget'&&_status.event.addedSkill.contains('lvecao')){
										if(card.name=='tiesuo'&&target&&target.isLinked()&&target.countCards('hej',function(card){
											if(get.position(card)!='e'&&get.position(card)!='j'&&!card.hasGaintag('ming_'))	return false;
											return true;
										})) return [1,2,1,-1];
									}
								}
							}
						},
					}
				}
			},
			yangxi:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>player.countCards('he',{type:['trick','delay']});
				},
				filterCard:function(card,player){
					if(get.type2(card)=='basic')	return false;
					if(get.type(card)=='delay')		return player.canAddJudge(card);
					if(player.canAddJudge('lebu')&&get.color(card)=='red')		return true
					if(player.canAddJudge('bingliang')&&get.color(card)=='black')	return true
					return false;
				},
				filterTarget:function(card,player,target){
					return true;
				},
				position:'he',
				discard:false,
				lose:false,
				check:function(card){
					var player = _status.event.player
					if(['shandian','fulei','haidi'].contains(get.name(card)))		return 9-get.value(card);
					if(get.color(card)=='red'&&!player.needsToDiscard())	return 6-get.value(card);
					if(get.color(card)=='black'&&player.countCards('he')>=3)	return 5-get.value(card);
					if(get.type(card)=='delay')		return 4-get.value(card);
					return 3-get.value(card);
				},
				content:function(){
					'step 0'
					player.$give(cards,player,false);
					if(get.type(cards[0])=='delay')		player.addJudge(cards[0]);
					else if(get.color(cards[0])=='red'&&player.canAddJudge('lebu'))		player.addJudge({name:'lebu'},cards);
					else if(get.color(cards[0])=='black'&&player.canAddJudge('bingliang'))	player.addJudge({name:'bingliang'},cards);
					'step 1'
					target.damage();
				},
				ai:{
					order:2,
					result:{
						player:function(player,target){
							if(player.countCards('h',function(card){
								if(['shandian','fulei','haidi'].contains(get.name(card)))	return true;
							})>0)		return 0;
							return -1.5;
						},
						target:function(player,target){
							if(target.hasSkill('shenyou'))	return 0;
							if(target.hp==1)	return get.damageEffect(target,player,target)-2;
							return get.damageEffect(target,player,target);
						}
					}
				}
			},
			//呜米
			naisi:{
				trigger:{global:'phaseEnd'},
				direct:true,
				init:function(player,skill){
					player.storage[skill] = 0;
				},
				filter:function(event,player){
					return player.storage.naisi;
				},
				direct:true,
				content:function(){
					'step 0'
					if(player.storage.naisi>1){
						player.chooseTarget(get.prompt2('naisi'),function(card,player,target){
							return true;
						}).set('ai',function(target){
							return get.damageEffect(target,_status.event.player,_status.event.player);
						});
					}
					'step 1'
					if(result.bool&&result.targets){
						var target = result.targets[0];
						player.logSkill('naisi',target);
						target.damage(player.storage.naisi);
					}
					'step 2'
					player.storage.naisi = 0;
				},
				group:'naisi_recover',
				subSkill:{
					recover:{
						trigger:{player:'recoverAfter'},
						direct:true,
						lastDo:true,
						forced:true,
						silent:true,
						content:function(){
							player.storage.naisi++;
						},
					}
				}
			},
			tuzai:{
				trigger:{source:'damageEnd'},
				filter:function(event,player){
					return event.player.countGainableCards(player,'hej',function(card){
						if(get.position(card)!='e'&&get.position(card)!='j'&&!card.hasGaintag('ming_'))	return false;
						return true;
					});
				},
				check:function(event,player){
					if(get.recoverEffect(event.player,player,player)>0) return true;
					var att=get.attitude(player,event.player);
					if(att>0&&event.player.countCards('j')) return true;
					var cards=event.player.getGainableCards(player,'he',function(card){
						if(get.position(card)!='e'&&!card.hasGaintag('ming_'))	return false;
						return true;
					});
					for(var i=0;i<cards.length;i++){
						if(get.equipValue(cards[i])>=6) return true;
					}
					return false;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.gainPlayerCard(trigger.player,'hej','获得其区域内一张可见牌',true).set('filterButton',function(button){
						if(get.position(button.link)!='e'&&get.position(button.link)!='j'&&!button.link.hasGaintag('ming_'))	return false;
						return true;
					});
					'step 1'
					trigger.player.recover();
				},
				effect:{
					player:function(cardx,player,target){
						if(get.attitude(player,target)>0&&target.countGainableCards(player,'hej',function(card){
							if(get.position(card)!='e'&&get.position(card)!='j'&&!card.hasGaintag('ming_'))	return false;
							return true;
						})){
							if(get.tag(cardx,'damage')==1){
								if(target.countGainableCards(player,'j'))	return [1,1,0,2];
								else	return [1,1,0,-0.5];
							}
						}
					}
				}
			},
			wuneng:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',function(card){
						return ['tao','taoyuan'].contains(card.name)&&!card.hasGaintag('ming_');
					});
				},
				filterCard:function(card,player){
					return ['tao','taoyuan'].contains(card.name)&&!card.hasGaintag('ming_');
				},
				position:'h',
				discard:false,
				lose:false,
				check:function(card){
					return true;
				},
				content:function(){
					'step 0'
					player.showCards(cards,'『呜能』亮出手牌');
					player.addGaintag(cards,'ming_wuneng');
					player.$give(cards,player,false);
					game.delayx();
					'step 1'
					player.draw();
				},
				ai:{
					order:10,
					result:{
						player:1,
					}
				}
			},
			//林大力
			xilv:{
				trigger:{global:'drawAfter'},
				filter:function(event,player){
					var name = lib.skill.yiqu.process(event);
					var info=lib.skill[name];
					if(!info||info.equipSkill||info.ruleSkill)	return false;
					if(event.player==player)	return false;
					return lib.translate[name+'_info']&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCard('h',get.prompt2('xilv')).set('ai',function(card){
						var target = _status.event.target;
						return get.attitude2(target)*get.value(card,target,'raw')+1;
					}).set('target',event.target);
					'step 1'
					if(result.bool){
						player.logSkill('xilv',event.target)
						event.target.gain(result.cards,player,'giveAuto');
					}else	event.finish();
					'step 2'
					var name = lib.skill.yiqu.process(trigger);
					event.list = ['将摸到的牌交给'+get.translation(player),'令'+get.translation(player)+'获得<div class="skill">'+get.translation(name)+'</div>'];
					if(!player.hasSkill(name)){
						event.target.chooseControl('dialogcontrol',event.list,function(){
							return _status.event.att;
						}).set('att',get.attitude(event.target,player)>0?1:0).set('prompt','『习律』请选择一项').set('addDialog',[trigger.result]);
					}
					else{
						event._result={control:event.list[0]};
					}
					'step 3'
					var name = lib.skill.yiqu.process(trigger);
					switch(result.control){
						case event.list[0]:{
							player.gain(trigger.result,event.target,'giveAuto');
							break;
						}
						case event.list[1]:{
							player.addAdditionalSkill('xilv',name,true);
							break;
						}
					}
				},
				group:'xilv_phaseEnd',
				subSkill:{
					phaseEnd:{
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.additionalSkills['xilv'];
						},
						content:function(){
							player.removeAdditionalSkill('xilv');
						}
					}
				}
			},
			bana:{
				trigger:{global:'changeHp'},
				filter:function(event,player){
					return event.player.countCards('he')<=event.player.hp&&event.player.hp<=game.countPlayer();
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:'player',
				content:function(){
					trigger.player.draw();
				},
				ai:{
					expose:0.1,
				}
			},
			//Kira
			weiguang:{
				intro:{
					content:'『微光』：$',
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=null;
				},
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.countCards('hs');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToUse({
						prompt:get.prompt2('weiguang'),
						addCount:false,
					});
					'step 1'
					if(result.card&&get.type(result.card)){
						if(!player.storage.weiguang)	player.storage.weiguang = get.type(result.card);
						if(player.storage.weiguang===get.type(result.card)){
							player.markSkill('weiguang');
							player.draw();
						}
						else{
							player.storage.weiguang = true;
						}
					}
				},
			},
			liangqin:{
				trigger:{player:'dyingAfter'},
				unique:true,
				limited:true,
				priority:100,
				check:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					player.storage.liangqin = true;
					player.awakenSkill('liangqin');
					'step 1'
					player.addSkill('liangqin_phaseBefore')
				},
				subSkill:{
					phaseBefore:{
						mark:true,
						intro:{
							content:'在下个回合内摸牌量上升',
						},
						trigger:{
							player:'phaseBefore'
						},
						forced:true,
						firstDo:true,
						content:function(){
							'step 0'
							player.storage.liangqin_drawPlus = 1;
							player.addTempSkill('liangqin_drawPlus');
							'step 1'
							player.removeSkill('liangqin_phaseBefore');
						},
					},
					drawPlus:{
						trigger:{
							player:'drawBegin'
						},
						forced:true,
						firstDo:true,
						onremove:true,
						content:function(){
							trigger.num+=player.storage.liangqin_drawPlus;
							player.storage.liangqin_drawPlus++;
						},
						mark:true,
						intro:{
							content:'摸牌量+#',
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(get.tag(card,'draw')) return [1,player.storage.liangqin_drawPlus||1];
								}
							}
						}
					}
				}
			},
			//李清歌
			tage:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				trigger:{global:'useCardAfter'},
				firstDo:true,
				direct:true,
				filter:function(event,player){
					var num = get.number(event.card);
					return typeof num=="number"&&player.countCards('hes',function(card){
						return [1,-1].contains(get.number(card)-num);
					});
				},
				content:function(){
					'step 0'
					event.cards0 = trigger.cards.slice(0);
					var num = get.number(trigger.card);
					player.chooseToRespond('是否打出一张牌替代'+get.translation(event.cards0),'hes',function(card){
						var num = _status.event.num;
						return [1,-1].contains(get.number(card)-num);
					}).set('num',num);
					'step 1'
					if(result.bool&&result.cards){
						if(!player.storage.tage)	player.storage.tage = 1;
						else	player.storage.tage++;
						player.markSkill('tage');
						event.cards = result.cards.slice(0);
						trigger.cards = event.cards;
						player.gain(event.cards0,'gain2','log');
					}
				},
				intro:{
					content:'『踏歌』发动次数：#',
				},
				group:'tage_drawBy',
				subSkill:{
					drawBy:{
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							return player.storage.tage>0;
						},
						prompt2:function(event,player){
							return '摸'+get.cnNumber(player.storage.tage)+'张牌，并交给'+get.translation(event.player)+'至少一张牌';
						},
						content:function(){
							'step 0'
							player.draw(player.storage.tage);
							'step 1'
							player.storage.tage = 0;
							player.unmarkSkill('tage');
							if(player.countCards('h')&&trigger.player){
								event.target = trigger.player;
								player.chooseCard('h',[1,Infinity],true).set('ai',function(card){
									var player = _status.event.player;
									var target = _status.event.target;
									if(get.attitude(player,target)>0)	return get.value(card,target)-get.value(card,player);
									return get.value(card,player)-get.value(card,target);
								}).set('target',event.target)
							}
							else	event.finish();
							'step 2'
							if(result.bool&&result.cards){
								player.line(event.target);
								player.give(result.cards,event.target,true);
							}
						}
					}
				}
			},
		},
		card:{
			niwei_sha:{
				content:function(){
					event.target.recover(player);
					game.delay(0.5);
				},
			},
			niwei_shan:{
				content:function(){
					delete event.result;
					event.player.draw(2);
					game.delay(0.5);
				},
			},
			niwei_tao:{
				content:function(){
					event.target.loseHp();
					game.delay(0.5);
				},
			},
			niwei_jiu:{
				content:function(){
					event.target.chooseToUse().set('targetRequired',true);
					game.delay(0.5);
				},
			},
		},
		dynamicTranslate:{
			tiantang:function(player){
				if(player.storage.haoren===true) return '<font color=#fcd>一名角色的回合开始时，你可以重铸X张牌并声明一种花色：观看并重铸其一张声明花色的牌，令其执行一个额外的出牌阶段，且在此出牌阶段内，其获得“引流”；或令其摸两张牌，只能使用声明花色的牌直到回合结束。</font>（X为你对目标发动此技能的次数且至少为1）';
				return '一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）';
			},
			gunxun:function(player){
				if(player.storage.gunxun===true) return '转换技 出牌阶段，你可以亮出至少一张<span class="firetext">①红色</span>②黑色手牌使之视为<span class="firetext">①【杀】</span>②【闪】，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。';
				return '转换技 出牌阶段，你可以亮出至少一张①红色<span class="browntext">②黑色</span>手牌使之视为①【杀】<span class="browntext">②【闪】</span>，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。';
			},
			fengqing:function(player){
				var str = '转换技 当你的武将牌状态发生变化时，你可以选择一名角色，其在其下个准备阶段①视为使用了【酒】②视为使用了【桃】③跳过本回合的判定和弃牌阶段。';
				switch(player.storage.fengqing){
					case 1: return str.replace(/①视为使用了【酒】/g,'<span class="changetext">①视为使用了【酒】</span>');
					case 2: return str.replace(/②视为使用了【桃】/g,'<span class="changetext">②视为使用了【桃】</span>');
					case 3: return str.replace(/③跳过本回合的判定和弃牌阶段/g,'<span class="changetext">③跳过本回合的判定和弃牌阶段</span>');
				}
				return str;
			},
			erni:function(player){
				var str = '转换技 你可以展示一张手牌并置于牌堆顶，视为使用或打出了一张同花色的①【杀】②【闪】③【桃】；当你发动其他技能后，可以转换一次『耳匿』。';
				switch(player.storage.erni){
					case 1: return str.replace(/①【杀】/g,'<span class="changetext">①【杀】</span>');
					case 2: return str.replace(/②【闪】/g,'<span class="changetext">②【闪】</span>');
					case 3: return str.replace(/③【桃】/g,'<span class="changetext">③【桃】</span>');
				}
				return str;
			},
			luqiu:function(player){
				var str = '转换技 当一张牌进入弃牌堆时，若其花色与你本回合上一次『祭刃』的判定牌相同，你可以①视为使用一张【杀】②摸一张牌③弃一张牌。';
				switch(player.storage.luqiu){
					case 1: return str.replace(/①视为使用一张【杀】/g,'<span class="changetext">①视为使用一张【杀】</span>');
					case 2: return str.replace(/②摸一张牌/g,'<span class="changetext">②摸一张牌</span>');
					case 3: return str.replace(/③弃一张牌/g,'<span class="changetext">③弃一张牌</span>');
				}
				return str;
			},
			qianjiwanbian:function(player){
				var str = '你可将你造成的伤害改为（雷电）属性。一个回合开始时或你于一个独立的事件中首次造成伤害时，可修改（）内属性并发现一个有字与此技能某字拼音相同的技能，在本轮内获得之。若选择“千机万变”，其效果改为你此后触发此技能时额外发现一次。';
				if(player.storage.qianjiwanbian_change){
					return str.replace(/雷电/g,'<span class="changetext">'+get.rawName(player.storage.qianjiwanbian_change)+'</span>');
				}
				return str;
			},
			shangsheng:function(player){
				var str = '回合开始时，你于本回合获得一项效果：A.于摸牌阶段多摸1张牌；B.于出牌阶段多出1张【杀】；C.于弃牌阶段手牌上限增加1。然后若本次选择与前两次均不同，此技能所有数字增加；否则减少（至少为初始值）。';
				var num = player.storage.shangsheng_Buff||1;
				if(num){
					return str.replace(/1/g,'<span class="changetext">'+num+'</span>');
				}
				return str;
			},
			lianyin:function(player){
				var str = '每回合限X次，其他角色在你的回合内使用牌时，你可以与其各摸一张牌。（X为你的体力上限）';
				if(player.awakenedSkills.contains('guixiang')){
					return str.replace(/使用/g,'<span class="changetext">使用或打出</span>');
				}
				return str;
			},
			xuanying:function(player){
				var str = '每回合限X次，其他角色在你的回合内使用牌时，你可以交给其一张牌，然后令你或其摸一张牌，若你交出了装备牌，则改为摸X张。（X为你装备区的牌数且至少为1）';
				if(player.awakenedSkills.contains('houfan')){
					return str.replace(/使用/g,'<span class="changetext">使用或打出</span>');
				}
				return str;
			},
			shixi:function(player){
				var str = '锁定技 游戏开始时，记录你的初始手牌。当（你）的牌进入弃牌堆时，若有未选定的记录牌花色与之相同，你可以选定该记录牌。一个阶段结束时，每有两个选定你便摸一张牌，然后重置选定。';
				if(player.storage.yuezhi){
					return str.replace(/（你）/g,'<span class="changetext">（你或一名<皇珈骑士>）</span>');
				}
				return str;
			},
			banmao:function(player){
				if(player.storage.banmao) return '【已修改】 锁定技 你造成或受到来自【杀】的伤害时，来源摸一张牌。';
				return '锁定技 若你未受伤，你不能使用【闪】或【酒】。你造成或受到来自【杀】的伤害时，来源摸一张牌。';
			},

			daoyi:function(player){
				var str = '转换技 你可以修改场上一次判定结果的①颜色②点数③花色④牌名。此技能转换至①时，你可以对当前回合角色造成1点雷电伤害。';
				switch(player.storage.daoyi){
					case 0: return str.replace(/①颜色/g,'<span class="changetext">①颜色</span>');
					case 1: return str.replace(/②点数/g,'<span class="changetext">②点数</span>');
					case 2: return str.replace(/③花色/g,'<span class="changetext">③花色</span>');
					case 3: return str.replace(/④牌名/g,'<span class="changetext">④牌名</span>');
				}
				return str;
			},
			xiangnuo:function(player){
				var str = '转换技 当牌①进入②离开你的装备区时，你可以令一名角色摸两张牌，若其体力为全场最低，额外回复一点体力。出牌阶段限一次，你可以重铸点数之和为Q(12)的手牌并转换一次『香诺』。';
				switch(player.storage.xiangnuo){
					case 1: return str.replace(/①进入/g,'<span class="changetext">①进入</span>');
					case 2: return str.replace(/②离开/g,'<span class="changetext">②离开</span>');
				}
				return str;
			},
			qingsui:function(player){
				var str = '转换技 你视为拥有①『集爱』②『盛阴』③『全域』。当此技能于你回合外转换至①时，你可以获得当前回合角色的一张牌。';
				switch(player.storage.xiangnuo){
					case 0: return str.replace(/①『集爱』/g,'<span class="changetext">①『集爱』</span>');
					case 1: return str.replace(/②『盛阴』/g,'<span class="changetext">②『盛阴』</span>');
					case 2: return str.replace(/③『全域』/g,'<span class="changetext">③『全域』</span>');
				}
				return str;
			},
			tuncai:function(player){
				if(player.storage.tuncai===true) return '轮次技 转换技 <span class="changetext">阳：其他角色摸牌后，你可以摸等量牌；</span>阴：你弃牌后，可以令一名其他角色弃等量牌。';
				return '轮次技 转换技 阳：其他角色摸牌后，你可以摸等量牌；<span class="changetext">阴：你弃牌后，可以令一名其他角色弃等量牌。</span>';
			},
		},
		translate:{
			TEST: '测试员',
			Ruki: '琉绮Ruki',
			Ruki_ab: '琉绮',
			beixie: '备械',
			beixie_info: lib.discoloration1+'游戏开始时，你可以指定获得牌堆中的一张牌，且若其为武器牌，你立即装备之。',
			hunzhan: '混战',
			hunzhan_info: '锁定技 一名角色受到伤害时，其可立即使用一张牌，若其如此做，你摸一张牌。',

			YukiTuan: '雪团yuki',
			YukiTuan_ab: '雪团',
			chentu: '衬兔',
			chentu_info: '出牌阶段限一次，你可以弃置任意张牌，然后若你的手牌数为全场最低，你于下个回合开始时摸此次弃牌数两倍的牌。',
			chentu_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：制衡</span>',
			sishu: '饲鼠',
			sishu_info: '锁定技 回合内，你需要使用基本牌时，能且仅能将一组花色的牌交给一名其他角色视为使用之。',
			sishu_append:'<span style="font-family: LuoLiTi2;color: #dbb">一组花色的牌：即四张花色各不相同的牌；特性：自肃（不能以其他方式使用基本牌）</span>',

			Nyanners: 'Nyanners',
			Nyanners_ab: '喵喵人',
			shenghuo: '圣火',
			shenghuo_info: '出牌阶段限X次，你可以观看牌堆顶与底各X张牌，然后将其中的任意张置于牌堆另一端。（X为你上一次受到伤害的伤害值+1）',
			shenghuo_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：控顶</span>',
			dipo: '底破',
			dipo_info: '锁定技 若你已受伤，你摸牌时从牌堆底摸取且摸牌量+1。',
			miaoche: '喵车',
			miaoche_info: '主公技 英V于弃牌阶段弃置牌后，你可以获得其中一张弃牌。',

			Ironmouse: 'Ironmouse',
			Ironmouse_ab: '铁耗子',
			haosun: '耗损',
			haosun_info: '回合开始时，你可以选择一项：<br>回复1点体力以重置此技能并修改『伴猫』，然后你本回合摸牌量-1；声明一种你可以使用的基本牌并令你不能使用之，然后你本回合摸牌量+1。',
			banmao: '伴猫',
			banmao_info: '锁定技 若你未受伤，你不能使用【闪】或【酒】。你造成或受到来自【杀】的伤害时，来源摸一张牌。',
			banmao_rewrite:'伴猫·改',
			banmao_rewrite_info:'锁定技 你造成或受到来自【杀】的伤害时，来源摸一张牌。',	

			Froot: 'Froot',
			Froot_ab: '巫妖',
			exiao: '恶哮',
			exiao_info: '你使用通常锦囊牌时，可以进行一次判定，若结果为黑色，其不能被【无懈可击】抵消且你获得判定牌。',
			jinmei: '禁魅',
			jinmei_info: '轮次技 其他角色的回合开始时，你可以交给其一张黑色牌，然后其本回合摸牌量-1。',
			
			Veibae: 'Veibae',
			Veibae_ab: '白恶魔',
			zhexun: '哲循',
			zhexun0: '哲循',
			zhexun_info: '你使用的一张牌若与你本回合已使用的所有牌颜色相同，其不可被响应且可以额外指定一个目标。',
			yuci: '欲词',
			yuci_info: '锁定技 若场上的其他角色均为同一性别，你每个阶段首次摸牌量+1。',
			
			Melody: 'Melody',
			Melody_ab: 'メロディ',
			kuangbiao: '狂飙',
			kuangbiao_info: '锁定技 你的♥手牌视为【无中生有】。你使用的♥手牌结算后，你失去不为1的一点体力并将此牌置于武将牌上。你已受伤时，可以将『狂飙』牌如手牌般使用或打出。',
			leizhu: '磊诛',
			leizhu_info: '你每使用三张锦囊牌，可以为此牌增加一个目标，然后其与你各受到一点伤害。',
			tonggan: '同甘',
			tonggan_info: '主公技 转换技 与你势力相同的角色，在奇数/偶数轮次内，每阶段首次摸牌量-1/+1。',

			HosimiyaSio: '星宫汐',
			yuanyao: '鸢揺',
			yuanyao_info: '出牌阶段限X次，若你的手牌数不多于体力上限，你可以交换体力值与手牌数。（X为场上存在的女性角色数）',
			yuanyao_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：制衡</span>',
			gongni: '宫逆',
			gongni_info: '<font color=#a9f>限定技</font> 准备阶段开始时，或你于回合外使用或打出一张牌后，若所有角色均已受伤，你可以令所有角色依次交换体力值与已损失体力值。',

			ShikaiYue: '紫海由爱',
			lianyin: '联音',
			lianyin_info: '每回合限X次，其他角色在你的回合内使用牌时，你可以与其各摸一张牌。（X为你的体力上限）',
			guixiang: '归乡',
			guixiang_info: '<font color=#caf>觉醒技</font> 准备阶段，若你发动『联音』的次数不少于存活角色数，你增加一点体力上限并回复一点体力，将『联音』的“使用”改为“使用或打出”。',

			KurokiriAria: '黑桐亚里亚',
			xuanying: '玄荫',
			xuanying_info: '每回合限X次，其他角色在你的回合内使用牌时，你可以交给其一张牌，然后令你或其摸一张牌，若你交出了装备牌，则额外摸X张。（X为你装备区的牌数且至少为1）',
			houfan: '候返',
			houfan_info: '<font color=#b56>限定技</font> 出牌阶段，若你手牌数为全场最少，你可以减1点体力上限，从弃牌堆随机获得四张装备牌，并将『玄荫』的“使用”改为“使用或打出”。',

			Muri: '无理Muri',
			Muri_ab: '无理',
			lique: '理却',
			lique_info: '锁定技 你成为非装备牌的目标时，失去一点体力并摸一张牌。',
			zhangdeng: '掌灯',
			zhangdeng_info: '锁定技 你进入濒死状态时，回复一点体力。',

			Aza: '阿萨Aza',
			Aza_ab: '阿萨',
			qiding: '契定',
			qiding_info: '出牌阶段限一次，你可以令攻击范围内的一名角色观看你的手牌并选择一项：<br>受到1点伤害；令你观看并获得其一张牌且防止你对其的伤害直到本回合结束。',
			chouxin: '酬心',
			chouxin_info: '锁定技 当♥牌正面朝上离开你的手牌时，若你：未受伤~失去1点体力；已受伤~回复一点体力。你已发动过此技能的回合内，你跳过弃牌阶段。',

			Miki: '弥希Miki',
			Miki_ab: '弥希',
			xingxu: '星许',
			xingxu_shiyue: '星许',
			xingxu_info: '轮次技 其他角色的准备阶段，你可以交给其两张牌。本回合结束时，若其：使用了其中一张～你视为使用另一张；对你造成了伤害～你回复一点体力。',
			qingsui: '清随',
			qingsui_jiai: '集爱(清)',
			qingsui_shengyin: '盛阴(清)',
			qingsui_quanyu: '全域(清)',
			qingsui_info: '转换技 你视为拥有①『集爱』②『盛阴』③『全域』。<br>当此技能于你回合外转换至①时，你可以获得当前回合角色的一张牌。',

			Mayumi: '勾檀Mayumi',
			Mayumi_ab: '勾檀',
			jinzhou: '晋胄',
			jinzhou_info: '锁定技 当你失去装备区的防具牌时，你摸（1）张牌，然后令所有（）值+1。',
			gouhun: '勾魂',
			gouhun_info: '出牌阶段限一次，你可以亮出牌堆顶（3）张牌，并选择一项：获得其中一种类型的牌；令所有（）值+1。<br>你以此技能获得的基本牌不计入次数，锦囊牌不计入手牌上限。',
			gouhun_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：成长</span>',

			xiaoke: '小可学妹',
			xiaoke_ab: '小可',
			mian: '面',
			dianying: '店营',
			dianying2: '店营',
			dianying_info: '锁定技 其他角色在出牌阶段限一次，其可以将一至二张手牌扣置于你的武将牌旁，称为“面”，然后其可以将两张“面”明置以回复1点体力。<br>你受到伤害后，来源可以获得任意张明置的“面”。',
			ganfen: '擀奋',
			ganfen_info: '你可以跳过一个主要阶段并受到1点伤害，将牌堆顶三张牌扣置为“面”。你使用手牌时，可以将一张“面”明置或暗置。',

			Azusa: '阿梓',
			juehuo: '绝活',
			zhiyue: '指月',
			zhiyue_info: '游戏开始时，你将牌堆顶牌扣置于武将牌旁，称为“绝活”。<br>当你使用与暗置“绝活”类型相同的牌时，可以将其中一张明置，然后若所有“绝活”均明置，你扣置牌堆顶牌于武将牌旁；<br>当你使用与明置“绝活”花色相同的牌时，可以将其中任意张暗置并摸等量的牌。',
			zhiyue_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：成长</span>',
			zhengniu: '蒸牛',
			zhengniu_info: '其他角色令你重置、回复体力或摸牌时，你可以令其获得任意的“绝活”。',
			
			shanbao: '扇宝',
			fengxu: '风许',
			fengxu_info: '你使用牌指定唯一目标时，可以将其区域内的一张牌移至其下家（可替换），若未发生替换，则对其下家重复此流程，直到发生替换或重复了五次。<br>若你的牌因此发生了替换，此技能结算后你摸重复次数的牌，然后不能发动此技能直到你下一次弃置手牌。',

			qiudi: '秋蒂Q',
			xiangnuo: '香诺',
			xiangnuo2: '香诺-转换',
			xiangnuo_info: '转换技 当牌①进入②离开你的装备区时，你可以令一名角色摸两张牌，若其体力为全场最低，额外回复一点体力。出牌阶段限一次，你可以重铸点数之和为Q(12)的手牌并转换一次『香诺』。',

			xiaoxiayu: 'Siva小虾鱼',
			xiaoxiayu_ab: '小虾鱼',
			tanghuang: '堂皇',
			tanghuang_info: '每回合限一次。当你成为其他角色使用牌的目标时，你可以摸X张牌并令其弃置你和其共计X+3张牌，然后弃置牌数：较少者～受到一点伤害；较多者～摸弃牌差的牌。（X为你已损失的体力值且至少为1）',
			xiejiang: '蟹酱',
			xiejiang_info: '锁定技 你摸两张以上的牌后，获得1点护甲；你失去护甲后，当前回合角色摸两张牌。',

			tianxixi: '田汐汐',
			lache: '拉扯',
			lache_info: '你回复体力时，可以令当前回合角色摸两张牌；你弃置两张以上的牌或护甲减少后，可以回复一点体力，若发生在回合外，你摸等量牌。',
			danfu: '蛋孵',
			danfu_info: '锁定技 结束阶段，若你本回合未造成伤害，你失去一点体力并获得1点护甲；你失去1点护甲后，当前回合角色摸一张牌。',

			iiivan: '伊万',
			shuipo: '水魄',
			shuipo_info: '锁定技 你弃置三张以上的牌或失去最后1点护甲后，回复一点体力并摸一张牌；你每阶段首次使用锦囊牌时，失去一点体力并弃置任意张牌。',
			ming_pianchao: '片超',
			pianchao: '片超',
			pianchao_phaseUseBy: '片超',
			pianchao_info: '你体力流失后，可以亮出两张手牌并获得1点护甲；当你弃置亮出的手牌时，可以使用其中一张，并于此额定阶段结束后进行一个额外的出牌阶段。',

			lanruo: '兰若Ruo',
			dieyuan: '蝶缘',
			dieyuan_info: '其他角色回复1点体力后，你可以令其摸X张牌，令其选择一项：<br>令你回复一点体力；交给你X张牌。（X为你与其的体力差且至少为1）',
			shengyang: '盛阳',
			shengyang_info: '出牌阶段限一次，你可以交给一名其他角色一张牌并进行一次判定，若结果的点数：<br>不大于2X~你获得其至多2X张牌；大于2X~其回复一点体力。',

			lanre: '兰若Re',
			daoyi: '道易',
			daoyi_info: '转换技 你可以修改场上一次判定结果的①颜色②点数③花色④牌名。此技能转换至①时，你可以对当前回合角色造成1点雷电伤害。',
			shengyin: '盛阴',
			shengyin_info: '出牌阶段限一次，你可以展示其他角色的一张手牌并令其进行一次判定，若结果与展示牌：类型相同～你获得展示牌；颜色相同～你与其各摸一张牌。',

			caicai: '菜菜姐',
			tibing: '体并',
			tibing_info: '锁定技 你跳过不为出牌阶段的阶段。你于出牌阶段开始时，摸两张牌并获得自己场上的所有牌；于出牌阶段结束时，展示并弃置手牌中的非基本牌。',
			guangtui: '广推',
			guangtui_info: '若你已受伤，你可以扣减一点体力上限，将其他角色的弃牌阶段改为自己的出牌阶段。',

			mibai: '米白zzz',
			mibai_ab: '米白',
			zhepie: '折撇',
			zhepie_info: '准备阶段，你可以亮出牌堆顶牌并令一名角色获得之，其无法使用同类型的牌直到其回合结束。',
			chumo: '除魔',
			chumo_info: '轮次技。你区域内的牌进入弃牌堆时，你可以令一名角色获得之，若此牌无法被立即使用，你摸两张牌。',

			Ahab: '亚哈',
			ahbingyi: '秉义',
			ahbingyi_info: '其他角色摸牌时，若其手牌为全场最高，你可以失去一点体力，取消之并弃置其一张牌。',
			sujian: '肃监',
			sujian_info: '你受到来自一张牌的伤害/发动『秉义』时，可以将此牌/一张手牌置于武将牌上，称为“肃”。<br>与“肃”同名称或花色的牌在被使用时，你可以将一张对应的“肃”置于牌堆顶，取消此牌任意名目标。',

			FushimiGaku: '伏见学',
			exi: '恶戏',
			exi_info: '出牌阶段限一次，你可与一名有手牌的角色猜拳：赢家摸两张牌，输家视为对赢家使用了一张【杀】。若以剪刀输，则将使用【杀】改为使用【决斗】。',
			suisui: '祟崇',
			suisui_info: '锁定技 当你的体力值不为1/为1时，防止你每回合首次受到的无/有来源伤害。',

			Xiaorou: '小柔',
			rouqing: '柔情',
			rouqing_info: '每回合限一次。一名角色体力减少1点后，你可以令其观看牌堆顶的四张牌并获得其中至多（1）张牌，将其余的牌以任意顺序置于牌堆顶。',
			rouqing_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：卖血</span>',
			guangying: '光萦',
			guangying_info: '锁定技 当你不因使用而失去手牌后，你下一次发动『柔情』时（）值+1，若大于4，你回复一点体力。',

			ByakuyaMayoi: '白夜真宵',
			bykuangxin: '狂信',
			bykuangxin_info: '出牌阶段限一次，你可以进行判定直到出现两次点数为A～10的结果，然后你获得其他判定牌，并根据判定顺序组合（第一次为个位、第二次为十位）执行：<span class="greentext">01～05</span>--摸两张牌增加一点体力上限；<span class="changetext">06～40</span>--回复一点体力；<span class="bluetext">41～70</span>--视为使用一张【决斗】；<span class="browntext">71～95</span>--失去一点体力并弃置手牌至上限；<span class="legendtext">96～100</span>--依次获得其他角色随机一张手牌并扣减一点体力上限。',

			Mamoru: '高原守',
			shoumi: '密守',
			shoumi_info: '锁定技 当且仅当你的体力变为0时，你进入濒死状态。你的体力小于/大于0时，视为拥有『英姿』/『鬼才』。',
			shoumi_yingzi: '英姿(密)',
			shoumi_yingzi_info: '锁定技 摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限为你的体力上限。',
			shoumi_guicai:'鬼才(密)',
			shoumi_guicai_info:'在任意角色的判定牌生效前，你可以打出一张牌代替之',
			yanwang: '妄诳',
			yanwang_info: '其他角色使用牌指定你为目标时，其可以令你回复一点体力，然后展示并获得你的一张牌；若其因此获得了黑色牌，你可以令其视为对你指定的一名角色使用一张【决斗】。',

			Niuniuzi: '牛牛子',
			qiying: '奇嘤',
			qiying_info: '你于其他角色的回合受到伤害后，你可以翻面并视为使用一张【南蛮入侵】。',
			hengxuan: '恒宣',
			hengxuan_info: '结束阶段，你可以摸两张牌；当你被其他角色指定为牌的唯一目标时，立即弃置以此法摸到的牌。',

			Zaodaoji: '早稻叽',
			guangan: '珖黯',
			guangan_info: '你的上家对你使用牌，或你对你的下家使用牌时，你可以摸一张牌。每轮限X次（X为场上存活的其他角色数）。',
			guangan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手</span>',
			lanxuan: '澜绚',
			lanxuan_info: '每回合每项限一次，你造成或受到伤害后，可以立即无视距离与次数限制使用一张牌。',
			zonghe: '纵合',
			zonghe_info: '<font color=#fbd>主公技</font> 游戏开始时，你可以指定一名社势力角色，你对其发动『珖黯』时无视座次限制。',

			Hiiro: '希萝',
			jiace: '铗策',
			jiace_info: '你成为黑色牌的目标时，可以将一张与之同花色的手牌交给来源，为此牌增加或减少一个目标。若为你本回合首次发动『铗策』，你于此牌结算后获得之。',
			xiangying: '襄英',
			xiangying_info: '出牌阶段限一次，你可将任意红色牌交给一名手牌数小于你的角色，然后若其手牌数大于你，其展示手牌，你摸其中红黑色牌数差的牌。',
			xiangying_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',

			Moemi: '萌实',
			chengzhang: '澄涨',
			chengzhang_info: '你装备区内的一张牌进入弃牌堆时，你可以令一名其他角色使用之。',
			mengdong: '萌动',
			mengdong_info: '你使用牌指定本回合未指定过的角色为目标时，若其装备区牌数为奇数，你可以摸一张牌。',
			
			NatsumiMoe: '夏实萌惠',
			moemanyi: '满溢',
			moemanyi_info: '锁定技 你的攻击范围为全场最高/最低时，不能成为延时锦囊牌/黑色【杀】的目标。',
			cuchuan: '粗串',
			cuchuan_info: '摸牌阶段，你可以放弃摸牌，改为令距离为1的角色各摸一张牌，然后你获得这些角色各一张牌。',
			
			Harusaruhi: '春猿火',
			huoju: '火居',
			huoju_info: '锁定技 你和相邻角色造成的伤害改为火焰伤害。你造成或受到火焰伤害后，若伤害来源手牌/体力全场最少，其翻面并摸一张牌/回复一点体力。',
			zouyang: '奏扬',
			zouyang_info: '你使用非装备牌仅指定一名角色为目标时，可使其相邻角色也成为此牌目标，其中不能成为合法目标的摸一张牌，若均摸牌或均成为目标，你不能再发动此技能直到回合结束。',
			
			Koko: '幸祜',
			xiezhen: '谐振',
			xiezhen_info: '距离你为1的角色造成伤害时，你可以翻面并☆弃置其一张牌，若为装备牌，此伤害+1且你可以重复☆。',
			wenzhou: '吻昼',
			wenzhou_info: '锁定技 你受到大于1点的伤害后，令来源翻面；一名角色翻至正面时，令其摸一张牌。',
			
			NecoraNyaru: '猫雷NyaRu',
			NecoraNyaru_ab: '猫雷',
			miaolu: '露佐',
			miaolu_info: '一名角色进入濒死状态时，你可以弃置其一张手牌，若为基本牌，你获得之；若不为，其回复一点体力。',
			benglei: '绷雷',
			benglei_info: '你受到 1 点伤害后，可以令一名角色进行一次判定，若结果为：♠～对其造成与本次伤害等量的雷电伤害；♣～依次弃置其两张牌；红色～对其发动一次『露佐』。',
			
			Shiratama: '白玉',
			meihua: '莓华',
			meihua_info: '轮次技 当♣牌不因弃置进入弃牌堆时，你可以获得之。',
			shentian: '审甜',
			shentian_info: '出牌阶段限一次，你可以观看一名角色的手牌并进行一次判定，然后重铸其中与判定牌花色不同的牌，每种花色至多一张。',
			
			KotobukiYume: '琴吹梦',
			xuanquan: '选权',
			xuanquan_info: '出牌阶段限一次，你可废除一个装备栏，获得一名角色的一张牌，然后其获得『选权』。有角色废除有牌的装备栏的回合结束时，你摸一张牌。',
			rusu: '入俗',
			rusu_info: '你判定/装备区的牌减少时，你可以将一张锦囊/装备牌置于场上同区域。',
			
			HIMEHINA: '田中姬&铃木雏',
			HIMEHINA_ab: '姬&雏',
			jichu: '姬雏轮舞',
			jichu_info: '若本回合被使用的上一张牌为锦囊牌，你使用牌可以额外选择一个目标。若本回合被使用的上一张牌为♦️，你使用牌生效并结算后摸一张牌。',
			mingshizhige: '命逝之歌',
			mingshizhige_info: '当你受到 1 点伤害后，你可以重铸所有手牌，然后使用因此失去的其中一张。',

			SephiraSu: '塞菲拉·苏',
			mishu: '数之秘术',
			mishu_info: '其他角色的回合结束时，你可以选择一项：<br>获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力；或令其获得本回合进入弃牌堆的一种类型的牌，且若这些牌点数之积大于13，对其造成1点伤害。每轮每项限一次。',
			xingchen: '未卜星辰',
			xingchen_info: '当你受到伤害后，可摸五张牌，然后将五张牌以任意顺序置于牌堆顶。',
			
			CierraRunis: '谢拉·露妮丝',
			CierraRunis_ab: '谢拉',
			minghuahongxiao: '鸣花轰咲',
			minghuahongxiao_info: '你在回合外使用牌或在回合内弃置牌时，可根据你失去的牌执行对应项：基本牌~为下一张牌额外指定一名目标；锦囊牌~结束当前阶段，然后可以令一名没有手牌的角色摸两张牌；装备牌~回复1点体力。',
			
			Taffy: '永雏塔菲',
			qianqi: '迁奇',
			qianqi_info: '一名角色的回合开始时，你可以弃置X张牌，交换本回合的两个阶段，或令其本回合使用的前X张牌可指定目标数为1；<br>然后若本回合没有角色受到伤害，重置X（X为此技能发动的次数且至少为1）。',
			chutan: '雏探',
			chutan_info: '出牌阶段限一次，你可以弃置一张牌，选择两名其他角色。你的下个回合开始前，若目标角色于其回合使用牌指定过另一名目标角色为目标，你于其回合结束时获得其本回合使用的实体牌，否则其不能成为『雏探』的目标。',
			
			Merry: '咩栗',
			qinhuo: '侵火',
			qinhuo_info: '当一名角色使用的【火攻】结算后，若之未造成伤害，你可以令另一名角色获得之。',
			lvecao: '略草',
			lvecao_info: '你受到伤害后，可以视为使用一张【铁索连环】，若有角色因此重置，你可以获得其区域内一张可见牌。',
			yangxi: '羊袭',
			yangxi_info: '出牌阶段限一次，你可以将一张非基本牌置于你的判定区，然后对一名角色造成1点伤害。',
			
			Umy: '呜米',
			naisi: '奶死',
			naisi_info: '你回复过多次体力的回合结束时，你可以对一名角色造成X点伤害。（X为你本回合回复体力的次数）',
			tuzai: '图崽',
			tuzai_info: '你对一名角色造成伤害后，可以获得其区域内一张可见牌，并令其回复一点体力。',
			wuneng: '呜能',
			ming_wuneng: '呜能',
			wuneng_info: '出牌阶段，你可以亮出一张【桃】或【桃园结义】并摸一张牌。',

			RinaHayashi: '林莉奈',
			xilv: '习律',
			xilv_info: '其他角色因为技能摸牌时，你可以交给其一张手牌，然后其选择一项：<br>1.交给你摸到的牌；2.若你没有对应技能，令你获得之，直到你的下个回合结束。',
			bana: '拔奈',
			bana_info: '当一名角色的体力改变后，若其牌数≤体力值≤场上角色数，你可以令其摸一张牌。',

			Kira: '姬拉Kira',
			Kira_ab: '姬拉',
			weiguang: '微光',
			weiguang_info: '回合开始时，你可以使用一张牌，若与你以『微光』使用的每一张牌类型相同，你摸一张牌。',
			liangqin: '良寝',
			liangqin_info: '<font color=#f57>限定技</font> 你脱离濒死状态后，可以令你下个回合内第X次摸牌的摸牌量+X。',
			
			Menherachan: '七濑胡桃',
			shangbei: '裳备',
			shangbei_info: '你受到伤害后，可以展示牌堆顶牌，若你没有与之花色相同的“裳”，你将之置于武将牌上，称为“裳”，然后摸一张牌。<br>出牌阶段开始时，你可以令一名角色获得某一类型的“裳”，若为其他角色获得，你回复一点体力。',
			qianqing: '迁情',
			qianqing_info: '锁定技 回合开始时，若你没有“裳”，你受到一点无来源的伤害。',
			
			liqingge: '李清歌',
			tage: '踏歌',
			tage_info: '当一名角色于其回合内使用一张牌后，你可以打出一张点数与之相差1的牌代替之。其回合结束时，你可以摸X张牌，然后将至少一张手牌交给其。（X为你本回合发动的此技能次数）',

			Bafuko: '晴步子',
			shangsheng: '能力上升',
			shangsheng_info: '回合开始时，你于本回合获得一项效果：A.于摸牌阶段多摸1张牌；B.于出牌阶段多出1张【杀】；C.于弃牌阶段手牌上限+1。然后若本次选择与前两次均不同，此技能所有数字+1；否则-1（至少为1）。',
			shangsheng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：成长</span>',
			jinghua: '镜花水月',
			jinghua_info: '出牌阶段限一次，你可以将X张牌依次展示并交给不同角色，令其无法使用相同类型的牌，直到你的下个回合开始（X为你本回合使用【杀】的次数）。',
			
			jike: '机萪',
			qianjiwanbian: '千机万变',
			qianjiwanbian_info: '你可将你造成的伤害改为（雷电）属性。一个回合开始时或你于一个独立的事件中首次造成伤害时，可修改（）内属性并发现一个有字与此技能某字拼音相同的技能，在你下个回合开始之前获得之。若选择『千机万变』，直到你的下个回合开始前此技能触发时额外发现一次。',
			qianjiwanbian_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',
			
			xinkeniang: '新科娘',
			daimao: '呆毛科技',
			daimao_info: '锁定技 游戏开始时，你将牌堆顶牌置于武将牌上，称为“萪”；你使用与“萪”同花色的牌不受距离和次数限制；你进入濒死状态时，将一张与“萪”不同花色的牌置于“萪”中，若如此做，则你体力上限-1，回复满体力，摸三张牌。',
			hongtou: '红头文件',
			hongtou_info: '<font color=#f44>主公技</font> 当你需要使用或打出基本牌时，场上的国V可代替你使用或打出。',

			EQueen: '乃琳',
			yehua: '夜话',
			yehua_info: '回合开始时，你可以将手牌调整至场上唯一最多并翻面。',
			fengqing: '风情',
			fengqing_info: '转换技 当你的武将牌状态发生变化时，你可以选择一名角色，其在其下个准备阶段①视为使用了【酒】②视为使用了【桃】③跳过本回合的判定和弃牌阶段。',
			fengqing_jiu: '风情-酒',
			fengqing_tao: '风情-桃',

			Carol: '珈乐',
			huangjia: '王力口乐',
			shixi: '时隙',
			shixi_info: '锁定技 游戏开始时，记录你的初始手牌。当（你）的牌进入弃牌堆时，你可以选定一张花色与之相同的记录牌。一个阶段结束时，每有两个选定你便摸一张牌，然后重置选定。',
			xueta: '靴匿',
			xueta_info: '你响应其他角色的牌后，可以弃一张牌，令其摸两张牌，并令其成为<皇珈骑士>。',
			yuezhi: '乐治',
			yuezhi_info: '<font color=#a7f>觉醒技</font> 回合开始时，若场上<皇珈骑士>的数量不少于你的体力值或手牌数，你增加一点体力上限并从弃牌堆获得你的初始手牌，每有一张无法获得，你回复1点体力并摸两张牌，然后修改『时隙』（）内容为“你或一名<皇珈骑士>”。',

			Ava: '向晚',
			yiqu: '亦趋',
			yiqu_info: '若你在其他角色执行技能的过程中被指定为目标，你可以获得该技能直到下次进入濒死状态。',
			wanxian: '挽弦',
			wanxian_info: '锁定技 你令其他角色进入濒死状态时，你失去来自『亦趋』额外技能并摸等量的牌。',

			Diana: '嘉然',
			quanyu: '全域',
			quanyu_info: '其他角色使用一张牌时，若你没有该花色的手牌，你可以令此牌无效并获得之，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。',
			wulian: '舞连',
			wulian_info: '<font color=#ecd>限定技</font> 出牌阶段，你可以摸等同于已损失体力值的牌，然后在本轮内获得『连破』。',
			lianpo:'连破',
			lianpo_info:'一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。',

			Bella: '贝拉',
			aswusheng: '舞圣',
			aswusheng_info: '你连续使用或打出第（）张基本牌时，可以触发对应项：（0）使之不计入次数；（1）摸一张牌；（2）获得对方的一张牌；（3）回复1点体力。',
			aswusheng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手</span>',
			gunxun: '棍训',
			gunxun_info: '转换技 出牌阶段，你可以亮出至少一张①红色②黑色手牌使之视为①【杀】②【闪】，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。',
			ming_gunxunshan: '棍训:闪',
			ming_gunxunsha: '棍训:杀',

			Mikawa: '三川',
			zhezhuan: '辙转',
			zhezhuan_info: '每回合限一次，你可以将一张非基本牌当作具有任意应变条件的应变标签同名牌或基本牌使用。',
			setu: '涩涂',
			setu_info: '出牌阶段限一次，你可以将任意张点数之和小于18的手牌置于武将牌上。然后若你武将牌上牌之乘积大于100，你将这些牌置入弃牌堆，摸等量的牌，并对一名角色造成1点伤害。',

			Sakurai: '樱井林',
			junxu: '军序',
			junxu_info: '你每个回合使用第X张牌时，可以摸两张牌或回复一点体力。（X为你的体力值）',
			jingniang: '井酿',
			jingniang_info: '出牌阶段，你可以弃一张牌，令你的【杀】不计入次数且伤害+1，直到本回合结束。',

			ŌokamiMio: '大神澪',
			niwei: '逆位',
			ming_niwei: '逆位',
			xuanxu: '玄虚映实',
			xuanxu_info: '出牌阶段开始时，你可以亮出任意张基本牌，称为“逆位”牌，“逆位”牌不计入手牌数，且只能以以下效果对原不合法的目标使用：【杀】∽回复1点体力；【闪】∽摸两张牌；【桃】∽失去1点体力；【酒】∽立即使用一张牌。',
			weizeng: '味增弼佐',
			weizeng_info: '其他角色的回合开始时，你可以将任意亮出牌以任意顺序置于牌堆顶，其获得这些牌后，其所有同名牌在本回合内均视为“逆位”。',
			weizeng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手 控顶</span>',

			Ciyana: '希亚娜',
			yankui: '魇窥',
			yankui_info: '其他角色的准备阶段，你可以弃置一张与本轮以此法弃置的牌类型均不同的牌，然后观看其手牌，展示并获得其中一张。若此牌为：非基本牌，本回合其跳过判定阶段与弃牌阶段；基本牌，本回合其可以多使用一张【杀】。',

			YaotomeNoe: '八乙女のえ',
			huiyuan: '回援',
			huiyuan_info: '每回合限一次，当其他角色使用基本牌时，若其手牌数多于你，则你可以与其各摸一张牌。',
			suoshi: '琐事',
			suoshi_info: '当你受到伤害时，你可以将一张手牌交给一名全场手牌数最多的角色；若你手牌数不为全场最少，你受到的伤害+1。',

			SuouPatra: '周防パトラ',
			mianmo: '眠魔',
			mianmo_info: '每回合限一次，你使用牌的目标可改为任意体力和等于之点数或合计点数的角色，若包括你，重置此技能。',
			tiaolv: '调律',
			tiaolv_info: '你使用一张牌时，可以令其点数增加/减少X（X为你已损失的体力值且至少为1），然后若你以此牌发动“眠魔”，则你可以令目标横置/各摸一张牌。',
			tiaolv_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',

			Paryi: '帕里',
			tiantang: '天扉',
			tiantang_info: '一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）',
			haoren: '好人',
			haoren_info: '<font color=#fcd>觉醒技</font> 你发动『天扉』后，若发动次数大于存活人数，你扣减1点体力上限，将『天扉』的“弃置”改为“重铸”；且在『天扉』的额外出牌阶段内，当前回合角色获得『引流』。',
			haoren_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',

			TakatsukiRitsu: '高槻律',
			shengya: '生涯',
			shengya_info: '<font color=#f33>锁定技</font> 出牌阶段内，你使用的一张红色牌后，你亮出牌堆顶一张牌并获得之。若你亮出了♣牌，你失去一点体力，并且失去此技能直到下个回合开始。',
			shengya_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手</span>',
			liangshan: '汉歌',
			liangshan_info: '其他角色在你的回合内第一次摸牌后，你可以将牌堆顶牌置于你的武将牌上。一名角色回合开始或濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
			chongshi: '铳士',
			chongshi_info: '你使用【杀】指定目标后，可与其各摸一张牌。',

			MorinagaMiu: '森永缪',
			guanzhai: '观宅',
			guanzhai_info: '其他角色的回合结束时，若其本回合使用的牌少于（2）张，你可观看其手牌并获得其中（1）张。',
			zhishu: '直抒',
			zhishu_info: '出牌阶段开始或你的体力值变化时，你可以展示一张手牌，令一名其他角色选择一项：<br>交给你一张同花色的牌；令你与其下个回合内『观宅』的（）值+1。',

			OtomeOto: '乙女音',
			yuxia: '玉匣',
			yuxia_info: '你可以将三张牌当作一张通常锦囊牌使用；其结算后，你可以将这些牌以任意顺序置于牌堆顶。',
			yuxia_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：控顶</span>',
			lianjue: '连崛',
			lianjue_info: '回合结束时，若你的手牌数与本回合开始时差值为三的倍数，你可以选择一项：<br>令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
			changxiang: '长箱',
			changxiang_info: '主公技 其他同势力角色进入濒死状态时，你可以弃置数量等于自己当前体力值的手牌，视为对其使用一张【桃】。',

			xhhuanshi: '士',
			HisekiErio: '绯赤艾莉欧',
			huange: '幻歌',
			huange_info: '轮次技 一个回合开始时，你可以摸等同一名角色体力值的牌，然后于回合结束时，弃置等同其当前体力值的牌。若你发动过『奇誓』，你可以将弃牌改为置于你的武将牌上。',
			qishi: '奇誓',
			qishi_info: '<font color=#f54>觉醒技</font> 你造成且受到伤害的轮次结束时，你减1体力上限，获得『系绊』，然后进行判定直到出现黑色并将这些牌置于武将牌上，称为“士”。',
			xiban: '系绊',
			xiban_info: '其他角色造成伤害的回合结束时，你可以弃置X张“士”令其选择一项：弃置等量的牌；或若你已受伤，令你回复1点体力。（X为你当前体力值）',
			yongtuan: '拥团',
			yongtuan_info: '主公技 <font color=#fa8>限定技</font> 你弃置“士”时，可以令一名同势力角色获得之。',

			Yousa: '泠鸢',
			niaoji: '鸟肌',
			niaoji_info: '你造成/受到伤害后，可以进行判定：若为♥️，你摸X张牌；若为♠️，你弃置目标/来源X张牌。（X为你已损失的体力值+1）',
			ysxiangxing: '翔星',
			ysxiangxing_info: '出牌阶段限一次，你可以将所有手牌以任意顺序置于牌堆顶，然后对攻击范围内一名角色造成1点伤害。',
			ysxiangxing_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手 直接伤害</span>',

			SukoyaKana: '健屋花那',
			huawen: '花吻交染',
			huawen_info: '出牌阶段限一次，你可以选择一名其他女性角色，你与其互相展示手牌，然后交换花色、点数、种类相同的牌各一张，每交换一张便各摸一张牌。然后若交换不足三次，你与其各失去1点体力。',
			huawen_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手 爆发</span>',
			liaohu: '逃杀疗护',
			liaohu_info: '你造成过伤害的回合结束时，若该回合未发动/发动了“花吻交染”，你可以令你/本轮“花吻交染”选择的其他角色回复1点体力。',

			ShirayukiTomoe: '白雪巴',
			gonggan: '奇癖共感',
			gonggan_info: '其他角色的回合开始时，你可以展示所有手牌然后扣置其中一张，令当前回合角色猜测此牌花色，若猜对，其获得此牌，且本回合你手牌花色、点数均视为与此牌相同；若猜错，你收回此牌，且本回合你手牌点数均视为Q。',
			gonggan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',
			yeyu: '夜域女王',
			yeyu_info: '其他角色使用【杀】时，你可以弃置一张点数大于此【杀】的牌取消之。其他角色使用通常锦囊牌时，你可以重铸一张梅花牌为之增加或减少一名目标。',

			Elu: 'Elu',
			Elu_ab: '艾露',
			huangran: '煌燃',
			huangran_info: '你受到火焰伤害时，可以选择一名距离为1的角色与你平均承担，不能平均的额外1点由你分配。<br>每有一名角色因此受伤，你摸一张牌。',
			yinzhen: '隐真',
			yinzhen_info: '锁定技 每回合造成的第一次伤害均改为火焰伤害。其他角色与你距离减小的回合结束时，你观看其手牌并获得其中一张。',
			senhu: '森护',
			senhu_info: '锁定技 若你的装备区里没有防具牌，你受到的火焰伤害+1。',

			KenmochiDouya: '剑持刀也',
			shenglang: '声浪燃烈',
			shenglang_info: '出牌阶段限一次，你可以将一张【杀】当【决斗】使用。你失去过牌的回合结束时，摸等同于该回合进入弃牌堆的♠【杀】数量的牌',
			nodao: '无刀之咎',
			nodao_info: '你没有装备武器时，可以于出牌阶段重铸【杀】，若你以此法获得武器牌，你可以立即装备之并回复1点体力。',

			Naraka : '奈罗花',
			ming_echi: '阿斥',
			echi: '阿斥',
			echi_info: '其它角色于摸牌阶段外获得牌时，若该角色的体力值不小于你，你可亮出一张手牌并令其选择一项：<br>弃置一张同类型的牌；失去一点体力。',
			mudu: '哞督',
			mudu_info: '其它角色的阶段结束时，若你于此阶段内失去过牌，则可令其将两张牌移出游戏。当前回合结束时，该角色获得一张以此法被移出游戏的牌，并将剩余牌交给你。',
			mudu_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：控制</span>',

			AchikitaChinami : '远北千南',
			yingkuo: '影拓',
			yingkuo_info: '你装备区或手牌区的牌数增加时，若有其他角色在此区域内的牌数与你相同，你可令其弃置该区域内的一张牌。',
			shengni: '声拟',
			shengni_info: '若上一张进入弃牌堆的牌为其他角色的基本牌或通常锦囊牌，你可将你的一张手牌当做该牌使用或打出。若这是在你回合内首次发动『声拟』，改为“你可视为使用或打出该牌”。',

			HayamiSaki : '早见咲',
			tuncai: '屯财',
			tuncai_info: '轮次技 转换技 阳：其他角色摸牌后，你可以摸等量牌；阴：你弃牌后，可以令一名其他角色弃等量牌。',
			zhidu: '值督',
			zhidu_info: '主公技 当与你同势力的角色进入濒死状态或受到两点或以上伤害时，你可以重置并转换『屯财』。',

			KiyoInga : '纪代因果',
			huanxi: '浣洗',
			huanxi_info: '出牌阶段开始或结束时，你可以弃置所有手牌，然后摸等量牌。若均弃牌且两次弃牌不包含同名牌，重置『册吕』',
			celv: '册吕',
			celv_info: '你体力减少或弃置与体力等量的牌时，可以展示并获得其他角色的一张手牌，然后你不能使用或打出与此牌同名的牌。',

			AngeKatrina: '安洁·卡特琳娜',
			chuangzuo: '创作延续',
			chuangzuo_info: '准备阶段，你可令一名角色获得其判定区或装备区的一张牌，然后你摸一张牌。',

			SuzuharaLulu: '铃原露露',
			zhongli: '重力牵引',
			zhongli_info: '锁定技 出牌阶段结束时，你进行判定：若为装备牌，你获得判定牌并继续判定；若你本回合首次因此获得了某张装备牌，你减1点体力上限（至少为1）且执行一个额外的出牌阶段。',
			xinhuo: '薪火相传',
			xinhuo_chuanhuo: '传火',
			xinhuo_info: '出牌阶段，你可以将两张牌以任意顺序置于牌堆顶，令你本回合下一张使用的牌无距离和次数限制且可额外选择一个目标（可叠加）。',
			weizhuang: '魔界伪装',
			weizhuang_discard: '魔界伪装',
			weizhuang_info: '锁定技 你在一回合内多次使用基本牌/锦囊牌后，摸/弃X张牌。（X为此牌指定的目标数）',
			weizhuang_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：自肃</span>',

			KagamiHayato: '加賀美隼人',
			liebo: '裂帛核哮',
			liebo_info: '锁定技 你的黑色牌无法被响应。你的一张黑色牌首次造成伤害时，摸一张牌，然后目标可以令你弃置你装备区内的一张牌',
			zhongjizhimeng: '重机织梦',
			zhongjizhimeng_info: '出牌阶段限一次，你可弃置一张牌并展示一张手牌，此牌的颜色视为原来的异色直到回合结束。本回合内你失去此牌时，可以令一名角色回复1点体力或摸两张牌',

			AmamiyaKokoro: '天宫心',
			miaomiao: '流泪喵喵',
			miaomiao_info: '锁定技 你造成数值为1的伤害时，需将其改为等量体力回复，或令目标摸两张牌；然后若你本回合已发动『逞能龙息』，摸一张牌。',
			chengneng: '逞能龙息',
			chengneng_info: '每回合限一次。其他角色受到伤害，你可以弃一张牌令其来源视为你，且你为其原来源时，本次伤害改为等量体力流失。',
			chengneng_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手 combo</span>',

			SakuraRitsuki: '櫻凜月',
			zhuqiao: '筑巧',
			zhuqiao_info: '出牌阶段，若你本回合因此进入弃牌堆的牌点数之和小于24，你可重铸一张牌。回合结束时，你可令一名角色将手牌数补至X张（X为你本回合以此重铸牌的花色数）。',
			zhuqiao_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：易上手</span>',

			TenkaiTsukasa: '天开司',
			pojie: '破戒',
			pojie_info: '回合内，一名角色装备区内的牌数变化时，你可以摸一张牌。弃牌阶段，你需弃置的牌数改为本回合发动此技能的次数。',
			dazhen: '大振',
			dazhen_info: '出牌阶段限一次，你可将你武器栏的牌移动至其他角色武器栏（可替换原武器），然后其弃置你手牌数与手牌上限之差的牌，若不足，受到你造成的1点伤害。',
			dazhen_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：爆发 破军</span>',

			Shaun: '勺',
			juxiao: '句销',
			juxiao_info: '当你受到伤害后，可以令至多两名角色各摸一张牌，因此摸牌的角色不能使用【杀】直到回合结束。',
			juxiao_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：卖血</span>',
			shshenyan: '神言',
			shshenyan_info: '出牌阶段限一次，你可以展示并弃置手牌中一种牌名的牌，摸等量的牌。然后你可以：视为使用一张名称长度等于本阶段此技能弃置牌花色数的锦囊牌；否则若你弃置了【杀】，重置此技能。',
			shshenyan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：制衡</span>',

			yizhiYY: '亦枝YY',
			bianshi: '辨识',
			bianshi2: '辨识',
			ming_bianshi: '辨识',
			bianshi_info: '体力值不少于你的角色的回合开始时，你可以亮出一张手牌：直到回合结束，每当与此牌类别相同的牌进入弃牌堆时，该角色摸一张牌。以此法获得第二张牌后，该角色失去一点体力并令其因『辨识』的摸牌改为弃牌。',

			Pudding: '步玎',
			tianlve: '甜略',
			tianlve_info: '出牌阶段开始时，你可以令一名其他角色回复1点体力，然后本阶段内你对其使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标。',
			tianlve_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：卖血 辅助 强化出杀</span>',
			luxian: '颅祭',
			luxian_info: '<font color=#fda>限定技</font> 准备阶段，若你已受伤，你可以扣减1点体力上限，然后发现一次P-SP角色，本回合内你视为拥有其所有技能。',
			luxian_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手 爆发</span>',

			AyanaNana: '绫奈奈奈',
			erni: '耳匿',
			erni_info: '转换技 你可以展示一张手牌并置于牌堆顶，视为使用或打出了一张同花色的①【杀】②【闪】③【桃】；当你发动其他技能后，可以转换一次『耳匿』。',
			erni_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：控顶</span>',
			shouru: '受乳',
			shouru_info: '每回合限一次。你受到伤害/发动『耳匿』后，可以获得当前回合角色上家或下家的一张牌。',
			shouru_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：combo</span>',
			chonghuang: '崇皇',
			chonghuang_info: '<font color=#dac>限定技</font> 当你体力值变为1时，你可以扣减1点体力上限，然后发现一次P-SP角色，本轮次内你视为拥有其所有技能。',
			chonghuang_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',
			yinzun: '隐尊',
			yinzun_info: '<font color=#dac>主公技</font> 你的『崇皇』可以在同势力角色体力变为1时发动。',
			
			AkiRinco: '秋凛子',
			jiren: '祭刃',
			jiren2: '祭刃-重置',
			jiren_info: '出牌阶段限一次，你可以进行判定，若结果为：红色~你摸一张牌；武器牌~你获得之。你可以失去1点体力以重置此技能。',
			luqiu: '戮秋',
			luqiu_info: '转换技 当一张牌进入弃牌堆时，若其花色与你本回合上一次『祭刃』的判定牌相同，你可以①视为使用一张【杀】②摸一张牌③弃一张牌。',
			luqiu_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手 爆发 combo</span>',
			canxin: '残心',
			canxin_info: '<font color=#ed9>限定技</font> 出牌阶段结束时，若你已受伤，你可以重铸一张牌。若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作；否则回复1点体力并立即结束回合。',
			
			KurenaiAkane: '红晓音',
			quankai: '拳开',
			quankai_info: '轮次技 你造成伤害后，可以弃置目标区域内的一张牌；当你使用锦囊牌后，可以从弃牌堆中获得上一次『拳开』的弃牌，或重置此技能。',
			heyuan: '合缘',
			heyuan_info: '<font color=#f57>限定技</font> 摸牌阶段，若你已受伤，你可以放弃摸牌，改为发现两次P-SP势力角色，然后视为拥有前者的非限定技和后者的限定技直到你的下个回合开始。',
			heyuan_append:'<span style="font-family: LuoLiTi2;color: #dbb">特性：难上手</span>',
			
			Lovely: '东爱璃',
			yangyao: '秧耀',
			yangyao_info: '出牌阶段，你可以失去一点体力或弃置两张同色的牌，令一名角色从弃牌堆获得一张锦囊牌；每种锦囊牌每回合限一次。',
			shili: '拾璃',
			shili_info: '<font color=#987>限定技</font> 一个回合结束时，若你已受伤，你可以令一名角色摸X张牌并执行一个额外的出牌阶段（X为你本回合使用过的非基本牌数量）。',

			AkumaYuu: '西魔幽',
			akjianwu: '剑舞',
			akjianwu_info: '你使用或打出一张基本牌时，可以与对方拼点，赢的角色选择一项：<br>1.于此牌结算后获得之；2.展示并获得对方的一张牌。<br>以此获得【杀】或单体锦囊牌的角色可以立即使用之。',
			tongzhao: '同召',
			tongzhao_info: '<font color=#d87>限定技</font> 你拼点没赢时，可以发现一次（若为平局则改为发现两次）P-SP势力角色，视为拥有其所有技能直到你下一次体力减少。',

			P_SP: 'P-SP',

		},
	};
});