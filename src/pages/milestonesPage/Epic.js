import { Typography, Progress, Avatar, Tooltip, List } from 'antd'
import tw from 'tailwind-styled-components'
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
        <Typography.Title level={5} onClick={() => setShowModal(true)} className="cursor-pointer">{name}</Typography.Title>
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
          <div className="flex justify-end">
            {owners.map((owner) => (
              <Tooltip key={owner.id} title={owner.name}>
                <Avatar size="small" src={owner.avatar} className="ml-1" />
              </Tooltip>
            ))}
          </div>
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

const EpicContainer = tw(List.Item)`
  flex
  items-baseline
  w-full
  p-4
  border
  border-gray-200
  bg-white
`

const EpicMainContent = tw.div`
  flex
  flex-col
  justify-between
  w-full
  ml-2
  -mt-2
  -mb-2
`

const Footer = tw.div`
  flex
  items-center
  justify-between
`

const DataContainer = tw.div`
  flex
  items-center
  justify-between
  text-gray-500
  text-xs
`

const ProgressBar = tw(Progress)`
  w-12
  -mt-1
`

const DataBackground = tw.div`
  bg-gray-100
  rounded-md
  px-1
  mr-2
`
