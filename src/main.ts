import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/global/UIComponents'
// @ts-expect-error 识别不到模块
import 'virtual:svg-icons-register'
import store from '@/store'

const app = createApp(App)

app.use(store).use(router).mount('#app')
