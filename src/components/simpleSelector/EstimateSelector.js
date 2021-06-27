import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SimpleSelector } from './SimpleSelector'

const estimates = ['none', '0', '1', '2', '4', '8']

export function EstimateSelector({ estimate, onEstimateChange }) {
  const { t } = useTranslation()
  const estimatesRef = useRef(estimates.map((estimate) => ({
    key: estimate,
    text: estimate === 'none' ? t('general.unestimated') : t('general.countPoints', { count: estimate })
  })))

  return (
    <SimpleSelector
      title={t('general.estimate')}
      description={t('story.estimateStory')}
      showSearch={false}
      items={estimatesRef.current}
      selectedKey={estimate}
      onSelect={onEstimateChange}
    />
  )
}
