import Inputbox from '../FormElement/Inputbox'
import Selectbox from '../FormElement/Selectbox'
import Button from '../FormElement/Button'
import { AiOutlineSave } from "react-icons/ai";
import UploadFile from '../FormElement/UploadFile'
import { IMAGE_URL } from 'config'
import propTypes from 'prop-types'
import { categoryObj } from 'utils/formObject'
import { categoryApi } from 'libs/api'
import { useForm } from 'react-hook-form';
import { zodError } from 'libs/zodError';


const obj = { name: "Select Category", id: null}
const CategoryForm = ({ categoryData, onSubmit, type }) => {
  const { data:category, isLoading } = categoryApi.swrFetch()
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({ defaultValues: categoryData })


  const __fileChange = (files) => {
    // if(files.length > 0) setData((prev) => ({ ...prev, imagesrc: files[0]}))
    if(files.length > 0) setValue('imagesrc', files[0])
  }

  const __onSubmit = (formdata) => {
    // e.preventDefault()
    const formData = new FormData()
    Object.keys(formdata).forEach((key) => formData.append(key, formdata[key]))  
    return onSubmit(formData).then((response) => {
      if(type === 'update') reset({...categoryData, ...response })
      else { reset(categoryData) } 
    }).catch(console.error)
  }
  return (
    <div>
      <form method="post" encType='multipart/form-data' onSubmit={handleSubmit(__onSubmit)}>
        <div className='grid md:grid-cols-2 gap-2'>
          <Inputbox 
            error={zodError(errors, 'name')}
            label={'Category Name'} 
            register={register('name', { required: { value: true, message: "Category name must be required"} })}
            placeholder="Category Name" 
            // required={true} 
          />
          <Selectbox
            error={zodError(errors, 'category_id')}
            label={'Category'}
            list={isLoading || !category ? [obj] : [obj, ...category]}
            option={{ label: 'name', value: 'id'}}
            value={watch('category_id') || null}
            onChange={(name, value) => setValue(name, value)}
            name={'category_id'}
          />
        </div>

        <div>
          <UploadFile 
            onChange={__fileChange} 
            className='h-[300px] mb-2'
            src={watch('imagesrc') === '' ? null : typeof watch('imagesrc') === 'object' ? URL.createObjectURL(watch('imagesrc')) : `${IMAGE_URL}/${watch('imagesrc')}` } 
          />    
        </div>
        <div className='flex flex-row justify-end items-center'>
          <Button type="submit" icon={<AiOutlineSave className='text-lg' />}>Save</Button>
        </div>
      </form>
    </div>
  )
}

CategoryForm.propTypes = {
  onSubmit: propTypes.func,
  categoryData: propTypes.object,
  type: propTypes.string
}

CategoryForm.defaultProps = {
  onSubmit: () => {},
  categoryData: categoryObj,
  type: 'new'
}


export default CategoryForm