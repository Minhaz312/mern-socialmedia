import React from 'react'
import {IoMdClose} from "react-icons/io"
export default function Modal({children,loading=false,show=false,footer=true,title="Modal Title",onAction=()=>{},onHide=()=>{},className="bg-white",btnTitle="add"}) {
  return (
    <div className={`bg-black/30 fixed backdrop-blur-[5px] left-0 top-0 bottom-0 right-0 z-[10000] h-screen w-full flex justify-center items-center ${show?"block":"hidden"}`}>
        <div className={`max-h-[90%] min-h-[200px] max-w-[90%] min-w-[40%] w-[90%] animate-zoomIn p-3 flex flex-col ${footer?"justify-around":"justify-between"} ${className} text-slate-800 bg-white dark:bg-secondary-2 dark:text-slate-200 md:min-w-[450px] md:max-w-[60%] sm:w-auto sm:max-w-[70%]`}>
            <div className='flex justify-between items-center mb-5'>
                <h3 className='text-xl'>{title}</h3>
                <button onClick={onHide}><IoMdClose size={30} /></button>
            </div>
            <div className='h-full overflow-auto'>
              {children}
            </div>
            {footer&&(<div className={`flex justify-end mt-5`}>
                <button className='px-2 py-1.5 text-sm bg-slate-900 text-white font-semibold rounded mr-2' onClick={onHide}>close</button>
                <button onClick={onAction} className='px-2 py-1.5 text-sm bg-green-900 text-white font-semibold rounded'>{btnTitle}{loading?"ing...":""}</button>
            </div>)}
        </div>
    </div>
  )
}