import { zodResolver } from "@hookform/resolvers/zod"
import Button from "components/Form/FormElement/Button"
import Inputbox from "components/Form/FormElement/Inputbox"
import Selectbox from "components/Form/FormElement/Selectbox"
import { invoiceApi, transactionApi } from "libs/api"
import { getError } from "libs/getError"
import { zodError } from "libs/zodError"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams, useSearchParams } from "react-router-dom"
import { uid } from "uid"
import { invoiceUpdateForm } from "utils/formObject"
import { transactionFormSchema } from "utils/formSchema"
import { invoiceStatusOption, paymentGatewayOption, paymentStatusOption } from "utils/selectOption"

const UpdateInvoiceDetails = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch,reset } = useForm({ defaultValues: invoiceUpdateForm, resolver: zodResolver(transactionFormSchema) })
  const containerRef = useRef(null)
  const { invoice_id } = useParams()
  const [query, setQuery] = useSearchParams()
  const __handleSubmit = async(formdata) => {
    try {
      // console.log(formdata)
      if(formdata.transaction_code === '') {
        formdata.transaction_code = 'personal_' + uid(10)
      }

      const request = await toast.promise(transactionApi.updateById(invoice_id, formdata), {
        loading: "saving...",
        success: "Transaction created",
        error: (err) => getError(err)
      })

      if(request.status === 201) {

        transactionApi.mutateById(invoice_id, (prev) => {
          if(request.data.transaction) {
            return [...prev, request.data.transaction]
          }
          return prev;
        })
        invoiceApi.mutateById(invoice_id, (prev) => {
          if(request.data.invoice){
            const { status, paid_at } = request.data.invoice;
            
            return {...prev, status, paid_at }
          }
          return prev;
        })
        setQuery({})
        reset()
        return true;
      }
      throw new Error("Request status code is not 201")
    } catch (error) {
      return console.log(error.message ?? error)
    }
  }

  const __selectHandle = (name, value) => {
    setValue(name, value, { shouldValidate: true })
  }

  useEffect(() => {
    const handle = (e) => {
      if(containerRef.current && !containerRef.current.contains(e.target)) setQuery({})
    }
    window.addEventListener("mousedown", handle)
    return () => window.removeEventListener('mousedown', handle)
  }, [setQuery])

  if(query.get('add') !== 'transaction') return null;
  return (
    <article className="fixed top-0 left-0 h-full w-full bg-primary bg-opacity-50 p-5 flex flex-col justify-center items-center">
      <div className="max-w-[400px] w-[98%] bg-white mx-auto py-3 px-4 rounded-md overflow-auto" ref={containerRef}>
        <div className="text-xl font-semibold">Update Transaction</div>
        <hr className="my-2" />

        <form action="" method="post" onSubmit={handleSubmit(__handleSubmit)} className="flex flex-col justify-start items-start gap-2">
          <Inputbox 
            label="Transaction Code"
            placeholder="Transaction Code"
            register={register('transaction_code')}
            error={zodError(errors, 'transaction_code')}
          />

          <Selectbox 
            label="Payment Gateway"
            list={paymentGatewayOption}
            option={{ label: "name", value: "value"}}
            name="gateway"
            value={watch('gateway')}
            onChange={__selectHandle}
            error={zodError(errors, 'gateway')}
          />
          <Selectbox 
            label="Status"
            list={paymentStatusOption}
            option={{ label: "name", value: "value"}}
            name="status"
            value={watch('status')}
            onChange={__selectHandle}
            error={zodError(errors, 'status')}
          />
          <Selectbox 
            label="Invoice Status"
            list={invoiceStatusOption}
            option={{ label: "name", value: "value"}}
            name="invoice_status"
            value={watch('invoice_status')}
            onChange={__selectHandle}
            error={zodError(errors, 'invoice_status')}
          />

          <Inputbox 
            label="Amount"
            placeholder="Amount"
            type="number"
            register={register('amount', { valueAsNumber: true })}
            error={zodError(errors, 'amount')}
          />
          <div className="w-full">
            <Button className="w-full" type="submit">Save</Button>
          </div>
        </form>
      </div>
    </article>
  )
}

export default UpdateInvoiceDetails