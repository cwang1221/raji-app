import { Layout } from 'antd'
import { Header } from './Header'
import { SideMenu } from './SideMenu'

export function MainLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <SideMenu />
        <Layout>
          <Layout.Content>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
