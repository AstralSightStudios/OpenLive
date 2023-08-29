import * as fs from 'fs'
import express from 'express'
import { runOpenLiveServer } from "./openlive-server.js"
import { runLiveStreamServer } from "./openlive-livestream-server.js"
import { runWSS } from './openlive-ws-server.js'
import { runPanelServer } from './openlive-panel-server.js'
import { init_account_system } from "./openlive-account-manager.js"
import { PanelGetAccountObjectByUid } from "./openlive-account-manager-panel.js"
import { init_chat } from "./openlive-chat-manager.js"
import { init_panel_save } from "./openlive-panel-server.js"
import * as openlive_config_js from "./openlive-config.js"

const config = openlive_config_js.GetConfig()
global.config = config
const accounts_database = init_account_system()
global.accounts_database = accounts_database
const panel_save = init_panel_save()
global.panel_save = panel_save

global.is_living = false

if(PanelGetAccountObjectByUid(0).USERNAME === "wait_to_set" && PanelGetAccountObjectByUid(0).PASSWORD === "wait_to_set"){
    console.log("初次运行OpenLive，只开启PanelServer")
    runPanelServer()
}
else{
    init_chat()

    runLiveStreamServer(config["LIVESTREAM_CONFIG"]["RTMP_PORT"],config["LIVESTREAM_CONFIG"]["HTTP_FLV_PORT"])
    runWSS()
    runOpenLiveServer()
    runPanelServer()
}