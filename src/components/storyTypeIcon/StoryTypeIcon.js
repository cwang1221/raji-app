import { CompassFilled, BugFilled, ToolFilled } from '@ant-design/icons'
import { useRef } from 'react'

export function StoryTypeIcon({ type }) {
  const typeMappingRef = useRef({
    feature: <CompassFilled className="text-yellow-600" />,
    bug: <BugFilled className="text-red-700" />,
    chore: <ToolFilled className="text-gray-600" />
  })

  return typeMappingRef.current[type]
}
