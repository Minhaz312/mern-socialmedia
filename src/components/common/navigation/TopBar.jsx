import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BiSearch} from "react-icons/bi"
import {BsChatDotsFill} from "react-icons/bs"
import {IoClose, IoNotifications} from "react-icons/io5"
import { useGetAuthUserQuery } from '../../../store/services/user'
import UserProfileImageRenderer from './UserProfileImageRenderer'
import UserProfileDropDown from './UserProfileDropDown'
import NotificationDropdown from './NotificationDropdown'
import { getUnreadNotification } from '../../../api/notification/notification'
import socket from '../../../utils/socket'
import getAuthToken from '../../../helpers/getAuthToken'

export default function TopBar() {

  const [searchInputFoucused, setSearchInputFoucused] = useState(false)

  const location = useLocation()
  const router = useNavigate()
  const [keyword, setKeyword] = useState("")

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const [showMobileSearch,setShowMobileSearch] = useState(false)

  const [showNotificationList, setShowNotificationList] = useState(false)
  const [notificationList, setNotificationList] = useState([])
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0)

  const {error, isLoading, data} = useGetAuthUserQuery()
  const handleSearch = () => {
    if(keyword.trim()!==""){
      router(`/search/${keyword}`,{replace:true})
    }
  }
  const handleShowProfileDropdown = () => {
    if(showProfileDropdown) setShowProfileDropdown(false)
    else setShowProfileDropdown(true)

    if(showNotificationList) setShowNotificationList(false)
  }
  const handleShowNotificationList = () => {
    if(showNotificationList) setShowNotificationList(false)
    else {
      setShowNotificationList(true)
    }
    if(showProfileDropdown) setShowProfileDropdown(false)
  }
  const handleShowMobileSearch = () => {
    if(showMobileSearch) setShowMobileSearch(false)
    else {
      setShowMobileSearch(true)
    }
  }
    const {user} = getAuthToken()
    socket.connected(socket=>{
      socket.on(user+"-notification",(data)=>{
        let newList = [...notificationList]
        newList.push(data);
        setNotificationList(list=>[...list,data])
      })
    })

  useEffect(()=>{
    getUnreadNotification(0,(err,data)=>{
        setNotificationList(data);
    },0)
  },[])

  useEffect(()=>{
    let list = notificationList.filter(n=>n.seen===false)
    setTotalUnreadNotification(list)

  },[notificationList])

  return (
    <div className={`bg-white w-full dark:bg-secondary-2 py-2`}>
      {showMobileSearch===false&&(<div className='flex justify-between items-center w-full px-5'>
        <div>
          <img src='/images/logo.png' className='h-[25px] w-auto md:h-[30px]' />
        </div>
        <div onClick={()=>setSearchInputFoucused(true)} onMouseDown={()=>setSearchInputFoucused(false)} className='hidden relative w-[450px] bg-primary dark:bg-secondary-1 rounded-lg p-1 md:block'>
          <div className='flex bg-white dark:bg-secondary-2 w-full'>
            <input type='search' onChange={e=>setKeyword(e.target.value)} className='block w-full px-5 py-2 bg-transparent outline-none' placeholder='search...' />
            <button className='px-3' onClick={handleSearch}><BiSearch size={20} /></button>
          </div>
          {/* search history list */}
          {/* {
            searchInputFoucused&&(<div className='absolute bg-inherit left-0 right-0 w-full min-h-32 text-white'>
              {isLoading===false&&data!==undefined&&data.data.user.searchHistory!==undefined&&(<div className='bg-secondary-2 mx-1 mb-1'>{
                data.data.user.searchHistory.reverse().map((history,i)=><div key={i} className='flex justify-between items-center border-b p-2 mb-2'>
                  <p>{history.title}</p>
                  <span>x</span>
                </div>)
              }</div>)}
            </div>)
          } */}
        </div>
        <div className='flex items-center gap-x-1 md:gap-x-3'>
          <div className='block md:hidden'>
            <button className={`relative w-[35px] h-[35px] rounded-full text-[25px] p-2 flex justify-center items-center transition-all ${showMobileSearch?"bg-blue-500/20 ring-1 text-blue-500":"text-slate-600 dark:bg-slate-700 bg-primary"} hover:bg-blue-500/20 hover:ring-1 hover:text-blue-500`} onClick={handleShowMobileSearch}><BiSearch size={20} /></button>
          </div>
          <div className=''>
            <Link to="/profile/messenger" className={`relative w-[35px] h-[35px] rounded-full text-[25px] p-2 flex justify-center items-center transition-all ${location.pathname==="/profile/messenger"?"bg-blue-500/20 ring-1 text-blue-500":"dark:bg-slate-700 bg-primary text-slate-600"} hover:bg-blue-500/20 hover:ring-1 hover:text-blue-500`}><BsChatDotsFill size={20} /></Link>
          </div>
          <div className='relative' >
            <button onClick={handleShowNotificationList} className={`relative w-[35px] h-[35px] rounded-full text-[25px] p-2 flex justify-center items-center transition-all ${showNotificationList?"bg-blue-500/20 ring-1 text-blue-500":"text-slate-600 dark:bg-slate-700 bg-primary"} hover:bg-blue-500/20 hover:ring-1 hover:text-blue-500`}>
              <IoNotifications />
              <div className='bg-red-500 text-white font-bold text-[12px] absolute -top-1 -right-1 h-[17px] w-[17px] rounded-full'>{totalUnreadNotification.length}</div>
              </button>
            {notificationList!==null&&<NotificationDropdown show={showNotificationList} data={notificationList} />}
          </div>
          {isLoading===false&&data!==undefined&&(
            <div className='bg-primary dark:bg-secondary-1 p-1 rounded-full h-[40px] border border-blue-500/60 w-[40px] relative' onClick={handleShowProfileDropdown}>
                <UserProfileImageRenderer data={data?.data.user} />
                <UserProfileDropDown show={showProfileDropdown} data={data?.data.user} />
            </div>
          )}
        </div>
      </div>)}
      {showMobileSearch&&(<div>
        <div onClick={()=>setSearchInputFoucused(true)} onMouseDown={()=>setSearchInputFoucused(false)} className='block relative w-full px-3 md:hidden'>
          <div className='flex bg-white dark:bg-secondary-1 w-full'>
            <input type='search' onChange={e=>setKeyword(e.target.value)} className='block w-full px-3 bg-transparent outline-none' placeholder='search...' />
            <button className='px-3' onClick={handleSearch}><BiSearch size={15} /></button>
            <button className='border-l my-2.5 px-3' onClick={handleShowMobileSearch}><IoClose size={15} /></button>
          </div>
          {/* search history list */}
          {/* {
            searchInputFoucused&&(<div className='absolute bg-inherit left-0 right-0 w-full min-h-32 text-white'>
              {isLoading===false&&data!==undefined&&data.data.user.searchHistory!==undefined&&(<div className='bg-secondary-2 mx-1 mb-1'>{
                data.data.user.searchHistory.reverse().map((history,i)=><div key={i} className='flex justify-between items-center border-b p-2 mb-2'>
                  <p>{history.title}</p>
                  <span>x</span>
                </div>)
              }</div>)}
            </div>)
          } */}
        </div>
      </div>)}
    </div>
  )
}
