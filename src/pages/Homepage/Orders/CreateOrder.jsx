import { zodResolver } from "@hookform/resolvers/zod"
import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container"
import Button from "components/Form/FormElement/Button"
import Inputbox from "components/Form/FormElement/Inputbox"
import Selectbox from "components/Form/FormElement/Selectbox"
import Textbox from "components/Form/FormElement/Textbox"
import SelectOrderProductList from "components/Form/HobbieForm/SelectOrderProductList"
import { orderApi } from "libs/api"
import { getError } from "libs/getError"
import { zodError } from "libs/zodError"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CiShoppingBasket } from "react-icons/ci"
import { createOrderForm } from "utils/formObject"
import { createOrderFormSchema } from "utils/formSchema"

const CreateOrder = () => {
  const [products, setProduct] = useState([])
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({ defaultValues: createOrderForm, resolver: zodResolver(createOrderFormSchema) })

  const __changeProduct = (d) => {
    return setProduct((prev) => {
      const checked = prev.some((i) => i.product_id === d.pid)
      if(checked) return prev.filter(i => i.product_id !== d.pid)
      return [...prev, { product_id: d.pid, title: d.title, price: d.price, qty: 1 }]
    })
  }

  const __changeCart = (pid, value) => {
    return setProduct((prev) => prev.reduce((acc, curr) => {
      if(curr.product_id === pid) {
        const qty = curr.qty + value;
        if(qty <= 0) return acc;
        acc.push({ ...curr, qty })
      } else acc.push(curr)
      return acc;
    }, []))
  }

  const __onSubmit = async(formdata) => {
    try {
      console.log(formdata)
      const request = await toast.promise(orderApi.post({ ...formdata, products }), {
        loading: "Creating order ...",
        success: "Order Created",
        error: (err) => getError(err)
      })
      if(request.status === 201){
        console.log(request.data)
        setProduct([])
        return reset(createOrderForm)
      }
      
    } catch (error) {
      return console.error(error.message ?? error)
    }
  }
  
  return (
    <section className="my-2">
      <BreadHeader  icon={<CiShoppingBasket />} title="Create Orders" subtitle="Create orders here." path="/home/orders" />
      <br />

      <Container className="min-h-[100px]">
        <div className="text-lg font-semibold">Products</div>
        <div>
          <SelectOrderProductList 
            productList={Array.isArray(products) ? products : []} 
            onChange={__changeProduct} 
            changeCart={__changeCart}
          />
        </div>
      </Container>
      <br />
      <form className="flex flex-col justify-start items-start w-full" onSubmit={handleSubmit(__onSubmit)}>
        <Container className="w-full">
          <div className="text-lg font-semibold mb-1">Customer Details</div>
            <div className="grid md:grid-cols-2 gap-2">
              <Inputbox 
                label="Full Name"
                register={register('fullname')}
                error={zodError(errors, 'fullname')}
                placeholder="eg: Ram"
              />
              <Inputbox 
                label="Email"
                register={register('email')}
                error={zodError(errors, 'email')}
                placeholder="eg:example@gmail.com"
              />
              <Inputbox 
                label="Phone Number"
                register={register('phonenumber')}
                error={zodError(errors, 'phonenumber')}
                placeholder="eg: 9868000000"
              />

              <Inputbox 
                label="Address"
                register={register('address')}
                error={zodError(errors, 'address')}
                placeholder="Enter city name or area name"
              />

              <div className="col-span-2">
                <Textbox 
                  label="Other Details"
                  register={register('other_details')}
                  error={zodError(errors, 'other_details')}
                  placeholder="Landmark or messages"
                />
              </div>
        
              <Selectbox 
                list={[{ name: 'Office', value: "0" }, { name: "Home", value: '1' }] }
                label="Delivery Place"
                name='deliver_at'
                onChange={(name, value) => setValue(name, value)}
                error={zodError(errors, 'deliver_at')}
                value={watch('deliver_at')}
                option={{ label: "name", value: 'value' }}
              />


            </div>


        </Container>

      <div className="max-w-[200px] w-full my-2">
        <Button type="submit" className="w-full">Save</Button>
      </div>
      </form>
    </section>
  )
}

export default CreateOrder