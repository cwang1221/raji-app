import { useTranslation } from 'react-i18next'
import { message, Typography } from 'antd'
import { AppstoreFilled, RocketFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { FilterBar, FilterItem } from '../../components'
import { useProjects } from '../../hooks'

export function MilestonesPage() {
  const { t } = useTranslation()
  const [statesFilter, setStatesFilter] = useState(['notStarted', 'inProgress'])
  const [projectsFilter, setProjectsFilter] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(async () => {
    const data = await useProjects()
    setProjects(data.map((project) => ({ text: project.name, key: `${project.id}` })))
  }, [])

  const onChangeView = () => {
    message.info('Not ready :)')
  }

  return (
    <>
      <Typography.Title level={3}>{t('milestones.milestones')}</Typography.Title>
      <FilterBar>
        <FilterItem.RadioGroupButton
          name={t('milestones.view')}
          items={[
            { text: t('milestones.column'), key: 'column' },
            { text: t('milestones.table'), key: 'table' }
          ]}
          value="column"
          onChange={onChangeView}
        />
        <FilterItem.Seperator />
        <FilterItem.MultiSelect
          name={t('milestones.states')}
          icon={<AppstoreFilled style={{ color: 'rgb(132, 131, 135)' }} />}
          items={[
            { text: t('milestones.notStarted'), key: 'notStarted' },
            { text: t('milestones.inProgress'), key: 'inProgress' },
            { text: t('milestones.readyForDev') + 11111, key: 'readyForDev' },
            { text: t('milestones.done'), key: 'done' }
          ]}
          value={statesFilter}
          defaultValue={[]}
          onChange={setStatesFilter}
        />
        <FilterItem.MultiSelect
          name={t('milestones.projects')}
          icon={<RocketFilled style={{ color: 'rgb(218, 111, 129)' }} />}
          items={projects}
          value={projectsFilter}
          defaultValue={[]}
          onChange={setProjectsFilter}
        />
      </FilterBar>
    </>
  )
}
