import { get, post, remove, update } from "./apiMethod"
import fetchData from "./fetchData"

const crud = (url) => ({
  get: (option) => get(url, option),
  getById: (id, option) => get(`${url}/${id}`, option),
  post: (data, option) => post(url, data, option),
  update: (data, option) => update(url, data, option),
  updateById: (id, data, option) => update(`${url}/${id}`, data, option),
  remove: (id, option) => remove(`${url}/${id}`, option),
  swrFetch: (id) => fetchData(`${url}${id ? `/${id}` : ""}`),
  swrFetchById: (id) => fetchData(`${url}/${id}`)
})


export const categoryApi = { ...crud('/api/admin/category') }
export const productApi = { 
  ...crud('/api/admin/product'),
  getImage: (pid) => fetchData(`/api/admin/product/image/${pid}`) 
}
export const hobbieProductApi = { ...crud('/api/admin/hobbie-product') }
export const hobbieApi = { ...crud('/api/admin/hobbie') }
export const diyProductApi = { ...crud('/api/admin/diy-product') }
export const blogApi = { ...crud("/api/admin/blog") }
export const orderApi = { ...crud('/api/admin/order') }
export const sliderApi = { ...crud('/api/admin/slider')}
export const adminApi = { 
  ...crud("/api/admin/admin"),
  login: (data, option) => post('/api/admin/login', data, option) 
}
export const customizationApi = { ...crud("/api/admin/customization-product") }
export const customerApi = { ...crud("/api/admin/customer")}