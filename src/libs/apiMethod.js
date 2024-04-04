import axios from './axios'
import swr from 'swr'

import { checkError } from './getError'
import { AUTH_TOKEN } from './jwtToken'


export const post = (url, data, option={}) => {
  return axios.post(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}` }, ...option}).catch((error) => Promise.reject(checkError(error)))
}

export const get = (url, option={}) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}` }, ...option}).catch(() => Promise.reject(checkError))
}

export const update = (url, data, option={}) => {
  return axios.patch(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}` }, ...option}).catch((error) => Promise.reject(checkError(error)))
}
export const put = (url, data, option={}) => {
  return axios.put(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}` }, ...option}).catch((error) => Promise.reject(checkError(error)))
}

export const remove = (url, option={}) => {
  return axios.delete(url, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}` }, ...option}).catch((error) => Promise.reject(checkError(error)))
}

export const fetchData = (url) => swr(url, (...args) => get(...args).then((res) => res.data), {
  revalidateOnFocus: false
})
