import { Typography } from 'antd'
import { useState } from 'react'
import { FilterBar, FilterItem } from '../../components'

export function TestPage() {
  const [value1, setValue1] = useState('Apple')

  return (
    <div style={{ padding: '2rem' }}>
      <Typography.Title level={3}>Test Page</Typography.Title>
      <FilterBar>
        <FilterItem.RadioGroupButton
          name="abc"
          options={[
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' }
          ]}
          value={value1}
          onChange={(e) => { setValue1(e.target.value) }}
        />
        <FilterItem.Seperator />
        <FilterItem.RadioGroupButton
          name="abc"
          options={[
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' }
          ]}
          value={value1}
          onChange={(e) => { setValue1(e.target.value) }}
        />
      </FilterBar>
    </div>
  )
}
