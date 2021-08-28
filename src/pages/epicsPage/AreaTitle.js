import { Typography } from 'antd'

export function AreaTitle({ title, count }) {
  return <Typography.Title level={5} className="text-gray-500">{`${title} (${count})`}</Typography.Title>
}
