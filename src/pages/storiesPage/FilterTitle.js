import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons'
import tw from 'tailwind-styled-components'

export function FilterTitle({ expanded, title, onExpandedChange }) {
  return (
    <Container onClick={() => onExpandedChange(!expanded)}>
      {expanded ? <CaretDownFilled /> : <CaretRightFilled />}
      <span className="ml-2">{title}</span>
    </Container>
  )
}

const Container = tw.div`
  flex
  items-center
  text-xs
  text-gray-500
  mt-2
  cursor-pointer

  hover:text-gray-900
`
