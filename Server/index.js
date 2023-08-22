import * as fs from 'fs'
import express from 'express'
import { runOpenLiveServer } from "./openlive-server.js"
import { runLiveStreamServer } from "./openlive-livestream-server.js"
import { init_account_system } from "./openlive-account-manager.js"
import { init_chat } from "./openlive-chat-manager.js"
import * as openlive_config_js from "./openlive-config.js"

const config = openlive_config_js.GetConfig()
global.config = config
const accounts_database = init_account_system()
global.accounts_database = accounts_database

init_chat()

runLiveStreamServer(config["LIVESTREAM_CONFIG"]["RTMP_PORT"],config["LIVESTREAM_CONFIG"]["HTTP_FLV_PORT"])
runOpenLiveServer()