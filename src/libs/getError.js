import toast from "react-hot-toast";

export const displayError = (error, path) => {
  if(error?.response){
    if(error.response.status === 401){
      toast.error(error.response.data.message)
      if(path !== 'login') window.location.reload(true)
      return;
    }
    if(typeof error.response.data === "object" ) { toast.error(JSON.stringify(error.response.data)) }
    else { toast.error(error.response.data) }
  } else {  toast.error(JSON.stringify(error.response.data)) }
}

export const getError = (error, path) => {
  if(error?.response){
    if(error.response.status === 401) { 
      if(path !== 'login') window.location.reload(true)
      return error.response.data.message 
    }
    if(typeof error.response.data === "object" ) { return JSON.stringify(error.response.data) }
    else return error.response.data
  } else { console.log(error); return error } 
}

export const checkError = (error, path) => {
  if(error?.response){
    if(error.response.status === 401 && path !== 'login') window.location.reload(true)
  } 
  return error
}