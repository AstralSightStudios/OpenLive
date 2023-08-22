import * as fs from 'fs'
import * as AccountManager from './openlive-account-manager'

export function anti_xss_replace(message){
    message = message.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/&/gi, "&amp;").replace(/"/gi, "&quot;").replace(/'/gi, "&#x27;").replace(/\//gi, "&#x2F;")
    return message
}

export function write_connected_notify(uid){
    fs.appendFileSync("chat_area_div_content.html","用户 " + AccountManager.GetAccountObjectByUid(uid).DISPLAY_NAME + " 进入直播间<br/>")
}

export function write_message(message,uid){
    messgae = anti_xss_replace(message)
    fs.appendFileSync("chat_area_div_content.html",AccountManager.GetAccountObjectByUid(uid).DISPLAY_NAME + ": " + message + "<br/>")
}

export function init_chat(){
    if(!fs.existsSync("chat_area_div_content.html")){
        fs.writeFileSync("chat_area_div_content.html","")
    }
}