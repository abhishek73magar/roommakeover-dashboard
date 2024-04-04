import { useRef, useState } from "react";
import Inputbox from "../FormElement/Inputbox";
import propTypes from 'prop-types'

const ColorPicker = ({ colors, setColors }) => {
  const colorPicker = useRef(null);
  const [color, setColor] = useState({ name: "", code: null });

  const __inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "name" && color.code === null) return;

    setColor((prev) => ({ ...prev, [name]: value }));
  };

  const __onFocus = () => {
    if (color.code === null) colorPicker.current.click();
  };

  const __onKeypress = (e) => {
    if(e.charCode === 13 && color.name !== '' && color.code !== ''){
      e.preventDefault()
      setColors((prev) => [...prev, color])
      setColor({ name: "", code: null })
      colorPicker.current.click()
    }  

  }

  const __removeColor = (code) => {
    if(!code) return;
    setColors(prev => prev.filter(i => i.code !== code))
  }

  return (
    <div className="flex flex-col gap-1 pb-2">
      <div className="flex flex-row gap-2 items-center relative">
        <Inputbox
          label={"Color"}
          name="name"
          value={color.name || ""}
          onChange={__inputHandle}
          placeholder="Color name"
          divClassname={"mb-0"}
          onFocus={__onFocus}
          onKeyPress={__onKeypress}
        />
        <div className="absolute top-7 right-2 h-[25px] w-[25px] rounded-full overflow-hidden cursor-pointer hover:opacity-80 ">
          <input
            ref={colorPicker}
            type={"color"}
            name="code"
            value={color.code || "#000000"}
            onChange={__inputHandle}
            className="absolute h-[50px] -top-4 -left-2 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex-grow border flex flex-row justify-start items-start gap-2 flex-wrap px-2 py-1 min-h-[50px]">
        {Array.isArray(colors) && colors.map((item, indx) => {
          return(
            <div key={indx} onClick={() => __removeColor(item.code)} className="flex flex-row gap-1 justify-center items-center hover:underline cursor-pointer">
              <span className="h-[12px] w-[12px] rounded-full" style={{ backgroundColor: item.code}}></span>
              <span className="text-sm uppercase">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  colors: propTypes.array,
  setColors: propTypes.func
}

export default ColorPicker;
