import { createContext, useContext, useState } from 'react'

const EventContext = createContext()

export function EventProvider({ children }) {
  const [storyCreatedEvent, setStoryCreatedEvent] = useState(0)
  const [storyDeletedEvent, setStoryDeletedEvent] = useState(0)
  const [epicCreatedEvent, setEpicCreatedEvent] = useState(0)
  const [epicDeletedEvent, setEpicDeletedEvent] = useState(0)
  const [milestoneCreatedEvent, setMilestoneCreatedEvent] = useState(0)
  const [milestoneDeletedEvent, setMilestoneDeletedEvent] = useState(0)
  const [projectCreatedEvent, setProjectCreatedEvent] = useState(0)
  const [projectDeletedEvent, setProjectDeletedEvent] = useState(0)

  const publishStoryCreatedEvent = () => setStoryCreatedEvent((prev) => ++prev)
  const publishStoryDeletedEvent = () => setStoryDeletedEvent((prev) => ++prev)
  const publishEpicCreatedEvent = () => setEpicCreatedEvent((prev) => ++prev)
  const publishEpicDeletedEvent = () => setEpicDeletedEvent((prev) => ++prev)
  const publishMilestoneCreatedEvent = () => setMilestoneCreatedEvent((prev) => ++prev)
  const publishMilestoneDeletedEvent = () => setMilestoneDeletedEvent((prev) => ++prev)
  const publishProjectCreatedEvent = () => setProjectCreatedEvent((prev) => ++prev)
  const publishProjectDeletedEvent = () => setProjectDeletedEvent((prev) => ++prev)

  return (
    <EventContext.Provider value={{
      storyCreatedEvent,
      storyDeletedEvent,
      epicCreatedEvent,
      epicDeletedEvent,
      milestoneCreatedEvent,
      milestoneDeletedEvent,
      projectCreatedEvent,
      projectDeletedEvent,
      publishStoryCreatedEvent,
      publishStoryDeletedEvent,
      publishEpicCreatedEvent,
      publishEpicDeletedEvent,
      publishMilestoneCreatedEvent,
      publishMilestoneDeletedEvent,
      publishProjectCreatedEvent,
      publishProjectDeletedEvent
    }}
    >
      {children}
    </EventContext.Provider>
  )
}

export const useEventContext = () => useContext(EventContext)
