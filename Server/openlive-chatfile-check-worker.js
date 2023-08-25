import * as fs from 'fs'
import { parentPort, workerData } from 'worker_threads'
import * as diff from 'diff'

let chatfile_before = fs.readFileSync("chat_area_div_content.html").toString()

/*
警告：此部分程序或许依赖bug运行
请不要乱动
*/

setInterval(() => {
    let chatfile_after = fs.readFileSync("chat_area_div_content.html").toString()
    if (chatfile_after != chatfile_before) {
        // 使用diffLines函数而不是diffWords函数
        let diff_result = diff.diffLines(chatfile_before, chatfile_after)
        let diff_result_str = ""
        let lat_part_value = ""
        // 遍历结果数组，找出多出的部分
        for (let part of diff_result) {
            // 如果 part.added 为真，说明这部分是 b 字符串多出的
            //console.log("当前part: " + part.value)
            if(lat_part_value === ""){
                lat_part_value = part.value
            }
            if (part.added) {
                //console.log("此part是新增部分")
                //console.log("lat_part_value: " + lat_part_value)
                // 把这部分的值拼接到 diff 变量上
                diff_result_str = part.value.replace(lat_part_value,"")
                //console.log("diff_result_str: "+ diff_result_str)
            }
        }
        parentPort.postMessage({"msg": "changed","diff_str": diff_result_str})
        chatfile_before = fs.readFileSync("chat_area_div_content.html").toString()
    }
}, (1000 / workerData.QPS));
