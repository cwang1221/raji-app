import { createContext, useContext, useState } from 'react'

const EventContext = createContext()

export function EventProvider({ children }) {
  const [storyCreatedEvent, setStoryCreatedEvent] = useState(0)
  const [storyDeletedEvent, setStoryDeletedEvent] = useState(0)
  const [storyUpdatedEvent, setStoryUpdatedEvent] = useState(0)
  const [epicCreatedEvent, setEpicCreatedEvent] = useState(0)
  const [epicDeletedEvent, setEpicDeletedEvent] = useState(0)
  const [epicUpdatedEvent, setEpicUpdatedEvent] = useState(0)
  const [milestoneCreatedEvent, setMilestoneCreatedEvent] = useState(0)
  const [milestoneDeletedEvent, setMilestoneDeletedEvent] = useState(0)
  const [milestoneUpdatedEvent, setMilestoneUpdatedEvent] = useState(0)
  const [projectCreatedEvent, setProjectCreatedEvent] = useState(0)
  const [projectDeletedEvent, setProjectDeletedEvent] = useState(0)
  const [projectUpdatedEvent, setProjectUpdatedEvent] = useState(0)

  const publishStoryCreatedEvent = () => setStoryCreatedEvent((prev) => ++prev)
  const publishStoryDeletedEvent = () => setStoryDeletedEvent((prev) => ++prev)
  const publishStoryUpdatedEvent = () => setStoryUpdatedEvent((prev) => ++prev)
  const publishEpicCreatedEvent = () => setEpicCreatedEvent((prev) => ++prev)
  const publishEpicDeletedEvent = () => setEpicDeletedEvent((prev) => ++prev)
  const publishEpicUpdatedEvent = () => setEpicUpdatedEvent((prev) => ++prev)
  const publishMilestoneCreatedEvent = () => setMilestoneCreatedEvent((prev) => ++prev)
  const publishMilestoneDeletedEvent = () => setMilestoneDeletedEvent((prev) => ++prev)
  const publishMilestoneUpdatedEvent = () => setMilestoneUpdatedEvent((prev) => ++prev)
  const publishProjectCreatedEvent = () => setProjectCreatedEvent((prev) => ++prev)
  const publishProjectDeletedEvent = () => setProjectDeletedEvent((prev) => ++prev)
  const publishProjectUpdatedEvent = () => setProjectUpdatedEvent((prev) => ++prev)

  return (
    <EventContext.Provider value={{
      storyCreatedEvent,
      storyDeletedEvent,
      storyUpdatedEvent,
      epicCreatedEvent,
      epicDeletedEvent,
      epicUpdatedEvent,
      milestoneCreatedEvent,
      milestoneDeletedEvent,
      milestoneUpdatedEvent,
      projectCreatedEvent,
      projectDeletedEvent,
      projectUpdatedEvent,
      publishStoryCreatedEvent,
      publishStoryDeletedEvent,
      publishStoryUpdatedEvent,
      publishEpicCreatedEvent,
      publishEpicDeletedEvent,
      publishEpicUpdatedEvent,
      publishMilestoneCreatedEvent,
      publishMilestoneDeletedEvent,
      publishMilestoneUpdatedEvent,
      publishProjectCreatedEvent,
      publishProjectDeletedEvent,
      publishProjectUpdatedEvent
    }}
    >
      {children}
    </EventContext.Provider>
  )
}

export const useEventContext = () => useContext(EventContext)
