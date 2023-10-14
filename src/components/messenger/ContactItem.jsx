import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import getAuthToken from '../../helpers/getAuthToken';

export default function ContactItem({contact,onClick}) {
  const {user} = getAuthToken()
  const [lastMessage, setLastMessage] = useState(null)
  const nameArr = contact.friend_name.split(" ");
  const name = nameArr.length>0?nameArr[nameArr.length-1]:contact.name
  const activeChatId = useSelector(state=>state.chatList.inboxActivefriend?.friendId)
  const chatList = useSelector(state=>state.chatList.data)

  useEffect(()=>{
    if(chatList!==undefined){
      const chat = chatList.filter(chat=>chat.friendId.toString()===contact.friendId.toString())
      if(chat.length>0&&chat[0].messageList.length>0){
        if(chat[0].messageList[chat[0].messageList.length-1].userId.toString()===user.toString()){
          setLastMessage({...chat[0].messageList[chat[0].messageList.length-1],by:"me: "})
        }else{
          setLastMessage({...chat[0].messageList[chat[0].messageList.length-1],by:""})
        }
      }
    }
  },[])

  return (
    <div onClick={onClick} className={`mb-1 border-b last:border-b-0 border-slate-600 flex gap-x-3 p-2 rounded-2xl ${activeChatId===contact.friendId?"bg-white dark:bg-slate-700":"hover:bg-slate-200 dark:hover:bg-slate-700/50 cursor-pointer"}`}>
        <div className='relative h-[40px] w-[40px] rounded-full bg-slate-200 border-slate-500 p-[1px]'>
          {
            contact.friend_image===null?<p className='text-base uppercase text-center pt-1.5 text-white font-bold bg-blue-500 dark:bg-blue-700 w-full h-full rounded-full'>{name.substr(0,2)}</p>:<img src={contact.friend_image} className='h-full w-full rounded-full object-cover' /> 
          }
          {contact.onlineStatus&&(<div className='absolute h-3 w-3 rounded-full bg-green-500 border-[3px] border-secondary-2 -right-0 -bottom-0'></div>)}
        </div>
        <div className='w-auto'>
            <p className='font-semibold text-slate-700 dark:text-slate-200'>{name}</p>
            {lastMessage===null&&contact.lastMessage!==null&&(<p className='text-slate-700 dark:text-slate-300'>{contact.lastMessage.by.toString()===user.toString()&&(<span className='font-semibold'>me: </span>)}{contact.lastMessage.message}</p>)}
            {
              lastMessage===null?"":<p className='text-[12px] font-[600] text-slate-500 dark:text-slate-400'>{lastMessage.message.length>30?`${lastMessage.by} ${lastMessage.message.substring(0,30)}...`:`${lastMessage.by} ${lastMessage.message}`}</p>
            }
        </div>
    </div>
  )
}
