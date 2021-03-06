import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

export function BacklogHeader({ countOfEpics }) {
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <Typography.Title level={4}>{t('milestone.backlog')}</Typography.Title>
      <Typography.Text>{t('milestone.backlogDescription', { count: countOfEpics })}</Typography.Text>
    </div>
  )
}
