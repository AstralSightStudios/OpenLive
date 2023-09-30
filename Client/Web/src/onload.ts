import * as axios from 'axios'
import { app_config } from './config'
import flvjs from 'flv.js';
import { StartWSConnect } from './ws_connect'

export function onload_steps() {
    //@ts-ignore
    window.flvjs = flvjs

    axios.default.get(app_config["server_addr"] + "/api/app_info")
        .then(res => {
            document.title = res.data.browser_title;
            (window as any).app_info = res.data
        })
        .catch(err => {
            console.log(err);
        });

    axios.default.get(app_config["server_addr"] + "/api/live_info")
        .then(res => {
            console.log(res.data.livestream_addr)
            if (res.data.live_status) {
                if (flvjs.isSupported()) {
                    var videoElement = document.getElementById('live_player_flvjs');
                    var flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: res.data.livestream_addr
                    });
                    //@ts-ignore
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                }
            }
            else{
                console.log("隐藏播放器")
                //@ts-ignore
                document.getElementById("live_player_flvjs").hidden = true
                //@ts-ignore
                document.getElementById("live_player_no_living_tips").removeAttribute("hidden")
            }

            var live_title_object = document.getElementById("live_title")
            var anchor_profile_img_object = document.getElementById("anchor_img")
            var anchor_name_object = document.getElementById("anchor_name")

            //我们傻逼TypeScript是这样的捏
            //@ts-ignore
            live_title_object.innerHTML = res.data.live_title
            //@ts-ignore
            anchor_profile_img_object.setAttribute("src", res.data.anchor_profile_img_url)
            //@ts-ignore
            anchor_name_object.innerHTML = res.data.anchor_name;
            //player.src(res.data.livestream_addr)

            (window as any).live_info = res.data

            console.log("建立wss连接");

            StartWSConnect()
        })
        .catch(err => {
            console.log(err);
        });
}