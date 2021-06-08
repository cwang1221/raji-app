import { Typography, Progress, Avatar, Tooltip, List } from 'antd'
import styled from 'styled-components'
import { FlagOutlined, FileTextOutlined, BorderlessTableOutlined, BorderOutlined, RightOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export function Epic({ name, state, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, owners }) {
  const { t } = useTranslation()
  const [stateIcon, setStateIcon] = useState(null)

  useEffect(() => {
    switch (state) {
      case 'notStarted':
        setStateIcon(<BorderOutlined style={{ color: 'gray' }} />)
        break
      case 'readyForDev':
        setStateIcon(<RightOutlined style={{ color: '#FFA500' }} />)
        break
      case 'inProgress':
        setStateIcon(<DoubleRightOutlined style={{ color: '#1E90FF' }} />)
        break
      case 'done':
      default:
        setStateIcon(<FlagOutlined style={{ color: '#009D4D' }} />)
        break
    }
  }, [state])

  return (
    <EpicContainer as={List.Item}>
      <Tooltip title={t(`milestones.${state}`)}>
        {stateIcon}
      </Tooltip>
      <EpicMainContent>
        <Typography.Title level={5}>{name}</Typography.Title>
        <Footer>
          <DataContainer>
            <Tooltip title={`${countOfStories} ${t('general.stories')}`}>
              <DataBackground>
                <FileTextOutlined /> <Number>{countOfStories}</Number>
              </DataBackground>
            </Tooltip>
            <Tooltip title={`${totalPoint} ${t('general.points')}`}>
              <DataBackground>
                <BorderlessTableOutlined /> <Number>{totalPoint}</Number>
              </DataBackground>
            </Tooltip>
            <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
              <DataBackground>
                <ProgressBar
                  as={Progress}
                  percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
                  success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
                  showInfo={false}
                  trailColor="#D9EAF0"
                />
              </DataBackground>
            </Tooltip>
          </DataContainer>
          <OwnerContainer>
            {owners.map((owner) => (
              <Tooltip key={owner.id} title={owner.name}>
                <Avatar size="small" src={owner.avatar} style={{ marginLeft: '2px' }} />
              </Tooltip>
            ))}
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
  background-color: white;
  border: #f0f0f0 1px solid !important;
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
