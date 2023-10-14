import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'
import socket from '../../utils/socket'
import { CHAT_EVENTS_NAME } from '../../utils/constants'
import getAuthToken from '../../helpers/getAuthToken'

export default function MessageList() {
    const {user} = getAuthToken()

    const messageBoxListDiv = useRef(null)

    const [isTyping, setIsTyping] = useState(false)
    const chatList = useSelector(state=>state.chatList)
    const chatFriend = useSelector(state=>state.chatList.inboxActivefriend)


    
    useEffect(()=>{
        socket.getSocket().on(`${user}-chat-friend-typing`,data=>{
            if(data.userId.toString()===chatFriend.friendId.toString()){
                setIsTyping(true)
            }
        })
        socket.getSocket().on(`${user}-chat-friend`,data=>{
            console.log('stop typing')
            setIsTyping(false)
            if(messageBoxListDiv.current!==null) {
                messageBoxListDiv.current.scrollIntoView({block:"end"})
            }
        })
        if(messageBoxListDiv.current!==null) {
            messageBoxListDiv.current.scrollIntoView({block:"end"})
        }
        console.log('scroll down')
    },[])
    useEffect(()=>{
        if(messageBoxListDiv.current!==null) {
            messageBoxListDiv.current.scrollIntoView({block:"end"})
        }
        console.log('scroll down for asdf')
    },[isTyping,chatList])
    const friendChatBox = chatList.data.filter(friend=>friend.friendId===chatFriend.friendId)[0]
    if(chatList.isLoading){
        return "loading..."
    }
    if(friendChatBox===undefined){
        return "friendChatBoxUndefined"
    }
    if(friendChatBox.messageList.length<1){
        return (
            <div className='h-[90%]'>
                <div className='p-3 h-full w-full flex justify-center items-center overflow-hidden'>
                    no message found
                </div>
                <div className={`gap-x-2 items-center ${isTyping?"flex":"hidden"}`}>
                    {chatFriend.friend_image!==null&&(<img src={chatFriend.friend_image} className='h-[35px] w-[35px] rounded-full' />)}
                        {chatFriend.friend_image===null&&(<div className='h-10 w-10 bg-primary border border-slate-500 uppercase text-md font-semibold dark:bg-secondary-1 rounded-full flex justify-center items-center'>
                            {chatFriend.friend_name.substring(0,2)}
                    </div>)}
                    <p className='dark:text-slate-300 text-slate-600'>typing...</p>
                </div>
            </div>
        )
    }
  return (
    <div ref={messageBoxListDiv} className='min-h-[90%] p-3'>
        {
            friendChatBox.messageList.map((item,i)=>{
                const showProfile = i>0?friendChatBox.messageList[i-1].userId.toString()===item.userId.toString()?false:true:true
                if(item.userId.toString()===chatFriend.userId.toString()){
                    return <div key={i} className='w-full my-2'>
                        <div className='flex justify-end'>
                            <div>
                                <p className='bg-blue-600 text-white dark:bg-blue-900 dark:text-slate-100 p-3 rounded-xl'>{item.message}</p>
                                {i===friendChatBox.messageList.length-1&&(<p className='block text-sm dark:text-slate-400 text-slate-700'>{format(item.createdAt)}</p>)}
                            </div>
                        </div>
                    </div>
                }else{
                    return <div key={i} className='w-full my-2'>
                        <div className='flex gap-x-3 w-[70%] md:w-[45%]'>
                            {showProfile&&(<div>
                                {chatFriend.friend_image!==null&&(<img src={chatFriend.friend_image} className='h-[40px] w-[40px] rounded-full' />)}
                                {chatFriend.friend_image===null&&(<div className='h-10 w-10 bg-primary border border-slate-500 uppercase text-md font-semibold dark:bg-secondary-1 rounded-full flex justify-center items-center'>
                                    {chatFriend.friend_name.substring(0,2)}
                                </div>)}
                            </div>)}
                            <div>
                                <p className={`bg-slate-200 ${!showProfile&&"ml-[50px]"} dark:bg-slate-600 font-[450] p-3 text-[16px] rounded-xl`}>{item.message}</p>
                                {i===friendChatBox.messageList.length-1&&(<p className='block text-sm dark:text-slate-400 text-slate-700'>{format(item.createdAt)}</p>)}
                            </div>
                        </div>
                    </div>
                }
            })
        } 
        <div className={`gap-x-2 items-center ${isTyping?"flex":"hidden"}`}>
            {chatFriend.friend_image!==null&&(<img src={chatFriend.friend_image} className='h-[35px] w-[35px] rounded-full' />)}
                {chatFriend.friend_image===null&&(<div className='h-10 w-10 bg-primary border border-slate-500 uppercase text-md font-semibold dark:bg-secondary-1 rounded-full flex justify-center items-center'>
                    {chatFriend.friend_name.substring(0,2)}
            </div>)}
            <p className='dark:text-slate-300 text-slate-600'>typing...</p>
        </div>
    </div>
  )
}
