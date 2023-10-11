import React from 'react'
import UserProfileImageRenderer from './UserProfileImageRenderer'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { logoutUser } from '../../../api/auth/auth'

export default function UserProfileDropDown({show,data}) {
  return (
    <div className={`${show?"block":"hidden"} z-10 absolute top-[120%] right-3 bg-white dark:bg-secondary-2 w-[250px] min-h-[100px] h-auto p-2 rounded dark:shadow-[0px_0.1px_1.5px] shadow-xl dark:shadow-blue-600 border border-slate-200 dark:border-slate-700`}>
      <div className='border-b border-slate-600 mb-3'>
        <Link to="/profile/recent" className='w-full flex gap-x-3 items-center hover:bg-primary dark:hover:bg-slate-700 p-1 mb-2 rounded-xl'>
          <div className='bg-primary dark:bg-secondary-1 p-1 rounded-full h-[45px] border border-blue-500/60 w-[45px]'>
            <UserProfileImageRenderer data={data} />
          </div>
          <h5>{data.username}</h5>
        </Link>
      </div>
      <button className='w-full text-[18px] p-2 rounded-xl flex justify-between items-center font-semibold border-b mb-2 text-slate-900 dark:text-white dark:hover:bg-slate-700 hover:bg-primary' onClick={()=>logoutUser(()=>{})}>
        <p>Logout</p>
        <FiLogOut />
      </button>
      <button className='w-full text-[18px] p-2 rounded-xl flex justify-between items-center font-semibold border-b mb-2 text-slate-900 dark:text-white dark:hover:bg-slate-700 hover:bg-primary' onClick={()=>logoutUser(()=>{})}>
        <p>Dark Theme</p>
        <MdDarkMode />
      </button>
      <button className='w-full text-[18px] p-2 rounded-xl flex justify-between items-center font-semibold border-b mb-2 text-slate-900 dark:text-white dark:hover:bg-slate-700 hover:bg-primary' onClick={()=>logoutUser(()=>{})}>
        <p>Ligth Theme</p>
        <MdOutlineLightMode />
      </button>
    </div>
  )
}
