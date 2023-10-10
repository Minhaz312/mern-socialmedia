import React, { useEffect, useState } from 'react'
import UserProfileImageRenderer from '../common/navigation/UserProfileImageRenderer'
import {BiSearch} from "react-icons/bi"
import { acceptFriendshipRequest, rejectFriendRequest } from '../../api/user/friendship/friendship';
import { Link } from 'react-router-dom';

export default function Friend({friend,renderAsList}) {
    const [friendData,setFriendData] = useState({...friend,username:friend.friend_name,image:friend.friend_image});
    const handleAcceptFriendshipRequest = () => {
        acceptFriendshipRequest(friend.friendId,(err,result)=>{
            if(result){
                setFriendData({...friendData,accepted:true})
            }
        })
    }
    const handleRejectFriendshipRequest = async () => {
        const res = await rejectFriendRequest(friend.friendId)
        if(res){
            setFriendData({...friendData,accepted:null})
        }
    }
    const handleUnfriend = async () => {
        const res = await makeUnfriend(friend.friendId)
        if(res) {
            const newItem = {...people,accepted:null}
            setFriendData(newItem)
        }
    }
    useEffect(()=>{},[friendData])
    if(friendData.accepted===null){
        return ""
    }
  return (
    <div className={`bg-white shadow dark:bg-secondary-2 mb-2 hover:bg-white/60 dark:hover:bg-slate-700/50 p-2 rounded ${renderAsList?"flex justify-between items-center":"block"}`}>
        <div className={renderAsList?'flex gap-x-3':""}>
            <Link to={`/people/${friendData.friendId}`} className={`${renderAsList?"h-[60px]":"w-full h-auto"} aspect-square`}>
                <UserProfileImageRenderer data={friendData} />
            </Link> 
            <div className='flex justify-around flex-col'>
                <Link to={`/people/${friendData.friendId}`} className='mb-2'>{friend.friend_name}</Link>
                {friend.accepted&&<div className={`flex ${renderAsList?"flex-col":"flex-row gap-x-3"} gap-y-3`}>
                    <button className='red-btn' onClick={handleUnfriend}>Disconnect</button>
                </div>}
                {
                    friend.requestStatus===0&&<button className='red-btn'>Cancel Request</button>
                }
                {
                    friend.accepted===false&&friend.requestStatus!==0&&<div className={`flex flex-row gap-x-1 gap-y-3`}>
                        <button className='blue-btn' onClick={handleAcceptFriendshipRequest}>Connect</button>
                        <button className='red-btn' onClick={handleRejectFriendshipRequest}>Reject</button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
