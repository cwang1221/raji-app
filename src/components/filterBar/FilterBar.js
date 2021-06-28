import { Button, Space } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import React, { useState, createContext, useContext } from 'react'

const FilterStateContext = createContext()
export const useFilterState = () => useContext(FilterStateContext)

export function FilterBar({ leftChildren, rightChildren }) {
  const { t } = useTranslation()
  const [filteredFilters, setFilteredFilters] = useState([])
  const [clearFlag, setClearFlag] = useState(0)

  return (
    <FilterStateContext.Provider value={{ setFilteredFilters, clearFlag }}>
      <Container>
        <Space align="end">
          {leftChildren}
          {filteredFilters.length > 0 && (
            <Button onClick={() => setClearFlag((prev) => prev + 1)}>
              <StopOutlined style={{ color: 'rgb(198, 107, 107)' }} />{t('filterBar.clearFilters')}
            </Button>
          )}
        </Space>
        <Space align="end">
          {rightChildren}
        </Space>
      </Container>
    </FilterStateContext.Provider>
  )
}

const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`
