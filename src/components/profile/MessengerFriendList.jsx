import React from 'react'
import { useGetFriendListQuery } from '../../store/services/friendship'
import { useDispatch, useSelector } from 'react-redux'
import { addNewChatIntoList, setActiveMessengerFriend, setLoadingChatList } from '../../store/slice/chatListSlice'
import { BiSearch } from 'react-icons/bi'
import ContactItem from '../messenger/ContactItem'
import { getChatByFriendId } from '../../api/messenger/messenger'

export default function MessengerFriendList() {
    const {data, isLoading} = useGetFriendListQuery()

    const chatList = useSelector(state=>state.chatList)

    const dispatch = useDispatch()

    const handleSelectFriendToChat = async contact => {
    dispatch(setActiveMessengerFriend(contact))
    const fetchMessageForFriend = async () => {
      dispatch(setLoadingChatList(true))
      const res = await getChatByFriendId(contact.friendId)
      if(res.data.success===true){
        dispatch(addNewChatIntoList({friendId:contact.friendId,messageList:res.data.data}))
        dispatch(setLoadingChatList(false))
      }else{
        dispatch(setActiveMessengerFriend(null))
        dispatch(addNewChatIntoList(null))
        dispatch(setLoadingChatList(false))
      }
    }
    if(chatList.data!==undefined){
      const friendChatBox = chatList.data.filter(friend=>friend.friendId===contact.friendId)
      console.log('friendChatBox from frnd selection: ',friendChatBox)
      if(friendChatBox.length<1){
        fetchMessageForFriend()
      }else{
        dispatch(setActiveMessengerFriend(contact))
      }
    }else{
      fetchMessageForFriend()
    }
  }

    if(isLoading){
        return "loading..."
    }
    return (
        <div className='bg-white dark:bg-secondary-2 rounded shadow w-full h-full overflow-auto'>
        <div className='flex items-center sticky p-2 top-0 rounded bg-primary dark:bg-secondary-2'>
            <input type='search' className='px-2 bg-primary dark:bg-secondary-1 border-0 outline-none py-2 text-sm dark:text-slate-300 text-slate-800 w-full' placeholder='Search connections...' />
            <button className='bg-primary dark:bg-secondary-1 px-2 py-2.5'><BiSearch /></button>
        </div>
        <div className='px-2'>
            {
            data.data.map((contact,i)=>contact.accepted&&<ContactItem key={i} contact={contact} onClick={handleSelectFriendToChat.bind(this,contact)} />)
            }
            <div className='w-full mt-5 flex justify-center items-center'>
              <button className='blue-btn'>load more</button>
            </div>
        </div>
    </div>
    )
}
