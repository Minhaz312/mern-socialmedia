import React from 'react'
import Layout from '../../components/common/Layout'
import { useSelector } from 'react-redux'
import { BiLeftArrowAlt, BiVolumeFull } from 'react-icons/bi'
import { MdKeyboardVoice } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

export default function AudioCall() {
    const navigate = useNavigate()
    const friend = useSelector(state=>state.chatList.inboxActivefriend)
    const handleGoBack = () => {
        navigate("/profile")
    }
  return (
    <Layout>
        <div className='h-full w-full overflow-hidden'>
        <Link to="/profile/messenger" className='px-3 py-1' ><BiLeftArrowAlt size={25} /></Link>
            {friend!==undefined&&(<div className='h-full w-full flex justify-center items-center flex-col'>
                <div>
                    <div className='flex mx-auto justify-center items-center h-[130px] w-[130px] md:h-[200px] md:w-[200px] rounded-full bg-secondary-2 mb-5'>
                        {friend.friend_image!==null&&(<h1>{friend.friend_name.substring(0,2)}</h1>)}
                        {/* {friend.friend_image!==null&&(<img src={friend.friend_image} className='h-full w-full rounded-full' />)} */}
                    </div>
                    <h1 className='text-2xl'>{friend.friend_name}</h1>
                </div>
                <div className='mt-8 flex items-center gap-x-3'>
                    <div className='mt-6 flex justify-center'>
                        <button className='bg-secondary-2 rounded-full px-3 py-2 text-base'><BiVolumeFull /></button>
                    </div>
                    <div className='mt-5 flex justify-center'>
                        <button className='red-btn px-3 py-2 text-base'>End Call</button>
                    </div>
                    <div className='mt-6 flex justify-center'>
                        <button className='bg-secondary-2 rounded-full px-3 py-2 text-base'><MdKeyboardVoice /></button>
                    </div>
                </div>
            </div>)}
        </div>
    </Layout>
  )
}
