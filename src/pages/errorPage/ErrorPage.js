import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useDocumentTitle } from '../../hooks'

const ErrorPage = ({ title }) => {
  const { t } = useTranslation()
  useDocumentTitle(t('general.error'))
  return (
    <Container>
      <Content as={Typography.Title}>{title}</Content>
    </Container>
  )
}

export function ErrorBoundaryPage() {
  const { t } = useTranslation()
  return <ErrorPage title={t('generalMsg.errorBoundaryPage')} />
}

export function NotFoundPage() {
  const { t } = useTranslation()
  return <ErrorPage title={t('generalMsg.notFoundPage')} />
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
