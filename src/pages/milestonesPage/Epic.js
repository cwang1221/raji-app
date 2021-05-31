import { Card, Typography, Progress, Avatar, Tooltip } from 'antd'
import styled from 'styled-components'
import { FlagOutlined, FileTextOutlined, BorderlessTableOutlined, BorderOutlined, RightOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export function Epic({ name, state, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, owners }) {
  const { t } = useTranslation()

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
      <Tooltip title={t(`milestones.${state}`)}>
        {stateIcon}
      </Tooltip>
      <EpicMainContent>
        <Typography.Title level={5}>{name}</Typography.Title>
        <Footer>
          <DataContainer>
            <Tooltip title={t('general.stories')}>
              <DataBackground>
                <FileTextOutlined /> <Number>{countOfStories}</Number>
              </DataBackground>
            </Tooltip>
            <Tooltip title={t('general.points')}>
              <DataBackground>
                <BorderlessTableOutlined /> <Number>{totalPoint}</Number>
              </DataBackground>
            </Tooltip>
            <Tooltip title={`${t('milestones.total')}: ${countOfStories}, ${t('milestones.inProgress')}: ${countOfInProgressStories}, ${t('milestones.done')}: ${countOfDoneStories}`}>
              <DataBackground>
                <ProgressBar
                  as={Progress}
                  percent={(countOfInProgressStories / countOfStories) * 100}
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
