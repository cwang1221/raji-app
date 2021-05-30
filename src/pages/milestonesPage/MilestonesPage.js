import { useTranslation } from 'react-i18next'
import { Card, message, Space, Typography } from 'antd'
import { AppstoreFilled, RocketFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FilterBar, FilterItem } from '../../components'
import { useEpicList, useMilestones, useProjects } from '../../hooks'
import { Epic } from './Epic'

const formatEpics = (epics) => {
  const formattedEpics = { backlog: [] }
  epics.forEach((epic) => {
    if (!epic.milestoneId) {
      formattedEpics.backlog.push(epic)
      return
    }

    formattedEpics[epic.milestoneId] || (formattedEpics[epic.milestoneId] = [])
    formattedEpics[epic.milestoneId].push(epic)
  })

  Object.keys(formattedEpics).forEach((milestoneId) => {
    formattedEpics[milestoneId].sort((epic1, epic2) => (epic1.indexInMilestone < epic2.indexInMilestone ? -1 : 1))
  })
  return formattedEpics
}

export function MilestonesPage() {
  const { t } = useTranslation()
  const [statesFilter, setStatesFilter] = useState([])
  const [projectsFilter, setProjectsFilter] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const [epics, setEpics] = useState({ backlog: [] })

  useEffect(async () => {
    useProjects().then((data) => setProjects(data.map((project) => ({ text: project.name, key: `${project.id}` }))))
    const milestonesData = await useMilestones()
    setMilestones(milestonesData)
  }, [])

  useEffect(async () => {
    const epicsData = await useEpicList(statesFilter, projectsFilter)
    setEpics(formatEpics(epicsData))
  }, [statesFilter, projectsFilter])

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
            { text: t('milestones.readyForDev'), key: 'readyForDev' },
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

      <Space wrap align="start">
        {Object.keys(epics).sort((milestoneId1, milestoneId2) => {
          if (milestoneId1 === 'backlog') {
            return -1
          }
          return parseInt(milestoneId1, 10) < parseInt(milestoneId2, 10) ? -1 : 1
        }).map((milestoneId) => (
          <MilestoneContainer as={Card} key={milestoneId || 'backlog'}>
            <Card.Grid style={{ width: '100%' }}>
              {milestoneId === 'backlog' ? t('milestones.backlog') : milestones.find((milestone) => `${milestone.id}` === milestoneId).name}
            </Card.Grid>
            {epics[milestoneId].map((epic) => (
              <Epic
                key={epic.id}
                name={`${epic.name} ${epic.id}`}
                state={epic.state}
                countOfStories={epic.countOfStories}
                countOfDoneStories={epic.countOfDoneStories}
                countOfInProgressStories={epic.countOfInProgressStories}
                totalPoint={epic.totalPoint}
                owners={epic.owners}
              />
            ))}
          </MilestoneContainer>
        ))}
      </Space>
    </>
  )
}

const MilestoneContainer = styled.div`
  width: 20rem;
`
