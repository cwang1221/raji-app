import { Form, Input, Button } from 'antd'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'

export function SignInPage() {
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
        label={t('signIn.username')}
        name="username"
        rules={[{
          required: true,
          message: t('signIn.usernameErrMsg')
        }]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item
        label={t('signIn.password')}
        name="password"
        rules={[{
          required: true,
          message: t('signIn.passwordErrMsg')
        }]}
      >
        <Input maxLength={50} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{t('signIn.signIn').toLocaleUpperCase()}</Button>
        <Button>{t('signIn.signUp').toLocaleUpperCase()}</Button>
      </Form.Item>
    </Form>
  )
}
