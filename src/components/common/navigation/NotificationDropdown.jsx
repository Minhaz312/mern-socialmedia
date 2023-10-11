import React, { useEffect } from 'react'
import UserProfileImageRenderer from './UserProfileImageRenderer'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { logoutUser } from '../../../api/auth/auth'
import { BiSolidUserPlus } from 'react-icons/bi'

import { format } from 'timeago.js'
import FriendRequestNotificationItem from './FriendRequestNotificationItem'


export default function NotificationDropdown({show,data}) {
  return (
    <div className={`${show?"block":"hidden"} z-10 absolute top-[120%] right-3 bg-white dark:bg-secondary-2 w-[350px] min-h-[150px] max-h-[90vh] h-auto overflow-y-auto p-2 rounded shadow-2xl darK:shadow-[0px_0.1px_1.5px] dark:border-blue-900/80 border border-slate-200`}>
      <h6 className='mb-3 font-semibold text-slate-500'>Notifications</h6>
      {
        data.length>0?data.map((noti,i)=><div key={i} className={`${i!==data.length-1&&"border-b border-slate-200 dark:border-slate-600"} mb-3`}>
          <div className={`w-full ${noti.seen?"bg-transparent":"dark:hover:bg-secondary-1 hover:bg-primary"} p-2 mb-2 rounded-xl`}>
            <FriendRequestNotificationItem key={i} noti={noti} />
          </div>
        </div>):<div>
          <p className='text-center mt-14'>No notifications</p>
        </div>
      }
    </div>
  )
}
