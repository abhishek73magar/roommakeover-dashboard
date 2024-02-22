import { IMAGE_URL } from 'config';
import axios from 'libs/axios';
import { displayError } from 'libs/getError';
import React from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";

const ImageContainer = ({ formImage, setFormImage, imageList }) => {

  const __uploadHandle = (e) => {
    const files = e.target.files
    setFormImage((prev) => [...prev, ...Object.values(files)])
  }

  const __removeFileImage = (item) => {
    setFormImage((prev) => prev.filter(i => i.name !== item.name))
  } 

  const __removeUploadImage = async(item) => {
    try {
      await axios.delete(`/api/admin/product/image/${item.id}`)
      imageList.mutate((prev) => prev.filter((i) => i.id !== item.id), false)
    } catch (error) {
      return displayError(error)
    }
  }

  return (
    <div className='flex flex-col gap-2 justify-start items-center h-full'>
      <div className='border border-dashed h-[100px] w-full'>
        <label htmlFor='upload'>
          <div className='h-full w-full flex flex-col justify-center items-center text-center text-primary cursor-pointer'>
            <AiOutlineCloudUpload className='text-2xl' />
            <div className='text-sm'>Upload Image Here</div>
          </div>
        </label>
        <input type='file' className='hidden' id="upload" onChange={__uploadHandle} multiple />
      </div>
      <div className='flex-grow border w-full flex flex-col gap-2'>
        <ImageList images={formImage} type={'form'} __removeImage={__removeFileImage} />
        <ImageList images={imageList ? imageList.data : []} __removeImage={__removeUploadImage} />
      </div>
    </div>
  )
}

export default ImageContainer;

const ImageList = ({images, type, __removeImage = () => {} }) => {
  return (
    <div className='grid grid-cols-2 gap-2 px-2 py-2'>
      {Array.isArray(images) && images.map((item, indx) => {
        const src = type === 'form' ? URL.createObjectURL(item) : `${IMAGE_URL}/${item.url}`
        return (
          <div key={indx} className='h-[120px] w-full border relative group'> 
          <div className='hidden group-hover:flex w-full h-full absolute bg-black bg-opacity-25 flex-col justify-center items-center hover:underline text-white cursor-pointer'>
            <span onClick={() => __removeImage(item)}>Remove</span>
          </div>
            <img src={src} alt="image-list" className='h-full w-full object-cover object-center' />
          </div>
        )
      })}
    </div>
  )
}