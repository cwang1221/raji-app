import { BorderOutlined, CheckSquareFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import styled from 'styled-components'

export function CheckItem({ checked, color, children, onCheck, tooltip }) {
  return (
    <Tooltip title={tooltip}>
      <Container onClick={() => onCheck(!checked)}>
        {checked ? <CheckSquareFilled style={{ color, marginRight: '0.5rem' }} /> : <BorderOutlined style={{ color, marginRight: '0.5rem' }} />}
        {children}
      </Container>
    </Tooltip>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`
