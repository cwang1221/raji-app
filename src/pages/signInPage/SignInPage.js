import { Form, Input, Button, Image } from 'antd'
import { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import styles from './SignInPage.module.css'
import logo from '../../assets/images/logo.png'

export function SignInPage() {
  const { t } = useTranslation()
  const { postAuth } = useContext(AuthContext)
  const history = useHistory()
  const formRef = useRef()

  const onFinish = async ({ email, password }) => {
    if (await postAuth(email, password)) {
      history.push('/')
    }
  }

  const onFinishFailed = (e) => {
    const firstErrorFieldName = e.errorFields[0].name[0]
    const firstErrorField = formRef.current.getFieldInstance(firstErrorFieldName)
    firstErrorField.focus({ cursor: 'all' })
  }

  return (
    <Form ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onFinish} onFinishFailed={onFinishFailed} className={styles.form}>
      <Form.Item style={{ marginTop: '2rem' }}>
        <Image src={logo} preview={false} className={styles.logo} />
      </Form.Item>
      <Form.Item
        label={t('signIn.email')}
        name="email"
        rules={[{
          required: true,
          message: t('signIn.emailErrMsg')
        }, {
          type: 'email',
          message: t('signIn.emailErrMsg')
        }]}
      >
        <Input maxLength={100} />
      </Form.Item>
      <Form.Item
        label={t('signIn.password')}
        name="password"
        rules={[{
          required: true,
          message: t('signIn.passwordErrMsg')
        }]}
      >
        <Input maxLength={100} type="password" />
      </Form.Item>
      <Form.Item style={{ marginTop: '2rem' }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>{t('signIn.signIn')}</Button>
      </Form.Item>
    </Form>
  )
}
