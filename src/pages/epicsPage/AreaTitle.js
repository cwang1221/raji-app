import { Typography } from 'antd'

export function AreaTitle({ title, count }) {
  return <Typography.Title level={5} style={{ color: 'gray' }}>{`${title} (${count})`}</Typography.Title>
}
