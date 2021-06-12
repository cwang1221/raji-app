import { useEffect, useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useStory } from '../../hooks'
import { setHeaderCreateButton } from '../../utils'
import { Filter } from './Filter'
import { StoryContainer } from './StoryContainer'
import { StoryCard } from './StoryCard'

export function StoriesPage() {
  const { t } = useTranslation()
  const [stories, setStories] = useState([])

  const { getStoryUiList } = useStory()

  const statesRef = useRef(['unscheduled', 'readyForDevelopment', 'inDevelopment', 'readyForReview', 'readyForDeploy', 'completed'])

  useEffect(() => {
    setHeaderCreateButton('story')

    getStoryData()
  }, [])

  const getStoryData = async () => {
    const data = await getStoryUiList()
    data.forEach((story) => { story.id = story.id.toString() })
    setStories(data)
  }

  const onDragEnd = () => {}

  return (
    <Page>
      <FilterArea>
        <Filter />
      </FilterArea>

      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {statesRef.current.map((state) => (
            <StoryContainer key={state} title={t(`story.${state}`)}>
              <Droppable droppableId={state}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: '4rem' }}>
                    {stories.filter((story) => story.state === state).map((story, index) => (
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
                              epicName={story.epic.name}
                              projectColor={story.project.color}
                              projectName={story.project.name}
                              type={story.type}
                              estimate={story.estimate}
                              ownerAvatar={story.owner?.picture}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </StoryContainer>
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
  display: flex;
`
