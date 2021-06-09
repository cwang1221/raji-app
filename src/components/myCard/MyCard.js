import { Card } from 'antd'
import styled from 'styled-components'

export function MyCard(props = {}) {
  return (
    <ShadowCard {...props} />
  )
}

const ShadowCard = styled(Card)`
  box-shadow: 1px 2px 2px #DCDCDC;
`
