import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const updateAdminFormSchema = z.object({
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string(),
  new_password: z.string().nullable(),
  cpassword: z.string(),
  status: z.union([z.string(), z.number()])
}).passthrough().refine(
  (data) =>  data.new_password === data.cpassword,
  { message: "New Password and confirm password doesn't match", path: ['cpassword']})

export const addAdminFormSchema = z.object({
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(5),
  cpassword: z.string(),
  status: z.union([z.string(), z.number()])
}).passthrough().refine(
  (data) => data.password === data.cpassword 
,{ message: "Password and confirm password doesn't match", path: ['cpassword']})


export const productFormSchema = z.object({
  title: z.string().min(1, { message: "Title must be required "}),
  price: z.number({ invalid_type_error: "Price must be number"}).min(1, { message: "Price must be required !"}),
  is_discount: z.boolean(),
  new_price: z.number().nullable(),
  quantity: z.number({ invalid_type_error: "Quntity must be number"}).min(1, { message: "Quntity must be required !"}).positive({ message: "Quntity must be positive number !"}),
  stock_status: z.enum(['1', '2', '3']),
  on_sale: z.enum(['0', '1']),
  // status: z.enum(['0', '1', '2']),
}).passthrough().refine(data => {
  if(data.is_discount === true) {
    return !isNaN(data.new_price) && Number(data.new_price)
  }
  return true
}, {message: "Discount price must be required and must be number", path: ['new_price']})


export const hobbieFormSchema = z.object({
  title: z.string().min(1, { message: "Required title"}),
  hobbie_id: z.union([ z.string().min(1, { message: "Required hobbie type"}), z.number().min(1, { message: 'Required hobbie type'})])
}).passthrough()

export const diyFormSchema = z.object({
  title: z.string().min(1, { message: "required title"})
}).passthrough()


export const blogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required !!"}),
  index: z.number({ invalid_type_error: "Index must be number"}),
  status: z.enum(['0', '1', '2'], { invalid_type_error: "Must be 0 (unpublished), 1 (published) or 2 (draft) "})
}).passthrough()

export const transactionFormSchema = z.object({
  transaction_code: z.string(),
  status: z.enum(['1', '0'], { invalid_type_error: "Status must be Complete or error"}),
  invoice_status: z.enum(['0', '1'], { invalid_type_error: "Invoice Status must be Paid or Unpaid" }),
  gateway: z.enum(['0', '1', '2', '3']),
  amount: z.number().min(1, { message: "Minimum amount is 1"})
})