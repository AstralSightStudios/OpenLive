import express from 'express'

export function runOpenLiveServer() {
    const openlive_server = express()
    const config = global.config

    // 定义一个转发的中间件函数
    function forwardStream(req, res, next) {
        // 获取请求的路径
        const path = req.path;
        if (path === '/stream.flv') {
            res.redirect("http://127.0.0.1:" + global.config.LIVESTREAM_CONFIG.HTTP_FLV_PORT + "/openlive/" + global.panel_save.STREAMKEY + ".flv");
        } else {
            // 否则，继续执行下一个中间件函数
            next();
        }
    }

    openlive_server.use(forwardStream)

    openlive_server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // 允许任意来源
        next();
    });

    openlive_server.get("/:filename", function (req, res) {
        var filename = req.params.filename

        res.send(fs.readFileSync("www/" + filename).toString())
    })

    openlive_server.get("/", function (req, res) {
        res.send(fs.readFileSync("www/" + "index.html").toString())
    })

    openlive_server.get('/api/app_info', function (req, res) {
        res.send(JSON.stringify({
            "name": config["APP_NAME"],
            "browser_title": config["APP_BROWSER_TITLE"],
            "subtitle": config["APP_SUBTITLE"],
            "timestamp": Date.now()
        }))
    })

    openlive_server.get("/api/live_info", function (req, res) {
        res.send(
            JSON.stringify({
                "live_title": global.panel_save.LIVE_TITLE, //直播间标题
                "live_description": "OpenLive Testing...", //直播间简介
                "live_status": global.is_living,
                "live_plan_next_time": "Unknown", //已计划的下次直播时间
                "anchor_name": global.panel_save.ANCHOR_NAME, //主播名称
                "anchor_profile_img_url": global.panel_save.ANCHOR_PROFILE_IMG_URL, //主播头像URL
                "login_required": false,  //是否必须要登录才能看直播
                "livestream_type": "http-flv", //直播流类型 hls http-flv webrtc
                "livestream_addr": "./stream.flv", //直播流地址
                "websocket_addr": "ws://" + global.config.SERVER_PORT_WEBSOCKETSERVER_PUBLIC_DOMAIN_OR_IP + "/ws_connect",
                "enable_chat": global.panel_save.ENABLE_CHAT, //是否允许聊天
                "manager_list": [] //房管列表
            })
        )
    })

    console.log("OpenLive Main Server is running now.")

    openlive_server.listen(config["PORT"])
}