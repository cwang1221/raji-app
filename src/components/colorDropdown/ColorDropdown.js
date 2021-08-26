import { Dropdown } from 'antd'
import tw from 'tailwind-styled-components'

const colors = [
  ['#880000', '#CC0000', '#DD6E13', '#E2C534'],
  ['#37710C', '#54BA08', '#9DE061', '#CEEFAA'],
  ['#004C82', '#007CBD', '#08BBDF', '#7CDFCF'],
  ['#4E0380', '#AA44DD', '#E566A0', '#986030'],
  ['#AE9744', '#090909', '#888888', '#C0C0C0'],
  ['#3E1191', '#6515DD', '#8B78FA', '#FF5555'],
  ['#FBB81B', '#00D38C', '#A3C5EB', '#414042']
]

export function ColorDropdown({ color, onColorChange, children }) {
  return (
    <Dropdown
      overlay={(
        <div>
          <ColorDropDownContainer>
            {colors.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((colorCode) => (
                  <ColorBlock
                    key={colorCode}
                    style={{ backgroundColor: colorCode }}
                    $selected={color.toLowerCase() === colorCode.toLowerCase()}
                    onClick={() => onColorChange(colorCode)}
                  />
                ))}
              </Row>
            ))}
          </ColorDropDownContainer>
        </div>
      )}
      trigger={['click']}
    >
      {children}
    </Dropdown>
  )
}

const ColorDropDownContainer = tw.div`
  p-2
  bg-white
  rounded-md
  shadow-lg
  space-y-2
`

const Row = tw.div`
  flex
  flex-row
  space-x-2
`

const ColorBlock = tw.div`
  w-5
  h-5
  rounded-sm
  ring-offset-2
  cursor-pointer
  ring-gray-400
  ring-0

  ${({ $selected }) => $selected && 'ring-1 hover:ring-gray-600'}}

  hover:ring-gray-300
  hover:ring-1
`
