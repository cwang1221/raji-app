import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { subscribe, unsubscribe } from 'pubsub-js'
import { useEpic } from '../../hooks/useRequest'
import { ObjectSelector } from './ObjectSelector'
import { EpicStateIcon } from '../epicStateIcon'
import { EPIC_CREATED, EPIC_DELETED, EPIC_UPDATED } from '../../utils/events'

export function EpicSelector({ epicId, onEpicIdChange }) {
  const { t } = useTranslation()
  const [epics, setEpics] = useState([])
  const { getEpics } = useEpic()

  useEffect(() => {
    getEpicData()
    subscribe(EPIC_CREATED, getEpicData)
    subscribe(EPIC_UPDATED, getEpicData)
    subscribe(EPIC_DELETED, getEpicData)

    return () => {
      unsubscribe(EPIC_CREATED)
      unsubscribe(EPIC_UPDATED)
      unsubscribe(EPIC_DELETED)
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
