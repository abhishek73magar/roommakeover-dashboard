import logo from 'assets/logo2.png'
import Mail from './Mail'
import Notification from './Notification'
import Chat from './Chat'
import Subnavbar from './Subnavbar'
import { twMerge } from 'tailwind-merge'
import { CiLogout } from "react-icons/ci";
import { REMOVEAUTH_TOKEN } from 'libs/jwtToken'

const commonClassName = 'mx-auto w-[95%] xl:w-[75%]'
const Navigation = () => {

  const __logOut = () => {
    REMOVEAUTH_TOKEN()
    return window.location.reload(true)
  }

  return (
    <header className='text-secondary no-print'>
      <nav className=" bg-primary py-2">
        <div className={twMerge(`flex flex-row gap-3 justify-between items-center`, commonClassName)}>
          <div className='w-[300px]'>
            <img src={logo} alt="logo" className="w-full h-full object-cover object-center" />
          </div>
          <div className='flex flex-row gap-5 justify-between items-center'>
            <Mail />
            <Notification />
            <Chat />
            <CiLogout className='text-xl text-white cursor-pointer hover:scale-110' title="Log Out" onClick={__logOut} />
          </div>
        </div>
      </nav>

      <br />
      <div className={twMerge("overflow-auto", commonClassName)}>
        <Subnavbar />
      </div>
    </header>
  )
}

export default Navigation

