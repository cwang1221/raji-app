import { Layout, Avatar, Button, Input, Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logo from '../../../assets/images/logoSquareTransparent.png'
import { useLanguageContext } from '../../../contexts/languageContext'
import { UserButton } from './UserButton'

export function Header() {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguageContext()

  return (
    <HeaderBar as={Layout.Header}>
      <HeaderGroup>
        <Avatar shape="square" size={48} src={logo} />
        <CreateButton as={Button} type="primary">{t('header.createStory')}</CreateButton>
        <Search as={Input.Search} placeholder={t('header.searchPlaceholder')} />
      </HeaderGroup>
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
          <Button size="large" type="primary" icon={<TranslationOutlined />} shape="circle" />
        </Dropdown>
        <UserButton />
      </HeaderGroup>
    </HeaderBar>
  )
}
const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(40, 28, 54) !important;
`

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
`

const CreateButton = styled.div`
  margin-left: 2rem !important;
  background-color: rgb(12, 179, 79) !important;
`

const Search = styled.div`
  margin-left: 2rem !important;
  width: 20rem !important;
`
