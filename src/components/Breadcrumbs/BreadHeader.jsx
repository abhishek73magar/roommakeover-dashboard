import { Link } from "react-router-dom"
import { TfiBackLeft } from "react-icons/tfi";
import { IoAdd } from "react-icons/io5";
import PropTypes from 'prop-types'

const BreadHeader = ({ icon, title, subtitle, path, addNew }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 bg-white p-3 no-print">
      <div className="flex flex-row items-center justify-start gap-4 ">
        <div className="text-4xl text-primary border-2 rounded-full border-l-0 border-b-0 p-3">
          {icon}
        </div>
        <div className="flex flex-col justify-between items-start gap-2">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-sm">{subtitle}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end gap-0.5">
       {path && <Link to={path} className="px-2 py-2 text-sm bg-primary text-white rounded-md flex flex-row gap-1.5 justify-center items-center hover:opacity-75" >
          <span><TfiBackLeft /></span>
          <span>Back</span>
        </Link>}
       {addNew && <Link to={addNew} className="px-2 py-2 text-sm bg-primary text-white rounded-md flex flex-row gap-1.5 justify-center items-center hover:opacity-75" >
          <span><IoAdd /></span>
          <span>Add</span>
        </Link>}
      </div>
    </div>
  )
}

BreadHeader.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  path: PropTypes.string,
  addNew: PropTypes.string
}

BreadHeader.defaultProps = {
  path: null,
  addNew: null
}
export default BreadHeader