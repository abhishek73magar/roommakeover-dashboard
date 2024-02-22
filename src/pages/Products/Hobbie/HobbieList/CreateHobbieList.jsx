import BreadHeader from "components/Breadcrumbs/BreadHeader"
import HobbieListForm from "components/Form/HobbieForm/HobbieListForm"
import { hobbieApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { CiMusicNote1 } from "react-icons/ci"

const CreateHobbieList = () => {

  const __addNewHobbie = async(formdata) => {
    try {
      const res = await hobbieApi.post(formdata)
      if(res.status === 201){
        toast.success("Hobbie created")
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader path="/products/hobbie-list" icon={<CiMusicNote1 />} title="Create Hobbie List" subtitle="Create hobbie list here." />

      <br />
      <article className="p-4 bg-white">
        <HobbieListForm onSubmit={__addNewHobbie} />
      </article>
    </section>
  )
}

export default CreateHobbieList