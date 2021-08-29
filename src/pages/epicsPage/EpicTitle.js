import { Typography } from 'antd'
import { EpicStateIcon } from '../../components'

export function EpicTitle({ state, epicName, onClickName }) {
  return (
    <div className="flex items-center">
      <EpicStateIcon state={state} />
      <Typography.Title
        level={4}
        onClick={onClickName}
        className="mb-0 ml-2 cursor-pointer"
      >
        {epicName}
      </Typography.Title>
    </div>
  )
}
