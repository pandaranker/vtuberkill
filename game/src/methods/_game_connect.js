let { game, ui, get, ai, lib, _status } = vkCore
/**联机类game方法 */
module.exports = {
    waitForPlayer: function (func) {
        var next = game.createEvent('waitForPlayer', false);
        next.func = func;
        next.setContent('waitForPlayer');
    },
    countDown: function (time, onEnd) {
        time = parseInt(time);
        if (!time) return;
        if (time <= 0) return;
        var current = time;
        ui.timer.set(current, 1);
        _status.countDown = setInterval(function () {
            if (--current) {
                ui.timer.set(current, current / time);
            }
            else {
                ui.timer.set(0, 0);
                clearInterval(_status.countDown);
                delete _status.countDown;
                if (onEnd) onEnd();
            }
        }, 1000);
    },
    countChoose: function (clear) {
        if (_status.imchoosing) {
            return;
        }
        _status.imchoosing = true;
        if (_status.connectMode && !_status.countDown) {
            ui.timer.show();
            var num;
            //这么一大行都是为了祢衡
            if (_status.event && _status.event.name == 'chooseToUse' && _status.event.type == 'phase' &&
                _status.event.player && _status.event.player.forceCountChoose &&
                typeof _status.event.player.forceCountChoose.phaseUse == 'number') {
                num = _status.event.player.forceCountChoose.phaseUse;
            }
            else if (_status.connectMode) {
                num = lib.configOL.choose_timeout;
                if (ui.arena && ui.arena.classList.contains('choose-character') && lib.configOL.chooseCharacter_timeout) {
                    num = parseInt(num) * 5;
                }
            }
            else {
                num = get.config('choose_timeout');
            }
            game.countDown(parseInt(num), function () {
                ui.click.auto();
                ui.timer.hide();
            });
            if (!game.online && game.me) {
                if (_status.event.getParent().skillHidden) {
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].showTimer();
                    }
                    game.me._hide_all_timer = true;
                }
                else if (!_status.event._global_waiting) {
                    game.me.showTimer();
                }
            }
        }
        else if (_status.event.player.forceCountChoose && _status.event.isMine() && !_status.countDown) {
            var info = _status.event.player.forceCountChoose;
            var num;
            if (_status.event.name == 'chooseToUse' && _status.event.type == 'phase' && typeof info.phaseUse == 'number') {
                num = info.phaseUse;
            }
            else if (typeof info[_status.event.name] == 'number') {
                num = info[_status.event.name]
            }
            else if (info.default) {
                num = info.default;
            }
            else return;
            var finish = function () {
                if (_status.event.endButton) {
                    if (_status.event.skill) {
                        ui.click.cancel();
                    }
                    ui.click.cancel();
                }
                else {
                    if (ui.confirm && ui.confirm.str) {
                        if (ui.confirm.str.indexOf('c') != -1) {
                            ui.click.cancel();
                        }
                        else if (ui.confirm.str.indexOf('o') != -1) {
                            ui.click.ok();
                        }
                    }
                    else if (['chooseControl', 'chooseBool'].contains(_status.event.name) && _status.paused) {
                        _status.event.result = 'ai';
                        game.resume();
                    }
                    else {
                        ui.click.auto('forced');
                        setTimeout(function () {
                            ui.click.auto('forced');
                        }, 200);
                    }
                }
                ui.timer.hide();
            };
            if (!num) {
                ui.timer.hide();
                game.uncheck();
                setTimeout(finish, 200);
            }
            else {
                ui.timer.show();
                game.countDown(num, finish);
            }
        }
    },
    stopCountChoose: function () {
        if (_status.countDown) {
            clearInterval(_status.countDown);
            delete _status.countDown;
            ui.timer.hide();
        }
        if (_status.connectMode && !game.online && game.me) {
            if (game.me._hide_all_timer) {
                delete game.me._hide_all_timer;
                for (var i = 0; i < game.players.length; i++) {
                    game.players[i].hideTimer();
                }
            }
            else if (!_status.event._global_waiting) {
                game.me.hideTimer();
            }
        }
    },
    connect: function (ip, callback) {
        if (game.online) return;
        var withport = false;
        var index = ip.lastIndexOf(':');
        if (index != -1) {
            index = parseFloat(ip.slice(index + 1));
            if (index && Math.floor(index) == index) {
                withport = true;
            }
        }
        if (!withport) {
            //ip=ip+':8080';
            if ('https:' != document.location.protocol)
                ip = ip + ':8080';
        }
        _status.connectCallback = callback;
        try {
            if (game.ws) {
                game.ws._nocallback = true;
                game.ws.close();
                delete game.ws;
            }
            var ishttps = 'https:' == document.location.protocol ? true : false;
            if (ishttps) {
                //alert("这是一个https请求");
                game.ws = new WebSocket('wss://' + ip + '/wss/');
            } else {
                //alert("这是一个http请求");
                game.ws = new WebSocket('ws://' + ip + '');
            }
            //game.ws=new WebSocket('ws://'+ip+'');
        }
        catch (e) {
            alert('错误：无效联机地址');
            if (callback) {
                callback(false);
            }
            return;
        }
        game.ws.onopen = lib.element.ws.onopen;
        game.ws.onmessage = lib.element.ws.onmessage;
        game.ws.onerror = lib.element.ws.onerror;
        game.ws.onclose = lib.element.ws.onclose;
        _status.ip = ip;
    },
    send: function () {
        if (game.observe && arguments[0] != 'reinited') return;
        if (game.ws) {
            var args = Array.from(arguments);
            if (typeof args[0] == 'function') {
                args.unshift('exec');
            }
            game.ws.send(JSON.stringify(get.stringifiedResult(args)));
        }
    },
    sendTo: function (id, message) {
        var ws = { wsid: id };
        for (var i in lib.element.nodews) {
            ws[i] = lib.element.nodews[i];
        }
        var client = {
            ws: ws,
            id: ws.wsid,
            closed: false
        };
        for (var i in lib.element.client) {
            client[i] = lib.element.client[i];
        }
        client.send(message);
    },
}