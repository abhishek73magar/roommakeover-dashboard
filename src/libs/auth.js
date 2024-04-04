import { redirect } from "react-router-dom"
import { DECODE_TOKEN } from "./jwtToken"

export const auth = ({ request }) => {
  const { pathname } = new URL(request.url)
  const decode = DECODE_TOKEN()
  if(pathname === '/') return redirect('/home')
  if(decode) {
    if(pathname === '/login') return redirect('/home')
    return null;
  }

  if(pathname === '/login')return null

  return redirect('/login');
}