import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Typography, Result, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { SmileOutlined } from '@ant-design/icons'
import { subscribe, unsubscribe } from 'pubsub-js'
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
    <Container>
      <UserInfo>
        <Avatar src={user.avatar} size={40} />
        <UserTextInfo>
          <Typography.Title level={5} style={{ marginBottom: '0' }}>{user.username}</Typography.Title>
          <Typography.Text style={{ marginTop: '-4px', color: 'gray' }}>{user.email}</Typography.Text>
        </UserTextInfo>
      </UserInfo>
      <MainArea>
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
                  <span style={{ fontWeight: '500' }}>{t(`story.${key}`)}</span>
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

        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 1rem', width: '33%' }}>
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
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <Result
              icon={<SmileOutlined style={{ color: 'lightgray' }} />}
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
            style={{ width: '100%' }}
          >
            <Result
              icon={<SmileOutlined style={{ color: 'lightgray' }} />}
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
            icon={<SmileOutlined style={{ color: 'lightgray' }} />}
            title={t('general.notReady')}
          />
        </WorkArea>
      </MainArea>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const UserTextInfo = styled.div`
  display: flex;
  margin-left: 0.6rem;
  flex-direction: column;
`

const MainArea = styled.div`
  display: flex;
`

const StateTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  color: gray;
`
