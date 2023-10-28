import { createApp } from 'vue'
import { setLocale } from 'yup'
import { createPinia } from 'pinia'
import { messages } from './utils/yup-messages'

import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setLocale(messages)

app.mount('#app')
