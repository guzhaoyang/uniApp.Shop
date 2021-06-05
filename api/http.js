/**********************
*
*接收前端发来的请求，处理后发往后端
*
**********************/

import axios from '../plugins/axios/axios.js'
import helper from './helper.js'
let qs = require('querystring')



//console.log( process.env.NODE_ENV)
//判断环境提供baseURL，注意要与后台地址一致
let root = process.env.NODE_ENV === 'development'
  // 开发环境api接口
  ?
  `http://localhost:54644`
  // 生产环境api接口
  :
  `http://localhost:54644`;
// 引用axios，设置头文件
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function apiAxios(method, url, params, token) {
	
	token = token || localStorage.getItem('token');	
	
  return axios({
    method: method,
    //拼接参数
    url: method === 'GET'|| method === 'DELETE' ? helper.queryString(url,params) : url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    baseURL: root,
    timeout: 10000,
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: false// 跨域访问需要发送cookie时，一定要拿axios defaults.withCredentials = true ;
  })
}

/**
 *请求拦截器：发送请求前需要调用这个函数
 1.当没有登录时，直接跳转到登录页
 2.请求发送前把token获取，设置到header中
 */
axios.interceptors.request.use(config => {
  // 从localStorage中获取token
  //let token = localStorage.getItem('token');
  // 如果token，就把token设置到请求头中Authorization字段中
  //token && (config.headers.Aithorization = token);
  //console.log('interceptors.request:' + config)
  return config;
},error => {
  return Promise.reject(error)
})
/**
 * 响应拦截器： 当后端返回数据给vue时会调用这个函数
 1.每次返回错误403时，跳转到login
 */
axios.interceptors.response.use(response => {
	//console.log('interceptors.response:' + response.data)
  // 当响应码是 2xx 的情况，进入这里
  return response.data;
},error => {
  //当响应码不是 2xx 的情况，进入这里
  return error
});

export default {
  get: function (url, params, token) {
    return apiAxios('GET', url, params, token)
  },
  post: function (url, params, token) {
    return apiAxios('POST', url, params, token)
  },
  put: function (url, params, token) {
    return apiAxios('PUT', url, params, token)
  },
  delete: function (url, params, token) {
    return apiAxios('DELETE', url, params, token)
  },
}
