import { FlagFilled, FlagOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useRef } from 'react'

export function EpicStateIcon({ state }) {
  const stateMappingRef = useRef({
    todo: <FlagOutlined style={{ color: 'rgb(97, 39, 202)' }} />,
    inProgress: <FlagFilled style={{ color: 'rgb(97, 39, 202)' }} />,
    done: <CheckCircleOutlined style={{ color: '#009D4D' }} />
  })

  return stateMappingRef.current[state]
}