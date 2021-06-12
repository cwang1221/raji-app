export const eventBus = {
  events: {},
  subscribe(event, callback) {
    this.events[event] = this.events[event] || []
    this.events[event].push(callback)
  },
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => {
        fn(data)
      })
    }
  },
  unsubscribe(event, callback) {
    if (this.events[event]) {
      for (let i = 0; i < this.events[event].length; i++) {
        if (this.events[event][i] === callback) {
          this.events[event].splice(i, 1)
          break
        }
      }
    }
  }
}

export const events = {
  setCreateButton: 'SET_CREATE_BUTTON',
  projectCreated: 'PROJECT_CREATED',
  storyCreated: 'STORY_CREATED',
  epicCreated: 'EPIC_CREATED',
  milestoneCreated: 'MILESTONE_CREATED'
}
