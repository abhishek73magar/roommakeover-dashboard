import { useState } from 'react'
import Inputbox from '../FormElement/Inputbox';
import Selectbox from '../FormElement/Selectbox';
import Textbox from '../FormElement/Textbox';
import TextEditor from '../FormElement/TextEditor';
import Button from '../FormElement/Button';
import { AiOutlineSave } from "react-icons/ai";
import ImageContainer from './ImageContainer';
import { productObj } from 'utils/formObject';
import ColorPicker from './ColorPicker';
import propTypes from 'prop-types'
import { categoryApi } from 'libs/api';
import { onSale, statusList, stockStatus } from 'utils/selectOption';



const numberOnly = ["price", "quantity"]
const checkbox = ['is_discount']

const ProductForm = ({ data, type, imageList, onSubmit }) => {
  const { data: cateogry, isLoading } = categoryApi.swrFetch()
  const [product, setProduct] = useState({ ...data })
  const [formImage, setFormImage] = useState([])


  const __onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    Object.keys(product).forEach((name) => {
      let value = product[name] === 'null' ? null : product[name]
      if(name === 'colors') value = JSON.stringify(value)
      formData.append(name, value)
    })

    formImage.forEach((file) => formData.append('product-images', file))

    return onSubmit(formData).then((res) => {
        if(type === 'update') setProduct((prev) => ({ ...prev, ...res.response })) 
        else setProduct({ ...productObj })
        
        setFormImage([])
        if(formImage.length > 0 && imageList && res && res.images) imageList.mutate((prev) => [...prev, res.images], false)
      }).catch(console.error)
  }

  const __inputHandle = (e) => {
    const name = e.target.name
    const value = e.target.value
    if(numberOnly.includes(name) && isNaN(value)){ return }
    if(checkbox.includes(name)){
      const checked = e.target.checked;
      return setProduct((prev) => ({ ...prev, [name]: checked }))
    }

    setProduct((prev) => ({ ...prev, [name]: value}))

  }

  const __selectHandle = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <form method="post" onSubmit={__onSubmit} encType='multipart/form-data'>
     
        <div className='grid md:grid-cols-7 gap-2'>
          <div className='col-span-5 flex flex-col gap-2 xl:grid xl:grid-cols-2 xl:gap-4'>
            <Inputbox label={'Product Title'} name="title" value={product.title || ''} onChange={__inputHandle} placeholder="Product Title" />
            
            <div className={`grid ${product.is_discount ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
              <Inputbox 
                label={
                  <span className='flex flex-row gap-2 justify-center items-center'>
                    Price 
                    <input type='checkbox' name="is_discount" onChange={__inputHandle} id='discount' className=' rounded accent-current focus:ring-current' />
                    <label htmlFor="discount" className='font-normal text-xs cursor-pointer'> Discount? </label>
                  </span>} 
                name="price" 
                value={product.price || ''} 
                onChange={__inputHandle} 
                placeholder="Price" 
              />
              {product.is_discount && <Inputbox label={'Discount Price'} name="new_price" value={product.new_price || ''} onChange={__inputHandle} placeholder="New Price (is discount)" />}
            </div>

            <Inputbox label={'Quantity'} name="quantity" value={product.quantity || ''} onChange={__inputHandle} placeholder="Quantity" />
            <Selectbox 
              name="category_id"
              onChange={__selectHandle}
              label={"Category"}
              list={isLoading ? [] : [{ name: 'Select Category', value: '' }, ...cateogry || []]} 
              option={{ label: "name", value: 'id'}}  
              value={product.category_id || ''}
            />
            
            <ColorPicker 
              colors={product.colors || []} 
              setColors={setProduct} 
            />

            <Textbox rows={4} label="Short Description" name="short_description" value={product.short_description || ''} onChange={__inputHandle} className={'h-full'} placeholder="Short Description"  />

            <div className="col-span-2">
              <TextEditor mediaEnable={true} value={product.more_info || ''} onChange={(value) => setProduct((prev) => ({ ...prev, 'more_info': value }))} label="More Info"  />
            </div>


            <div className='col-span-2'>
              <Selectbox 
                name="stock_status"
                onChange={__selectHandle}
                value={product.stock_status || ''}
                label={"Stock"}
                list={stockStatus} 
                option={{ label: "name", value: 'value'}}  
              />
            </div>

            <Selectbox 
              name="on_sale"
              onChange={__selectHandle}
              value={product.on_sale || ''}
              label={"On Sale"}
              list={onSale} 
              option={{ label: "name", value: 'value'}}  
            />

            <Selectbox 
              name="status"
              onChange={__selectHandle}
              value={product.status || '2'}
              label={"Status"}
              list={statusList} 
              option={{ label: "name", value: 'value'}}  
            />
          </div>

          <div className='col-span-7 md:col-span-2'>
            <ImageContainer imageList={imageList} formImage={formImage} setFormImage={setFormImage} />
          </div>
        </div>   
        <div className='flex flex-row justify-end items-center pt-2'>
          <Button type="submit" icon={<AiOutlineSave className='text-base' />}>Save</Button>
        </div>     
      </form>
    </div>
  )
}


ProductForm.propTypes = {
  data: propTypes.object,
  type: propTypes.string,
  imageList: propTypes.object,
  onSubmit: propTypes.func
}

ProductForm.defaultProps = {
  data: productObj,
  type: 'new',
  onSubmit: () => {}
}

export default ProductForm