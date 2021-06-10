import { SearchOutlined } from '@ant-design/icons'
import { Dropdown, Input, Menu } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MyCard } from '../myCard'
import { SearchInput } from '../searchInput'

export function ObjectSelector({ title, items, selectedId, onSelect, popupTitle }) {
  const searchBoxRef = useRef()
  const [searchText, setSearchText] = useState([])
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    setSelectedItem(items.find((item) => item.id === selectedId) || {})
  }, [selectedId, items])

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const select = ({ key }) => {
    onSelect(parseInt(key, 10))
  }

  const Popup = () => (
    <div>
      <PopupContainer>
        <span style={{ fontSize: '12px' }}>{popupTitle}</span>
        <SearchInput ref={searchBoxRef} onChange={(e) => setSearchText(e.currentTarget.value.toLowerCase())} onClick={(e) => stopPropagation(e)} />
        <Menu selectedKeys={[selectedId]} onSelect={select} style={{ borderRight: '0' }}>
          {items.filter((item) => item.name.toLowerCase().includes(searchText)).map((item) => (
            <Menu.Item key={`${item.id}`} icon={item.icon}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </PopupContainer>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Container>
        {selectedItem.icon && React.cloneElement(selectedItem.icon, { className: 'icon' })}
        <TextContainer>
          <Title>{title}</Title>
          <Text>{selectedItem.name}</Text>
        </TextContainer>
      </Container>
    </Dropdown>
  )
}

const Container = styled.div`
  border: 1px rgb(217, 217, 217) solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 40px;
  width: 190px;
  text-align: left;
  padding: 5px;

  &:hover {
    border: 1px #804bd6 solid;
    cursor: pointer;
  }

  & .icon {
    font-size: 24px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`

const Title = styled.span`
  font-size: 13px;
  color: gray;
`

const Text = styled.span`
  margin-top: -4px;
  font-size: 13px;
  font-weight: 600;
`

const PopupContainer = styled(MyCard)`
  width: 16rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`
