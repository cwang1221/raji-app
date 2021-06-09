import { DoubleRightOutlined, FileOutlined, CheckOutlined } from '@ant-design/icons'
import { useRef } from 'react'

export function MilestoneStateIcon({ state }) {
  const stateMappingRef = useRef({
    todo: <FileOutlined style={{ color: '#c9a61d' }} />,
    inProgress: <DoubleRightOutlined style={{ color: '#009D4D' }} />,
    done: <CheckOutlined style={{ color: '#009D4D' }} />
  })

  return stateMappingRef.current[state]
}
