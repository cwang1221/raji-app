import { Form, Input, Button, Image } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../contexts/authContext'
import logo from '../../assets/images/logo.png'
import { focusErrorInForm } from '../../utils'
import { useDocumentTitle } from '../../hooks'

export function SignInPage() {
  const { t } = useTranslation()
  const { postAuth } = useAuth()
  const history = useHistory()
  const formRef = useRef()

  useDocumentTitle(t('signIn.signIn'))

  const onFinish = async ({ email, password }) => {
    if (await postAuth(email, password)) {
      history.push('/')
    }
  }

  const onFinishFailed = () => {
    focusErrorInForm(formRef)
  }

  return (
    <SignInForm as={Form} ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item>
        <Logo as={Image} src={logo} preview={false} />
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
      <Form.Item style={{ marginTop: '3rem' }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>{t('signIn.signIn')}</Button>
      </Form.Item>
    </SignInForm>
  )
}

const SignInForm = styled.form`
  width: 20rem !important;
  margin: 0 auto !important;
  padding-top: 5rem !important;
`

const Logo = styled.image`
  width: 70% !important;
  margin: 0 auto;
  padding-bottom: 1rem !important;
`
