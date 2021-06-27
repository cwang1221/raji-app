import { Row, Dropdown } from 'antd'
import styled from 'styled-components'
import { MyCard } from '..'

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
          <ColorDropDownContainer style={{ width: '131px' }}>
            {colors.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {row.map((colorCode) => (
                  <ColorBlock
                    key={colorCode}
                    color={colorCode}
                    className={color.toLowerCase() === colorCode.toLowerCase() ? 'selected' : undefined}
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

const ColorBlock = styled.div`
  width: 20px;
  height: 20px;
  margin: 4px;
  background-color: ${(props) => props.color};
  
  &:hover {
    margin: 2px;
    width: 24px;
    height: 24px;
    border: white solid 2px;
    outline: #DCDCDC solid 1px;
    cursor: pointer;
  }

  &.selected {
    margin: 2px;
    width: 24px;
    height: 24px;
    border: white solid 2px;
    outline: darkgray solid 1px;
  }
`

const ColorDropDownContainer = styled(MyCard)`
  & .ant-card-body {
    padding: 0.5rem;
  }
`
