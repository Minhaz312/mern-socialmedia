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
import { Link, useParams } from 'react-router-dom'

const profileNaviations = [
  {name:"Recent",responsiveTab:false,icon:()=><AiFillClockCircle />},
  {name:"Videos",responsiveTab:true,icon:()=><BiSolidVideos />},
  {name:"PlayList",responsiveTab:false,icon:()=><LuListVideo />},
  {name:"Posts",responsiveTab:true,icon:()=><BsPostcardHeartFill />},
  {name:"Connections",responsiveTab:false,icon:()=><FaUserFriends />},
  {name:"Notifications",responsiveTab:true,icon:()=><BsBellFill />},
  {name:"Settings",responsiveTab:false,icon:()=><IoMdSettings />},
]

export default function Profile() {
  
    const {tab:profileTab} = useParams()

    const {error,isLoading,data} = useGetAuthUserQuery()
    const [activeTab, setActiveTab] = useState(profileTab)

    const [showProfileNavOptionModal,setShowProfileNavOptionModal] = useState(false)

    useEffect(()=>{
      if(activeTab!==profileTab){
        setActiveTab(profileTab)
      }
    },[profileTab])
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
      return profileNaviations.map((item,i)=><Link to={`/profile/${item.name.toLowerCase()}`}>
        <TopTabButton key={i} onClick={()=>setActiveTab(item.name.toLowerCase())} active={activeTab===item.name.toLowerCase()?true:false}>
          {item.icon()}
          <span>{item.name}</span>
        </TopTabButton>
      </Link>)
    }
  return (
    <Layout>
      <Modal show={showProfileNavOptionModal} title='Navigation' footer={false} onHide={handleShowProfileNavOptionModal}>
          <div className=''>
            <Link to={"/profile/profile"} className={`w-full p-3 ${activeTab==="profile"?"bg-slate-100 dark:bg-slate-950":"bg-white dark:bg-secondary-1"} hover:bg-primary dark:hover:bg-slate-950 transition-all cursor-pointer text-slate-600 dark:text-slate-300 border-b dark:border-b-slate-700 border-b-slate-300 mb-2 flex items-center gap-x-3 text-base font-semibold`}>
              <BiUser />
              <p>Profile</p>
            </Link>
            {
              profileNaviations.map((item,i)=><Link to={`/profile/${item.name.toLowerCase()}`} key={i} onClick={()=>{
                setActiveTab(item.name.toLowerCase())
                handleShowProfileNavOptionModal()
                }} className={`w-full p-3 ${activeTab===item.name.toLowerCase()?"bg-slate-100 dark:bg-slate-950":"bg-white dark:bg-secondary-1"} hover:bg-primary dark:hover:bg-slate-950 transition-all cursor-pointer text-slate-600 dark:text-slate-300 border-b dark:border-b-slate-700 border-b-slate-300 mb-2 flex items-center gap-x-3 text-base font-semibold`}>
                <p>{item.icon()}</p>
                <p>{item.name}</p>
              </Link>)
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
                  {profileNaviations.map((item,i)=>{
                    if(item.responsiveTab){
                      return <Link key={i} to={`/profile/${item.name.toLowerCase()}`} className={`px-2 ${activeTab===item.name.toLowerCase()?"text-blue-600":"text-slate-600 dark:text-white"} flex justify-center items-center blue-btn`} active={activeTab==="profile"?true:false}>
                      {item.icon()}
                    </Link>
                    }
                  })}
                  <button className='px-2 py-1' onClick={handleShowProfileNavOptionModal}>
                    <FaBars />
                  </button>
                </div>
                <div className='hidden flex-wrap gap-x-3 gap-y-2 lg:flex'>
                  <div className='block xl:hidden'>
                    <Link to="/profile/profile">
                      <TopTabButton onClick={()=>setActiveTab("profile")} active={activeTab==="profile"?true:false}>
                        <BiUser />
                        <span>Profile</span>
                      </TopTabButton>
                    </Link>
                  </div>
                  <ProfileNavigationList />
                </div>
            </div>
            {activeTab==="profile"&&(<div className='h-full block md:hidden overflow-x-hidden overflow-y-auto'>
              <ProfileTabItem data={data.data} />
            </div>)}
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
