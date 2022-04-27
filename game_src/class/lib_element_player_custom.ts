module.exports = {
    getData(vkCore) {
        const { game, ui, get, ai, lib, _status } = vkCore
        return {
            getMission() {

            },
            /**
             * 切换性别
             */
            changeSex(gender) {
                if ((this.sex === 'none' && !gender) || this.sex == gender) return
                if (!gender) {
                    gender = { female: 'male', male: 'female' }[this.sex]
                }
                let next = game.createEvent('changeSex');
                next.player = this;
                next.gender = gender
                next.setContent('changeSex');
                return next
            },
            /**
             * 检测本角色武将牌周围是否有牌
             */
            hasCardAround() {
                return this.getCardAround().length > 0
            },
            /**
             * 检测本角色武将牌周围的牌
             */
            getCardAround() {
                let cards = [];
                let skills = this.getSkills(true, false, false);
                game.expandSkills(skills);
                for (let i of skills) {
                    if (lib.skill[i]) {
                        if (lib.skill[i].cardAround) {
                            let key = [];
                            let storage = this.getStorage(i);
                            let method = lib.skill[i].cardAround;
                            if (Array.isArray(method)) {
                                for (let j of method) key = key.concat(storage[j]);
                            }
                            else if (typeof method == 'function') {
                                key = key.concat(method(this));
                            }
                            else if (Array.isArray(storage)) {
                                key = key.concat(storage);
                            }
                            else key.push(storage);
                            cards.addArray(key);
                        }
                        else if (lib.skill[i].intro && lib.skill[i].intro.markcount === 'expansion') {
                            cards.addArray(this.getExpansions(i));
                        }
                    }
                }
                return cards;
            },
            /**
             * 获取本角色势力组
             */
            getGroups() {
                let result = [this.group]
                if (this.subgroup) result.push(this.subgroup)
                if (this.group === 'VirtuaReal') result.push('nijisanji')
                return _.uniq(result)
            },
            /**
             * 判断本角色是否是英V
             * @returns {Boolean}
             */
            isYingV() {
                var info = lib.character[this.name || this.name1];
                if (info && info[4]) {
                    if (info[4].contains('yingV')) return true;
                }
            },
            /**
             * 判断本角色是否是国V
             * @returns {Boolean}
             */
            isGuoV() {
                var info = lib.character[this.name || this.name1];
                if (info && info[4]) {
                    if (info[4].contains('guoV')) return true;
                }
            },
            /**
             * 将一张牌置入本角色的判定区
             */
            addToJudge(card, source) {
                let cards = (get.itemtype(card) == 'card') ? [card] : card;
                if (source) source.$give(cards, this, false);
                if (get.type(cards[0]) == 'delay') this.addJudge(cards[0]);
                else if (get.color(cards[0]) == 'red' && this.canAddJudge('lebu')) this.addJudge({ name: 'lebu' }, cards);
                else if (get.color(cards[0]) == 'black' && this.canAddJudge('bingliang')) this.addJudge({ name: 'bingliang' }, cards);
            },
            /**
             * 判断一张牌能否置入本角色的判定区
             */
            canAddToJudge(card) {
                if (get.type(card) == 'delay') return this.canAddJudge(card);
                if (this.canAddJudge('lebu') && get.color(card) == 'red') return true
                if (this.canAddJudge('bingliang') && get.color(card) == 'black') return true
                return false;
            },
            //自创函数(升阶相关)
            choosePromotion(...args) {
                let next = game.createEvent('choosePromotion');
                next.player = this;
                for (let i of args) {
                    if (get.itemtype(i) == 'cards') next.materials = i;
                    else if (typeof i == 'boolean') next.forced = i;
                    else if (typeof i == 'string') next.prompt = i;
                    else if (get.itemtype(i) == 'select' || typeof i == 'number') next.select = i;
                    else if (typeof i == 'function') next.filterProduct = i;
                    else if (typeof i == 'function') next.filterMaterial = i;
                }
                if (!this.canPromotion.apply(this, arguments)) return;
                if (next.prompt == undefined) next.prompt = '「普通升阶」（每个出牌阶段限一次）<br>请选择升阶获得的卡牌';
                if (next.select == undefined) next.select = [1, Infinity];
                next.setContent('choosePromotion');
                return next;
            },
            canPromotion(...args) {
                if (this.$.canPromotion === false) return false
                if (lib.configOL.protect_beginner) return false;
                let list = [];
                if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length) return false;
                for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
                    var info = lib.card[lib.cardPack.mode_derivation[i]];
                    if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials))) list.push(lib.cardPack.mode_derivation[i]);
                }
                let materials, select, filterProduct, bool = false;
                for (let i of args) {
                    if (get.itemtype(i) == 'cards') materials = i;
                    else if (get.itemtype(i) == 'select' || typeof i == 'number') select = i;
                    else if (typeof i == 'function') filterProduct = i;
                }
                if (filterProduct) list = list.filter(filterProduct);
                if (!materials || !list.length) return false;
                if (select == undefined) select = [1, Infinity];
                let materialList = [];
                let cards = materials.slice(0);
                let l = cards.length;
                let all = Math.pow(l, 2);
                for (let i = 1; i < all; i++) {
                    let array = [];
                    for (let j = 0; j < l; j++) {
                        if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
                    }
                    if ((get.itemtype(select) == 'select' && array.length >= select[0] && array.length <= select[1])
                        || (typeof select == 'number' && array.length == select)) materialList.push(array);
                }
                for (let j of materialList) {
                    for (let k of list) {
                        let filter = get.info({ name: k }).materials;
                        if (Array.isArray(filter) && filter.length == j.length) {
                            let mate = filter.slice(0);
                            for (let l = 0; l < mate.length; l++) {
                                for (let card of j) {
                                    if (get.is.filterCardBy(card, mate[l])) {
                                        mate.splice(l--, 1);
                                    }
                                }
                            }
                            if (mate.length == 0) {
                                bool = true;
                            }
                        }
                        if (typeof filter == 'function') {
                            bool = filter(j);
                        }
                    }
                }
                return bool;
            },
        }
    }
}