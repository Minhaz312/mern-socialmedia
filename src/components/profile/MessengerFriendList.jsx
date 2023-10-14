import React, { useEffect } from 'react'
import { useGetFriendListQuery } from '../../store/services/friendship'
import { useDispatch, useSelector } from 'react-redux'
import { addNewChatIntoList, setActiveMessengerFriend, setLoadingChatList } from '../../store/slice/chatListSlice'
import { BiSearch } from 'react-icons/bi'
import ContactItem from '../messenger/ContactItem'
import { getChatByFriendId } from '../../api/messenger/messenger'
import { getFriendsByChat } from '../../api/user/friendship/friendship'
import { setLoadingChatFriends, storeChatFriendList } from '../../store/slice/chatFriendListSlice'

export default function MessengerFriendList() {
    const {data, isLoading} = useGetFriendListQuery()
    const chatFriendList = useSelector(state=>state.chatFriendList)

    const chatList = useSelector(state=>state.chatList)

    const dispatch = useDispatch()

    const handleSelectFriendToChat = async contact => {
      const fetchMessageForFriend = async () => {
        dispatch(setLoadingChatList(true))
        const res = await getChatByFriendId(contact.friendId)
        if(res.data.success===true){
        dispatch(setActiveMessengerFriend(contact))
        dispatch(addNewChatIntoList({friendId:contact.friendId,messageList:res.data.data}))
        dispatch(setLoadingChatList(false))
      }else{
        dispatch(setLoadingChatList(false))
      }
    }
    if(chatList.data!==undefined){
      const friendChatBox = chatList.data.filter(friend=>friend.friendId===contact.friendId)
      if(friendChatBox.length<1){
        fetchMessageForFriend()
      }else{
        dispatch(setActiveMessengerFriend(contact))
      }
    }else{
      fetchMessageForFriend()
    }
  }

  const getChatFriendListByChat = async () => {
    if(chatFriendList.data===null){
      dispatch(setLoadingChatFriends(true))
      const res = await getFriendsByChat(0)
      if(res){
        dispatch(setLoadingChatFriends(false))
        if(res.status===200&&res.data.success===true){
          dispatch(storeChatFriendList({operation:"success",data:res.data.data}))
        }else{
          dispatch(storeChatFriendList({operation:"failed"}))
        }
      }

    }
  }

  useEffect(()=>{
    getChatFriendListByChat()
  },[chatFriendList.data])

    if(chatFriendList.isLoading){
        return "loading..."
    }
    return (
        <div className='bg-white dark:bg-secondary-2 rounded shadow w-full h-full overflow-auto'>
        <div className='flex items-center sticky p-2 top-0 rounded bg-primary dark:bg-secondary-2'>
            <input type='search' className='px-2 bg-primary dark:bg-secondary-1 border-0 outline-none py-2 text-sm dark:text-slate-300 text-slate-800 w-full' placeholder='Search connections...' />
            <button className='bg-primary dark:bg-secondary-1 px-2 py-2.5'><BiSearch /></button>
        </div>
        <div className='px-2'>
          {chatFriendList.isLoading===true&&(<div className='h-full w-full flex justify-center items-center'>loading...</div>)}
          {chatFriendList.isLoading===false&&chatFriendList.isError===true&&(<div className='h-full w-full flex justify-center items-center'>failed to load</div>)}
          {chatFriendList.isLoading===false&&chatFriendList.data!==null&&chatFriendList.isError===false&&chatFriendList.data.map((contact,i)=>contact.accepted&&<ContactItem key={i} contact={contact} onClick={handleSelectFriendToChat.bind(this,contact)} />)}
            <div className='w-full mt-5 flex justify-center items-center'>
              <button className='blue-btn'>load more</button>
            </div>
        </div>
    </div>
    )
}
