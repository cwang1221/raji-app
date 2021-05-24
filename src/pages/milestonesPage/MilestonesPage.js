import { useTranslation } from 'react-i18next'
import { Typography } from 'antd'
import styles from './MilestonesPage.module.css'

export function MilestonesPage() {
  const { t } = useTranslation()
  return (
    <>
      <Typography.Title level={3}>{t('milestones.milestones')}</Typography.Title>
    </>
  )
}
