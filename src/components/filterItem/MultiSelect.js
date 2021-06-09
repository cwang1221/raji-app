import { Dropdown, Menu, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FilterItemBase } from './FilterItem'

export function MultiSelect({ name, items, value, icon, onChange }) {
  const [shownText, setShownText] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    if (value.length === 0) {
      setShownText(t('filterBar.none'))
    } else if (value.length === 1) {
      setShownText(items.find((item) => item.key === value[0]).text)
    } else if (value.length === items.length) {
      setShownText(t('filterBar.all'))
    } else {
      setShownText(t('filterBar.countItems', { count: value.length }))
    }
  }, [value])

  const onClickMenuItem = (e) => {
    const index = value.indexOf(e.key)
    const clonedValue = [...value]
    if (index !== -1) {
      clonedValue.splice(index, 1)
    } else {
      clonedValue.push(e.key)
    }
    onChange(clonedValue)
  }

  return (
    <FilterItemBase name={name}>
      <Dropdown
        trigger={['click']}
        overlay={(
          <Menu
            multiple
            selectedKeys={value}
            onClick={onClickMenuItem}
          >
            {items.map((item) => <Menu.Item key={item.key}>{item.text}</Menu.Item>)}
          </Menu>
        )}
      >
        <MultiSelectButton>
          <ButtonContent>
            {icon}
            <ShownText>{shownText}</ShownText>
            <DownOutlined />
          </ButtonContent>
        </MultiSelectButton>
      </Dropdown>
    </FilterItemBase>
  )
}

const MultiSelectButton = styled(Button)`
  width: 9rem;
  padding-left: 0.7rem !important;
  padding-right: 0.7rem !important;
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ShownText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 1fr;
  margin: 0 0.5rem;
`
