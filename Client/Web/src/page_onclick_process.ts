import { show_error_dialog, show_info_dialog } from './universal_commands'

export function wip_alert(){
    show_info_dialog("Work in Prograss (WIP)","该功能正在开发中，暂未开放")
}

export function userinfo_div_click(){
    if(document.getElementById("username_text")?.innerHTML === "未登录"){
        //@ts-ignore
        document.getElementById("dialog_login").show()
    }
}

export function go_register_click(){
    //@ts-ignore
    document.getElementById("dialog_login").close()
    //@ts-ignore
    document.getElementById("dialog_register").show()
}

export function go_back_login_click(){
    //@ts-ignore
    document.getElementById("dialog_register").close()
    //@ts-ignore
    document.getElementById("dialog_login").show()
}

export function go_back_register_from_setname_click(){
    //@ts-ignore
    document.getElementById("dialog_register_setname").close()
    //@ts-ignore
    document.getElementById("dialog_register").show()
}

export function go_register_setname_click(){
    //@ts-ignore
    if(document.getElementById("dialog_register_username").value != "" && document.getElementById("dialog_register_password").value != "" && document.getElementById("dialog_register_confirm_password").value != ""){
        //@ts-ignore
        if(document.getElementById("dialog_register_password").value === document.getElementById("dialog_register_confirm_password").value){
            //@ts-ignore
            document.getElementById("dialog_register").close()
            //@ts-ignore
            document.getElementById("dialog_register_setname").show()
        }
        else{
            show_error_dialog("发生错误","两次输入的密码不一致，请仔细检查并牢记您的密码")
        }
    }
    else{
        show_error_dialog("发生错误","三项必填内容中有遗漏")
    }
}

export function send_chat_msg(){

}