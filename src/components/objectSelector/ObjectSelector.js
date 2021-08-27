import { Dropdown, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import { stopPropagation } from '../../utils'
import { MyCard } from '../myCard'
import { SearchInput } from '../searchInput'

export function ObjectSelector({ title, items, selectedId, onSelect, popupTitle, showSearch = true }) {
  const [searchText, setSearchText] = useState([])
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    setSelectedItem(items.find((item) => `${item.id}` === selectedId) || {})
  }, [selectedId, items])

  const Popup = () => (
    <div>
      <MyCard className="w-64">
        <div className="p-2">
          <span className="text-sm">{popupTitle}</span>
          {showSearch && <SearchInput onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} onClick={(e) => stopPropagation(e)} />}
        </div>
        <Menu selectedKeys={[selectedId]} onSelect={({ key }) => onSelect(key)} className="border-r-0 max-h-80 overflow-auto">
          {items.filter((item) => item.name.toLowerCase().includes(searchText)).map((item) => (
            <Menu.Item
              key={`${item.id}`}
              icon={item.id !== 'none' && item.icon}
              className={item.id === 'none' && 'italic'}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </MyCard>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Container>
        <span className="flex text-2xl">
          {selectedItem.icon}
        </span>
        <TextContainer>
          <Title>{title}</Title>
          <Text $isNone={selectedId === 'none'}>{selectedItem.name}</Text>
        </TextContainer>
      </Container>
    </Dropdown>
  )
}

const Container = tw.div`
  flex
  items-center
  h-10
  w-48
  border
  text-left
  border-gray-300
  rounded-md
  align-items: center;
  p-2
  cursor-pointer

  hover:border-purple-700
`

const TextContainer = tw.div`
  flex
  flex-col
  ml-2
`

const Title = tw.span`
  text-sm
  text-gray-700
`

const Text = tw.span`
  -mt-1
  text-sm
  font-semibold
  whitespace-nowrap
  overflow-ellipsis
  overflow-hidden
  w-32
  ${({ $isNone }) => ($isNone && 'italic text-gray-500')}
`
