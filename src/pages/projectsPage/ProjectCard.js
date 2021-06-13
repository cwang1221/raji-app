import { Button, Space, Tooltip, Typography } from 'antd'
import { FileTextOutlined, CoffeeOutlined, CloseOutlined, EyeOutlined, ZoomInOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useState } from 'react'
import { useProject } from '../../hooks'
import { clone } from '../../utils'
import { useAuth } from '../../contexts/authContext'
import { ColorDropdown } from '../../components'

export function ProjectCard({ id, indicator, title, description, storyCount, point, followerIds, onDelete }) {
  const { t } = useTranslation()
  const [followers, setFollowers] = useState(followerIds)
  const [color, setColor] = useState(indicator)
  const { putProject } = useProject()
  const { user } = useAuth()

  const changeColor = (color) => {
    putProject(id, { color })
    setColor(color)
  }

  const onClickFollow = () => {
    const index = followers.indexOf(user.id)
    const followersClone = clone(followers)
    if (index >= 0) {
      followersClone.splice(index, 1)
    } else {
      followersClone.push(user.id)
    }

    putProject(id, { followerIds: followersClone })
    setFollowers(followersClone)
  }

  const deleteProject = () => {
    onDelete(id)
  }

  return (
    <Container>
      <Space align="start">
        <Indicator color={color} />
        <div style={{ display: '' }}>
          <Typography.Title level={4} style={{ marginTop: '1rem' }}>{title}</Typography.Title>
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
              <Tooltip title={`${storyCount} ${t('general.stories')}`}>
                <FileTextOutlined /> <span>{storyCount}</span>
              </Tooltip>
              <Tooltip title={`${point} ${t('general.points')}`}>
                <CoffeeOutlined /> <span>{point}</span>
              </Tooltip>
              <Tooltip title={t('project.zoomInTooltip')}>
                <ZoomInIcon />
              </Tooltip>
              <Button
                type={followers.includes(user.id) ? 'primary' : 'default'}
                size="small"
                onClick={onClickFollow}
              >
                <EyeOutlined />
                {t(followers.includes(user.id) ? 'general.following' : 'general.follow')}
              </Button>
              <ColorDropdown color={color} onColorChange={changeColor}>
                <Button size="small">
                  <div style={{ backgroundColor: color, width: '0.5rem', height: '0.5rem' }} />
                </Button>
              </ColorDropdown>
            </Footer>
          </div>
        </div>
      </Space>
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
    transform: translate(-1px,-1px);
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
