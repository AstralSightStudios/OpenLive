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