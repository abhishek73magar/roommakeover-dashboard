import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import GroupTable from 'components/Table/GroupTable';
import { orderApi } from 'libs/api';
import toast from 'react-hot-toast';
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { OrderStatusOption } from 'utils/selectOption';

const colnames = [
  { name: "Collection Id", key: "id" },
  { name: "Title", key: 'title', type: 'truncate' },
  { name: "Fullname", key: "fullname" },
  { name: "Qty", key: 'qty'},
  { name: "Price", key: 'price', type: "currency"},
  { name: "Status", key: 'status', type: "order-status"},
  { name: "Datetime", key: "datetime", type: 'date-from-now' },
  // { name: "Datetime", key: "status_datetime", type: "date-from-now" },
  { name: "Total", key: 'total_price', type: "currency"},
  { name: "", key: 'view'},
  { name: "Action", key: 'action', type: "action"}
]

const Orders = () => {
  const { data, isLoading, mutate } = orderApi.swrFetch()
  

  const __orderMutate = (response, id) => {
    return response.reduce((prev, curr) => {
      let orders = curr.orders.filter(i => i.id !== id)
      if(orders.length > 0) { prev.push({ ...curr, orders }) }
      return prev;
    }, [])
  }

  const __onDelete = async(id) => {
    try {
      let check = confirm("Are you sure?")
      if(!check) return;
      const response = await orderApi.remove(id)
      if(response.status === 200){
        mutate((prev) => __orderMutate(prev, id), false)
        toast.success("Order removed")
      }
    } catch (error) {
      // return console.log(error)
    }
  }

  return (
    <section className='my-2'>
      <BreadHeader  icon={<CiShoppingBasket />} title="Order List" subtitle="All product orders list are here." />
      
      <br />
      <Container>
        <GroupTable 
          colnames={colnames} 
          data={data ? data.map((item) => {
            const view = <Link to={item.id} className='hover:underline text-primary' >View</Link>
            const orders = item.orders.map((item) => {
              const total_price = item.qty * item.price
              return { ...item, datetime: item.status_datetime, total_price }
            })
            return { ...item, view, orders, datetime: item.create_at }
          }) : []} 
          isLoading={isLoading} 
          searchBy={['fullname', 'id']}
          subKey='orders'
          statusOptions={OrderStatusOption}
          disbleSearch={false}
          disableEdit={true}
          statusKey='status'
          onDelete={__onDelete}
        />
      </Container>
    </section>
  )
}

export default Orders