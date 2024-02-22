import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import ProfileForm from "components/Form/ProfileForm/ProfileForm";
import { adminApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { PiUserLight } from "react-icons/pi";

const CreateProfile = () => {
  
  const __createProfile = async(data) => {
    try {
      const res = await adminApi.post(data)
      if(res.status === 201){
        toast.success("Admin created succssfully")
        return res.data
      }
    } catch (error) {
      displayError(error)
    }
  } 

  return (
    <section className='my-2'>
      <BreadHeader icon={<PiUserLight />} path="/setting" title="Profile" subtitle="Profile create are here." />
      
      <br />
      <Container>
        <ProfileForm onSubmit={__createProfile} />
      </Container>
    </section>
  )
}

export default CreateProfile