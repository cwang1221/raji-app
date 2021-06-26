import { useState } from 'react'
import styled from 'styled-components'
import { CreateEpicModal, ProgressBar } from '../../components'
import { EpicTitle } from './EpicTitle'

export function TodoItem({ id, name, countOfStories, countOfInProgressStories, countOfDoneStories }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <Container>
      <EpicTitle
        state="todo"
        epicName={name}
        onClickName={() => setShowModal(true)}
      />
      <ProgressBar
        countOfStories={countOfStories}
        countOfInProgressStories={countOfInProgressStories}
        countOfDoneStories={countOfDoneStories}
      />
      <CreateEpicModal
        visible={showModal}
        close={() => setShowModal(false)}
        id={id}
      />
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
