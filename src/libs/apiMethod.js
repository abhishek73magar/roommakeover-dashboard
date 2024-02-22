import axios from './axios'
import { checkError } from './getError'

export const post = (url, data, option) => {
  return axios.post(url, data, option).catch((error) => Promise.reject(checkError(error)))
}

export const get = (url, option) => {
  return axios.get(url, option).catch(() => Promise.reject(checkError))
}

export const update = (url, data, option) => {
  return axios.patch(url, data, option).catch((error) => Promise.reject(checkError(error)))
}
export const put = (url, data, option) => {
  return axios.put(url, data, option).catch((error) => Promise.reject(checkError(error)))
}

export const remove = (url, option) => {
  return axios.delete(url, option).catch((error) => Promise.reject(checkError(error)))
}
