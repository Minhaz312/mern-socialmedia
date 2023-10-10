import React from 'react'

export default function SearchHelpTobBar() {
  return (
    <div className='flex items-center gap-x-3 bg-white shadow dark:bg-secondary-2 p-2'>
        <p className='font-semibold'>Filter:</p>
        <button className='px-3 rounded py-1 dark:bg-secondary-1'>All</button>        
        <button className='px-3 rounded py-1 dark:bg-secondary-1'>Videos</button>        
        <button className='px-3 rounded py-1 dark:bg-secondary-1'>Posts</button>        
        <button className='px-3 rounded py-1 dark:bg-secondary-1'>People</button>        
    </div>
  )
}
