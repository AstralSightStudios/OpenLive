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