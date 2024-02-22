import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container'
import CategoryForm from 'components/Form/CategoryForm/CategoryForm'
import Spinner from 'components/Spinner/Spinner'
import { categoryApi } from 'libs/api'
import { displayError } from 'libs/getError'
import toast from 'react-hot-toast'
import { MdOutlineCategory } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'

const UpdateCategory = () => {
  const [query] = useSearchParams()
  const id = query.get('id') 
  const { data: category, isLoading, error, mutate } = categoryApi.swrFetchById(id)
  const __updateCategory = async(formdata) => {
    try {
      const res = await categoryApi.updateById(id, formdata)
      if(res.status === 200){
        toast.success("Category updated")
        mutate((prev) => ({ ...prev, ...res.data }), false)
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }
    
  if(error) return displayError(error)
  return (
    <section className='my-2'>
      <BreadHeader icon={<MdOutlineCategory />} title="Create Category" path={'/products/category'} subtitle="create category here." />

      <br />
      <Container>
        {isLoading ? <Spinner /> : 
        <CategoryForm categoryData={category} onSubmit={__updateCategory} type="update" />}
      </Container>
    </section>
  )
}

export default UpdateCategory