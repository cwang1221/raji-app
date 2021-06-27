import { Form, Modal, Space, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { publish } from 'pubsub-js'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { EpicSelector } from './EpicSelector'
import { useAuth } from '../../contexts/authContext'
import { ProjectSelector } from './ProjectSelector'
import { RequesterSelector } from './RequesterSelector'
import { StoryStateSelector } from './StoryStateSelector'
import { StoryTypeSelector } from './StoryTypeSelector'
import { OwnerSelector } from './OwnerSelector'
import { EstimateSelector } from '..'
import { focusErrorInForm } from '../../utils'
import { useStory } from '../../hooks/useRequest'
import { STORY_CREATED, STORY_UPDATED } from '../../utils/events'
import { VerticalSpace } from '../verticalSpace'

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
        payload.estimate = estimate === 'none' ? -1 : parseInt(estimate, 10)

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
        <RightContainer>
          <ProjectSelector projectId={projectId} onProjectIdChange={setProjectId} />
          <StoryStateSelector state={state} onStateChange={setState} />
          <VerticalSpace />

          <EpicSelector epicId={epicId} onEpicIdChange={setEpicId} />
          <StoryTypeSelector type={type} onTypeChange={setType} />
          <VerticalSpace />

          <RequesterSelector requesterId={requesterId} onRequesterIdChange={setRequesterId} />
          <OwnerSelector ownerId={ownerId} onOwnerIdChange={setOwnerId} />
          <VerticalSpace />

          <EstimateSelector estimate={estimate} onEstimateChange={setEstimate} />
          <VerticalSpace />

          <CreateButton text={t(id ? 'header.updateStory' : 'header.createStory')} onClick={createStory} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`
