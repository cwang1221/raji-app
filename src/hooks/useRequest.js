import axios from '../libs/axios'

export const useProjects = async () => {
  const { data } = await axios.request({
    url: '/projects',
    method: 'get'
  })
  return data
}
