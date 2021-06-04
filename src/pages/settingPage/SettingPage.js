import { Typography, Form, Button, Input, Divider, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { focusErrorInForm } from '../../utils'
import { useDocumentTitle } from '../../hooks'
import { useAuth } from '../../contexts/authContext'

export function SettingPage() {
  const { t } = useTranslation()
  const { user, putUser } = useAuth()
  const profileFormRef = useRef()
  const toolsFormRef = useRef()

  useDocumentTitle(t('signIn.signIn'))

  const onProfileFinish = async ({ username }) => {
    putUser(username)
  }

  const onProfileFinishFailed = () => {
    focusErrorInForm(profileFormRef)
  }

  const onToolsFinish = async ({ timePerTopic }) => {
    putUser(timePerTopic)
  }

  const onToolsFinishFailed = () => {
    focusErrorInForm(toolsFormRef)
  }

  return (
    <>
      <Typography.Title level={3}>{t('settings.profile')}</Typography.Title>

      <Form
        ref={profileFormRef}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onProfileFinish}
        onFinishFailed={onProfileFinishFailed}
        initialValues={{ username: user.username }}
        style={{ width: '24rem', marginBottom: '2rem' }}
      >
        <Form.Item
          label={t('settings.username')}
          name="username"
          rules={[{
            required: true,
            message: t('settings.usernameErrMsg')
          }]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item style={{ marginTop: '2rem' }} wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>{t('settings.save')}</Button>
        </Form.Item>
      </Form>

      <Divider />

      <Typography.Title level={3} style={{ marginTop: '1rem' }}>{t('settings.tools')}</Typography.Title>
      <Typography.Title level={5} style={{ marginTop: '1rem' }}>{t('settings.timer')}</Typography.Title>

      <Form
        ref={toolsFormRef}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onToolsFinish}
        onFinishFailed={onToolsFinishFailed}
        style={{ width: '24rem' }}
      >
        <Form.Item
          label={t('settings.timePerTopic')}
          name="timePerTopic"
          rules={[{
            required: true,
            message: t('settings.timeErrMsg')
          }, {
            type: 'number',
            max: 300,
            min: 1,
            message: t('settings.timeErrMsg')
          }]}
        >
          <InputNumber style={{ width: '24rem' }} />
        </Form.Item>
        <Form.Item style={{ marginTop: '2rem' }} wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>{t('settings.save')}</Button>
        </Form.Item>
      </Form>
    </>
  )
}
