module.exports = {
    getData(vkCore) {
        const { game, ui, get, ai, lib, _status } = vkCore
        return {
            //变更性别
            changeSex: [() => {
                if (Evt.gender) {
                    player.sex = Evt.gender;
                    player.update()
                    game.log(player, '的性别变更为', `#g${get.translation(Evt.gender)}`);
                    if (Evt.mark) {
                        player.markSkill(Evt.mark);
                    }
                }
            }],
            //重置轮次技
            resetRound: [() => {
                let skill = Evt.resetSkill || Evt.name.slice(0, Evt.name.indexOf('_roundcount'));
                if (!player || !lib.skill[skill]) return;
                let roundname = skill + '_roundcount';
                if (player.storage[roundname] > 0) {
                    player.storage[roundname]--
                }
                if (player.storage[roundname] > 0) {
                    player.updateMarks();
                }
                else {
                    player.unmarkSkill(roundname);
                }
            }],
            //崭新出炉
            choosePromotion: [() => {
                let list = [];
                if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length) {
                    Evt.finish();
                    return;
                }
                for (let i of lib.cardPack.mode_derivation) {
                    let info = lib.card[i];
                    if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials)))
                        list.push(i);
                }
                if (Evt.filterProduct)
                    list = list.filter(Evt.filterProduct);
                Evt.list = list;
            }, () => {
                let next = player.chooseButton([Evt.prompt, '###额外区###（可以右键/长按查看合成路线）', [Evt.list, 'vcard'], '素材区', [Evt.materials, 'card'], 'hidden'], Evt.forced);
                next.set('filterButton', function (button) {
                    let ub = ui.selected.buttons;
                    if (get.itemtype(button.link) == 'card') {
                        if (!ub.length)
                            return false;
                        let card = button.link;
                        let scards = ub.slice(1).map(function (scard) {
                            return scard.link;
                        });
                        let product = ub[0].link[2];
                        scards = scards.filter(function (scard) {
                            return get.itemtype(scard) == 'card';
                        });
                        if (_status.event.filterMaterial && !_status.event.filterMaterial(button.link, scards))
                            return false;
                        let filter = get.info({ name: product }).materials;
                        if (Array.isArray(filter)) {
                            if (filter.length > scards.length) {
                                let mate = filter.slice(0);
                                let smate = [];
                                for (let j = 0; j < mate.length; j++) {
                                    for (let k of scards) {
                                        if (!smate.contains(k)) {
                                            if (get.is.filterCardBy(k, mate[j])) {
                                                smate.push(k);
                                                mate.splice(j--, 1);
                                            }
                                        }
                                    }
                                }
                                for (let j = 0; j < mate.length; j++) {
                                    if (mate[j].number) console.log(mate[j], get.number(card))
                                    if (get.is.filterCardBy(card, mate[j])) {
                                        return true;
                                    }
                                }

                            }
                            return false;
                        }
                        return true;
                    }
                    if (ub.length)
                        return false;
                    return true;
                });
                next.set('selectButton', function () {
                    let ub = ui.selected.buttons;
                    if (ub.length) {
                        let scards = ub.slice(1).map(function (scard) {
                            return scard.link;
                        });
                        let product = ub[0].link[2];
                        if (get.info({ name: product })) {
                            let filter = get.info({ name: product }).materials;
                            if (Array.isArray(filter)) {
                                if (filter.length == scards.length) {
                                    let mate = filter.slice(0);
                                    for (let j = 0; j < mate.length; j++) {
                                        for (let k of scards) {
                                            if (get.is.filterCardBy(k, mate[j])) {
                                                mate.splice(j--, 1);
                                            }
                                        }
                                    }
                                    if (mate.length == 0)
                                        return ub.length;
                                }
                            }
                        }
                        else {
                            ui.selected.buttons.length = 0
                        }
                    }
                    return [ub.length + 1, ub.length + 2];
                });
                next.set('filterMaterial', Evt.filterMaterial);
                let fun = function () {
                    if (!ui.promotionbutton)
                        lib.init.sheet(`
                        .promotionbutton{
                          width: calc(90% - 100px);
                          left: calc(5% + 50px);
                        }`, `
                        .promotion{
                          transition: .5s;
                        }`)
                    return ui.create.control('切换弹窗大小', () => {
                        ui.dialog.classList.add('promotion')
                        ui.dialog.classList.toggle('promotionbutton')
                        if (ui.dialog.classList.contains('promotionbutton')) {
                            ui.dialog._heightset = 'calc(90% - 120px)'
                            ui.dialog.promotionbutton = true
                        }
                        else {
                            ui.dialog.style.height = ''
                            ui.dialog.promotionbutton = false
                        }
                        ui.update()
                    })
                }
                if (player.isOnline2()) {
                    player.send(fun);
                }
                Evt.control = fun();
                if (player != game.me || _status.auto) {
                    Evt.control.style.display = 'none';
                }
            }, () => {
                if (player.isOnline2()) {
                    player.send(function () { ui.controls[0].close() });
                }
                Evt.control.close()
                if (result.bool) {
                    let cards = result.links.slice(1);
                    let star = game.createCard2(result.links[0][2], get.suit3(cards).randomGet(), 14);
                    Evt.result = {
                        bool: true,
                        cards: cards,
                        materials: cards,
                        star: star,
                    };
                }
                else
                    Evt.result = { bool: false };
            }],
        }
    }
}