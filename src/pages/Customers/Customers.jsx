import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import Table from "components/Table/Table";
import { customerApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { FiUsers } from "react-icons/fi";

const colnames = [
  { name: "Fullname", key: "fullname", type: "heading"},
  { name: "Email", key: "email"},
  { name: "Phonenumber", key: "phonenumber"},
  { name: "Gender", key: "gender"},
  { name: "Date of Birth", key: "dateofbirth"},
  { name: "action", key: '', type: 'action'}
]

const Customers = () => {
  const { data, isLoading, mutate } = customerApi.swrFetch()

  const __removeCustomer = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await customerApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Customization product removed !")
    } catch (error) {
      displayError(error)
    }
  }


  return (
    <section className='my-2'>
      <BreadHeader icon={<FiUsers />} title="Customers List" subtitle="All customers are here." />
      
      <br />
      <Container>
      <Table  
        colnames={colnames} 
        data={ data && Array.isArray(data) ? data.map((item) => {
          const fullname = `${item.firstname} ${item.lastname}`
          return { ...item, fullname }
        }) : []}
        isLoading={isLoading} 
        onDelete={__removeCustomer}
        searchBy={['fullname', 'email']}
        slug={'update?id='}
        disableEdit={true}
        />
      </Container>
    </section>
  )
}

export default Customers