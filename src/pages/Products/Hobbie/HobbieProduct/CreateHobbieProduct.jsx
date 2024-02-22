import BreadHeader from "components/Breadcrumbs/BreadHeader"
import HobbieProductForm from "components/Form/HobbieForm/HobbieProductForm"
import { hobbieProductApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { IoMusicalNoteOutline } from "react-icons/io5"

const CreateHobbieProduct = () => {

  const __addHobbieProduct = async(formData) => {
    try {
      const res = await hobbieProductApi.post(formData)
      if(res.status === 201){
        toast.success("Hobbie Product Updated")
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }

  return (
    <section className='my-2'>
       <BreadHeader path="/products/hobbie-product" icon={<IoMusicalNoteOutline />} title="Create Hobbie Product" subtitle="Create hobbie product here." />

      <br />
      <article className="p-4 bg-white">
        <HobbieProductForm onSubmit={__addHobbieProduct}  />
      </article>
    </section>
  )
}

export default CreateHobbieProduct