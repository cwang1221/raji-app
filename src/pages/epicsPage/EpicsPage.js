import { message, Typography } from 'antd'
import { publish, subscribe, unsubscribe } from 'pubsub-js'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { EpicStateFilter, FilterBar, MilestoneFilter, ProjectFilter, RadioGroupButton } from '../../components'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useEpic } from '../../hooks'
import { EPIC_CREATED, EPIC_UPDATED, STORY_CREATED, STORY_UPDATED } from '../../utils/events'
import { AreaTitle } from './AreaTitle'
import { DoneItem } from './DoneItem'
import { InProgressItem } from './InProgressItem'
import { TodoItem } from './TodoItem'

export function EpicsPage() {
  const { t } = useTranslation()
  const [epics, setEpics] = useState({
    todo: [],
    inProgress: [],
    done: []
  })
  const [filteredProjects, setFilteredProjects] = useState(['all'])
  const [filteredMilestones, setFilteredMilestones] = useState(['all'])
  const [filteredStates, setFilteredStates] = useState(['all'])
  const [dropDisabledState, setDropDisabledState] = useState('')
  const { getEpicsUiList, putEpic } = useEpic()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(() => {
    setHeaderCreateButtonType('epic')
    subscribe(STORY_CREATED, getEpicData)
    subscribe(STORY_UPDATED, getEpicData)
    subscribe(EPIC_CREATED, getEpicData)
    subscribe(EPIC_UPDATED, getEpicData)

    return () => {
      unsubscribe(STORY_CREATED)
      unsubscribe(STORY_UPDATED)
      unsubscribe(EPIC_CREATED)
      unsubscribe(EPIC_UPDATED)
    }
  }, [])

  useEffect(() => {
    getEpicData()
  }, [filteredProjects, filteredMilestones, filteredStates])

  const getEpicData = async () => {
    const tempEpics = {
      todo: [],
      inProgress: [],
      done: []
    }

    const data = await getEpicsUiList(filteredProjects, filteredMilestones, filteredStates)
    data.forEach((epic) => tempEpics[epic.state].push(epic))
    setEpics(tempEpics)
  }

  const onDragStart = async (start) => {
    setDropDisabledState(start.source.droppableId)
  }

  const onDragEnd = async (result) => {
    setDropDisabledState('')

    if (!result.destination) {
      return
    }

    await putEpic(result.draggableId, { state: result.destination.droppableId })
    publish(EPIC_UPDATED)
  }

  return (
    <>
      <Typography.Title level={3}>{t('general.epics')}</Typography.Title>

      <FilterBar
        leftChildren={[
          <ProjectFilter key="projectFilter" selectedProjects={filteredProjects} onChange={setFilteredProjects} />,
          <MilestoneFilter key="milestoneFilter" selectedMilestones={filteredMilestones} onChange={setFilteredMilestones} />,
          <EpicStateFilter key="epicStateFilter" selectedStates={filteredStates} onChange={setFilteredStates} />
        ]}
        rightChildren={[
          <RadioGroupButton
            key="viewSetting"
            name={t('milestone.view')}
            items={[
              { text: t('milestone.column'), key: 'column' },
              { text: t('milestone.table'), key: 'table' }
            ]}
            value="column"
            onChange={() => message.info(t('general.notReady'))}
          />
        ]}
      />

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Container align="start">
          <ToDoArea>
            <AreaTitle title={t('epic.todo')} count={epics.todo.length} />
            <Droppable droppableId="todo" isDropDisabled={dropDisabledState === 'todo'}>
              {(provided) => (
                <DropContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={dropDisabledState === '' ? '' : (dropDisabledState === 'todo' ? 'dropDisabled' : 'dropEnabled')}
                >
                  {epics.todo.map((epic, index) => (
                    <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem
                            id={epic.id}
                            name={epic.name}
                            countOfStories={epic.countOfStories}
                            countOfInProgressStories={epic.countOfInProgressStories}
                            countOfDoneStories={epic.countOfDoneStories}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DropContainer>
              )}
            </Droppable>
          </ToDoArea>

          <InProgressArea>
            <AreaTitle title={t('epic.inProgress')} count={epics.inProgress.length} />
            <Droppable droppableId="inProgress" isDropDisabled={dropDisabledState === 'inProgress'}>
              {(provided) => (
                <DropContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={dropDisabledState === '' ? '' : (dropDisabledState === 'inProgress' ? 'dropDisabled' : 'dropEnabled')}
                >
                  {epics.inProgress.map((epic, index) => (
                    <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <InProgressItem
                            id={epic.id}
                            name={epic.name}
                            countOfStories={epic.countOfStories}
                            countOfInProgressStories={epic.countOfInProgressStories}
                            countOfDoneStories={epic.countOfDoneStories}
                            totalPoint={epic.totalPoint}
                            stories={epic.stories}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DropContainer>
              )}
            </Droppable>
          </InProgressArea>

          <DoneArea>
            <AreaTitle title={t('epic.done')} count={epics.done.length} />
            <Droppable droppableId="done" isDropDisabled={dropDisabledState === 'done'}>
              {(provided) => (
                <DropContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={dropDisabledState === '' ? '' : (dropDisabledState === 'done' ? 'dropDisabled' : 'dropEnabled')}
                >
                  {epics.done.map((epic, index) => (
                    <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DoneItem
                            id={epic.id}
                            name={epic.name}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DropContainer>
              )}
            </Droppable>
          </DoneArea>
        </Container>
      </DragDropContext>
    </>
  )
}

const Container = styled.div`
  display: flex;
`

const ToDoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  margin-right: 1.5rem;
`

const InProgressArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  margin-right: 1.5rem;
`

const DoneArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
`

const DropContainer = styled.div`
  min-height: 4rem;
  width: 100%;
  
  &.dropDisabled {
    background-color: rgb(255, 182, 193, 0.3);
    outline: rgb(255, 182, 193) dashed 3px;
  }
  
  &.dropEnabled {
    background-color: rgb(0, 191, 255, 0.2);
    outline: rgb(0, 191, 255, 0.4) dashed 3px;
  }
`
