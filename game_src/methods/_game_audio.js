let { game, ui, get, ai, lib, _status } = vkCore
/**音效类game方法 */
module.exports = {
    clickAudio: (...args) => {
        if (lib.config.volumn_click === 0) return;
        var str = '';
        var onerror = null;
        for (let i of args) {
            if (typeof i === 'string' || typeof i == 'number') {
                str += '/' + i;
            }
            else if (typeof i == 'function') {
                onerror = i
            }
        }
        if (!lib.config.repeat_audio && _status.skillaudio.contains(str)) return;
        _status.skillaudio.add(str);
        setTimeout(function () {
            _status.skillaudio.remove(str);
        }, 200);
        var audio = document.createElement('audio');
        audio.autoplay = true;
        audio.volume = lib.config.volumn_click / 8;
        if (str.indexOf('.mp3') != -1 || str.indexOf('.ogg') != -1 || str.indexOf('.wav') != -1) {
            audio.src = lib.assetURL + 'audio/click' + str;
        }
        else {
            audio.src = lib.assetURL + 'audio/click' + str + '.mp3';
        }
        audio.addEventListener('ended', function () {
            this.remove();
        });
        audio.onerror = function () {
            if (this._changed) {
                this.remove();
                if (onerror) {
                    onerror();
                }
            }
        };
        document.body.appendChild(audio);
        return audio;
    },
    playAudio: () => {
        if (lib.config.volumn_audio === 0) return;
        if (_status.video && arguments[1] != 'video') return;
        var str = '';
        var onerror = null;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === 'string' || typeof arguments[i] == 'number') {
                str += '/' + arguments[i];
            }
            else if (typeof arguments[i] == 'function') {
                onerror = arguments[i]
            }
            if (_status.video) break;
        }
        if (!lib.config.repeat_audio && _status.skillaudio.contains(str)) return;
        _status.skillaudio.add(str);
        game.addVideo('playAudio', null, str);
        setTimeout(function () {
            _status.skillaudio.remove(str);
        }, 1000);
        var audio = document.createElement('audio');
        audio.autoplay = true;
        audio.volume = lib.config.volumn_audio / 8;
        if (str.indexOf('.mp3') != -1 || str.indexOf('.ogg') != -1) {
            audio.src = lib.assetURL + 'audio' + str;
        }
        else {
            audio.src = lib.assetURL + 'audio' + str + '.mp3';
        }
        audio.addEventListener('ended', function () {
            this.remove();
        });
        audio.onerror = function () {
            // if (this._changed) {
            this.remove();
            if (onerror) {
                onerror();
            }
            // }
            // else {
            //     this.src = lib.assetURL + 'audio' + str + '.ogg';
            //     this._changed = true;
            // }
        };
        ui.window.appendChild(audio);
        return audio;
    },
    trySkillAudio: (skill, player, directaudio) => {
        game.broadcast(game.trySkillAudio, skill, player, directaudio);
        var info = get.info(skill);
        if (!info)
            return;
        if ((!info.direct || directaudio) && lib.config.background_speak &&
            (!lib.skill.global.contains(skill) || lib.skill[skill].forceaudio)) {
            var audioname = skill;
            if (info.audioname2 && info.audioname2[player.name]) {
                audioname = info.audioname2[player.name];
                info = lib.skill[audioname];
            }
            var audioinfo = info.audio;
            if (typeof audioinfo == 'string' && lib.skill[audioinfo]) {
                audioname = audioinfo;
                audioinfo = lib.skill[audioname].audio;
            }
            if (typeof audioinfo == 'string') {
                if (audioinfo.indexOf('ext:') == 0) {
                    audioinfo = audioinfo.split(':');
                    if (audioinfo.length == 3) {
                        if (audioinfo[2] == 'true') {
                            game.playAudio('..', 'extension', audioinfo[1], audioname);
                        }
                        else {
                            audioinfo[2] = parseInt(audioinfo[2]);
                            if (audioinfo[2]) {
                                game.playAudio('..', 'extension', audioinfo[1], audioname + Math.ceil(audioinfo[2] * Math.random()));
                            }
                        }
                    }
                    return;
                }
            }
            else if (Array.isArray(audioinfo)) {
                audioname = audioinfo[0];
                audioinfo = audioinfo[1];
            }
            if (Array.isArray(info.audioname) && player) {
                if (info.audioname.contains(player.name)) {
                    audioname += '_' + player.name;
                }
                else if (info.audioname.contains(player.name1)) {
                    audioname += '_' + player.name1;
                }
                else if (info.audioname.contains(player.name2)) {
                    audioname += '_' + player.name2;
                }
            }
            if (typeof audioinfo == 'number') {
                console.log(audioname);
                game.playAudio('skill', audioname + Math.ceil(audioinfo * Math.random()));
            }
            else if (audioinfo) {
                game.playAudio('skill', audioname);
            }
            else if (true && info.audio !== false) {
                game.playSkillAudio(audioname);
            }
        }
    },
    playSkillAudio: (name, index) => {
        if (_status.video && arguments[1] != 'video') return;
        if (!lib.config.repeat_audio && _status.skillaudio.contains(name)) return;
        game.addVideo('playSkillAudio', null, name);
        if (name.indexOf('|') < name.lastIndexOf('|')) {
            name = name.slice(name.lastIndexOf('|') + 1);
        }
        _status.skillaudio.add(name);
        setTimeout(function () {
            _status.skillaudio.remove(name);
        }, 1000);
        var str = 'audio/skill/';
        var audio = document.createElement('audio');
        audio.autoplay = true;
        audio.volume = lib.config.volumn_audio / 8;
        audio.src = lib.assetURL + str + name + '.mp3';
        audio.addEventListener('ended', function () {
            this.remove();
        });
        if (typeof index != 'number') {
            index = Math.ceil(Math.random() * 2);
        }
        audio._changed = 1;
        audio.onerror = function () {
            switch (this._changed) {
                case 1: {
                    // audio.src = lib.assetURL + str + name + '.ogg';
                    this._changed = 2;
                    break;
                }
                case 2: {
                    audio.src = lib.assetURL + str + name + index + '.mp3';
                    this._changed = 3;
                    break;
                }
                case 3: {
                    // audio.src = lib.assetURL + str + name + index + '.ogg';
                    this._changed = 4;
                    break;
                }
                default: {
                    this.remove();
                }
            }
        };
        ui.window.appendChild(audio);
    },
    playBackgroundMusic: () => {
        if (lib.config.background_music == 'music_off') {
            ui.backgroundMusic.src = '';
        }
        else if (_status._aozhan == true && lib.config.mode_config.guozhan.aozhan_bgm != 'disabled') {
            var aozhan = lib.config.mode_config.guozhan.aozhan_bgm;
            ui.backgroundMusic.src = lib.assetURL + 'audio/background/aozhan_' + aozhan + '.mp3';
        }
        else {
            var music = lib.config.background_music;
            if (music == 'music_random') {
                music = lib.config.all.background_music.randomGet('music_off', 'music_random', _status.currentMusic);
            }
            _status.currentMusic = music;
            if (music == 'music_custom') {
                if (lib.config.background_music_src) {
                    ui.backgroundMusic.src = lib.config.background_music_src;
                }
            }
            else {
                ui.backgroundMusic.src = lib.assetURL + 'audio/background/' + music + '.mp3';
            }
        }
    },
}