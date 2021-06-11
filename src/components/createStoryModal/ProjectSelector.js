import { RightCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProject } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'

export function ProjectSelector({ projectId, onProjectIdChange, style }) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const { getProjects } = useProject()

  useEffect(async () => {
    const data = await getProjects()
    data.forEach((project) => {
      project.icon = <RightCircleFilled style={{ color: project.color }} />
    })
    setProjects(data)
    projectId || onProjectIdChange(`${data[0].id}`)
  }, [])

  useEffect(async () => {
    projectId || (projects.length && onProjectIdChange(`${projects[0].id}`))
  }, [projectId])

  return (
    <ObjectSelector
      title={t('general.project')}
      items={projects}
      selectedId={projectId}
      popupTitle={t('filterBar.projectHint')}
      onSelect={onProjectIdChange}
      style={style}
    />
  )
}
