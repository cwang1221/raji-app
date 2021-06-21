import { CoffeeOutlined, FileTextOutlined } from '@ant-design/icons'
import { Typography, Progress, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateStoryModal, EpicStateIcon, CreateEpicModal } from '../../components'

export function InProgressItem({ id, name, countOfStories, countOfInProgressStories, countOfDoneStories, totalPoint, stories }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [editStoryId, setEditStoryId] = useState(undefined)
  const [showEpicModal, setShowEpicModal] = useState(false)

  const editStory = (id) => {
    setEditStoryId(id)
    setShowModal(true)
  }

  const [storyMap, setStoryMap] = useState({
    unscheduled: [],
    readyForDevelopment: [],
    inDevelopment: [],
    readyForReview: [],
    readyForDeploy: [],
    completed: []
  })

  useEffect(() => {
    const tempStoryMap = {
      unscheduled: [],
      readyForDevelopment: [],
      inDevelopment: [],
      readyForReview: [],
      readyForDeploy: [],
      completed: []
    }

    stories.forEach((story) => tempStoryMap[story.state].push(story))
    setStoryMap(tempStoryMap)
  }, [stories])

  const StoryStateTitle = ({ state, count }) => <Typography.Text>{`${t(`story.${state}`)} (${count})`}</Typography.Text>

  return (
    <Container>
      <InfoContainer>
        <Title>
          <EpicStateIcon state="inProgress" />
          <EpicName level={4} onClick={() => setShowEpicModal(true)}>{name}</EpicName>
        </Title>
        <div style={{ marginTop: '0.5rem', marginBottom: '-0.2rem' }}>
          <Typography.Text strong>{t('epic.percentage', {
            completed: countOfStories ? Math.round((countOfDoneStories / countOfStories) * 100) : 0,
            inProgress: countOfStories ? Math.round((countOfInProgressStories / countOfStories) * 100) : 0
          })}
          </Typography.Text>
        </div>
        <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
          <ProgressBar
            percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
            success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
            showInfo={false}
            trailColor="#D9EAF0"
          />
        </Tooltip>
        <InfoBar>
          <Tooltip title={t('general.id')}>
            {`#${id}`}
          </Tooltip>
          <Tooltip title={`${countOfStories} ${t('general.stories')}`}>
            <FileTextOutlined style={{ marginLeft: '1.2rem', marginRight: '0.3rem' }} />
            {countOfStories}
          </Tooltip>
          <Tooltip title={`${totalPoint} ${t('general.points')}`}>
            <CoffeeOutlined style={{ marginLeft: '1.2rem', marginRight: '0.3rem' }} />
            {totalPoint}
          </Tooltip>
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

const EpicName = styled(Typography.Title)`
  margin-bottom: 0 !important;
  margin-left: 0.5rem !important;

  &:hover {
    cursor: pointer;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
`

const ProgressBar = styled(Progress)`
  margin-top: -0.2rem;
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
