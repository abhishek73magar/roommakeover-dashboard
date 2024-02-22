import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { categoryApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { MdOutlineCategory } from "react-icons/md";

const colnames = [
  { name: "Image", key: "url", type: "image"},
  { name: "Name", key: "name", type: "heading"},
  { name: "action", key: '', type: 'action'}
]

const Category = () => {
  const { data, isLoading, mutate } = categoryApi.swrFetch()

  const __removeCategory = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await categoryApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Category removed !")
    } catch (error) {
      displayError(error)
    }
  }

  return (
    <section className='my-2'>
      <BreadHeader icon={<MdOutlineCategory />} title="Category List" addNew={'create'} subtitle="All category list are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const url = `${IMAGE_URL}/${item.imagesrc}`
            return { ...item, url }
          }) : []}
          isLoading={isLoading} 
          onDelete={__removeCategory}
          searchBy={['name']}
          slug={'update?id='}
        />
      </Container>
    </section>
  )
}

export default Category