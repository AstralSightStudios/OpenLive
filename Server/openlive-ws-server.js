import WebSocket from "ws";
import * as AccountManager from './openlive-account-manager'

const ws_client = new WebSocket.Server({
    port: 8010,
    path: "/ws_connect"
})

// 监听 connection 事件
ws_client.on('connection', function (ws) {
    ws.on('message', function (message) {
        msg = null
        try{
            msg = JSON.parse(message)
        }
        catch{
            ws.send("bad_msg")
        }
        if(msg == null){
            ws.close()
        }
        else{
            if(msg.action = "CONNECTED_NOTIFY" && msg.login_info.logged == true && AccountManager.IsVaildAccount(msg.login_info.uid)){
                if(global.config.UI_CUSTOM_CONFIG.VIEW_CONNECTED_NOTIFY_IN_CHAT){
                    
                }
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

console.log(global.test_global)