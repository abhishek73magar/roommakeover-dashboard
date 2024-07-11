import Table from 'components/Table/Table'
import { IMAGE_URL } from 'config'
import { invoiceApi } from 'libs/api'
import { getError } from 'libs/getError'
import propTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const colnames = [
  { name: "Invoice Id #", key: "id" },
  { name: "Invoice Date", key: 'create_at', type: 'datetime'},
  { name: "Paid Date", key: 'paid_at', type: 'datetime'},
  { name: "Shipping", key: 'shipping_charge', type: 'currency'},
  { name: "Discount", key: 'discount', type: 'currency'},
  { name: "Total", key: "total", type: 'currency'},
  { name: "Status", key: "status", type: "custom-status", options: { "0": "Unpaid", "1": "Paid" }},
  { name: "Action", key: "", type: "action"}
]

const OrderInvoice = ({ data, isLoading, mutate }) => {
  const navigate = useNavigate()

  const __onDelete = async(id) => {
    try {
      const confirm = window.confirm("Are you sure ?")
      if(!confirm) return null;
      const request = await toast.promise(invoiceApi.remove(id), {
        loading: "deleting",
        success: "Invoice removed successfully",
        error: (err) => getError(err)
      })
      if(request.status === 200) mutate((prev) => prev.filter(i => i.id !== id), false)
        
    } catch (error) {
      return console.log(error)
    }
  }

  return (
      <article className='w-full p-2 flex flex-col justify-center items-center z-50 '>
        <div className='container max-w-[1200px] mx-auto px-2 py-2 bg-white rounded-md'>
          <div className='flex flex-row justify-between items-center border-b border-primary pb-2'>
            <div className='text-xl font-semibold text-primary'>Order Invoice: </div>
          </div>
          <article>

            <Table 
              colnames={colnames}
              searchBy={"id"}
              data={data}
              isLoading={isLoading}
              onDelete={__onDelete}
              disableEdit
              onClick={(item) => navigate(`/home/order-invoice/${item.id}`) }

            />

          </article>

         
        </div>
      </article>
  )
}

export default OrderInvoice

OrderInvoice.propTypes = {
  data: propTypes.array,
  isLoading: propTypes.bool,
  mutate: propTypes.func
}

OrderInvoice.defaultProps = {
  data: [],
  isLoading: true,
  mutate: () => {}
}

const OrderInvoiceForm = ({ data }) => {
  return(
    <article className="col-span-7 md:col-span-5 overflow-auto">
    <table className='w-full text-sm'>
      <thead>
        <tr className=''>
          <th className='px-2 py-2 text-left'>Item Summary</th>
          <th className='px-2 py-2 text-left'>Stataus</th>
          <th className='px-2 py-2 text-left'>Quntity</th>
          <th className='px-2 py-2 text-left'>Per Unit</th>
          <th className='px-2 py-2 text-left'>Total</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(data.orders) && data.orders
        .map((item, indx) => {
          return (
            <tr key={indx} className='even:bg-slate-100 hover:bg-slate-50 cursor-pointer'>
              <td className='px-2 py-2 text-left'>
                <div className='flex flex-row gap-2 justify-start items-start'>
                  <div className='w-[80px] min-w-[80px] relative'>
                    <img src={`${IMAGE_URL}/${item.url}`} alt="product-image" className='w-full h-full object-cover object-center' />
                  </div>
                  <div className='flex-grow flex flex-col gap-0.5 items-start justify-start'>
                    <div className='font-semibold capitalize min-w-[150px]'>{item.title}</div>
                    <div className=''>#{item.id}</div>
                    {item.color && <div className='flex flex-row justify-start items-center gap-2 text-xs'>
                      Color: 
                      <span className='h-[12px] w-[12px] rounded-full' style={{ backgroundColor: `${item.color}`}}></span>
                    </div>}
                  </div>
                </div>
              </td>

              <td className='px-2 py-2 text-left align-baseline min-w-[100px]'>
                {/* <OrderStatus  statusCode={item.status.toString()} order_id={item.id} onChange={changeStatus} /> */}
              </td>
              <td className='px-2 py-2 text-left align-baseline'>{item.qty}</td>
              <td className='px-2 py-2 text-left align-baseline w-[100px] min-w-[100px]'>Rs. {item.price}</td>
              <td className='px-2 py-2 text-left align-baseline w-[100px] min-w-[100px]'>Rs. {+item.qty * item.price}</td>
            </tr>
          )
        })}
        <tr>
          <td className='py-4'></td>
        </tr>
        <tr className='border-t'>
          <td colSpan={4} className='px-2 py-2 text-left font-semibold'>Shipping Charge: </td>
          <td className='px-2 py-2 text-left'>Rs. 0</td>
        </tr>
        <tr className='border-t'>
          <td colSpan={4} className='px-2 py-2 text-left font-semibold'>Total: </td>
          <td className='px-2 py-2 text-left'>Rs. {data.orders.reduce((prev, curr) => prev += +curr.qty * curr.price, 0)}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
  </article>
  )
}

OrderInvoiceForm.propTypes = {
  data: propTypes.object
}

OrderInvoiceForm.defaultProps = {
  data: {}
}