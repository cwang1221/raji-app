import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { clone } from 'lodash'
import { FilterTitle } from './FilterTitle'
import { CheckItem } from './CheckItem'

export function StateFilter({ selectedStates, onSelectionChange }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(true)
  const statesRef = useRef(['unscheduled', 'readyForDevelopment', 'inDevelopment', 'readyForReview', 'readyForDeploy', 'completed'])

  useEffect(() => {
    selectedStates.length === 0 && onSelectionChange(statesRef.current)
  }, [])

  const onCheck = (id, checked) => {
    const selectedStatesClone = clone(selectedStates)
    if (checked) {
      selectedStatesClone.push(id)
    } else {
      const index = selectedStatesClone.indexOf(id)
      selectedStatesClone.splice(index, 1)
    }
    onSelectionChange(selectedStatesClone)
  }

  return (
    <Container>
      <FilterTitle expanded={expanded} title={t('story.workflowState').toLocaleUpperCase()} onExpandedChange={setExpanded} />
      <ItemsContainer expanded={expanded} height={180}>
        {statesRef.current.map((state) => (
          <CheckItem key={state} checked={selectedStates.includes(state)} onCheck={(checked) => onCheck(state, checked)}>
            {t(`story.${state}`)}
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
