import { Typography } from 'antd'
import styled from 'styled-components'
import { RadioGroupButton } from './RadioGroupButton'
import { Seperator } from './Seperator'
import { MultiSelect } from './MultiSelect'

export function FilterItemBase({ name, children }) {
  return (
    <Container>
      <Label type="secondary">{name.toUpperCase()}</Label>
      {children}
    </Container>
  )
}

export const FilterItem = {
  RadioGroupButton,
  Seperator,
  MultiSelect
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled(Typography.Text)`
  margin-bottom: 0.2rem;
`
