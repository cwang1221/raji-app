import { Space, Typography, Progress, Tooltip, Dropdown, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { DoubleRightOutlined, CheckOutlined, BorderOutlined, FlagOutlined, FileTextOutlined, BorderlessTableOutlined, CheckCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export function MilestoneHeader({ id, name, countOfEpics, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, state, changeState }) {
  const { t } = useTranslation()
  const [stateComponent, setStateComponent] = useState(<div />)

  useEffect(() => {
    switch (state) {
      case 'todo':
        setStateComponent(<State><BorderOutlined style={{ marginRight: '0.3rem', color: '#c9a61d' }} />{t('milestone.todo')}</State>)
        break
      case 'inProgress':
        setStateComponent(<State><DoubleRightOutlined style={{ marginRight: '0.3rem' }} />{t('milestone.inProgress')}</State>)
        break
      case 'done':
        setStateComponent(<State><CheckCircleFilled style={{ marginRight: '0.3rem', color: '#009D4D' }} />{t('milestone.done')}</State>)
        break
      default:
        break
    }
  }, [state])

  return (
    <div style={{ width: '100%' }}>
      <Space style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ color: '#316399' }}>{name}</Typography.Title>
        {state === 'done' && <CheckOutlined style={{ fontSize: '20px', marginBottom: '0.5rem', color: '#009D4D' }} />}
      </Space>
      <Space>
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu selectedKeys={state} onClick={(e) => changeState(id, e.key)}>
              <Menu.Item key="todo" icon={<BorderOutlined style={{ color: '#c9a61d' }} />}>{t('milestone.todo')}</Menu.Item>
              <Menu.Item key="inProgress" icon={<DoubleRightOutlined style={{ color: 'gray' }} />}>{t('milestone.inProgress')}</Menu.Item>
              <Menu.Item key="done" icon={<CheckCircleFilled style={{ color: '#009D4D' }} />}>{t('milestone.done')}</Menu.Item>
            </Menu>
        )}
        >
          {stateComponent}
        </Dropdown>
        <Tooltip title={`${countOfEpics} ${t('general.epics')}`}>
          <DataContainer><FlagOutlined /><Number>{countOfEpics}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={`${countOfStories} ${t('general.stories')}`}>
          <DataContainer><FileTextOutlined /><Number>{countOfStories}</Number></DataContainer>
        </Tooltip>
        <Tooltip title={`${totalPoint} ${t('general.points')}`}>
          <DataContainer><BorderlessTableOutlined /><Number>{totalPoint}</Number></DataContainer>
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
