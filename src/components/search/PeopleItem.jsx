import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants'
import { jsonHeaders } from '../../helpers/axiosHeaders'
import Alert from '../cs-ui-components/alert/Alert'
import { useGetAuthUserQuery } from '../../store/services/user'
import { Link } from 'react-router-dom'
import { acceptFriendshipRequest, cancelFriendRequest, makeUnfriend, rejectFriendRequest, sendFriendRequest } from '../../api/user/friendship/friendship'
import { useGetFriendListQuery } from '../../store/services/friendship'

// if status 1 then it is friend, if 2 then auth user sent the request, if 3 then user sent the friend request

const FriendChecking = ({people, me, friendList}) => {
    let [peopleItem, setPeopleItem] = useState(people)
    const handlSendFriendRequest = id =>{
        sendFriendRequest(people,(err,result)=>{
            const newItem = {...people,status:2}
            setPeopleItem(newItem)
        })
    }
    const handleRejectFriendRequest = async friendId =>{
        const res = await rejectFriendRequest(friendId)
        if(res) {
            const newItem = {...people,status:undefined}
            setPeopleItem(newItem)
        }
    }
    const handleCancelFriendRequest = async friendId =>{
        const res = await cancelFriendRequest(friendId)
        if(res) {
            const newItem = {...people,status:3}
            setPeopleItem(newItem)
        }
    }
    const handleAcceptFriendRequest = id =>{
        acceptFriendshipRequest(people._id,(err,result)=>{
            const newItem = {...people,status:undefined}
            setPeopleItem(newItem)
        })
    }
    const handleUnfriend = async () =>{
        const res = await makeUnfriend(people._id)
        if(res) {
            const newItem = {...people,status:undefined}
            setPeopleItem(newItem)
        }
    }
    useEffect(()=>{},[peopleItem])
    if(peopleItem.status===undefined){
        return <button className='blue-btn' onClick={handlSendFriendRequest.bind(this,peopleItem._id)}>Add Connection</button>
    }else {
        if(peopleItem.status===1){
            return <button className='red-btn' onClick={handleUnfriend.bind(this,peopleItem._id)}>Disconnect</button>
        }else if(peopleItem.status===2){
            return <button className='red-btn' onClick={handleCancelFriendRequest.bind(this,peopleItem._id)}>Cancel Request</button>
        }else if(peopleItem.status===3) {
            return <div className='flex gap-x-2'>
                <button className='blue-btn' onClick={handleAcceptFriendRequest.bind(this,peopleItem._id)}>Accept</button>
                <button className='red-btn' onClick={handleRejectFriendRequest.bind(this,peopleItem._id)}>Reject</button>
            </div>
        }
    }
}

export default function PeopleItem({people}) {
    const {error, isLoading, data} = useGetAuthUserQuery()
    const {data:friendList,isLoading:friendLoading} = useGetFriendListQuery()

    return (
    <div className='bg-white dark:bg-secondary-2 p-2'>
        <Link to={`/people/${people._id}`}>
            {
                people.image!==null?<img src={people.image} className='w-full aspect-square' />:<div className='w-full aspect-square flex justify-center items-center text-3xl font-bold text-slate-500 dark:text-white uppercase bg-primary dark:bg-secondary-1 rounded'>{people.username.substr(0,2)}</div>
            }
            <h3 className='text-base my-2 h-[50px] line-clamp-2'>{people.username}</h3>
        </Link>
        {
            data!==undefined&&friendList!==undefined&&(<FriendChecking people={people} me={data.data} friendList={friendList} />)
        }
        {/* {sent&&<Alert show={sent} type="error" message="what a alert!" />} */}
    </div>
    )
}
