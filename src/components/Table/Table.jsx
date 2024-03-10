import { useState } from 'react'
import Spinner from 'components/Spinner/Spinner';
import propTypes from 'prop-types'
import { Searchbox } from './TableButtons';
import TableDataType, { TableHeading } from './TableDataType';
import DataNotFound from 'components/DataNotFound/DataNotFound';

// const colnames = [
//   { name: "Name", key: "name"},
//   { name: "Position", key: "position"},
//   { name: "Office", key: "office"},
//   { name: "age", key: "15"},
//   { name: "start date", key: "2024-01-04T10:00:00.000Z", type: 'datetime' },
//   { name: "salary", key: "1000", type: 'currency'},
// ]

const Table = ({ colnames, data, searchBy, isLoading, onClick, slug, edit, disableEdit, onDelete }) => {
  const [search, setSearch] = useState("")

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
        <Searchbox setValue={setSearch} />
      </div>
      <div className='overflow-auto'>
        <table className='text-sm w-full text-left'>
          <thead>
            <tr className='capitalize'>
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
                <tr className='odd:bg-slate-100 hover:bg-slate-50 cursor-pointer' onClick={() => onClick(item)} key={indx}>
                  {colnames.map(({ key, type }, __indx) => {
                    return (
                      <TableDataType 
                        key={__indx}
                        value={item[key]}
                        type={type}
                        slug={slug}
                        edit={item[edit]}
                        disableEdit={disableEdit}
                        onDelete={onDelete}
                      />
                    )
                  })}
                </tr>
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

Table.propTypes = {
  colnames: propTypes.array,
  data: propTypes.array,
  searchBy: propTypes.oneOfType([propTypes.string, propTypes.array]),
  isLoading: propTypes.bool,
  onClick: propTypes.func,
  onDelete: propTypes.func,
  slug: propTypes.string,
  edit: propTypes.string,
  disableEdit: propTypes.bool
}

Table.defaultProps = {
  isLoading: true,
  onClick: () => {},
  onDelete: () => {},
  edit: 'id',
  disableEdit: false
}


export default Table
