import { RightCircleFilled, RocketOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProject } from '../../hooks'
import { MultiSelect } from './MultiSelect'

export function ProjectFilter({ selectedProjectIds, onChange }) {
  const { t } = useTranslation()
  const { getProjects } = useProject()
  const [projects, setProjects] = useState([])
  const [formattedSelectedKeys, setFormattedSelectedKeys] = useState([])

  useEffect(async () => {
    const data = await getProjects()
    setProjects(data.map((project) => ({
      key: project.id.toString(),
      text: project.name,
      icon: <RightCircleFilled style={{ color: project.color }} />
    })))
    selectedProjectIds.length || onChange(data.map((project) => project.id))
  }, [])

  useEffect(() => {
    setFormattedSelectedKeys(selectedProjectIds.map((projectId) => projectId.toString()))
  }, [selectedProjectIds])

  return (
    <MultiSelect
      name={t('milestone.projects')}
      icon={<RocketOutlined />}
      description={t('filterBar.projectHint')}
      showSearch
      items={projects}
      allText={t('filterBar.allProjects')}
      multipleText={t('milestone.projects')}
      selectedKeys={formattedSelectedKeys}
      onSelectionChange={(projectIdStrings) => onChange(projectIdStrings.map((projectIdString) => parseInt(projectIdString, 10)))}
    />
  )
}
