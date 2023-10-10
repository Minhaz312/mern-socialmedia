import React from 'react'
import VideoCard from '../cs-ui-components/card/VideoCard'

export default function VideosTabItem() {
  return (
    <div className='h-full w-full overflow-y-auto'>
        <div className='my-3'>
            <div className='flex justify-between items-center mb-3'>
              <h6>Videos</h6>
              <button className='px-3 focus:ring-2 focus:bg-blue-500/20 hover:bg-blue-500/20 py-2 text-sm text-blue-500 rounded font-semibold bg-blue-500/10'>Upload Video</button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-5 h-full overflow-auto'>
              {
                [1,2,3,4,5,6,7,8,9,2,5,3,4,3,5,3,3,6].map((item,i)=><VideoCard key={i} video={"video"} />)
              }
            </div>
        </div>
    </div>
  )
}
