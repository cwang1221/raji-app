import { useTranslation } from 'react-i18next'
import { List, message, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { FilterBar, FilterItem, MilestoneStateFilter, ProjectFilter } from '../../components'
import { useDocumentTitle, useMilestone } from '../../hooks'
import { Epic } from './Epic'
import { BacklogHeader } from './BacklogHeader'
import { MilestoneHeader } from './MilestoneHeader'
import { clone, setHeaderCreateButton } from '../../utils'

export function MilestonesPage() {
  const { t } = useTranslation()
  const [filteredStates, setFilteredStates] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const { getMilestonesList, putMilestone } = useMilestone()

  useDocumentTitle(t('milestone.milestones'))

  useEffect(() => {
    setHeaderCreateButton('milestone')
  }, [])

  useEffect(() => {
    getMilestones()
  }, [filteredStates, filteredProjects])

  const getMilestones = async () => {
    const milestones = await getMilestonesList(filteredStates, filteredProjects)
    setMilestones(milestones)
  }

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
      <Typography.Title level={3}>{t('milestone.milestones')}</Typography.Title>

      <FilterBar
        leftChildren={[
          <MilestoneStateFilter key="milestoneStateFilter" onChange={setFilteredStates} />,
          <FilterItem.Seperator key="seperator" />,
          <ProjectFilter key="projectFilter" onChange={setFilteredProjects} />
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Space align="start">
          {milestones.map((milestone) => (
            <MilestoneContainer
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

const MilestoneContainer = styled(List)`
  width: 20rem;
`
