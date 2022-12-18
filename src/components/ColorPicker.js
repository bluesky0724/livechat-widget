import React, { useMemo } from "react";

const ColorPickerButton = (props) => {

    const baseClass = useMemo(() => {
        switch(props.selectedIndex) {
            case 0:
                return "bg-[#2000F0]"
            case 1:
                return "bg-[#6F0FFF]"
            case 2:
                return "bg-[#DA3807]"
            case 3:
                return "bg-[#0F8524]"    
            case 4:
                return "bg-[#00796B]"
        }
    })
  const backClass = "bg-[" + props.color + "]";
  return (
    <div className={backClass + " rounded-full h-[30px] w-[30px] mx-1 cursor-pointer"} onClick={props.onClick}>
      {props.selectedColor === props.color ? (
        <div className="flex flex-row justify-center items-center pt-[6px]">
        <svg fill="#fff" width="18px" height="18px" viewBox="0 0 13 10">
          <g fill="inherit" fillRule="evenodd">
            <path
              fillRule="nonzero"
              d="M4.131 7.89L1.05 4.78 0 5.831 4.131 10 13 1.051 11.958 0z"
            ></path>
          </g>
        </svg>
      </div>
      ) : null}
    </div>
  );
};

export default ColorPickerButton;
