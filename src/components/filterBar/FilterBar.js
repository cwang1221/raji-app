import { Button, Space } from 'antd'
import { StopOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export function FilterBar({ children,  }) {
  const { t } = useTranslation()

  const clearFilters = () => {
    children.forEach((child) => {
      const childDefaultValue = child.props.defaultValue
      if (child.type.name !== 'Seperator' && childDefaultValue) {
        child.props.onChange(childDefaultValue)
      }
    })
  }

  return (
    <div>
      <Space align="end" style={{ marginBottom: '1rem' }}>
        {children}
        <Button onClick={clearFilters}><StopOutlined style={{ color: 'darkred' }} />{t('filterBar.clearFilters')}</Button>
      </Space>
    </div>
  )
}
