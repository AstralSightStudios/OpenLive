//import WebSocket from 'ws'
import { show_error_dialog, show_info_dialog, close_login_dialog, refresh_ui_userinfo, close_register_setname_dialog } from './universal_commands'
import { getCookie, setCookie } from '@/cookie_tools'

export function BuildWSMessage(action: string, action_data: any) {
    return JSON.stringify({
        "action": action,
        "action_data": action_data,
        "login_info": (window as any).login_info
    })
}

export function connected_notify_send(){
    (window as any).ws_connect.send(BuildWSMessage("CONNECTED_NOTIFY",{}))
}

export function StartWSConnect() {
    (window as any).ws_connect = new WebSocket((window as any).live_info.websocket_addr);

    (window as any).ws_connect.addEventListener('open', function (event: any) {
        if (getCookie("latest_token")) {
            (window as any).ws_connect.send(BuildWSMessage("QUIET_LOGIN_REQUEST", {
                "token": getCookie("latest_token")
            }));
        }
        (window as any).ws_connect.send(BuildWSMessage("GET_CHAT_AERA_FULL_CONTENT_REQUEST", {}));
    });

    (window as any).ws_connect.addEventListener('message', function (event: any) {
        let data = JSON.parse(event.data);
        if(data.resp){
            data.resp = JSON.parse(data.resp);
        }
        console.log(data);
        if (data.resp_action === "QUIET_LOGIN_REQUEST_RESP") {
            if (data.resp.status) {
                (window as any).login_info.logged = true;
                (window as any).login_info.uid = data.resp.data.account_object.UID;
                (window as any).login_info.username = data.resp.data.account_object.USERNAME;
                (window as any).login_info.display_name = data.resp.data.account_object.DISPLAY_NAME;
                (window as any).login_info.token = getCookie("latest_token")
                refresh_ui_userinfo()
                connected_notify_send()
                console.log("自动登录成功")
            }
            else {
                show_error_dialog("自动登录失败", data.resp.msg)
            }
        }
        if (data.resp_action === "LOGIN_REQUEST_RESP") {
            if (data.resp.status) {
                (window as any).login_info.logged = true;
                (window as any).login_info.uid = data.resp.data.account_object.UID;
                (window as any).login_info.username = data.resp.data.account_object.USERNAME;
                (window as any).login_info.display_name = data.resp.data.account_object.DISPLAY_NAME;
                (window as any).login_info.token = data.resp.data.token
                setCookie("latest_token", data.resp.data.token, 30)
                close_login_dialog()
                show_info_dialog("登录成功","欢迎回来，" + (window as any).login_info.display_name + "！")
                refresh_ui_userinfo()
                connected_notify_send()
            }
            else {
                show_error_dialog("登录失败", data.resp.msg)
            }
        }
        if(data.resp_action === "REGISTER_REQUEST_RESP"){
            if (data.resp.status){
                show_info_dialog("注册成功",data.resp.msg)
                close_register_setname_dialog()
            }
            else{
                show_info_dialog("注册失败",data.resp.msg)
                close_register_setname_dialog()
            }
        }
        if(data.resp_action === "CHAT_AERA_UPDATE_FULL"){
            //@ts-ignore
            document.getElementById("chat_content_show_area").innerHTML = data.full_content
        }
        if(data.resp_action === "CHAT_AERA_UPDATE_APPEND"){
            //@ts-ignore
            document.getElementById("chat_content_show_area").innerHTML = document.getElementById("chat_content_show_area").innerHTML + data.append_content
        }
    });
}