import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/common/Layout'
import TopTabButton from './../../components/people/TopTabButton'
import BioSideBar from '../../components/people/BioSideBar'
import {AiFillClockCircle} from 'react-icons/ai'
import { BiSolidVideos, BiUser } from 'react-icons/bi'
import { LuListVideo } from 'react-icons/lu'
import { BsBellFill, BsChatDotsFill, BsPostcardHeartFill } from 'react-icons/bs'
import VideoCard from '../../components/cs-ui-components/card/VideoCard'
import RecentTabItem from '../../components/people/RecentTabItem'
import VideosTabItem from '../../components/people/VideosTabItem'
import { useGetAuthUserQuery } from '../../store/services/user'
import { FaBars, FaUserFriends } from 'react-icons/fa'
import FriendList from '../../components/profile/FriendList'
import ChatInbox from '../../components/profile/ChatInbox'
import ProfileTabItem from '../../components/profile/ProfileTabItem'
import NotificationList from '../../components/profile/NotificationList'
import SideOptionBar from '../../components/profile/SideOptionBar'
import { IoMdSettings } from 'react-icons/io'
import Settings from '../../components/profile/Settings'
import Modal from '../../components/cs-ui-components/modal/Modal'
import { FiUsers } from 'react-icons/fi'

const profileNaviations = [
  {name:"Recent",icon:()=><AiFillClockCircle />},
  {name:"Videos",icon:()=><BiSolidVideos />},
  {name:"PlayList",icon:()=><LuListVideo />},
  {name:"Posts",icon:()=><BsPostcardHeartFill />},
  {name:"Connections",icon:()=><FaUserFriends />},
  {name:"Messenger",icon:()=><BsChatDotsFill />},
  {name:"Notifications",icon:()=><BsBellFill />},
  {name:"Settings",icon:()=><IoMdSettings />},
]

export default function Profile() {
    
    const {error,isLoading,data} = useGetAuthUserQuery()
    const [activeTab, setActiveTab] = useState('recent')

    const [showProfileNavOptionModal,setShowProfileNavOptionModal] = useState(false)

    
    if(isLoading){
      return (
        <Layout>
          <div className='h-screen w-full grid gap-x-3 grid-cols-12'>
            <div className='col-span-3 h-full bg-white dark:bg-secondary-2 animate-pulse'></div>
          </div>
        </Layout>
    )}
    const handleShowProfileNavOptionModal = () => {
      if(showProfileNavOptionModal) setShowProfileNavOptionModal(false)
      else setShowProfileNavOptionModal(true)
    }
    const ProfileNavigationList = () => {
      return profileNaviations.map((item,i)=><TopTabButton key={i} onClick={()=>setActiveTab(item.name.toLowerCase())} active={activeTab===item.name.toLowerCase()?true:false}>
          {item.icon()}
          <span>{item.name}</span>
        </TopTabButton>)
    }
  return (
    <Layout>
      <Modal show={showProfileNavOptionModal} title='Navigation' footer={false} onHide={handleShowProfileNavOptionModal}>
          <div className=''>
            <div onClick={()=>{
              setActiveTab("profile")
              handleShowProfileNavOptionModal()
            }} className={`w-full p-3 ${activeTab==="profile"?"bg-slate-100 dark:bg-slate-950":"bg-primary dark:bg-secondary-1"} hover:bg-slate-950 transition-all cursor-pointer text-slate-300 border-b dark:border-b-slate-700 border-b-slate-600 mb-2 flex items-center gap-x-3 text-base font-semibold`}>
              <BiUser />
              <p>Profile</p>
            </div>
            {
              profileNaviations.map((item,i)=><div key={i} onClick={()=>{
                setActiveTab(item.name.toLowerCase())
                handleShowProfileNavOptionModal()
                }} className={`w-full p-3 ${activeTab===item.name.toLowerCase()?"bg-slate-100 dark:bg-slate-950":"bg-primary dark:bg-secondary-1"} hover:bg-slate-950 transition-all cursor-pointer text-slate-300 border-b dark:border-b-slate-700 border-b-slate-600 mb-2 flex items-center gap-x-3 text-base font-semibold`}>
                <p>{item.icon()}</p>
                <p>{item.name}</p>
              </div>)
            }
          </div>
      </Modal>
      <div className='h-full flex gap-x-3 w-full'>
        <div className='p-3 w-[20%] bg-white dark:bg-secondary-2 shadow-sm hidden xl:block'>
          <BioSideBar people={data.data.user} />
        </div>
        <div className='w-full xl:w-[80%] h-full flex flex-col justify-between'>
            <div className='bg-white dark:bg-secondary-2 shadow-sm p-2 flex justify-between items-center gap-x-3 gap-y-2'>
                <p className="capitalize font-semibold text-slate-200">{activeTab}</p>
                <div className='flex flex-wrap gap-x-3 gap-y-2 lg:hidden'>
                  <button className='px-2 py-1' onClick={handleShowProfileNavOptionModal}>
                    <FaBars />
                  </button>
                </div>
                <div className='hidden flex-wrap gap-x-3 gap-y-2 lg:flex'>
                  <div className='block xl:hidden'>
                    <TopTabButton onClick={()=>setActiveTab("profile")} active={activeTab==="profile"?true:false}>
                      <BiUser />
                      <span>Profile</span>
                    </TopTabButton>
                  </div>
                  <ProfileNavigationList />
                </div>
            </div>
            {activeTab==="profile"&&(<div className='h-full block md:hidden overflow-x-hidden overflow-y-auto'>
              <ProfileTabItem data={data.data} />
            </div>)}
            {/* <div className='h-full overflow-x-hidden overflow-y-auto'>

            </div> */}
            {activeTab==="recent"&&(<RecentTabItem data={{}} />)}
            {activeTab==="videos"&&(<VideosTabItem data={{}} />)}
            {activeTab==="connections"&&(<FriendList />)}
            {activeTab==="messenger"&&(<ChatInbox list={data.data.friendList} />)}
            {activeTab==="notifications"&&(<NotificationList list={data.data.friendList} />)}
            {activeTab==="settings"&&(<Settings list={data.data.friendList} />)}
        </div>
      </div>
    </Layout>
  )
}
