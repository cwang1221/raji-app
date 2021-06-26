import { Typography } from 'antd'
import styled from 'styled-components'
import { EpicStateIcon } from '../../components'

export function EpicTitle({ state, epicName, onClickName }) {
  return (
    <Title>
      <EpicStateIcon state={state} />
      <EpicName level={4} onClick={onClickName}>{epicName}</EpicName>
    </Title>
  )
}

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
