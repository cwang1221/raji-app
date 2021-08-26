import { CaretDownOutlined, EnvironmentFilled, FileTextFilled, FlagFilled, RocketFilled } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CreateEpicModal, CreateProjectModal, CreateStoryModal, CreateMilestoneModal } from '../../components'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'

export function HeaderCreateButton() {
  const { t } = useTranslation()
  const [buttonText, setButtonText] = useState('')
  const [dropdownWidth, setDropdownWidth] = useState('0')
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showEpicModal, setShowEpicModal] = useState(false)
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)
  const leftButtonRef = useRef()
  const { headerCreateButtonType } = useHeaderCreateButtonContext()

  useEffect(() => {
    const i18nKey = `header.create${headerCreateButtonType.substring(0, 1).toUpperCase()}${headerCreateButtonType.substring(1)}`
    setButtonText(t(i18nKey))
  }, [headerCreateButtonType])

  const createObject = (objectType) => {
    switch (objectType) {
      case 'story':
        setShowStoryModal(true)
        break
      case 'project':
        setShowProjectModal(true)
        break
      case 'epic':
        setShowEpicModal(true)
        break
      case 'milestone':
        setShowMilestoneModal(true)
        break
      default:
        break
    }
  }

  const onDropdownVisibleChange = (visible) => {
    if (visible) {
      setDropdownWidth(`${leftButtonRef.current.offsetWidth + 36}px`)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <LeftButton ref={leftButtonRef} type="primary" size="large" onClick={() => createObject(headerCreateButtonType)} className="headerCreateButtonLeft">
        {buttonText}
      </LeftButton>
      <Dropdown
        placement="bottomRight"
        onVisibleChange={onDropdownVisibleChange}
        trigger={['click']}
        overlay={(
          <Menu onClick={(e) => createObject(e.key)} style={{ width: dropdownWidth }}>
            <Menu.Item key="story" icon={<FileTextFilled className="text-green-600" />}>{t('header.createStory')}</Menu.Item>
            <Menu.Item key="epic" icon={<FlagFilled className="text-purple-700" />}>{t('header.createEpic')}</Menu.Item>
            <Menu.Item key="project" icon={<RocketFilled className="text-gray-600" />}>{t('header.createProject')}</Menu.Item>
            <Menu.Item key="milestone" icon={<EnvironmentFilled className="text-yellow-600" />}>{t('header.createMilestone')}</Menu.Item>
          </Menu>
      )}
      >
        <RightButton type="primary" size="large" icon={<CaretDownOutlined />} />
      </Dropdown>
      <CreateProjectModal visible={showProjectModal} disableType={false} close={() => setShowProjectModal(false)} />
      <CreateStoryModal visible={showStoryModal} close={() => setShowStoryModal(false)} />
      <CreateEpicModal visible={showEpicModal} close={() => setShowEpicModal(false)} />
      <CreateMilestoneModal visible={showMilestoneModal} close={() => setShowMilestoneModal(false)} />
    </div>
  )
}

const LeftButton = styled(Button)`
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

const RightButton = styled(Button)`
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
