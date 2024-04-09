import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import DataNotFound from 'components/DataNotFound/DataNotFound'
import Spinner from 'components/Spinner/Spinner'
import { IMAGE_URL } from 'config'
import { displayError } from 'libs/getError'
import moment from 'moment'
import { CiShoppingBasket } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import Selectbox from 'components/Form/FormElement/Selectbox'
import { twMerge } from 'tailwind-merge'
import { orderApi } from 'libs/api'
import propTypes from 'prop-types'
import Container from 'components/Common/Container'

const OrderInfo = () => {
  const params = useParams()
  const collection_id = params.collection_id
  const { data, isLoading, mutate } = orderApi.swrFetch(collection_id)

  return (
    <section className='my-2'>
      <BreadHeader path={'/home/orders'} icon={<CiShoppingBasket />} title="Order Info" subtitle={`#${collection_id}`} />
      
      <br />
      <Container>
        {isLoading ? <Spinner /> : <Info data={data} mutate={mutate}  />}
      </Container>
    </section>
  )
}

export default OrderInfo


const Info = ({ data, mutate }) => {
  let { orders, billing } = data
  // const [orders, setOrders] = useState(orderList|| [])
  const changeStatus = async(order_id, value) => {
    try {
      const req = await orderApi.statusUpdate(order_id, { status: value })
      if(req.status === 200) {
        // toast.success("status update")
        mutate((prev) => {
          prev.orders = prev.orders.map((item) => {
            if(item.id === order_id) item.status = value
            return {...item };
          })
          return { ...prev }
        }, false)
      }
    } catch (error) { displayError(error) }
  }
  if(!orders || !Array.isArray(orders) || orders.length === 0) return <DataNotFound />;
  return (
    <article className=''>
      <div className="text-sm text-left mb-2">{moment(orders[0].date).format('DD MMM YYYY || hh:mm a')}</div>
      <div className='grid md:grid-cols-7 gap-3'>
        <div className="col-span-7 md:col-span-5 overflow-auto">
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
              {orders
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item, indx) => {
                return (
                  <tr key={indx} className='even:bg-slate-100 hover:bg-slate-50 cursor-pointer'>
                    <td className='px-2 py-2 text-left'>
                      <div className='flex flex-row gap-2 justify-start items-start'>
                        <div className='w-[80px] min-w-[80px] relative'>
                          <img src={`${IMAGE_URL}/${item.url}`} alt="product-image" className='w-full h-full object-cover object-center' />
                        </div>
                        <div className='flex-grow flex flex-col gap-0.5 items-start justify-start'>
                          <div className='font-semibold capitalize'>{item.title}</div>
                          <div className=''>#{item.id}</div>
                          {item.color && <div className='flex flex-row justify-start items-center gap-2 text-xs'>
                            Color: 
                            <span className='h-[12px] w-[12px] rounded-full' style={{ backgroundColor: `${item.color}`}}></span>
                          </div>}
                        </div>
                      </div>
                    </td>

                    <td className='px-2 py-2 text-left align-baseline min-w-[100px]'>
                      <OrderStatus  statusCode={item.status.toString()} order_id={item.id} onChange={changeStatus} />
                    </td>
                    <td className='px-2 py-2 text-left align-baseline'>{item.qty}</td>
                    <td className='px-2 py-2 text-left align-baseline w-[100px]'>Rs. {item.price}</td>
                    <td className='px-2 py-2 text-left align-baseline w-[100px]'>Rs. {+item.qty * item.price}</td>
                  </tr>
                )
              })}

              <tr className='border-t'>
                <td colSpan={4} className='px-2 py-2 text-left'>Shipping Charge: </td>
                <td className='px-2 py-2 text-left'>Rs. 0</td>
              </tr>
              <tr className='border-t'>
                <td colSpan={4} className='px-2 py-2 text-left'>Total: </td>
                <td className='px-2 py-2 text-left'>Rs. {orders.reduce((prev, curr) => prev += +curr.qty * curr.price, 0)}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="col-span-7 md:col-span-2">
          <div className='text-sm border p-4'>
            <div className='font-semibold'>Billing Address</div>
            <div className='capitalize'>{billing.fullname}</div>
            <div className='capitalize'>{billing.phonenumber}</div>

            <div className='font-semibold mt-2'>Shipping Address</div>
            <div className='capitalize'>{billing.address}</div>
            <div className='capitalize'>{billing.other_details}</div>

            <div className='font-semibold mt-2'>Payment Method</div>
            <div className='capitalize'>(None)</div>
          </div>
        </div>
      </div>
      
    </article>
  )
}

Info.propTypes = {
  data: propTypes.object,
  mutate: propTypes.func
}


const statusList = [
  { name: "Canncelled", value: "0" },
  { name: "Pending", value: "1" },
  { name: "Verify", value: "2" },
  { name: "Crafting", value: "3" },
  { name: "Shipping", value: "4" },
  { name: "Completed", value: "5" },
]

const colors = {
  "0" : "bg-red-500",
  "1" : "bg-slate-200 text-secondary",
  "2" : "bg-blue-500",
  "3" : "bg-blue-500",
  "4" : "bg-blue-500",
  "5" : "bg-primary",
}

const OrderStatus = ({ onChange, statusCode, order_id }) => {
  return (
    <div>
        <Selectbox 
          list={statusList} 
          name="status"
          option={{ label: 'name', value: 'value'}} 
          value={statusCode} 
          onChange={(_, value) => onChange(order_id, value)} 
          className={twMerge(`text-white rounded-md`, colors[statusCode])}
          divClassname={'border-none'}
        />
    </div>
  )
}

OrderStatus.propTypes = {
  onChange: propTypes.func,
  statusCode: propTypes.string,
  order_id: propTypes.string
}