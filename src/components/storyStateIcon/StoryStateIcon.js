import { DoubleRightOutlined, FileOutlined, CheckOutlined } from '@ant-design/icons'
import { useRef } from 'react'

export function StoryStateIcon({ state }) {
  const stateMappingRef = useRef({
    unscheduled: <FileOutlined className="text-yellow-500" />,
    readyForDevelopment: <FileOutlined className="text-yellow-500" />,
    inDevelopment: <DoubleRightOutlined className="text-blue-500" />,
    readyForReview: <DoubleRightOutlined className="text-blue-500" />,
    readyForDeploy: <DoubleRightOutlined className="text-blue-500" />,
    completed: <CheckOutlined className="text-green-600" />
  })

  return stateMappingRef.current[state]
}
