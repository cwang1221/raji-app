import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export function ErrorPage() {
  const { t } = useTranslation()
  return (
    <Container>
      <Content as={Typography.Title}>{t('generalMsg.errorPage')}</Content>
    </Container>
  )
}

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <Container>
      <Content as={Typography.Title}>{t('generalMsg.notFoundPage')}</Content>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
`

const Content = styled.div`
  position: relative;
  top: 50%;
  text-align: center;
  margin-top: -10rem !important;
`
