import { useEffect, useState } from 'react'
import { Avatar, Typography, Result, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { SmileOutlined } from '@ant-design/icons'
import { subscribe, unsubscribe } from 'pubsub-js'
import tw from 'tailwind-styled-components'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useAuth } from '../../contexts/authContext'
import { WorkArea } from './WorkArea'
import { useStory } from '../../hooks'
import { StoryCard } from '../../components'
import { STORY_CREATED, STORY_UPDATED } from '../../utils/events'

export function HomePage() {
  const { t } = useTranslation()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()
  const [selectedViewOption, setSelectedViewOption] = useState('startedOnly')
  const [taskFilter, setTaskFilter] = useState('startedOnly')
  const [dueFilter, setDueFilter] = useState('ownedByMe')
  const [stories, setStories] = useState({
    unscheduled: [],
    readyForDevelopment: [],
    inDevelopment: [],
    readyForReview: [],
    readyForDeploy: [],
    completed: []
  })
  const { user } = useAuth()
  const { getMyStories } = useStory()

  useEffect(() => {
    setHeaderCreateButtonType('story')
    subscribe(STORY_CREATED, getStoryData)
    subscribe(STORY_UPDATED, getStoryData)

    return () => {
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
  }, [selectedViewOption])

  const getStoryData = async () => {
    const tempStories = {
      unscheduled: [],
      readyForDevelopment: [],
      inDevelopment: [],
      readyForReview: [],
      readyForDeploy: [],
      completed: []
    }

    const data = await getMyStories(user.id, selectedViewOption)

    data.forEach((story) => tempStories[story.state].push(story))
    setStories(tempStories)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <Avatar src={user.avatar} size={40} />
        <UserTextInfo>
          <Typography.Title level={5} className="mb-0">{user.username}</Typography.Title>
          <Typography.Text className="-mt-1 text-gray-500">{user.email}</Typography.Text>
        </UserTextInfo>
      </div>
      <div className="flex">
        <WorkArea
          title={t('home.myWork')}
          viewFilterDescription={t('home.myWorkFilterDescription')}
          viewOptions={{
            startedOnly: {
              title: t('home.startedOnly'),
              description: t('home.startedOnlyDescription')
            },
            unfinishedOnly: {
              title: t('home.unfinishedOnly'),
              description: t('home.unfinishedOnlyDescription')
            },
            everything: {
              title: t('home.everything'),
              description: t('home.everythingDescription')
            }
          }}
          selectedViewOption={selectedViewOption}
          onViewOptionChange={setSelectedViewOption}
        >
          {Object.keys(stories).map((key) => (
            stories[key].length ? (
              <div key={key}>
                <StateTitle>
                  <span className="font-medium">{t(`story.${key}`)}</span>
                  <span>{stories[key].length}</span>
                </StateTitle>
                {stories[key].map((story) => (
                  <StoryCard
                    key={story.id.toString()}
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
                ))}
              </div>
            ) : null
          ))}
        </WorkArea>

        <div className="flex flex-col mx-4 w-1/3">
          <WorkArea
            title={t('home.myActiveTasks')}
            viewFilterDescription={t('home.myTasksFIlterDescription')}
            viewOptions={{
              startedOnly: {
                title: t('home.startedOnly'),
                description: t('home.startedOnlyTasksDescription')
              },
              unfinishedOnly: {
                title: t('home.unfinishedOnly'),
                description: t('home.unfinishedOnlyTasksDescription')
              }
            }}
            selectedViewOption={taskFilter}
            onViewOptionChange={setTaskFilter}
            className="mb-4 w-full"
          >
            <Result
              icon={<SmileOutlined className="text-gray-300" />}
              title={t('general.notReady')}
            />
          </WorkArea>

          <WorkArea
            title={t('home.upcomingDueDates')}
            viewFilterDescription={t('home.dueFilterDescription')}
            viewOptions={{
              ownedByMe: {
                title: t('home.ownedByMe'),
                description: t('home.ownedByMeDescription')
              },
              everything: {
                title: t('home.everything'),
                description: t('home.everythingDateDescription')
              }
            }}
            selectedViewOption={dueFilter}
            onViewOptionChange={setDueFilter}
            className="w-full"
          >
            <Result
              icon={<SmileOutlined className="text-gray-300" />}
              title={t('general.notReady')}
            />
          </WorkArea>
        </div>

        <WorkArea
          title={t('home.myActiveFeed')}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={t('home.allFollowedActivity')} key="1" />
            <Tabs.TabPane tab={t('home.onlyComments')} key="2" />
            <Tabs.TabPane tab={t('home.onlyMentions')} key="3" />
          </Tabs>
          <Result
            icon={<SmileOutlined className="text-gray-300" />}
            title={t('general.notReady')}
          />
        </WorkArea>
      </div>
    </div>
  )
}

const UserTextInfo = tw.div`
  flex
  flex-col
  ml-2
`

const StateTitle = tw.div`
  flex
  justify-between
  items-center
  mb-2
  text-gray-500
`
