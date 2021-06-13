import { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStory } from '../../hooks'
import { clone, eventBus, events, setHeaderCreateButton } from '../../utils'
import { Filter } from './Filter'
import { StoryContainer } from './StoryContainer'
import { StoryCard } from './StoryCard'

export function StoriesPage() {
  const { t } = useTranslation()
  const [stories, setStories] = useState({
    unscheduled: [],
    readyForDevelopment: [],
    inDevelopment: [],
    readyForReview: [],
    readyForDeploy: [],
    completed: []
  })
  const [dropDisabledState, setDropDisabledState] = useState('')
  const [selectedProjectIds, setSelectedProjectIds] = useState([])
  const [selectedEpicIds, setSelectedEpicIds] = useState([])
  const [selectedStates, setSelectedStates] = useState(['unscheduled', 'readyForDevelopment', 'inDevelopment', 'readyForReview', 'readyForDeploy', 'completed'])
  const { getStoryUiList, putStory } = useStory()
  const statesRef = useRef(['unscheduled', 'readyForDevelopment', 'inDevelopment', 'readyForReview', 'readyForDeploy', 'completed'])

  useEffect(() => {
    setHeaderCreateButton('story')

    eventBus.subscribe(events.projectCreated, getStoryData)
    eventBus.subscribe(events.projectDeleted, getStoryData)
    eventBus.subscribe(events.storyCreated, getStoryData)
    eventBus.subscribe(events.storyDeleted, getStoryData)
    eventBus.subscribe(events.epicCreated, getStoryData)
    eventBus.subscribe(events.epicDeleted, getStoryData)

    return () => {
      eventBus.unsubscribe(events.projectCreated, getStoryData)
      eventBus.unsubscribe(events.projectDeleted, getStoryData)
      eventBus.unsubscribe(events.storyCreated, getStoryData)
      eventBus.unsubscribe(events.storyDeleted, getStoryData)
      eventBus.unsubscribe(events.epicCreated, getStoryData)
      eventBus.unsubscribe(events.epicDeleted, getStoryData)
    }
  }, [])

  useEffect(() => {
    getStoryData()
  }, [selectedProjectIds, selectedEpicIds, selectedStates])

  const getStoryData = async () => {
    const tempStories = {
      unscheduled: [],
      readyForDevelopment: [],
      inDevelopment: [],
      readyForReview: [],
      readyForDeploy: [],
      completed: []
    }

    const data = await getStoryUiList(selectedProjectIds, selectedEpicIds, selectedStates)
    data.forEach((story) => {
      story.id = story.id.toString()
      tempStories[story.state].push(story)
    })
    setStories(tempStories)
  }

  const onDragStart = (start) => {
    setDropDisabledState(start.source.droppableId)
  }

  const onDragEnd = (result) => {
    setDropDisabledState('')

    if (!result.destination) {
      return
    }

    const storiesClone = clone(stories)
    const story = storiesClone[result.source.droppableId].splice(result.source.index, 1)[0]
    storiesClone[result.destination.droppableId].splice(result.destination.index, 0, story)
    setStories(storiesClone)
    putStory(story.id, { state: result.destination.droppableId })
  }

  return (
    <Page>
      <FilterArea>
        <Filter
          selectedProjectIds={selectedProjectIds}
          selectedEpicIds={selectedEpicIds}
          selectedStates={selectedStates}
          onProjectIdsChange={setSelectedProjectIds}
          onEpicIdsChange={setSelectedEpicIds}
          onStatesChange={setSelectedStates}
        />
      </FilterArea>

      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Container>
          {statesRef.current.map((state) => (
            selectedStates.includes(state) && (
            <StoryContainer
              key={state}
              title={t(`story.${state}`)}
              countOfStories={stories[state].length}
              countOfContainers={selectedStates.length}
            >
              <Droppable droppableId={state} isDropDisabled={state === dropDisabledState}>
                {(provided) => (
                  <DropContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={dropDisabledState === '' ? '' : (state === dropDisabledState ? 'dropDisabled' : 'dropEnabled')}
                  >
                    {stories[state].map((story, index) => (
                      <Draggable key={story.id} draggableId={story.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <StoryCard
                              id={story.id}
                              name={story.title}
                              epicName={story.epic?.name}
                              projectColor={story.project.color}
                              projectName={story.project.name}
                              type={story.type}
                              estimate={story.estimate}
                              ownerAvatar={story.owner?.picture}
                              owner={story.owner?.name}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DropContainer>
                )}
              </Droppable>
            </StoryContainer>
            )
          ))}
        </Container>
      </DragDropContext>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const FilterArea = styled.div`
  width: 204px;
`

const Container = styled.div`
  width: calc(100% - 204px);
  max-width: calc(100% - 204px);
  display: flex;
`

const DropContainer = styled.div`
  min-height: 4rem;
  
  &.dropDisabled {
    background-color: rgb(255, 182, 193, 0.5);
  }
  
  &.dropEnabled {
    background-color: rgb(0,191,255, 0.2);
  }
`
