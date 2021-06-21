import { Typography, Space, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateProjectModal } from '../../components'
import { useEventContext } from '../../contexts/eventContext'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useDocumentTitle, useProject } from '../../hooks'
import { clone } from '../../utils'
import { ProjectCard } from './ProjectCard'

export function ProjectsPage() {
  const { t } = useTranslation()
  const [webProjects, setWebProjects] = useState([])
  const [mobileProjects, setMobileProjects] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [createType, setCreateType] = useState('web')

  const { getProjectList, deleteProject } = useProject()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()
  const { projectCreatedEvent, projectDeletedEvent, projectUpdatedEvent, storyCreatedEvent, storyDeletedEvent, publishProjectDeletedEvent } = useEventContext()

  useDocumentTitle(t('project.projects'))

  useEffect(() => {
    setHeaderCreateButtonType('project')
  }, [])

  useEffect(() => {
    getProjects()
  }, [projectCreatedEvent, projectDeletedEvent, projectUpdatedEvent, storyCreatedEvent, storyDeletedEvent])

  const getProjects = async () => {
    const data = await getProjectList()
    setWebProjects(data.filter((project) => project.type === 'web'))
    setMobileProjects(data.filter((project) => project.type === 'mobile'))
  }

  const openCreateModal = async (projectType) => {
    setCreateType(projectType)
    setShowModal(true)
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

    publishProjectDeletedEvent()
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
      <CreateProjectModal visible={showModal} disableType type={createType} close={() => setShowModal(false)} />
    </>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
