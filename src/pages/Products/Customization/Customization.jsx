import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { customizationApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { MdOutlineCategory } from "react-icons/md";
import { Link } from 'react-router-dom';

const colnames = [
  { name: "Image", key: "url", type: "image"},
  { name: "Name", key: "title", type: "heading"},
  { name: "", key: "view"},
  { name: "action", key: '', type: 'action'}
]

const Customization = () => {
  const { data, isLoading, mutate } = customizationApi.swrFetch()

  const __removeCustomization = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await customizationApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Customization product removed !")
    } catch (error) {
      displayError(error)
    }
  }

  return (
    <section className='my-2'>
      <BreadHeader icon={<MdOutlineCategory />} title="Customization Product" subtitle="All Customization product list are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const url = `${IMAGE_URL}/${item.url}`
            const view = <Link to={item.id} className='text-primary hover:underline'>View</Link>
            return { ...item, url, view }
          }) : []}
          isLoading={isLoading} 
          onDelete={__removeCustomization}
          searchBy={['title']}
          slug={'update?id='}
          disableEdit={true}
        />
      </Container>
    </section>
  )
}

export default Customization