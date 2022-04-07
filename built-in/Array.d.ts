declare global {
    type CardPositionString = 'h' | 'e' | 'j' | 'o' | 's' | 'c' | 'd';
    type PlayerModel = any;//[todo]
    interface Array<T> {
        /**
         * 统计数组中元素`item`出现的数量
         * @function Array#numOf
         * @param {*} item - 要统计的元素
         * @returns {!number} 统计结果（非负）
         */
        numOf(item): number;
        /**
         * 创建一个新的数组（浅复制），包含原数组中匹配卡牌位置的卡牌对象
         * @function Array#filterInD
         * @param {CardPosition[]} [pos='o'] - 卡牌位置字符串，匹配其中任意位置
         * @returns {!Array} 新的数组，如果没有匹配位置的卡牌，返回空数组
         */
        filterInD(pos?: CardPositionString): /*[todo] Use card type instead.*/ HTMLDivElement[];//Element in array must be the Card Type.
        /**
         * 数组降维，等同于{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.prototype.flat()}
         * @function Array#find
         * @param {*} depth - 降维深度
         * @returns {!any[]} 降维后的数组
         */
        vkflat(depth?: number): any[];
        /**
         * 定位元素，等同于{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.prototype.indexOf()}
         * @function Array#find
         * @param {*} item - 要在数组中定位的元素
         * @returns {!number} 数组中元素的第一个索引；如果没有找到返回-1
         */
        // find(item: any): number;
        /**
         * 查找元素是否存在，等同于{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.prototype.indexOf(item)!=-1}
         * @function Array#contains
         * @param {any} item - 要在数组中查找的元素
         * @returns {boolean} 存在返回`true`，不存在返回`false`
         */
        contains(item: any): boolean;
        /**
         * 向原数组不重复地添加任意数量的元素；但是不保证，添加前，原数组中的元素是否唯一
         * @function Array#add
         * @param {...any} elements - 要添加的任意数量的元素
         * @returns {Array} this self
         */
        add(...args: any[]): Array<T> | false;
        /**
         * 将数组中的元素不重复地添加（{@link Array#add}）到原数组中
         * @deprecated [since ES 2015] 使用ES2015 Spread语法（详见{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax|Spread syntax}）
         * @function Array#addArray
         * @param {!Array} arr - 要添加的数组
         * @returns {Array} this self
         */
        addArray(arr: any[]): Array<T>;
        /**
         * 删除元素，如果原数组中可以找到要删除的元素，就会移除该元素；如果原数组有多个元素与要删除的元素等值（==），仅删除第一个
         * <ul>
         *   <li>注意，该函数要删除的元素不能是数组类型，因为数组类型会被当做要删除元素组成的数组</li>
         * </ul>
         * @function Array#remove
         * @deprecated [performance warning] 该函数内部通过迭代删除每个元素，每多一个要删除的元素，就会多一次迭代
         * @param {(*|Array)} item - 要删除的元素；要删除元素的（一维|二维|多维）数组
         * @returns {?Array} this self；如果`item`是数组，返回undefined
         */
        remove(item: any[] | any): Array<T>;
        /**
         * 删除元素，如果原数组中可以找到要删除的元素，就会移除该元素；如果原数组有多个元素与要删除的元素等值（==），仅删除第一个
         * <ul>
         *   <li>注意，该函数要删除的元素不能是数组类型，因为数组类型会被当做要删除元素组成的数组</li>
         *   <li>对`arr`中的每个元素会调用{@link Array#remove|Array.prototype.remove}</li>
         * </ul>
         * @function Array#removeArray
         * @deprecated [performance warning] {@link Array#remove}
         * @param {!Array} arr - 要删除元素的数组
         * @returns {Array} this self
         */
        removeArray(arr: (any[] | any)[]): Array<T>;
        /**
         * 从原数组中随机取出一个元素
         * @function Array#randomGet
         * @param {...any} elements - 任意元素，不包含在随机选择的元素中；实质对`elements`中的每个元素调用了{@link Array#remove|Array.prototype.remove}
         * @returns {any} 取出的元素
         */
        randomGet(...args: any[]): T;
        /**
         * 返回一个新的数组，随机删除指定数量的元素
         * @function Array#randomRemove
         * @deprecated [performance warning] 该函数内部通过迭代删除每个元素，每多一个要删除的元素，就会多一次迭代
         * @param {number} [num=undefined] - 要删除的元素数量；默认移除一个
         * @returns {(Array|any)} 被删除元素的数组；当无参调用该函数时，返回被删除的元素而非数组
         */
        randomRemove(num: number): Array<T>;
        randomRemove(): T;
        /**
         * 对原数组随机排序
         * @function Array#randomSort
         * @returns {Array} this self
         */
        randomSort(): Array<T>;
        /**
         * 从原数组中随机取出指定数量的元素
         * @function Array#randomGet
         * @param {...any} elements - 任意元素，不包含在随机选择的元素中；实质对`elements`中的每个元素调用了{@link Array#remove|Array.prototype.remove}
         * @returns {!Array<any>} 随机取出的元素数组
         */
        randomGets(num: number): Array<T>;
        /**
         * 角色数组排序；以给定角色/当前事件角色为参考，对角色数组排序。- TODO
         * @function Array#sortBySeat
         * @param {GameCores.GameObjects.Player} target 给定的参考角色
         * @returns {Array} this self
         */
        sortBySeat(target: PlayerModel): Array<T>;
    }
    interface ArrayConstructor {
        /**
         * 由参数数组生成新的数组（浅复制）
         * @function Array#from
         * @param {...any} args - 参数数组
         * @returns {!Array} 生成的数组；如果`args`为虚值或为空则返回空数组
         */
        from<F>(args: F[]): F[];
    }
}
export { }