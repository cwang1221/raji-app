import { Button } from 'antd'
import styled from 'styled-components'
import { ArrowRightOutlined } from '@ant-design/icons'

export function CreateButton({ text, onClick }) {
  return (
    <Container as={Button} type="primary" size="large" onClick={onClick}>
      {text}
      <ArrowRightOutlined className="icon" />
    </Container>
  )
}

const Container = styled.button`
  background: #13AE47 !important;
  border-color: #13AE47 !important;;
  height: 36px !important;
  padding-top: 4.4px !important;
  padding-bottom: 4.4px !important;

  &:hover{
    background: #14B74B !important;
    border-color: #14B74B !important;;
  }
  
  &:hover .icon{
    margin-left: 1rem;
  }
`
