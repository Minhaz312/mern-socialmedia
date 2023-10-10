import React, { useState } from 'react'
import BioSideBar from '../people/BioSideBar'
import Modal from '../cs-ui-components/modal/Modal'

export default function ProfileTabItem({data}) {
  console.log('profile tab data: ',data)
  const [show, setShow] = useState(false)
  const handleOpenEditBioModal = () => {
    if(show) setShow(false)
    else setShow(true)
  }
  return (
    <div className='h-full block grid-cols-12 gap-x-3 md:grid'>
        <Modal show={show} onHide={handleOpenEditBioModal} btnTitle='Update'>
            <h1>bio edit modal</h1>
        </Modal>
        <div className='pt-5 rounded bg-primary dark:bg-secondary-1 md:col-span-4 md:py-2'>
            {
                data.user.image!==null?<img src={data.user.image} className='mx-auto w-[50%] aspect-square md:w-full' />:<div className='w-full aspect-square flex justify-center items-center text-3xl font-bold text-slate-500 dark:text-white uppercase bg-primary dark:bg-secondary-2 rounded'>{data.user.username.substr(0,2)}</div>
            }
          </div>
          <div className='my-3 md:col-span-8'>
            <div className='flex justify-between items-center'>
              <h3 className='text-[16px] md:text-[28px]'>{data.user.username}</h3>
              <button className='px-2 py-1 text-sm text-blue-500 rounded font-semibold bg-blue-500/10' onClick={handleOpenEditBioModal}>Edit Bio</button>
            </div>
            <div className='flex gap-x-3 justify-between items-center mt-4'>
              <h6>Mail:</h6>
              <p>{data.user.mail===null?"Not added":data.user.mail}</p>
            </div>
            <div className='flex gap-x-3 justify-between items-center mt-4'>
              <h6>Date of Birth:</h6>
              <p>{data.user.dateOfBirth===null?"Not added":new Date(data.user.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>
    </div>
  )
}
