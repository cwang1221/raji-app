import { Form, Modal, Space, Input, Alert } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { focusErrorInForm } from '../../utils'
import { useMilestone } from '../../hooks/useRequest'
import { useEventContext } from '../../contexts/eventContext'

export function CreateMilestoneModal({ visible, close }) {
  const { t } = useTranslation()

  const formRef = useRef()

  const { postMilestone } = useMilestone()
  const { publishMilestoneCreatedEvent } = useEventContext()

  const createMilestone = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        await postMilestone(values)

        publishMilestoneCreatedEvent()
        formRef.current.resetFields()

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
            label={<MyLabel required>{t('milestone.milestoneTitle')}</MyLabel>}
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
          <CreateInfo message={t('milestone.createModalInfo')} />
          <CreateButton text={t('header.createMilestone')} onClick={createMilestone} />
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
