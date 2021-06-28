import { FlagFilled, FlagOutlined, CheckCircleOutlined } from '@ant-design/icons'

const stateMapping = {
  todo: <FlagOutlined style={{ color: 'rgb(97, 39, 202)' }} />,
  inProgress: <FlagFilled style={{ color: 'rgb(97, 39, 202)' }} />,
  done: <CheckCircleOutlined style={{ color: '#009D4D' }} />
}

export function EpicStateIcon({ state }) {
  return stateMapping[state]
}
