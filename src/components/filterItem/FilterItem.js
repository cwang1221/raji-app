import { Typography } from 'antd'
import tw from 'tailwind-styled-components'

export function FilterItemBase({ name, children }) {
  return (
    <Container>
      <Label type="secondary">{name.toUpperCase()}</Label>
      {children}
    </Container>
  )
}

const Container = tw.div`
  flex
  flex-col
`
const Label = tw(Typography.Text)`
  mb-1
`
