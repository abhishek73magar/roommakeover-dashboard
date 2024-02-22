import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container'
import CategoryForm from 'components/Form/CategoryForm/CategoryForm'
import { categoryApi } from 'libs/api'
import { displayError } from 'libs/getError'
import toast from 'react-hot-toast'
import { MdOutlineCategory } from 'react-icons/md'

const CreateCategory = () => {
  const __addNewCategory = async(formdata) => {
    try {
      const res = await categoryApi.post(formdata)
      if(res.status === 201){
        toast.success("Category created")
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }
    

  return (
    <section className='my-2'>
      <BreadHeader icon={<MdOutlineCategory />} title="Create Category" path={'/products/category'} subtitle="create category here." />

      <br />
      <Container>
        <CategoryForm onSubmit={__addNewCategory} />
      </Container>
    </section>
  )
}

export default CreateCategory