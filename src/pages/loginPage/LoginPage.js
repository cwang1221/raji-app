import { Form, Input, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { auth } from '../../services/raji.service'

export function LoginPage() {
  const { t } = useTranslation()

  const onFinish = ({ username, password }) => {
    auth(username, password)
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
        <Button type="primary" htmlType="submit">{t('username.signIn')}</Button>
        <Button type="primary">{t('username.signUp')}</Button>
      </Form.Item>
    </Form>
  )
}
