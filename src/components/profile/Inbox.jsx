import React, { useEffect, useState } from 'react'
import InboxTobBar from '../messenger/InboxTobBar'
import MessageList from '../messenger/MessageList'
import { BsSendFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../api/messenger/messenger'
import { addMoreChatIntoAChat, addNewChatIntoList } from '../../store/slice/chatListSlice'
import socket from '../../utils/socket'
import getAuthToken from '../../helpers/getAuthToken'
import { BiImageAdd } from 'react-icons/bi'
import { FaFileUpload } from 'react-icons/fa'

export default function Inbox() {
  const [message, setMessage] = useState("")
  const activeMessengerFriend = useSelector(state=>state.chatList.inboxActivefriend)
  const chatList = useSelector(state=>state.chatList)
  const dispatch = useDispatch()
    const handleSendMessage = async () => {
      if(message.trim()!==""){
        const data = {friendId:activeMessengerFriend.friendId,message}
        const res = await sendMessage(data);
        if(res && res.data.success){
          if(chatList.data!==undefined){
            const friendChatBox = chatList.data.filter(friend=>friend.friendId===activeMessengerFriend.friendId)[0]
            const newChat = res.data.data
            if(friendChatBox.messageList.length>0){
                dispatch(addMoreChatIntoAChat({friendId:friendChatBox.friendId,messageList:[...friendChatBox.messageList,newChat]}))
              }else{
                dispatch(addNewChatIntoList({friendId:friendChatBox.friendId,messageList:[newChat]})) 
              }
          }else{
            console.log('chat list undefined')
          }
        }
        setMessage("")
      }
    }

    const handleChangeMessageInput = e => {
      setMessage(e.target.value)
      if(message.trim()!==""){
        const {user} = getAuthToken()
        socket.getSocket().emit("typing-message",{userId:user,friendId:activeMessengerFriend.friendId})
      }
    }
    
  return (
    <div className='h-full flex justify-between flex-col col-span-7 px-2 pt-5 pb-3 bg-white dark:bg-secondary-2 rounded-md shadow md:px-8'>
        <InboxTobBar />
        <div className='h-full overflow-x-hidden overflow-y-auto'><MessageList /></div>
        <div className='flex items-center'>
          <label className='relative p-2 cursor-pointer text-slate-700 dark:text-slate-300'>
            <input type='file' className='absolute top-0 left-0 right-0 bottom-0 w-full hidden h-full' />
            <FaFileUpload />
          </label>
          <div className='w-full flex bg-primary dark:bg-secondary-1 px-3 py-3 rounded-xl'>
            <input type='text' value={message} onChange={handleChangeMessageInput} className='w-full bg-primary dark:bg-secondary-1 outline-none border-none' placeholder='Aa...' />
            <button className='text-[20px] text-slate-400' onClick={handleSendMessage}><BsSendFill /></button>
        </div>
        </div>
    </div>
  )
}
