import { Dropdown, Menu } from 'antd'
import { useState } from 'react'
import tw from 'tailwind-styled-components'
import { stopPropagation } from '../../utils'
import { MyCard } from '../myCard'
import { SearchInput } from '../searchInput'

// Structure of items: [{key, text, icon}]
export function SimpleSelector({ title, description, showSearch, items, selectedKey, onSelect }) {
  const [searchText, setSearchText] = useState('')

  const Popup = () => (
    <div>
      <MyCard className="w-44">
        <div className="p-2">
          <span className="text-sm">{description}</span>
          {showSearch && <SearchInput onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} onClick={(e) => stopPropagation(e)} />}
        </div>
        <Menu selectedKeys={[selectedKey]} onSelect={({ key }) => onSelect(key)} className="border-r-0">
          {items.filter((item) => item.text.toLowerCase().includes(searchText)).map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className={item.key === 'none' && 'italic'}
            >
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      </MyCard>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Button>
        <Title>{title}</Title>
        <Text isNone={selectedKey === 'none'}>{items?.find((item) => item.key === selectedKey)?.text}</Text>
      </Button>
    </Dropdown>
  )
}

const Button = tw.div`
  flex
  items-center
  h-7
  w-48
  border
  text-left
  border-gray-300
  rounded-md
  p-2
  cursor-pointer

  hover:border-purple-700
`

const Title = tw.span`
  text-sm
  text-gray-600
`

const Text = tw.span`
  text-sm
  font-semibold
  whitespace-nowrap
  overflow-ellipsis
  overflow-hidden
  w-32
  ${({ isNone }) => (isNone && 'italic')}
  ${({ isNone }) => (isNone && 'text-gray-500')};
  ml-1
`
