import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import Image from "components/Image/Image"
import Table from "components/Table/Table"
import { IMAGE_URL } from "config"
import { invoiceApi, transactionApi } from "libs/api"
import moment from "moment"
import { FaFileInvoiceDollar } from "react-icons/fa"
import { IoPrintOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import propTypes from 'prop-types'
import Spinner from "components/Spinner/Spinner"
import DataNotFound from "components/DataNotFound/DataNotFound"
import UpdateInvoiceDetails from "./UpdateInvoiceDetails"

const colnames = [
  { name: "Transaction Date", key: "create_at", type: "datetime" },
  { name: "Gateway", key: "gateway" },
  { name: "Transaction Id", key: "transaction_uuid" },
  { name: "Amount", key: "amount", type: 'currency' }
]

const gatewayList = {
  "1": "ESEWA GATEWAY",
  "2": "KHALTI GATEWAY",
  "3": "FONE-PAY GATEWAY"
}

const OrderInvoiceDetails = () => {
  const { invoice_id } = useParams()
  const { data: invoice, isLoading } = invoiceApi.swrFetch(invoice_id)
  const { data:transaction, isLoading: loading } = transactionApi.invoice(invoice_id)
  return (
    <>
      <BreadHeader icon={<FaFileInvoiceDollar />} title="Order Invoice Details" subtitle="Order Invoice Details are here." path="/home/order-invoice" />
      <br />
      <Container>
        {!isLoading && !loading && !!invoice 
        ? <InvoiceInfo invoice={invoice} transaction={Array.isArray(transaction) ? transaction.map((item) => {
          const gateway = gatewayList[item.gateway] ?? "UNKNOWN"
          return { ...item, gateway };
        }) : []}  /> 
        : isLoading || loading ? <Spinner /> : <DataNotFound />}
      </Container>
    </>
  )
}

export default OrderInvoiceDetails

const InvoiceInfo = ({ invoice, transaction }) => {
  return (
    <article>
      <UpdateInvoiceDetails />
      <div className="flex flex-row justify-end items-center">
        <Link to="?add=transaction" className="text-sm py-2 px-2 bg-primary text-white rounded-md mb-2 hover:bg-opacity-85">Create Transaction</Link>
      </div>
      <article className="border mx-auto max-w-[1000px] p-4 print-content">
        <div className="flex flex-row justify-between items-center">
        <div>
          <div></div>
          <div className="text-lg">Invoice #{invoice.id}</div>
        </div>
        <div className="text-center">
          <div className={`${invoice.status === '1' ? "text-primary" : "text-red-500"} font-semibold text-2xl`}>{invoice.status === '1' ? "PAID" : "UNPAID"}</div>
          {invoice.status === '1' && <div className="text-sm">{moment(invoice.paid_at).format('DD MMM, YYYY hh:mm a')}</div>}
        </div>
      </div>
      <hr className="my-4" />

      <div className="mb-3">
        <div className="font-semibold">Invoice Date</div>
        <div className="text-sm">{moment(invoice.create_at).format('DD MMM, YYYY hh:mm a')}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-sm">
          <div className="font-semibold text-base">Invoice To</div>
          <div className='capitalize'>{invoice.billing?.fullname}</div>
          <div>{invoice.billing?.address}</div>
          <div className='text-justify max-w-[80%]'>{invoice.billing?.other_details}</div>
          <div>{invoice.billing?.phonenumber}</div>
        </div>
        <div>
          <div className="font-semibold">Pay To</div>
          <div className="text-sm">Roommakeover NP</div>
          <div className="text-sm">Kathmandu Nepal</div>
        </div>
      </div>
      
      <br />
      <article className='border-t my-2'>
        <div className='font-semibold text-xl py-2 px-2 bg-gray-100'>Invoice Item</div>
        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr className='text-left border'>
              <th className='px-2 py-2'>Image</th>
              <th className='px-2 py-2'>Item</th>
              <th className='px-2 py-2'>Quantity</th>
              <th className='px-2 py-2'>Price</th>
              <th className='px-2 py-2 border'>Amount</th>
            </tr>
          </thead>

          <tbody>
            {!!invoice && Array.isArray(invoice.orders)
            && invoice.orders.map((item) => {
              return (
                <tr key={item.id} className='border'>
                  <td className='px-2 py-2'>
                    <div className='relative'>
                      <Image 
                        src={`${IMAGE_URL}/${item.url}`} 
                        alt='thumbnail' 
                        className='h-[50px] w-[50px] object-cover object-center' 
                      />
                    </div>
                  </td>
                  <td className='px-2 py-2'>
                    <Link 
                      to={`/shop/details/${item.title.replace(/ /g, '-').toLowerCase()}`} 
                      className='hover:underline'
                      target='_blank'
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className='px-2 py-2'>{item.qty}</td>
                  <td className='px-2 py-2'>Rs. {item.price}</td>
                  <td className='px-2 py-2 border w-[90px]'>Rs. {item.price * item.qty}</td>
                </tr>
              )
            })}
          </tbody>

          <tfoot>
            <tr className=''>
              <td className='px-2 py-2 text-right font-semibold border' colSpan={4}>Sub Total: </td>
              <td className='px-2 py-2 border'>Rs. {invoice.subtotal}</td>
            </tr>
            <tr className='border'>
              <td className='px-2 py-2 text-right font-semibold border' colSpan={4}>Shipping Charge: </td>
              <td className='px-2 py-2 border'>Rs. {invoice.shipping_charge}</td>
            </tr>
            <tr className=''>
              <td className='px-2 py-2 text-right font-semibold border' colSpan={4}>Discount Price: </td>
              <td className='px-2 py-2 border'>Rs. {invoice.discount}</td>
            </tr>
            <tr className=''>
              <td className='px-2 py-2 text-right font-semibold border' colSpan={4}>Total: </td>
              <td className='px-2 py-2 border'>Rs. {invoice.total}</td>
            </tr>
          </tfoot>
        </table>
      </article>
      <br />

      <Table 
        colnames={colnames}
        data={transaction}
        isLoading={false}
        disableSearch={true}
      />

      <br />
      <div className='flex flex-row justify-end items-center w-full border-collapse not-print'>
        <button
          onClick={() => window.print()} 
          className='flex flex-row justify-center items-center gap-1 px-2 py-1 shadow-md text-sm border border-r-0 hover:bg-slate-100'
        >
          <IoPrintOutline />
          <span>Print</span>
        </button>
      </div>
    </article>
  </article>
    
  )
}

InvoiceInfo.defaultProps = {
  invoice: {},
  transaction: []
}

InvoiceInfo.propTypes = {
  invoice: propTypes.object,
  transaction: propTypes.array
}