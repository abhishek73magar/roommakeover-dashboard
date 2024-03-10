import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const updateAdminFormSchema = z.object({
  // id: z.union([z.string(), z.number()]).optional(),
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().nullable(),
  cpassword: z.string(),
  status: z.union([z.string(), z.number()])
}).passthrough().refine((data) => {
  if(data.password !== null && data.password !== ''){ return data.password === data.cpassword  }
  return true;
},{ message: "Password and confirm password doesn't match", path: ['cpassword']})

export const addAdminFormSchema = z.object({
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(5),
  cpassword: z.string(),
  status: z.union([z.string(), z.number()])
}).passthrough().refine(
  (data) => data.password === data.cpassword 
,{ message: "Password and confirm password doesn't match", path: ['cpassword']})