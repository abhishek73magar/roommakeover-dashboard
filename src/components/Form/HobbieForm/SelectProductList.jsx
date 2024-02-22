import Image from 'components/Image/Image'
import Spinner from 'components/Spinner/Spinner'
import { IMAGE_URL } from 'config'
import { productApi } from 'libs/api'
import propTypes from 'prop-types'
import { useState } from 'react'

const SelectProductList = ({ productList, onChange }) => {
  const [search, setSearch] = useState('')
  const { data: products, isLoading } = productApi.swrFetch()

  return (
    <div className="grid grid-cols-2">
      <div className="border-r min-h-[200px]">
        <Searchbox value={search} setValue={setSearch} />
        {isLoading && <Spinner />}
        <div className='px-2 py-2 pb-0 max-h-[150px] overflow-auto custom-scroll-bar'>
          {products && 
            <ProductList 
              search={search} 
              data={products.data.filter(({ pid }) => Array.isArray(productList) && !productList.includes(pid))} 
              onClick={onChange} 
            /> }
        </div>
      </div>
      <div className='max-h-[180px] overflow-auto custom-scroll-bar px-2 py-2'>
        {products && 
          <ProductList 
            data={products.data.filter(({ pid }) => Array.isArray(productList) && productList.includes(pid))} 
            onClick={onChange} 
          />}
      </div>
    </div>
  )
}

SelectProductList.propTypes = {
  onChange: propTypes.func,
  productList: propTypes.array
}

export default SelectProductList

const Searchbox = ({ value, setValue }) => {
  return (
    <input 
      type='text'
      className="outline-none border-b w-full px-2 py-2 text-xs focus:border-b-primary"
      placeholder="Search Product"
      onChange={(e) => setValue(e.target.value.toLowerCase())}
      value={value}
    />
  )
}

Searchbox.propTypes = {
  value: propTypes.string,
  setValue: propTypes.func
}


const ProductList = ({ search='', data, onClick }) => {
  return Array.isArray(data) && data
  .filter(({ title }) => title.toLowerCase().includes(search))
  .map((item, indx) => {
      const url = `${IMAGE_URL}/${item. url}`
      return (
        <div
          key={indx}
          onClick={() => onClick(item)}
          className='flex flex-row justify-start items-center gap-4 text-xs mb-2 hover:underline cursor-pointer'
        >
          <Image src={url} alt='product-images' className={'h-[40px] w-[40px] min-h-0 object-cover object-center'} />
          <div className='flex flex-col gap-0.5 justify-start items-start'>
            <div>{item.title}</div>
            <div>Rs.{(item.price)}</div>
          </div>
        </div>
      )
  })
}
