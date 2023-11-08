import { createApp } from 'vue'
import { setLocale } from 'yup'
import { createPinia } from 'pinia'
import { messages } from './config/yup-messages'

import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'
import { toast } from './plugins/toast/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$toast = toast

setLocale(messages)

app.mount('#app')
