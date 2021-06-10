import { CompassFilled, BugFilled, ToolFilled } from '@ant-design/icons'
import { useRef } from 'react'

export function StoryTypeIcon({ type }) {
  const typeMappingRef = useRef({
    feature: <CompassFilled style={{ color: 'rgb(201, 166, 29)' }} />,
    bug: <BugFilled style={{ color: 'rgb(160, 8, 8)' }} />,
    chore: <ToolFilled style={{ color: 'rgb(85, 85, 85)' }} />
  })

  return typeMappingRef.current[type]
}
