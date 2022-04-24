export default {
    setChessFunctions(map, container, _status) {
        return {
            chessFocus: function (POS) {
                if (map._chessdrag) return;
                if (_status.chessscrolling) return;
                let dx = 0, dy = 0;
                if(!POS.tempCoord){
                    console.log(POS)
                    return
                }
                console.log(POS)
                let pos = POS.tempCoord()
                if (pos[0] - container.chessLeft < 200) {
                    dx = pos[0] - container.chessLeft - 250;
                }
                else if (pos[0] - container.chessLeft > container.offsetWidth - 400) {
                    dx = pos[0] - container.chessLeft - container.offsetWidth + 500;
                }
                if (pos[1] - container.chessTop < 120) {
                    dy = pos[1] - container.chessTop - 150;
                }
                else if (pos[1] + map.offsetTop - container.chessTop > container.offsetHeight - 240) {
                    dy = pos[1] + map.offsetTop - container.chessTop - container.offsetHeight + 300;
                }
                if (dx || dy) {
                    container.move(dx*1.2, dy*1.2, true);
                }
            },
        }
    }
}