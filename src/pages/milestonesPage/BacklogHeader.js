import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export function BacklogHeader({ countOfEpics }) {
  const { t } = useTranslation()
  return (
    <div style={{ width: '100%' }}>
      <Typography.Title level={4}>{t('milestones.backlog')}</Typography.Title>
      <Typography.Text>{t('milestones.backlogDescription', { count: countOfEpics })}</Typography.Text>
    </div>
  )
}
