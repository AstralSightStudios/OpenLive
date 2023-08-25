export function show_error_dialog(title: string,content: string){
    //@ts-ignore
    document.getElementById("universal_error_dialog_title").innerHTML = title
    //@ts-ignore
    document.getElementById("universal_error_dialog_text").innerHTML = content
    //@ts-ignore
    document.getElementById("universal_error_dialog").show()
}

export function show_info_dialog(title: string,content: string){
    //@ts-ignore
    document.getElementById("universal_info_dialog_title").innerHTML = title
    //@ts-ignore
    document.getElementById("universal_info_dialog_text").innerHTML = content
    //@ts-ignore
    document.getElementById("universal_info_dialog").show()
}

export function close_info_dialog(){
    //@ts-ignore
    document.getElementById("universal_info_dialog").close()
}

export function close_login_dialog(){
    //@ts-ignore
    document.getElementById("dialog_login").close()
}

export function close_register_dialog(){
    //@ts-ignore
    document.getElementById("dialog_register").close()
}

export function close_register_setname_dialog(){
    //@ts-ignore
    document.getElementById("dialog_register_setname").close()
}

export function refresh_ui_userinfo(){
    //@ts-ignore
    document.getElementById("username_text").innerHTML = (window as any).login_info.display_name
}