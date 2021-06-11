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

export const useProject = () => ({ getProjects, getProjectList, putProject, postProject, deleteProject })

//----------------------------------------------------------
// Milestone
//----------------------------------------------------------
const getMilestonesList = async (states, projectIds) => {
  let url = '/milestones/ui/list'

  const queryStrings = []
  states && !states.includes('all') && queryStrings.push(`state=${states.join(',')}`)
  projectIds && !projectIds.includes('all') && queryStrings.push(`projectId=${projectIds.join(',')}`)

  queryStrings.length > 0 && (url += `?${queryStrings.join('&')}`)

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

export const useMilestone = () => ({ getMilestonesList, putMilestone })

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

export const useEpic = () => ({ getEpics })

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
const postStory = async (payload) => {
  const { data } = await axios.request({
    url: '/stories',
    method: 'post',
    data: payload
  })
  return data
}

export const useStory = () => ({ postStory })
