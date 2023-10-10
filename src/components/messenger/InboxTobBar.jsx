import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {IoIosCall} from 'react-icons/io'
import {FaVideo} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { FiUsers } from 'react-icons/fi'
import Modal from '../cs-ui-components/modal/Modal'
import MessengerFriendList from '../profile/MessengerFriendList'
export default function InboxTobBar() {

  const activeMessengerFriend = useSelector(state=>state.chatList.inboxActivefriend)

  const [showProfileMessengerFriendListModal,setShowProfileMessengerFriendListModal] = useState(false)

  const handleShowProfileMessengerFriendListModal = () => {
    if(showProfileMessengerFriendListModal) setShowProfileMessengerFriendListModal(false)
    else setShowProfileMessengerFriendListModal(true)
  }
  return (
    <>
    <Modal show={showProfileMessengerFriendListModal} title='Messenger Friend List' className='' footer={false} onHide={handleShowProfileMessengerFriendListModal}>
        <MessengerFriendList />
    </Modal>
    <div className='border-b dark:border-slate-500 mb-3 pb-3 flex justify-between items-center'>
        <div className='flex gap-x-3'>
          {activeMessengerFriend.friend_image!==null&&(<img src={activeMessengerFriend.friend_image} className='w-10 h-10 rounded-full' />)}
          {activeMessengerFriend.friend_image===null&&(<div className='w-9 h-9 dark:bg-secondary-1 flex justify-center items-center border border-slate-400 rounded-full font-semibold uppercase md:w-10 md:h-10'>{activeMessengerFriend.friend_name.substring(0,2)}</div>)}
          <p className='hidden md:block'>{activeMessengerFriend.friend_name}</p>
        </div>
        <div className='flex'>
            <Link to={`/friend/call/audio/${activeMessengerFriend.friendId}`} className='px-3 text-xl md:text-2xl text-slate-500'><IoIosCall /></Link>
            <button className='px-3 text-xl md:text-2xl text-slate-500'><FaVideo /></button>
            <button className='block px-3 text-xl py-1 border-l border-slate-600 dark:border-slate-400 md:text-2xl md:hidden' onClick={handleShowProfileMessengerFriendListModal}>
              <FiUsers />
            </button>
        </div>
    </div>
    </>
  )
}
