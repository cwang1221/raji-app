import { DoubleRightOutlined, FileOutlined, CheckOutlined } from '@ant-design/icons'
import { useRef } from 'react'

export function MilestoneStateIcon({ state }) {
  const stateMappingRef = useRef({
    todo: <FileOutlined className="text-yellow-500" />,
    inProgress: <DoubleRightOutlined className="text-blue-500" />,
    done: <CheckOutlined className="text-green-600" />
  })

  return stateMappingRef.current[state]
}
