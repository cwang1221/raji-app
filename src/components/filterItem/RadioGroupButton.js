import { Radio } from 'antd'
import { FilterItemBase } from './FilterItem'

export function RadioGroupButton({ name, items, value, defaultValue, onChange }) {
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
        defaultValue={defaultValue}
        optionType="button"
        buttonStyle="solid"
      />
    </FilterItemBase>
  )
}
