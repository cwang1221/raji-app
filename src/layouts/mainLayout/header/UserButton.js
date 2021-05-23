import { Card, Avatar, Button, Dropdown, Form, Input } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { useAuth } from '../../../contexts/authContext'
import { focusErrorInForm } from '../../../utils'
import { MyModal } from '../../../components'
import styles from './UserButton.module.css'

export function UserButton() {
  const { user, setUser, putUser } = useAuth()
  const [showEditProfile, setShowEditProfile] = useState(false)
  const history = useHistory()
  const { t } = useTranslation()
  const formRef = useRef()

  const onLogout = () => {
    setUser({})
    history.push('/signIn')
  }

  const onEditProfile = () => {
    setShowEditProfile(true)
  }

  const onEditProfileOk = () => {
    const form = formRef.current
    form.validateFields()
      .then((values) => {
        putUser(values.username)
        setShowEditProfile(false)
      })
      .catch((info) => {
        focusErrorInForm(formRef)
      })
  }

  const closeEditProfile = () => {
    formRef.current.resetFields()
    setShowEditProfile(false)
  }

  const UserCard = () => (
    <Card
      actions={[
        <Button type="text" onClick={onEditProfile}>{t('header.editProfile')}</Button>,
        <Button type="text" onClick={onLogout}>{t('header.signOut')}</Button>
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={user.avatar} />}
        title={user.username}
        description={user.email}
      />
    </Card>
  )

  return (
    <>
      <Dropdown
        placement="bottomRight"
        overlay={<UserCard />}
      >
        <Avatar size="large" src={user.avatar} className={styles.avatar} />
      </Dropdown>
      <MyModal
        title={t('header.editProfile')}
        visible={showEditProfile}
        footer={[
          <Button key="ok" type="primary" onClick={onEditProfileOk}>
            OK
          </Button>
        ]}
        onCancel={closeEditProfile}
      >
        <Form ref={formRef} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} initialValues={{ username: user.username }}>
          <Form.Item
            label={t('header.username')}
            name="username"
            rules={[{
              required: true,
              message: t('header.usernameErrMsg')
            }]}
          >
            <Input maxLength={100} />
          </Form.Item>
        </Form>
      </MyModal>
    </>
  )
}
