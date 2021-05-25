import { Dropdown, Menu, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterItemBase } from './FilterItem'
import styles from './MultiSelect.module.css'

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
        <Button className={styles.button}>
          <div className={styles.buttonContent}>
            {icon}
            <span className={styles.shownText}>{shownText}</span>
            <DownOutlined />
          </div>
        </Button>
      </Dropdown>
    </FilterItemBase>
  )
}
