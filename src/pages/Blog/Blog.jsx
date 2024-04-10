import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { blogApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { PiNewspaperClippingLight } from "react-icons/pi";
import { statusList } from 'utils/selectOption';

const colnames = [
  { name: "Index", key: 'index'},
  { name: "Image", key: "url", type: "image"},
  { name: "Title", key: "title", type: "heading"},
  { name: "Create At", key: "create_time", type: "date-from-now"},
  { name: "Update At", key: "update_time", type: "date-from-now"},
  { name: "Status", key: "status", type: "status"},
  { name: "action", key: '', type: 'action'}
]

const Blog = () => {
  const { data, isLoading, mutate } = blogApi.swrFetch()
  
  const __removeBlog = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await blogApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Blog removed !")
    } catch (error) {
      displayError(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader icon={<PiNewspaperClippingLight />} addNew='create' title="Blog List" subtitle="All blog are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const url = `${IMAGE_URL}/${item.thumbnail}`
            return { ...item, url }
          }) : []}
          isLoading={isLoading} 
          searchBy={['title']}
          statusKey='status'
          statusOptions={[{ name: "All", value: ""}, ...statusList]}
          slug={'update?id='}
          onDelete={__removeBlog}
        />
      </Container>
    </section>
  )
}

export default Blog