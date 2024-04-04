import Image from "components/Image/Image"
import Button from "../FormElement/Button"
import propTypes from 'prop-types'

const UploadThumbnail = ({ src, description, setThumbnail, text  }) => {
 
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <input type='file' id="upload-thumbnail" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
      <label htmlFor="upload-thumbnail" className="border w-full cursor-pointer hover:opacity-85">
        <Image src={src} className={'h-[250px] object-cover object-center'} />
      </label>
      <div className="flex flex-row gap-2 justify-center items-center font-semibold">
        <label htmlFor="upload-thumbnail" className="bg-primary text-white text-sm px-3 py-2 rounded-md cursor-pointer hover:opacity-90">
          Upload
        </label>
        <Button className={'bg-transparent border text-secondary hover:bg-slate-100 px-3'} onClick={() => setThumbnail(null)}>Remove</Button>
      </div>
      <div className="font-semibold text-lg">{text}</div>
      <div className="text-sm text-center">{description}</div>
    </div>
  )
}

UploadThumbnail.propTypes = {
  src: propTypes.string,
  description: propTypes.string,
  setThumbnail: propTypes.func,
  text: propTypes.string
}

UploadThumbnail.defaultProps = {
  src: null,
  description: "",
  text: "Hobbie Thumbnail",
  setThumbnail: () => {}
}

export default UploadThumbnail