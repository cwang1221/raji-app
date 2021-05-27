import axios from '../libs/axios'

export const useProjects = async () => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'get'
  })
  return data
}

export const useMilestones = async () => {
  const { data } = await axios.request({
    url: '/milestones',
    method: 'get'
  })
  return data
}

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
