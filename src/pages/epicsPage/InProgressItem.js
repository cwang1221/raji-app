import { Typography, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateStoryModal, CreateEpicModal, ProgressBar, IdProperty, StoryProperty, PointProperty } from '../../components'
import { clone } from '../../utils'
import { EpicTitle } from './EpicTitle'

const initStoryMap = {
  unscheduled: [],
  readyForDevelopment: [],
  inDevelopment: [],
  readyForReview: [],
  readyForDeploy: [],
  completed: []
}

export function InProgressItem({ id, name, countOfStories, countOfInProgressStories, countOfDoneStories, totalPoint, stories }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [editStoryId, setEditStoryId] = useState(undefined)
  const [showEpicModal, setShowEpicModal] = useState(false)
  const [storyMap, setStoryMap] = useState(initStoryMap)

  useEffect(() => {
    const tempStoryMap = clone(initStoryMap)

    stories.forEach((story) => tempStoryMap[story.state].push(story))
    setStoryMap(tempStoryMap)
  }, [stories])

  const editStory = (id) => {
    setEditStoryId(id)
    setShowModal(true)
  }

  const StoryStateTitle = ({ state, count }) => <Typography.Text>{`${t(`story.${state}`)} (${count})`}</Typography.Text>

  return (
    <Container>
      <InfoContainer>
        <EpicTitle
          state="inProgress"
          epicName={name}
          onClickName={() => setShowEpicModal(true)}
        />
        <ProgressBar
          countOfStories={countOfStories}
          countOfInProgressStories={countOfInProgressStories}
          countOfDoneStories={countOfDoneStories}
        />
        <InfoBar>
          <IdProperty id={id} />
          <StoryProperty countOfStories={countOfStories} />
          <PointProperty point={totalPoint} />
        </InfoBar>
      </InfoContainer>
      <StoryContainer>
        {Object.keys(storyMap).map((key) => (
          storyMap[key].length ? (
            <StoryStateContainer key={key}>
              <StoryStateTitle state={key} count={storyMap[key].length} />
              <StoryCardContainer>
                {storyMap[key].map((story) => (
                  <Tooltip key={`${story.id}`} title={`#${story.id} ${story.title} (${t(`story.${story.type}`)})`}>
                    <StoryCard projectColor={story.project.color} onClick={() => editStory(story.id)} />
                  </Tooltip>
                ))}
              </StoryCardContainer>
            </StoryStateContainer>
          ) : null
        ))}
      </StoryContainer>
      <CreateStoryModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={editStoryId}
      />
      <CreateEpicModal
        visible={showEpicModal}
        close={() => setShowEpicModal(false)}
        id={id}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 3px 5px 5px #DCDCDC;
  border-bottom: 1px lightgray solid;
  background-color: white;

  &:hover {
    transform: translate(-1px,-1px);
  }
`

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  font-weight: 500;
`

const InfoContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px lightgray solid;
`

const StoryContainer = styled.div`
  padding: 1rem;
  font-size: 12px;
  font-weight: 600;
`

const StoryStateContainer = styled.div`
  margin-bottom: 6px;
`

const StoryCardContainer = styled.div`
  display: flex;
`

const StoryCard = styled.div`
  height: 18px;
  width: 24px;
  margin-right: 5px;
  border-left: ${(props) => props.projectColor} 4px solid;
  background-color: rgb(247, 244, 232);

  &:hover {
    cursor: pointer;
    background-color: white;
  }
`
