import { Card } from 'antd'
import styled from 'styled-components'

export function MyCard(props = {}) {
  return (
    <ShadowCard as={Card} {...props} />
  )
}

const ShadowCard = styled.div`
  box-shadow: 1px 2px 2px #DCDCDC;
`
