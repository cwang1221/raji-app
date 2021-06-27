import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EpicStateIcon } from '../epicStateIcon'
import { SimpleSelector } from './SimpleSelector'

const states = ['todo', 'inProgress', 'done']

export function StateSelector({ state, onStateChange }) {
  const { t } = useTranslation()
  const statesRef = useRef(states.map((state) => ({
    key: state,
    text: t(`epic.${state}`),
    icon: <EpicStateIcon state={state} />
  })))

  return (
    <SimpleSelector
      title={t('general.state')}
      description={t('epic.updateEpicState')}
      showSearch={false}
      items={statesRef.current}
      selectedKey={state}
      onSelect={onStateChange}
    />
  )
}
