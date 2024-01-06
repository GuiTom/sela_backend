import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {timeToFormatedDateTime,timeToFormatedTime,timeToFormatedDateHour,timeToFormatedDate,timeZoneOfffsetHours} from './utils/time_utils'

const app = createApp(App)

app.config.globalProperties.$timeToFormatedDate = timeToFormatedDate;
app.config.globalProperties.$timeToFormatedDateTime = timeToFormatedDateTime;
app.config.globalProperties.$timeToFormatedTime = timeToFormatedTime;
app.config.globalProperties.$timeToFormatedDateHour = timeToFormatedDateHour;
app.config.globalProperties.$timeZoneOfffsetHours = timeZoneOfffsetHours;

app.use(router)

app.mount('#app')
