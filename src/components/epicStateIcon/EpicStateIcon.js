import { FlagFilled, FlagOutlined, CheckCircleOutlined } from '@ant-design/icons'

const stateMapping = {
  todo: <FlagOutlined className="text-purple-700" />,
  inProgress: <FlagFilled className="text-purple-700" />,
  done: <CheckCircleOutlined className="text-green-500" />
}

export function EpicStateIcon({ state }) {
  return stateMapping[state]
}
