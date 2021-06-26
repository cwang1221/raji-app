import { NumberOutlined, FileTextOutlined, CoffeeOutlined, FlagOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

function Property({ tooltip, icon, number, hasRightMargin = true }) {
  return (
    <Tooltip title={tooltip}>
      {icon}
      <span style={{ marginLeft: '0.3rem', marginRight: hasRightMargin ? '1rem' : '0' }}>{number}</span>
    </Tooltip>
  )
}

export function IdProperty({ id, hasRightMargin = true }) {
  const { t } = useTranslation()

  return (
    <Property
      tooltip={`${t('general.id')}: ${id}`}
      icon={<NumberOutlined />}
      number={id}
      hasRightMargin={hasRightMargin}
    />
  )
}

export function StoryProperty({ countOfStories, hasRightMargin = true }) {
  const { t } = useTranslation()

  return (
    <Property
      tooltip={`${countOfStories} ${t('general.stories')}`}
      icon={<FileTextOutlined />}
      number={countOfStories}
      hasRightMargin={hasRightMargin}
    />
  )
}

export function PointProperty({ point, hasRightMargin = true }) {
  const { t } = useTranslation()

  return (
    <Property
      tooltip={`${point} ${t('general.points')}`}
      icon={<CoffeeOutlined />}
      number={point}
      hasRightMargin={hasRightMargin}
    />
  )
}

export function EpicProperty({ countOfEpics, hasRightMargin = true }) {
  const { t } = useTranslation()

  return (
    <Property
      tooltip={`${countOfEpics} ${t('general.epics')}`}
      icon={<FlagOutlined />}
      number={countOfEpics}
      hasRightMargin={hasRightMargin}
    />
  )
}
