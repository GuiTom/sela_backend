import {ref} from 'vue'
const guildData = ref(JSON.parse(localStorage.getItem('guildData')));
export {guildData}
