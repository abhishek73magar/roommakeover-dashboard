import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import BlogForm from 'components/Form/BlogForm/BlogForm';
import Spinner from 'components/Spinner/Spinner';
import { blogApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { PiNewspaperClippingLight } from "react-icons/pi";
import { useNavigate, useSearchParams } from 'react-router-dom';

const UpdateBlog = () => {
  const [query] = useSearchParams()
  const id = query.get('id') 
  const { data, isLoading, mutate } = blogApi.swrFetchById(id)
  const navigate = useNavigate()
  if(!id) return navigate("/blog")
  
  const __updateBlog = async(formData) => {
    try {
      const res = await blogApi.updateById(id, formData)
      if(res.status === 200){
        toast.success("Blog updated")
        mutate((prev) => ({ ...prev, ...res.data }), false)
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader icon={<PiNewspaperClippingLight />} path='/blog' title="Create BLog" subtitle="Create blog here." />

      <br />
      <Container>
        {isLoading ? <Spinner /> : <BlogForm objData={data} onSubmit={__updateBlog} type='update' />}
      </Container>
    </section>
  )
}

export default UpdateBlog