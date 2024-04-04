import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import Inputbox from "components/Form/FormElement/Inputbox"
import { googleApi } from "libs/api"
import { displayError } from "libs/getError"
import { useForm } from "react-hook-form"
import { AiOutlineMail } from "react-icons/ai"

const EmailConfig = () => {
  const { register, handleSubmit } = useForm()


  const __generateRefreshToken = (formdata) => {
    googleApi.generateUrl(formdata)
      .then(res => {
        console.log(res.data)
        window.open(res.data, '_blank')        
      }).catch(displayError)
  }
  return (
    <section className='my-2'>
      <BreadHeader icon={<AiOutlineMail />}  title="Email Configuration" subtitle="Email Configuration for sent email." />
      
      <br />
      <Container>
        <form method="post" onSubmit={handleSubmit(__generateRefreshToken)}>
          <Inputbox label={"Client ID"} register={register('client_id')} placeholder="Client ID" />
          <Inputbox label={"Client Secret"} register={register('client_secret')} placeholder="Client Secret" />
          <Inputbox label={"Redirect URL"} register={register('redirect_url')} placeholder="Redirect URL" />
          <Inputbox label={"Admin Email"} register={register('admin_email')} placeholder="Admin Email" />

          <button className="w-full px-2 py-2 bg-primary text-white hover:opacity-80 rounded-md">Generate Refresh Token</button>
        </form>
      </Container>
    </section>
  )
}

export default EmailConfig