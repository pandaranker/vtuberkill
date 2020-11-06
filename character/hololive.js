'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'hololive',
		connect:true,
		character:{
            /**时乃空 */
            TokinoSora:['female','holo',4,['taiyangzhiyin','renjiazhizhu'],['zhu']],
            /**夜空梅露 */
            YozoraMel:['female','holo',3,['juhun','meilu']],
            /**赤井心 */
            AkaiHaato:['female','holo',3,['liaolishiyan','momizhiyan']],
            /**夏色祭 */
            NatsuiroMatsuri:['female','holo',3,['huxi1','lianmeng']],
            /**萝卜子 */
            RobokoSan:['female','holo',3,['gaonengzhanxie','ranyouxielou']],
            /**白上吹雪 */
            ShirakamiFubuki:['female','holo',3,['yuanlv','jinyuan','zhongjian'],['zhu']],
        },
        characterIntro:{
            TokinoSora:'混沌的尽头，少女的回旋曲，杏社起始同时也是终末的清楚担当，全杏社圆桌骑士之首，空友之母，反抗军的破坏者、狮心之人、大杏社的卡丽熙、hololive真主、永不恐惧者、阿芙乐尔公主，时乃空是也',
            YozoraMel:'夜空梅露',
            AkaiHaato:'赤井心，京师名医之后也，嗜食成性，有《药膳经》流于世，其药多先夺人命后生之，用者莫不谈之色变，食尤喜沙琪玛，每日贡食入府，左右皆呼“哈恰玛恰玛”，后元昭起势，心随夏色祭往拜之，从军十年活人兆计，后拜土澳公主，总领土澳事宜。',
            NatsuiroMatsuri:'夏色祭（V始二年）者，元昭之同族也，自党锢之祸后，元昭暗谋国事，遣祭访天下名士，得名士四人，是为杏国一期，祭不拘小节，最喜呼吸，同社皆避之，既为混沌传说，一般露○可轻言之，建功累累，元昭尊为第一将军',
            RobokoSan:'萝卜子（V始三年）者，奇巧士之造物也，自号高性能机器人，实则不善文书，萝卜起于草莽，生性豪爽，后为时乃空所动，随杏社征战，V始二十年，杏国攻灭诸侯，远交近攻，俨然有大一统之势，萝卜子拜平南王福禄将军，安于南方',
            ShirakamiFubuki:'白上吹雪者，青丘之狐也，夏色祭以玉米赚之，V始十五年，朝廷击绊爱于桐江，大破之，又击之于宛城，斩爱之左将军，一时人皆自危，起义初显败势，吹雪自领百骑迂回西南袭朝廷于后，解绊爱众叛亲离之危，重兴V国大业，吹雪虽为狐灵，然生猫态，憨态可掬',
        },
		skill:{
			taiyangzhiyin:{
                trigger:{ player:['useCard2'] },
				filter:function(event,player){
                    //console.log(event.card,1)
                    //console.log(player.storage.onlink,event.card.cardid)
                    return get.number(event.card)>10&&(player.storage.onlink==null||player.storage.onlink.indexOf(event.card.cardid)==-1);
				},
                priority: 1,
                frequent:true,
                forced:false,
                content:function (){
					var info=get.info(trigger.card);
                    var players=game.filterPlayer();
                    if(player.storage.onlink==null){
                        player.storage.onlink=[];
                    }//处理正处于连锁中的卡牌
                    'step 0'
                    event.Dvalue=get.number(trigger.card)-10;
                    var list=[['无法响应'],['额外目标'],['摸一张牌']];
                    if(!game.hasPlayer(function(current) {
                        return lib.filter.targetEnabled2(trigger.card, player, current)
                            && player.inRange(current)
                            && !trigger.targets.contains(current)
                            //&& (player.canUse(trigger.card, current)||current.canUse(trigger.card, current))
                            && (get.type(trigger.card)!='equip'&&get.type(trigger.card)!='delay')
                    })) {
                        list.splice(1,1);
                        if(event.Dvalue==3){
                            event.Dvalue=2;
                        }
                    }
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(id, choicelist,Dvalue){
                        var dialog=ui.create.dialog('选择'+Dvalue+'项');
                        choicelist.forEach(element=>{
                            dialog.add([element,'vcard']);
                        })
						dialog.videoId = id;
					}, event.videoId, list,event.Dvalue);
                    player.storage.onlink.push(trigger.card.cardid);
                    'step 1'
                    player.chooseButton(event.Dvalue).set('dialog',event.videoId).set('prompt',get.prompt('taiyangzhiyin'));
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
                group:'taiyangzhiyin_clear',
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
            renjiazhizhu:{
				audio:2,
				unique:true,
				trigger:{player:'phaseUseBefore'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('renjiazhizhu')) return false;
					return true;
				},
				content:function(){
                    if(player.storage.skillCardID==null){
                        player.storage.skillCardID=[];
                    }
                    event.players=game.filterPlayer(function(current){
						return current.group=='holo'&&(current!=player);
                    });
					event.players.sortBySeat(player);
                    'step 0'
                    if(event.playersIndex==null){
                        event.playersIndex=0;
                    }
                    if(event.playersIndex<event.players.length){
                        //console.log(event.playersIndex);
                        event.players[event.playersIndex].chooseCard('是否交给'+get.translation(player)+'一张手牌').set('ai',function(card){
                            return 7-get.value(card);
                        })
                    }
                    else{
                        event.playersIndex=0;
                        //console.log(player.storage.skillCardID)
                        event.finish();
                    }
                    'step 1'
                    if(result.bool==true){
                        if(player.storage.changecardList==null){
                            player.storage.changecardList=[];
                        }
                        player.storage.changecardList.push({result:result,card:result.cards[0],oldData:result.cards[0].number});
                        if(game.onlineID){
                            result.cards[0].number=11;
                            result.cards[0].specialEffects=['card_hightlight'];
                            var newcard=get.cardInfoOL(result.cards[0]);//取得card对象
                            var info=JSON.parse(newcard.slice(13));//
                            var id=info.shift();
                            lib.cardOL[id].init(info);
                            //console.log(player.storage.changecardList);
                        }
                        else{
                            console.log(result.cards[0],1);
                            result.cards[0].number=11;
                            result.cards[0].specialEffects=['card_hightlight'];
                            // player.storage.skillCard.push(
                            //     {Old:result.cards[0].childNodes[1].childNodes[2].data,Class:result.cards[0].childNodes[1].childNodes[2]}
                            // );
                            // result.cards[0].childNodes[1].childNodes[2].data='J';
                            var newcard=get.cardInfo(result.cards[0]);//取得card对象
                            result.cards[0]=get.infoCard(newcard);
                            console.log(result);
                            if(player.storage.newcards==null) player.storage.newcards=[];
                            player.storage.newcards.push(result.cards[0]);
                            // console.log(player.storage.newcards);
                        }
                        player.gain(result.cards,event.players[event.playersIndex],'giveAuto');
                        //console.log(result.cards);
                        player.storage.skillCardID.push(result.cards[0].cardid);
                    }
					if(event.playersIndex<event.players.length){
						event.playersIndex++;
						event.goto(0);
                    }
                    //console.log(player.storage.skillCardID)
				},
				group:['renjiazhizhu_changecard','renjiazhizhu_clear'],
				subSkill:{
					changecard:{
						trigger:{player:'useCardToBefore'},
                        direct:true,
                        filter:function(event,player){
                            if(player.storage.skillCardID==null){
                                return false
                            }
                            else{
                                return player.storage.skillCardID.indexOf(event.card.cardid)!=-1;
                            }
                        },
						content:function(){
                            //trigger.card.number=11;
						}
					},
					clear:{
						trigger:{global:'phaseBefore'},
						silent:true,
						content:function(){
                            delete player.storage.skillCardID;
                            if(player.storage.changecardList!=null){
                                player.storage.changecardList.forEach((element,index)=>{
                                    element.card.number=element.oldData;
                                    element.card.specialEffects=null;
                                    if(game.onlineID){
                                        var newcard=get.cardInfoOL(element.card);
                                        var info=JSON.parse(newcard.slice(13));
                                        var id=info.shift();
                                        var sendCard=lib.cardOL[id].init(info);
                                        game.broadcastAll(function(){},player,sendCard);
                                    }
                                    else{
                                        player.storage.newcards[index].number=element.oldData;
                                        player.storage.newcards[index].specialEffects=null;
                                        player.storage.newcards[index].children[0].classList.remove('card_hightlight');
                                        player.storage.newcards[index].childNodes[1].childNodes[2].data=element.card.childNodes[1].childNodes[2].data;
                                    }
                                })
                            }
                            delete player.storage.changecardList;
						}
					}
                }
            },
            renjiazhizhu2:{
                trigger:{global:'gainBefore'},
                forced:true,
                content:function(){
                    //trigger.card.number=1;
                    //trigger.card.cards[0].childNodes[1].childNodes[2].data=1;
                    console.log(card);
                    console.log(trigger);
                }
            },
            juhun:{
                trigger:{
                    global:'damageEnd'
                },
                forced:true,
                usable:1,
                filter:function(event,player){return true},
                content:function(){
					"step 0"
					event.card=get.cards()[0];
					if(player.storage.juhun==undefined) player.storage.juhun=[];
					player.storage.juhun.push(event.card);
					player.syncStorage('juhun');
					//event.trigger("addCardToStorage");
					game.cardsGotoSpecial(event.card);
					player.showCards(player.storage.juhun,'聚魂')
					player.markSkill('juhun');
                },
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							delete player.storage.juhun;
						}
					}
                },
                group:['juhun_get','juhun_draw'],
                subSkill:{
                    get:{
                        trigger:{
                            global:'roundStart'
                        },
                        direct:true,
                        filter:function(event,player){
                            return player.storage.juhun!=undefined&&player.storage.juhun.length!=0;
                        },
                        content:function(){
                            player.storage.juhun.forEach(function(c) {
                                player.gain(c);
                            });
                            delete player.storage.juhun
                            player.syncStorage('juhun');
                            player.markSkill('juhun');
                        }
                    },
                    draw:{
                        trigger:{
                            player:'phaseDrawBegin'
                        },
                        direct:true,
                        filter:function(event,player){
                            return !event.numFixed&&player.isMaxHandcard(false);
                        },
                        content:function(){
                            trigger.num--;
                        },
                    }
                }
            },
            meilu:{
                trigger:{
                    player:'phaseBegin'
                },
                forced:true,
                filter:function(event,player){
                    return player.countCards('h')-3>=player.hp
                },
                content:function(){
                    player.turnOver();
                },
                group:['meilu_kill','meilu_draw'],
                subSkill:{
                    kill:{
                        firstDo:true,
                        trigger:{player:'phaseUseBefore'},
                        forced:true,
                        filter:function(event,player){
                            return player.classList.contains('turnedover');
                        },
                        content:function(){
                            trigger.audioed=true;
                            player.markSkill('meilu');
                            player.addTempSkill('meilu_infinityKill','phaseUseEnd');
                        },
                    },
                    draw:{
                        trigger:{player:'turnOverAfter'},
                        forced:true,
                        filter:function(event,player){
                            return !player.classList.contains('turnedover');
                        },
                        content:function(){
                            if(player.hp<player.maxHp){
                                player.markSkill('meilu');
                                player.recover();
                            }
                        },
                    },
                    infinityKill:{
                        mod:{
                            cardUsable:function(card,player,num){
                                if(card.name=='sha') return Infinity;
                            }
                        }
                    }
                }
            },
            liaolishiyan:{
				trigger:{
					player:"phaseDrawBegin1",
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function (){
					"step 0"
					player.chooseBool("是否放弃摸牌,改为从牌堆顶展示两张牌并发动技能？").ai=function(){
                        var num=2;
                        return num;
						// return cardsx.length>=trigger.num;
                    };
                    "step 1"
                    if(result.bool){
                        trigger.changeToZero();
                        var cards=get.cards(2);
                        game.cardsGotoOrdering(cards);
                        event.videoId=lib.status.videoId++;
                        game.broadcastAll(function(player,id,cards){
                            var str;
                            if(player==game.me&&!_status.auto){
                                str='料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
                            }
                            else{
                                str='料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
                            }
                            var dialog=ui.create.dialog(str,cards);
                            dialog.videoId=id;
                        },player,event.videoId,cards);
                        player.showCards(cards,'料理实验');
                        player.storage.resultCards=cards;
                        event.cards=cards;
                        player.gain(cards,'log','gain2');
                    }
                    else{
                        event.finish();
                    }
                    "step 2"
                    //player.storage.resultCards=event.resultCards;
                    for(var i=0;i<event.cards.length;i++){
                        switch (get.suit(player.storage.resultCards[i])) {
                            case 'spade':
                                player.storage['card'+i]='黑桃：失去 1 点体力';
                                break
                            case 'heart':
                                player.storage['card'+i]='红桃：令赤井心回复 1 点体力';
                                break
                            case 'diamond':
                                player.storage['card'+i]='方块：重铸一张牌';
                                break
                            case 'club':
                                player.storage['card'+i]='梅花：弃置一张牌';
                                break
                        }
                    }
                    "step 3"
                    switch (get.suit(player.storage.resultCards[0])) {
                        case 'spade':
                            player.loseHp(1);
                            break
                        case 'heart':
                            player.recover();
                            break
                        case 'diamond':
                            player.chooseCard('he','重铸一张牌',1,true);
                            // player.chooseToDiscard('he','重铸一张牌',1,true)
                            // player.draw();
                            break
                        case 'club':
                            player.discardPlayerCard(player,1,'he',true);
                            break
                    }
                    "step 4"
                    if(get.suit(player.storage.resultCards[0])=='diamond'&&result.cards){
                        player.lose(result.cards, ui.discardPile);
                        player.$throw(result.cards,1000);
                        game.log(player,'将',result.cards,'置入了弃牌堆');
                        player.draw();
                    }
                    switch (get.suit(player.storage.resultCards[1])) {
                        case 'spade':
                            player.loseHp(1);
                            break
                        case 'heart':
                            player.recover();
                            break
                        case 'diamond':
                            player.chooseCard('he','重铸一张牌',1,true);
                            // player.chooseToDiscard('he','重铸一张牌',1,true)
                            // player.draw();
                            break
                        case 'club':
                            player.discardPlayerCard(player,1,'he',true);
                            break
                    }
                    "step 5"
                    if(get.suit(player.storage.resultCards[1])=='diamond'&&result.cards){
                        player.lose(result.cards, ui.discardPile);
                        player.$throw(result.cards,1000);
                        game.log(player,'将',result.cards,'置入了弃牌堆');
                        player.draw();
                    }
                    game.broadcastAll('closeDialog',event.videoId);
                    player.addTempSkill('liaolishiyan2');
                },
                group:'liaolishiyan_clear',
                subSkill:{
                    clear:{
                        trigger:{global:['phaseUseAfter','phaseAfter']},
                        silent:true,
                        filter:function(event){
                        },
                        content:function(){
                            delete player.storage.resultCards;
                            delete player.storage.card0;
                            delete player.storage.card1;
                        }
                    }
                }
            },
            liaolishiyan2:{
                enable:'phaseUse',
                position:'he',
                filter:function(event,player){
                    return !player.hasSkill('liaolishiyan3');
                },
                content: function() {
                    'step 0'
					player.chooseCardTarget({
                        position:'he',
                        prompt: '重置两张相同花色牌令一名角色按顺序执行'+'<br>'+player.storage.card0+'<br>'+player.storage.card1, 
                        selectCard:2,
                        filterCard:function(card,player){
                            return (get.suit(card)==get.suit(player.storage.resultCards[0]))||(get.suit(card)==get.suit(player.storage.resultCards[1]))
                        },
                        filterTarget:function(card,player,target){
                            if(card.cards){
                                if(get.suit(player.storage.resultCards[0])==get.suit(player.storage.resultCards[1])) return true;
                                else
                                    return get.suit(card.cards[0])!=get.suit(card.cards[1]);
                            }
                        }
                    });
                    'step 1'
                    event.result=result;
                    if(event.result.bool){
                        // player.discard(result.cards,'重铸二张牌',2);
                        // player.draw(2);
                        player.lose(result.cards, ui.discardPile);
                        player.$throw(result.cards,1000);
                        game.log(player,'将',result.cards,'置入了弃牌堆');
                        player.draw(2);
                        switch (get.suit(player.storage.resultCards[0])) {
                            case 'spade':
                                event.result.targets[0].loseHp(1);
                                break
                            case 'heart':
                                player.recover();
                                //event.result.targets[0].recover();
                                break
                            case 'diamond':
                                event.result.targets[0].chooseCard('he','重铸一张牌',1,true);
                                break
                            case 'club':
                                event.result.targets[0].discardPlayerCard(event.result.targets[0],1,'he',true);
                                break
                        }
                    }
                    else{
                        event.goto(4);
                    }
                    'step 2'
                    if(get.suit(player.storage.resultCards[0])=='diamond'&&result.cards){
                        event.result.targets[0].lose(result.cards, ui.discardPile);
                        event.result.targets[0].$throw(result.cards,1000);
                        game.log(event.result.targets[0],'将',result.cards,'置入了弃牌堆');
                        event.result.targets[0].draw();
                    }
                    switch (get.suit(player.storage.resultCards[1])) {
                        case 'spade':
                            event.result.targets[0].loseHp(1);
                            break
                        case 'heart':
                            player.recover();
                            //event.result.targets[0].recover();
                            break
                        case 'diamond':
                            event.result.targets[0].chooseCard('he','重铸一张牌',1,true);
                            break
                        case 'club':
                            event.result.targets[0].discardPlayerCard(event.result.targets[0],1,'he',true);
                            break
                    }
                    'step 3'
                    if(get.suit(player.storage.resultCards[1])=='diamond'&&result.cards){
                        event.result.targets[0].lose(result.cards, ui.discardPile);
                        event.result.targets[0].$throw(result.cards,1000);
                        game.log(event.result.targets[0],'将',result.cards,'置入了弃牌堆');
                        event.result.targets[0].draw();
                    }
                    player.addTempSkill('liaolishiyan3');
                    event.finish();
                    'step 4'
                    event.finish();

                }

            },
            liaolishiyan3:{
				trigger:{global:['phaseUseAfter','phaseAfter']},
				silent:true,
				filter:function(event){
					return event.skill!='liaolishiyan'&&event.skill!='liaolishiyan2';
				},
				content:function(){
					player.removeSkill('liaolishiyan3');
				}
            },
            momizhiyan:{
                usable:1,
                trigger: {
                    player: 'useCardToBegin',
                },
                filter: function(event, player) {
                    return (player.countCards('he')>0)&&event.targets&&event.targets.length>0;
                },
                content: function() {
                    'step 0'
                    player.chooseToDiscard('he','弃置一张牌',1,true);
                    game.delayx();
                    'step 1'
                    event.multiTrue=false;
                    if(result.bool){
                        event.suit=get.suit(result.cards[0]);
                        player.storage.momizhiyanGroup=trigger.targets;
                        if(trigger.targets.length>1){
                            event.multiTrue=true;
                            player.chooseTarget(function(card,player,target){
                                    return player.storage.momizhiyanGroup.contains(target);
                            },1,true);
                            game.delayx();
                        }
                    }
                    else{
                        event.finish();
                    }
                    'step 2'
                    if(result.targets&&result.targets[0]){
                        trigger.targets[0]=result.targets[0];
                    }
                    else if(result.multiTrue){
                        trigger.targets[0]=player;
                    }
                    if(event.suit){
                        switch (event.suit) {
                            case 'spade':
                                trigger.targets[0].loseHp(1);
                                break
                            case 'heart':
                                player.recover();
                                //trigger.targets[0].recover();
                                break
                            case 'diamond':
                                trigger.targets[0].chooseCard('he','重铸一张牌',1,true);
                                break
                            case 'club':
                                trigger.targets[0].discardPlayerCard(trigger.targets[0],1,'he',true);
                                break
                        }
                    }
                    delete player.storage.momizhiyanGroup;
                    'step 3'
                    if(event.suit=='diamond'&&result.cards){
                        trigger.targets[0].lose(result.cards, ui.discardPile);
                        trigger.targets[0].$throw(result.cards,1000);
                        game.log(trigger.targets[0],'将',result.cards,'置入了弃牌堆');
                        trigger.targets[0].draw();
                    }
                    event.finish()
                }
            },
            huxi1:{
                enable:'phaseUse',
                position:'he',
                usable:1,
                filter:function(event,player){
                    return player.countCards('h');
                },
				filterTarget:function(card,player,target){
                    // if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(target)){
                    //     return false;
                    // }
                    return player.inRange(target)&&player.countCards('h')&&target.countCards('h');
                },
                content:function(){
					"step 0"
					if(player.countCards('h')==0||target.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'想要呼吸',target);
                    "step 1"
                    player.chooseCard('请选择交换的牌',true).set('type','compare');
                    "step 2"
                    event.card1=result.cards[0];
					target.chooseCard('请选择交换的牌',true).set('type','compare');
					"step 3"
                    event.card2=result.cards[0];
					if(!event.resultOL&&event.ol){
						game.pause();
					}
					"step 4"
					player.lose(event.card1,ui.ordering);
					target.lose(event.card2,ui.ordering);
					"step 5"
					game.broadcast(function(){
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(event.card1,target,event.card2);
					game.log(player,'的交换牌为',event.card1);
					game.log(target,'的交换牌为',event.card2);
					event.num1=event.card1.number;
					event.num2=event.card2.number;
					event.trigger('compare');
					game.delay(0,1500);
					"step 6"
					event.result={
						player:event.card1,
						target:event.card2,
						suit1:get.suit(event.card1),
						suit2:get.suit(event.card2)
					}
					var str;
					str=get.translation(player.name)+'想要呼吸'+get.translation(target.name);
					game.broadcastAll(function(str){
						var dialog=ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(function(){
							dialog.close();
						},1000);
					},str);
					game.delay(2);
					"step 7"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
                    player.gain(event.card2,'visible');
                    player.$gain2(event.card2);
					game.delay(2);
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
                    "step 8"
                    if(event.result.suit2=='heart'||event.result.suit2=='diamond'||event.result.suit1=='heart'||event.result.suit1=='diamond'){
                        if(event.result.suit2=='heart'||event.result.suit2=='diamond'){
                            player.draw(1);
                            if(!player.hasSkill('huxi2')){
                                player.addTempSkill('huxi2');
                            }
                        }
                    }
                    else{
                        player.loseHp(1);
                    }
                    if(player.storage.huxiGroup==null) player.storage.huxiGroup=[];
                    player.storage.huxiGroup.add(target);

                },
                group:'huxi1_clear',
                subSkill:{
                    clear:{
                        firstDo:true,
                        silent:true,
                        direct:true,
                        trigger:{
                            player:['phaseAfter','phaseUseAfter']
                        },
                        content:function(){
                            delete player.storage.huxiGroup;
                        }
                    }
                }
            },
            huxi2:{
                trigger:{
                    player:['useCardBefore','phaseUseAfter']
                },
                firstDo:true,
                direct:true,
                content:function(){
                    if(player.hasSkill('huxi2')){
                        player.removeSkill('huxi2');
                    }
                },
                mod:{
                    cardUsable:function(card,player,num){
                        return Infinity;
                    },
                    globalFrom:function(from,to,distance){
                        return -1; //例子，进攻距离+1
                    },
                }
            },
            lianmeng:{
                trigger:{
                    player:'useCardAfter',
                    source:'damageSource',
                },
                forced:true,
                filter:function(event,player){
                    if(player.storage.huxiGroup==null){
                        player.storage.huxiGroup=[];
                    }
                    if(event.target){
                        if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(event.target)){
                            return false;
                        }
                    }
                    if(event.name=='useCard'){
                        if(event.cards!=null&&get.subtype(event.cards[0])!='equip1'){
                            return false;    
                        }
                    }
                    if(player.countCards('h')<1){
                        return false;
                    }
                    if(game.hasPlayer(function(current){
                        return player.inRange(current)&&!player.storage.huxiGroup.contains(current)&&current.countCards('h')>0;
                    })){
                        return true;
                    }
                    else
                        return false
                },
                content:function(){
                    'step 0'
                    player.chooseTarget('对一名角色使用'+get.translation('huxi1'),{},true,function(card,player,target){
                        if(player==target) return false;
                        if(!player.inRange(target)) return false;
                        if(target.countCards('h')<1){
                            return false;
                        }
                        if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(target)){
                            return false;
                        }
                        if(player.storage.huxiGroup.contains(target)) return false;
						if(game.hasPlayer(function(current){
                            if(player.storage.huxiGroup&&player.storage.huxiGroup.contains(current)){
                                return false;
                            }
                            if(current.countCards('h')==0){
                                return false;
                            }
                            if(current!=player&&get.distance(player,current)<get.distance(player,target)){
                                return true;
                            }
                            else{
                                return false;
                            }
						})){
							return false;
                        }
                        return true;
                    });
                    'step 1'
                    event.target=result.targets[0];
                    if(player.countCards('h')==0||!event.target||event.target.countCards('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'想要呼吸',event.target);
                    "step 2"
                    player.chooseCard('请选择交换的牌',true).set('type','compare');
                    "step 3"
                    event.card1=result.cards[0];
					event.target.chooseCard('请选择交换的牌',true).set('type','compare');
					"step 4"
                    event.card2=result.cards[0];
					if(!event.resultOL&&event.ol){
						game.pause();
					}
					"step 5"
					player.lose(event.card1,ui.ordering);
					event.target.lose(event.card2,ui.ordering);
					"step 6"
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
					"step 7"
					event.result={
						player:event.card1,
						target:event.card2,
						suit1:get.suit(event.card1),
						suit2:get.suit(event.card2)
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
					"step 8"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
                    player.gain(event.card2,'visible');
                    player.$gain2(event.card2);
					game.delay(2);
                    event.target.gain(event.card1,'visible');
                    event.target.$gain2(event.card1);
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
                    "step 9"
                    if(event.result.suit2=='heart'||event.result.suit2=='diamond'||event.result.suit1=='heart'||event.result.suit1=='diamond'){
                        if(event.result.suit2=='heart'||event.result.suit2=='diamond'){
                            player.draw(1);
                            if(!player.hasSkill('huxi2')){
                                player.addTempSkill('huxi2');
                            }
                        }
                    }
                    else{
                        player.loseHp(1);
                    }
                    if(player.storage.huxiGroup==null) player.storage.huxiGroup=[];
                        player.storage.huxiGroup.add(event.target);
                },
                group:'lianmeng_difang',
                subSkill:{
                    difang:{
                        trigger:{
                            player:['gainAfter']
                        },
                        firstDo:true,
                        direct:true,
                        filter:function(event,player){
                            if(player==_status.currentPhase) return false;
                            return event.source&&player!=event.source;
                        },
                        content:function(){
                            player.discard(player.getEquip(2));
                        }
                    }
                }
            },
            gaonengzhanxie:{
                priority:15,
                firstDo:true,
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha'){
                            return num+player.countCards('e');
                        } 
					},
                    cardEnabled:function(card,player){
                        if(card.name=='sha'&&(player.getStat().card.sha>player.countCards('e'))) 
                            return false
                    }
                },
                group:['gaonengzhanxie_draw'],
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
                            'step 0'
                            player.draw(player.getStat().card.sha);
                            'step 1'
                            if(player.getCardUsable({name:'sha'})!==0&&lib.filter.cardEnabled({name:'sha'},player)){
                                player.chooseToDiscard('he','弃置'+player.getStat().card.sha.toString()+'张牌',player.getStat().card.sha,true)
                            }
                        }
                    }
                }
            },
            ranyouxielou:{
                forced:true,
				//charlotte:true,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					if(event.nature!=null) return true;
					return false;
				},
				content:function(){
                    'step 0'
                    trigger.source.chooseControl(true).set('choiceList',[
                        '令'+get.translation(player)+'回复'+trigger.num+'点生命',
                        '将'+get.translation(trigger.cards)+'交给'+get.translation(player),
                    ])
                    'step 1'
                    if(result.index==0){
                        player.recover(trigger.num);
                        trigger.cancel();
                    }
                    else{
                        if(trigger.cards){
                            player.gain(trigger.cards,'gain2')
                        }
                    }
                },
                group:'ranyouxielou_fire',
                subSkill:{
                    fire:{
                        trigger:{global:'damageBegin3'},
                        forced:true,
                        filter:function(event,player){
                            if(event.player==player) return false;
                            if(event.player&&player.inRange(event.player)&&event.nature=='fire') {
                                if(player.countCards('h')>=player.getHandcardLimit())
                                return true;
                            }//
                            return false;
                        },
                        content:function(){
                            player.chooseToDiscard('he','弃置一张牌，使该伤害+1',true,1);
                            trigger.num++;
                            //player.recover();
                        }
                    }
                }
            },
            baihuqingguo:{
                trigger:{global:'phaseBegin'},
				//frequent:true,
                filter:function(event,player){
                    return event.player!=player&&player.countCards('he')>0;
                },
                content:function(){
                    'step 0'
                    player.chooseToDiscard(1,'弃置一张牌');
                    'step 1'
                    if(result.bool){
                        player.addTempSkill('baihuqingguo_chaofeng');
                        trigger.player.addTempSkill('baihuqingguo_meihuo');
                    }
                    else{
                        event.finish();
                    }
                },
                subSkill:{
                    chaofeng:{
                        mark:true,
                        markText:'狐',
                        intro:{
                            name:'狐',
                            content:'你只能摸这只🦊'
                        },
                    },
                    meihuo:{
                        mark:true,
                        markText:'魅',
                        intro:{
                            name:'魅',
                            content:'你只能摸那只🦊'
                        },
                        mod:{
                            playerEnabled:function(card,player,target){
                                if(target==player||target.hasSkill('baihuqingguo_chaofeng')){
                                    return true;
                                }
                                else{
                                    return false;
                                }
                            }
                        }
                    }
                }
            },
            huyanluanyu:{
                trigger:{
                    player:'damage'
                },
                content:function(){
                    'step 0'
                    event.index=0;
                    event.damageNum=trigger.num;
                    event.nowHand=player.countCards('h');
                    event.getPlayers=game.filterPlayer(function(current){
                        if(current.countCards('h')>event.nowHand){
                            return true;
                        }
                    });
                    event.givePlayers=game.filterPlayer(function(current){
                        if(current.countCards('h')<event.nowHand){
                            return true;
                        }
                    });
                    'step 1'
                    if(event.index<event.getPlayers.length){
                        if(event.getPlayers[event.index].countCards('he')>0){
                            event.getPlayers[event.index].chooseCard(1,'he','交给'+get.translation(player)+'一张牌',true);
                        }
                    }
                    else{
                        event.index=0;
                        event.goto(3);
                    }
                    'step 2'
                    player.gain(result.cards);
                    game.delayx();
                    event.index+=1;
                    event.goto(1);
                    'step 3'
                    if(event.index<event.givePlayers.length){
                        if(player.countCards('he')>0){
                            player.chooseCard(1,'he','交给'+get.translation(event.givePlayers[event.index])+'一张牌',true);
                        }
                    }
                    else{
                        event.goto(5);
                    }
                    'step 4'
                    event.givePlayers[event.index].gain(result.cards);
                    game.delayx();
                    event.index+=1;
                    event.goto(3);
                    'step 5'
                    event.finish();
                }
            },
            yuanlv:{
                trigger:{global:'phaseEnd'},
				filter:function(event,player){
					if(player.hasSkill('yuanlv_tag')){
						return true;
					}
					else
						return false;
                },
                content:function(){
                    'step 0'
                    player.draw(player.maxHp);
                    'step 1'
                    player.chooseCard(player.hp,'he','选择放置到牌堆顶部的牌',true);
                    'step 2'
					if(result.bool==true&&result.cards!=null){
						event.cards=result.cards
					}
                    if(event.cards.length>0){
                        //player.$throw(cards,1000);
                        //player.lose(event.cards,ui.special,'visible');
                        player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
                            var value=get.value(button.link);
                            if(_status.event.reverse) return value;
                            return -value;
                        }).set('reverse',((_status.currentPhase&&_status.currentPhase.next)?get.attitude(player,_status.currentPhase.next)>0:false))
                    }
					"step 3"
					if(result.bool&&result.links&&result.links.length) event.linkcards=result.links.slice(0);
					game.delay();
					'step 4'
					var cards=event.linkcards;
					//player.$throw(cards,1000);,'visible'
					//game.log(player,'将',cards,'置于牌堆顶');
					player.lose(cards,ui.special);
					'step 5'
                    game.delay();
                    'step 6'
					var cards=event.linkcards;
                    while(cards.length>0){
                        var card=cards.pop();
                        card.fix();
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        game.updateRoundNumber();
                            //game.log(player,'将',card,'置于牌堆顶');
                    }
                },
				group:['yuanlv_ready'],
				subSkill:{
					ready:{
						trigger:{player:['damageAfter','loseHpAfter','useCardAfter']},
						direct:true,
						filter:function(event,player,name){
							if(name=='useCardAfter'){
								var indexi=0
								while(indexi<event.cards.length){
									if(get.type(event.cards[indexi])=='trick')
										return true;
									indexi++;
								}
								return false;
							}
							else 
								return true;
						},
						content:function(){
							if(!player.hasSkill('yuanlv_tag'))
								player.addTempSkill('yuanlv_tag');
						}
					},
					tag:{
						mark:true,
						intro:{
							content:function(){
								return '结束时触发技能'+get.translation('yuanlv')
							}
						}
					}
				}
            },
            jinyuan:{
                enable:'phaseUse',
                usable:1,
                filter:function(event,player){
                    return player.countCards('he')>0;
                },
				filterTarget:function(card,player,target){
					return player!=target;
				},
                content:function(){
                    'step 0'
                    player.viewHandcards(target);
                    game.delayx();
                    'step 1'
                    event.nowHandCards=target.getCards('h');
                    player.chooseCard('he',true,'选择给予的牌').set('ai',function(card){
                        return 5-get.value(card);
                    });
                    'step 2'
                    event.cardUsable=true;
                    console.log(event.card,result.card)
                    event.card=result.cards[0];
                    if(event.nowHandCards.length>0)
                    event.nowHandCards.forEach(element => {
                        if(get.suit(element)==get.suit(result.cards[0])){
                            event.cardUsable=false;
                        }
                    });
                    if(event.cardUsable){
                        var bool=game.hasPlayer(function(current){
                            return target.canUse(result.cards[0],current);
                        });
                        if(!bool){
                            event.cardUsable=false;
                        }
                    }
                    'step 3'
					target.gain(event.card,player,'give');
                    if(event.cardUsable){
                        target.chooseUseTarget(event.card,'可选择一个目标直接使用该牌');
                    }
                }
            },
			zhongjian:{
				unique:true,
				group:['zhongjian1'],
				zhuSkill:true,
			},
            zhongjian1:{
				unique:true,
                zhuSkill:true,
                //trigger:{global:'chooseToUse'},
				enable:'chooseToUse',
				//popup:false,
                forced:false,
				selectCard:0,
                // viewAs:function(cards,player){
				// 	var name=false;
				// 	var nature=null;
				// 	name='wuxie';
				// 	if(name) return {name:name,nature:nature,isCard:true};
				// 	return null;
				// },
				// ignoreMod:true,
				filterCard:function(card,player,event){
					if(!player.hasZhuSkill('zhongjian')) return false;
					event=event||_status.event;
					var filter=event._backup.filterCard;
					if(filter({name:'wuxie'},player,event)) return true;
					return false;
				},
				filter:function(event,player){
					if(!player.hasZhuSkill('zhongjian')) return false;
                    var filter=event.filterCard;
                    if(player.hasSkill('zhongjian1_tag')) return false;
                    if(!filter({name:'wuxie'},player,event)) return false;
                    // var time=player.chooseTarget('命令一名杏势力角色将一张牌视为无懈可击',{},true,function(card,player,target){
                    //     return target.group=='holo'
                    // });
                    // console.log(time);
					return true;
                },
                content:function(){
                    "step 0"
                    player.chooseTarget('命令一名其他杏势力角色将一张牌视为无懈可击',{},function(card,player,target){
                        return player!=target&&target.group=='holo'&&target.countCards('he')>0
                    });
                    "step 1"
                    if(result.bool){
                        event.dropTarget=result.targets[0];
                        event.dropTarget.chooseCard('he',1,true);
                    }
                    else{
                        player.addTempSkill('zhongjian1_tag','roundStart');
                        event.finish()
                    }
                    "step 2"
                    // event.dropTarget.$throw(result.cards);
                    // event.dropTarget.lose(result.cards,ui.discardPile);
                    //console.log(event.getParent().getParent().getParent());
                    event.getParent().getParent().state=!event.getParent().getParent().state;
                    event.getParent().getParent().goto(2);
                    player.addTempSkill('zhongjian1_tag','roundStart');
                    event.dropTarget.useCard(result.cards,{name:'wuxie',isCard:false});
                    //player.removeSkill('zhongjian','roundStart');
                },
				hiddenCard:function(player,name){
					return name=='wuxie'&&!player.hasSkill('zhongjian1_tag')&&player.hasZhuSkill('zhongjian');
                },
                subSkill:{
                    tag:{
                        mark:true,
						intro:{
							content:function(){
								return '一轮后可以再次使用'+get.translation('zhongjian')
							}
                        },
                    }
                }
            }
		},
		translate:{
			TokinoSora:'时乃空',
			taiyangzhiyin:'太阳之音',
			taiyangzhiyin_info:'你使用牌指定目标时，此牌点数每比10大1点，你便可选择不重复的一项：令之无法响应；为之额外指定一名目标；或摸一张牌。',
            renjiazhizhu:'仁家之主',
            renjiazhizhu_info:'主公技。你的回合开始时，其他同势力角色可以展示并交给你一张牌，本回合这些点数的牌点数均改为J。',
            renjiazhizhu_tag:'仁家之主',
            YozoraMel:'夜空梅露',
            juhun:'聚魂',
            juhun_info:'锁定技。一回合一次，当一名角色受到伤害后，将牌堆顶牌置于你武将牌上。每轮开始时，你获得武将牌上所有牌。当你的手牌数为全场最多时，摸牌阶段你少摸一张牌。',
            meilu:'没露',
            meilu_info:'锁定技。准备阶段，若你的手牌数比体力值多三或以上，你翻面。当你的武将牌背面朝上时，你使用【杀】没有次数限制；当你的武将牌翻至正面时，你回复 1 点体力。',
            AkaiHaato:'赤井心',
            liaolishiyan:'料理实验',
            liaolishiyan_info:'摸牌阶段，你可改为展示并获得牌堆顶的两张牌，然后根据其中的花色执行对应效果：♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。出牌阶段限一次，你可以重铸与当回合“料理实验”花色相同的两张牌令一名角色执行对应效果。',
            liaolishiyan2:'料理实验',
            liaolishiyan2_info:'出牌阶段限一次，你可以重铸与当回合“料理实验”花色相同的两张牌令一名角色执行对应效果。♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。',
            momizhiyan:'抹蜜之言',
            momizhiyan_info:'当你使用牌指定目标后，你可弃置一张牌令其中一名目标执行弃置牌花色在“料理实验”的对应效果。每回合限一次。',
            NatsuiroMatsuri:'夏色祭',
            huxi1:'呼吸',
            huxi1_info:'出牌阶段限一次，你可以令攻击范围内的一名其他角色与你同时展示一张手牌并交换，若你获得了红色牌，你可以摸一张牌并令你本回合使用的下一张牌不受距离与次数限制；若没有人获得红色牌，你失去 1 点体力。',
            lianmeng:'连梦',
            lianmeng_info:'当你使用武器牌或造成伤害后，你需对本回合未成为过“呼吸”目标中距离你最近的角色立即发动一次“呼吸”。当你于回合外获得其他角色的牌后，弃置你装备区的防具牌。',
            RobokoSan:'萝卜子',
            gaonengzhanxie:'高能战械',
            gaonengzhanxie_info:'锁定技，你出牌阶段可使用【杀】的次数等于你装备区内牌数+1。当你于回合内使用【杀】后，你摸X张牌，然后若你还可使用【杀】，你弃置等量的牌。（X为你本阶段已使用过的【杀】的数量)',
            ranyouxielou:'燃油泄漏',
            ranyouxielou_info:'锁定技，你受到属性伤害时改为回复等量体力值并获得来源牌。你攻击范围内其他角色受到火焰伤害时，若你的手牌数不小于手牌上限，你弃置一张牌令此伤害+1',
            ShirakamiFubuki:'白上吹雪',
            baihuqingguo:'白狐倾国',
            baihuqingguo_info:'其他角色的出牌阶段开始时，你可弃一张牌，若如此做，该角色于此阶段使用的牌只能以你或其自己为目标。',
            huyanluanyu:'狐言乱语',
            huyanluanyu_info:'每当你受到1点伤害后，（记你此时手牌数为X）你可令手牌数多于X的角色各交给你一张牌，然后你交给手牌数少于X的角色各一张牌。',
            yuanlv:'远虑',
            yuanlv_info:'你使用过锦囊牌或受到过伤害的回合结束时，可以摸等同你体力上限的牌，然后将等同你体力值的牌以任意顺序置于牌堆顶',
            jinyuan:'近援',
            jinyuan_info:'出牌阶段限一次，你可以观看一名角色的手牌，然后你可交给其一张牌，若为其原手牌中没有的花色，其可以立即使用之。',
            zhongjian:'中坚',
            zhongjian1:'中坚',
            zhongjian_info:'主公技，每轮限一次，当你需要使用【无懈可击】时，可以令一名同势力的其他角色将一张牌当【无懈可击】使用。            ',
        },
	};
});
