import { Form, Modal, Space, Input, Alert } from 'antd'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { eventBus, events, focusErrorInForm } from '../../utils'
import { useEpic, useMilestone } from '../../hooks/useRequest'
import { MilestoneSelector } from './MilestoneSelector'
import { StateSelector } from './StateSelector'

export function CreateEpicModal({ visible, close }) {
  const { t } = useTranslation()

  const [milestoneId, setMilestoneId] = useState('none')
  const [state, setState] = useState('todo')

  const formRef = useRef()

  const { postEpic } = useEpic()
  const { addEpic } = useMilestone()

  const createEpic = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        const payload = {
          ...values,
          state
        }

        const createdEpic = await postEpic(payload)
        await addEpic(milestoneId === 'none' ? 1 : parseInt(milestoneId, 10), createdEpic.id)

        eventBus.publish(events.epicCreated)
        formRef.current.resetFields()
        setState('todo')

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
          initialValues={{ name: '', description: '' }}
        >
          <Form.Item
            label={<MyLabel required>{t('epic.epicTitle')}</MyLabel>}
            name="name"
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
          <CreateInfo message={t('epic.createModalInfo')} />

          <MilestoneSelector milestoneId={milestoneId} onMilestoneIdChange={setMilestoneId} />
          <StateSelector state={state} onStateChange={setState} style={{ marginBottom: '1rem' }} />

          <CreateButton text={t('header.createEpic')} onClick={createEpic} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`

const CreateInfo = styled(Alert)`
  background-color: rgb(232, 240, 253);
  margin-bottom: 1rem;
  border: 0;
`
