import * as fs from 'fs'

export const default_config_livestream = {
    "RTMP_PORT": 1935,
    "HTTP_FLV_PORT": 8000 //http-flv端口 请不要外泄 一般通过服务端转发访问
}

export const default_config = {
    "APP_NAME": "OpenLive",
    "APP_DESCRIPTION": "A opensource live platform",
    "APP_SUBTITLE": "OpenLive: A fully open source live streaming platform that empowers you to broadcast everything",
    "APP_BROWSER_TITLE": "OpenLive",
    "PORT": 80,
    "PANEL_PORT": 8080,
    "LIVESTREAM_CONFIG": default_config_livestream
}

export function GetConfig(){
    if(fs.existsSync("config.json")){
        return JSON.parse(fs.readFileSync("config.json"))
    }
    else{
        fs.writeFileSync("config.json",JSON.stringify(default_config))
        return default_config
    }
}