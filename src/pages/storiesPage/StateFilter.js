import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { clone } from 'lodash'
import { FilterTitle } from './FilterTitle'
import { CheckItem } from './CheckItem'

export function StateFilter({ selectedStates, onSelectionChange, expanded, onExpandedChange }) {
  const { t } = useTranslation()
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
    <div className="flex flex-col my-2">
      <FilterTitle expanded={expanded} title={t('story.workflowState').toLocaleUpperCase()} onExpandedChange={onExpandedChange} />
      <div style={{ height: expanded ? '180px' : 0 }} className="transition-all overflow-hidden">
        {statesRef.current.map((state) => (
          <CheckItem key={state} checked={selectedStates.includes(state)} onCheck={(checked) => onCheck(state, checked)}>
            {t(`story.${state}`)}
          </CheckItem>
        ))}
      </div>
    </div>
  )
}
