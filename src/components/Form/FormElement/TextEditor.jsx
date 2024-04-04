import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { twMerge } from "tailwind-merge";
import propTypes from 'prop-types'
import MediaList from "./Media/MediaList";

const TextEditor = ({ label, className, name, labelClassName, mediaEnable, onChange, ...editorProps }) => {
  const quillRef = useRef(null);
  const mediaRef = useRef(null);
  const [media, setMedia] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ "color": [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image", "video"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
    "link",
    "color",
    "size",
    "video",
    "align",
    "background",
    "direction",
    "code-block",
    "code",
  ];


  const addImages = (url) => {
    const range = quillRef.current.editor.getSelection();
    if(range.index) return quillRef.current.editor.insertEmbed(range.index, "image", url);
    return null
  };

  useEffect(() => {
    if (quillRef) {
      const current = quillRef.current;
      current.editor
        .getModule("toolbar")
        .addHandler("image", () => mediaEnable ? setMedia(true) : false);
    }
  }, [quillRef]);

  useEffect(() => {
    const handle = (e) => {
      if (!mediaRef.current?.contains(e.target)) setMedia(false);
    };
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  return (
    <>
      {media && (
        <div className="fixed top-0 left-0 min-h-screen w-full flex flex-col justify-center items-center p-5 z-50 bg-black bg-opacity-60">
          <div
            ref={mediaRef}
            className="bg-white px-4 py-3 rounded-md relative h-[70vh] w-full"
          >
            <MediaList select={addImages} setMedia={setMedia} />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className={twMerge("text-sm font-bold text-slate-700", labelClassName)}>{label}</h2>
        <div className="">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={(value) => onChange(name, value)}
            {...editorProps}
            className={twMerge("", className)}
          />
        </div>
      </div>
    </>
  );
};

TextEditor.propTypes = {
  label: propTypes.string,
  className: propTypes.string,
  labelClassName: propTypes.string,
  mediaEnable: propTypes.bool,
  onChange: propTypes.func,
  name: propTypes.string
}

TextEditor.defaultProps = {
  mediaEnable: false,
  onChange: () => {}
}

export default TextEditor;