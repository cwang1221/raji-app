import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import tw from 'tailwind-styled-components'

export function MyLabel({ children, required = false }) {
  const { t } = useTranslation()
  return (
    <>
      <Typography.Text>{children}</Typography.Text>
      {!required && <Optional>{t('general.optional')}</Optional>}
    </>
  )
}

const Optional = tw(Typography.Text)`
  ml-2
  font-normal
  text-gray-500
  italic
`
