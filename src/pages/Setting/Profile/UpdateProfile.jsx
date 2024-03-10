import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import ProfileForm from "components/Form/ProfileForm/ProfileForm";
import Spinner from "components/Spinner/Spinner";
import { adminApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { PiUserLight } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";

const UpdateProfile = () => {
  const [query] = useSearchParams()
  const id = query.get('id')
  const { data, isLoading, mutate } = adminApi.swrFetch(id)
  
  const __updateProfile = async(data) => {
    try {
      const res = await adminApi.updateById(id, data)

      if(res.status === 200){
        toast.success("Admin update succssfully")
        mutate(prev => ({ ...prev, ...res.data}), false)
        return res.data
      }
    } catch (error) {
      displayError(error)
    }
  } 

  return (
    <section className='my-2'>
      <BreadHeader icon={<PiUserLight />} path="/setting" title="Profile" subtitle="Profile update here." />
      
      <br />
      <Container>
        {isLoading ? <Spinner /> : <ProfileForm onSubmit={__updateProfile} dataObj={data} type="update" />}
      </Container>
    </section>
  )
}

export default UpdateProfile