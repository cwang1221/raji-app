import { Typography } from 'antd'
import { RadioGroupButton } from './RadioGroupButton'
import { Seperator } from './Seperator'
import styles from './FilterItem.module.css'

export function FilterItemBase({ name, children }) {
  return (
    <div className={styles.container}>
      <Typography.Text type="secondary" className={styles.title}>{name.toUpperCase()}</Typography.Text>
      {children}
    </div>
  )
}

export const FilterItem = {
  RadioGroupButton,
  Seperator
}
