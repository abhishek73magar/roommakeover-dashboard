import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import Table from "components/Table/Table";
import { IMAGE_URL } from "config";
import { productApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { CiShop } from "react-icons/ci";
import { statusList } from "utils/selectOption";

const colnames = [
  { name: "Image", key: "url", type: "image"},
  { name: "Title", key: "title", type: 'heading'},
  { name: "Quantity", key: "quantity"},
  { name: "Price", key: "price", type: "currency"},
  // { name: "Dis. Price", key: "new_price", type: "currency"},
  { name: "Status", key: "status", type: 'status'},
  { name: "action", key: '', type: 'action'}
]

const Products = () => {
  const { data, isLoading, mutate } = productApi.swrFetch()

  const __removeProduct = async(pid) => {
    try {
      const confim = window.confirm("Are you sure ?")
      if(!confim) return;
      
      await productApi.remove(pid)
      mutate((prev) => ({ ...prev, data: prev.data.filter(i => i.pid !== pid) }), false)
      toast.success("Product removed !")
    } catch (error) {
      return displayError(error)
    }
  }

  return (
    <section className="my-2">
      <BreadHeader icon={<CiShop />} addNew={'product/create'} title="Product List" subtitle="All Product list and details are here." />

      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={data && Array.isArray(data.data) ? data.data
            .map((item) => {
            const url =  item.url ? `${IMAGE_URL}/${item.url}` : null
            const price = item.is_discount ? item.new_price : item.price
            return { ...item, url, price }
          }) : []}
          isLoading={isLoading} 
          searchBy={'title'}
          slug={'product/update?pid='}
          statusKey="status"
          statusOptions={[{ name: "All", value: "" }, ...statusList]}
          edit="pid"
          onDelete={__removeProduct}
        />
      </Container>
    </section>
  )
}

export default Products
