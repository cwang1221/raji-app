import { Typography } from 'antd'
import styled from 'styled-components'

export function AreaTitle({ title, count }) {
  return <Title level={5}>{`${title} (${count})`}</Title>
}

const Title = styled(Typography.Title)`
  color: gray !important;
`
