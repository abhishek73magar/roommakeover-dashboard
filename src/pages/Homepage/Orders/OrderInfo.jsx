import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import DataNotFound from 'components/DataNotFound/DataNotFound'
import Spinner from 'components/Spinner/Spinner'
import { IMAGE_URL } from 'config'
import { getError } from 'libs/getError'
import moment from 'moment'
import { CiShoppingBasket } from 'react-icons/ci'
import { useParams } from 'react-router-dom'
import Selectbox from 'components/Form/FormElement/Selectbox'
import { twMerge } from 'tailwind-merge'
import { invoiceApi, orderApi } from 'libs/api'
import propTypes from 'prop-types'
import Container from 'components/Common/Container'
import toast from 'react-hot-toast'
import { FaHome } from "react-icons/fa";
import { AiFillShopping } from 'react-icons/ai'
import OrderInvoice from './OrderInvoice'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { useState } from 'react'
import Checkbox from 'components/Form/FormElement/Checkbox'



const OrderInfo = () => {
  const params = useParams()
  const collection_id = params.collection_id
  const { data, isLoading, mutate } = orderApi.swrFetch(collection_id)

  return (
    <section className='my-2'>
      <BreadHeader path={'/home/orders'} icon={<CiShoppingBasket />} title="Order Info" subtitle={`#${collection_id}`} />
      
      <br />
      <Container>
        {isLoading ? <Spinner /> :  
        data ? <Info data={data} mutate={mutate} collection_id={collection_id}  /> : <DataNotFound text='Order Not Found !' />}
      </Container>
    </section>
  )
}

export default OrderInfo




