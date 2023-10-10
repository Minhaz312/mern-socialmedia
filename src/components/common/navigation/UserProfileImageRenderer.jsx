import React from 'react'

export default function UserProfileImageRenderer({data}) {
    if(data.image!==null && data.image!==undefined){
        return <img src={data.image} className='cursor-pointer h-full w-full rounded-full' />
    }else{
        return <div className='cursor-pointer w-full aspect-square flex justify-center items-center text-base font-bold text-slate-500 dark:text-white uppercase bg-primary dark:bg-secondary-1 rounded'>{data.username.substr(0,2)}</div>
    }
}
