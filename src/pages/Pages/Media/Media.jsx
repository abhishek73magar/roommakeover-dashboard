import BreadHeader from "components/Breadcrumbs/BreadHeader"
import Container from "components/Common/Container";
import Image from "components/Image/Image";
import { mediaApi } from "libs/api";
import { GoFileMedia } from "react-icons/go";
import { CiTrash } from "react-icons/ci";
import Spinner from "components/Spinner/Spinner";
import { IMAGE_URL } from "config";
import toast from "react-hot-toast";


const Media = () => {
  const { data, isLoading, mutate } = mediaApi.swrFetch()

  const __removeImage = async (id) => {
    try {
      const check = window.confirm("Are you sure?")
      if(!check) return;
      await toast.promise(mediaApi.remove(id), {
        loading: "removeing media ...",
        success: "Removed successfully",
        error: "Somthing is wrong !",
      })
      mutate(prev => prev.filter(item => item.id !== id), false)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className='my-2'>
    <BreadHeader icon={<GoFileMedia />} addNew="add" title="Media" subtitle="All media are here." />
    <br />
    <Container>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-2">  
      {isLoading && <Spinner />}
        {
          Array.isArray(data) && data.map((item, indx) => {
            return (
              <div key={indx} className="flex flex-col justify-center items-center gap-0.5 h-[180px] w-[200px]">
                <Image src={`${IMAGE_URL}/${item.url}`} alt="media-images" className={'w-full h-full object-cover object-center'} />
                <div 
                  onClick={() => __removeImage(item.id)}
                  className="text-sm hover:underline text-red-500 cursor-pointer flex flex-row justify-center items-center gap-1"
                >
                  <CiTrash />
                  <span>Remove</span>
                </div>
              </div>
            )
          })
        }

      </div>
    </Container>
  </section>
  )
}

export default Media