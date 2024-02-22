import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types'
const UploadFile = ({ className, id, multiple, src, onChange } ) => {
  const onDrop = useCallback(onChange, [onChange])
  const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className='cursor-pointer'>
    <input id={id}  {...getInputProps()} multiple={multiple}  />
    {src ? <img src={src} alt="view" className={twMerge('h-full w-full object-cover object-center', className)} /> :
      <div className={twMerge(`flex flex-col justify-center items-center w-full min-h-[200px] border border-dashed mb-2 cursor-pointer text-primary  ${isDragActive ? "bg-slate-100 scale-95 transition-transform duration-300" : ""}`, className)}>
        <IoCloudUploadOutline className='text-3xl' />
        <div className='text-sm'>Drag and Drop </div>
        <div className='text-sm'>or browse</div>
      </div>}
    </div>
  )
}

UploadFile.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  multiple: PropTypes.bool,
  src: PropTypes.string,
  onChange: PropTypes.func
}

UploadFile.defaultProps = {
  className: "",
  id: "uploadfile",
  multiple: false,
  src: null,
  onChange: () => {}
}

export default UploadFile