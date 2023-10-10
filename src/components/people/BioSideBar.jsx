import React, { useState } from 'react'
import Modal from '../cs-ui-components/modal/Modal'

export default function BioSideBar({people}) {
    const [show, setShow] = useState(false);
    const handleOpenEditBioModal = () => {
        if(show) setShow(false)
        else setShow(true)
    }
  return (
    <>
        <div className='w-[80%] mx-auto p-2 rounded bg-primary dark:bg-secondary-1'>
            {
                people.image!==null?<img src={people.image} className='w-full aspect-square' />:<div className='w-full aspect-square flex justify-center items-center text-3xl font-bold text-slate-500 dark:text-white uppercase bg-primary dark:bg-secondary-2 rounded'>{people.username.substr(0,2)}</div>
            }
          </div>
          <div className='my-3'>
            <div className=''>
              <h3>{people.username}</h3>
              <p className='mt-2 mb-4 dark:text-slate-300 text-slate-800'>{people.mail}</p>
            </div>
            <div className='flex gap-x-3 justify-between items-center mt-4'>
              <h6>Date of Birth:</h6>
              <p>{people.dateOfBirth===null?"Not added":new Date(people.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>
    </>
  )
}
