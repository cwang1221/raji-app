import { Form, Modal, Space, Input } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { useAuth } from '../../contexts/authContext'
import { ProjectSelector } from './ProjectSelector'

export function CreateStoryModal({ visible, close }) {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [projectId, setProjectId] = useState(undefined)
  const [state, setState] = useState('unscheduled')
  const [epicId, setEpicId] = useState(undefined)
  const [type, setType] = useState('feature')
  const [requesterId, setRequesterId] = useState(user.id)
  const [ownerId, setOwnerId] = useState(undefined)
  const [estimate, setEstimate] = useState(undefined)
  const [due, setDue] = useState(undefined)
  const [followerIds, setFollowerIds] = useState([])

  const formRef = useRef()

  return (
    <Modal visible={visible} footer={null} onCancel={close} width="700px">
      <Space align="start" size="large">
        <Form
          ref={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ width: '420px' }}
        >
          <Form.Item
            label={<MyLabel required>{t('story.storyTitle')}</MyLabel>}
            name="title"
            rules={[{
              required: true,
              message: t('msg.required')
            }]}
          >
            <Input.TextArea rows={2} maxLength={100} />
          </Form.Item>
          <Form.Item
            label={<MyLabel>{t('general.description')}</MyLabel>}
            name="description"
          >
            <Input.TextArea rows={5} maxLength={500} />
          </Form.Item>
        </Form>
        <Space direction="vertical" size="middle" style={{ paddingTop: '40px' }}>
          <ProjectSelector projectId={1} />
          <CreateButton text={t('header.createStory')} />
        </Space>
      </Space>
    </Modal>
  )
}
