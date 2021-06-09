import { Dropdown, Input, Menu } from 'antd'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { MyCard } from '../myCard'

export function ObjectSelector({ icon, title, text, items, selectedKey, popupTitle }) {
  const searchBoxRef = useRef()

  const stopPropagation = (e) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  const Popup = () => (
    <div>
      <PopupContainer onClick={(e) => stopPropagation(e)}>
        <span style={{ fontSize: '10px' }}>{popupTitle}</span>
        <Input.Search ref={searchBoxRef} onChange={onFilterProjects} />
        <Menu selectedKeys={[selectedKey]} onSelect={onSelect} style={{ borderRight: '0px' }}>
          {showAll && <Menu.Item key="all">{t('filterBar.allProjects')}</Menu.Item>}
          {filteredProjects.map((project) => (
            <Menu.Item key={`${project.id}`} icon={<RightCircleFilled style={{ color: project.color }} />}>{project.name}</Menu.Item>
          ))}
        </Menu>
      </PopupContainer>
    </div>
  )

  return (
    <Dropdown overlay={Popup}>
      <Container>
        {React.cloneElement(icon, { className: 'icon' })}
        <TextContainer>
          <Title>{title}</Title>
          <Text>{text}</Text>
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
  width: 18rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`
