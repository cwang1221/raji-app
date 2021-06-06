import { Layout } from 'antd'
import { useTranslation } from 'react-i18next'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { CreateButton } from '../../components'
import { Header } from './Header'
import { SideMenu } from './SideMenu'

function MainLayout({ children, headerCreateType }) {
  const { t } = useTranslation()

  let createButtonText
  switch (headerCreateType) {
    case 'story':
      createButtonText = t('header.createStory')
      break
    case 'epic':
      createButtonText = t('header.createEpic')
      break
    case 'milestone':
      createButtonText = t('header.createMilestone')
      break
    case 'project':
      createButtonText = t('header.createProject')
      break
    default:
      break
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <SideMenu />
      <Layout>
        <Header />
        <div style={{ backgroundColor: 'rgb(29, 29, 57)' }}>
          <SubHeader>
            <CreateButton text={createButtonText} />
          </SubHeader>
        </div>
        <Content as={Layout.Content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export function MainLayoutRoute({ component: Component, headerCreateType, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        document.cookie.includes('jwt=') ? (
          <MainLayout headerCreateType={headerCreateType}>
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect to="/signIn" />
        )
      )}
    />
  )
}

const Content = styled.div`
  background-color: rgb(238, 238, 238);
  padding: 1rem 2rem;
  overflow: auto;
`

const SubHeader = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  height: 64px;
  border-bottom: 1px #DCDCDC solid;
  align-items: center;
  padding-left: 1rem;
  border-radius: 10px 0 0 0;
`
