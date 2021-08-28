import { Layout, List, Avatar, Dropdown, Card, Button } from 'antd'
import { HomeOutlined, ReadOutlined, FlagOutlined, EnvironmentOutlined, RocketOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import logo from '../../assets/images/logoWhite.png'
import { useAuth } from '../../contexts/authContext'
import { MyCard } from '../../components'

export function SideMenu() {
  const history = useHistory()
  const { user, setUser } = useAuth()
  const { t } = useTranslation()
  const [menuSelectedKey, setMenuSelectedKey] = useState('dashboard')
  const location = useLocation()

  useEffect(() => {
    setMenuSelectedKey(location.pathname.substr(1))
  }, [location])

  const onLogout = () => {
    setUser({})
    history.push('/signIn')
  }

  return (
    <Layout.Sider collapsed>
      <Container>
        <div>
          <Logo shape="square" size={40} src={logo} />
          <SideList>
            <Link to="/home">
              <Item $selected={menuSelectedKey === 'home'}>
                <ItemIcon $selected={menuSelectedKey === 'home'}>
                  <HomeOutlined className="icon" />
                </ItemIcon>
                {t('sideMenu.home')}
              </Item>
            </Link>
            <Link to="/stories">
              <Item $selected={menuSelectedKey === 'stories'}>
                <ItemIcon $selected={menuSelectedKey === 'stories'}>
                  <ReadOutlined className="icon" />
                </ItemIcon>
                {t('sideMenu.stories')}
              </Item>
            </Link>
            <Link to="/epics">
              <Item $selected={menuSelectedKey === 'epics'}>
                <ItemIcon $selected={menuSelectedKey === 'epics'}>
                  <FlagOutlined className="icon" />
                </ItemIcon>
                {t('sideMenu.epics')}
              </Item>
            </Link>
            <Link to="/milestones">
              <Item $selected={menuSelectedKey === 'milestones'}>
                <ItemIcon $selected={menuSelectedKey === 'milestones'}>
                  <EnvironmentOutlined className="icon" />
                </ItemIcon>
                {t('sideMenu.milestones')}
              </Item>
            </Link>
            <Link to="/projects">
              <Item $selected={menuSelectedKey === 'projects'}>
                <ItemIcon $selected={menuSelectedKey === 'projects'}>
                  <RocketOutlined className="icon" />
                </ItemIcon>
                {t('sideMenu.projects')}
              </Item>
            </Link>
          </SideList>
        </div>
        <Dropdown
          trigger={['click']}
          arrow
          overlay={(
            <div>
              <MyCard
                actions={[
                  <Link to="/settings">
                    <Button type="text">{t('header.setting')}</Button>
                  </Link>,
                  <Button type="text" onClick={onLogout}>{t('header.signOut')}</Button>
                ]}
              >
                <Card.Meta
                  avatar={<Avatar src={user.avatar} />}
                  title={user.username}
                  description={user.email}
                />
              </MyCard>
            </div>
          )}
        >
          <Item className="h-20 cursor-pointer">
            <Avatar size="large" src={user.avatar} />
          </Item>
        </Dropdown>
      </Container>
    </Layout.Sider>
  )
}

const Container = tw.div`
  flex
  flex-col
  justify-between
  h-full
  bg-gray-800
`

const SideList = tw(List)`
  pt-10
`

const Logo = tw(Avatar)`
  ml-4
  mt-4
`

const Item = tw.div`
  flex
  flex-col
  items-center
  justify-center
  pt-4
  pb-2
  font-bold
  text-xs

  group

  hover:text-white

  ${({ $selected }) => ($selected ? 'bg-gray-900 text-white border-l-4 border-purple-700'
    : 'text-gray-300 hover:bg-gray-700')}
`
const ItemIcon = tw.div`
  text-2xl
  transform
  transition-transform

  group-hover:text-white
  group-hover:scale-125
`
