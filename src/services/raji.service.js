import { message } from 'antd'
import axios from '../axios'
import i18n from '../i18n'

const BASE_URL = 'http://39.103.224.134:8080/'

export async function auth(username, password) {
  try {
    const response = await axios.request({
      url: `${BASE_URL}auth`,
      method: 'post',
      auth: {
        username,
        password
      }
    })
    const { token } = response.data
  } catch (error) {
    message.error(i18n.t('login.loginFailedErrMsg'))
  }
}
