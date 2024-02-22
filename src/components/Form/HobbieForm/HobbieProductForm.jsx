import { AiOutlineSave } from "react-icons/ai"
import Button from "../FormElement/Button"
import Inputbox from "../FormElement/Inputbox"
import Selectbox from "../FormElement/Selectbox"
import { hobbieApi } from "libs/api"
import Textbox from "../FormElement/Textbox"
import { useState } from "react"
import TextEditor from "../FormElement/TextEditor"
import { statusList } from "utils/selectOption"
import UploadThumbnail from "components/Form/UploadThumbnail/UploadThumbnail"
import SelectProductList from "./SelectProductList"
import { hobbieProductObj } from "utils/formObject"
import propTypes from 'prop-types'
import { IMAGE_URL } from "config"

const HobbieProductForm = ({ objData, onSubmit, type, hobbieForm }) => {
  const { data: hobbie, isLoading } = hobbieApi.swrFetch()
  const [data, setData] = useState({ ...objData })

  const __inputHandle = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value}))
  }

  const __selectHandle = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const __selectProduct = (item) => {
    const check = data.products.some((pid) => pid === item.pid)
    if(check) { setData(prev => ({ ...prev, products: prev.products.filter(pid => pid !== item.pid )})) } 
    else { setData(prev => ({ ...prev, products: [...prev.products, item.pid]})) }
  }

  const __onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.keys(data).forEach((name) => {
      if(name === 'products') formData.append(name, JSON.stringify(data[name]))
      else formData.append(name, data[name])
    })
    return onSubmit(formData).then((response) => {
      if(type === 'upate' && response) setData((prev) => ({...prev, ...response }))
      else if(type === 'new') { setData((prev) => ({ ...prev, ...objData}))} 
    }).catch(console.error)

  }
  

  return (
    <div>
      <form method="post" encType="multipart/form-data" onSubmit={__onSubmit}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <div className={`${hobbieForm ? '' : 'col-span-2'}`}>
              <Inputbox label={'Title'} name="title" value={data.title} placeholder="Hobbie Product Title" onChange={__inputHandle} />
            </div>
            {hobbieForm && <Selectbox 
              name="hobbie_id"
              onChange={__selectHandle}
              label={"Hobbie Name"}
              list={isLoading ? [] : [{ name: 'Select Hobbie', value: '' }, ...hobbie || []]} 
              option={{ label: "name", value: 'id'}}  
              value={data.hobbie_id || ''}
            />}
            <div className="col-span-2">
              <Textbox 
                rows={4} 
                label="Short Description" 
                name="short_description" 
                value={data.short_description} 
                onChange={__inputHandle} 
                className={'h-full'} 
                placeholder="Short Description"  
              />
            </div>

            <div className="col-span-2 border">
              <SelectProductList productList={data.products} onChange={__selectProduct} />
            </div>

            <div className="col-span-2">
              <TextEditor 
                mediaEnable={true} 
                value={data.more_details || ''} 
                onChange={(value) => __selectHandle('more_details', value)} 
                label="More Info"  
              />
            </div>
            <Selectbox 
              name="status"
              onChange={__selectHandle}
              value={data.status || '2'}
              label={"Status"}
              list={statusList} 
              option={{ label: "name", value: 'value'}}  
            />
            

          </div>
          <div>
            <UploadThumbnail 
              src={data.thumbnail && typeof data.thumbnail === 'object' ? 
                  URL.createObjectURL(data.thumbnail) : 
                  type === 'update' ? `${IMAGE_URL}/${data.thumbnail}` 
                  : data.thumbnail} 
              description={data.short_description} 
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
  hobbieForm: propTypes.bool
}

HobbieProductForm.defaultProps = {
  objData: hobbieProductObj,
  onSubmit: () => {},
  type: 'new',
  hobbieForm: true
}


export default HobbieProductForm