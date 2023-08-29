import express from 'express'
import * as fs from 'fs'
import { sync_account_db_file } from './openlive-account-manager.js'
import { PanelLogin } from './openlive-account-manager-panel.js'

export const default_panel_save = {
    "STREAMKEY": "wait_to_set"
}

export function init_panel_save(){
    if(fs.existsSync("panel_save.json")){
        return JSON.parse(fs.readFileSync("panel_save.json"))
    }
    else{
        fs.writeFileSync("panel_save.json",JSON.stringify(default_panel_save))
        return default_panel_save
    }
}

export function sync_panel_save_file(){
    fs.writeFileSync("panel_save.json",JSON.stringify(global.panel_save))
}

export function runPanelServer(){
    const openlive_panel_server = express()

    openlive_panel_server.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    openlive_panel_server.get("/:filename",function(req,res){
        var filename = req.params.filename

        res.send(fs.readFileSync("webpanel/" + filename).toString())
    })

    openlive_panel_server.get("/",function(req,res){
        res.send(fs.readFileSync("webpanel/" + "index.html").toString())
    })

    openlive_panel_server.get("/panel_api/checklive",function(req,res){
        res.send(JSON.stringify({
            "status": true
        }))
    })

    openlive_panel_server.post("/panel_api/login",function(req,res){
        let post_body = JSON.parse(req.body)
        res.send(PanelLogin(post_body.username, post_body.password))
    })

    openlive_panel_server.post("update_streamkey",function(req,res){
        let post_body = JSON.parse(req.body)
        if (global.ALLOW_TOKENS[post_body.token] && post_body.new_streamkey != "" && post_body.new_streamkey != null && post_body.new_streamkey != undefined){
            global.panel_save.STREAMKEY = post_body.new_streamkey
            sync_panel_save_file()
        }
        else{
            res.send(JSON.stringify({
                "status": false,
                "msg": "post内容不符合要求或token已失效"
            }))
        }
    })

    openlive_panel_server.post("/panel_api/first_step_confirm_panel_settings", function(req,res){
        let post_body = JSON.parse(req.body)
        if(post_body.username != "wait_to_set" && post_body.password != "wait_to_set" && post_body.streamkey != "wait_to_set"){
            if(PanelGetAccountObjectByUid(0).USERNAME === "wait_to_set" && PanelGetAccountObjectByUid(0).PASSWORD === "wait_to_set"){
                PanelGetAccountObjectByUid(0).USERNAME = post_body.username
                PanelGetAccountObjectByUid(0).PASSWORD = post_body.password
                global.panel_save.STREAMKEY
                sync_account_db_file()
                sync_panel_save_file()
            }
            else{
                res.send(JSON.stringify({
                    "status": false,
                    "msg": "调用了未开放的API, 你可能已经执行过初始设置或手动更改了accounts.json来初始化PANEL账号"
                }))
            }
        }
        else{
            res.send(JSON.stringify({
                "status": false,
                "msg": "内容不符合要求或存在非法字符"
            }))
        }
    })

    console.log("OpenLive Panel Server is running now.")

    openlive_panel_server.listen(global.config["PANEL_PORT"])
}