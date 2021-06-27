import { RightCircleFilled } from '@ant-design/icons'
import { subscribe, unsubscribe } from 'pubsub-js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProject } from '../../hooks/useRequest'
import { PROJECT_CREATED, PROJECT_DELETED, PROJECT_UPDATED } from '../../utils/events'
import { ObjectSelector } from './ObjectSelector'

export function ProjectSelector({ projectId, onProjectIdChange }) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const { getProjects } = useProject()

  useEffect(() => {
    getProjectData()
    subscribe(PROJECT_CREATED, getProjectData)
    subscribe(PROJECT_UPDATED, getProjectData)
    subscribe(PROJECT_DELETED, getProjectData)

    return () => {
      unsubscribe(PROJECT_CREATED)
      unsubscribe(PROJECT_UPDATED)
      unsubscribe(PROJECT_DELETED)
    }
  }, [])

  useEffect(async () => {
    !projectId && projects.length && onProjectIdChange(`${projects[0].id}`)
  }, [projectId, projects])

  const getProjectData = async () => {
    const data = await getProjects()
    data.forEach((project) => {
      project.icon = <RightCircleFilled style={{ color: project.color }} />
    })
    setProjects(data)
  }

  return (
    <ObjectSelector
      title={t('general.project')}
      items={projects}
      selectedId={projectId}
      popupTitle={t('filterBar.projectHint')}
      onSelect={onProjectIdChange}
    />
  )
}
