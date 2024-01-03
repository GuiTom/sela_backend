import axios from 'axios';  
import router from '../router/index'
// 设置 Axios 的默认 URL（如果有的话）  
const api = axios.create({
  baseURL:'https://testapi.selalive.com',
  }
)
// 请求拦截器（可选）  
api.interceptors.request.use((config) => {  
  // 在发送请求之前做些什么，例如添加请求头、身份验证等  
  config.headers.setAuthorization(localStorage.getItem('authorization'))
  return config;  
}, (error) => {  
  // 对请求错误做些什么  
  return Promise.reject(error);  
});  

// 响应拦截器（可选）  
api.interceptors.response.use((response) => {  
  if(response.data.code==1002){
    router.push('/')
    return Promise.reject();  
  }
  // 对响应数据做些什么，例如处理返回的数据格式等  
  return response;  
}, (error) => {  
  // 对响应错误做些什么  
  return Promise.reject(error);  
});  

export default api;