import { CaretDownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { eventBus, events } from '../../utils'

export function HeaderCreateButton() {
  const { t } = useTranslation()
  const [type, setType] = useState('story')

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

  return (
    <>
      <LeftButton as={Button} type="primary" size="large">
        {objects.current[type].text}
      </LeftButton>
      <RightButton as={Button} type="primary" size="large" icon={<CaretDownOutlined />} />
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
