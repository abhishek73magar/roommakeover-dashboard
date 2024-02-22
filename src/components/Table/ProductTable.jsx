import { useState } from 'react'
import Spinner from 'components/Spinner/Spinner';
import propTypes from 'prop-types'
import DataNotFound from 'components/DataNotFound/DataNotFound';
import { Searchbox } from './TableButtons';
import TableDataType from './TableDataType';

// const colnames = [
//   { name: "Name", key: "name", type: "image"},
//   { name: "Position", key: "position"},
//   { name: "Office", key: "office"},
//   { name: "age", key: "15"},
//   { name: "start date", key: "2024-01-04T10:00:00.000Z", type: 'datetime' },
//   { name: "salary", key: "1000", type: 'currency'},
//   { name: "action", key: '', type: 'action'}
// ]


const ProductTable = ({ colnames, data, isLoading, searchBy, onClick, onDelete, slug, edit, disableEdit }) => {
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
    <div className=''>
      <div className='flex flex-row justify-between items-center gap-4 px-2 py-2'>
        <div></div>
        <Searchbox value={search} onChange={__searchChange} />
      </div>
      <div className='overflow-auto'>
        <table className='text-sm w-full text-left'>
          <thead>
            <tr className='capitalize'>
            {Array.isArray(colnames) && colnames.map(({ name, type }, indx) => {
              if(type === 'image') return <th key={indx} className='p-3 w-[120px]'>{name}</th>
              if(type === 'action') return <th key={indx} className='p-3 text-center'>{name}</th>
              return <th key={indx} className='p-3'>{name}</th>
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
                        edit={edit}
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


ProductTable.propTypes = {
  colnames: propTypes.array,
  data: propTypes.array,
  isLoading: propTypes.bool,
  searchBy: propTypes.oneOfType([propTypes.array, propTypes.string]),
  onClick: propTypes.func,
  onDelete: propTypes.func,
  slug: propTypes.string,
  edit: propTypes.string,
  disableEdit: propTypes.bool
}

ProductTable.defaultProps = {
  isLoading: true,
  onClick: () => {},
  onDelete: () => {},
  edit: 'id',
  disableEdit: false
}

export default ProductTable


