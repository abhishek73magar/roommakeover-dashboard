import propTypes from 'prop-types'
import { CiSearch } from 'react-icons/ci'
import { twMerge } from 'tailwind-merge'

const status = {
  "0": "Unpublished",
  "1": "Published",
  "2": "Draft"
}

export const Searchbox = ({ ...inputProps }) => {
  return (
    <div className='border px-2 py-1.5 min-w-[300px] flex flex-row items-center justify-start'>
      <input type='text' className={twMerge('flex-1 outline-none text-sm px-2')} placeholder='Search' {...inputProps} />
      <CiSearch className='text-lg cursor-pointer' />
    </div>  
  )
}


export const StatusButton = ({ statusCode }) => {
  let color = 'border bg-slate-300'
  if(statusCode === 1) color = 'bg-primary text-white'
  if(statusCode === 0) color = 'bg-red-400 text-white'
  return (
    <div className={`py-2 px-2 border text-center text-xs rounded-md ${color}`}>
      {status[statusCode]}
    </div>
  )
}

StatusButton.propTypes = {
  statusCode: propTypes.number
}

const OrderStatusList = {
  "0": "Canncellled",
  "1": "Pending",
  "2": "Verify",
  "3": "Crafting",
  "4": 'Shipping',
  "5": "completed"
}

const colors = {
  "0" : "bg-red-500",
  "1" : "bg-slate-200",
  "2" : "bg-blue-400 text-white",
  "3" : "bg-blue-600 text-white",
  "4" : "bg-blue-800 text-white",
  "5" : "bg-primary text-white",
}

export const OrderStatusButton = ({ statusCode }) => {

  return (
    <div className={twMerge(`py-2 px-2 border text-center text-xs rounded-md`, colors[statusCode || 0])}>
      {OrderStatusList[statusCode]}
    </div>
  )
}

OrderStatusButton.propTypes = {
  statusCode: propTypes.number
}

