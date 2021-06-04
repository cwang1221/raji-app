import { Typography, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle, useProject } from '../../hooks'
import { ProjectCard } from './ProjectCard'

export function ProjectsPage() {
  const { t } = useTranslation()
  const [webProjects, setWebProjects] = useState([])
  const [mobileProjects, setMobileProjects] = useState([])
  const { getProjects } = useProject()

  useDocumentTitle(t('projects.projects'))

  useEffect(async () => {
    const data = await getProjects()
    setWebProjects(data.filter((project) => project.type === 'web'))
    setMobileProjects(data.filter((project) => project.type === 'mobile'))
  }, [])

  return (
    <>
      <Typography.Title level={3}>{t('projects.projects')}</Typography.Title>
      <Space style={{ marginTop: '0.5rem' }}>
        <Typography.Title level={5}>Web</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('projects.has', { count: webProjects.length })}</Typography.Title>
      </Space>
      <div>
        <Space size={20} wrap>
          {webProjects.map(({ id, color, name, description }) => (
            <ProjectCard
              key={id}
              indicator={color}
              title={name}
              description={description}
              storyCount="57"
              point="71"
            />
          ))}
        </Space>
      </div>
      <Space style={{ marginTop: '2rem' }}>
        <Typography.Title level={5}>Mobile</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('projects.has', { count: mobileProjects.length })}</Typography.Title>
      </Space>
      <div>
        <Space size={20}>
          {mobileProjects.map(({ id, color, name, description }) => (
            <ProjectCard
              key={id}
              indicator={color}
              title={name}
              description={description}
              storyCount="57"
              point="71"
            />
          ))}
        </Space>
      </div>
    </>
  )
}
