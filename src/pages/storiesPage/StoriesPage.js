import { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { subscribe, unsubscribe } from 'pubsub-js'
import { useDocumentTitle, useStory } from '../../hooks'
import { clone } from '../../utils'
import { Filter } from './Filter'
import { StoryContainer } from './StoryContainer'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { StoryCard } from '../../components'
import { FILTER_STORY_BY_PROJECT, STORY_CREATED, STORY_UPDATED } from '../../utils/events'

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
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()

  useDocumentTitle(t('general.stories'))

  useEffect(() => {
    setHeaderCreateButtonType('story')
    subscribe(FILTER_STORY_BY_PROJECT, (msg, data) => {
      setSelectedProjectIds([data.toString()])
    })
    subscribe(STORY_CREATED, getStoryData)
    subscribe(STORY_UPDATED, getStoryData)

    return () => {
      unsubscribe(FILTER_STORY_BY_PROJECT)
      unsubscribe(STORY_CREATED)
      unsubscribe(STORY_UPDATED)
    }
  }, [])

  useEffect(() => {
    getStoryData()
    unsubscribe(STORY_CREATED)
    unsubscribe(STORY_UPDATED)
    subscribe(STORY_CREATED, getStoryData)
    subscribe(STORY_UPDATED, getStoryData)
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
    <div className="flex w-full h-full">
      <div className="w-52">
        <Filter
          selectedProjectIds={selectedProjectIds}
          selectedEpicIds={selectedEpicIds}
          selectedStates={selectedStates}
          onProjectIdsChange={setSelectedProjectIds}
          onEpicIdsChange={setSelectedEpicIds}
          onStatesChange={setSelectedStates}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div style={{ width: 'calc(100%-52rem)', maxWidth: 'calc(100%-52rem)' }} className="flex">
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
                    $dragging={dropDisabledState !== ''}
                    $dropDisabled={state === dropDisabledState}
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
        </div>
      </DragDropContext>
    </div>
  )
}

const DropContainer = tw.div`
  min-h-16
  bg-opacity-25

  ${({ $dropDisabled, $dragging }) => ($dragging && ($dropDisabled ? 'bg-red-200 ring-4 ring-red-200'
    : 'bg-blue-200 ring-4 ring-blue-200'))}
`
