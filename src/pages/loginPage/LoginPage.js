import { Form, Input, Button } from 'antd'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export function LoginPage() {
  const { t } = useTranslation()
  const { postAuth } = useContext(AuthContext)
  const history = useHistory()

  const onFinish = async ({ username, password }) => {
    if (await postAuth(username, password)) {
      history.push('/')
    }
  }

  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onFinish}>
      <Form.Item
        label={t('login.username')}
        name="username"
        rules={[{
          required: true,
          message: t('login.usernameErrMsg')
        }]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        label={t('login.password')}
        name="password"
        rules={[{
          required: true,
          message: t('login.passwordErrMsg')
        }]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{t('login.signIn').toLocaleUpperCase()}</Button>
        <Button>{t('login.signUp').toLocaleUpperCase()}</Button>
      </Form.Item>
    </Form>
  )
}
