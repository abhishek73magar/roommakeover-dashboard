import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import Table from 'components/Table/Table';
import { IMAGE_URL } from 'config'
import { hobbieApi } from 'libs/api';
import { displayError } from 'libs/getError';
import toast from 'react-hot-toast';
import { CiMusicNote1 } from "react-icons/ci";

const colnames = [
  { name: "Image", key: "thumbnail", type: "image"},
  { name: "Name", key: "name", type: "heading"},
  { name: "action", key: '', type: 'action'}
]

const HobbieList = () => {
  const { data, isLoading, mutate } = hobbieApi.swrFetch()
  const __removeHobbie = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await hobbieApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Hobbie removed !")
    } catch (error) {
      displayError(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader addNew='create' icon={<CiMusicNote1 />} title="Hobbie List" subtitle="All hobbie list are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const thumbnail = `${IMAGE_URL}/${item.thumbnail}`
            return { ...item, thumbnail }
          }) : []}
          isLoading={isLoading} 
          searchBy={['name']}
          slug={'update?id='}
          onDelete={__removeHobbie}
        />
      </Container>
    </section>
  )
}

export default HobbieList