import { CaretDownOutlined, AppstoreFilled, StopOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { MilestoneStateIcon } from '../milestoneStateIcon/MilestoneStateIcon'
import { MyCard } from '../myCard'
import { FilterItemBase } from './FilterItem'

export function MilestoneStateFilter({ onChange, registerFilter }) {
  const { t } = useTranslation()
  const [shownText, setShownText] = useState(t('filterBar.all'))
  const [selectedStates, setSelectedStates] = useState(['all'])

  useEffect(() => {
    registerFilter({
      id: 'milestoneState',
      clear: () => setSelectedStates(['all'])
    })
  }, [])

  useEffect(() => {
    if (selectedStates.includes('all')) {
      setShownText(t('filterBar.all'))
    } else if (selectedStates.length === 1) {
      setShownText(t(`milestone.${selectedStates[0]}`))
    } else {
      setShownText(t('filterBar.countStates', { count: selectedStates.length }))
    }
    onChange && onChange({
      id: 'milestoneState',
      items: selectedStates
    })
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

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const clear = (e) => {
    stopPropagation(e)
    setSelectedStates(['all'])
  }

  const Popup = () => (
    <div>
      <FilterPopup as={MyCard} onClick={(e) => stopPropagation(e)}>
        <span style={{ fontSize: '10px' }}>{t('filterBar.milestoneStateHint')}</span>
        <Menu multiple selectedKeys={selectedStates} onSelect={onSelect} onDeselect={onDeselect} style={{ borderRight: '0px' }}>
          <Menu.Item key="all">{t('filterBar.allProjects')}</Menu.Item>
          <Menu.Item key="todo" icon={<MilestoneStateIcon state="todo" />}>{t('milestone.todo')}</Menu.Item>
          <Menu.Item key="inProgress" icon={<MilestoneStateIcon state="inProgress" />}>{t('milestone.inProgress')}</Menu.Item>
          <Menu.Item key="done" icon={<MilestoneStateIcon state="done" />}>{t('milestone.done')}</Menu.Item>
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <FilterItemBase name={t('milestone.states')}>
      <Dropdown overlay={Popup} trigger={['click']}>
        <Button>
          <AppstoreFilled style={{ color: 'rgb(132, 131, 135)' }} />
          {shownText}
          {selectedStates.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon as={StopOutlined} onClick={clear} />}
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
