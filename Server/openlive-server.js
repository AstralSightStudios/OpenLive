import express from 'express'
import * as openlive_config_js from "./openlive-config.js"

export function runOpenLiveServer() {
    const openlive_server = express()
    const config = openlive_config_js.GetConfig()

    openlive_server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // 允许任意来源
        next();
    });

    openlive_server.get('/app_info', function (req, res) {
        res.send(JSON.stringify({
            "name": config["APP_NAME"],
            "browser_title": config["APP_BROWSER_TITLE"],
            "subtitle": config["APP_SUBTITLE"],
            "timestamp": Date.now()
        }))
    })

    openlive_server.get("/live_info", function (req, res){
        res.send(
            JSON.stringify({
                "live_title": "OpenLive Sample", //直播间标题
                "live_description": "OpenLive Testing...", //直播间简介
                "live_status": "now", //now=正在直播 late=到达计划时间但没开播 plan=下次直播时间已计划 empty=没在播也没计划时间
                "live_plan_next_time": "Unknown", //已计划的下次直播时间
                "anchor_name": "嘉然今天吃什么", //主播名称
                "anchor_profile_img_url": "https://i2.hdslb.com/bfs/face/619f378852ebac9fdf87e20418d6f99bfa750c7f.jpg", //主播头像URL
                "login_required": false,  //是否必须要登录才能看直播
                "livestream_type": "http-flv", //直播流类型 hls http-flv webrtc
                "livestream_addr": "http://127.0.0.1:8000/livemystream12345/mystream.flv", //直播流地址
                "enable_chat": true, //是否允许聊天
                "manager_list": [] //房管列表
            })
        )
    })

    console.log("OpenLive Main Server is running now.")

    openlive_server.listen(config["PORT"])
}