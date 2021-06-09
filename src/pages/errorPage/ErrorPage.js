import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useDocumentTitle } from '../../hooks'

const ErrorPage = ({ title }) => {
  const { t } = useTranslation()
  useDocumentTitle(t('general.error'))
  return (
    <Container>
      <Content>{title}</Content>
    </Container>
  )
}

export function ErrorBoundaryPage() {
  const { t } = useTranslation()
  return <ErrorPage title={t('msg.errorBoundaryPage')} />
}

export function NotFoundPage() {
  const { t } = useTranslation()
  return <ErrorPage title={t('msg.notFoundPage')} />
}

const Container = styled.div`
  height: 100vh;
`

const Content = styled(Typography.Title)`
  position: relative;
  top: 50%;
  text-align: center;
  margin-top: -10rem !important;
`
