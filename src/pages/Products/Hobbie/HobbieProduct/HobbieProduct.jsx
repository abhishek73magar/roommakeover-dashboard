import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { hobbieProductApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { IoMusicalNoteOutline } from "react-icons/io5";

const colnames = [
  { name: "ID", key: "id"},
  { name: "Image", key: "thumbnail", type: "image"},
  { name: "Title", key: "title", type: "heading"},
  { name: "category", key: "category"},
  { name: "status", key: "status", type: 'status'},
  { name: "action", key: '', type: 'action'}
]

const HobbieProduct = () => {
  const { data, isLoading, mutate } = hobbieProductApi.swrFetch()

  const __removeHobbieProduct = async(id) => {
    try {
      const confim = window.confirm("Are you sure ?")
      if(!confim) return;
      
      await hobbieProductApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Product removed !")
    } catch (error) {
      return displayError(error)
    }
  }
  return (
    <section className='my-2'>
       <BreadHeader addNew='create' icon={<IoMusicalNoteOutline />} title="Hobbie Product" subtitle="All hobbie product are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const thumbnail = `${IMAGE_URL}/${item.thumbnail}`
            return { ...item, thumbnail }
          }) : []}
          isLoading={isLoading} 
          searchBy={['title']}
          slug={'update?id='}
          onDelete={__removeHobbieProduct}
        />
      </Container>
    </section>
  )
}

export default HobbieProduct
