import { useEffect, useRef, useState } from 'react'
import { HiOutlineSelector } from "react-icons/hi";
import { twMerge } from 'tailwind-merge';
import { MdCheck } from "react-icons/md";
import PropTypes from 'prop-types'

const Selectbox = ({ list, option, label, name, value, onChange, error, className, divClassname }) => {
  const [toggle, setToggle] = useState(false)
  const selectRef = useRef()

  useEffect(() => {
    const handle = (e) => {
      if(!selectRef.current?.contains(e.target)) setToggle(false)
    }
    window.addEventListener('mousedown', handle)
    return () => window.removeEventListener('mousedown', handle)
  }, [])

  if(!option) return null;
  const activeValue = list.find(i => i[option.value] === value)

  return (
      <div className='flex flex-col justify-start items-start gap-0.5 w-full'>
        {label && <div className='text-sm font-semibold' onClick={() => setToggle(!toggle)}>{label}</div>}
       {error && error !== '' && <span className='text-xs text-red-500'>{error} *</span>}
        <div className={twMerge('relative w-full border', divClassname)} ref={selectRef}>
          <button 
            type='button'
            onClick={() => setToggle(!toggle)} 
            className={twMerge('px-2 py-2 text-sm capitalize flex flex-row gap-2 justify-between items-center w-full outline-none hover:opacity-80', className)}>
            {activeValue ? activeValue[option.label] : !Array.isArray(list) || list.length === 0 ? 'UNKNOWN' : list[0][option.label]}
            <span><HiOutlineSelector className='text-lg' /></span>
          </button>
          {toggle && <div className='max-h-[200px] top-10 w-full overflow-auto custom-scroll-bar absolute z-50 bg-slate-100'>
            {Array.isArray(list) && list.map((item, indx) => {
              const active = item[option.value] === value
              return (
                <div 
                  onClick={() => {
                    onChange(name, item[option.value])
                    setToggle(false)
                  }} 
                  className={`px-2 py-2 text-sm cursor-pointer flex flex-row gap-2 justify-between items-center transition-colors duration-200 ${active ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}
                  key={indx}
                >
                  <span>{item[option.label]}</span>
                  {active && <span><MdCheck /></span>}

                </div>
              )
            })}
          </div>}
          
        </div>
      </div>
  )
}

Selectbox.propTypes = {
  list: PropTypes.array,
  option: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
  divClassname: PropTypes.string,
  error: PropTypes.string,
}

Selectbox.defaultProps = {
  list: [],
}

export default Selectbox