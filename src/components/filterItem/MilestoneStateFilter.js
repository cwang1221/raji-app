import { CaretDownOutlined, AppstoreFilled, StopOutlined, BorderOutlined, DoubleRightOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Button, Card, Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FilterItemBase } from './FilterItem'

export function MilestoneStateFilter({ onChange }) {
  const { t } = useTranslation()
  const [showPopup, setShowPopup] = useState(false)
  const [shownText, setShownText] = useState(t('filterBar.all'))
  const [selectedStates, setSelectedStates] = useState(['all'])
  const states = [{
    id: 'todo',
    icon: <BorderOutlined style={{ color: '#c9a61d' }} />
  }, {
    id: 'inProgress',
    icon: <DoubleRightOutlined />
  }, {
    id: 'done',
    icon: <CheckCircleFilled style={{ color: '#009D4D' }} />
  }]

  const documentClick = () => showPopup || setShowPopup(false)

  useEffect(async () => {
    document.addEventListener('click', documentClick)
    return () => document.removeEventListener('click', documentClick)
  }, [])

  useEffect(() => {
    if (selectedStates.includes('all')) {
      setShownText(t('filterBar.all'))
    } else if (selectedStates.length === 1) {
      setShownText(t(`milestones.${selectedStates[0]}`))
    } else {
      setShownText(t('filterBar.countStates', { count: selectedStates.length }))
    }
    onChange && onChange(selectedStates)
  }, [selectedStates])

  const onSelect = ({ key, selectedKeys }) => {
    if (key === 'all') {
      setSelectedStates(['all'])
    } else {
      const indexOfAll = selectedKeys.indexOf('all')
      indexOfAll > -1 && selectedKeys.splice(indexOfAll, 1)
      setSelectedStates(selectedKeys)
    }
  }

  const onDeselect = ({ selectedKeys }) => {
    if (!selectedKeys.length) {
      setSelectedStates(['all'])
    } else {
      setSelectedStates(selectedKeys)
    }
  }

  const onClear = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setSelectedStates(['all'])
    setShowPopup(false)
  }

  const Popup = () => (
    <div>
      <FilterPopup as={Card} onClick={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <span style={{ fontSize: '10px' }}>{t('filterBar.milestoneStateHint')}</span>
        <Menu multiple selectedKeys={selectedStates} onSelect={onSelect} onDeselect={onDeselect} style={{ borderRight: '0px' }}>
          <Menu.Item key="all">{t('filterBar.allProjects')}</Menu.Item>
          {states.map((state) => (
            <Menu.Item key={`${state.id}`} icon={state.icon}>{t(`milestones.${state.id}`)}</Menu.Item>
          ))}
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <FilterItemBase name={t('milestones.states')}>
      <Dropdown overlay={Popup} visible={showPopup}>
        <Button
          onClick={(e) => {
            setShowPopup(!showPopup)
            e.nativeEvent.stopImmediatePropagation()
          }}
        >
          <AppstoreFilled style={{ color: 'rgb(132, 131, 135)' }} />
          {shownText}
          {selectedStates.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon as={StopOutlined} onClick={onClear} />}
        </Button>
      </Dropdown>
    </FilterItemBase>
  )
}

const FilterPopup = styled.div`
  width: 18rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`

const ClearIcon = styled.div`
  color: rgb(198, 107, 107);

  &:hover {
    color: darkred;
  }
`
