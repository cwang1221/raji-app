import { Button, Space } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
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
              <StopOutlined className="text-red-600" />{t('filterBar.clearFilters')}
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

const Container = tw.div`
  mb-4
  flex
  justify-between
`
