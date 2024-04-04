import Image from "components/Image/Image";
import { AccessStatusButton, OrderStatusButton, StatusButton } from "components/Table/TableButtons";
import moment from "moment";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import propTypes from 'prop-types'

export const TableHeading = ({ name, type }) => {
  if(type === 'image') return <th className='p-3 w-[120px]'>{name}</th>
  if(type === 'action') return <th className='p-3 text-center'>{name}</th>
  return <th className='p-3'>{name}</th>
}

TableHeading.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
}

const TableDataType = ({ value, type, disableEdit, disableDelete, slug, edit, onDelete }) => {
  if(!value && type !== 'action') return <td></td>
  if(type === 'datetime') value = moment(value).format('DD MMM, YYYY hh:mm a')
  if(type === 'currency') value = `Rs. ${value}`
  if(type === 'date-from-now') value = moment(value).fromNow()
  if(type === 'truncate') return <td className="p-3 truncate max-w-[200px]">{value}</td>
  if(type === 'heading') return <td  className='p-3 align-baseline font-semibold'>{value}</td>
  if(type === 'status') return <td  className='p-3 align-baseline w-[100px]'><StatusButton statusCode={Number(value)} /></td>
  if(type === 'access-status') return <td  className='p-3 align-baseline w-[100px]'><AccessStatusButton statusCode={Number(value)} /></td>
  if(type === 'order-status') return <td  className='p-3 align-baseline w-[100px]'><OrderStatusButton statusCode={Number(value)} /></td>
  if(type === 'image') {
    return (
        <td className='p-3 max-w-[120px]' >
          <div className='w-full border'>
            <Image src={value} alt={value || 'table-image'} className='w-full h-full object-cover object-center' />
          </div>
        </td>
      )
    }
  if(type === 'action') {
    return (
        <td className='p-3 align-baseline w-[130px]' >
          <div className='flex flex-row gap-2 justify-center items-center'>
            {!disableEdit && <Link to={`${slug}${edit}`} className='text-lg hover:text-primary'><CiEdit /></Link>}
            {!disableDelete && <div className='cursor-pointer text-lg hover:text-primary' onClick={() => onDelete(edit)}><CiTrash /></div>}
          </div>
        </td>
      )
    }
  return <td className='p-3 align-baseline'>{value}</td>;
}

TableDataType.propTypes = {
  value: propTypes.any,
  type: propTypes.string,
  disableEdit: propTypes.bool,
  disableDelete: propTypes.bool,
  slug: propTypes.string,
  edit: propTypes.string,
  onDelete: propTypes.func
}

TableDataType.defaultProps = {
  disableEdit: false,
  disableDelete: false,
}

export default TableDataType