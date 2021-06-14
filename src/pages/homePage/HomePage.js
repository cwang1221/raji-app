import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHeaderCreateButtonContext } from '../../contexts/headerCreateButtonContext'
import { useAuth } from '../../contexts/authContext'
import { WorkArea } from './WorkArea'

export function HomePage() {
  const { t } = useTranslation()
  const { setHeaderCreateButtonType } = useHeaderCreateButtonContext()
  const [selectedViewOption, setSelectedViewOption] = useState('startedOnly')
  const { user } = useAuth()

  useEffect(() => {
    setHeaderCreateButtonType('story')
  }, [])

  return (
    <Container>
      <UserInfo>
        <Avatar src={user.avatar} size={40} />
        <UserTextInfo>
          <Typography.Title level={5} style={{ marginBottom: '0' }}>{user.username}</Typography.Title>
          <Typography.Text style={{ marginTop: '-4px', color: 'gray' }}>{user.email}</Typography.Text>
        </UserTextInfo>
      </UserInfo>
      <MainArea>
        <WorkArea
          title={t('home.myWork')}
          viewOptions={{
            startedOnly: {
              title: t('home.startedOnly'),
              description: t('home.startedOnlyDescription')
            },
            unfinishedOnly: {
              title: t('home.unfinishedOnly'),
              description: t('home.unfinishedOnlyDescription')
            },
            everything: {
              title: t('home.everything'),
              description: t('home.everythingDescription')
            }
          }}
          selectedViewOption={selectedViewOption}
          onViewOptionChange={setSelectedViewOption}
        />
      </MainArea>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const UserTextInfo = styled.div`
  display: flex;
  margin-left: 0.6rem;
  flex-direction: column;
`

const MainArea = styled.div`
  display: flex;
`
