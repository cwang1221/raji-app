import { Radio } from 'antd'
import { FilterItemBase } from './FilterItem'

export function RadioGroupButton({ name, items, value, onChange }) {
  const options = items.map((item) => ({
    label: item.text,
    value: item.key
  }))
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
