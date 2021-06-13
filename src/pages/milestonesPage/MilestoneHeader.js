import { Space, Typography, Progress, Tooltip, Dropdown, Menu, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CheckOutlined, FlagOutlined, FileTextOutlined, CoffeeOutlined, CloseOutlined } from '@ant-design/icons'
import { MilestoneStateIcon } from '../../components/milestoneStateIcon/MilestoneStateIcon'
import { useMilestone } from '../../hooks/useRequest'
import { eventBus, events } from '../../utils'

export function MilestoneHeader({ id, name, countOfEpics, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, state, changeState }) {
  const { t } = useTranslation()

  const { deleteMilestone } = useMilestone()

  const onDeleteMilestone = async () => {
    await deleteMilestone(id)
    eventBus.publish(events.milestoneDeleted)
  }

  return (
    <div style={{ width: '100%' }}>
      <Space style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ color: '#316399' }}>{name}</Typography.Title>
        {state === 'done' && <CheckOutlined style={{ fontSize: '20px', marginBottom: '0.5rem', color: '#009D4D' }} />}
        {!countOfEpics && (
        <Tooltip title={t('general.delete')}>
          <Button
            type="text"
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={onDeleteMilestone}
            style={{ position: 'absolute', right: '1rem', top: '1rem' }}
          />
        </Tooltip>
        )}
      </Space>
      <Space>
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu selectedKeys={state} onClick={(e) => changeState(id, e.key)}>
              <Menu.Item key="todo" icon={<MilestoneStateIcon state="todo" />}>{t('milestone.todo')}</Menu.Item>
              <Menu.Item key="inProgress" icon={<MilestoneStateIcon state="inProgress" />}>{t('milestone.inProgress')}</Menu.Item>
              <Menu.Item key="done" icon={<MilestoneStateIcon state="done" />}>{t('milestone.done')}</Menu.Item>
            </Menu>
        )}
        >
          <State>
            <MilestoneStateIcon state={state} style={{ marginRight: '0.3rem' }} /> {t(`milestone.${state}`)}
          </State>
        </Dropdown>
        <Tooltip title={`${countOfEpics} ${t('general.epics')}`}>
          <DataContainer><FlagOutlined /><Number>{countOfEpics}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={`${countOfStories} ${t('general.stories')}`}>
          <DataContainer><FileTextOutlined /><Number>{countOfStories}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={`${totalPoint} ${t('general.points')}`}>
          <DataContainer><CoffeeOutlined /><Number>{totalPoint}</Number></DataContainer>
        </Tooltip>
      </Space>
      <div style={{ marginTop: '0.5rem', marginBottom: '-0.5rem' }}>
        <Typography.Text strong>{t('milestone.percentageCompleted', { percentage: countOfStories ? Math.round((countOfDoneStories / countOfStories) * 100) : 0 })}</Typography.Text>
      </div>
      <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
        <Progress
          percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
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

  &:hover{
    box-shadow: 1px 1px 1px lightgray;
    border: 1px solid gray;
    cursor: pointer;
  }
`

const Number = styled.span`
  margin-left: 0.1rem;
`

const DataContainer = styled.span`
  color: gray;
  margin-right: 0.2rem;
`
