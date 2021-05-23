import { Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from './ProjectCard'

export function ProjectsPage() {
  const { t } = useTranslation()
  return (
    <>
      <Typography.Title level={3}>{t('projects.projects')}</Typography.Title>
      <Space>
        <Typography.Title level={5}>{t('projects.web')}</Typography.Title>
        <Typography.Title level={5} style={{ fontWeight: 400 }}>{t('projects.has', { count: 3 })}</Typography.Title>
      </Space>
      <div>
        <Space size={20}>
          <ProjectCard
            indicator="#FEB511"
            title="Backend"
            description="The Flying Robots API server handles all requests from our frontend and any libraries calling the API directly."
            storyCount="57"
            point="71"
          />
          <ProjectCard
            indicator="#FF6500"
            title="Frontend"
            description="All design and development of the Flying Robots web application."
            storyCount="39"
            point="47"
          />
        </Space>
      </div>
    </>
  )
}
