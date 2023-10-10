import React, { useState } from 'react'
import { format } from 'timeago.js'
import { acceptFriendshipRequest } from '../../../api/user/friendship/friendship';

const notificationTypes = [
    "friendship-request","channel-video-publish"
]
export default function ConnectionRequestNotiItem({noti}) {
  const [notification, setNotification] = useState(noti)
  const handleConnect = () => {
        const friendId = notification.actionId;
        setNotification(prev=>({...noti,actionTaken:true,seen:true}))
        // acceptFriendshipRequest(friendId,(err,result)=>{
        // })
    }
    const RequestedUserName = () =>{
      if(notification.title.indexOf("Connection Request Cancelled")===0){
        return notification.title
      }
      return <span className='font-bold'>{notification.title.slice(0,(notification.title.indexOf("sent")))} sent you connection request</span> 
    }
  return (
    <div className='group mb-2 bg-white dark:bg-secondary-2 py-3 px-5 rounded shadow flex justify-between items-center'>
        <div>
          <p><RequestedUserName /></p>
          {notification.title.indexOf("Connection Request Cancelled")===0?<p>{format(notification.updatedAt)}</p>:<p>{format(notification.createdAt)}</p>}
          {notification.actionTaken===false&&<div className='w-full flex gap-x-3 mt-3'>
              <button className='px-3 py-1.5 font-semibold text-sm bg-sky-600 rounded' onClick={handleConnect}>Connect</button>
              <button className='px-2 py-1 font-semibold text-sm bg-slate-500 rounded'>Reject</button>
          </div>}
        </div>
        {notification.seen===false&&(<div>
          <span className='group-hover:hidden block h-2 w-2 bg-sky-500 rounded-full'></span>
          <button className='group-hover:block hidden text-[13px] font-semibold px-1 py-1 rounded bg-sky-700 hover:bg-sky-800 text-white'>mark as read</button>
        </div>)}
    </div>
  )
}
