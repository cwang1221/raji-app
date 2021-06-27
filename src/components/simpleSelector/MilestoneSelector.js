import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { subscribe, unsubscribe } from 'pubsub-js'
import { useMilestone } from '../../hooks/useRequest'
import { MilestoneStateIcon } from '..'
import { MILESTONE_CREATED, MILESTONE_DELETED, MILESTONE_UPDATED } from '../../utils/events'
import { SimpleSelector } from './SimpleSelector'

export function MilestoneSelector({ milestoneId, onMilestoneIdChange }) {
  const { t } = useTranslation()
  const [milestones, setMilestones] = useState([])
  const { getMilestones } = useMilestone()

  useEffect(() => {
    getMilestoneData()

    subscribe(MILESTONE_CREATED, getMilestoneData)
    subscribe(MILESTONE_UPDATED, getMilestoneData)
    subscribe(MILESTONE_DELETED, getMilestoneData)

    return () => {
      unsubscribe(MILESTONE_CREATED)
      unsubscribe(MILESTONE_UPDATED)
      unsubscribe(MILESTONE_DELETED)
    }
  }, [])

  const getMilestoneData = async () => {
    const data = await getMilestones()
    const indexOfBacklog = data.findIndex((milestone) => milestone.id === 1)
    data.splice(indexOfBacklog, 1)

    const tempMilestones = []
    data.forEach((milestone) => tempMilestones.push({
      key: milestone.id.toString(),
      text: milestone.name,
      icon: <MilestoneStateIcon state={milestone.state} />
    }))

    tempMilestones.unshift({
      key: 'none',
      text: t('epic.noMilestone')
    })
    setMilestones(tempMilestones)
  }

  return (
    <SimpleSelector
      title={t('general.milestone')}
      description={t('epic.updateEpicMilestone')}
      showSearch
      items={milestones}
      selectedKey={milestoneId}
      onSelect={onMilestoneIdChange}
    />
  )
}
