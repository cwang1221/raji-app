import { Layout, Button, Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import tw from 'tailwind-styled-components'
import { useLanguageContext } from '../../contexts/languageContext'

export function Header() {
  const { language, changeLanguage } = useLanguageContext()

  return (
    <HeaderBar>
      <HeaderGroup>
        <Dropdown
          placement="bottomRight"
          overlay={(
            <Menu selectedKeys={language} onClick={(e) => changeLanguage(e.key)}>
              <Menu.Item key="en"> English </Menu.Item>
              <Menu.Item key="zh"> 简体中文 </Menu.Item>
            </Menu>
          )}
        >
          <Button icon={<TranslationOutlined />} shape="circle" />
        </Dropdown>
      </HeaderGroup>
    </HeaderBar>
  )
}

const HeaderBar = tw(Layout.Header)`
  flex
  items-center
  flex-row-reverse
  justify-between
  h-11
  bg-gray-800
`

const HeaderGroup = tw.div`
  flex
  items-center
`
