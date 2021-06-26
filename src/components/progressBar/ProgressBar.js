import { Progress, Typography, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

export function ProgressBar({ countOfStories, countOfDoneStories, countOfInProgressStories }) {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ marginTop: '0.5rem', marginBottom: '-0.5rem' }}>
        <Typography.Text strong>{t('epic.percentage', {
          completed: countOfStories ? Math.round((countOfDoneStories / countOfStories) * 100) : 0,
          inProgress: countOfStories ? Math.round((countOfInProgressStories / countOfStories) * 100) : 0
        })}
        </Typography.Text>
      </div>
      <Tooltip title={`${t('milestone.total')}: ${countOfStories}, ${t('milestone.inProgress')}: ${countOfInProgressStories}, ${t('milestone.done')}: ${countOfDoneStories}`}>
        <Progress
          percent={((countOfInProgressStories + countOfDoneStories) / countOfStories) * 100}
          success={{ percent: (countOfDoneStories / countOfStories) * 100 }}
          showInfo={false}
          trailColor="#D9EAF0"
        />
      </Tooltip>
    </>
  )
}
