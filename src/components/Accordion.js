import { Code, KeyboardArrowRight } from '@mui/icons-material';
import React, { useState } from 'react';

const Accordion = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div className=' m-4 border-[1px] border-solid border-[#e4e8ec] rounded-[4px] hover:border-[#4379D6] visited:border-[#4379D6]'>
        <div className='px-[16px] py-[17px] h-[60px] text-[16px] font-[600] flex flex-row items-center cursor-pointer' onClick={(e) => setIsOpen(!isOpen)}>
            {
                props.headerIcon
            }
            <div className='w-full text-start ml-4'>{props.headerName}</div>
            <div className={isOpen ? 'rotate-90': ''}>
                <KeyboardArrowRight />
            </div>
        </div>
        {
            isOpen ? 
            <div className='flex flex-column items-start'>
            {
                props.children
            }
            </div>
            : null
        }
    </div>
    )
}

export default Accordion;