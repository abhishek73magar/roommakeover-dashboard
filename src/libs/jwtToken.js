import { jwtDecode } from "jwt-decode"
import moment from "moment"

export const AUTH_TOKEN = (name) => window.localStorage.getItem(name || 'authtoken') || null
export const SETAUTH_TOKEN = (data, name) => window.localStorage.setItem(name || 'authtoken', data)
export const REMOVEAUTH_TOKEN = (name) => window.localStorage.removeItem(name || 'authtoken')

export const DECODE_TOKEN = (token) => {
  try {
    const decode = jwtDecode(token || AUTH_TOKEN())
    const expire = decode.exp * 1000;
    if(moment().isAfter(expire)) throw "Expired Auth Token !"
    return decode;
  } catch (error) {
    return null
  }
}