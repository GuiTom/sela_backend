import axios from 'axios';  
  
// 设置 Axios 的默认 URL（如果有的话）  
axios.defaults.baseURL = 'https://api.example.com';  
  
// 请求拦截器（可选）  
axios.interceptors.request.use((config) => {  
  // 在发送请求之前做些什么，例如添加请求头、身份验证等  
  return config;  
}, (error) => {  
  // 对请求错误做些什么  
  return Promise.reject(error);  
});  
  
// 响应拦截器（可选）  
axios.interceptors.response.use((response) => {  
  // 对响应数据做些什么，例如处理返回的数据格式等  
  return response;  
}, (error) => {  
  // 对响应错误做些什么  
  return Promise.reject(error);  
});  
  
export default axios;