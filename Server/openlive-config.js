import * as fs from 'fs'

export const default_config = {
    "APP_NAME": "OpenLive", //直播平台名称
    "APP_DESCRIPTION": "A opensource live platform", //直播平台简介
    "APP_SUBTITLE": "OpenLive: A fully open source live streaming platform that empowers you to broadcast everything", //直播平台副标题
    "APP_BROWSER_TITLE": "OpenLive", //浏览器页面标题
    "PORT": 80, //直播主页面端口
    "PANEL_PORT": 8080, //直播管理面板端口
    "WS_PORT": 8010, //websocket端口
    "SERVER_PORT_WEBSOCKETSERVER_PUBLIC_DOMAIN_OR_IP": "127.0.0.1:8010",//客户端用于连接websocket所用的网址（带端口，如果没做转发，端口需要与上面的一致）
    "SERVER_QPS_LOCK": 10, //服务器的QPS将最高锁定在多少，目前一般用于检测chat，越高对服务器性能要求越高
    "OPEN_REGISTER": true, //开放账号注册,
    "UI_CUSTOM_CONFIG": {
        "VIEW_CONNECTED_NOTIFY_IN_CHAT": true //在chat里显示已登录用户的进直播间通知
    },
    "LIVESTREAM_CONFIG": {
        "RTMP_PORT": 1935, //RTMP直播推流端口
        "HTTP_FLV_PORT": 8000 //http-flv端口 请不要外泄 一般通过服务端转发访问
    }
}

export function GetConfig(){
    if(fs.existsSync("config.json")){
        console.log("Config System: OK")
        return JSON.parse(fs.readFileSync("config.json"))
    }
    else{
        console.log("Creating default config file...")
        fs.writeFileSync("config.json",JSON.stringify(default_config))
        console.log("Config System: OK")
        return default_config
    }
}