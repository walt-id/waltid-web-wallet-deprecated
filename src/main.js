import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@/assets/css/core.css'
import '@/assets/css/bootstrap-icons.css'

createApp(App).use(router).mount('#app')
