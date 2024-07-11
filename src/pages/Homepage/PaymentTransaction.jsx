import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import Table from "components/Table/Table"
import { invoiceApi } from "libs/api"
import { MdPayments } from "react-icons/md"

const colnames = [
  { name: "Transaction Id", key: "transaction_code" },
  { name: "Invoice Id", key: "invoice_id" },
  { name: "Collection Id", key: 'collection_id' },
  { name: "Payment Gateway", key: "gateway" },
  { name: "Payment Date", key: "create_at", type: "datetime" },
  { name: "Status", key: 'status', type: 'custom-status', options: { "0": "Transaction Error", "1": "Complete"} }
]

const gatewayList = {
  "1": "ESEWA GATEWAY",
  '2': "KHALTI GATEWAY",
  '3': "FONE-PAY GATEWAY"
}

const PaymentTransaction = () => {
  const { data, isLoading } = invoiceApi.transaction()
  return (
    <>
      <BreadHeader  icon={<MdPayments />} title="Payment Transaction" subtitle="All payment transaction list are here." />
      <br />
      <Container>
        <Table
          colnames={colnames}
          data={!isLoading && Array.isArray(data) ? data.map((item) => {
            const gateway = gatewayList[item.gateway] ?? 'UNKNOWN'
            return { ...item, gateway }
          }) : []}
          isLoading={isLoading}
          searchBy={['transaction_id', 'invoice_id', 'collection_id']}
        />
      </Container>
    </>
  )
}

export default PaymentTransaction