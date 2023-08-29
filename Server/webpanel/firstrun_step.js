function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function gen_streamkey() {
    document.getElementById("firstrun_step_input_panel_streamkey_setup").value = randomString(60)
}

function finish() {
    let username = document.getElementById("firstrun_step_input_panel_account_setup_username").value
    let password = document.getElementById("firstrun_step_input_panel_account_setup_password").value
    let streamkey = document.getElementById("firstrun_step_input_panel_streamkey_setup").value
    if (username != "" && password != "" && streamkey != "") {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/panel_api/first_step_confirm_panel_settings', true);

        xhr.send(JSON.stringify({ username: username, password: password, streamkey: streamkey }));

        xhr.onreadystatechange = function () {
            // 如果请求完成并且响应状态为 200
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 解析响应数据并打印到控制台
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                if(data.status){
                    alert("成功: " + data.msg)
                }
                else{
                    alert("失败: " + data.msg)
                }
            }
        };
    }
    else{
        alert("检测到空白项目，请再次确认是否所有输入框都填写完毕！")
    }
}