import { Typography, Space, Button, Modal, Form, Input, Alert, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateButton, MyLabel } from '../../components'
import { useDocumentTitle, useProject } from '../../hooks'
import { clone, focusErrorInForm } from '../../utils'
import { ColorDropdown } from './ColorDropdown'
import { ProjectCard } from './ProjectCard'

export function ProjectsPage() {
  const { t } = useTranslation()
  const [webProjects, setWebProjects] = useState([])
  const [mobileProjects, setMobileProjects] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [createModelColor, setCreateModelColor] = useState('#00D38C')
  const [typeDisabled, setTypeDisabled] = useState(false)
  const [initialType, setInitialType] = useState('web')

  const { getProjectList, postProject, deleteProject } = useProject()
  const formRef = useRef()

  useDocumentTitle(t('project.projects'))

  useEffect(async () => {
    const data = await getProjectList()
    setWebProjects(data.filter((project) => project.type === 'web'))
    setMobileProjects(data.filter((project) => project.type === 'mobile'))
  }, [])

  useEffect(() => {
    if (showModal) {
      formRef.current.setFieldsValue({
        name: '',
        description: '',
        type: initialType
      })
    }
  }, [showModal])

  const openCreateModal = async (projectType) => {
    setInitialType(projectType)
    setTypeDisabled(true)
    setShowModal(true)
  }

  const createProject = () => {
    const createForm = formRef.current
    createForm.validateFields()
      .then(async (values) => {
        const data = await postProject({
          ...values,
          color: createModelColor,
          followerIds: [],
          countOfStories: 0,
          totalPoint: 0
        })

        if (values.type === 'web') {
          const projectsClone = clone(webProjects)
          projectsClone.push(data)
          setWebProjects(projectsClone)
        } else {
          const projectsClone = clone(mobileProjects)
          projectsClone.push(data)
          setMobileProjects(projectsClone)
        }

        setShowModal(false)
      })
      .catch(() => {
        focusErrorInForm(formRef)
      })
  }

  const onCancel = () => {
    formRef.current.resetFields()
    setShowModal(false)
  }

  const onDelete = async (id) => {
    await deleteProject(id)

    let index = webProjects.findIndex((project) => project.id === id)
    let projectsClone
    if (index >= 0) {
      projectsClone = clone(webProjects)
      projectsClone.splice(index, 1)
      setWebProjects(projectsClone)
    } else {
      index = mobileProjects.findIndex((project) => project.id === id)
      projectsClone = clone(mobileProjects)
      projectsClone.splice(index, 1)
      setMobileProjects(projectsClone)
    }
  }

  return (
    <>
      <Typography.Title level={3}>{t('project.projects')}</Typography.Title>
      <Space style={{ marginTop: '0.5rem' }}>
        <Typography.Title level={5}>{t('project.web')}</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('project.has', { count: webProjects.length })}</Typography.Title>
      </Space>
      <div>
        <CardContainer>
          {webProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              indicator={project.color}
              title={project.name}
              description={project.description}
              storyCount={project.countOfStories}
              point={project.totalPoint}
              followerIds={project.followerIds}
              onDelete={onDelete}
            />
          ))}
        </CardContainer>
        <div>
          <Button size="small" onClick={() => openCreateModal('web')}>{t('project.createButton')}</Button>
        </div>
      </div>
      <Space style={{ marginTop: '2rem' }}>
        <Typography.Title level={5}>{t('project.mobile')}</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('project.has', { count: mobileProjects.length })}</Typography.Title>
      </Space>
      <div>
        <CardContainer>
          {mobileProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              indicator={project.color}
              title={project.name}
              description={project.description}
              storyCount={project.countOfStories}
              point={project.totalPoint}
              followerIds={project.followerIds}
              onDelete={onDelete}
            />
          ))}
        </CardContainer>
        <div>
          <Button size="small" onClick={() => openCreateModal('mobile')}>{t('project.createButton')}</Button>
        </div>
      </div>
      <Modal visible={showModal} footer={null} onCancel={onCancel} width="700px">
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
                  const hasDuplicate = webProjects.some((project) => project.name === value) || mobileProjects.some((project) => project.name === value)
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
              <Select disabled={typeDisabled}>
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

            <ColorDropdown color={createModelColor} onColorChange={setCreateModelColor}>
              <Button size="small" style={{ width: '100%' }}>
                {t('project.color')}
                <span style={{ backgroundColor: createModelColor, width: '0.5rem', height: '0.5rem', marginLeft: '0.5rem' }} />
              </Button>
            </ColorDropdown>
            <CreateButton text={t('project.createProject')} onClick={createProject} />
          </Space>
        </Space>
      </Modal>
    </>
  )
}

const CreateInfo = styled.div`
  margin-top: 2.5rem;
  background-color: rgb(232, 240, 253);
  border: 0;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
