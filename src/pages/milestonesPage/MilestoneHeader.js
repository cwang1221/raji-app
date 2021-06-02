import { Space, Typography, Progress, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { DoubleRightOutlined, CheckOutlined, FlagOutlined, FileTextOutlined, BorderlessTableOutlined, CheckCircleFilled } from '@ant-design/icons'

export function MilestoneHeader({ name, countOfEpics, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint }) {
  const { t } = useTranslation()
  const done = countOfDoneStories === countOfStories
  return (
    <div style={{ width: '100%' }}>
      <Space style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ color: '#316399' }}>{name}</Typography.Title>
        {done && <CheckOutlined style={{ fontSize: '20px', marginBottom: '0.5rem', color: '#009D4D' }} />}
      </Space>
      <Space>
        {done
          ? <State><CheckCircleFilled style={{ marginRight: '0.3rem', color: '#009D4D' }} />{t('milestones.done')}</State>
          : <State><DoubleRightOutlined style={{ marginRight: '0.3rem' }} />{t('milestones.inProgress')}</State>}

        <Tooltip title={t('general.epics')}>
          <DataContainer><FlagOutlined /><Number>{countOfEpics}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={t('general.stories')}>
          <DataContainer><FileTextOutlined /><Number>{countOfStories}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={t('general.points')}>
          <DataContainer><BorderlessTableOutlined /><Number>{totalPoint}</Number></DataContainer>
        </Tooltip>
      </Space>
      <div style={{ marginTop: '0.5rem', marginBottom: '-0.5rem' }}>
        <Typography.Text strong>{t('milestones.percentageCompleted', { percentage: Math.round((countOfDoneStories / countOfStories) * 100) })}</Typography.Text>
      </div>
      <Tooltip title={`${t('milestones.total')}: ${countOfStories}, ${t('milestones.inProgress')}: ${countOfInProgressStories}, ${t('milestones.done')}: ${countOfDoneStories}`}>
        <Progress
          percent={(countOfInProgressStories / countOfStories) * 100}
          success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
          showInfo={false}
          trailColor="#D9EAF0"
          style={{ paddingTop: '-1rem' }}
        />
      </Tooltip>
    </div>
  )
}

const State = styled.span`
  border-radius: 5px;
  border: 1px solid lightgray;
  color: gray;
  padding: 0 0.3rem;
  margin-right: 0.5rem;
  font-size: 12px;
  font-weight: bold;
`

const Number = styled.span`
  margin-left: 0.1rem;
`

const DataContainer = styled.span`
  color: gray;
  margin-right: 0.2rem;
`
