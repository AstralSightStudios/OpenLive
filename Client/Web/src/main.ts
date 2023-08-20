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
        //player.src(res.data.livestream_addr)
    })
    .catch(err => {
        console.log(err);
    });