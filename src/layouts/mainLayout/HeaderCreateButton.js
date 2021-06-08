import { BlockOutlined, CaretDownOutlined, FileTextOutlined, FlagFilled, RocketOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateProjectModal } from '../../components'
import { eventBus, events } from '../../utils'

export function HeaderCreateButton() {
  const { t } = useTranslation()
  const [type, setType] = useState('story')
  const [showProjectModal, setShowProjectModal] = useState(false)

  const objects = useRef({
    story: {
      text: t('header.createStory')
    },
    epic: {
      text: t('header.createEpic')
    },
    milestone: {
      text: t('header.createMilestone')
    },
    project: {
      text: t('header.createProject')
    }
  })

  useEffect(() => {
    eventBus.subscribe(events.setCreateButton, setType)
  }, [])

  const createObject = (objectType) => {
    switch (objectType) {
      case 'project':
        setShowProjectModal(true)
        break
      default:
        break
    }
  }

  return (
    <>
      <LeftButton as={Button} type="primary" size="large" onClick={() => createObject(type)}>
        {objects.current[type].text}
      </LeftButton>
      <Dropdown
        placement="bottomRight"
        overlay={(
          <Menu onClick={(e) => createObject(e.key)}>
            <Menu.Item key="story" icon={<FileTextOutlined style={{ color: 'gray' }} />}>{t('header.createStory')}</Menu.Item>
            <Menu.Item key="epic" icon={<FlagFilled style={{ color: 'rgb(100, 20, 219)' }} />}>{t('header.createEpic')}</Menu.Item>
            <Menu.Item key="project" icon={<RocketOutlined style={{ color: 'gray' }} />}>{t('header.createProject')}</Menu.Item>
            <Menu.Item key="milestone" icon={<BlockOutlined style={{ color: 'rgb(237, 128, 2)' }} />}>{t('header.createMilestone')}</Menu.Item>
          </Menu>
      )}
      >
        <RightButton as={Button} type="primary" size="large" icon={<CaretDownOutlined />} />
      </Dropdown>
      <CreateProjectModal visible={showProjectModal} disableType={false} close={() => setShowProjectModal(false)} />
    </>
  )
}

const LeftButton = styled.button`
  background: #13AE47 !important;
  border-color: #13AE47 !important;;
  height: 36px !important;
  padding-top: 4.4px !important;
  padding-bottom: 4.4px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;

  &:hover{
    background: #14B74B !important;
    border-color: #14B74B !important;;
  }
`

const RightButton = styled.button`
  background: #13AE47 !important;
  border-color: #13AE47 !important;;
  height: 36px !important;
  padding-top: 4.4px !important;
  padding-bottom: 4.4px !important;
  width: 36px !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-left: 1px solid DimGray !important;

  &:hover{
    background: #14B74B !important;
    border-color: #14B74B !important;
    border-left: 1px solid DimGray !important;
  }
`
