import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import BlogForm from 'components/Form/BlogForm/BlogForm';
import { blogApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { PiNewspaperClippingLight } from "react-icons/pi";

const CreateBlog = () => {
  const __createBlog = async(formData) => {
    try {
      await blogApi.post(formData)
      toast.success("product created")
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
        <BlogForm onSubmit={__createBlog} />
      </Container>
    </section>
  )
}

export default CreateBlog