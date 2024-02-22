import { useState } from 'react'
import Inputbox from '../FormElement/Inputbox'
import Selectbox from '../FormElement/Selectbox'
import Button from '../FormElement/Button'
import { AiOutlineSave } from "react-icons/ai";
import UploadFile from '../FormElement/UploadFile'
import { IMAGE_URL } from 'config'
import propTypes from 'prop-types'
import { categoryObj } from 'utils/formObject'
import { categoryApi } from 'libs/api'
import toast from 'react-hot-toast';


const obj = { name: "Select Category", id: null}
const CategoryForm = ({ categoryData, onSubmit, type }) => {
  const { data:category, isLoading } = categoryApi.swrFetch()
  const [data, setData] = useState({ ...categoryData })

  const __inputHandle = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  } 

  const __fileChange = (files) => {
    if(files.length > 0) setData((prev) => ({ ...prev, imagesrc: files[0]}))
  }

  const __onSubmit = (e) => {
    e.preventDefault()
    if(data.name === '') return toast.error("Category name is required !")
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))  
    return onSubmit(formData).then((response) => {
      if(type === 'update') setData((prev) => ({...prev, ...response }))
      else { setData((prev) => ({ ...prev, ...categoryData}))} 
    }).catch(console.error)
  }
  return (
    <div>
      <form method="post" encType='multipart/form-data' onSubmit={__onSubmit}>
        <div className='grid md:grid-cols-2 gap-2'>
          <Inputbox label={'Category Name'} name="name" value={data.name} onChange={__inputHandle} placeholder="Category Name" required={true} />
          <Selectbox
            label={'Category'}
            list={isLoading || !category ? [obj] : [obj, ...category]}
            option={{ label: 'name', value: 'id'}}
            value={data.category_id || null}
            onChange={(name, value) => setData((prev) => ({ ...prev, [name]: value }))}
            name={'category_id'}
          />
        </div>

        <div>
          <UploadFile 
            onChange={__fileChange} 
            className='h-[300px] mb-2'
            src={data.imagesrc === '' ? null : typeof data.imagesrc === 'object' ? URL.createObjectURL(data.imagesrc) : `${IMAGE_URL}/${data.imagesrc}` } 
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