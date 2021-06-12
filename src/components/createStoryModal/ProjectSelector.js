import { RightCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProject } from '../../hooks/useRequest'
import { eventBus, events } from '../../utils'
import { ObjectSelector } from './ObjectSelector'

export function ProjectSelector({ projectId, onProjectIdChange }) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const { getProjects } = useProject()

  useEffect(() => {
    getProjectData()

    eventBus.subscribe(events.projectCreated, getProjectData)

    return () => {
      eventBus.unsubscribe(events.projectCreated, getProjectData)
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
