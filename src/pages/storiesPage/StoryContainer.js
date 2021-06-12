import { Typography } from 'antd'
import styled from 'styled-components'

export function StoryContainer({ title, children }) {
  return (
    <Container>
      <Typography.Title level={5}>{title}</Typography.Title>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`
