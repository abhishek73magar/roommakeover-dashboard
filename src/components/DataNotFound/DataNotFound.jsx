import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FcDeleteDatabase } from "react-icons/fc";


const DataNotFound = ({ className, text="Data not found !" }) => {
  return (
    <div className={twMerge('flex flex-col gap-2 items-center justify-center text-sm min-h-[250px]', className)}>
      <FcDeleteDatabase className='text-3xl' />
      <div>{text}</div>
    </div>
  )
}

export default DataNotFound