import { CaretDownFilled } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import tw from 'tailwind-styled-components'
import { MyCard } from '../../components'

export function ViewOptionFilter({ description, viewOptions, selectedViewOption, onViewOptionChange }) {
  const Popup = () => (
    <div>
      <MyCard className="w-80 p-2">
        <span>{description}</span>
        <Menu multiple selectedKeys={[selectedViewOption]} onSelect={(e) => onViewOptionChange(e.key)} className="border-r-0">
          {Object.keys(viewOptions).map((key) => (
            <Menu.Item key={key} className="py-0">
              <div className="flex flex-col">
                <Title>{viewOptions[key].title}</Title>
                <Description>{viewOptions[key].description}</Description>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </MyCard>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Button size="small" className="ml-2">
        {viewOptions[selectedViewOption].title}
        <CaretDownFilled />
      </Button>
    </Dropdown>
  )
}

const Title = tw.div`
  h-4
  -mt-2
  font-medium
`

const Description = tw.div`
  text-xs
  mt-3
  text-gray-500
`
