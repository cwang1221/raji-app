import { Typography } from 'antd'
import styled from 'styled-components'

export function FilterItemBase({ name, children }) {
  return (
    <Container>
      <Label type="secondary">{name.toUpperCase()}</Label>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled(Typography.Text)`
  margin-bottom: 0.2rem;
`
