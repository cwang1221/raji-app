import { Dropdown, Menu, Button, Input } from 'antd'
import { CaretDownOutlined, StopOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { FilterItemBase } from './FilterItem'
import { clone, stopPropagation } from '../../utils'
import { MyCard } from '../myCard'
import { useFilterState } from '../filterBar/FilterBar'

export function MultiSelect({ name, icon, description, showSearch, items, allText, multipleText, selectedKeys, onSelectionChange }) {
  const { t } = useTranslation()
  const [shownText, setShownText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [formattedItems, setFormattedItems] = useState([])
  const [formattedSelectedKeys, setFormattedSelectedKeys] = useState([])
  const { setFilteredFilters, clearFlag } = useFilterState()

  useEffect(() => {
    setFormattedItems([{
      key: 'all',
      text: allText
    }, ...items])
  }, [items, allText])

  useEffect(() => {
    if (selectedKeys.length === 1) {
      setShownText(items.find((item) => item.key === selectedKeys[0]).text)
      setFormattedSelectedKeys([...selectedKeys])
      addFilteredFilters()
    } else if (selectedKeys.length === 0 || selectedKeys.length === items.length) {
      setShownText(t('filterBar.all'))
      setFormattedSelectedKeys(['all'])
      removeFromFilteredFilters()
    } else {
      setShownText(`${selectedKeys.length} ${multipleText}`)
      setFormattedSelectedKeys([...selectedKeys])
      addFilteredFilters()
    }
  }, [items, selectedKeys])

  useEffect(() => {
    clearFlag > 0 && selectAll()
  }, [clearFlag])

  const onSelect = ({ key, selectedKeys }) => {
    if (key === 'all' || selectedKeys.length === items.length) {
      selectAll()
    } else {
      const indexOfAll = selectedKeys.indexOf('all')
      indexOfAll > -1 && selectedKeys.splice(indexOfAll, 1)
      onSelectionChange(selectedKeys)
    }
  }

  const onDeselect = ({ selectedKeys }) => {
    if (!selectedKeys.length) {
      selectAll()
    } else {
      onSelectionChange(selectedKeys)
    }
  }

  const clear = (e) => {
    stopPropagation(e)
    selectAll()
  }

  const selectAll = () => onSelectionChange(items.map((item) => item.key))

  const addFilteredFilters = () => {
    setFilteredFilters((prev) => {
      const prevClone = clone(prev)
      prevClone.includes(name) || prevClone.push(name)
      return prevClone
    })
  }

  const removeFromFilteredFilters = () => {
    setFilteredFilters((prev) => {
      const prevClone = clone(prev)
      const index = prevClone.indexOf(name)
      index >= 0 && prevClone.splice(index, 1)
      return prevClone
    })
  }

  const Popup = () => (
    <div>
      <MyCard onClick={(e) => stopPropagation(e)} className="w-72">
        <span className="text-xs">{description}</span>
        {showSearch && <Input.Search onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} />}
        <Menu multiple selectedKeys={formattedSelectedKeys} onSelect={onSelect} onDeselect={onDeselect} className="border-r-0">
          {formattedItems.filter((item) => !searchText || (item.key !== 'all' && item.text.toLowerCase().includes(searchText))).map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
            >
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      </MyCard>
    </div>
  )

  return (
    <FilterItemBase name={name}>
      <Dropdown overlay={Popup} trigger={['click']}>
        <Button className="flex items-center">
          {icon}
          {shownText}
          {formattedSelectedKeys.includes('all')
            ? <CaretDownOutlined />
            : <ClearIcon onClick={clear} />}
        </Button>
      </Dropdown>
    </FilterItemBase>
  )
}

const ClearIcon = tw(StopOutlined)`
  text-red-600
  hover:text-red-800
`
