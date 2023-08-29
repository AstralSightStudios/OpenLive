function loginclick(){
    let username = document.getElementById("login_input_username").value
    let password = document.getElementById("login_input_password").value
    if (username != "" && password != "") {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/panel_api/login', true);
        xhr.send(JSON.stringify({ username: username, password: password}));
        xhr.onreadystatechange = function () {
            // 如果请求完成并且响应状态为 200
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 解析响应数据并打印到控制台
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                if(data.status){
                    alert("成功: " + data.msg)
                    localStorage.setItem("openlive_panel_token", data.token);
                    window.location.pathname = "/panel_main.html"
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