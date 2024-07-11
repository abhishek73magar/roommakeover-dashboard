import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import Table from "components/Table/Table"
import { invoiceApi } from "libs/api"
import { FaFileInvoiceDollar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const colnames = [
  { name: "Invoice Id", key: "id" },
  { name: "Collection Id", key: 'collection_id' },
  { name: "Invoice Date", key: "create_at", type: 'datetime' },
  { name: "User", key: "user" },
  { name: "Status", key: "status", type: 'custom-status', options: { '0': "Unpaid", '1': "Paid"} },

]

const OrderInvoice = () => {
  const { data, isLoading } = invoiceApi.swrFetch()
  const navigate = useNavigate()

  const __onClick = (invoice) => navigate(invoice.id)

  return (
    <>
      <BreadHeader  icon={<FaFileInvoiceDollar />} title="Order Invoice" subtitle="All order invoice list are here." />
      <br />
      <Container>
        <Table 
          colnames={colnames}
          data={!isLoading && Array.isArray(data) ? data : []}
          isLoading={isLoading}
          searchBy={['id', 'collection_id', 'user']}
          onClick={__onClick}
        />
      </Container>
    </>
  )
}

export default OrderInvoice