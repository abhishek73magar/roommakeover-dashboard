import { twMerge } from 'tailwind-merge'
import propTypes from 'prop-types'

const Button = ({ type, icon, children, className, ...btnProps }) => {
  return (
    <button 
      type={type}
      className={twMerge('px-2 py-2 text-sm flex flex-row gap-2 justify-center items-center text-white bg-primary rounded-md hover:opacity-80', className)} 
      {...btnProps}
    >
      {icon && <span>{icon}</span>} 
      <span>{children || "button"}</span>
    </button>
  )
}

Button.propTypes = {
  icon: propTypes.object,
  children: propTypes.any,
  className: propTypes.string,
  type: propTypes.string
}

Button.defaultProps = {
  type: 'button'
}


export default Button