import { Button } from 'antd'
import styled from 'styled-components'
import { ArrowRightOutlined } from '@ant-design/icons'

export function CreateButton({ text, onClick }) {
  return (
    <Container as={Button} type="primary" onClick={onClick}>
      {text}
      <ArrowRightOutlined className="icon" />
    </Container>
  )
}

const Container = styled.button`
  background-color: #13AE47;
  border-color: #13AE47;

  &:hover{
    background-color: #14B74B;
    border-color: #14B74B;
  }
  
  &:hover .icon{
    margin-left: 1rem;
  }
`
