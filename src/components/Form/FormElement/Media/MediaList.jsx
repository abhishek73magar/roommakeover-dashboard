import { IMAGE_URL } from "config";
import defaultImage from 'assets/default.png'
import Spinner from "components/Spinner/Spinner";
import Image from "components/Image/Image";
import propTypes from 'prop-types'
import { mediaApi } from "libs/api";

const MediaList = ({ select, setMedia }) => {
  const { data, isLoading } = mediaApi.swrFetch()

  return (
    <div className="w-full ">
      <div className="flex flex-row justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">Media List </h2>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MediaList.propTypes = {
  select: propTypes.func,
  setMedia: propTypes.func
}

export default MediaList;