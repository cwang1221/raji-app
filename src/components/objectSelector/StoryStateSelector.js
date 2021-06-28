import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ObjectSelector } from './ObjectSelector'
import { StoryStateIcon } from '..'

export function StoryStateSelector({ state, onStateChange }) {
  const { t } = useTranslation()
  const statesRef = useRef(['unscheduled', 'readyForDevelopment', 'inDevelopment', 'readyForReview', 'readyForDeploy', 'completed'].map((state) => ({
    id: state,
    name: t(`story.${state}`),
    icon: <StoryStateIcon state={state} />
  })))

  return (
    <ObjectSelector
      title={t('general.state')}
      items={statesRef.current}
      selectedId={state}
      popupTitle={t('header.selectState')}
      onSelect={onStateChange}
    />
  )
}
