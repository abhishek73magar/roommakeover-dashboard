import React from 'react'
import { TbLoader3 } from "react-icons/tb";
import { twMerge } from 'tailwind-merge';

const Spinner = ({ className }) => {
  return (
    <div className={twMerge('w-full min-h-[200px] flex flex-col justify-center items-center', className)}>
      <TbLoader3 className='animate-spin text-2xl text-primary' />
    </div>
  )
}

export default Spinner