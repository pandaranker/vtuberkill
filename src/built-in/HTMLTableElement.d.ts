declare global {
    interface HTMLTableElement {
        /**
         * 获取Table[row][col]对应的元素
         * @deprecated <span style="color:red;">[never use]</span> 实现有问题
         * @function HTMLTableElement#get
         * @param {!number} row - 行元素数组索引
         * @param {!number} col - 列元素数组索引
         * @returns {HTMLTableCellElement} 要索引的标题/单元格元素
         */
        get(row: number, col: number): HTMLTableCellElement;
    }
}
export { }