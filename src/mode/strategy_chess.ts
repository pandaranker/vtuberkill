export default {
    setChessFunctions(map, container, _status) {
        return {
            chessFocus: function (POS) {
                if (map._chessdrag) return;
                if (_status.chessscrolling) return;
                var dx = 0, dy = 0;
                let pos = POS.tempCoord()
                if (pos[0] - container.chessLeft < 120) {
                    dx = pos[0] - container.chessLeft - 30;
                }
                else if (pos[0] - container.chessLeft > container.offsetWidth - 400) {
                    dx = pos[0] - container.chessLeft - container.offsetWidth + 500;
                }
                if (pos[1] - container.chessTop < 90) {
                    dy = pos[1] - container.chessTop - 30;
                }
                else if (pos[1] + map.offsetTop - container.chessTop > container.offsetHeight - 150) {
                    dy = pos[1] + map.offsetTop - container.chessTop - container.offsetHeight + 150;
                }
                if (dx || dy) {
                    container.move(dx*1.2, dy*1.2, true);
                }
            },
        }
    }
}