import { Space, Typography, Tooltip, Dropdown, Menu, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { publish } from 'pubsub-js'
import { MilestoneStateIcon } from '../../components/milestoneStateIcon/MilestoneStateIcon'
import { useMilestone } from '../../hooks/useRequest'
import { CreateMilestoneModal, ProgressBar, StoryProperty, PointProperty, EpicProperty } from '../../components'
import { MILESTONE_DELETED } from '../../utils/events'

export function MilestoneHeader({ id, name, countOfEpics, countOfStories, countOfDoneStories, countOfInProgressStories, totalPoint, state, changeState }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const { deleteMilestone } = useMilestone()

  const onDeleteMilestone = async () => {
    await deleteMilestone(id)
    publish(MILESTONE_DELETED)
  }

  return (
    <div className="w-full">
      <Space className="w-full">
        <MilestoneName level={4} onClick={() => setShowModal(true)}>{name}</MilestoneName>
        {state === 'done' && <CheckOutlined className="text-xl mb-2 text-green-600" />}
        {!countOfEpics && (
        <Tooltip title={t('general.delete')}>
          <Button
            type="text"
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={onDeleteMilestone}
            className="absolute right-4 top-4"
          />
        </Tooltip>
        )}
      </Space>
      <Space className="text-gray-500">
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
            <MilestoneStateIcon state={state} className="mr-1" /> {t(`milestone.${state}`)}
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

const State = tw.span`
  rounded-md
  border
  border-gray-300
  text-gray-500
  px-1
  mr-2
  text-xs
  font-medium
  cursor-pointer

  hover:shadow
`

const MilestoneName = tw(Typography.Title)`
  text-blue-900
  cursor-pointer
`
