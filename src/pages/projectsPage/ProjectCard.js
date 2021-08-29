import { Button, Space, Tooltip, Typography } from 'antd'
import { CloseOutlined, EyeOutlined, ZoomInOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { publish } from 'pubsub-js'
import { useProject } from '../../hooks'
import { clone } from '../../utils'
import { useAuth } from '../../contexts/authContext'
import { ColorDropdown, CreateProjectModal, StoryProperty, PointProperty } from '../../components'
import { FILTER_STORY_BY_PROJECT, PROJECT_UPDATED } from '../../utils/events'

export function ProjectCard({ id, indicator, title, description, storyCount, point, followerIds, onDelete }) {
  const { t } = useTranslation()
  const [followers, setFollowers] = useState(followerIds)
  const { putProject } = useProject()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()

  const changeColor = async (color) => {
    await putProject(id, { color })
    publish(PROJECT_UPDATED)
  }

  const onClickFollow = async () => {
    const index = followers.indexOf(user.id)
    const followersClone = clone(followers)
    if (index >= 0) {
      followersClone.splice(index, 1)
    } else {
      followersClone.push(user.id)
    }

    setFollowers(followersClone)
    await putProject(id, { followerIds: followersClone })
    publish(PROJECT_UPDATED)
  }

  const deleteProject = () => {
    onDelete(id)
  }

  const viewStoryInProject = () => {
    history.push('/stories')
    setTimeout(() => publish(FILTER_STORY_BY_PROJECT, id), 1000)
  }

  return (
    <Container style={{ borderColor: indicator }}>
      <Space align="start">
        <div>
          <Typography.Title level={4} onClick={() => setShowModal(true)} className="mt-4 cursor-pointer">{title}</Typography.Title>
          {!storyCount && (
            <Tooltip title={t('general.delete')}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={deleteProject}
                className="absolute right-4 top-4"
              />
            </Tooltip>
          )}
          <Typography.Text>{description}</Typography.Text>
          <div>
            <Footer size="middle">
              <StoryProperty countOfStories={storyCount} hasRightMargin={false} />
              <PointProperty point={point} hasRightMargin={false} />
              <Tooltip title={t('project.zoomInTooltip')}>
                <ZoomInIcon onClick={viewStoryInProject} />
              </Tooltip>
              <Button
                type={followers.includes(user.id) ? 'primary' : 'default'}
                size="small"
                onClick={onClickFollow}
              >
                <EyeOutlined />
                {t(followers.includes(user.id) ? 'general.following' : 'general.follow')}
              </Button>
              <ColorDropdown color={indicator} onColorChange={changeColor}>
                <Button size="small">
                  <div style={{ backgroundColor: indicator }} className="w-2 h-2" />
                </Button>
              </ColorDropdown>
            </Footer>
          </div>
        </div>
      </Space>
      <CreateProjectModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
    </Container>
  )
}

const Container = tw.div`
  relative
  w-96
  h-48
  bg-white
  rounded-md
  shadow-md
  px-4
  mr-4
  mb-4
  border-l-8
`

const Footer = tw(Space)`
  absolute
  bottom-3
  text-gray-500
`

const ZoomInIcon = tw(ZoomInOutlined)`
  hover:text-purple-700
  cursor-pointer
`
