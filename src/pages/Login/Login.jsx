import Checkbox from "components/Form/FormElement/Checkbox"
import Inputbox from "components/Form/FormElement/Inputbox"
import { adminApi } from "libs/api"
import { displayError } from "libs/getError"
import { DECODE_TOKEN, SETAUTH_TOKEN } from "libs/jwtToken"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "utils/formSchema"
import { zodError } from "libs/zodError"

const Login = () => {
  // const [data, setData] = useState({ email: "", password: "", stay: false })
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) })
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const __onSubmit = async(data) => {
    try {
      setIsLoading(true)
      const res = await adminApi.login(data)
      if(res.status === 200){
        SETAUTH_TOKEN(res.data.token)
        DECODE_TOKEN()
        setIsLoading(false)
        return navigate(-1)
      }
    } catch (error) {
      setIsLoading(false)
      displayError(error)
    }
  }


  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(__onSubmit)} method="post" className="w-[95%] max-w-[450px]">
        <div className="p-8 bg-white rounded-md flex flex-col justify-center items-start gap-4">
          <div className="">
            <div className="text-2xl font-bold text-primary">Login</div>
            <div className="text-sm pt-1">Welcome to roommakeover admin panel</div>

          </div>
          <div className="w-full">
            <Inputbox label={"Email"} error={zodError(errors, 'email')} register={{...register("email")}} placeholder="Email"  />
            <Inputbox label={"Password"} type={'password'} error={zodError(errors, 'password')} register={{...register('password')}} placeholder="Password" autoComplete={"true"}  />
            
            <Checkbox label={"Remember me"} register={{...register('stay')}} />
          </div>
          

          <button 
            type="submit" 
            className="w-full flex flex-col justify-center items-center px-3 py-2 rounded-md text-sm text-white bg-primary hover:opacity-80 focus:outline-primary"
            disabled={isLoading }
          >
            {isLoading ? <TbLoader3 className="animate-spin text-lg" /> : "Login"}
          </button>
        </div>
       

      </form>

    </section>
  )
}

export default Login