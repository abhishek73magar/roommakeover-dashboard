import { useState } from "react"
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

const numbers = ['index']
const BlogForm = ({ onSubmit, type, objData }) => {
  const [data, setData] = useState({ ...objData })

  const __inputHandle = (e) => {
    const { name, value } = e.target;
    if(numbers.includes(name) && isNaN(value)) return;
    console.log(isNaN(value), numbers.includes(name))
    setData((prev) => ({ ...prev, [name]: value}))
  }

  const __selectHandle = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }))
  }
  const __onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    Object.keys(data).forEach((name) => {
      formData.append(name, data[name])
    })
    return onSubmit(formData).then((response) => {
      if(type === 'upate' && response) setData((prev) => ({...prev, ...response }))
      else if(type === 'new') { setData((prev) => ({ ...prev, ...objData}))} 
    }).catch(console.error)
  }
  return (
    <div>
      <form method="post" encType="multipart/form-data" onSubmit={__onSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="boder min-h-[150px] col-span-2">
            <div className="grid md:grid-cols-2 gap-2">
              <Inputbox label={"Blog Title"} name="title" value={data.title} onChange={__inputHandle}  placeholder="Blog Title" />
              <Inputbox label={"Order Number"} name="index" value={data.index} onChange={__inputHandle}  placeholder="Order Number" />

              <Selectbox 
                name="status"
                onChange={__selectHandle}
                value={data.status || '2'}
                label={"Status"}
                list={statusList} 
                option={{ label: "name", value: 'value'}}  
              />
              <div className="col-span-2 mb-10">
                <TextEditor
                  label={"Blog Details"}
                  mediaEnable={true}
                  value={data.text}
                  className={'h-[85vh]'}
                  onChange={(value) => __selectHandle('text', value)} 
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
                src={data.thumbnail && typeof data.thumbnail === 'object' ? 
                  URL.createObjectURL(data.thumbnail) : 
                  type === 'update' ? `${IMAGE_URL}/${data.thumbnail}` 
                  : data.thumbnail} 
                description={data.short_description} 
                setThumbnail={(value) => __selectHandle('thumbnail', value)}
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