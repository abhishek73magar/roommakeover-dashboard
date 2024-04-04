import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import HobbieProductForm from "components/Form/HobbieForm/HobbieProductForm"
import { diyProductApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { IoMusicalNoteOutline } from "react-icons/io5"
import { diyObj } from "utils/formObject"

const CreateDIY = () => {

  const __createDIYProduct = async(formData) => {
    try {
      const res = await diyProductApi.post(formData)
      if(res.status === 201){
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
       <BreadHeader path="/products/diy" icon={<IoMusicalNoteOutline />} title="Create DIY Product" subtitle="Create DIY product here." />

      <br />
      <Container>
        <HobbieProductForm objData={diyObj} onSubmit={__createDIYProduct} hobbieForm={false} name="diy" />
      </Container>
    </section>
  )
}

export default CreateDIY