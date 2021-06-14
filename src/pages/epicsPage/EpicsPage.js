import { message, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EpicStateFilter, FilterBar, FilterItem, MilestoneFilter, ProjectFilter } from '../../components'
import { EpicSelector } from '../../components/createStoryModal/EpicSelector'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'

export function EpicsPage() {
  const { t } = useTranslation()
  const [filteredProjects, setFilteredProjects] = useState([])
  const [filteredMilestones, setFilteredMilestones] = useState([])
  const [filteredStates, setFilteredStates] = useState([])

  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(() => {
    setHeaderCreateButtonType('epic')
  }, [])

  const onChangeView = () => {
    message.info('Not ready :)')
  }

  return (
    <>
      <Typography.Title level={3}>{t('general.epics')}</Typography.Title>

      <FilterBar
        leftChildren={[
          <ProjectFilter key="projectFilter" onChange={setFilteredProjects} />,
          <MilestoneFilter key="milestoneFilter" onChange={setFilteredMilestones} />,
          <EpicStateFilter key="epicStateFilter" onChange={setFilteredStates} />
        ]}
        rightChildren={[
          <FilterItem.RadioGroupButton
            key="viewSetting"
            name={t('milestone.view')}
            items={[
              { text: t('milestone.column'), key: 'column' },
              { text: t('milestone.table'), key: 'table' }
            ]}
            value="column"
            onChange={onChangeView}
          />
        ]}
      />
    </>
  )
}
