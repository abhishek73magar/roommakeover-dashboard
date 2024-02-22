import { profileStatusOption } from "utils/selectOption"
import Inputbox from "../FormElement/Inputbox"
import Selectbox from "../FormElement/Selectbox"
import { useState } from "react"
import { profileObj } from "utils/formObject"
import Button from "../FormElement/Button"
import { AiOutlineSave } from "react-icons/ai"
import propTypes from 'prop-types'
import toast from "react-hot-toast"

const ProfileForm = ({ onSubmit, dataObj, type }) => {
  const [data, setData] = useState({ ...dataObj })

  const __inputHandle = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value}))
  }

  const __onSumbit = (e) => {
    e.preventDefault()
    if(data.password !== '' && data.password !== data.cpassword){ return toast.error("Confirm Password doesn't match") }
    delete data.cpassword   

    return onSubmit(data).then((response) => {
      if(type === 'update') setData((prev) => ({...prev, ...response }))
      else { setData((prev) => ({ ...prev, ...profileObj}))} 
    })
  }

  return (
    <form method="post" onSubmit={__onSumbit}>
    <div className="grid md:grid-cols-2 gap-x-4">
      <Inputbox label={"Fullname"} name="fullname" value={data.fullname} onChange={__inputHandle} placeholder="Fullname" />
      <Inputbox label={'Email'} name="email" value={data.email} onChange={__inputHandle} placeholder="Email" />
      <Inputbox label={'Password'} type="password" name="password" value={data.password} onChange={__inputHandle} placeholder="Password" />
      <Inputbox label={'Confirm Password'} type="password" value={data.cpassword} onChange={__inputHandle} name="cpassword" placeholder="Confirm Password" />
      <Selectbox
        label={'Status'}
        list={profileStatusOption}
        option={{ label: 'name', value: 'value'}}
        value={data.status || null}
        onChange={(name, value) => setData((prev) => ({ ...prev, [name]: value }))}
        name={'status'}
      />
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