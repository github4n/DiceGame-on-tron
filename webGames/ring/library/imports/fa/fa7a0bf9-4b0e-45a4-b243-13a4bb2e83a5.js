"use strict";
cc._RF.push(module, 'fa7a0v5Sw5FpLJDE6S7LoOl', 'ListView');
// Script/ListView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        //scrollview的view剪裁节点
        view: cc.Node,
        //scrollview的具体装载item的node
        list: cc.Node,
        //item的prefab
        itemPrefab: cc.Prefab,
        //item的间隔
        spacingX: 0,
        bgAudio: {
            default: null,
            type: cc.AudioClip
        },
        a1: {
            default: null,
            type: cc.AudioClip
        },
        a2: {
            default: null,
            type: cc.AudioClip
        },
        a3: {
            default: null,
            type: cc.AudioClip
        },
        a4: {
            default: null,
            type: cc.AudioClip
        },
        ad: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        var self = this;
        window.addEventListener('message', function (event) {
            console.log('receive message listener', event.data);

            if (JSON.stringify(event.data).indexOf('cmd') == -1) {
                return;
            }

            var data = JSON.parse(event.data);
            if (data.cmd === 'startBet') {
                self.startBet(Number(data.id), Number(data.retainTimes), data.lang);
            } else if (data.cmd === 'getBetting') {
                var parent = self.node.parent;
                for (var i = 0; i < 4; i++) {
                    //console.log("====" + data.bet[i].total + " " + data.bet[i].show)
                    parent.getChildByName('label' + (i + 1).toString()).getComponent(cc.Label).string = "TOTAL:" + data.bet[i].total;
                    self._canClick[i] = data.bet[i].show;
                }
            } else if (data.cmd === 'on_hide') {
                cc.audioEngine.stopAll();
                self._pause = true;
            } else if (data.cmd === 'on_show') {
                var music = cc.sys.localStorage.getItem("CloseMusic");
                if (music == 0 || music == null) {
                    cc.sys.localStorage.setItem("CloseMusic", 1); //1-开启；2-关闭
                    cc.audioEngine.play(self.bgAudio, true, 1);
                } else if (music == 1) {
                    cc.audioEngine.play(self.bgAudio, true, 1);
                } else if (music == 2) {
                    cc.audioEngine.stopAll();
                }
                self._pause = false;
            } else if (data.cmd === 'switchAudio') {
                var music = cc.sys.localStorage.getItem("CloseMusic");
                if (data.isOpen == 1 && music != 1) {
                    cc.sys.localStorage.setItem("CloseMusic", 1); //1-开启；2-关闭
                    cc.audioEngine.play(self.bgAudio, true, 1);
                } else if (data.isOpen == 0 && music == 1) {
                    cc.audioEngine.stopAll();
                    cc.sys.localStorage.setItem("CloseMusic", 2); //1-开启；2-关闭
                }
            }
        });

        /*let context = cc.sys.__audioSupport.context;
        if (context.state === 'suspended') {
            cc.audioEngine.resumeAll();
        } else {
            //cc.audioEngine.playMusic(this.bgAudio, true);
            cc.audioEngine.play(this.bgAudio, true, 1);
        }*/
    },
    start: function start() {
        var music = cc.sys.localStorage.getItem("CloseMusic");
        if (music == 0 || music == null) {
            cc.sys.localStorage.setItem("CloseMusic", 1); //1-开启；2-关闭
            cc.audioEngine.play(this.bgAudio, true, 1);
        } else if (music == 1) {
            cc.audioEngine.play(this.bgAudio, true, 1);
        } else if (music == 2) {
            cc.audioEngine.stopAll();
        }
        this._pause = false;

        //预加载的item的数据
        this.data = [3, 1, 2, 1, 3, 4, 2, 1, 2, 1, 3, 1, 2, 1, 2, 1, 3, 1, 2, 1, 3, 1, 2, 1, 2, 1, 3, 1, 2, 1, 2, 1];
        //创建的item节点的数组
        this._curId = 0;

        this.init();
        this._click = 0;

        this._canClick = [1, 1, 1, 1];
    },
    init: function init() {
        //保存高度
        var width = 0;
        //创建item 
        var item = cc.instantiate(this.itemPrefab);
        width = item.width;

        for (var i = 0; i < this.data.length * 6; ++i) {
            item.getChildByName('image').getComponent(cc.Sprite).spriteFrame = this.node.parent.getChildByName(this.data[i % this.data.length].toString()).getComponent(cc.Sprite).spriteFrame;
            /*if (this.data[i%this.data.length] == 1){
                item.getChildByName('image').color = new cc.color(0,233,225,255)
            } else if (this.data[i%this.data.length] == 2){
                item.getChildByName('image').color = new cc.color(130,126,241,255)
            } else if (this.data[i%this.data.length] == 4){
                item.getChildByName('image').color = new cc.color(255,197,89,255)
            }*/

            //记录一下itemid
            item.__itemID = i;
            //加入item节点到scrollview的list里面
            this.list.addChild(item);
            item = cc.instantiate(this.itemPrefab);
        }
    },
    startBet: function startBet(id, retainTimes, lang) {
        if (this._pause) {
            window.parent.postMessage({
                cmd: "animateOver"
            }, "*");
            return;
        }

        var item = cc.instantiate(this.itemPrefab);
        var width = item.width;

        var circle = 2 + Math.floor(Math.random() * 4) % 2;
        /*let id = 0;
        this._click++
        if (this._click == 1) id = 1
        else if (this._click == 2) id = 2
        else if (this._click == 3) id = 1
        else if (this._click == 4) id = 0*/

        var parent = this.node.parent;

        if (this._isRun) {
            this.list.stopAllActions();
            this.list.x = -this.view.width / 2 - id * width;
            this._curId = id;

            var icon1 = parent.getChildByName("icon1");
            icon1.stopAllActions();
            icon1.opacity = 255;

            for (var k = 1; k <= 4; k++) {
                var curIdImage = parent.getChildByName("p" + k.toString());
                curIdImage.position = cc.v2(1000, 0);
            }
            parent.getChildByName("blackMask").active = false;

            this.resetFrame();
        } else {
            this._isRun = true;
        }

        parent.getChildByName("icon1").runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.3).easing(cc.easeIn(0.2)), cc.fadeIn(0.3).easing(cc.easeIn(0.2)))));

        if (cc.sys.localStorage.getItem("CloseMusic") == 1) this.ad_ = cc.audioEngine.playEffect(this.ad, true);

        var self = this;
        this.list.runAction(cc.sequence(cc.moveBy(1 * circle, cc.v2(32 * -width * circle - width * id + self._curId * width, 0)).easing(cc.easeOut(circle * 1)), cc.callFunc(function (target) {
            cc.audioEngine.stopAllEffects();

            parent.getChildByName('icon2').getComponent(cc.Sprite).spriteFrame = parent.getChildByName('i' + self.data[id].toString()).getComponent(cc.Sprite).spriteFrame;

            var icon1 = parent.getChildByName("icon1");
            icon1.stopAllActions();
            icon1.opacity = 255;

            parent.getChildByName("blackMask").active = true;

            self.resetFrame();

            var music = cc.sys.localStorage.getItem("CloseMusic");
            if (self.data[id] == 1 && music == 1) {
                cc.audioEngine.playEffect(self.a1, false);
            } else if (self.data[id] == 2 && music == 1) {
                cc.audioEngine.playEffect(self.a2, false);
            } else if (self.data[id] == 3 && music == 1) {
                cc.audioEngine.playEffect(self.a3, false);
            } else if (self.data[id] == 4 && music == 1) {
                cc.audioEngine.playEffect(self.a4, false);
            }

            var curIdImage = parent.getChildByName("p" + self.data[id].toString());
            if (lang == "en") {
                curIdImage = parent.getChildByName("ep" + self.data[id].toString());
            }
            curIdImage.position = cc.v2(0, 0);
            curIdImage.opacity = 0;
            curIdImage.scale = 0.1;
            curIdImage.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.3, 1.0), cc.fadeIn(0.3)), cc.delayTime(3), cc.callFunc(function () {
                curIdImage.position = cc.v2(1000, 0);
                parent.getChildByName("blackMask").active = false;

                self._isRun = null;
                window.parent.postMessage({
                    cmd: "animateOver"
                }, "*");

                self.list.x = self.list.x + self.data.length * circle * width;
            })));

            self._curId = id;
        })));
    },
    resetFrame: function resetFrame() {
        var parent = this.node.parent;
        for (var k = 1; k <= 4; k++) {
            var kFrame = parent.getChildByName("k" + k.toString());
            kFrame.active = false;
        }
    },
    click_1: function click_1(evt) {
        if (this._canClick[0] == 0) return;

        window.parent.postMessage({
            cmd: "selCare",
            careType: "2X"
        }, "*");

        this.resetFrame();
        var kFrame = this.node.parent.getChildByName("k1");
        kFrame.active = true;
    },
    click_2: function click_2(evt) {
        if (this._canClick[1] == 0) return;

        window.parent.postMessage({
            cmd: "selCare",
            careType: "3X"
        }, "*");

        this.resetFrame();
        var kFrame = this.node.parent.getChildByName("k2");
        kFrame.active = true;
    },
    click_3: function click_3(evt) {
        if (this._canClick[2] == 0) return;

        window.parent.postMessage({
            cmd: "selCare",
            careType: "5X"
        }, "*");

        this.resetFrame();
        var kFrame = this.node.parent.getChildByName("k3");
        kFrame.active = true;
    },
    click_4: function click_4(evt) {
        if (this._canClick[3] == 0) return;

        window.parent.postMessage({
            cmd: "selCare",
            careType: "30X"
        }, "*");

        this.resetFrame();
        var kFrame = this.node.parent.getChildByName("k4");
        kFrame.active = true;
    }
});

cc._RF.pop();