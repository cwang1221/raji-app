import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export function Welcome() {
  const { t } = useTranslation()
  return <Typography.Title> {t('welcome')}</Typography.Title>
}
