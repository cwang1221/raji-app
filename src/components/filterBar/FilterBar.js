import { Button, Space } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import React, { useState } from 'react'

export function FilterBar({ leftChildren, rightChildren }) {
  const { t } = useTranslation()
  const [filters, setFilters] = useState([])

  const onClear = () => {
    filters.forEach((filter) => filter.clear())
  }

  const registerFilter = (filterInfo) => {
    filters.push(filterInfo)
    setFilters(filters)
  }

  return (
    <Container>
      <Space align="end">
        {leftChildren.map((child) => React.cloneElement(child, {
          registerFilter,
          onChange: ({ id, items }) => {
            child.props.onChange(items)
            filters.find((filter) => filter.id === id).isFiltered = !items.includes('all')
            setFilters(filters)
          }
        }))}
        {filters.some((filter) => filter.isFiltered) && <Button onClick={onClear}><StopOutlined style={{ color: 'rgb(198, 107, 107)' }} />{t('filterBar.clearFilters')}</Button>}
      </Space>
      <Space align="end">
        {rightChildren}
      </Space>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`
