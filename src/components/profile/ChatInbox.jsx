import React, { useEffect, useState } from 'react'
import ContactItem from '../messenger/ContactItem'
import MessageList from '../messenger/MessageList'
import InboxTobBar from '../messenger/InboxTobBar'
import { BsArrowLeft, BsSendFill } from 'react-icons/bs'
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
import { updateChatFriendList } from '../../store/slice/chatFriendListSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ChatInbox() {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isMessengerPage = location.pathname==="/profile/messenger"

  const chatFriendList = useSelector(state=>state.chatFriendList) // chat inbox list
  const {data, isLoading} = useGetFriendListQuery()
  
  const chatList = useSelector(state=>state.chatList) // selected chat list from inbox
  const handleGetFriendByChat = async () => {
    const res = await getFriendsByChat(0)
  }
  const {user} = getAuthToken()
  socket.getSocket().on(`${user}-chat-friend`,chat=>{
    // this is working good, it is updating the friendlist in messenger with the latest message
    if(chatFriendList.data!==undefined && chatFriendList.data!==null){
      const friend = chatFriendList.data.filter(fr=>fr.friendId.toString()===chat.userId.toString())
      if(friend.length>0){
        let friendIndex = chatFriendList.data.findIndex(fr=>fr.friendId.toString()===chat.userId.toString())
        let friendList = [...chatFriendList.data];
        friendList.splice(friendIndex,1)
        friendList.unshift({...friend[0],lastMessage:{message:chat.message,at:chat.createdAt,by:chat.userId}});
        dispatch(updateChatFriendList(friendList))
      }
    }
    // updating a friends inbox with the new message
    if(chatList.data!==undefined && chatList.data.length>0){
      const friendChatBox = chatList.data.filter(friend=>friend.friendId.toString()===chat.userId.toString())
      if(friendChatBox.length>0){
        dispatch(addNewChatIntoList({friendId:friendChatBox[0].friendId,messageList:[...friendChatBox[0].messageList,chat]}))
      }
    }
  })
 
  if(isLoading){
    return "loading..."
  }
  
  return (
    <div className='h-full overflow-hidden'>
      {data!==undefined&&isLoading===false&&data.data.length<1&&(<div className='w-full h-2/3 flex justify-center items-center'>
          <h6 className="text-slate-400 font-bold">No Connections</h6>
      </div>)}
      {data!==undefined&&isLoading===false&&data.data.length>0&&(<div className={`h-full overflow-hidden grid grid-cols-10 gap-3 ${isMessengerPage===false&&"pt-3"}`}>
        <div className='h-full overflow-hidden col-span-12 md:col-span-7'>
          {chatList.loading===false&&chatList.data===undefined&&(<div className='h-full overflow-hidden md:p-3'>
              <button onClick={()=>navigate(-1)}>
              <BsArrowLeft />
            </button>
              <div className='h-full md:pt-10'>
                <h6 className="text-slate-800 dark:text-slate-400 text-center mb-3">Select friend to chat</h6>
                <div className='h-full overflow-auto block md:hidden'>
                  <MessengerFriendList />
                </div>
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
