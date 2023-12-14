import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";


const Modal = ({ isOpen, children, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className='absolute top-10 left-4  z-40 h-screen w-screen backdrop-blur  '>
          <div className='min-h-[200px] bg-white max-w-[60%] p-4 relative z-50 m-auto rounded-lg modal-body'>
            <div className='flex justify-end ' >
              <IoIosCloseCircleOutline className='text-2xl cursor-pointer' onClick={onClose} />
            </div>
            {children}
          </div>
          <div className='min-h-full w-screen absolute top-0 z-40' onClick={onClose} />
        </div>)}
    </>


  )
}

export default Modal
