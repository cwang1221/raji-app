import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export function BacklogHeader({ countOfEpics }) {
  const { t } = useTranslation()
  return (
    <Card.Grid hoverable={false} style={{ width: '100%', padding: '1.2rem' }}>
      <Typography.Title level={4}>{t('milestones.backlog')}</Typography.Title>
      <Typography.Text>{t('milestones.backlogDescription', { count: countOfEpics })}</Typography.Text>
    </Card.Grid>
  )
}
