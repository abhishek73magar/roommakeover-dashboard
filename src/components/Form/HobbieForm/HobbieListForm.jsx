import { AiOutlineSave } from "react-icons/ai"
import UploadFile from "../FormElement/UploadFile"
import Inputbox from "../FormElement/Inputbox"
import propTypes from 'prop-types'
import { IMAGE_URL } from "config"
import { hobbieListObj } from "utils/formObject"
import Button from "../FormElement/Button"
import { useForm } from "react-hook-form"
import { zodError } from "libs/zodError"

const HobbieListForm = ({ hobbie=hobbieListObj, onSubmit, type }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({ defaultValues: hobbie })



  const __fileChange = (files) => {
    if(files.length > 0) setValue('thumbnail', files[0])
  }

  const __onSubmit = (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => formData.append(key, data[key]))  
    return onSubmit(formData).then((response) => {
      if(type === 'update') reset({...hobbie, ...response })
      else { reset(hobbie) } 
    })
  }
  return (
    <div>
      <form method="post" encType='multipart/form-data' onSubmit={handleSubmit(__onSubmit)}>
        <div className='grid md:grid-cols-2 gap-2'>
          <Inputbox 
            label={'Hobbie Name'} 
            register={register("name", { required: { value: true, message: "Hobbie name is required"}})}
            error={zodError(errors, 'name')}
            placeholder="Hobbie Name" 
          />
        </div>

        <div>
          <UploadFile 
            onChange={__fileChange} 
            className='h-[300px] mb-2'
            src={ !watch('thumbnail') || watch('thumbnail') === '' ? null : typeof watch('thumbnail') === 'object' ? URL.createObjectURL(watch('thumbnail')) : `${IMAGE_URL}/${watch('thumbnail')}` } 
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