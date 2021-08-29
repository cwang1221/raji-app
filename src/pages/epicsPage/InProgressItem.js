import { Typography, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
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
            <div key={key} className="mb-2">
              <StoryStateTitle state={key} count={storyMap[key].length} />
              <div className="flex">
                {storyMap[key].map((story) => (
                  <Tooltip key={`${story.id}`} title={`#${story.id} ${story.title} (${t(`story.${story.type}`)})`}>
                    <StoryCard onClick={() => editStory(story.id)} style={{ borderColor: story.project.color }} />
                  </Tooltip>
                ))}
              </div>
            </div>
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

const Container = tw.div`
  flex
  flex-col
  rounded-md
  mb-4
  shadow-md
  bg-white
  transform
  transition-transform

  hover:-translate-x-0.5
  hover:-translate-y-0.5
`

const InfoBar = tw.div`
  flex
  items-center
  font-medium
  text-gray-500
`

const InfoContainer = tw.div`
  p-4
  border-b
  border-gray-300
`

const StoryContainer = tw.div`
  p-4
  text-xs
  font-semibold
`

const StoryCard = tw.div`
  h-5
  w-6
  mr-1
  border-l-4
  bg-gray-100
  background-color: rgb(247, 244, 232);
  cursor-pointer

  hover:bg-white
`
