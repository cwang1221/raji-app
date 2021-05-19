import { Form, Input, Button } from 'antd'
import { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import styles from './SignUpPage.module.css'

export function SignUpPage() {
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
      <Form.Item
        label={t('signUp.email')}
        name="email"
        rules={[{
          required: true,
          message: t('signUp.emailErrMsg')
        }, {
          type: 'email',
          message: t('signUp.emailErrMsg')
        }]}
      >
        <Input maxLength={100} />
      </Form.Item>
      <Form.Item
        label={t('signUp.username')}
        name="username"
        rules={[{
          required: true,
          message: t('signUp.usernameErrMsg')
        }]}
      >
        <Input maxLength={100} />
      </Form.Item>
      <Form.Item
        label={t('signUp.password')}
        name="password"
        rules={[{
          required: true,
          message: t('signUp.passwordErrMsg')
        }]}
      >
        <Input maxLength={100} type="password" />
      </Form.Item>
      <Form.Item
        label={t('signUp.confirmPassword')}
        name="confirmPassword"
        rules={[{
          required: true,
          message: t('signUp.confirmPasswordErrMsg')
        }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(t('signUp.confirmPasswordErrMsg')))
          }
        })]}
      >
        <Input maxLength={100} type="password" />
      </Form.Item>
      <Form.Item style={{ marginTop: '2rem' }}>
        <Button type="primary" htmlType="submit" className={styles.button}>{t('signUp.signUp')}</Button>
        <Button className={styles.button} onClick={() => history.push('/signIn')}>{t('signUp.signIn')}</Button>
      </Form.Item>
    </Form>
  )
}
