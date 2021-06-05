import { Layout, List, Avatar, Dropdown, Card, Button } from 'antd'
import { HomeOutlined, ReadOutlined, FlagOutlined, BlockOutlined, RocketOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
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

  const UserPopup = () => (
    <UserCard
      as={MyCard}
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
    </UserCard>
  )

  return (
    <Layout.Sider collapsed>
      <Container>
        <div>
          <Logo as={Avatar} shape="square" size={40} src={logo} />
          <SideList as={List}>
            <Link to="/home">
              <Item className={menuSelectedKey === 'home' ? 'selected' : ''}>
                <HomeOutlined className="icon" />
                {t('sideMenu.home')}
              </Item>
            </Link>
            <Link to="/stories">
              <Item className={menuSelectedKey === 'stories' ? 'selected' : ''}>
                <ReadOutlined className="icon" />
                {t('sideMenu.stories')}
              </Item>
            </Link>
            <Link to="/epics">
              <Item className={menuSelectedKey === 'epics' ? 'selected' : ''}>
                <FlagOutlined className="icon" />
                {t('sideMenu.epics')}
              </Item>
            </Link>
            <Link to="/milestones">
              <Item className={menuSelectedKey === 'milestones' ? 'selected' : ''}>
                <BlockOutlined className="icon" />
                {t('sideMenu.milestones')}
              </Item>
            </Link>
            <Link to="/projects">
              <Item className={menuSelectedKey === 'projects' ? 'selected' : ''}>
                <RocketOutlined className="icon" />
                {t('sideMenu.projects')}
              </Item>
            </Link>
          </SideList>
        </div>
        <Dropdown
          trigger={['click']}
          arrow
          overlay={<UserPopup />}
        >
          <Item className={menuSelectedKey === 'settings' ? 'selected avatar' : 'avatar'}>
            <Avatar size="large" src={user.avatar} />
          </Item>
        </Dropdown>
      </Container>
    </Layout.Sider>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(29, 29, 57);
`

const SideList = styled.div`
  padding-top: 2.4rem !important;
`

const Logo = styled.div`
  margin-left: 1.3rem;
  margin-top: 1rem;
`

const Item = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(188, 188, 196);
  font-weight: 700;
  font-size: 12px;

  .icon {
    color: rgb(119, 119, 136);
    font-size: 1.5rem;
    transition: transform .2s;
  }

  &:hover {
    background-color: rgb(41, 41, 67);
    color: white;
  }

  &.selected {
    background-color: rgb(17, 17, 34);
    border-left: rgb(100, 20, 219) 3px solid;
    color: white;
  }

  &:hover.selected {
    background-color: rgb(17, 17, 34);
  }

  &.selected .icon {
    color: white;
  }

  &:hover .icon {
    color: white;
    transform: scale(1.2);
  }

  &.avatar {
    height: 84px;
  }

  &:hover.avatar {
    cursor: pointer;
  }
`

const UserCard = styled.div`
`
