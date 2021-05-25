import { Typography } from 'antd'
import { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { FilterBar, FilterItem } from '../../components'

export function TestPage() {
  const [fruit, setFruit] = useState('Apple')
  const [vegetable, setVegetable] = useState('Tomato')
  const [people, setPeople] = useState(['5'])

  return (
    <div style={{ padding: '2rem' }}>
      <Typography.Title level={3}>Test Page</Typography.Title>
      <FilterBar>
        <FilterItem.RadioGroupButton
          name="Fruit"
          items={[
            { text: 'Apple', key: 'Apple' },
            { text: 'Pear', key: 'Pear' }
          ]}
          value={fruit}
          onChange={setFruit}
        />
        <FilterItem.RadioGroupButton
          name="Vegetable"
          items={[
            { text: 'Potato', key: 'Potato' },
            { text: 'Tomato', key: 'Tomato' }
          ]}
          value={vegetable}
          onChange={setVegetable}
        />
        <FilterItem.Seperator />
        <FilterItem.MultiSelect
          name="People"
          icon={<UserOutlined />}
          items={[
            { text: 'AAAAAA', key: '1' },
            { text: 'BBBBBB', key: '2' },
            { text: 'CCCCCC', key: '3' },
            { text: 'DDDDDD', key: '4' },
            { text: '12345678901234567890', key: '5' },
            { text: 'FFFFFF', key: '6' },
            { text: 'GGGGGG', key: '7' }
          ]}
          value={people}
          onChange={setPeople}
        />
      </FilterBar>
    </div>
  )
}
