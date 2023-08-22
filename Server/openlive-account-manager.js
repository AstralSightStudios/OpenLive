import * as fs from 'fs'
import * as utils from './openlive-utils.js'
import * as chat_manager from './openlive-chat-manager.js'

global.ALLOW_TOKENS = {}

export function isValidString(str) {
    // 定义一个正则表达式，匹配大小写字母、数字以及所有的英文符号
    const regex = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/;
    // 用正则表达式的test方法来检查字符串是否合法
    return regex.test(str);
}
  

export const default_account_database = {
    "PANEL_ACCOUNTS": [
        {
            "UID": 0,
            "USERNAME": "wait_to_set",
            "PASSWORD": "wait_to_set",
            "DISPLAY_NAME": "wait_to_set",
            "PERMISSIONS": "N/A" //TODO: 权限系统
        }
    ],
    "ACCOUNTS": [
        {
            "UID": 0,
            "USERNAME": "TESTUSER", //默认生成的测试账号将在未来被移除
            "PASSWORD": "test",
            "DISPLAY_NAME": "OpenLive_Test",
            "LEVEL": 0, //TODO: 等级系统
            "TAGS": [ //TODO: 实装Tag系统
                "tag_room-manager", //内置tag：房管
                "tag_sponsor",  //内置tag：赞助者/支持者
                "tag_old-fan" //内置tag：老粉
            ]
        }
    ]
}

export function Login(username, password){
    var ac_obj = GetAccountObjectByUsername(username)
    if(ac_obj != null){
        if(ac_obj.PASSWORD === password){
            var token = utils.randomString(24)
            global.ALLOW_TOKENS[token] = ac_obj.UID
            return JSON.stringify({
                "status": true,
                "msg": "登录成功",
                "data":{
                    "token": token
                }
            })
        }
    }
    return JSON.stringify({
        "status": false,
        "msg": "账号或密码错误"
    })
}

export function Register(username, password, display_name){
    if(isValidString(username) && isValidString(display_name)){
        var ac_obj = GetAccountObjectByUsername(username)
        if(ac_obj === null){
            global.accounts_database.ACCOUNTS.push({
                "UID": fs.readFileSync("currentuid"),
                "USERNAME": chat_manager.anti_xss_replace(username),
                "PASSWORD": password,
                "DISPLAY_NAME": chat_manager.anti_xss_replace(display_name),
                "LEVEL": 0, //TODO: 等级系统
                "TAGS": []
            })
            fs.writeFileSync("currentuid",(Number(fs.readFileSync("currentuid")) + 1).toString())
            sync_account_db_file()
            return JSON.stringify({
                "status": true,
                "msg": "注册成功，请前往登录"
            })
        }
    }
    else{
        return JSON.stringify({
            "status": false,
            "msg": "账号或密码或显示名中存在非法字符，其只能由英文字母和英文符号组成"
        })
    }
    return JSON.stringify({
        "status": false,
        "msg": "账号已存在或出现服务端错误"
    })
}

export function IsVaildAccount(uid) {
    for (let account of global.accounts_database.ACCOUNTS) {
        //如果找到匹配的uid，返回该项
        if (account.UID === uid) {
            return true
        }
    }
    return false
}

export function GetAccountObjectByUid(uid) {
    for (let account of global.accounts_database.ACCOUNTS) {
        if (account.UID === uid) {
            return account
        }
    }
    return null
}

export function GetAccountObjectByUsername(username) {
    for (let account of global.accounts_database.ACCOUNTS) {
        if (account.USERNAME === username) {
            return account
        }
    }
    return null
}

export function GetAccountObjectByDisplayname(displayname) {
    for (let account of global.accounts_database.ACCOUNTS) {
        if (account.DISPLAY_NAME == displayname) {
            return account
        }
    }
    return null
}

export function GetSTRINGAccountObjectByAllowedToken(token) {
    var target_uid = global.ALLOW_TOKENS[token]
    if(target_uid != undefined){
        for (let account of global.accounts_database.ACCOUNTS) {
            if (account.UID === uid) {
                return JSON.stringify(account)
            }
        }
    }
    return "bad token"
}

export function sync_account_db_file(){
    fs.writeFileSync("account_database.json",JSON.stringify(global.accounts_database))
}

export function init_account_system() {
    if (!fs.existsSync("currentuid")){
        fs.writeFileSync("currentuid","0")
    }
    if (fs.existsSync("account_database.json")) {
        console.log("Account System: OK")
        return JSON.parse(fs.readFileSync("account_database.json"))
    }
    else {
        console.log("Creating default account database file...")
        fs.writeFileSync("accounts.json", JSON.stringify(default_account_database))
        console.log("Account System: OK")
        return default_account_database
    }
}