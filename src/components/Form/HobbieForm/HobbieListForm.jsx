import { AiOutlineSave } from "react-icons/ai"
import UploadFile from "../FormElement/UploadFile"
import Inputbox from "../FormElement/Inputbox"
import { useState } from "react"
import toast from "react-hot-toast"
import propTypes from 'prop-types'
import { IMAGE_URL } from "config"
import { hobbieListObj } from "utils/formObject"
import Button from "../FormElement/Button"

const HobbieListForm = ({ hobbie=hobbieListObj, onSubmit, type }) => {
  const [data, setData] = useState({ ...hobbie })

  const __inputHandle = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  } 

  const __fileChange = (files) => {
    if(files.length > 0) setData((prev) => ({ ...prev, thumbnail: files[0]}))
  }

  const __onSubmit = (e) => {
    e.preventDefault()
    if(data.name === '') return toast.error("Hobbie name is required !")
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))  
    return onSubmit(formData).then((response) => {
      if(type === 'update') setData((prev) => ({...prev, ...response }))
      else { setData((prev) => ({ ...prev, ...hobbie }))} 
    })
  }
  return (
    <div>
      <form method="post" encType='multipart/form-data' onSubmit={__onSubmit}>
        <div className='grid md:grid-cols-2 gap-2'>
          <Inputbox label={'Hobbie Name'} name="name" value={data.name} onChange={__inputHandle} placeholder="Hobbie Name" required={true} />
        </div>

        <div>
          <UploadFile 
            onChange={__fileChange} 
            className='h-[300px] mb-2'
            src={ !data.thumbnail || data.thumbnail === '' ? null : typeof data.thumbnail === 'object' ? URL.createObjectURL(data.thumbnail) : `${IMAGE_URL}/${data.thumbnail}` } 
          />    
        </div>
        <div className='flex flex-row justify-end items-center'>
          <Button type="submit" icon={<AiOutlineSave className='text-lg' />}>Save</Button>
        </div>
      </form>
    </div>
  )
}

HobbieListForm.propTypes = {
  onSubmit: propTypes.func,
  hobbie: propTypes.object,
  type: propTypes.string
}

export default HobbieListForm