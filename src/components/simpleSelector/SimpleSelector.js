import { Dropdown, Menu } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { stopPropagation } from '../../utils'
import { MyCard } from '../myCard'
import { SearchInput } from '../searchInput'

// Structure of items: [{key, text, icon}]
export function SimpleSelector({ title, description, showSearch, items, selectedKey, onSelect }) {
  const [searchText, setSearchText] = useState('')

  const Popup = () => (
    <div>
      <PopupContainer>
        <PopupHeader>
          <span style={{ fontSize: '12px' }}>{description}</span>
          {showSearch && <SearchInput onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} onClick={(e) => stopPropagation(e)} />}
        </PopupHeader>
        <Menu selectedKeys={[selectedKey]} onSelect={({ key }) => onSelect(key)} style={{ borderRight: '0' }}>
          {items.filter((item) => item.text.toLowerCase().includes(searchText)).map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{ fontStyle: item.key === 'none' ? 'italic' : 'normal' }}
            >
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      </PopupContainer>
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

const Button = styled.div`
  border: 1px rgb(217, 217, 217) solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 28px;
  width: 190px;
  text-align: left;
  padding: 8px;

  &:hover {
    border: 1px #804bd6 solid;
    cursor: pointer;
  }
`

const Title = styled.span`
  font-size: 13px;
  color: gray;
`

const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 130px;
  font-style: ${(props) => (props.isNone ? 'italic' : 'normal')};
  color: ${(props) => (props.isNone && 'gray')};
  margin-left: 3px;
`

const PopupContainer = styled(MyCard)`
  width: 170px;

  & .ant-card-body {
    padding: 0;
  }
`

const PopupHeader = styled.div`
  padding: 0.5rem
`