const Info = ({ data, mutate, collection_id }) => {
  const { data: invoiceData, isLoading, mutate: invoiceMutate } = invoiceApi.order(collection_id)

  // const [orders, setOrders] = useState(orderList|| [])
  const [orders, setOrders] = useState(!!data && Array.isArray(data.orders) ? data.orders.filter(i => i.payment_status !== '1') : [])
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)

  const changeStatus = async(order_id, value) => {
    try {
      const req = await toast.promise(orderApi.statusUpdate(order_id, { status: value }), {
        loading: "status updating",
        success: "Done",
        error: (err) => getError(err)
      })
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
    } catch (error) { console.log(getError(error)) }
  }

  const __checkboxHandle = (e, data) => {
    const { checked } = e.target;
    setOrders((prev) => {
    if(checked) return [...prev, data ]
      return prev.filter(i => i.id !== data.id)
    })
 
  }

  const __checkAll = (e) => {
    const { checked } = e.target;
    setOrders(() => {
      if(checked) return data.orders.filter((i) => i.payment_status !== '1')
      return []
    })
  }

  const __createInvoice = async() => {
    try {
      const confirm = window.confirm("Are you sure for creating Invoice?")
      if(!confirm) return null;
      
      const formdata = {
        collection_id, discount,
        shipping_charge: shipping,
        orders: orders.map((i) => i.id),
        user_id: data.user_id
      }
      const request = await toast.promise(invoiceApi.post(formdata), {
        loading: "creating invoice ...",
        success: "Invoice Created successfully !!",
        error: (err) => getError(err)
      })

      if(request.status === 201, request.data){
        const total = request.data.orders.reduce((prev, order_id) => {
          const product = data.orders.find(i => i.id === order_id)
          if(product) {
            prev += (product.qty * product.price)
          }

          return prev;
        }, 0) + (request.data.shipping_charge - request.data.discount)

        invoiceMutate((prev) => ([...prev, { ...request.data, total }]), false)
        setDiscount(0)
        setShipping(0)
      }

    } catch (error) {
      return console.log(error)
    }
  }

  if(!data) return <DataNotFound />;
  return (
    <article className=''>
      <div className="text-sm text-left mb-2">{moment(data.create_at).format('DD MMM YYYY || hh:mm a')}</div>
      <div className='grid md:grid-cols-7 gap-3'>
        <article className="col-span-7 md:col-span-5 overflow-auto">
          <table className='w-full text-sm'>
            <thead>
              <tr className=''>
                <th className='px-2 py-2 text-left'>
                  <Checkbox onChange={__checkAll} checked={Array.isArray(data.orders) ? data.orders.filter(i => i.payment_status !== '1').every((i) => orders.some(o => o.id === i.id)) : false} />
                </th>
                <th className='px-2 py-2 text-left'>Item Summary</th>
                <th className='px-2 py-2 text-left'>Stataus</th>
                <th className='px-2 py-2 text-left'>Quntity</th>
                <th className='px-2 py-2 text-left'>Per Unit</th>
                <th className='px-2 py-2 text-left'>Total</th>
              </tr>
            </thead>

            <tbody>
              {data.orders
              .map((item, indx) => {
                const checked = orders.some((i) => i.id === item.id)
                return (
                  <tr key={indx} className='even:bg-slate-100 hover:bg-slate-50 cursor-pointer'>
                    <td className="px-2 py-2 text-left">
                      {item.payment_status === '1' 
                      ? <div className='px-2 py-2 bg-primary text-white text-xs rounded-md'>Paid</div> 
                      : <Checkbox checked={checked} onChange={(e) => __checkboxHandle(e, item)}  />}
                    </td>
                    <td className='px-2 py-2 text-left'>
                      <div className='flex flex-row gap-2 justify-start items-start'>
                        <div className='w-[50px] min-w-[50px] relative'>
                          <img src={`${IMAGE_URL}/${item.url}`} alt="product-image" className='w-full h-full object-cover object-center' />
                        </div>
                        <div className='flex-grow flex flex-col gap-0.5 items-start justify-start'>
                          <div className='font-semibold capitalize min-w-[150px]'>{item.title}</div>
                          {/* <div className=''>#{item.id}</div> */}
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
                <td className='px-2 py-2 text-left'>
                  <div className='flex flex-row justify-start items-center'>
                    Rs. 
                    <input 
                      type="number" 
                      className='px-2 outline-none remove-arrow' 
                      value={shipping} 
                      min={0}
                      onChange={(e) => setShipping(e.target.value)} 
                    />
                  </div>
                </td>
              </tr>
              <tr className='border-t'>
                <td colSpan={4} className='px-2 py-2 text-left font-semibold'>Discount Price: </td>
                <td className='px-2 py-2 text-left'>
                  <div className='flex flex-row justify-start items-center'>
                    Rs. 
                    <input 
                      type="number" 
                      className='px-2 outline-none remove-arrow' 
                      value={discount} 
                      onChange={(e) => setDiscount(e.target.value)} 
                    />
                  </div>
                </td>
              </tr>
              <tr className='border-t'>
                <td colSpan={4} className='px-2 py-2 text-left font-semibold'>Total: </td>
                <td className='px-2 py-2 text-left'>Rs. {orders.reduce((prev, curr) => prev += +curr.qty * curr.price, 0) + (!Number(shipping) ? 0 : parseFloat(shipping)) - (!Number(discount) ? 0 : parseFloat(discount))}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <div className='mb-2 flex flex-col justify-center items-end'>
            <button 
              type="button" 
              onClick={__createInvoice}
              className='bg-primary hover:bg-opacity-90 text-white px-2 py-2 rounded-md w-[200px] text-sm font-semibold flex flex-row gap-2 justify-center items-center'
              >
              <LiaFileInvoiceDollarSolid  />
              Create Invoice
            </button>
          </div>
        </article>
        <article className="col-span-7 md:col-span-2">
          <div className='text-sm border p-4 sticky top-2'>
            <div className='font-semibold'>Billing Address</div>
            <div className='capitalize'>{data.fullname}</div>
            <div className='capitalize'>{data.phonenumber}</div>

            <div className='font-semibold mt-2'>Shipping Address</div>
            <div className='capitalize'>{data.address}</div>
            <div className='capitalize'>{data.other_details}</div>

            <div className='font-semibold mt-2'>Payment Method</div>
            <div className='capitalize'>(None)</div>

            <div>
              <div className='flex flex-row justify-center items-center text-lg gap-2 font-bold border my-2 py-2 rounded-md w-[80%] mx-auto bg-primary bg-opacity-80 text-white'>
                 {data.deliver_at === 0 ? <AiFillShopping className='text-base' /> : <FaHome className='text-base' />}
                  <div className='text-sm'>{data.deliver_at === 0 ? "Office" : "Home"}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <OrderInvoice data={invoiceData} isLoading={isLoading} mutate={invoiceMutate} />
      
    </article>
  )
}

Info.propTypes = {
  data: propTypes.object,
  mutate: propTypes.func,
  collection_id: propTypes.string
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