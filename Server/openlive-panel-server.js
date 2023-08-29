import express from 'express'
import * as fs from 'fs'
import { sync_account_db_file } from './openlive-account-manager.js'
import { PanelLogin, PanelGetAccountObjectByUid } from './openlive-account-manager-panel.js'

export const default_panel_save = {
    "STREAMKEY": "wait_to_set",
    "LIVE_TITLE": "N/A",
    "LIVE_PLAN_NEXT_PLAN": "N/A",
    "ANCHOR_NAME": "N/A",
    "ANCHOR_PROFILE_IMG_URL": "N/A",
    "LOGIN_REQUIRED": false,
    "ENABLE_CHAT": true,
    "LIVESTREAM_TYPE": "http-flv",
    "MANAGER_LIST": []
}

export function init_panel_save() {
    if (fs.existsSync("panel_save.json")) {
        return JSON.parse(fs.readFileSync("panel_save.json"))
    }
    else {
        fs.writeFileSync("panel_save.json", JSON.stringify(default_panel_save))
        return default_panel_save
    }
}

export function sync_panel_save_file() {
    fs.writeFileSync("panel_save.json", JSON.stringify(global.panel_save))
}

export function runPanelServer() {
    const openlive_panel_server = express()

    openlive_panel_server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    openlive_panel_server.get("/:filename", function (req, res) {
        var filename = req.params.filename

        res.send(fs.readFileSync("webpanel/" + filename).toString())
    })

    openlive_panel_server.get("/", function (req, res) {
        if (PanelGetAccountObjectByUid(0).USERNAME === "wait_to_set" && PanelGetAccountObjectByUid(0).PASSWORD === "wait_to_set") {
            res.send(fs.readFileSync("webpanel/" + "firstrun_step.html").toString())
        }
        else {
            res.send(fs.readFileSync("webpanel/" + "index.html").toString())
        }
    })

    openlive_panel_server.get("/panel_api/checklive", function (req, res) {
        res.send(JSON.stringify({
            "status": true
        }))
    })

    openlive_panel_server.post("/panel_api/login", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            res.send(PanelLogin(post_body.username, post_body.password))
        })
    })

    openlive_panel_server.post("/panel_api/update_streamkey", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            if (global.ALLOW_TOKENS[post_body.token] != void (0) && global.ALLOW_TOKENS[post_body.token] != undefined && post_body.new_streamkey != "" && post_body.new_streamkey != null && post_body.new_streamkey != undefined) {
                global.panel_save.STREAMKEY = post_body.new_streamkey
                sync_panel_save_file()
                res.send(JSON.stringify({
                    "status": true,
                    "msg": "推流码修改成功"
                }))
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "post内容不符合要求或token已失效"
                }))
            }
        })
    })

    openlive_panel_server.post("/panel_api/clear_chat", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            if (global.ALLOW_TOKENS[post_body.token] != void (0) && global.ALLOW_TOKENS[post_body.token] != undefined) {
                fs.writeFileSync("chat_area_div_content.html","")
                res.send(JSON.stringify({
                    "status": true,
                    "msg": "chat内容已清除"
                }))
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "post内容不符合要求或token已失效"
                }))
            }
        })
    })

    openlive_panel_server.post("/panel_api/emergency_shutdown", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            if (global.ALLOW_TOKENS[post_body.token] != void (0) && global.ALLOW_TOKENS[post_body.token] != undefined) {
                process.exit(0)
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "post内容不符合要求或token已失效"
                }))
            }
        })
    })

    openlive_panel_server.post("/panel_api/update_livepage", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            if (global.ALLOW_TOKENS[post_body.token] != void (0) && global.ALLOW_TOKENS[post_body.token] != undefined) {
                global.panel_save.LIVE_TITLE = post_body.livetitle
                global.panel_save.ANCHOR_NAME = post_body.anchor_name
                global.panel_save.ANCHOR_PROFILE_IMG_URL = post_body.anchor_profile_img_url
                global.panel_save.ENABLE_CHAT = post_body.can_chat
                sync_panel_save_file()
                res.send(JSON.stringify({
                    "status": true,
                    "msg": "直播页面选项修改成功"
                }))
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "post内容不符合要求或token已失效"
                }))
            }
        })
    })

    openlive_panel_server.post("/panel_api/get_serv_info", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            let post_body = JSON.parse(rawData)
            if (global.ALLOW_TOKENS[post_body.token] != void (0) && global.ALLOW_TOKENS[post_body.token] != undefined) {
                res.send(JSON.stringify({
                    "is_living": global.is_living,
                    "streamkey": global.panel_save.STREAMKEY,
                    "livetitle": global.panel_save.LIVE_TITLE,
                    "anchorname": global.panel_save.ANCHOR_NAME,
                    "anchorprofileimgurl": global.panel_save.ANCHOR_PROFILE_IMG_URL,
                    "can_chat": global.panel_save.ENABLE_CHAT
                }))
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "post内容不符合要求或token已失效"
                }))
            }
        })
    })

    openlive_panel_server.post("/panel_api/first_step_confirm_panel_settings", function (req, res) {
        // 定义一个变量来存储请求体中的原始数据
        let rawData = '';
        // 监听data事件，将接收到的数据拼接到rawData变量中
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // 监听end事件，表示数据接收完毕，打印rawData变量
        req.on('end', () => {
            console.log(rawData)
            let post_body = JSON.parse(rawData)
            if (post_body.username != "wait_to_set" && post_body.password != "wait_to_set" && post_body.streamkey != "wait_to_set") {
                if (PanelGetAccountObjectByUid(0).USERNAME === "wait_to_set" && PanelGetAccountObjectByUid(0).PASSWORD === "wait_to_set") {
                    PanelGetAccountObjectByUid(0).USERNAME = post_body.username
                    PanelGetAccountObjectByUid(0).PASSWORD = post_body.password
                    global.panel_save.STREAMKEY = post_body.streamkey
                    sync_account_db_file()
                    sync_panel_save_file()
                    res.send(JSON.stringify({
                        "status": true,
                        "msg": "操作成功，OpenLive服务端将关闭，请手动重新运行以继续"
                    }))
                    process.exit(0)
                }
                else {
                    res.send(JSON.stringify({
                        "status": false,
                        "msg": "调用了未开放的API, 你可能已经执行过初始设置或手动更改了accounts.json来初始化PANEL账号"
                    }))
                }
            }
            else {
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "内容不符合要求或存在非法字符"
                }))
            }
        });
    })

    console.log("OpenLive Panel Server is running now.")

    openlive_panel_server.listen(global.config["PANEL_PORT"])
}