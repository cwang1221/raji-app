import { Button } from 'antd'
import tw from 'tailwind-styled-components'
import { ArrowRightOutlined } from '@ant-design/icons'

export function CreateButton({ text, onClick }) {
  return (
    <Container type="primary" size="large" onClick={onClick}>
      {text}
      <RightIcon className="icon" />
    </Container>
  )
}

const Container = tw(Button)`
  h-9
  flex
  items-center
  bg-green-500
  border-green-500
    
  hover:bg-green-600
  hover:border-green-600

  group
`

const RightIcon = tw(ArrowRightOutlined)`
  group-hover:ml-4
`
