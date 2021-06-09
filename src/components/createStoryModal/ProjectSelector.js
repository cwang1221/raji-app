import { RightCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProject } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'

export function ProjectSelector(projectId, setProjectId) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const { getProjects } = useProject()

  useEffect(async () => {
    const data = await getProjects()
    setProjects(data)
  }, [])

  return (
    <ObjectSelector
      icon={<RightCircleFilled />}
      title={t('general.project')}
      text="Background"
      items={projects}
      selectedKey={projectId}
      popupTitle={t('filterBar.projectHint')}
    />
  )
}
