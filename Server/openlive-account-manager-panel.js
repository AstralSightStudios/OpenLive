import * as utils from './openlive-utils.js'

export function PanelLogin(username, password){
    var ac_obj = PanelGetAccountObjectByUsername(username)
    if(ac_obj != null && (username != "wait_to_set" && password != "wait_to_set")){
        if(ac_obj.PASSWORD === password){
            var token = utils.randomString(24)
            global.ALLOW_TOKENS[token] = ac_obj.UID
            return JSON.stringify({
                "status": true,
                "msg": "登录成功",
                "token": token
            })
        }
    }
    return JSON.stringify({
        "status": false,
        "msg": "账号或密码错误"
    })
}

export function PanelGetAccountObjectByUsername(username) {
    for (let account of global.accounts_database.PANEL_ACCOUNTS) {
        if (account.USERNAME === username) {
            return account
        }
    }
    return null
}

export function PanelGetAccountObjectByUid(uid) {
    for (let account of global.accounts_database.PANEL_ACCOUNTS) {
        if (account.UID === uid) {
            return account
        }
    }
    return null
}