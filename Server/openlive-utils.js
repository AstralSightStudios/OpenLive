export function randomString(length) {
    // 定义一个包含大小写字母与数字的字符集
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // 定义一个空字符串，用于存放结果
    let result = "";
    // 循环length次，每次从字符集中随机选取一个字符，拼接到结果字符串中
    for (let i = 0; i < length; i++) {
        // 生成一个0到字符集长度之间的随机整数，作为字符集的索引
        let index = Math.floor(Math.random() * chars.length);
        // 根据索引从字符集中取出一个字符
        let char = chars[index];
        // 将字符添加到结果字符串中
        result += char;
    }
    // 返回结果字符串
    return result;
}