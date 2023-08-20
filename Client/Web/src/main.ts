import { createApp } from 'vue'
import MainPage from './MainPage.vue'
import { app_config } from './config'
import '@/css/theme.css'
import '@/css/video-js.min.css'
import videojs from 'video.js';
import flvjs from 'flv.js';
import 'videojs-flvjs-es6'
import '@material/web/common'
import * as axios from 'axios'

//@ts-ignore
window.videojs = videojs
//@ts-ignore
window.flvjs = flvjs

const mainpage = createApp(MainPage)

mainpage.mount('#app')

document.body.setAttribute("class", "background")

window.onload = function(){
    function wip_alert(){
        alert("该功能暂未开放，请耐心等待")
    }

    axios.default.get(app_config["server_addr"] + "/app_info")
    .then(res => {
        document.title = res.data.browser_title
    })
    .catch(err => {
        console.log(err);
    });

    axios.default.get(app_config["server_addr"] + "/live_info")
    .then(res => {
        console.log(res.data.livestream_addr)
        var player = videojs('live_player_vjs', {
            techOrder: ['html5', 'flvjs'],
            flvjs: {
                mediaDataSource: {
                    isLive: false,
                    cors: true,
                    withCredentials: false,
                },
            },
            sources: [
                {
                    src: res.data.livestream_addr,
                    type: 'video/x-flv'
                }
            ],
            controls: true
        });
        player.load()

        var live_title_object = document.getElementById("live_title")
        var anchor_profile_img_object = document.getElementById("anchor_img")
        var anchor_name_object = document.getElementById("anchor_name")

        //我们傻逼TypeScript是这样的捏
        //@ts-ignore
        live_title_object.innerHTML = res.data.live_title
        //@ts-ignore
        anchor_profile_img_object.setAttribute("src",res.data.anchor_profile_img_url)
        //@ts-ignore
        anchor_name_object.innerHTML = res.data.anchor_name
        //player.src(res.data.livestream_addr)
    })
    .catch(err => {
        console.log(err);
    });
}