import { Layout } from 'antd'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './Header'
import { SideMenu } from './SideMenu'

function MainLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <SideMenu />
      <Layout>
        <Header />
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
  background-color: rgb(238, 238, 238);
  padding: 1rem 2rem;
  overflow: scroll;
`
