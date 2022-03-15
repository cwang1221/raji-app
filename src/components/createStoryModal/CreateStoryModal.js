import { Form, Modal, Space, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { publish } from 'pubsub-js'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { useAuth } from '../../contexts/authContext'
import { EstimateSelector, EpicSelector, OwnerSelector, ProjectSelector, RequesterSelector, StoryStateSelector, StoryTypeSelector } from '..'
import { focusErrorInForm } from '../../utils'
import { useStory } from '../../hooks/useRequest'
import { STORY_CREATED, STORY_UPDATED } from '../../utils/events'

export function CreateStoryModal({ visible, close, id }) {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [projectId, setProjectId] = useState(undefined)
  const [state, setState] = useState('unscheduled')
  const [epicId, setEpicId] = useState('none')
  const [type, setType] = useState('feature')
  const [requesterId, setRequesterId] = useState(`${user.id}`)
  const [ownerId, setOwnerId] = useState('none')
  const [estimate, setEstimate] = useState('none')

  const formRef = useRef()

  const { postStory, getStory, putStory } = useStory()

  useEffect(async () => {
    if (visible && id) {
      const data = await getStory(id)
      formRef.current.setFieldsValue({
        title: data.title,
        description: data.description
      })
      setProjectId(data.projectId.toString())
      setState(data.state)
      setEpicId(data.epicId.toString())
      setType(data.type)
      setRequesterId(data.requesterId.toString())
      setOwnerId(data.ownerId?.toString() || 'none')
      setEstimate(data.estimate?.toString() || 'none')
    }
  }, [visible])

  const createStory = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        const payload = {
          ...values,
          projectId: parseInt(projectId, 10),
          state,
          type,
          requesterId: parseInt(requesterId, 10)
        }

        payload.epicId = epicId === 'none' ? 0 : parseInt(epicId, 10)
        payload.ownerId = ownerId === 'none' ? 0 : parseInt(ownerId, 10)
        payload.estimate = estimate === 'none' ? undefined : parseInt(estimate, 10)

        if (id) {
          await putStory(id, payload)
          publish(STORY_UPDATED)
        } else {
          await postStory(payload)
          publish(STORY_CREATED)
        }

        formRef.current.resetFields()
        setProjectId(undefined)
        setState('unscheduled')
        setEpicId('none')
        setType('feature')
        setRequesterId(`${user.id}`)
        setOwnerId('none')
        setEstimate('none')

        close()
      })
      .catch(() => {
        focusErrorInForm(formRef)
      })
  }

  return (
    <Modal visible={visible} footer={null} onCancel={close} width="700px" keyboard={false} style={{ minWidth: '700px' }}>
      <Space align="start" size="large">
        <Form
          ref={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ width: '420px' }}
          initialValues={{ title: '', description: '' }}
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
        <div className="mt-10">
          <ProjectSelector projectId={projectId} onProjectIdChange={setProjectId} />
          <div className="mb-4">
            <StoryStateSelector state={state} onStateChange={setState} />
          </div>

          <EpicSelector epicId={epicId} onEpicIdChange={setEpicId} />
          <div className="mb-4">
            <StoryTypeSelector type={type} onTypeChange={setType} />
          </div>

          <RequesterSelector requesterId={requesterId} onRequesterIdChange={setRequesterId} />
          <div className="mb-4">
            <OwnerSelector ownerId={ownerId} onOwnerIdChange={setOwnerId} />
          </div>

          <div className="mb-4">
            <EstimateSelector estimate={estimate} onEstimateChange={setEstimate} />
          </div>

          <CreateButton text={t(id ? 'header.updateStory' : 'header.createStory')} onClick={createStory} />
        </div>
      </Space>
    </Modal>
  )
}
