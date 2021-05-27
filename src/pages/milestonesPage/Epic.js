import { Card, Typography, Progress, Avatar } from 'antd'
import styled from 'styled-components'
import { FlagOutlined, FileTextOutlined, BorderlessTableOutlined, BorderOutlined, RightOutlined, DoubleRightOutlined } from '@ant-design/icons'

export function Epic({ name, state }) {
  let stateIcon
  switch (state) {
    case 'notStarted':
      stateIcon = <BorderOutlined style={{ color: 'gray' }} />
      break
    case 'readyForDev':
      stateIcon = <RightOutlined style={{ color: '#FFA500' }} />
      break
    case 'inProgress':
      stateIcon = <DoubleRightOutlined style={{ color: '#1E90FF' }} />
      break
    case 'done':
    default:
      stateIcon = <FlagOutlined style={{ color: '#009D4D' }} />
      break
  }

  return (
    <EpicContainer as={Card.Grid} hoverable={false}>
      {stateIcon}
      <EpicMainContent>
        <Typography.Title level={5}>{name}</Typography.Title>
        <Footer>
          <DataContainer>
            <DataBackground>
              <FileTextOutlined /> <Number>5</Number>
            </DataBackground>
            <DataBackground>
              <BorderlessTableOutlined /> <Number>2</Number>
            </DataBackground>
            <DataBackground>
              <ProgressBar
                as={Progress}
                percent={60}
                success={{ percent: 30 }}
                showInfo={false}
                trailColor="#D9EAF0"
              />
            </DataBackground>
          </DataContainer>
          <OwnerContainer>
            <Avatar size="small" icon={<FlagOutlined />} />
            <Avatar size="small" icon={<FlagOutlined />} style={{ marginLeft: '2px' }} />
            <Avatar size="small" icon={<FlagOutlined />} style={{ marginLeft: '2px' }} />
          </OwnerContainer>
        </Footer>
      </EpicMainContent>
    </EpicContainer>
  )
}

const EpicContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
`

const EpicMainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-top: -0.4rem;
  margin-bottom: -0.6rem;
  justify-content: space-between;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: gray;
  font-size: 12px;
`

const Number = styled.span`
  margin-left: 0.1rem;
`

const ProgressBar = styled.div`
  width: 4rem;
  margin-top: -0.2rem;
`

const DataBackground = styled.div`
  background-color: rgb(244, 244, 244);
  border-radius: 5px;
  padding: 0 0.3rem;
  margin-right: 0.5rem;
`

const OwnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
