import { IMAGE_URL } from "config";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import defaultImage from 'assets/default.png'
import Spinner from "components/Spinner/Spinner";
import fetchData from "libs/fetchData";
import axios from "libs/axios";
import { SlCloudUpload } from "react-icons/sl";
import Image from "components/Image/Image";
import propTypes from 'prop-types'

const MediaList = ({ select, setMedia }) => {
  const [imgList, setImgList] = useState([]);
  const { data, isLoading, error, mutate } = fetchData('/api/admin/media')

  const __onChange = (e) => {
    const files = e.target.files;
    return setImgList(Object.values(files).map((file) => file));
  };

  const __uploadImages = (files) => {
      return axios
        .post("/api/admin/media", files)
        .then((res) => {
          console.log(res)
          setImgList([]);
          mutate(prev => ([...prev, res.data]), false)
          return "Image upload successfully"
        })
        .catch((err) => err);
  };

  const __upload = useCallback(async () => {
    const formData = new FormData();
    imgList.forEach((file) => {
      formData.append("media-images", file);
    });
    return toast.promise(__uploadImages(formData), {
      loading: "Image uploading ...",
      success: (msg) => msg,
      error: (err) => err,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgList]);

  useEffect(() => {
    if (imgList.length !== 0) __upload();
  }, [__upload, imgList.length]);

  const __removeImage = async (id) => {
    try {
      if (window.confirm("Are you sure?")) {
        const req = axios.delete("/api/admin/media/" + id).then(() => mutate(prev => prev.filter(item => item.id !== id)))
        toast.promise(req, 
          {
          loading: "removeing media ...",
          success: "Removed successfully",
          error: "Somthing is wrong !",
        })
      }
    } catch (error) {
      return console.log(error);
    }
  };

  if(error) return <div>{JSON.stringify(error)}</div>

  return (
    <div className="w-full ">
      <div className="flex flex-row justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">Media List </h2>
        <form encType="multipart/form-data">
          <label
            htmlFor="newImages"
            className="text-sm px-2 py-2 flex flex-row gap-2 justify-center items-center bg-primary rounded-md text-white font-semibold cursor-pointer hover:opacity-80"
          >
            <SlCloudUpload className="text-base" />
            <span>Add New</span>
          </label>
          <input
            type="file"
            id="newImages"
            className="hidden"
            onChange={__onChange}
            multiple
          />
        </form>
      </div>

      {isLoading && <Spinner />}
      {/* image containers */}
      <div className="w-full my-5 overflow-auto max-h-[75vh]">
        <div className="grid md:grid-cols-6 gap-3">
          {Array.isArray(data) && data.map((val, indx) => {
            const imageUrl = val.url ? `${IMAGE_URL}/${val.url}` : defaultImage;
            return (
              <div
                key={indx}
                className="h-[180px]"
                onClick={ select ? () => { select(imageUrl); setMedia(false) }: () => false }
              >
                <Image src={imageUrl} alt="thumbnail" className="w-full h-[160px] object-cover rounded-md hover:opacity-80 cursor-pointer " />
                <div
                  onClick={() => __removeImage(val.id)}
                  className="text-red-500 text-sm text-center hover:underline cursor-pointer"
                >
                  Remove
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MediaList.propTypes = {
  select: propTypes.bool,
  setMedia: propTypes.func
}

MediaList.defaultProps = {
  select: false
}

export default MediaList;