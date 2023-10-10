import React, { useEffect, useState } from 'react'
import ContactItem from '../messenger/ContactItem'
import MessageList from '../messenger/MessageList'
import InboxTobBar from '../messenger/InboxTobBar'
import { BsSendFill } from 'react-icons/bs'
import { useGetFriendListQuery } from '../../store/services/friendship'
import { BiSearch } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { addMoreChatIntoAChat, addNewChatIntoList, setActiveMessengerFriend, setLoadingChatList } from '../../store/slice/chatListSlice'
import Inbox from './Inbox'
import { getChatByFriendId } from '../../api/messenger/messenger'
import socket from './../../utils/socket'
import getAuthToken from '../../helpers/getAuthToken'
import { CHAT_EVENTS_NAME } from '../../utils/constants'
import { getFriendsByChat } from '../../api/user/friendship/friendship'
import Modal from '../cs-ui-components/modal/Modal'
import MessengerFriendList from './MessengerFriendList'

export default function ChatInbox() {

  const dispatch = useDispatch()

  const {data, isLoading} = useGetFriendListQuery()
  
  const chatList = useSelector(state=>state.chatList)
  const handleGetFriendByChat = async () => {
    const res = await getFriendsByChat(0)
    console.log('res: ',res)
  }
  useEffect(()=>{
    // handleGetFriendByChat()
    const {user} = getAuthToken()
    socket.getSocket().on(`${user}-chat-friend`,chat=>{
      console.log('chatList: ',chatList)
      if(chatList.data!==undefined && chatList.data.length>0 && chatList.inboxActivefriend.friendId.toString()===chat.userId.toString()){
        const friendChatBox = chatList.data.filter(friend=>friend.friendId.toString()===chat.userId.toString())[0]
        const newChat = chat
        dispatch(addNewChatIntoList({friendId:friendChatBox.friendId,messageList:[...friendChatBox.messageList,newChat]}))
      }
    })
  },[socket.getSocket(),chatList])
  
  if(isLoading){
    return "loading..."
  }
  
  return (
    <div className='h-full overflow-hidden'>
      {data!==undefined&&isLoading===false&&data.data.length<1&&(<div className='w-full h-2/3 flex justify-center items-center'>
          <h6 className="text-slate-400 font-bold">No Connections</h6>
      </div>)}
      {data!==undefined&&isLoading===false&&data.data.length>0&&(<div className='h-full overflow-hidden grid grid-cols-10 gap-3 pt-3'>
        <div className='h-full overflow-hidden col-span-12 md:col-span-7'>
          {chatList.loading===false&&chatList.data===undefined&&(<div className='h-full flex justify-between flex-col overflow-hidden md:p-3'>
              <h6 className="text-slate-800 dark:text-slate-400 text-center mb-3">Select friend to chat</h6>
              <div className='h-full overflow-auto block md:hidden'>
                <MessengerFriendList />
              </div>
          </div>)}
          {chatList.loading===true&&chatList.data===undefined&&(<div className='p-3 h-full flex justify-center items-center overflow-x-hidden overflow-y-auto'>
              <h6 className="text-slate-800 dark:text-slate-400">loading...</h6>
          </div>)}
          {chatList.loading===false&&chatList.data===null&&(<div className='p-3 h-full flex justify-center items-center overflow-x-hidden overflow-y-auto'>
              <h6 className="text-slate-800 dark:text-slate-400">Failed to load</h6>
          </div>)}
          {chatList.loading===false&&chatList.data!==undefined&&chatList.data!==null&&(<Inbox />)}
        </div>
        <div className='h-full overflow-auto md:col-span-3 md:block hidden'>
          <MessengerFriendList />
        </div>
      </div>)}
    </div>
  )
}
