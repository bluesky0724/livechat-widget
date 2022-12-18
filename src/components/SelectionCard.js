import { Aod } from "@mui/icons-material";
import React from "react";

const SelectionCard = (props) => {
  const baseClass =
    "w-[84px] h-[84px] rounded-[6px] border-[2px] border-solid flex items-center justify-center mt-[10px]";
  const selectedClass = props.selected
    ? " border-[#4384F5]"
    : " border-[#bcc6d0] ";
  return (
    <div className="flex flex-col items-center px-[10px] hover:bg-[#f3f7f9] rounded-[6px] m-[4px] relative cursor-pointer" onClick={props.onClick}>
      <div className={baseClass + selectedClass}>
        {props.icon}
        
        {
            props.selected ? <span className="bg-[#4384F5] p-1 rounded-full absolute top-0 right-0">
          <div>
            <svg fill="#fff" width="12px" height="12px" viewBox="0 0 13 10">
              <g fill="inherit" fillRule="evenodd">
                <path
                  fillRule="nonzero"
                  d="M4.131 7.89L1.05 4.78 0 5.831 4.131 10 13 1.051 11.958 0z"
                ></path>
              </g>
            </svg>
          </div>
        </span> : null
        }
      </div>
      <div className="text-[15px] text-[#424D5780] leading-8">
        {props.content}
      </div>
    </div>
  );
};

export default SelectionCard;
