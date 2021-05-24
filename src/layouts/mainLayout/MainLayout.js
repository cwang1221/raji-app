import { Layout } from 'antd'
import { Redirect, Route } from 'react-router-dom'
import { Header } from './header/Header'
import { SideMenu } from './SideMenu'

function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh', height: '100%' }}>
      <Header />
      <Layout>
        <SideMenu />
        <Layout>
          <Layout.Content style={{ padding: '1rem 2rem' }}>
            {children}
          </Layout.Content>
        </Layout>
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
