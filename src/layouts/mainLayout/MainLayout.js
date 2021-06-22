import { Layout } from 'antd'
import { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './Header'
import { HeaderCreateButton } from './HeaderCreateButton'
import { MeetingTimer } from './MeetingTimer'
import { SideMenu } from './SideMenu'

let timeInterval

function MainLayout({ children }) {
  const [redHeader, setRedHeader] = useState(false)

  const onTimeout = () => {
    timeInterval = setInterval(() => {
      setRedHeader((prev) => !prev)
    }, 1000)
  }

  const clearTimeout = () => {
    setRedHeader(false)
    clearInterval(timeInterval)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <SideMenu />
      <Layout>
        <Header />
        <div style={{ backgroundColor: 'rgb(29, 29, 57)' }}>
          <SubHeader redHeader={redHeader}>
            <HeaderCreateButton />
            <MeetingTimer
              onTimeout={onTimeout}
              clearTimeout={clearTimeout}
            />
          </SubHeader>
        </div>
        <Content>
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

const Content = styled(Layout.Content)`
  background-color: rgb(238, 238, 238);
  padding: 1rem 2rem;
  overflow: auto;
`

const SubHeader = styled.div`
  display: flex;
  background-color: ${(props) => (props.redHeader ? 'red' : 'white')};
  width: 100%;
  height: 64px;
  border-bottom: 1px #DCDCDC solid;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 10px 0 0 0;
  justify-content: space-between;
`
