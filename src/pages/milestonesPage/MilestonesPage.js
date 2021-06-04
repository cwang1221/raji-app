import { useTranslation } from 'react-i18next'
import { List, message, Space, Typography } from 'antd'
import { AppstoreFilled, RocketFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FilterBar, FilterItem, ProjectFilter } from '../../components'
import { useDocumentTitle, useMilestone, useProject } from '../../hooks'
import { Epic } from './Epic'
import { BacklogHeader } from './BacklogHeader'
import { MilestoneHeader } from './MilestoneHeader'
import { clone } from '../../utils'

export function MilestonesPage() {
  const { t } = useTranslation()
  const [statesFilter, setStatesFilter] = useState([])
  const [projectsFilter, setProjectsFilter] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const { getMilestonesList, putMilestone } = useMilestone()
  const { getProjects } = useProject()

  useDocumentTitle(t('milestones.milestones'))

  useEffect(async () => {
    getProjects().then((data) => setProjects(data.map((project) => ({ text: project.name, key: `${project.id}` }))))
  }, [])

  const getMilestones = async () => {
    const milestones = await getMilestonesList(statesFilter, projectsFilter)
    milestones.sort((milestone1, milestone2) => {
      if (milestone1.name === 'BACKLOG') {
        return -1
      }
      return milestone1.id - milestone2.id
    })
    setMilestones(milestones)
  }

  useEffect(() => {
    getMilestones()
  }, [statesFilter, projectsFilter])

  const onChangeView = () => {
    message.info('Not ready :)')
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const milestonesClone = clone(milestones)

    const sourceMilestone = milestonesClone.find((milestone) => `${milestone.id}` === result.source.droppableId)
    const draggableId = sourceMilestone.epicIds.splice(result.source.index, 1)[0]
    const draggableEpic = sourceMilestone.epics.splice(result.source.index, 1)[0]

    const destinationMilestone = milestonesClone.find((milestone) => `${milestone.id}` === result.destination.droppableId)
    destinationMilestone.epicIds.splice(result.destination.index, 0, draggableId)
    destinationMilestone.epics.splice(result.destination.index, 0, draggableEpic)

    setMilestones(milestonesClone)
    putMilestone(destinationMilestone.id, { epicIds: destinationMilestone.epicIds })
    sourceMilestone.id !== destinationMilestone.id && putMilestone(sourceMilestone.id, { epicIds: sourceMilestone.epicIds })
  }

  const changeState = async (id, state) => {
    const milestonesClone = clone(milestones)
    milestonesClone.find((milestone) => milestone.id === id).state = state

    setMilestones(milestonesClone)
    await putMilestone(id, { state })
    getMilestones()
  }

  return (
    <>
      <Typography.Title level={3}>{t('milestones.milestones')}</Typography.Title>

      <FilterBar>
        <ProjectFilter />
        <FilterItem.Seperator />
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
            { text: t('milestones.todo'), key: 'todo' },
            { text: t('milestones.inProgress'), key: 'inProgress' },
            { text: t('milestones.done'), key: 'done' }
          ]}
          value={statesFilter}
          defaultValue={[]}
          onChange={setStatesFilter}
        />
        {/* <FilterItem.MultiSelect
          name={t('milestones.projects')}
          icon={<RocketFilled style={{ color: 'rgb(218, 111, 129)' }} />}
          items={projects}
          value={projectsFilter}
          defaultValue={[]}
          onChange={setProjectsFilter}
        /> */}
        <ProjectFilter onChange={setProjectsFilter} />
      </FilterBar>

      <DragDropContext onDragEnd={onDragEnd}>
        <Space align="start">
          {milestones.map((milestone) => (
            <MilestoneContainer
              as={List}
              bordered
              key={milestone.id}
              header={milestone.name === 'BACKLOG'
                ? <BacklogHeader countOfEpics={milestone.epics.length} />
                : (() => {
                  let countOfStories = 0
                  let countOfDoneStories = 0
                  let countOfInProgressStories = 0
                  let totalPoint = 0

                  milestone.epics.forEach((epic) => {
                    countOfStories += epic.countOfStories
                    countOfDoneStories += epic.countOfDoneStories
                    countOfInProgressStories += epic.countOfInProgressStories
                    totalPoint += epic.totalPoint
                  })
                  return (
                    <MilestoneHeader
                      id={milestone.id}
                      name={milestone.name}
                      countOfEpics={milestone.epics.length}
                      countOfStories={countOfStories}
                      countOfDoneStories={countOfDoneStories}
                      countOfInProgressStories={countOfInProgressStories}
                      state={milestone.state}
                      totalPoint={totalPoint}
                      changeState={changeState}
                    />
                  )
                })()}
              style={{ backgroundColor: 'white' }}
            >

              <Droppable droppableId={`${milestone.id}`}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '4rem' }}>
                    {milestone.epics.map((epic, index) => (
                      <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Epic
                              name={epic.name}
                              state={epic.state}
                              countOfStories={epic.countOfStories}
                              countOfDoneStories={epic.countOfDoneStories}
                              countOfInProgressStories={epic.countOfInProgressStories}
                              totalPoint={epic.totalPoint}
                              owners={epic.owners}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </MilestoneContainer>
          ))}
        </Space>
      </DragDropContext>
    </>
  )
}

const MilestoneContainer = styled.div`
  width: 20rem;
`
