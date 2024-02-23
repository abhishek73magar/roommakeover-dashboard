import toast from "react-hot-toast";
import { REMOVEAUTH_TOKEN } from "./jwtToken";

const noRedirect = ['/api/admin/login']

export const displayError = (error) => {
  if(error?.response){
    if(typeof error.response.data === "object" ) { toast.error(JSON.stringify(error.response.data)) }
    else { toast.error(error.response.data) }
  } else {  toast.error(JSON.stringify(error)) }
}

export const getError = (error) => {
  if(error?.response){
    if(typeof error.response.data === "object" ) { return JSON.stringify(error.response.data) }
    else return error.response.data
  } else { console.log(error); return error } 
}

export const checkError = (error) => {
  console.log(error)
  if(error?.response){
    const { url } = error.response.config
    if(error.response.status === 401 && !noRedirect.includes(url)) {
      REMOVEAUTH_TOKEN()
      window.location.reload(true)
    }
  } 
  return error
}