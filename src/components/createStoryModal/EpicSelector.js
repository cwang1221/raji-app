import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEpic } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'
import { EpicStateIcon } from '../epicStateIcon'

export function EpicSelector({ epicId, onEpicIdChange, style }) {
  const { t } = useTranslation()
  const [epics, setEpics] = useState([])
  const { getEpics } = useEpic()

  useEffect(async () => {
    const data = await getEpics()
    data.forEach((epic) => {
      epic.icon = <EpicStateIcon state={epic.state} />
    })
    setEpics(data)
    epicId || onEpicIdChange(data[0].id)
  }, [])

  return (
    <ObjectSelector
      title={t('general.epic')}
      items={epics}
      selectedId={epicId}
      popupTitle={t('header.selectEpic')}
      onSelect={onEpicIdChange}
      style={style}
    />
  )
}
