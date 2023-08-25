import WebSocket from "ws";
import * as AccountManager from './openlive-account-manager.js'
import * as ChatManager from './openlive-chat-manager.js'

export function runWSS(){
    console.log("WebSocket Server is running now.")

    const ws_client = new WebSocket.Server({
        port: global.config.WS_PORT,
        path: "/ws_connect"
    })

    // 监听 connection 事件
    ws_client.on('connection', function (ws) {
        ws.on('message', function (message) {
            let msg = JSON.parse(message)
            if(msg == undefined){
                ws.close()
            }
            else{
                if(msg.action === "CONNECTED_NOTIFY" && msg.login_info.logged === true && AccountManager.IsVaildAccount(msg.login_info.uid)){
                    if(global.config.UI_CUSTOM_CONFIG.VIEW_CONNECTED_NOTIFY_IN_CHAT){
                        ChatManager.write_connected_notify(msg.login_info.uid)
                    }
                }
                if(msg.action === "LOGIN_REQUEST" && msg.login_info.logged === false){
                    ws.send(JSON.stringify({"resp_action": "LOGIN_REQUEST_RESP" ,"resp": AccountManager.Login(msg.action_data.username,msg.action_data.password)}))
                }
                if(msg.action === "QUIET_LOGIN_REQUEST" && msg.login_info.logged === false){
                    ws.send(JSON.stringify({"resp_action": "QUIET_LOGIN_REQUEST_RESP" ,"resp": AccountManager.TokenLogin(msg.action_data.token)}))
                }
                if(msg.action === "REGISTER_REQUEST" && msg.login_info.logged === false){
                    ws.send(JSON.stringify({"resp_action": "REGISTER_REQUEST_RESP" ,"resp": AccountManager.Register(msg.action_data.username,msg.action_data.password, msg.action_data.display_name)}))
                }
            }
        });

        // 监听 close 事件
        ws.on('close', function () {
            console.log('服务器关闭连接');
        });

        // 监听 error 事件
        ws.on('error', function (error) {
            console.log('服务器发生错误：' + error);
        });
    });
}