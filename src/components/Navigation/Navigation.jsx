import logo from 'assets/logo2.png'
import Mail from './Mail'
import Notification from './Notification'
import Chat from './Chat'
import Subnavbar from './Subnavbar'
import { twMerge } from 'tailwind-merge'

const commonClassName = 'mx-auto w-[95%] xl:w-[75%]'
const Navigation = () => {
  return (
    <header className='text-secondary'>
      <nav className=" bg-primary py-2">
        <div className={twMerge(`flex flex-row gap-3 justify-between items-center`, commonClassName)}>
          <div className='w-[300px]'>
            <img src={logo} alt="logo" className="w-full h-full object-cover object-center" />
          </div>
          <div className='flex flex-row gap-5 justify-between items-center'>
            <Mail />
            <Notification />
            <Chat />
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

