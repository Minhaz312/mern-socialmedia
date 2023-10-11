import React, {useEffect, useState} from 'react'
import TopBar from './navigation/TopBar'
import Sidebar from './navigation/Sidebar'
import checkLoggedin from './../../helpers/checkLoggedin'
import { Navigate } from 'react-router-dom'
import socket from '../../utils/socket'
import getAuthToken from '../../helpers/getAuthToken'
import { FaBars } from 'react-icons/fa'

export default function Layout({children}) {

  const [showSidebar, setShowSidebar] = useState(false)
  const [notificationList, setNotificationList] = useState([])

  const handleShowSidebar = () => {
    if(showSidebar) setShowSidebar(false)
    else setShowSidebar(true)
  }
  
  useEffect(()=>{
    if(checkLoggedin()===true){
      const {user} = getAuthToken()
      socket.connected((socket)=>{
        socket.on(user+"-notification",(data)=>{
          let newList = [...notificationList]
          newList.push(data);
          setNotificationList(list=>[...list,data])
        })
      })
    }
  },[])
  if(checkLoggedin()===false){
    return <Navigate to="/" replace={true} />
  }else{
    return (
      <div className='bg-[#f4f7fb] dark:text-primary dark:bg-secondary-1 h-full w-full overflow-hidden flex flex-col justify-between'>
          <div className='flex bg-white dark:bg-secondary-2 items-center shadow dark:shadow-slate-600 dark:shadow-sm'>
            <button className='border-0 outline-none ps-3' onClick={handleShowSidebar}><FaBars /></button>
            <TopBar />
          </div>
          <div className='flex h-full overflow-hidden'>
            {showSidebar&&<Sidebar />}
            <div className='h-full w-full col-span-11 p-3 overflow-y-auto'>
              {children}
            </div>
          </div>
      </div>
    )
  }
}
