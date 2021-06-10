import { DoubleRightOutlined, FileOutlined, CheckOutlined } from '@ant-design/icons'
import { useRef } from 'react'

export function StoryStateIcon({ state }) {
  const stateMappingRef = useRef({
    unscheduled: <FileOutlined style={{ color: '#c9a61d' }} />,
    readyForDevelopment: <FileOutlined style={{ color: '#c9a61d' }} />,
    inDevelopment: <DoubleRightOutlined style={{ color: '#009D4D' }} />,
    readyForReview: <DoubleRightOutlined style={{ color: '#009D4D' }} />,
    readyForDeploy: <DoubleRightOutlined style={{ color: '#009D4D' }} />,
    completed: <CheckOutlined style={{ color: '#009D4D' }} />
  })

  return stateMappingRef.current[state]
}
