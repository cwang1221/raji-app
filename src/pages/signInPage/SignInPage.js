import { Form, Input, Button, Image } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import tw from 'tailwind-styled-components'
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
      history.replace('/')
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
          <Form.Item className="mt-12">
            <Button type="primary" htmlType="submit" className="w-full">{t('signIn.signIn')}</Button>
          </Form.Item>
        </SignInForm>
      </Card>
    </Container>
  )
}

const Container = tw.div`
  h-screen
  flex
  flex-col
  items-center
  pt-8
`
const Card = tw.div`
  border
  border-gray-200
  border-solid
  rounded-lg
  shadow-lg
  pt-12
  pb-16
  px-8
`

const SignInForm = tw(Form)`
  w-80  
`

const Logo = tw(Image)`
  w-2/3
  mx-auto
  pb-6
`
