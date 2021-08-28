import { Layout } from 'antd'
import { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import tw from 'tailwind-styled-components'
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
    <Layout className="h-screen">
      <SideMenu />
      <Layout>
        <Header />
        <div className="bg-gray-800">
          <SubHeader $redHeader={redHeader}>
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

const Content = tw(Layout.Content)`
  bg-gray-100
  py-4
  px-8
  overflow-auto
`

const SubHeader = tw.div`
  flex
  items-center
  justify-between
  w-full
  h-16
  ${({ $redHeader }) => ($redHeader ? 'bg-red-600' : 'bg-white')}
  border-b
  border-gray-300
  px-4
  rounded-tl-xl
`
