import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {timeToFormatedDateTime,timeToFormatedTime,timeToFormatedDate} from './utils/time_utils'

const app = createApp(App)

app.config.globalProperties.$timeToFormatedDate = timeToFormatedDate;
app.config.globalProperties.$timeToFormatedDateTime = timeToFormatedDateTime;
app.config.globalProperties.$timeToFormatedTime = timeToFormatedTime;
app.use(router)

app.mount('#app')
