import { mutate } from "swr"
import { fetchData, get, post, remove, update } from "./apiMethod"

const crud = (url) => ({
  get: (option) => get(url, option),
  getById: (id, option) => get(`${url}/${id}`, option),
  post: (data, option) => post(url, data, option),
  update: (data, option) => update(url, data, option),
  updateById: (id, data, option) => update(`${url}/${id}`, data, option),
  remove: (id, option) => remove(`${url}/${id}`, option),
  swrFetch: (id) => fetchData(`${url}${id ? `/${id}` : ""}`),
  swrFetchById: (id) => fetchData(`${url}/${id}`),
  mutate: (callback, revalidate) => mutate(url, callback, { revalidate })
})


export const categoryApi = { ...crud('/api/admin/category') }
export const productApi = { 
  ...crud('/api/admin/product'),
  getImage: (pid) => fetchData(`/api/admin/product/image/${pid}`),
  removeImage: (id) => remove(`/api/admin/product/image/${id}`) 
}
export const hobbieProductApi = { ...crud('/api/admin/hobbie-product') }
export const hobbieApi = { ...crud('/api/admin/hobbie') }
export const diyProductApi = { ...crud('/api/admin/diy-product') }
export const blogApi = { ...crud("/api/admin/blog") }
export const orderApi = { 
  ...crud('/api/admin/order'),
  statusUpdate: (id, data) => update(`/api/admin/order?order_id=${id}`, data) 
}

export const sliderApi = { ...crud('/api/admin/slider')}
export const adminApi = { 
  ...crud("/api/admin/admin"),
  login: (data, option) => post('/api/admin/login', data, option) 
}
export const customizationApi = { ...crud("/api/admin/customization-product") }
export const customerApi = { ...crud("/api/admin/customer")}
export const mediaApi = { ...crud('/api/admin/media')}

export const infoApi = {
  home: () => fetchData('/api/admin/info/home')
}

export const googleApi = {
  generateUrl: (data) => post('/api/admin/generate-auth-url', data) 
}

export const invoiceApi = { 
  ...crud('/api/admin/invoice'),
  mutateById: (invoice_id, callback) => mutate(`/api/admin/invoice/${invoice_id}`, callback, { revalidate: false }),
  order: (collection_id) => fetchData(`/api/admin/invoice/order/${collection_id}`),
  transaction: () => fetchData('/api/admin/transaction')
}

export const transactionApi = {
  ...crud('/api/admin/transaction'),
  invoice: (invoice_id) => fetchData(`/api/admin/transaction/invoice/${invoice_id}`),
  mutateById: (invoice_id, callback) => mutate(`/api/admin/transaction/invoice/${invoice_id}`, callback, { revalidate: false })
}