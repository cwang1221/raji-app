import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import styled from 'styled-components'

export function FilterTitle({ expanded, title, onExpandedChange }) {
  return (
    <Container onClick={() => onExpandedChange(!expanded)}>
      {expanded ? <CaretDownFilled /> : <CaretRightFilled />}
      <span style={{ marginLeft: '0.5rem' }}>{title}</span>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    color: black;
  }
`
