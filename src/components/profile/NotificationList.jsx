import React, { useEffect, useState } from 'react'
import { getNotification } from '../../api/notification/notification';
import NotificationListRenderer from './notification/NotificationListRenderer'
import { useGetNotificationMutation } from '../../store/services/notification';
export default function NotificationList() {

  const [getNotification,result] = useGetNotificationMutation()
  const {data:notificationList,isLoading} = result;
  console.log('notification result: ',result)
  console.log('notification list: ',notificationList)

  const [allNotification, setAllNotification] = useState([])
  const [readNotification, setReadNotification] = useState([])
  const [unreadNotification, setUnreadNotification] = useState([])

  const [notiTabType, setNotiTabType] = useState("all");
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getNotification(0,(err,data)=>{
      if(err!==null || err!==true) {
        setAllNotification(data);
      }
      setLoading(false)
    })
  },[])

  return (
    <div className='h-full overflow-auto'>
      {/* notification filter navbar */}
      <div className='my-3 w-full p-2 bg-white dark:bg-secondary-2 flex justify-center items-center'>
        <div>
          <button className='bg-primary dark:bg-secondary-1 px-2 py-1 rounded mx-1'>All</button>
          <button className='bg-primary dark:bg-secondary-1 px-2 py-1 rounded mx-1'>Read</button>
          <button className='bg-primary dark:bg-secondary-1 px-2 py-1 rounded mx-1'>Unread</button>
        </div>
      </div>
      {/* notification list section */}
      {isLoading&&notificationList===undefined&&(<div>loading...</div>)}
      {isLoading===false&&notificationList!==undefined&&(<div>
        {notificationList.data.length>0&&(<div className='w-[90] md:w-[50%] mx-auto'>
          {notificationList.data.map((noti,i)=><NotificationListRenderer key={i} noti={noti} />)}</div>)}
        {notificationList.data.length<1&&(<div className='w-full h-full pt-14 flex justify-center items-center'><h5 className='font-semibold text-slate-400'>You have no notification</h5></div>)}
      </div>)}
      
    </div>
  )
}
