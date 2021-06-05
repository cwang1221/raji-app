import { Button, Dropdown, Space, Tooltip, Typography, Row, Col } from 'antd'
import { FileTextOutlined, BorderlessTableOutlined, EyeOutlined, ZoomInOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useState } from 'react'
import { MyCard } from '../../components'

export function ProjectCard({ indicator, title, description, storyCount, point, isFollowing }) {
  const { t } = useTranslation()
  const [following, setFollowing] = useState(isFollowing)

  const colors = [
    ['#880000', '#CC0000', '#DD6E13', '#E2C534'],
    ['#37710C', '#54BA08', '#9DE061', '#CEEFAA'],
    ['#004C82', '#007CBD', '#08BBDF', '#7CDFCF'],
    ['#4E0380', '#AA44DD', '#E566A0', '#986030'],
    ['#AE9744', '#090909', '#888888', '#C0C0C0'],
    ['#3E1191', '#6515DD', '#8B78FA', '#FF5555'],
    ['#FBB81B', '#00D38C', '#A3C5EB', '#414042']
  ]

  const ColorDropDown = () => (
    <div>
      <ColorDropDownContainer as={MyCard}>
        {colors.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((color, index) => <ColorBlock key={`${rowIndex}-${index}`} style={{ backgroundColor: color }} />)}
          </Row>
        ))}
      </ColorDropDownContainer>
    </div>
  )

  return (
    <Container>
      <Space align="start">
        <Indicator style={{ backgroundColor: indicator }} />
        <div>
          <Typography.Title level={4} style={{ marginTop: '1rem' }}>{title}</Typography.Title>
          <Typography.Text>{description}</Typography.Text>
          <div>
            <Footer as={Space} size="middle">
              <Tooltip title={`${storyCount} ${t('general.stories')}`}>
                <FileTextOutlined /> <span>{storyCount}</span>
              </Tooltip>
              <Tooltip title={`${point} ${t('general.points')}`}>
                <BorderlessTableOutlined /> <span>{point}</span>
              </Tooltip>
              <Tooltip title={t('project.zoomInTooltip')}>
                <ZoomInIcon as={ZoomInOutlined} />
              </Tooltip>
              <Button
                type={following ? 'primary' : 'default'}
                size="small"
              >
                <EyeOutlined />
                {t(following ? 'general.following' : 'general.follow')}
              </Button>
              <Dropdown overlay={ColorDropDown} trigger={['click']}>
                <Button size="small">
                  <div style={{ backgroundColor: indicator, width: '0.5rem', height: '0.5rem' }} />
                </Button>
              </Dropdown>
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

  &:hover {
    transform: translate(-1px,-1px);
  }
`

const Footer = styled.div`
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
`

const ZoomInIcon = styled.div`
  color: gray;
  
  &:hover {
    color: black;
    cursor: pointer;
  }
`

const ColorBlock = styled.div`
  width: 20px;
  height: 20px;
  margin: 4px;
  
  &:hover {
    margin: 2px;
    width: 24px;
    height: 24px;
    border: white solid 2px;
    outline: #DCDCDC solid 1px;
    cursor: pointer;
  }
`

const ColorDropDownContainer = styled.div`
  & .ant-card-body {
    padding: 0.5rem;
  }
`
