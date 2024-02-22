import React from 'react'
import { twMerge } from 'tailwind-merge'

const Inputbox = ({ label, type, id, className, divClassname, ...inputProps }) => {

  if(!id) id = `input_id_${Math.ceil(Math.random() * 1e5)}`
  return (
    <div className={twMerge('w-full flex flex-col justify-start items-start gap-0.5 text-sm mb-2', divClassname)}>
      <label htmlFor={id} className='font-semibold'>{label}</label>
      <input 
        type={type || 'text'} 
        className={twMerge('outline-none border px-2 py-2 w-full rounded-sm focus:ring-1 focus:ring-primary')}
        id={id} {...inputProps} 
      />
    </div>
  )
}

export default Inputbox