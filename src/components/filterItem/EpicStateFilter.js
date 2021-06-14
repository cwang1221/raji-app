import { CaretDownOutlined, AppstoreFilled, StopOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { EpicStateIcon } from '../epicStateIcon/EpicStateIcon'
import { MyCard } from '../myCard'
import { FilterItemBase } from './FilterItem'

export function EpicStateFilter({ selectedStates, onChange, registerFilter }) {
  const { t } = useTranslation()
  const [shownText, setShownText] = useState(t('filterBar.all'))

  useEffect(() => {
    registerFilter({
      id: 'epicState',
      clear: () => filterChange(['all'])
    })
  }, [])

  useEffect(() => {
    if (selectedStates.includes('all')) {
      setShownText(t('filterBar.all'))
    } else if (selectedStates.length === 1) {
      setShownText(t(`epic.${selectedStates[0]}`))
    } else {
      setShownText(t('filterBar.countStates', { count: selectedStates.length }))
    }
  }, [selectedStates])

  const filterChange = (items) => {
    onChange({
      id: 'epicState',
      items
    })
  }

  const onSelect = ({ key, selectedKeys }) => {
    if (key === 'all') {
      filterChange(['all'])
    } else {
      const indexOfAll = selectedKeys.indexOf('all')
      indexOfAll > -1 && selectedKeys.splice(indexOfAll, 1)
      filterChange(selectedKeys)
    }
  }

  const onDeselect = ({ selectedKeys }) => {
    if (!selectedKeys.length) {
      filterChange(['all'])
    } else {
      filterChange(selectedKeys)
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const clear = (e) => {
    stopPropagation(e)
    filterChange(['all'])
  }

  const Popup = () => (
    <div>
      <FilterPopup onClick={(e) => stopPropagation(e)}>
        <span style={{ fontSize: '10px' }}>{t('filterBar.epicStateHint')}</span>
        <Menu multiple selectedKeys={selectedStates} onSelect={onSelect} onDeselect={onDeselect} style={{ borderRight: '0px' }}>
          <Menu.Item key="all">{t('filterBar.allStates')}</Menu.Item>
          <Menu.Item key="todo" icon={<EpicStateIcon state="todo" />}>{t('epic.todo')}</Menu.Item>
          <Menu.Item key="inProgress" icon={<EpicStateIcon state="inProgress" />}>{t('epic.inProgress')}</Menu.Item>
          <Menu.Item key="done" icon={<EpicStateIcon state="done" />}>{t('epic.done')}</Menu.Item>
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <FilterItemBase name={t('epic.epicStates')}>
      <Dropdown overlay={Popup} trigger={['click']}>
        <Button>
          <AppstoreFilled style={{ color: 'rgb(132, 131, 135)' }} />
          {shownText}
          {selectedStates.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon onClick={clear} />}
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
