import { CaretDownFilled } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import { MyCard } from '../../components'

export function ViewOptionFilter({ description, viewOptions, selectedViewOption, onViewOptionChange }) {
  const Popup = () => (
    <div>
      <FilterPopup>
        <span style={{ fontSize: '10px' }}>{description}</span>
        <Menu multiple selectedKeys={[selectedViewOption]} onSelect={(e) => onViewOptionChange(e.key)} style={{ borderRight: '0px' }}>
          {Object.keys(viewOptions).map((key) => (
            <ViewOptionItme key={key}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '13px', height: '1rem', marginTop: '-0.5rem' }}> {viewOptions[key].title}</div>
                <div style={{ fontSize: '11px', color: 'gray' }}> {viewOptions[key].description}</div>
              </div>
            </ViewOptionItme>
          ))}
        </Menu>
      </FilterPopup>
    </div>
  )

  return (
    <Dropdown overlay={Popup} trigger={['click']}>
      <Button size="small" style={{ marginLeft: '0.5rem' }}>
        {viewOptions[selectedViewOption].title}
        <CaretDownFilled />
      </Button>
    </Dropdown>
  )
}

const FilterPopup = styled(MyCard)`
  width: 18rem;
  padding: 0.5rem;

  & .ant-card-body {
    padding: 0;
  }
`

const ViewOptionItme = styled(Menu.Item)`
  padding-top: 0;
  padding-bottom: 0;
`
