import UploadFile from "components/Form/FormElement/UploadFile"
import Model from "components/Model/Model"
import { mediaApi } from "libs/api";
import { getError } from "libs/getError";
import toast from "react-hot-toast";

const AddMedia = () => {

  const __onChange = (files) => {
    const formData = new FormData();
    files.forEach((file) => { formData.append("media-images", file) });
    return toast.promise(mediaApi.post(formData), {
        loading: "Image uploading ...",
        success: () => "Image upload successfully",
        error: (err) => getError(err),
      });
  }

  return (
    <Model slug="/pages/media">
      <div className="py-2 px-3 text-white bg-primary text-xl font-bold">Add Media</div>

      <div className="px-3 py-2">
        <UploadFile multiple={true} onChange={__onChange} />
      </div>
    </Model>
  )
}

export default AddMedia