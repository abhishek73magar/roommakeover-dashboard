import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { diyProductApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { VscTools } from "react-icons/vsc";

const colnames = [
  { name: "Image", key: "thumbnail", type: "image"},
  { name: "Title", key: "title", type: "heading"},
  { name: "status", key: "status", type: 'status'},
  { name: "action", key: '', type: 'action'}
]

const DIYPage = () => {
  const { data, isLoading, mutate } = diyProductApi.swrFetch()

  const __removeDIYProduct = async(id) => {
    try {
      const confim = window.confirm("Are you sure ?")
      if(!confim) return;
      
      await diyProductApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Product removed !")
    } catch (error) {
      return displayError(error)
    }
  }
  return (
    <section className='my-2'>
       <BreadHeader icon={<VscTools />} addNew='create' title="DIY Product" subtitle="All DIY product are here." />

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
          onDelete={__removeDIYProduct}
        />
      </Container>
    </section>
  )
}

export default DIYPage
