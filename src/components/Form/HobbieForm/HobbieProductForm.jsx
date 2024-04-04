import { AiOutlineSave } from "react-icons/ai"
import Button from "../FormElement/Button"
import Inputbox from "../FormElement/Inputbox"
import Selectbox from "../FormElement/Selectbox"
import { hobbieApi } from "libs/api"
import Textbox from "../FormElement/Textbox"
import TextEditor from "../FormElement/TextEditor"
import { statusList } from "utils/selectOption"
import UploadThumbnail from "components/Form/UploadThumbnail/UploadThumbnail"
import SelectProductList from "./SelectProductList"
import { hobbieProductObj } from "utils/formObject"
import propTypes from 'prop-types'
import { IMAGE_URL } from "config"
import { useForm } from "react-hook-form"
import { zodError } from "libs/zodError"
import { zodResolver } from "@hookform/resolvers/zod"
import { diyFormSchema, hobbieFormSchema } from "utils/formSchema"

const validation = {
  'hobbie': hobbieFormSchema,
  'diy': diyFormSchema,
}

const HobbieProductForm = ({ objData, onSubmit, type, hobbieForm, name }) => {
  const { data: hobbie, isLoading } = hobbieApi.swrFetch()
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({ defaultValues: objData, resolver: zodResolver(validation[name]) })

  const __selectHandle = (name, value) => {
    // setData((prev) => ({ ...prev, [name]: value }))
    setValue(name, value)
  }

  const __selectProduct = (item) => {
    const products = watch('products') || []
    const check = products.some((pid) => pid === item.pid)
    if(check) { setValue('products',products.filter(pid => pid !== item.pid))} 
    else { setValue('products',[...products, item.pid]) }
  }

  const __onSubmit = (data) => {
    // return console.log(data)
    const formData = new FormData();
    Object.keys(data).forEach((name) => {
      if(name === 'products') formData.append(name, JSON.stringify(data[name]))
      else formData.append(name, data[name])
    })
    return onSubmit(formData).then((response) => {
      if(type === 'upate' && response) reset(response)
      else if(type === 'new') { reset(objData)} 
    }).catch(console.error)

  }
  

  return (
    <div>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(__onSubmit)}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <div className={`${hobbieForm ? '' : 'col-span-2'}`}>
              <Inputbox 
                label={'Title'} 
                register={register('title')}
                error={zodError(errors, 'title')}
                placeholder="Title"
              />
            </div>
            {hobbieForm && <Selectbox 
              name="hobbie_id"
              onChange={__selectHandle}
              error={zodError(errors, 'hobbie_id')}
              label={"Hobbie Name"}
              list={isLoading ? [] : [{ name: 'Select Hobbie', value: '' }, ...hobbie || []]} 
              option={{ label: "name", value: 'id'}}  
              value={watch('hobbie_id') || ''}
            />}
            <div className="col-span-2">
              <Textbox 
                rows={4} 
                error={zodError(errors, 'short_description')}
                label="Short Description" 
                register={register('short_description')} 
                className={'h-full'} 
                placeholder="Short Description"  
              />
            </div>

            <div className="col-span-2 border">
              <SelectProductList productList={watch('products') || []} onChange={__selectProduct} />
            </div>

            <div className="col-span-2">
              <TextEditor 
                mediaEnable={true} 
                value={watch('more_details') || ''} 
                name="more_details"
                onChange={__selectHandle} 
                label="More Info"  
              />
            </div>
            <Selectbox 
              name="status"
              error={zodError(errors, 'status')}
              onChange={__selectHandle}
              value={watch('status') || '2'}
              label={"Status"}
              list={statusList} 
              option={{ label: "name", value: 'value'}}  
            />
            

          </div>
          <div>
            <UploadThumbnail 
              src={watch('thumbnail') && typeof watch('thumbnail') === 'object' ? 
                  URL.createObjectURL(watch('thumbnail')) : 
                  type === 'update' ? `${IMAGE_URL}/${watch('thumbnail')}` 
                  : watch('thumbnail')} 
              description={watch('short_description')} 
              setThumbnail={(value) => __selectHandle('thumbnail', value)}
            />
          </div>
        </div>
        <div className='flex flex-row justify-end items-center pb-2'>
          <Button type={'submit'} icon={<AiOutlineSave className='text-base' />}>Save</Button>
        </div>
      </form>
    </div>
  )
}

HobbieProductForm.propTypes = {
  objData: propTypes.object,
  onSubmit: propTypes.func,
  type: propTypes.string,
  hobbieForm: propTypes.bool,
  name: propTypes.string,
}

HobbieProductForm.defaultProps = {
  objData: hobbieProductObj,
  onSubmit: () => {},
  type: 'new',
  hobbieForm: true,
  name: 'hobbie'
}


export default HobbieProductForm