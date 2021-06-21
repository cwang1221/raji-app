import { Typography, Progress, Tooltip } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateEpicModal, EpicStateIcon } from '../../components'

export function TodoItem({ id, name, countOfStories, countOfInProgressStories, countOfDoneStories }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  return (
    <Container>
      <Title>
        <EpicStateIcon state="todo" />
        <EpicName level={4} onClick={() => setShowModal(true)}>{name}</EpicName>
      </Title>
      <div style={{ marginTop: '0.5rem', marginBottom: '-0.2rem' }}>
        <Typography.Text strong>{t('milestone.percentageCompleted', { percentage: countOfStories ? Math.round((countOfDoneStories / countOfStories) * 100) : 0 })}</Typography.Text>
      </div>
      <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
        <ProgressBar
          percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
          success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
          showInfo={false}
          trailColor="#D9EAF0"
        />
      </Tooltip>
      <CreateEpicModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 3px 5px 5px #DCDCDC;
  border-bottom: 1px lightgray solid;
  background-color: white;

  &:hover {
    transform: translate(-1px,-1px);
  }
`

const EpicName = styled(Typography.Title)`
  margin-bottom: 0 !important;
  margin-left: 0.5rem !important;

  &:hover {
    cursor: pointer;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
`

const ProgressBar = styled(Progress)`
  margin-top: -0.2rem;
`
