import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import Table from "components/Table/Table";
import { IMAGE_URL } from "config";
import { sliderApi } from "libs/api";
import { displayError } from "libs/getError";
import toast from "react-hot-toast";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { sliderOption } from "utils/selectOption";

const colnames = [
  { name: "Image", key: "url", type: "image"},
  { name: "Slider Type", key: "type"},
  { name: "action", key: '', type: 'action'}
]

const Slider = () => {
  const { data, isLoading, mutate } = sliderApi.swrFetch()


  const __removeSliderImages = async(id) => {
    try {
      const confirm = window.confirm('Are you Sure?')
      if(!confirm) return;
      await sliderApi.remove(id)
      mutate((prev) => prev.filter(i => i.id !== id), false)
      toast.success("Slider Image removed !")
    } catch (error) {
      displayError(error)
    }
  }


  return (
    <section className='my-2'>
      <BreadHeader icon={<TfiLayoutSliderAlt />} addNew="slider/create" title="Sliders" subtitle="Slider Images details are here." />
      
      <br />
      <Container>
        <Table  
          colnames={colnames} 
          data={ data && Array.isArray(data) ? data.map((item) => {
            const url = `${IMAGE_URL}/${item.url}`
            const sliderType = sliderOption.find(i => i.value === item.type)
            let type = 'Unknown'
            if(sliderType) type = sliderType.name || 'Unknown'
            return { ...item, url, type }
          }) : []}
          isLoading={isLoading} 
          onDelete={__removeSliderImages}
          disableEdit={true}
          searchBy={['type']}
          // slug={'update?id='}
        />
      </Container>
    </section>
  )
}

export default Slider