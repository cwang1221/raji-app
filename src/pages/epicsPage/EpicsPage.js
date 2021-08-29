import { message, Typography } from 'antd'
import { publish, subscribe, unsubscribe } from 'pubsub-js'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { EpicStateFilter, FilterBar, MilestoneFilter, ProjectFilter, RadioGroupButton } from '../../components'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useDocumentTitle, useEpic } from '../../hooks'
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
  const [filteredProjects, setFilteredProjects] = useState([])
  const [filteredMilestones, setFilteredMilestones] = useState([])
  const [filteredStates, setFilteredStates] = useState(['todo', 'inProgress', 'done'])
  const [dropDisabledState, setDropDisabledState] = useState('')
  const { getEpicsUiList, putEpic } = useEpic()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useDocumentTitle(t('general.epics'))

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
    unsubscribe(STORY_CREATED)
    unsubscribe(STORY_UPDATED)
    unsubscribe(EPIC_CREATED)
    unsubscribe(EPIC_UPDATED)
    subscribe(STORY_CREATED, getEpicData)
    subscribe(STORY_UPDATED, getEpicData)
    subscribe(EPIC_CREATED, getEpicData)
    subscribe(EPIC_UPDATED, getEpicData)
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
          <ProjectFilter key="projectFilter" selectedProjectIds={filteredProjects} onChange={setFilteredProjects} />,
          <MilestoneFilter key="milestoneFilter" selectedMilestoneIds={filteredMilestones} onChange={setFilteredMilestones} />,
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
        <div className="flex">
          <ToDoArea>
            <AreaTitle title={t('epic.todo')} count={epics.todo.length} />
            <Droppable droppableId="todo" isDropDisabled={dropDisabledState === 'todo'}>
              {(provided) => (
                <DropContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $dragging={dropDisabledState !== ''}
                  $dropDisabled={dropDisabledState === 'todo'}
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
                  $dragging={dropDisabledState !== ''}
                  $dropDisabled={dropDisabledState === 'inProgress'}
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
                  $dragging={dropDisabledState !== ''}
                  $dropDisabled={dropDisabledState === 'done'}
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
        </div>
      </DragDropContext>
    </>
  )
}

const ToDoArea = tw.div`
  flex
  flex-col
  items-center
  w-1/4
  pr-6
`

const InProgressArea = tw.div`
  flex
  flex-col
  items-center
  w-1/2
`

const DoneArea = tw.div`
  flex
  flex-col
  items-center
  w-1/4
  pl-6
`

const DropContainer = tw.div`
  min-h-16
  w-full
  bg-opacity-25

  ${({ $dropDisabled, $dragging }) => ($dragging && ($dropDisabled ? 'bg-red-200 ring-4 ring-red-200'
    : 'bg-blue-200 ring-4 ring-blue-200'))}
`
