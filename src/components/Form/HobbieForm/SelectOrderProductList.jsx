import Image from "components/Image/Image"
import Spinner from "components/Spinner/Spinner"
import { IMAGE_URL } from "config"
import { productApi } from "libs/api"
import { useState } from "react"
import propTypes from 'prop-types'


const SelectOrderProductList = ({ productList, onChange, changeCart }) => {
  const [search, setSearch] = useState('')
  const { data: products, isLoading } = productApi.swrFetch()

  const __filterList = (data) => {
    if(Array.isArray(productList)){
      const checked = productList.some((i) => i.product_id === data.pid)
      return !checked;
    }
    return true;
  }

  const __reduceProduct = (acc, item) => {
    if(Array.isArray(productList)) {
      const p = productList.find(i => item.pid === i.product_id)
      if(p) acc.push({...item, qty: p.qty })
    }
    return acc;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="border-r min-h-[200px]">
        <Searchbox value={search} setValue={setSearch} />
        {isLoading && <Spinner />}
        <div className='px-2 py-2 pb-0 max-h-[150px] overflow-auto custom-scroll-bar'>
          {products && 
            <ProductList 
              search={search} 
              data={products.data.filter(__filterList)} 
              onClick={onChange} 
            /> }
        </div>
      </div>
      <div className='max-h-[180px] overflow-auto custom-scroll-bar px-2 py-2'>
        {products && 
          <CheckoutProducts 
            data={products.data.reduce(__reduceProduct, []) ?? []} 
            changeCart={changeCart}
            onClick={onChange} 
          />}
      </div>
    </div>
  )
}

export default SelectOrderProductList


SelectOrderProductList.propTypes = {
  onChange: propTypes.func,
  changeCart: propTypes.func,
  productList: propTypes.array
}

const CheckoutProducts = ({ data, onClick, changeCart }) => {
  return (
    <article className="">
      {data.map((item, indx) => {
        const url = `${IMAGE_URL}/${item.url}`
        return (
          <div
            key={indx}
            className='flex flex-row justify-start items-center gap-4 text-xs mb-2 cursor-pointer'
          >
          <Image src={url} alt='product-images' className={'h-[40px] w-[40px] min-h-0 object-cover object-center'} />
          <div className='flex flex-col flex-grow gap-0.5 justify-start items-start hover:underline'>
            <div>{item.title}</div>
            <div>Rs.{(item.price)} x {item.qty ?? 1}</div>
          </div>
          <div>
            <div className="text-right text-red-400 hover:underline" onClick={() => onClick(item)}>remove</div>
            <div className="text-center">Rs. {item.qty ? +item.qty * item.price : item.price}</div>
            <div className="flex flex-row justify-between gap-2 items-center flex-1 border px-2 text-sm w-[70px]">
              <div className="text-lg hover:text-primary" onClick={() => changeCart(item.pid, -1)}>-</div>
              <div>{item.qty ?? 1}</div>
              <div className="text-lg hover:text-primary" onClick={() => changeCart(item.pid, 1)}>+</div>
            </div>
          </div>
        </div>
        )
      })}
    </article>
  )
}

CheckoutProducts.propTypes = {
  data: propTypes.array,
  onClick: propTypes.func,
  changeCart: propTypes.func,
}


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
      const url = `${IMAGE_URL}/${item.url}`
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
