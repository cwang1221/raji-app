import tw from 'tailwind-styled-components'

export function MyCard(props = {}) {
  return (
    <ShadowCard {...props} />
  )
}

const ShadowCard = tw.div`
  bg-white
  p-2
  rounded-md
  shadow-md
`
