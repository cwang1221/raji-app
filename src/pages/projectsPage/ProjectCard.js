import { Button, Space, Typography } from 'antd'
import { FileTextOutlined, BorderlessTableOutlined, EyeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export function ProjectCard({ indicator, title, description, storyCount, point }) {
  const { t } = useTranslation()

  return (
    <Card>
      <Space align="start">
        <Indicator style={{ backgroundColor: indicator }} />
        <div>
          <Typography.Title level={4} style={{ marginTop: '1rem' }}>{title}</Typography.Title>
          <Typography.Text>{description}</Typography.Text>
          <div>
            <Footer as={Space} size={2}>
              <FileTextOutlined /> <span>{storyCount}</span>
              <BorderlessTableOutlined style={{ marginLeft: '1rem' }} /> <span>{point}</span>
              <FollowButton as={Button} size="small"><EyeOutlined />{t('projects.follow')}</FollowButton>
              <Button size="small" style={{ marginLeft: '1rem' }}>
                <div style={{ backgroundColor: indicator, width: '0.5rem', height: '0.5rem' }} />
              </Button>
            </Footer>
          </div>
        </div>
      </Space>
    </Card>
  )
}

const Card = styled.div`
  position:relative;
  width: 23rem;
  height: 12rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 5px lightgray;
  padding-right: 1rem;

  &:hover {
    box-shadow: 8px 8px 5px lightgray;
    transform: translate(-1px,-1px);
  }
`

const Footer = styled.div`
  position:absolute;
  bottom: 0.8rem;
  color: gray;
`

const FollowButton = styled.div`
  color: gray;
  margin-left: 3rem;
`

const Indicator = styled.div`
  width: 0.7rem;
  height: 12rem;
  margin-right: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`
