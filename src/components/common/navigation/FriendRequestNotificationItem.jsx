import React, { useEffect, useState } from 'react'
import { BiSolidUserPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { acceptFriendshipRequest } from '../../../api/user/friendship/friendship'
import { markNotificationAsRead } from '../../../api/notification/notification'

export default function FriendRequestNotificationItem({noti}) {
    const [notification,setNotification] = useState(noti)
    const timeago = format(notification.createdAt)
    const handleConnect = () => {
        const friendId = notification.actionId;
        acceptFriendshipRequest(friendId,(err,result)=>{
            console.log("accept err: ",err)
            console.log("accept result: ",result)
        })
    }
    const handleMarkNotificationAsSeen = async id => {
        const res = await markNotificationAsRead(id)
        setNotification(prevVal=>({...prevVal,actionTaken:true}))
    }
    useEffect(()=>{},[notification])
    if(notification.type==="connection-response"){
        return <div className='flex justify-between gap-x-5 items-center'>
        <div className='flex gap-x-3 items-start'>
            <div className='bg-primary dark:bg-secondary-1 p-1 rounded-full h-[45px] border border-blue-500/60 w-[45px] flex justify-center items-center text-slate-700 dark:text-slate-300 text-[33px]'>
            {notification.type==="connection-request"&&<BiSolidUserPlus />}
            </div>
            <Link to={`/people/${notification.actionId}`}>
                <p className={`${notification.seen?"text-slate-300/90":"text-slate-200"}`}>{notification.title}</p>
                <p className='font-semibold text-blue-700'>{timeago}</p>
            </Link>
        </div>
        <span className='h-3 w-3 rounded-full bg-sky-400'></span>
    </div>
    }
  return (
    <div className='group flex justify-between items-center'>
        <div className='flex gap-x-3 items-start'>
            <div className='bg-primary dark:bg-secondary-1 p-1 rounded-full h-[45px] border border-blue-500/60 w-[45px] flex justify-center items-center text-slate-700 dark:text-slate-300 text-[33px]'>
            {notification.type==="connection-request"&&<BiSolidUserPlus />}
            </div>
            <div>
            <h1 to={`/people/${notification.actionId}`} className='cursor-pointer' onClick={handleMarkNotificationAsSeen}>
                <p className={`${notification.seen?"text-slate-300/90":"text-slate-200"}`}>{notification.title}</p>
                <p className='font-semibold text-blue-700'>{timeago}</p>
            </h1>
            {notification.actionTaken===false&&<div className='w-full flex gap-x-3 mt-3'>
                <button className='px-2 py-1 font-semibold text-sm bg-sky-600 rounded-lg' onClick={handleConnect}>Connect</button>
                <button className='px-2 py-1 font-semibold text-sm bg-slate-500 rounded-lg'>Reject</button>
            </div>}
            </div>
        </div>
        <span className='h-3 w-3 rounded-full bg-sky-400'></span>
        {/* <button className='group-hover:block hidden h-3 w-3 rounded-full bg-sky-400 text-white font-semibold text-[13px]'>Mark as seen</button> */}
    </div>
  )
}
