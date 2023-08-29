var xhr = new XMLHttpRequest();
xhr.post('POST', '/panel_api/get_serv_info', true);
xhr.send(JSON.stringify({ token: localStorage.getItem("openlive_panel_token") }));
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if(data.is_living){
            document.getElementById("button_start_live").setAttribute("disabled","disabled")
            document.getElementById("button_stop_live").removeAttribute("disabled")
        }
        document.getElementById("input_streamkey").value = data.streamkey
        document.getElementById("input_livetitle").value = data.livetitle
        document.getElementById("input_anchor_name").value = data.anchorname
        document.getElementById("input_anchor_profile_img_url").value = data.anchorprofileimgurl
    }
};

function send_api_req_with_object(api_path, object_){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', api_path, true);
    xhr.send(JSON.stringify(object_));
    xhr.onreadystatechange = function () {
        // 如果请求完成并且响应状态为 200
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解析响应数据并打印到控制台
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            if (data.status) {
                alert("成功: " + data.msg)
            }
            else {
                alert("失败: " + data.msg)
            }
        }
    };
}

function clear_chat_click() {
    send_api_req_with_object('/panel_api/clear_chat', { token: localStorage.getItem("openlive_panel_token") })
}

function emergency_shutdown_click(){
    send_api_req_with_object('/panel_api/emergency_shutdown', { token: localStorage.getItem("openlive_panel_token") })
    alert("OpenLive服务端已关闭，该窗口也将关闭")
    window.close()
}

function save_streamkey_change_click(){
    send_api_req_with_object('/panel_api/update_streamkey', { new_streamkey: document.getElementById("input_streamkey").value, token: localStorage.getItem("openlive_panel_token") })
}

function save_livepage_change_click(){
    let can_chat = true
    if(!document.getElementById("checkbox_can_chat").checked){
        can_chat = false
    }
    send_api_req_with_object('/panel_api/update_livepage', {livetitle: document.getElementById("input_livetitle").value, anchor_name: document.getElementById("input_anchor_name").value, anchor_profile_img_url: document.getElementById("input_anchor_profile_img_url").value, can_chat: can_chat ,token: localStorage.getItem("openlive_panel_token") })
}