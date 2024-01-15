import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {timeToFormatedDateTime,timeToFormatedTime,timeToFormatedDateHour,timeToFormatedDate,timeZoneOfffsetHours} from './utils/time_utils'
import { currentLanguage } from '@/utils/lan'
const app = createApp(App)

app.config.globalProperties.$timeToFormatedDate = timeToFormatedDate;
app.config.globalProperties.$timeToFormatedDateTime = timeToFormatedDateTime;
app.config.globalProperties.$timeToFormatedTime = timeToFormatedTime;
app.config.globalProperties.$timeToFormatedDateHour = timeToFormatedDateHour;
app.config.globalProperties.$timeZoneOfffsetHours = timeZoneOfffsetHours;

app.use(router)
let curLan = currentLanguage()
if (curLan == 'ar') {
  document.documentElement.setAttribute('dir', 'rtl')
} else {
  document.documentElement.setAttribute('dir', 'ltl')
}
app.mount('#app')
