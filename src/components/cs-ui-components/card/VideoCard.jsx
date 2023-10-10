import React from 'react'

export default function VideoCard({video}) {
  return (
    <div className='bg-white dark:bg-secondary-2 p-3'>
        <div className='w-full aspect-video bg-primary dark:bg-secondary-1 flex justify-center items-center'>16:9 video</div>
        <h5 className='text-base font-semibold text-slate-500 dark:text-slate-300 mt-3'>How to design distributed system</h5>
        <p className='text-[13px] font-medium text-slate-300'>3 month ago . 3k views</p>
    </div>
  )
}
