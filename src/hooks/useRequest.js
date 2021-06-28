import axios from '../libs/axios'

//----------------------------------------------------------
// Project
//----------------------------------------------------------
const getProjects = async () => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'get'
  })
  return data
}

const getProject = async (id) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'get'
  })
  return data
}

const getProjectList = async () => {
  const { data } = await axios.request({
    url: '/projects/ui/list',
    method: 'get'
  })
  return data
}

const putProject = async (id, payload) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const postProject = async (payload) => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'post',
    data: payload
  })
  return data
}

const deleteProject = async (id) => {
  const { data } = await axios.request({
    url: `/projects/${id}`,
    method: 'delete'
  })
  return data
}

export const useProject = () => ({ getProjects, getProject, getProjectList, putProject, postProject, deleteProject })

//----------------------------------------------------------
// Milestone
//----------------------------------------------------------
const getMilestones = async () => {
  const { data } = await axios.request({
    url: '/milestones',
    method: 'get'
  })
  return data
}
const getMilestone = async (id) => {
  const { data } = await axios.request({
    url: `/milestones/${id}`,
    method: 'get'
  })
  return data
}

const getMilestonesList = async (states, projectIds) => {
  let url = '/milestones/ui/list'

  const queryStrings = []
  queryStrings.push(`state=${states.join(',')}`)
  queryStrings.push(`projectId=${projectIds.join(',')}`)

  url += `?${queryStrings.join('&')}`

  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}

const putMilestone = async (id, milestone) => {
  const { data } = await axios.request({
    url: `/milestones/${id}`,
    method: 'put',
    data: milestone
  })
  return data
}

const addEpic = async (id, epicId) => {
  const { data } = await axios.request({
    url: `/milestones/${id}/addEpic`,
    method: 'post',
    data: {
      epicId
    }
  })
  return data
}

const changeEpic = async (id, epicId) => {
  const { data } = await axios.request({
    url: `/milestones/${id}/changeEpic`,
    method: 'post',
    data: {
      epicId
    }
  })
  return data
}

const postMilestone = async (milestone) => {
  const { data } = await axios.request({
    url: '/milestones',
    method: 'post',
    data: milestone
  })
  return data
}

const deleteMilestone = async (id) => {
  const { data } = await axios.request({
    url: `/milestones/${id}`,
    method: 'delete'
  })
  return data
}

export const useMilestone = () => ({ getMilestonesList, getMilestone, putMilestone, getMilestones, addEpic, postMilestone, deleteMilestone, changeEpic })

//----------------------------------------------------------
// Setting
//----------------------------------------------------------
const getSetting = async () => {
  const { data } = await axios.request({
    url: '/settings',
    method: 'get'
  })
  return data
}

const putSetting = async (settings) => {
  const { data } = await axios.request({
    url: '/settings',
    method: 'put',
    data: settings
  })
  return data
}

export const useSetting = () => ({ getSetting, putSetting })

//----------------------------------------------------------
// Epic
//----------------------------------------------------------
const getEpics = async () => {
  const { data } = await axios.request({
    url: '/epics',
    method: 'get'
  })
  return data
}
const getEpic = async (id) => {
  const { data } = await axios.request({
    url: `/epics/${id}`,
    method: 'get'
  })
  return data
}

const getEpicsUiList = async (projectIds, milestoneIds, states) => {
  let url = '/epics/ui/list'

  const queryStrings = []
  queryStrings.push(`projectId=${projectIds.join(',')}`)
  queryStrings.push(`milestoneId=${milestoneIds.join(',')}`)
  queryStrings.push(`state=${states.join(',')}`)

  queryStrings.length > 0 && (url += `?${queryStrings.join('&')}`)

  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}

const postEpic = async (payload) => {
  const { data } = await axios.request({
    url: '/epics',
    method: 'post',
    data: payload
  })
  return data
}

const putEpic = async (id, payload) => {
  const { data } = await axios.request({
    url: `/epics/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

export const useEpic = () => ({ getEpics, getEpicsUiList, postEpic, putEpic, getEpic })

//----------------------------------------------------------
// User
//----------------------------------------------------------
const getUsers = async () => {
  const { data } = await axios.request({
    url: '/users',
    method: 'get'
  })
  return data
}

export const useUser = () => ({ getUsers })

//----------------------------------------------------------
// Story
//----------------------------------------------------------
const getStories = async () => {
  const { data } = await axios.request({
    url: '/stories',
    method: 'get'
  })
  return data
}

const getStory = async (id) => {
  const { data } = await axios.request({
    url: `/stories/${id}`,
    method: 'get'
  })
  return data
}

const getStoryUiList = async (projects, epics, states) => {
  if (projects.length === 0 || epics.length === 0 || states.length === 0) {
    return []
  }

  let url = '/stories/ui/list'
  const queryStrings = []
  queryStrings.push(`projectId=${projects.join(',')}`)
  queryStrings.push(`epicId=${epics.join(',')}`)
  queryStrings.push(`state=${states.join(',')}`)
  url += `?${queryStrings.join('&')}`

  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}

const postStory = async (payload) => {
  const { data } = await axios.request({
    url: '/stories',
    method: 'post',
    data: payload
  })
  return data
}

const putStory = async (id, payload) => {
  const { data } = await axios.request({
    url: `/stories/${id}`,
    method: 'put',
    data: payload
  })
  return data
}

const getMyStories = async (userId, viewOption) => {
  let states = ''
  switch (viewOption) {
    case 'startedOnly':
      states = '&state=inDevelopment,readyForReview,readyForDeploy'
      break
    case 'unfinishedOnly':
      states = '&state=unscheduled,readyForDevelopment,inDevelopment,readyForReview,readyForDeploy'
      break
    default:
      break
  }

  const { data } = await axios.request({
    url: `/stories/ui/list?ownerId=${userId}${states}`,
    method: 'get'
  })
  return data
}

export const useStory = () => ({ getStories, getStoryUiList, postStory, putStory, getMyStories, getStory })
