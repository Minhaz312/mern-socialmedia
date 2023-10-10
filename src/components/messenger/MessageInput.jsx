import React from 'react'
import {BsSendFill} from "react-icons/bs"
export default function MessageInput({setMessage,handleSendMessage}) {
  return (
    <div className='flex bg-primary dark:bg-secondary-1 px-3 py-3 rounded-xl'>
        <input type='text' className='w-full bg-primary dark:bg-secondary-1 outline-none border-none' placeholder='Aa...' />
        <button className='text-[20px] text-slate-600'><BsSendFill /></button>
    </div>
  )
}
