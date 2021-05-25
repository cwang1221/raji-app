import { Radio } from 'antd'
import { FilterItemBase } from './FilterItem'

export function RadioGroupButton({ name, options, value, onChange }) {
  return (
    <FilterItemBase name={name}>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </FilterItemBase>
  )
}
