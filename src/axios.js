import axios from 'axios'
import ReactDOM from 'react-dom'
import { message, Spin } from 'antd'
import i18n from './i18n'

const Axios = axios.create({
  timeout: 20000
})

Axios.defaults.headers.tenant = 'default'

const auth = JSON.parse(window.localStorage.getItem('__auth__'))
auth && (Axios.defaults.headers.Authorization = `Bearer ${auth.token}`)

let requestCount = 0

function showLoading() {
  if (requestCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin size="large" />, dom)
  }
  requestCount++
}

function hideLoading() {
  requestCount--
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'))
  }
}

Axios.interceptors.request.use((config) => {
  if (!config.hideLoading) {
    showLoading()
  }
  return config
}, (err) => {
  if (!err.config.hideLoading) {
    hideLoading()
  }
  return Promise.reject(err)
})

Axios.interceptors.response.use((res) => {
  if (!res.config.hideLoading) {
    hideLoading()
  }
  return res
}, (err) => {
  if (!err.config.hideLoading) {
    hideLoading()
  }
  if (err.message === 'Network Error') {
    message.error(i18n.t('generalMsg.networkError'))
    err.showed = true
  }
  if (err.code === 'ECONNABORTED') {
    message.error(i18n.t('generalMsg.timeoutError'))
    err.showed = true
  }
  return Promise.reject(err)
})

export default Axios
