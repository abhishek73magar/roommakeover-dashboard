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
import { useForm } from 'react-hook-form';
import { zodError } from 'libs/zodError';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema } from 'utils/formSchema';



// const numberOnly = ["price", "quantity"]
// const checkbox = ['is_discount']

const ProductForm = ({ data, type, imageList, onSubmit }) => {
  const { data: cateogry, isLoading } = categoryApi.swrFetch()
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({ defaultValues: data, resolver: zodResolver(productFormSchema) })
  const [colors, setColors] = useState(data.colors || [])
  const [formImage, setFormImage] = useState([])


  const __onSubmit = (product) => {
    const formData = new FormData()
    Object.keys(product).forEach((name) => {
      if(name === 'colors') return;
      let value = product[name] === 'null' || product[name] === '' ? null : product[name]
      formData.append(name, value)
    })

    formData.append('colors', JSON.stringify(colors))
    formImage.forEach((file) => formData.append('product-images', file))

    return onSubmit(formData).then((res) => {
      if(res){
        if(type === 'update') {
          reset({ ...productObj, ...res.response }) 
          setColors(res.response.colors)
        }
        else {
          reset(productObj)
          setColors([])
        }
        
        setFormImage([])
        if(formImage.length > 0 && imageList && res && res.images) imageList.mutate((prev) => [...prev, res.images], false)
      }

      }).catch(console.error)
  }



  const __selectHandle = (name, value) => {
    setValue(name, value)
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(__onSubmit)} encType='multipart/form-data'>
     
        <div className='grid md:grid-cols-7 gap-2'>
          <div className='col-span-5 flex flex-col gap-2 xl:grid xl:grid-cols-2 xl:gap-4'>
            <Inputbox 
              error={zodError(errors, 'title')}
              label={'Product Title'} 
              register={register('title')} 
              placeholder="Product Title" 
            />
            
            <div className={`grid ${watch('is_discount') ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
              <Inputbox 
                error={zodError(errors, 'price')}
                register={register("price", { valueAsNumber: true })}
                label={
                  <span className='flex flex-row gap-2 justify-center items-center'>
                    Price 
                    <input 
                      type='checkbox' 
                      {...register("is_discount")} 
                      id='discount' 
                      className=' rounded accent-current focus:ring-current' 
                    />
                    <label htmlFor="discount" className='font-normal text-xs cursor-pointer'> Discount? </label>
                  </span>} 
                placeholder="Price" 
              />
              {watch('is_discount') && 
                <Inputbox 
                  error={zodError(errors, 'new_price')}
                  label={'Discount Price'} 
                  register={register("new_price", { valueAsNumber: true })} 
                  placeholder="New Price (is discount)" 
                />}
            </div>

            <Inputbox 
              error={zodError(errors, 'quantity')} 
              label={'Quantity'} 
              register={register("quantity", { valueAsNumber: true })} 
              placeholder="Quantity" 
            />
            <Selectbox 
              name="category_id"
              onChange={__selectHandle}
              label={"Category"}
              list={isLoading ? [] : [{ name: 'Select Category', value: '' }, ...cateogry || []]} 
              option={{ label: "name", value: 'id'}}  
              value={watch('category_id')}
            />
            
            <ColorPicker 
              colors={colors || []} 
              setColors={setColors} 
            />

            <Textbox 
              rows={4} 
              label="Short Description" 
              register={register('short_description')}  
              className={'h-full'} 
              placeholder="Short Description"  
            />

            <div className="col-span-2">
              <TextEditor 
                mediaEnable={true} 
                name="more_info" 
                value={watch("more_info")} 
                onChange={__selectHandle} 
                label="More Info"  
              />
            </div>


            <div className='col-span-2'>
              <Selectbox 
                error={zodError(errors, 'stock_status')}
                name="stock_status"
                onChange={__selectHandle}
                value={watch('stock_status')}
                label={"Stock"}
                list={stockStatus} 
                option={{ label: "name", value: 'value'}}  
              />
            </div>

            <Selectbox 
              error={zodError(errors, 'on_sale')}
              name="on_sale"
              onChange={__selectHandle}
              value={watch('on_sale')}
              label={"On Sale"}
              list={onSale} 
              option={{ label: "name", value: 'value'}}  
            />

            <Selectbox 
              error={zodError(errors, 'status')}
              name="status"
              onChange={__selectHandle}
              value={watch('status')}
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
  onSubmit: () => {},
  imageList: {},
}

export default ProductForm