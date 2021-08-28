import { Button } from 'antd'
import tw from 'tailwind-styled-components'
import { ArrowRightOutlined } from '@ant-design/icons'

export function CreateButton({ text, onClick }) {
  return (
    <Container type="primary" size="large" onClick={onClick}>
      {text}
      <RightIcon />
    </Container>
  )
}

const Container = tw(Button)`
  bg-green-500
  border-0
    
  hover:bg-green-600

  group
`

const RightIcon = tw(ArrowRightOutlined)`
  group-hover:ml-4
`
