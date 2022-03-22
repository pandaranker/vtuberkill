//galgame相关功能
module.exports = function () {
    let { game, ui, get, ai, lib, _status } = vkCore
    var galgame = {
        text: {},
        game: game,
        sce(shijian) {
            var game = galgame.game;
            let next = game.createEvent('sce', false);
            next.shijian = shijian;
            next.setContent(galgame.sces);
            return next;
        },
        audio: document.createElement("audio"),
        backgroundMusic: document.createElement("audio"),
        end() {
            var game = galgame.game;
            galgame.audio.pause();
            galgame.backgroundMusic.pause();
            game.resume();
        },
        cg(src, callback) {
            var cg = document.createElement("video");
            cg.setAttribute("width", "100%");
            cg.setAttribute("height", "100%");
            cg.setAttribute("src", src);
            cg.setAttribute("autoplay", "autoplay");
            cg.addEventListener("ended", callback);
            cg.addEventListener("loadedmetadata", function () {
                (this).onclick = function () {
                    this.play();
                    this.currentTime = this.duration;
                }
            });
            return cg;
        },
        sces() {
            var game = galgame.game;
            var color = {};
            var beijing = ui.create.div('.scedi', ui.window);
            var booth = { node: ui.create.div(".scetu", beijing) };
            var node = ui.create.div('.sce', beijing);
            var drive = ui.create.div('.drive', beijing);
            var tou = ui.create.div('.tou', node);
            var txt = ui.create.div('.txt', node);
            var right = ui.create.div(node);
            var name = ui.create.div('.name', tou);
            var name2 = ui.create.div('.name', right);
            var num = 0,
                i = 0;
            var bofang = function () {
                if (!galgame.text[Evt.shijian]) return;
                var arr = galgame.text[Evt.shijian][num].split(':');
                if (arr[0] == "background") {
                    if (arr[1] == "none") {
                        beijing.style.backgroundImage = "";
                    } else {
                        beijing.setBackgroundImage('extension/' + arr[1]);
                    }
                    num++;
                    bofang();
                    return;
                } else if (arr[0] == "booth") {
                    if (arr[6] || (arr[1] == "none" && arr[2])) {
                        if (!booth[arr[6]]) {
                            booth[arr[6]] = ui.create.div(".scetu", beijing);
                        }
                        if (arr[1] == "none") {
                            booth[arr[2]].hide();
                        } else {
                            if (booth[arr[6]].classList.contains("hidden")) booth.node.show();
                            booth[arr[6]].style.width = parseInt(arr[2]) + "px";
                            booth[arr[6]].style.height = parseInt(arr[3]) + "px";
                            booth[arr[6]].style.left = parseInt(arr[4]) + "%";
                            booth[arr[6]].style.top = parseInt(arr[5]) + "%";
                            booth[arr[6]].setBackgroundImage('extension/' + arr[1]);
                        }
                    } else {
                        if (arr[1] == "none") {
                            booth.node.hide();
                        } else {
                            if (booth.node.classList.contains("hidden")) booth.node.show();
                            booth.node.style.width = parseInt(arr[2]) + "px";
                            booth.node.style.height = parseInt(arr[3]) + "px";
                            booth.node.style.left = parseInt(arr[4]) + "%";
                            booth.node.style.top = parseInt(arr[5]) + "%";
                            booth.node.setBackgroundImage('extension/' + arr[1]);
                        }
                    }
                    num++;
                    bofang();
                    return;
                } else if (arr[0] == "color") {
                    if (arr[1] == "text") {
                        node.style.backgroundColor = arr[2];
                    }
                    if (arr[1] == "choose") {
                        if (arr[3]) {
                            color[arr[3]] = arr[2];
                        } else {
                            color.every = arr[2];
                        }
                    }
                    num++;
                    bofang();
                    return;
                } else if (arr[0] == "music") {
                    ui.backgroundMusic.pause();
                    galgame.backgroundMusic.src = lib.assetURL + "galgame/" + arr[1];
                    galgame.backgroundMusic.play();
                    num++;
                    bofang();
                    return;
                } else if (arr[0] == "audio") {
                    galgame.audio.src = lib.assetURL + "galgame/" + arr[1];
                    galgame.audio.play();
                    num++;
                    bofang();
                    return;
                } else if (arr[0] == "cg") {
                    ui.backgroundMusic.pause();
                    galgame.backgroundMusic.pause();
                    var di = ui.create.div('.cg');
                    var cg = galgame.cg(lib.assetURL + "galgame/" + arr[1], function () {
                        beijing.removeChild(di);
                        ui.backgroundMusic.play();
                        bofang();
                    });
                    di.appendChild(cg);
                    beijing.appendChild(di);
                    num++;
                    return;
                } else if (arr[0] == "choose") {
                    var choose = ui.create.div('.choose', beijing);
                    for (var j = 1; j < arr.length; j++) {
                        var sele = ui.create.div('.sele', choose);
                        sele.onclick = function () {
                            _status.event.result = {
                                bool: this.innerText,
                            }
                            ui.window.removeChild(beijing);
                            ui.backgroundMusic.play();
                            galgame.end();
                        };
                        sele.innerHTML = arr[j];
                        if (color.every) sele.style.backgroundColor = color.every;
                        if (color[j]) sele.style.backgroundColor = color[j];
                    }
                    return;
                } else if (arr[0] == "right") {
                    if (arr[1] != "none") {
                        if (!right.classList.contains("galright")) {
                            right.classList.add("galright");
                        }
                        if (!txt.classList.contains("txt2")) {
                            txt.classList.add("txt2");
                        }
                        right.setBackgroundImage('extension/' + arr[1]);
                        if (arr[2] == "none") {
                            name2.innerHTML = "";
                        } else {
                            name2.innerHTML = arr[2];
                        }
                        if (arr[3]) {
                            if (arr[3] == "left") {
                                if (!tou.classList.contains("yingyin")) {
                                    tou.classList.add("yingyin");
                                }
                                if (right.classList.contains("yingyin")) {
                                    right.classList.remove("yingyin");
                                }
                            }
                            if (arr[3] == "right") {
                                if (tou.classList.contains("yingyin")) {
                                    tou.classList.remove("yingyin");
                                }
                                if (!right.classList.contains("yingyin")) {
                                    right.classList.add("yingyin");
                                }
                            }
                        } else {
                            if (tou.classList.contains("yingyin")) {
                                tou.classList.remove("yingyin");
                            }
                            if (right.classList.contains("yingyin")) {
                                right.classList.remove("yingyin");
                            }
                        }
                    } else {
                        right.classList.remove("galright");
                        txt.classList.remove("txt2");
                        if (tou.classList.contains("yingyin")) {
                            tou.remove("yingyin");
                        }
                        if (right.classList.contains("yingyin")) {
                            right.remove("yingyin");
                        }
                        name2.innerHTML = "";
                    }
                    num++;
                    bofang();
                    return;
                }
                tou.show();
                if (arr[0] == "none") {
                    tou.hide();
                } else if (arr[0] == "sp") {
                    tou.setBackgroundImage("galgame/" + arr[3]);
                    name.innerHTML = arr[2];
                } else {
                    tou.setBackground(arr[0], "character");
                    name.innerHTML = get.rawName([arr[0]]);
                }
                function skip0(e) {
                    if (e.ctrlKey) {
                        window.status = 'skip';
                    }
                }
                function skip1(e) {
                    if (e.keyCode == '17') {
                        window.status = '';
                    }
                }
                var skipfun0 = function (e) {
                    skip0(e);
                }
                var skipfun1 = function (e) {
                    skip1(e);
                }
                var link = arr[1].replace(/@/g, lib.config.connect_nickname);
                var show = function () {
                    delete drive.onclick
                    if (link[i] == "<") {
                        for (var j = i; j < link.length; j++) {
                            if (link[j] == ">") {
                                if (link[j + 1] && link[j + 1] == "<") {
                                    continue;
                                }
                                i = j + 1;
                                break;
                            }
                        }
                    }
                    var str = link.substr(0, i);
                    txt.innerHTML = str;
                    i++;
                    if (i <= link.length) {
                        window.addEventListener('keydown', skipfun0);
                        window.addEventListener('keyup', skipfun1);
                        let dis = (link.length - i)
                        if (window.status == 'skip') {
                            let t = setTimeout(show, (dis > 5 ? 20 + (60 / (dis - 5)) : 80));
                            drive.onclick = function () {
                                clearTimeout(t);
                                show();
                            }
                        }
                        else {
                            let t = setTimeout(show, (dis > 5 ? 100 + (200 / (dis - 5)) : 300));
                            drive.onclick = function () {
                                clearTimeout(t);
                                show();
                            }
                        }
                    } else {
                        if (num < galgame.text[Evt.shijian].length) {
                            if (window.status == 'skip') {
                                i = 0;
                                galgame.audio.pause();
                                bofang();
                                window.status = '';
                                delete drive.onclick
                            }
                            else {
                                drive.onclick = function () {
                                    this.onclick = false;
                                    i = 0;
                                    galgame.audio.pause();
                                    bofang();
                                }
                            }
                        } else {
                            window.removeEventListener('keydown', skipfun0);
                            window.removeEventListener('keyup', skipfun1);
                            if (window.status == 'skip') {
                                ui.backgroundMusic.play();
                                ui.window.removeChild(beijing);
                                galgame.end();
                                window.status = '';
                                delete drive.onclick
                            }
                            else {
                                drive.onclick = function () {
                                    this.onclick = false;
                                    ui.backgroundMusic.play();
                                    ui.window.removeChild(beijing);
                                    galgame.end();
                                }
                            }
                        }
                    }
                }
                show();
                console.log('++')
                num++;
            }
            bofang();
            game.pause();
        }
    };
    let text = require('./galgame.json')
    for (var i in text) {
        galgame.text[i] = text[i];
    }
    require('./galgame.less')
    game.galgame = galgame;
}