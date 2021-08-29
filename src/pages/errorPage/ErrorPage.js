import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'
import { useDocumentTitle } from '../../hooks'

const ErrorPage = ({ title }) => {
  const { t } = useTranslation()
  useDocumentTitle(t('general.error'))
  return (
    <div className="h-screen">
      <Content>{title}</Content>
    </div>
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

const Content = tw(Typography.Title)`
  relative
  top-1/2
  text-center
  -mt-40
`
