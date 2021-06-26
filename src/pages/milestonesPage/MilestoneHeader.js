import { Space, Typography, Tooltip, Dropdown, Menu, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { MilestoneStateIcon } from '../../components/milestoneStateIcon/MilestoneStateIcon'
import { useMilestone } from '../../hooks/useRequest'
import { useEventContext } from '../../contexts/eventContext'
import { CreateMilestoneModal, ProgressBar, StoryProperty, PointProperty, EpicProperty } from '../../components'

export function MilestoneHeader({ id, name, countOfEpics, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, state, changeState }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const { deleteMilestone } = useMilestone()
  const { publishMilestoneDeletedEvent } = useEventContext()

  const onDeleteMilestone = async () => {
    await deleteMilestone(id)
    publishMilestoneDeletedEvent()
  }

  return (
    <div style={{ width: '100%' }}>
      <Space style={{ width: '100%' }}>
        <MilestoneName level={4} onClick={() => setShowModal(true)}>{name}</MilestoneName>
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
      <Space style={{ color: 'gray' }}>
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
        <EpicProperty countOfEpics={countOfEpics} hasRightMargin={false} />
        <StoryProperty countOfStories={countOfStories} hasRightMargin={false} />
        <PointProperty point={totalPoint} hasRightMargin={false} />
      </Space>
      <ProgressBar
        countOfStories={countOfStories}
        countOfInProgressStories={countOfInProgressStories}
        countOfDoneStories={countOfDoneStories}
      />
      <CreateMilestoneModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
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

const MilestoneName = styled(Typography.Title)`
  color: #316399 !important;

  &:hover {
    cursor: pointer;
  }
`
