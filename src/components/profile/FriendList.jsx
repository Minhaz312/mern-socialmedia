import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { BiSearch } from 'react-icons/bi'
import { FaList } from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import { useGetFriendListQuery } from '../../store/services/friendship'

export default function FriendList({list,page=0}) {
  const {data,isLoading} = useGetFriendListQuery(page)
  const [friendList, setFriendList] = useState(data!==undefined?data:[]);
  const [listViewType, setListViewType] = useState("list")

  const handleShowAllConnections = () => {
    setFriendList(list)
  }

  const handleSeeJustConnections = () => {
    let justConnections = []
    list.map(f=>{
      if(f.accepted){
        justConnections.push(f);
      }
    })
    if(justConnections.length>0){
      setFriendList(justConnections)
    }
  }
  const handleSeeConnectionRequests = () => {
    let connectionRequest = []
    list.map(f=>{
      if(f.accepted===false){
        connectionRequest.push(f);
      }
    })
    if(connectionRequest.length>0){
      setFriendList(connectionRequest)
    }
  }
  const handleSeeConnectionBlocked = () => {
    let connectionBlocked = []
    list.map(f=>{
      if(f.blocked){
        connectionBlocked.push(f);
      }
    })
    setFriendList(connectionBlocked)
  }

  return (
      <div className='w-full h-full my-3 grid grid-cols-12 gap-x-3 items-start'>
          <div className='col-span-12 h-full overflow-y-auto'>
              <div className='mb-3 flex justify-between items-center bg-white dark:bg-secondary-2 p-2 rounded-md shadow'>
                  <h5>Connection List</h5>
                  <div className='flex items-center gap-x-3'>
                    <div className='flex items-center px-2 rounded bg-primary dark:bg-secondary-1'>
                        <input type='search' className='bg-transparent border-0 outline-none py-1 text-sm dark:text-slate-300 text-slate-800 w-full' placeholder='Search connections...' />
                        <button><BiSearch /></button>
                    </div>
                    <div className='flex justify-center items-center gap-x-2'>
                      <button disabled={listViewType==="grid"} className={`${listViewType==="grid"?"bg-blue-500/30 text-blue-500":"bg-blue-500/10 text-slate-400"} px-2 py-2 rounded`} onClick={()=>setListViewType("grid")}><BsFillGridFill /></button>
                      <button disabled={listViewType==="list"} className={`${listViewType==="list"?"bg-blue-500/30 text-blue-500":"bg-blue-500/10 text-slate-400"} px-2 py-2 rounded`} onClick={()=>setListViewType("list")}><FaList /></button>
                    </div>
                    <div>
                      <select className='bg-secondary-1 text-white px-3 py-1 outline-none border-none focus:ring-1'>
                        <option>All</option>
                        <option>Requested</option>
                        <option>Connected</option>
                      </select>
                    </div>
                  </div>
              </div>
              {data===undefined&&isLoading&&(<div className='w-full h-2/3 flex justify-center items-center'>
                  <h6 className="text-slate-400 font-bold">Loading...</h6>
              </div>)}
              {data!==undefined&&isLoading===false&&data.data.length<1&&(<div className='w-full h-2/3 flex justify-center items-center'>
                  <h6 className="text-slate-400 font-bold">No Connections</h6>
              </div>)}
              {
                data!==undefined&&isLoading===false&&data.data.length>0&&(<div className={listViewType==="grid"?"grid grid-cols-3 xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-sm-3 gap-2":"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3"}>
                {data.data.map((friend,i)=><Friend key={i} renderAsList={listViewType==="list"?true:false} friend={friend} />)}
              </div>)
              }
              
          </div>
      </div>
  )
}
