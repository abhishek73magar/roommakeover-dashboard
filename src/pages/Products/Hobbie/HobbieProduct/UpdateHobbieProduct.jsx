import BreadHeader from "components/Breadcrumbs/BreadHeader"
import HobbieProductForm from "components/Form/HobbieForm/HobbieProductForm"
import Spinner from "components/Spinner/Spinner"
import { hobbieProductApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { IoMusicalNoteOutline } from "react-icons/io5"
import { useSearchParams } from "react-router-dom"

const UpdateHobbieProduct = () => {
  const [query] = useSearchParams()
  const id = query.get('id')
  const { data, isLoading, mutate } = hobbieProductApi.swrFetch(id)

  const __updateHobbieProduct = async(formData) => {
    try {
      const res = await hobbieProductApi.updateById(id, formData)
      if(res.status === 200){
        mutate((prev) => ({ ...prev, ...res.data }), false)
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
       <BreadHeader path="/products/hobbie-product" icon={<IoMusicalNoteOutline />} title="Update Hobbie Product" subtitle="Update hobbie product here." />

      <br />
      <article className="p-4 bg-white">
       {isLoading ? <Spinner /> : <HobbieProductForm objData={data} onSubmit={__updateHobbieProduct} type="update" />}
      </article>
    </section>
  )
}

export default UpdateHobbieProduct