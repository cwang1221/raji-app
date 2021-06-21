import { Typography } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { EpicStateIcon, CreateEpicModal } from '../../components'

export function DoneItem({ id, name }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Container>
      <Title>
        <EpicStateIcon state="done" />
        <EpicName level={4} onClick={() => setShowModal(true)}>{name}</EpicName>
      </Title>
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

const EpicName = styled(Typography.Title)`
  margin-bottom: 0 !important;
  margin-left: 0.5rem !important;

  &:hover {
    cursor: pointer;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
`
