import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clone } from 'lodash'
import { subscribe, unsubscribe } from 'pubsub-js'
import { FilterTitle } from './FilterTitle'
import { useProject } from '../../hooks/useRequest'
import { CheckItem } from './CheckItem'
import { PROJECT_CREATED } from '../../utils/events'

export function ProjectFilter({ selectedProjectIds, onSelectionChange, expanded, onExpandedChange }) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const selectedProjectIdsRef = useRef(selectedProjectIds)

  const { getProjects } = useProject()

  useEffect(() => {
    getProjectData()
    subscribe(PROJECT_CREATED, getProjectData)

    return () => {
      unsubscribe(PROJECT_CREATED)
    }
  }, [])

  useEffect(() => {
    selectedProjectIdsRef.current = selectedProjectIds
  }, [selectedProjectIds])

  const getProjectData = async () => {
    const data = await getProjects()
    data.forEach((project) => { project.id = project.id.toString() })
    setProjects(data)
    selectedProjectIdsRef.current.length === 0 && onSelectionChange(data.map((project) => project.id))
  }

  const onCheck = (id, checked) => {
    const selectedProjectIdsClone = clone(selectedProjectIds)
    if (checked) {
      selectedProjectIdsClone.push(id)
    } else {
      const index = selectedProjectIdsClone.indexOf(id)
      selectedProjectIdsClone.splice(index, 1)
    }
    onSelectionChange(selectedProjectIdsClone)
  }

  return (
    <div className="flex flex-col my-2">
      <FilterTitle expanded={expanded} title={t('general.projects').toLocaleUpperCase()} onExpandedChange={onExpandedChange} />
      <div style={{ height: expanded ? `${projects.length * 30}px` : 0 }} className="transition-all overflow-hidden">
        {projects.map((project) => (
          <CheckItem key={project.id} checked={selectedProjectIds.includes(project.id)} color={project.color} onCheck={(checked) => onCheck(project.id, checked)}>
            {project.name}
          </CheckItem>
        ))}
      </div>
    </div>
  )
}
