import { Layout, Button, Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import styled from 'styled-components'
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
          <Button type="primary" icon={<TranslationOutlined />} shape="circle" />
        </Dropdown>
      </HeaderGroup>
    </HeaderBar>
  )
}
const HeaderBar = styled(Layout.Header)`
  height: 42px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  background-color: rgb(29, 29, 57) !important;
`

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
`
