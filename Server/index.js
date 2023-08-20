import * as fs from 'fs'
import express from 'express'
import { runOpenLiveServer } from "./openlive-server.js"
import { runLiveStreamServer } from "./openlive-livestream-server.js"
import * as openlive_config_js from "./openlive-config.js"

const config = openlive_config_js.GetConfig()

runLiveStreamServer(config["LIVESTREAM_CONFIG"]["RTMP_PORT"],config["LIVESTREAM_CONFIG"]["HTTP_FLV_PORT"])
runOpenLiveServer()