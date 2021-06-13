import { Typography } from 'antd'
import styled from 'styled-components'

export function StoryContainer({ title, children, countOfStories, countOfContainers }) {
  return (
    <Container countOfContainers={countOfContainers} className={countOfStories === 0 && 'emptyContainer'}>
      <Typography.Title level={5} className={countOfStories === 0 && 'rotateTitle'}>{title}</Typography.Title>
      {children}
    </Container>
  )
}

const Container = styled.div`
  width: calc(100% / ${(props) => props.countOfContainers});
  min-width: 180px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  &.emptyContainer {
    width: 3rem;
    min-width: 3rem;
  }

  & .rotateTitle {
    white-space: nowrap;
    transform-origin: 0 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
    margin-left: 1rem;
  }
`
