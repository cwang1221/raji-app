import { Form, Modal, Space, Input } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { EpicSelector } from './EpicSelector'
import { useAuth } from '../../contexts/authContext'
import { ProjectSelector } from './ProjectSelector'
import { RequesterSelector } from './RequesterSelector'
import { StoryStateSelector } from './StoryStateSelector'
import { StoryTypeSelector } from './StoryTypeSelector'
import { OwnerSelector } from './OwnerSelector'
import { EstimateSelector } from '../estimateSelector'
import { eventBus, events, focusErrorInForm } from '../../utils'
import { useStory } from '../../hooks/useRequest'

export function CreateStoryModal({ visible, close }) {
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

  const { postStory } = useStory()

  const createStory = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        const payload = {
          ...values,
          projectId: parseInt(projectId, 10),
          state,
          requesterId: parseInt(requesterId, 10)
        }

        epicId !== 'none' && (payload.epicId = parseInt(epicId, 10))
        ownerId !== 'none' && (payload.ownerId = parseInt(ownerId, 10))
        estimate !== 'none' && (payload.estimate = parseInt(estimate, 10))

        await postStory(payload)

        eventBus.publish(events.storyCreated)
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
          <StoryStateSelector state={state} onStateChange={setState} style={{ marginBottom: '1rem' }} />

          <EpicSelector epicId={epicId} onEpicIdChange={setEpicId} />
          <StoryTypeSelector type={type} onTypeChange={setType} style={{ marginBottom: '1rem' }} />

          <RequesterSelector requesterId={requesterId} onRequesterIdChange={setRequesterId} />
          <OwnerSelector ownerId={ownerId} onOwnerIdChange={setOwnerId} style={{ marginBottom: '1rem' }} />

          <EstimateSelector estimate={estimate} onEstimateChange={setEstimate} style={{ marginBottom: '1rem' }} />

          <CreateButton text={t('header.createStory')} onClick={createStory} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`
