import { EnvironmentFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMilestone } from '../../hooks'
import { MilestoneStateIcon } from '../milestoneStateIcon'
import { MultiSelect } from './MultiSelect'

export function MilestoneFilter({ selectedMilestoneIds, onChange }) {
  const { t } = useTranslation()
  const { getMilestones } = useMilestone()
  const [milestones, setMilestones] = useState([])
  const [formattedSelectedKeys, setFormattedSelectedKeys] = useState([])

  useEffect(async () => {
    const data = await getMilestones()
    data.find((milestone) => milestone.id === 1).name = t('filterBar.noMilestone')
    data.sort((milestone1, milestone2) => milestone1.id - milestone2.id)

    setMilestones(data.map((milestone) => ({
      key: milestone.id.toString(),
      text: milestone.name,
      icon: milestone.id === 1 ? null : <MilestoneStateIcon state={milestone.state} />
    })))
    selectedMilestoneIds.length || onChange(data.map((milestone) => milestone.id))
  }, [])

  useEffect(() => {
    setFormattedSelectedKeys(selectedMilestoneIds.map((milestoneId) => milestoneId.toString()))
  }, [selectedMilestoneIds])

  return (
    <MultiSelect
      name={t('milestone.milestones')}
      icon={<EnvironmentFilled className="text-yellow-500" />}
      description={t('filterBar.milestoneHint')}
      showSearch
      items={milestones}
      allText={t('filterBar.allMilestones')}
      multipleText={t('milestone.milestones')}
      selectedKeys={formattedSelectedKeys}
      onSelectionChange={(milestoneIdStrings) => onChange(milestoneIdStrings.map((milestoneIdString) => parseInt(milestoneIdString, 10)))}
    />
  )
}
