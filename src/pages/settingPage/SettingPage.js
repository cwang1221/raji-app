import { Typography, Form, Button, Input, Divider, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect } from 'react'
import { focusErrorInForm } from '../../utils'
import { useDocumentTitle, useSetting } from '../../hooks'
import { useAuth } from '../../contexts/authContext'
import { useSettingContext } from '../../contexts/settingContext'
import { MyLabel } from '../../components/myLabel/MyLabel'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'

export function SettingPage() {
  const { t } = useTranslation()
  const { user, putUser } = useAuth()
  const profileFormRef = useRef()
  const toolsFormRef = useRef()
  const { setting, setSetting } = useSettingContext()
  const { putSetting, getSetting } = useSetting()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(async () => {
    setHeaderCreateButtonType('story')
    const data = await getSetting()
    setSetting(data)
  }, [])

  useEffect(() => {
    toolsFormRef.current.getFieldsValue().timePerTopic !== setting.timePerTopic
    && toolsFormRef.current.setFieldsValue({ timePerTopic: setting.timePerTopic })
  }, [setting])

  useDocumentTitle(t('header.setting'))

  const onProfileFinish = async ({ username }) => {
    putUser(username)
  }

  const onProfileFinishFailed = () => {
    focusErrorInForm(profileFormRef)
  }

  const onToolsFinish = async ({ timePerTopic }) => {
    setSetting({ timePerTopic })
    putSetting({ timePerTopic })
  }

  const onToolsFinishFailed = () => {
    focusErrorInForm(toolsFormRef)
  }

  return (
    <>
      <Typography.Title level={3}>{t('setting.profile')}</Typography.Title>

      <Form
        ref={profileFormRef}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onProfileFinish}
        onFinishFailed={onProfileFinishFailed}
        initialValues={{ username: user.username }}
        className="w-96 mb-8"
      >
        <Form.Item
          label={<MyLabel required>{t('setting.username')}</MyLabel>}
          name="username"
          rules={[{
            required: true,
            message: t('setting.usernameErrMsg')
          }]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }} className="mt-8">
          <Button type="primary" htmlType="submit" className="w-full">{t('setting.save')}</Button>
        </Form.Item>
      </Form>

      <Divider />

      <Typography.Title level={3} className="mt-4">{t('setting.tools')}</Typography.Title>
      <Typography.Title level={5} className="mt-4">{t('setting.timer')}</Typography.Title>

      <Form
        ref={toolsFormRef}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onToolsFinish}
        onFinishFailed={onToolsFinishFailed}
        initialValues={{ timePerTopic: setting.timePerTopic }}
        className="w-96"
      >
        <Form.Item
          label={<MyLabel required>{t('setting.timePerTopic')}</MyLabel>}
          name="timePerTopic"
          rules={[{
            required: true,
            message: t('setting.timeErrMsg')
          }, {
            type: 'number',
            max: 300,
            min: 1,
            message: t('setting.timeErrMsg')
          }]}
        >
          <InputNumber className="w-96" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }} className="mt-8">
          <Button type="primary" htmlType="submit" className="w-full">{t('setting.save')}</Button>
        </Form.Item>
      </Form>
    </>
  )
}
