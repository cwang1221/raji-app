import { createContext, useContext } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import axios from '../axios'
import { useLocalStorage } from '../hooks'

const BASE_URL = 'http://39.103.224.134:8080/'
const LOCAL_STORAGE_AUTH_KEY = '__auth__'

const defaultState = {
  token: '',
  username: '',
  email: '',
  avatar: '',
  role: ''
}

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const [auth, setAuth] = useLocalStorage(LOCAL_STORAGE_AUTH_KEY, defaultState)

  const postAuth = async (email, password) => {
    try {
      const response = await axios.request({
        url: `${BASE_URL}auth`,
        method: 'post',
        auth: {
          username: email,
          password
        }
      })
      const { token, user } = response.data
      setAuth({
        token,
        username: user.name,
        email: user.email,
        avatar: user.picture,
        role: user.role
      })
      return true
    } catch (error) {
      error.showed || message.error(t('signIn.signInFailedErrMsg'))
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ auth, postAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
