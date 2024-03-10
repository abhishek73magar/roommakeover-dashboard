import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import Table from "components/Table/Table";
import { adminApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { PiUserLight } from "react-icons/pi";

const colnames = [
  { name: "Fullname", key: "fullname"},
  { name: "Email", key: "email"},
  { name: "Status", key: "status", type: "access-status"},
  { name: "action", key: '', type: 'action'}
]

const Profile = () => {
  const { data, isLoading, mutate } = adminApi.swrFetch()
  
  const __removeAdmin = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await adminApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Admin removed !")
    } catch (error) {
      displayError(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader icon={<PiUserLight />} addNew="profile/create" title="Profile" subtitle="Profile details are here." />
      
      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data : []}
          isLoading={isLoading} 
          onDelete={__removeAdmin}
          searchBy={['fullname', 'email']}
          slug={'profile/update?id='}
        />
      </Container>
    </section>
  )
}

export default Profile