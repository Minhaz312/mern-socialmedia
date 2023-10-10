import React from 'react'
import { BiSolidMessageRounded } from 'react-icons/bi'
import { TiHome } from 'react-icons/ti'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { logoutUser } from '../../../api/auth/auth'

const RenderLinks = ({links,active}) =>{
  return links.map((link,i)=>{
    const isActive = link.link===active
    return <Link to={link.link} key={i} className={`text-[25px] transition-opacity ${isActive?"md:bg-blue-600/30 md:border-s-8 border-blue-500 text-[#2295FF]":"md:hover:border-s-8 hover:border-slate-300 dark:hover:border-slate-600 md:dark:hover:bg-slate-500/30 md:hover:bg-slate-400/10 text-slate-500"} py-3 md:pr-3 rounded-r-full flex justify-end w-4/5 mb-0.5 md:text-[28px]`}>{link.icon()}</Link>
  })
}

export default function Sidebar() {
  const links = [
    {name:"Home",link:"/one",icon: ()=><TiHome />},
    {name:"Messenger",link:"/messenger/123",icon: ()=><BiSolidMessageRounded />},
  ]

  const location = useLocation()

  const handleLogout = () => {
    logoutUser()
  }
  
  return (
    <div className='bg-white dark:bg-secondary-2 shadow dark:shadow-slate-600 dark:shadow-sm h-full mb-10 w-[50px] md:w-[100px] flex flex-col justify-between'>
      <div>
        <RenderLinks links={links} active={location.pathname} />
      </div>
      <button className='text-[25px] py-3 md:pr-5 rounded-r-full flex justify-end w-4/5 mb-0.5 text-slate-900 dark:text-white' onClick={handleLogout}><FiLogOut /></button>
    </div>
  )
}
