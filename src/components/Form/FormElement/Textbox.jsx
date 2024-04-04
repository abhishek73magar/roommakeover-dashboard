import { twMerge } from 'tailwind-merge'
import propTypes from 'prop-types'

const Textbox = ({ label, rows, id, className, divClassname, register, error, ...inputProps }) => {

  if(!id) id = `input_id_${Math.ceil(Math.random() * 1e5)}`
  return (
    <div className={twMerge('w-full flex flex-col justify-start items-start gap-0.5 text-sm mb-2', divClassname)}>
      <label htmlFor={id} className='font-semibold'>{label}</label>
      {error && error !== '' && <span className='text-xs text-red-500'>{error} *</span>}
      <textarea
        rows={rows || 3}
        className={twMerge('outline-none border px-2 py-2 w-full rounded-sm focus:ring-1 focus:ring-primary', className)}
        id={id} 
        {...register}
        {...inputProps} 
      />
    </div>
  )
}

Textbox.propTypes = {
  label: propTypes.string,
  rows: propTypes.number,
  id: propTypes.string,
  className: propTypes.string,
  divClassname: propTypes.string,
  error: propTypes.string,
  register: propTypes.object,
}

Textbox.defaultProps = {
  register: {}
}

export default Textbox
