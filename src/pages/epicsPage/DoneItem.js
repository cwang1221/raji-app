import { useState } from 'react'
import tw from 'tailwind-styled-components'
import { CreateEpicModal } from '../../components'
import { EpicTitle } from './EpicTitle'

export function DoneItem({ id, name }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Container>
      <EpicTitle
        state="done"
        epicName={name}
        onClickName={() => setShowModal(true)}
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
  mb-4
  p-4
  shadow-md
  transform
  transition-transform

  hover:-translate-x-0.5
  hover:-translate-y-0.5
`
