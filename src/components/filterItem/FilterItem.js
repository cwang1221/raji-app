import { Typography } from 'antd'
import styled from 'styled-components'
import { RadioGroupButton } from './RadioGroupButton'
import { Seperator } from './Seperator'
import { MultiSelect } from './MultiSelect'

export function FilterItemBase({ name, children }) {
  return (
    <Container>
      <Label as={Typography.Text} type="secondary">{name.toUpperCase()}</Label>
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
const Label = styled.div`
  margin-bottom: 0.2rem;
`
