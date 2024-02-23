import propTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const Checkbox = ({ label, type, className, divClassName, ...inputProps }) => {
  let id = `checkbox_${Math.round(Math.random() * 1000)}`
  return (
    <div className={twMerge('flex flex-row items-center justify-start gap-2 text-sm', divClassName)}>
      <input type={type} className={twMerge('checkbox focus:outline-primary', className)} id={id} {...inputProps} />
      <label htmlFor={id} className='cursor-pointer '>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  type: propTypes.string,
  label: propTypes.any,
  className: propTypes.string,
  divClassName: propTypes.string
}

Checkbox.defaultProps = {
  type: "checkbox",

}

export default Checkbox