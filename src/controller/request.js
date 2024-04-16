import axios from 'axios';  
import router from '../router/index'
import toast  from '@/utils/toast'
import { multiLan } from '@/utils/lan';
import { baseUrl } from '@/global';
// 设置 Axios 的默认 URL（如果有的话）  
const api = axios.create({
  //生产环境
  // baseURL:'https://api.selalive.com',
  //测试环境
  baseURL:baseUrl,

  }
)
// 请求拦截器（可选）  
api.interceptors.request.use((config) => {  
  // 在发送请求\之前做些什么，例如添加请求头、身份验证等  
  config.headers.setAuthorization(localStorage.getItem('authorization'))
  return config;  
}, (error) => {  
  // 对请求错误做些什么  
  toast(error)
  return Promise.reject(error);  
});  

// 响应拦截器（可选）  
api.interceptors.response.use((response) => {  
  if(response.data.code==1002){
    router.push('/')
    toast(multiLan('Session expired tip'))
    return Promise.reject();  
  }else if(response.data.code!=0){
    toast(response.data.message)
  }
  // 对响应数据做些什么，例如处理返回的数据格式等  
  return response;  
}, (error) => {  
  // 对响应错误做些什么  
  return Promise.reject(error);  
});  

export default api;