import { useState } from 'react'
import Spinner from 'components/Spinner/Spinner';
import propTypes from 'prop-types'
import { Searchbox } from './TableButtons';
import TableDataType, { TableHeading } from './TableDataType';
import DataNotFound from 'components/DataNotFound/DataNotFound';
import { GoChevronDown } from "react-icons/go";

// const colnames = [
//   { name: "Name", key: "name"},
//   { name: "Position", key: "position"},
//   { name: "Office", key: "office"},
//   { name: "age", key: "15"},
//   { name: "start date", key: "2024-01-04T10:00:00.000Z", type: 'datetime' },
//   { name: "salary", key: "1000", type: 'currency'},
// ]

const GroupTable = ({ colnames, data, subKey, searchBy, isLoading, slug, edit, disableEdit, disbleSearch, onDelete }) => {
  const [search, setSearch] = useState("")

  const __searchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value)
  }

  const __filterBy = (item) => {
    if(search === '' || !searchBy) return true;
    if(Array.isArray(searchBy)){
      return searchBy.some((key) => item[key].toString().toLowerCase().includes(search))
    } 
    return item[searchBy].toString().toLowerCase().includes(search)
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center gap-4 px-2 py-2'>
        <div></div>
        {!disbleSearch && <Searchbox value={search} onChange={__searchChange} />}
      </div>
      <div className='overflow-auto'>
        <table className='text-sm w-full text-left'>
          <thead>
            <tr className='capitalize'>
              <th></th>
              {Array.isArray(colnames) && colnames.map(({ name, type }, indx) => {
                return <TableHeading key={indx} name={name} type={type} />
              })}
            </tr>
          </thead>
          <tbody>
          {Array.isArray(data) && data
            .filter(__filterBy)
            .map((item, indx) => {
              return (
                <TableBody 
                  key={indx} 
                  subKey={subKey} 
                  colnames={colnames} 
                  item={item} 
                  slug={slug}
                  edit={edit}
                  disableEdit={disableEdit}
                  onDelete={onDelete}
                />
              )
            })}
          </tbody>
          
        </table>
      </div>
      {!isLoading ? !Array.isArray(data) || data.filter(__filterBy).length === 0 ? <DataNotFound className={'min-h-[150px]'} /> : null : null}
      {isLoading && <Spinner />}
    </div>
  )
}



GroupTable.propTypes = {
  colnames: propTypes.array,
  data: propTypes.array,
  subKey: propTypes.string,
  searchBy: propTypes.oneOfType([propTypes.string, propTypes.array]),
  isLoading: propTypes.bool,
  onDelete: propTypes.func,
  slug: propTypes.string,
  edit: propTypes.string,
  disableEdit: propTypes.bool,
  disbleSearch: propTypes.bool

}

GroupTable.defaultProps = {
  isLoading: true,
  onDelete: () => {},
  edit: 'id',
  disableEdit: false,
  disbleSearch: false,
}

export default GroupTable

const TableBody = ({ colnames, item, subKey, slug, edit, disableEdit, onDelete }) => {
  const subData = item[subKey]
  const [toggle, setToggle] = useState(true)
  return (
    <>
      <tr className='bg-slate-100 hover:bg-slate-50 cursor-pointer' onClick={() => setToggle(!toggle)}>
        <td className='px-2'><GoChevronDown className={`${toggle ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} /></td>
        {colnames.map(({ key, type}, indx) => {
          return (
            <TableDataType 
              key={indx} 
              value={item[key]} 
              type={type} 
              slug={slug}
              edit={item[edit]}
              disableEdit={disableEdit}
              disableDelete={true}
              onDelete={onDelete}
            />
            )
        })}
      </tr>

      {toggle && Array.isArray(subData) && subData.map((subItem, __indx) => {
        return (
          <tr className='' key={__indx}>
            <td className='px-2'></td>
            {colnames.map(({ key, type}, indx) => {
              const mainVal = item[key]
              if(mainVal) return <td key={indx}></td>
              return (
                <TableDataType 
                  key={indx} 
                  value={subItem[key] === 0 ? '0' : subItem[key]} 
                  type={type} 
                  slug={slug}
                  edit={subItem[edit]}
                  disableEdit={disableEdit}
                  onDelete={onDelete}
                />
                )
          })}
          </tr>
        )
      })}
    </>
  )
}

TableBody.propTypes = {
  colnames: propTypes.array,
  item: propTypes.object,
  subKey: propTypes.string,
  onDelete: propTypes.func,
  slug: propTypes.string,
  edit: propTypes.string,
  disableEdit: propTypes.bool,
}


