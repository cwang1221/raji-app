import { Form, Modal, Space, Input, Select, Button } from 'antd'
import { publish } from 'pubsub-js'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useProject } from '../../hooks'
import { focusErrorInForm } from '../../utils'
import { PROJECT_CREATED, PROJECT_UPDATED } from '../../utils/events'
import { ColorDropdown } from '../colorDropdown'
import { CreateButton } from '../createButton'
import { InfoBlock } from '../infoBlock'
import { MyLabel } from '../myLabel'
import { VerticalSpace } from '../verticalSpace'

export function CreateProjectModal({ id, visible, disableType, type = 'web', close }) {
  const { t } = useTranslation()
  const [color, setColor] = useState('#880000')
  const [projectNames, setProjectNames] = useState([])
  const formRef = useRef()
  const { getProjects, postProject, putProject, getProject } = useProject()

  useEffect(async () => {
    if (visible) {
      const projects = await getProjects()
      if (!id) {
        formRef.current.setFieldsValue({
          name: '',
          description: '',
          type
        })

        setProjectNames(projects.map((project) => project.name))
      } else {
        const data = await getProject(id)
        formRef.current.setFieldsValue({
          name: data.name,
          description: data.description,
          type: data.type
        })
        setColor(data.color)

        setProjectNames(projects.map((project) => project.name).filter((name) => name !== data.name))
      }
    }
  }, [visible])

  const createProject = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        if (id) {
          await putProject(id, {
            ...values,
            color
          })
          publish(PROJECT_UPDATED)
        } else {
          await postProject({
            ...values,
            color,
            followerIds: []
          })
          publish(PROJECT_CREATED)
        }

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
    <Modal visible={visible} footer={null} onCancel={onCancel} width="700px" keyboard={false} style={{ minWidth: '700px' }}>
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
        <RightContainer>
          <InfoBlock message={t('project.createModalInfo')} />

          <ColorDropdown color={color} onColorChange={setColor}>
            <Button size="small" style={{ width: '100%', textAlign: 'start' }}>
              {t('project.color')}
              <span style={{ backgroundColor: color, width: '0.5rem', height: '0.5rem', marginLeft: '0.5rem' }} />
            </Button>
          </ColorDropdown>
          <VerticalSpace />

          <CreateButton text={t(id ? 'header.udpateProject' : 'project.createProject')} onClick={createProject} />
        </RightContainer>
      </Space>
    </Modal>
  )
}

const RightContainer = styled.div`
  margin-top: 40px;
`
