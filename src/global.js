import {ref} from 'vue'
const guildData = ref(JSON.parse(localStorage.getItem('guildData')));
  // baseURL:'https://api.selalive.com',
  //测试环境
//   baseURL:'https://testapi.selalive.com',
//生产环境
// const baseUrl = 'https://api.selalive.com';
//测试环境
const baseUrl = 'https://testapi.selalive.com';
export {guildData,baseUrl}
