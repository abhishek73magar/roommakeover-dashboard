import BreadHeader from 'components/Breadcrumbs/BreadHeader'
import Container from 'components/Common/Container'
import ProductForm from 'components/Form/ProductForm/ProductForm'
import Spinner from 'components/Spinner/Spinner'
import { productApi } from 'libs/api'
import { displayError, getError } from 'libs/getError'
import toast from 'react-hot-toast'
import { LuShoppingCart } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

const UpdateProduct = () => {
  const [query] = useSearchParams()
  const pid = query.get('pid')
  const { data: product, error, isLoading, mutate: productMutate } = productApi.swrFetchById(pid)
  const { data: images, error: imgError, isLoading: imgLoading, mutate } = productApi.getImage(pid)

  const __updateProduct = async(formData) => {
    try {
      const res = await productApi.updateById(pid, formData)
      productMutate((prev) => ({ ...prev, ...res.data.response }), false)
      toast.success("product updated")
      return res.data
    } catch (err) {
      displayError(err)
      return Promise.reject(err)
    }
  }

  if(error || imgError) return getError(error || imgError)
  return (
    <section className="my-2">
      <BreadHeader icon={<LuShoppingCart />} path={'/products'} title="Update Product" subtitle="Update product details and create new one." />

      <br />
      <Container>
        {isLoading ? <Spinner /> : <ProductForm data={product} type="update" imageList={ imgLoading ? { data: [] } : { data: images, mutate }} onSubmit={__updateProduct} />}
      </Container>
    </section>
  )
}

export default UpdateProduct