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
import { focusErrorInForm } from '../../utils'
import { useStory } from '../../hooks/useRequest'
import { useEventContext } from '../../contexts/eventContext'

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
  const { publishStoryCreatedEvent } = useEventContext()

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
        ownerId !== 'none' && (payload.ownerId = parseInt(ownerId, 10))
        estimate !== 'none' && (payload.estimate = parseInt(estimate, 10))

        await postStory(payload)

        publishStoryCreatedEvent()
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
          <BottomSpace />

          <EpicSelector epicId={epicId} onEpicIdChange={setEpicId} />
          <StoryTypeSelector type={type} onTypeChange={setType} />
          <BottomSpace />

          <RequesterSelector requesterId={requesterId} onRequesterIdChange={setRequesterId} />
          <OwnerSelector ownerId={ownerId} onOwnerIdChange={setOwnerId} />
          <BottomSpace />

          <EstimateSelector estimate={estimate} onEstimateChange={setEstimate} />
          <BottomSpace />

          <CreateButton text={t('header.createStory')} onClick={createStory} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`

const BottomSpace = styled.div`
  height: 1rem;
`
