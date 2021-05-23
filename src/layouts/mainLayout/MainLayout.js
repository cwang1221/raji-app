import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import { Header } from './header/Header'
import { SideMenu } from './SideMenu'

function MainLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
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
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      )}
    />
  )
}
