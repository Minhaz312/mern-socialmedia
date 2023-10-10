import React from 'react'
import { useSelector } from 'react-redux';

export default function ContactItem({contact,onClick}) {
  const nameArr = contact.friend_name.split(" ");
  const name = nameArr.length>0?nameArr[nameArr.length-1]:contact.name

  const activeChatId = useSelector(state=>state.chatList.inboxActivefriend?.friendId)

  return (
    <div onClick={onClick} className={`mb-1 border-b last:border-b-0 border-slate-600 flex gap-x-3 p-2 rounded-2xl ${activeChatId===contact.friendId?"bg-white dark:bg-slate-700":"hover:bg-slate-200 dark:hover:bg-slate-700/50 cursor-pointer"}`}>
        <div className='h-[40px] w-[40px] rounded-full bg-slate-200 border-slate-500 p-[1px]'>
          {
            contact.friend_image===null?<p className='text-base uppercase text-center pt-1.5 text-white font-bold bg-blue-500 dark:bg-blue-700 w-full h-full rounded-full'>{name.substr(0,2)}</p>:<img src={contact.friend_image} className='h-full w-full rounded-full object-cover' /> 
          }
        </div>
        <div className='w-auto'>
            <p className='font-semibold text-slate-700 dark:text-slate-200'>{name}</p>
            <p className='text-[12px] font-[600] text-slate-500 dark:text-slate-400'>he never understand</p>
        </div>       
    </div>
  )
}
