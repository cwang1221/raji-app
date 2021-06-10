import { Form, Input, Button, Image } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../contexts/authContext'
import logo from '../../assets/images/logo.png'
import { focusErrorInForm } from '../../utils'
import { useDocumentTitle } from '../../hooks'
import { MyLabel } from '../../components'

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
    <Container>
      <Card>
        <SignInForm ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item>
            <Logo src={logo} preview={false} />
          </Form.Item>
          <Form.Item
            label={<MyLabel required>{t('signIn.email')}</MyLabel>}
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
            label={<MyLabel required>{t('signIn.password')}</MyLabel>}
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
      </Card>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`

const Card = styled.div`
  border: 1px lightgray solid;
  border-radius: 10px;
  box-shadow: 5px 5px 5px lightgray;
  padding: 3rem 2rem 4rem 2rem;
`

const SignInForm = styled(Form)`
  width: 20rem !important;
  margin: 0 auto !important;
`

const Logo = styled(Image)`
  width: 70% !important;
  margin: 0 auto;
  padding-bottom: 1rem !important;
`
