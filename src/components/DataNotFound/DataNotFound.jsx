import { twMerge } from 'tailwind-merge'
import { FcDeleteDatabase } from "react-icons/fc";
import propTypes from 'prop-types'


const DataNotFound = ({ className, text }) => {
  return (
    <div className={twMerge('flex flex-col gap-2 items-center justify-center text-sm min-h-[250px]', className)}>
      <FcDeleteDatabase className='text-3xl' />
      <div>{text}</div>
    </div>
  )
}

DataNotFound.propTypes = {
  className: propTypes.string,
  text: propTypes.string
}

DataNotFound.defaultProps = {
  text: "Data not found !"
}

export default DataNotFound