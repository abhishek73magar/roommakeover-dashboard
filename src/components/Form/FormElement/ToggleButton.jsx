import { twMerge } from "tailwind-merge"
import PropTypes from 'prop-types'

const ToggleButton = ({ label, className, divClassname, labelClassname, error, register, ...inputProps }) => {
  return (
    <div className={twMerge('', divClassname)}>
      {error && <div className="text-xs text-red-500">{error}</div>}
      <label className={twMerge("inline-flex items-center cursor-pointer", className)}>
        <div className="relative">
          <input type="checkbox" className="sr-only peer" {...inputProps} {...register} />
          <div className={`w-6 h-3.5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:left-0 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-700`}></div>
        </div>
        <span className={twMerge("ms-3 text-sm font-medium text-gray-900", labelClassname)}>{label}</span>
      </label>
    </div>
  )
}

ToggleButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  divClassname: PropTypes.string,
  labelClassname: PropTypes.string,
  error: PropTypes.string,
  register: PropTypes.object
} 

ToggleButton.defaultProps = {
  label: "",
  register: {}
}

export default ToggleButton