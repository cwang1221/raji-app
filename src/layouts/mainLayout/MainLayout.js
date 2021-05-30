import { Layout } from 'antd'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './header/Header'
import { SideMenu } from './SideMenu'

function MainLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <SideMenu />
        <Content as={Layout.Content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export function MainLayoutRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        document.cookie.includes('jwt=') ? (
          <MainLayout>
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
  padding: 1rem 2rem;
  overflow: scroll;
`
