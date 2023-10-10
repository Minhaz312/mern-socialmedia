import React from 'react'
import VideoCard from '../cs-ui-components/card/VideoCard'

export default function RecentTabItem({data}) {
  return (
    <div className='h-full overflow-auto'>
        <div className='my-3'>
            <h6 className='mb-3'>Videos</h6>
                <div className='grid grid-cols-1  sm:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                [1,2,3,4,5,6,7,8,9,3,53,5,6,3,543,2,5].map((item,i)=><VideoCard key={i} video={"video"} />)
                }
            </div>
        </div>
    </div>
  )
}
