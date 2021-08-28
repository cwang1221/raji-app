import { Avatar, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { CreateStoryModal, StoryTypeIcon, PointProperty } from '..'

export function StoryCard({ id, name, epicName, projectColor, projectName, type, estimate, ownerAvatar, owner }) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const editStory = () => {
    setShowModal(true)
  }

  return (
    <Container style={{ borderLeft: `6px ${projectColor} solid` }}>
      <div className="p-2">
        <EpicName>{epicName?.toLocaleUpperCase()}</EpicName>
        <Typography.Text strong onClick={editStory} className="cursor-pointer">{name}</Typography.Text>
      </div>
      <Footer>
        <LeftFooter>
          <Tooltip title={t(`story.${type}`)}>
            <StoryInfo type={type}>
              <StoryTypeIcon type={type} />
              <StoryId type={type}>#{id}</StoryId>
            </StoryInfo>
          </Tooltip>
          <Tooltip title={projectName}>
            <ProjectName>{projectName[0].toLocaleUpperCase()}</ProjectName>
          </Tooltip>
          { Number.isInteger(estimate) && <PointProperty point={estimate} /> }
        </LeftFooter>
        <Tooltip title={`${t('general.owner')}: ${owner}`}>
          {ownerAvatar && <Avatar size="small" src={ownerAvatar} />}
        </Tooltip>
      </Footer>
      <CreateStoryModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
    </Container>
  )
}

const Container = tw.div`
  flex
  flex-col
  rounded-md
  min-h-24
  mb-4
  bg-white
  shadow-md
  transform
  transition-transform

  hover:-translate-x-0.5
  hover:-translate-y-0.5
`

const EpicName = tw.div`
  text-xs
  text-gray-500
`

const Footer = tw.div`
  flex
  justify-between
  items-center
  bg-gray-50
  rounded-br-md
  h-9
  px-4
`

const LeftFooter = tw.div`
  flex
  items-center
  text-xs
  text-gray-500
`

const StoryInfo = tw.div`
  flex
  items-center
  rounded
  px-1
  bg-gray-100
  h-5
`

const StoryId = tw.div`
  h-5 
  ml-1
  flex
  items-center
  ${({ type }) => {
    switch (type) {
      case 'feature':
        return 'text-yellow-500'
      case 'bug':
        return 'text-red-700'
      case 'chore':
      default:
        return 'text-gray-600'
    }
  }}
`

const ProjectName = tw.span`
  ml-3
  mr-4
`
