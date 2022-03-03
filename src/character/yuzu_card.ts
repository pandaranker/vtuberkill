let { game, ui, get, ai, lib, _status } = window.vkCore
export default {
    jinzhou:{fullskin:true},
    gouhun:{fullskin:true},
    niwei_sha: {
        content() {
            Evt.target.recover(player);
            game.delay(0.5);
        },
    },
    niwei_shan: {
        content() {
            delete Evt.result;
            Evt.player.draw(2);
            game.delay(0.5);
        },
    },
    niwei_tao: {
        content() {
            Evt.target.loseHp();
            game.delay(0.5);
        },
    },
    niwei_jiu: {
        content() {
            Evt.target.chooseToUse().set('targetRequired', true);
            game.delay(0.5);
        },
    },
}