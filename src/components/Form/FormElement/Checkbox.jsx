import propTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Checkbox = ({ label, type, className, divClassName, register, ...inputProps }) => {
  let id = `checkbox_${Math.round(Math.random() * 1000)}`
  return (
    <div className={twMerge('flex flex-row items-center justify-start gap-2 text-sm', divClassName)}>
      <input type={type} className={twMerge('checkbox focus:outline-primary', className)} id={id} {...register} {...inputProps} />
      <label htmlFor={id} className='cursor-pointer '>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  type: propTypes.string,
  label: propTypes.any,
  className: propTypes.string,
  divClassName: propTypes.string,
  register: propTypes.object
}

Checkbox.defaultProps = {
  type: "checkbox",
  register: {}

}

export default Checkbox