import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ObjectSelector } from './ObjectSelector'
import { StoryTypeIcon } from '..'

export function StoryTypeSelector({ type, onTypeChange, style }) {
  const { t } = useTranslation()
  const typsRef = useRef(['feature', 'bug', 'chore'].map((type) => ({
    id: type,
    name: t(`story.${type}`),
    icon: <StoryTypeIcon type={type} />
  })))

  return (
    <ObjectSelector
      title={t('general.type')}
      items={typsRef.current}
      selectedId={type}
      popupTitle={t('header.selectStoryType')}
      onSelect={onTypeChange}
      showSearch={false}
      style={style}
    />
  )
}
