import { message, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { EpicStateFilter, FilterBar, FilterItem, MilestoneFilter, ProjectFilter } from '../../components'
import { useEventContext } from '../../contexts/eventContext'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useEpic } from '../../hooks'
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
  const [filteredStates, setFilteredStates] = useState([])
  const { getEpicsUiList } = useEpic()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()
  const { storyCreatedEvent, storyDeletedEvent, epicCreatedEvent, epicDeletedEvent, projectCreatedEvent, projectDeletedEvent } = useEventContext()

  useEffect(() => {
    setHeaderCreateButtonType('epic')
  }, [])

  useEffect(() => {
    getEpicData()
  }, [filteredProjects, filteredMilestones, filteredStates, storyCreatedEvent, storyDeletedEvent, epicCreatedEvent, epicDeletedEvent, projectCreatedEvent, projectDeletedEvent])

  const getEpicData = async () => {
    const tempEpics = {
      todo: [],
      inProgress: [],
      done: []
    }

    const data = await getEpicsUiList()
    data.forEach((epic) => tempEpics[epic.state].push(epic))
    setEpics(tempEpics)
  }

  const onDragEnd = () => {

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
            onChange={() => message.info('Not ready :)')}
          />
        ]}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Container align="start">
          <ToDoArea>
            <AreaTitle title={t('epic.todo')} count={epics.todo.length} />
            <Droppable droppableId="todo">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '4rem', width: '100%' }}>
                  {epics.todo.map((epic, index) => (
                    <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem
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
                </div>
              )}
            </Droppable>
          </ToDoArea>

          <InProgressArea>
            <AreaTitle title={t('epic.inProgress')} count={epics.inProgress.length} />
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '4rem', width: '100%' }}>
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
                </div>
              )}
            </Droppable>
          </InProgressArea>

          <DoneArea>
            <AreaTitle title={t('epic.done')} count={epics.done.length} />
            <Droppable droppableId="done">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '4rem', width: '100%' }}>
                  {epics.done.map((epic, index) => (
                    <Draggable key={epic.id} draggableId={`${epic.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DoneItem name={epic.name} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
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
