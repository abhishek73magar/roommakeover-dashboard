import { profileStatusOption } from "utils/selectOption"
import Inputbox from "../FormElement/Inputbox"
import Selectbox from "../FormElement/Selectbox"
import { profileObj } from "utils/formObject"
import Button from "../FormElement/Button"
import { AiOutlineSave } from "react-icons/ai"
import propTypes from 'prop-types'
import { useForm } from "react-hook-form"
import { zodError } from "libs/zodError"
import { zodResolver } from '@hookform/resolvers/zod'
import { addAdminFormSchema, updateAdminFormSchema } from "utils/formSchema"
import ToggleButton from "../FormElement/ToggleButton"

const ProfileForm = ({ onSubmit, dataObj, type }) => {
  const adminFormSchema = type === 'update' ? updateAdminFormSchema : addAdminFormSchema
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({ resolver: zodResolver(adminFormSchema), defaultValues: dataObj, mode: 'onChange' })

  const __onSumbit = (formData) => {
    delete formData.cpassword   

    return onSubmit(formData)
      .then((response) => {
        if(response){
          if(type === 'update') reset({...profileObj, ...response, new_password: ""})
          else { reset() } 
        }
        
      })
  }

  const __selectInputChange = (name, value) => {
    setValue(name, value)
    // return trigger(name)
  }

  return (
    <form method="post" onSubmit={handleSubmit(__onSumbit)}>
    <div className="grid md:grid-cols-2 gap-x-4">
      <Inputbox 
        label={"Fullname"} 
        error={zodError(errors, 'fullname')} 
        register={register("fullname")} 
        placeholder="Fullname" 
      />
      <Inputbox 
        label={'Email'} 
        error={zodError(errors, 'email')} 
        register={register("email")} 
        placeholder="Email" 
      />
      <Inputbox 
        label={'Password'} 
        error={zodError(errors, 'password')} 
        type="password" 
        register={register('password')} 
        placeholder="Password"
      />
      {type === 'update' && 
      <Inputbox 
        label={'New Password'} 
        error={zodError(errors, 'new_password')} 
        type="password" 
        register={register('new_password')} 
        placeholder="New Password" 
      />}
      <Inputbox 
        label={'Confirm Password'} 
        error={zodError(errors, 'cpassword')} 
        type="password" 
        register={register('cpassword')} 
        placeholder="Confirm Password" 
      />
      <Selectbox
        label={'Status'}
        error={zodError(errors, 'status')}
        list={profileStatusOption}
        option={{ label: 'name', value: 'value'}}
        value={watch('status') || null}
        onChange={__selectInputChange}
        name={'status'}
      />
      <div className="flex flex-col justify-center">
        <ToggleButton label={'Order Email'} labelClassname={'font-bold'} register={register('order_email')} />
      </div>
    </div>

    <div className='flex flex-row justify-end items-center mt-4'>
      <Button type="submit" icon={<AiOutlineSave className='text-lg' />}>Save</Button>
    </div>
  </form>
  )
}

ProfileForm.propTypes = {
  onSubmit: propTypes.func,
  dataObj: propTypes.object,
  type: propTypes.string
}

ProfileForm.defaultProps = {
  onSubmit: () => {},
  dataObj: profileObj,
  type: 'new'
}

export default ProfileForm