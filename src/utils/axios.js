import axios from 'axios'
import { HashRouter } from 'react-router-dom'
import { getToken } from './token'
import { message } from 'antd'
// 创建 axios 实例
const _http = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 60000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
const router = new HashRouter()
// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const { status } = error.response || ''
    if (status === 403) {
      message.error('无访问权限,请先登录或联系管理人员')
    }
    if (status === 401) {
      message.error('登录失效,请重新登录')
      return router.history.push('/')
    }
  }
  return Promise.reject('错误信息：', error)
}

_http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, errorHandler)

_http.interceptors.response.use(response => {
  let res = response.data
  if (res.code === '000') {
    return Promise.resolve(response.data.data)
  } else {
    if (res.code !== '000') {
      return message.error(res.msg)
    }
    if (res.code === 401) {
      message.error('登录失效')
      return router.history.push('/')
    }
  }
  // return Promise.resolve(response.data)
}, errorHandler)

export default _http
