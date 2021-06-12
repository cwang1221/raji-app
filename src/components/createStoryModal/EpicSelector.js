import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEpic } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'
import { EpicStateIcon } from '../epicStateIcon'
import { eventBus, events } from '../../utils'

export function EpicSelector({ epicId, onEpicIdChange }) {
  const { t } = useTranslation()
  const [epics, setEpics] = useState([])
  const { getEpics } = useEpic()

  useEffect(() => {
    getEpicData()

    eventBus.subscribe(events.epicCreated, getEpicData)

    return () => {
      eventBus.unsubscribe(events.epicCreated, getEpicData)
    }
  }, [])

  const getEpicData = async () => {
    const data = await getEpics()
    data.forEach((epic) => {
      epic.icon = <EpicStateIcon state={epic.state} />
    })
    data.unshift({
      id: 'none',
      name: t('general.none'),
      icon: <EpicStateIcon state="todo" />
    })
    setEpics(data)
  }

  return (
    <ObjectSelector
      title={t('general.epic')}
      items={epics}
      selectedId={epicId}
      popupTitle={t('header.selectEpic')}
      onSelect={onEpicIdChange}
    />
  )
}
