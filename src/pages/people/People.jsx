import React, { useEffect, useState } from 'react'
import Layout from '../../components/common/Layout'
import TopTabButton from './../../components/people/TopTabButton'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { jsonHeaders } from '../../helpers/axiosHeaders'
import BioSideBar from '../../components/people/BioSideBar'
import {AiFillClockCircle} from 'react-icons/ai'
import { BiSolidVideos } from 'react-icons/bi'
import { LuListVideo } from 'react-icons/lu'
import { BsChatDotsFill, BsPostcardHeartFill } from 'react-icons/bs'
import VideoCard from '../../components/cs-ui-components/card/VideoCard'
import RecentTabItem from '../../components/people/RecentTabItem'
import VideosTabItem from '../../components/people/VideosTabItem'
import Inbox from '../../components/profile/Inbox'

export default function People() {
    const params = useParams()
    const [people, setPeople] = useState({})
    const [loading, setLoading] = useState(false)

    const [activeTab, setActiveTab] = useState('recent')

    const getPeople = () => {
      setLoading(true)
      axios.get(`${API_URL}/user/get/${params.peopleId}`,{headers:jsonHeaders}).then(res=>{
        if(res.status === 200 && res.data.success === true) {
          console.log(res)
          setPeople(res.data.data.user);
        }else{
          setPeople(null)
        }
        setLoading(false)
      }).catch(err=>{
        setPeople(null)
        setLoading(false)
      })
    }
    useEffect(()=>{
      getPeople()
    },[params.peopleId])
    if(loading){
      return (
        <Layout>
          <div className='h-screen w-full grid gap-x-3 grid-cols-12'>
            <div className='col-span-3 h-full bg-white dark:bg-secondary-2 animate-pulse'></div>
          </div>
        </Layout>
    )}
  return (
    <Layout>
      <div className='h-full flex gap-x-3 overflow-hidden w-full'>
        <div className='p-3 w-[20%] bg-white dark:bg-secondary-2 shadow-sm'>
          <BioSideBar people={people} />
        </div>
        <div className='w-[80%] flex flex-col justify-between h-full overflow-y-auto'>
            <div className='bg-white dark:bg-secondary-2 shadow-sm p-2 flex justify-between'>
                <div className='flex gap-x-3'>
                  <TopTabButton onClick={()=>setActiveTab("recent")} isActive={activeTab==="recent"?true:false}>
                    <AiFillClockCircle />
                    <p>Recent</p>
                  </TopTabButton>
                  <TopTabButton onClick={()=>setActiveTab("videos")} isActive={activeTab==="videos"?true:false}>
                    <BiSolidVideos />
                    <p>Videos</p>
                  </TopTabButton>
                  <TopTabButton onClick={()=>setActiveTab("video-playlist")} isActive={activeTab==="video-playlist"?true:false}>
                    <LuListVideo />
                    <p>Video PlayList</p>
                  </TopTabButton>
                  <TopTabButton onClick={()=>setActiveTab("posts")} isActive={activeTab==="posts"?true:false}>
                    <BsPostcardHeartFill />
                    <p>Posts</p>
                  </TopTabButton>
                  {people.friendshipStatus===1&&(<TopTabButton onClick={()=>setActiveTab("inbox")} isActive={activeTab==="inbox"?true:false}>
                    <BsChatDotsFill />
                    <p>Inbox</p>
                  </TopTabButton>)}
                </div>
                {people.friendshipStatus===undefined&&(<button className='blue-btn'>Add Connection</button>)}
                {people.friendshipStatus===1&&(<button className='red-btn'>Disconnect</button>)}
                {people.friendshipStatus===2&&(<button className='red-btn'>Cancel Request</button>)}
                {people.friendshipStatus===3&&(<div className='flex gap-x-3'>
                  <button className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded'>Connect</button>
                  <button className='px-3 py-1.5 bg-slate-500 hover:bg-slate-600 transition-colors text-white font-semibold rounded'>Reject</button>
                </div>)}
            </div>
            <div className='pt-3 h-full overflow-hidden'>
            {activeTab==="recent"&&(<RecentTabItem data={{}} />)}
            {activeTab==="videos"&&(<VideosTabItem data={{}} />)}
              {people.friendshipStatus===1&&activeTab==="inbox"&&(<Inbox data={{}} />)}
            </div>
        </div>
      </div>
    </Layout>
  )
}
