import { createApp, ref } from 'vue'
import MainPage from './MainPage.vue'
import '@/css/theme.css'
import '@/css/video-js.min.css'
import '@/onload'
import '@material/web/all'
import { onload_steps } from '@/onload'

const mainpage = createApp(MainPage)

mainpage.mount('#app')

document.body.setAttribute("class", "background")

window.onload = onload_steps