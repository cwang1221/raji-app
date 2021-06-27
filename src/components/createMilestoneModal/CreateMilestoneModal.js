import { Form, Modal, Space, Input } from 'antd'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { publish } from 'pubsub-js'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'
import { focusErrorInForm } from '../../utils'
import { useMilestone } from '../../hooks/useRequest'
import { MILESTONE_CREATED, MILESTONE_UPDATED } from '../../utils/events'
import { InfoBlock } from '../infoBlock'

export function CreateMilestoneModal({ id, visible, close }) {
  const { t } = useTranslation()

  const formRef = useRef()

  const { postMilestone, getMilestone, putMilestone } = useMilestone()

  useEffect(async () => {
    if (visible && id) {
      const data = await getMilestone(id)
      formRef.current.setFieldsValue({
        name: data.name,
        description: data.description
      })
    }
  }, [visible])

  const createMilestone = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        if (id) {
          await putMilestone(id, values)
          publish(MILESTONE_UPDATED)
        } else {
          await postMilestone(values)
          publish(MILESTONE_CREATED)
        }
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
          <InfoBlock message={t('milestone.createModalInfo')} />
          <CreateButton text={t(id ? 'header.updateMilestone' : 'header.createMilestone')} onClick={createMilestone} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`
