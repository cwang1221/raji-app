import { Typography } from 'antd'
import styled from 'styled-components'
import { EpicStateIcon } from '../../components'

export function DoneItem({ name }) {
  return (
    <Container>
      <Title>
        <EpicStateIcon state="done" />
        <Typography.Title level={4} style={{ marginBottom: '0', marginLeft: '0.5rem' }}>{name}</Typography.Title>
      </Title>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-shadow: 3px 5px 5px #DCDCDC;
  border-bottom: 1px lightgray solid;
  background-color: white;

  &:hover {
    transform: translate(-1px,-1px);
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
`
