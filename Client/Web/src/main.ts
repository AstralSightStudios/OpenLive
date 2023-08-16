import { createApp } from 'vue'
import MainPage from './MainPage.vue'
import '@/css/theme.css'
import '@material/web/common'

const mainpage = createApp(MainPage)

mainpage.mount('#app')