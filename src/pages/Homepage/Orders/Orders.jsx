import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container';
import GroupTable from 'components/Table/GroupTable';
import { orderApi } from 'libs/api';
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from 'react-router-dom';

const colnames = [
  { name: "Collection Id", key: "collection_id" },
  { name: "Title", key: 'title', type: 'truncate' },
  { name: "Fullname", key: "fullname" },
  { name: "Qty", key: 'qty'},
  { name: "Price", key: 'price', type: "currency"},
  { name: "Status", key: 'status', type: "order-status"},
  { name: "Datetime", key: "date", type: "datetime" },
  { name: "Total", key: 'total_price', type: "currency"},
  { name: "", key: 'view'}
]

const Orders = () => {
  const { data, isLoading } = orderApi.swrFetch()
  
  const __filterBy = () => {
    return true;
  }

  return (
    <section className='my-2'>
      <BreadHeader  icon={<CiShoppingBasket />} title="Order List" subtitle="All product orders list are here." />
      
      <br />
      <Container>
        <GroupTable 
          colnames={colnames} 
          data={data ? data.filter(__filterBy).map((item) => {
            const view = <Link to={item.collection_id} className='hover:underline text-primary' >View</Link>
            return { ...item, view }
          }) : []} 
          isLoading={isLoading} 
          searchBy={['fullname', 'collection_id']}
          subKey='orders'
          disbleSearch={true}
        />
      </Container>
    </section>
  )
}

export default Orders