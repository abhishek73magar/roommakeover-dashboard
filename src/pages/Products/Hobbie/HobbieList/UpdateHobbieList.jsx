import BreadHeader from "components/Breadcrumbs/BreadHeader"
import HobbieListForm from "components/Form/HobbieForm/HobbieListForm"
import Spinner from "components/Spinner/Spinner"
import { hobbieApi } from "libs/api"
import { displayError } from "libs/getError"
import toast from "react-hot-toast"
import { CiMusicNote1 } from "react-icons/ci"
import { useSearchParams } from "react-router-dom"

const UpdateHobbieList = () => {
  const [query] = useSearchParams()
  const id = query.get('id')
  const { data: hobbie, isLoading } = hobbieApi.swrFetch(id)
  const __updateNewHobbie = async(formdata) => {
    try {
      const res = await hobbieApi.updateById(id, formdata)
      if(res.status === 200){
        toast.success("Hobbie updated")
        return res.data
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }
  return (
    <section className='my-2'>
      <BreadHeader path="/products/hobbie-list" icon={<CiMusicNote1 />} title="Create Hobbie List" subtitle="Create hobbie list here." />

      <br />
      <article className="p-4 bg-white">
        {isLoading ? <Spinner /> : <HobbieListForm hobbie={hobbie} onSubmit={__updateNewHobbie} type="update" />}
      </article>
    </section>
  )
}

export default UpdateHobbieList