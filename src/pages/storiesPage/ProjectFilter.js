import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { clone } from 'lodash'
import { FilterTitle } from './FilterTitle'
import { useProject } from '../../hooks/useRequest'
import { CheckItem } from './CheckItem'
import { useEventContext } from '../../contexts/eventContext'

export function ProjectFilter({ selectedProjectIds, onSelectionChange, expanded, onExpandedChange }) {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const selectedProjectIdsRef = useRef(selectedProjectIds)

  const { getProjects } = useProject()
  const { projectCreatedEvent, projectDeletedEvent } = useEventContext()

  useEffect(() => {
    getProjectData()
  }, [projectCreatedEvent, projectDeletedEvent])

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
    <Container>
      <FilterTitle expanded={expanded} title={t('general.projects').toLocaleUpperCase()} onExpandedChange={onExpandedChange} />
      <ItemsContainer expanded={expanded} height={projects.length * 30}>
        {projects.map((project) => (
          <CheckItem key={project.id} checked={selectedProjectIds.includes(project.id)} color={project.color} onCheck={(checked) => onCheck(project.id, checked)}>
            {project.name}
          </CheckItem>
        ))}
      </ItemsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`

const ItemsContainer = styled.div`
  overflow: hidden;
  height: ${(props) => (props.expanded ? `${props.height}px` : '0')};
  -webkit-transition:height 300ms ease-in-out;
  -moz-transition:height 300ms ease-in-out;
  -o-transition:height 300ms ease-in-out;
  transition:height 300ms ease-in-out;
`
