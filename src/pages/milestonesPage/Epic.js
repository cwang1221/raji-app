import { Typography, Progress, Avatar, Tooltip, List } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { EpicStateIcon, CreateEpicModal, StoryProperty, PointProperty } from '../../components'

export function Epic({ id, name, state, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, owners }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  return (
    <EpicContainer>
      <Tooltip title={t(`milestones.${state}`)}>
        <EpicStateIcon state={state} />
      </Tooltip>
      <EpicMainContent>
        <EpicName level={5} onClick={() => setShowModal(true)}>{name}</EpicName>
        <Footer>
          <DataContainer>
            <DataBackground>
              <StoryProperty countOfStories={countOfStories} hasRightMargin={false} />
            </DataBackground>
            <DataBackground>
              <PointProperty point={totalPoint} hasRightMargin={false} />
            </DataBackground>
            <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
              <DataBackground>
                <ProgressBar
                  percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
                  success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
                  showInfo={false}
                  trailColor="#E5E7EB"
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
      <CreateEpicModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
    </EpicContainer>
  )
}

const EpicContainer = styled(List.Item)`
  width: 100%;
  display: flex;
  align-items: baseline;
  padding: 1rem;
  background-color: white;
  border: #f0f0f0 1px solid !important;
`

const EpicName = styled(Typography.Title)`
  &:hover {
    cursor: pointer;
  }
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

const ProgressBar = styled(Progress)`
  width: 3rem;
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
