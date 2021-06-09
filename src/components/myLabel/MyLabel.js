import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export function MyLabel({ children, required = false }) {
  const { t } = useTranslation()
  return (
    <>
      <Typography.Text>{children}</Typography.Text>
      {!required && <Optional>{t('general.optional')}</Optional>}
    </>
  )
}

const Optional = styled(Typography.Text)`
  margin-left: 0.5rem;
  font-weight: 400;
  color: gray;
  font-style: italic;
`
