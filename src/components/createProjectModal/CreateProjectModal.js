import { Form, Modal, Space, Input, Select, Button, Alert } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useProject } from '../../hooks'
import { focusErrorInForm } from '../../utils'
import { ColorDropdown } from '../colorDropdown'
import { CreateButton } from '../createButton'
import { MyLabel } from '../myLabel'

export function CreateProjectModal({ visible, disableType, type = 'web', close }) {
  const { t } = useTranslation()
  const [color, setColor] = useState('#00D38C')
  const [projectNames, setProjectNames] = useState([])
  const formRef = useRef()
  const { getProjects, postProject } = useProject()

  useEffect(async () => {
    const projects = await getProjects()
    setProjectNames(projects.map((project) => project.name))
  }, [])

  useEffect(() => {
    if (visible) {
      formRef.current.setFieldsValue({
        name: '',
        description: '',
        type
      })
    }
  }, [visible])

  const createProject = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        await postProject({
          ...values,
          color,
          followerIds: [],
          countOfStories: 0,
          totalPoint: 0
        })

        close()
      })
      .catch(() => {
        focusErrorInForm(formRef)
      })
  }

  const onCancel = () => {
    formRef.current.resetFields()
    close()
  }

  return (
    <Modal visible={visible} footer={null} onCancel={onCancel} width="700px">
      <Space align="start" size="large">
        <Form
          ref={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ width: '420px' }}
        >
          <Form.Item
            label={<MyLabel required>{t('project.title')}</MyLabel>}
            name="name"
            rules={[{
              required: true,
              message: t('msg.required')
            }, ({ getFieldValue }) => ({
              validator(_, value) {
                const hasDuplicate = projectNames.includes(value)
                if (!hasDuplicate) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('project.duplicateProjectMsg')))
              }
            })]}
          >
            <Input.TextArea rows={2} maxLength={100} placeholder={t('project.titlePlaceholder')} />
          </Form.Item>
          <Form.Item
            label={<MyLabel required>{t('project.workflow')}</MyLabel>}
            name="type"
          >
            <Select disabled={disableType}>
              <Select.Option value="web">{t('project.web')}</Select.Option>
              <Select.Option value="mobile">{t('project.mobile')}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<MyLabel>{t('general.description')}</MyLabel>}
            name="description"
          >
            <Input.TextArea rows={5} maxLength={500} />
          </Form.Item>
        </Form>
        <Space direction="vertical" size="middle">
          <CreateInfo as={Alert} message={t('project.createModalInfo')} />

          <ColorDropdown color={color} onColorChange={setColor}>
            <Button size="small" style={{ width: '100%', textAlign: 'start' }}>
              {t('project.color')}
              <span style={{ backgroundColor: color, width: '0.5rem', height: '0.5rem', marginLeft: '0.5rem' }} />
            </Button>
          </ColorDropdown>
          <CreateButton text={t('project.createProject')} onClick={createProject} />
        </Space>
      </Space>
    </Modal>
  )
}

const CreateInfo = styled.div`
  margin-top: 2.5rem;
  background-color: rgb(232, 240, 253);
  border: 0;
`
