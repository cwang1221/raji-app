import { Typography, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle, useProject } from '../../hooks'
import { ProjectCard } from './ProjectCard'

export function ProjectsPage() {
  const { t } = useTranslation()
  const [webProjects, setWebProjects] = useState([])
  const [mobileProjects, setMobileProjects] = useState([])
  const { getProjectList } = useProject()

  useDocumentTitle(t('project.projects'))

  useEffect(async () => {
    const data = await getProjectList()
    setWebProjects(data.filter((project) => project.type === 'web'))
    setMobileProjects(data.filter((project) => project.type === 'mobile'))
  }, [])

  return (
    <>
      <Typography.Title level={3}>{t('project.projects')}</Typography.Title>
      <Space style={{ marginTop: '0.5rem' }}>
        <Typography.Title level={5}>Web</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('project.has', { count: webProjects.length })}</Typography.Title>
      </Space>
      <div>
        <Space size={20} wrap>
          {webProjects.map((project) => (
            <ProjectCard
              key={project.id}
              indicator={project.color}
              title={project.name}
              description={project.description}
              storyCount={project.countOfStories}
              point={project.totalPoint}
              isFollowing={project.isFollowing}
            />
          ))}
        </Space>
      </div>
      <Space style={{ marginTop: '2rem' }}>
        <Typography.Title level={5}>Mobile</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('project.has', { count: mobileProjects.length })}</Typography.Title>
      </Space>
      <div>
        <Space size={20}>
          {mobileProjects.map((project) => (
            <ProjectCard
              key={project.id}
              indicator={project.color}
              title={project.name}
              description={project.description}
              storyCount={project.countOfStories}
              point={project.totalPoint}
              isFollowing={project.isFollowing}
            />
          ))}
        </Space>
      </div>
    </>
  )
}
