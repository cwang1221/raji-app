import { createContext, useContext } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import axios from '../libs/axios'
import { useLocalStorage } from '../hooks'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const [user, setUser] = useLocalStorage('auth', {
    username: '',
    email: '',
    avatar: '',
    role: ''
  })

  const postAuth = async (email, password) => {
    try {
      const response = await axios.request({
        url: '/auth',
        method: 'post',
        auth: {
          username: email,
          password
        }
      })

      setUser({
        id: response.data.user.id,
        username: response.data.user.name,
        email: response.data.user.email,
        avatar: response.data.user.picture,
        role: response.data.user.role
      })

      return true
    } catch (error) {
      error.showed || message.error(t('signIn.signInFailedErrMsg'))
      return false
    }
  }

  const putUser = async (username) => {
    try {
      await axios.request({
        url: `/users/${user.id}`,
        method: 'put',
        data: {
          name: username
        }
      })
      setUser({ ...user, username })
    } catch (error) {
      error.showed || message.error(t('header.updateUsernameErrMsg'))
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, postAuth, putUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
