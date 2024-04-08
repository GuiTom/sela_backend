import {ref} from 'vue'
const guildData = ref(JSON.parse(localStorage.getItem('guildData')));
const activityNeeds = ['新主播数量', '结算达标新主播数量', '新主播在线时间', '公会总收入'];
const joinLimits = ['公会等级', '公会总人数', 'xx级主播占比', '活跃主播占比', '最近xx天公会业绩'];

export {guildData,activityNeeds,joinLimits}
