import { twMerge } from 'tailwind-merge'
import propTypes from 'prop-types'

const Inputbox = ({ label, type, id, className, divClassname, ...inputProps }) => {
  if(!id) id = `input_id_${Math.ceil(Math.random() * 1e9)}`
  return (
    <div className={twMerge('w-full flex flex-col justify-start items-start gap-0.5 text-sm mb-2', divClassname)}>
      <label htmlFor={id} className='font-semibold'>{label}</label>
      <input 
        type={type || 'text'} 
        className={twMerge('outline-none border px-2 py-2 w-full rounded-sm focus:ring-1 focus:ring-primary', className)}
        id={id} {...inputProps} 
      />
    </div>
  )
}

Inputbox.propTypes = {
  label: propTypes.any,
  type: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
  divClassname: propTypes.string
}



export default Inputbox