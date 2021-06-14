import { CaretDownOutlined, EnvironmentFilled, StopOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useMilestone } from '../../hooks'
import { MilestoneStateIcon } from '../milestoneStateIcon'
import { MyCard } from '../myCard'
import { FilterItemBase } from './FilterItem'

export function MilestoneFilter({ onChange, registerFilter }) {
  const { t } = useTranslation()
  const { getMilestones } = useMilestone()
  const [showAll, setShowAll] = useState(true)
  const [milestones, setMilestones] = useState([])
  const [filteredMilestones, setFilteredMilestones] = useState([])
  const [shownText, setShownText] = useState(t('filterBar.all'))
  const [selectedMilestones, setSelectedMilestones] = useState(['all'])
  const searchBoxRef = useRef()

  useEffect(async () => {
    registerFilter({
      id: 'milestone',
      clear: () => setSelectedMilestones(['all'])
    })

    const data = await getMilestones()
    data.find((milestone) => milestone.id === 1).name = t('filterBar.noMilestone')
    data.sort((milestone1, milestone2) => milestone1.id - milestone2.id)
    setMilestones(data)
    setFilteredMilestones(data)
  }, [])

  const onPopupVisibleChange = (visible) => {
    if (!visible) {
      searchBoxRef?.current?.setValue('')
      setFilteredMilestones(milestones)
      setShowAll(true)
    }
  }

  useEffect(() => {
    if (selectedMilestones.includes('all')) {
      setShownText(t('filterBar.all'))
    } else if (selectedMilestones.length === 1) {
      setShownText(milestones.find((item) => `${item.id}` === selectedMilestones[0]).name)
    } else {
      setShownText(t('filterBar.countMilestones', { count: selectedMilestones.length }))
    }
    onChange && onChange({
      id: 'milestone',
      items: selectedMilestones
    })
  }, [selectedMilestones])

  const onSelect = ({ key, selectedKeys }) => {
    if (key === 'all') {
      setSelectedMilestones(['all'])
    } else {
      const indexOfAll = selectedKeys.indexOf('all')
      indexOfAll > -1 && selectedKeys.splice(indexOfAll, 1)
      setSelectedMilestones(selectedKeys)
    }
  }

  const onDeselect = ({ selectedKeys }) => {
    if (!selectedKeys.length) {
      setSelectedMilestones(['all'])
    } else {
      setSelectedMilestones(selectedKeys)
    }
  }

  const onFilterMilestones = (e) => {
    const filterText = e.currentTarget.value.toLowerCase()
    if (filterText) {
      setFilteredMilestones(milestones.filter((item) => item.name.toLowerCase().includes(filterText)))
      setShowAll(false)
    } else {
      setFilteredMilestones(milestones)
      setShowAll(true)
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const onClear = (e) => {
    stopPropagation(e)
    setSelectedMilestones(['all'])
  }

  const Popup = () => (
    <div>
      <FilterPopup onClick={(e) => stopPropagation(e)}>
        <span style={{ fontSize: '10px' }}>{t('filterBar.milestoneHint')}</span>
        <Input.Search ref={searchBoxRef} onChange={onFilterMilestones} />
        <Menu multiple selectedKeys={selectedMilestones} onSelect={onSelect} onDeselect={onDeselect} style={{ borderRight: '0px' }}>
          {showAll && <Menu.Item key="all">{t('filterBar.allMilestones')}</Menu.Item>}
          {filteredMilestones.map((milestone) => (
            <Menu.Item key={`${milestone.id}`} icon={milestone.id !== 1 && <MilestoneStateIcon state={milestone.state} />}>{milestone.name}</Menu.Item>
          ))}
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <FilterItemBase name={t('milestone.milestones')}>
      <Dropdown overlay={Popup} trigger={['click']} onVisibleChange={onPopupVisibleChange}>
        <Button>
          <EnvironmentFilled style={{ color: 'rgb(237, 128, 2)' }} />
          {shownText}
          {selectedMilestones.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon onClick={onClear} />}
        </Button>
      </Dropdown>
    </FilterItemBase>
  )
}

const FilterPopup = styled(MyCard)`
  width: 18rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`

const ClearIcon = styled(StopOutlined)`
  color: rgb(198, 107, 107);

  &:hover {
    color: darkred;
  }
`
