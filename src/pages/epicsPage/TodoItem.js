import { useState } from 'react'
import tw from 'tailwind-styled-components'
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

const Container = tw.div`
  flex
  flex-col
  rounded-md
  bg-white
  shadow-md
  mb-4
  p-4
  transform
  transition-transform

  hover:-translate-x-0.5
  hover:-translate-y-0.5
`
