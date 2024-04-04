import UploadThumbnail from "../UploadThumbnail/UploadThumbnail"
import Inputbox from "../FormElement/Inputbox"
import TextEditor from "../FormElement/TextEditor"
import { blogObj } from "utils/formObject"
import { IMAGE_URL } from "config"
import Button from "../FormElement/Button"
import { AiOutlineSave } from "react-icons/ai"
import propTypes from 'prop-types'
import Selectbox from "../FormElement/Selectbox"
import { statusList } from "utils/selectOption"
import { useForm } from "react-hook-form"
import { zodError } from "libs/zodError"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogFormSchema } from "utils/formSchema"

const BlogForm = ({ onSubmit, type, objData }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({ defaultValues: objData, mode: 'onChange', resolver: zodResolver(blogFormSchema) })

  const __selectHandle = (name, value) => { setValue(name, value) }
  const __onSubmit = (formdata) => {
    // console.log(formdata)
    // return;
    const formData = new FormData();
    Object.keys(formdata).forEach((name) => {
      formData.append(name, formdata[name])
    })
    return onSubmit(formData).then((response) => {
      if(type === 'upate' && response) reset({...blogObj, ...response })
      else if(type === 'new') { reset(blogObj)} 
    }).catch(console.error)
  }
  return (
    <div>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(__onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <div className="boder min-h-[150px] col-span-2">
            <div className="grid md:grid-cols-2 gap-2">
              <Inputbox 
                label={"Blog Title"} 
                name="title" 
                error={zodError(errors, 'title')}
                register={register('title')}
                placeholder="Blog Title" 
              />
              <Inputbox 
                label={"Order Number"} 
                name="index" 
                type="number"
                error={zodError(errors, 'index')}
                register={register('index', { valueAsNumber: true })}
                placeholder="Order Number" 
              />

              <Selectbox 
                name="status"
                onChange={__selectHandle}
                value={watch('status')}
                label={"Status"}
                list={statusList} 
                option={{ label: "name", value: 'value'}}  
              />
              <div className="col-span-2 mb-10">
                <TextEditor
                  label={"Blog Details"}
                  name="text"
                  mediaEnable={true}
                  value={watch('text')}
                  className={'h-[85vh]'}
                  onChange={__selectHandle} 
                />
              </div>
              
            </div>
          </div>
          <div className="">
            <div className="sticky top-5">
              <div className="flex flex-row justify-end items-center mb-2">
                <Button type={'submit'} icon={<AiOutlineSave className='text-base' />} >Save</Button>
              </div>
              <UploadThumbnail 
                text="Blog Thumbnail" 
                src={watch('thumbnail') && typeof watch('thumbnail') === 'object' ? 
                  URL.createObjectURL(watch('thumbnail')) : 
                  type === 'update' ? `${IMAGE_URL}/${watch('thumbnail')}` 
                  : watch('thumbnail')} 
                description={''} 
                setThumbnail={(value) => setValue('thumbnail', value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  objData: propTypes.object,
  onSubmit: propTypes.func,
  type: propTypes.string,
}

BlogForm.defaultProps = {
  objData: blogObj,
  onSubmit: () => {},
  type: 'new',
}

export default BlogForm