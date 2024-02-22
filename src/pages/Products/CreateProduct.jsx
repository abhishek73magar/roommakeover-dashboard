import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import ProductForm from "components/Form/ProductForm/ProductForm";
import { productApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { LuShoppingCart } from "react-icons/lu";


const CreateProduct = () => {

  const __addNewProduct = async(formData) => {
    try {
      await productApi.post(formData)
      toast.success("product created")
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }

  return (
    <section className="my-2">
      <BreadHeader icon={<LuShoppingCart />} path={'/products'} title="Create Product" subtitle="Add new product details and create new one." />

      <br />
      <Container>
        <ProductForm onSubmit={__addNewProduct} />
      </Container>
    </section>
  )
}

export default CreateProduct
