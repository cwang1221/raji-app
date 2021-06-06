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

export const useProject = () => ({ getProjects, getProjectList, putProject })

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

export const useEpics = async (states) => {
  let url = '/epics'
  if (states && states.length !== 0 && states.length !== 4) {
    url += `?state=${states.join(',')}`
  }
  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}

export const useEpicList = async (states, projectIds) => {
  let url = '/epics/ui/list'

  const queryStrings = []
  states && states.length !== 0 && states.length !== 4 && queryStrings.push(`state=${states.join(',')}`)
  projectIds && projectIds.length !== 0 && projectIds.length !== 4 && queryStrings.push(`projectId=${projectIds.join(',')}`)

  queryStrings.length > 0 && (url += `?${queryStrings.join('&')}`)

  const { data } = await axios.request({
    url,
    method: 'get'
  })
  return data
}
