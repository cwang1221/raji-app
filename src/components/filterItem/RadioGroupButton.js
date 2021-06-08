import { Radio } from 'antd'
import { useEffect, useState } from 'react'
import { FilterItemBase } from './FilterItem'

export function RadioGroupButton({ name, items, value, onChange }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(items.map((item) => ({
      label: item.text,
      value: item.key
    })))
  }, [items])

  return (
    <FilterItemBase name={name}>
      <Radio.Group
        options={options}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </FilterItemBase>
  )
}
