import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Selectbox from "components/Form/FormElement/Selectbox"
import { displayError } from "libs/getError"
import { useState } from "react"
import { TfiLayoutSliderAlt } from "react-icons/tfi"
import { sliderOption } from "utils/selectOption"
import { sliderObj } from "utils/formObject"
import UploadFile from "components/Form/FormElement/UploadFile"
import { IMAGE_URL } from "config"
import { sliderApi } from "libs/api"
import toast from "react-hot-toast"
import Button from "components/Form/FormElement/Button"
import { AiOutlineSave } from "react-icons/ai"
import Container from "components/Common/Container"

const CreateSlider = () => {
  const [data, setData] = useState({ ...sliderObj })

  const __fileChange = (files) => {
    if(files.length > 0) setData((prev) => ({ ...prev, image: files[0]}))
  }

  const __onSumbit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if(key === 'image') formData.append("slider-images", data[key])
        else formData.append(key, data[key])
      })

      const res = await sliderApi.post(formData)
      if(res.status === 201){
        toast.success("Slider image updated")
        setData((prev) => ({...prev, ...sliderObj }))
      }

    } catch (error) {
      displayError(error)
    }
  }

  return (
    <section className='my-2'>
      <BreadHeader icon={<TfiLayoutSliderAlt />} path="/pages" title="Sliders" subtitle="Slider Images details are here." />
      
      <br />
      <Container>
        <form encType="multipart/form-data" method="post" onSubmit={__onSumbit}>
        <div className='flex flex-row justify-end items-center'>
          <Button type="submit" icon={<AiOutlineSave className='text-lg' />}>Save</Button>
        </div>
          <div className="grid md:grid-cols-2">
            <Selectbox
              label={'Slider Type'}
              list={sliderOption}
              option={{ label: 'name', value: 'value'}}
              value={data.type || null}
              onChange={(name, value) => setData((prev) => ({ ...prev, [name]: value }))}
              name={'type'}
            />
            <div className="col-span-2 mt-2">
              <UploadFile 
                onChange={__fileChange} 
                className='min-h-[300px] mb-2'
                src={!data.image || data.image === '' ? null 
                : typeof data.image === 'object' ? URL.createObjectURL(data.image) : `${IMAGE_URL}/${data.image}` } 

              />  
            </div>
          </div>
        </form>
        
      </Container>
    </section>
  )
}

export default CreateSlider