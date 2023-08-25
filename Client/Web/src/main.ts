import { createApp, ref } from 'vue'
import MainPage from './MainPage.vue'
import '@/css/theme.css'
import '@/css/video-js.min.css'
import '@/onload'
import '@material/web/all'
import '@/cookie_tools'
import { onload_steps } from '@/onload'

const mainpage = createApp(MainPage)

mainpage.mount('#app')

document.body.setAttribute("class", "background");

(window as any).login_info = {
    logged: false,
    uid: void(0),
    username: void(0),
    display_name: void(0),
    token: void(0)
}

window.onload = onload_steps

//Chat区域滚动条控制
// JavaScript部分
// 获取div元素
var div = document.getElementById("chat_content_show_area");
// 定义一个变量存储div的高度
//@ts-ignore
var divHeight = div.scrollHeight;
// 定义一个变量存储是否自动滚动的状态
var autoScroll = true;
// 定义一个定时器，每隔100毫秒检测一次div的高度和滚动条位置
var timer = setInterval(function() {
  // 如果div的高度发生了变化
  //@ts-ignore
  if (div.scrollHeight != divHeight) {
    // 更新divHeight变量
    //@ts-ignore
    divHeight = div.scrollHeight;
    // 如果自动滚动状态为真，即滚动条在最底部
    if (autoScroll) {
      // 将滚动条滚动到最底部
      //@ts-ignore
      div.scrollTop = div.scrollHeight;
    }
  }
  // 如果滚动条距离底部小于10像素，认为滚动条在最底部，将自动滚动状态设为真
  //@ts-ignore
  if (div.scrollHeight - div.scrollTop - div.clientHeight < 10) {
    autoScroll = true;
  } else {
    // 否则，将自动滚动状态设为假
    autoScroll = false;
  }
}, 100);
