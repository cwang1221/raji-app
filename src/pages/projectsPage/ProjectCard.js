import { Button, Space, Tooltip, Typography } from 'antd'
import { CloseOutlined, EyeOutlined, ZoomInOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useProject } from '../../hooks'
import { clone } from '../../utils'
import { useAuth } from '../../contexts/authContext'
import { ColorDropdown, CreateProjectModal, StoryProperty, PointProperty } from '../../components'
import { useEventContext } from '../../contexts/eventContext'

export function ProjectCard({ id, indicator, title, description, storyCount, point, followerIds, onDelete }) {
  const { t } = useTranslation()
  const [followers, setFollowers] = useState(followerIds)
  const { putProject } = useProject()
  const { user } = useAuth()
  const { publishProjectUpdatedEvent, publishFilterStoryByProjectEvent } = useEventContext()
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()

  const changeColor = async (color) => {
    await putProject(id, { color })
    publishProjectUpdatedEvent()
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
    publishProjectUpdatedEvent()
  }

  const deleteProject = () => {
    onDelete(id)
  }

  const viewStoryInProject = () => {
    history.push('/stories')
    publishFilterStoryByProjectEvent(id)
  }

  return (
    <Container>
      <Space align="start">
        <Indicator color={indicator} />
        <div style={{ display: '' }}>
          <ProjectName level={4} onClick={() => setShowModal(true)}>{title}</ProjectName>
          {!storyCount && (
            <Tooltip title={t('general.delete')}>
              <Button
                type="text"
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={deleteProject}
                style={{ position: 'absolute', right: '1rem', top: '1rem' }}
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
                  <div style={{ backgroundColor: indicator, width: '0.5rem', height: '0.5rem' }} />
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

const Container = styled.div`
  position:relative;
  width: 23rem;
  height: 12rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  box-shadow: 3px 5px 5px #DCDCDC;
  padding-right: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    -webkit-transform: translate(-1px,-1px);
    -moz-transform: translate(-1px,-1px);
    -o-transform: translate(-1px,-1px);
    transform: translate(-1px,-1px);
  }
`

const ProjectName = styled(Typography.Title)`
  margin-top: 1rem;

  &:hover {
    cursor: pointer;
  }
`

const Footer = styled(Space)`
  position: absolute;
  bottom: 0.8rem;
  color: gray;
`

const Indicator = styled.div`
  width: 0.7rem;
  height: 12rem;
  margin-right: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background-color: ${(props) => props.color};
`

const ZoomInIcon = styled(ZoomInOutlined)`
  color: gray;
  
  &:hover {
    color: black;
    cursor: pointer;
  }
`
