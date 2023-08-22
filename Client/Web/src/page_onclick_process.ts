export function wip_alert(){
    alert("该功能暂未开放，请耐心等待")
}

export function userinfo_div_click(){
    if(document.getElementById("username_text")?.innerHTML === "未登录"){
        //@ts-ignore
        document.getElementById("dialog_login").show()
    }
}

export function send_chat_msg(){

}