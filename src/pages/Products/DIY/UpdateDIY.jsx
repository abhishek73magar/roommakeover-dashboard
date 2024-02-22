import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import HobbieProductForm from "components/Form/HobbieForm/HobbieProductForm"
import Spinner from "components/Spinner/Spinner"
import { diyProductApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { IoMusicalNoteOutline } from "react-icons/io5"
import { useSearchParams } from "react-router-dom"

const UpdateDIY = () => {
  const [query] = useSearchParams()
  const id = query.get('id')
  const { data, isLoading, mutate } = diyProductApi.swrFetch(id)

  const __updateDIYProduct = async(formData) => {
    try {
      const res = await diyProductApi.updateById(id, formData)
      if(res.status === 200){
        mutate((prev) => ({ ...prev, ...res.data }), false)
        toast.success("DIY Product Updated")
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }

  return (
    <section className='my-2'>
       <BreadHeader path="/products/diy" icon={<IoMusicalNoteOutline />} title="Update DIY Product" subtitle="Update DIY product here." />

      <br />
      <Container>
       {isLoading ? <Spinner /> : <HobbieProductForm objData={data} onSubmit={__updateDIYProduct} type="update" hobbieForm={false} />}
      </Container>
    </section>
  )
}

export default UpdateDIY