import React from 'react'
import Layout from '../../components/common/Layout'
import { BiSearch } from 'react-icons/bi'
import ContactList from '../../components/messenger/ContactList'
export default function Messenger() {
  const contactList = [
    {id:1,name:"Mohammad Minhaz"},
    {id:2,name:"Eshan akbar"},
    {id:3,name:"Akram Sultan"},
    {id:4,name:"Shek elahe forhed"},
    {id:5,name:"Khokon"},
    {id:6,name:"Muntasif Mustofa"},
  ]
  return (
    <Layout>
      <div className='grid grid-cols-10 gap-x-3'>
        <div className='col-span-2'>
          <div>
            <h4 className='font-semibold'>Message</h4>
            <div className='w-full mt-3 flex bg-white dark:bg-slate-700 py-1 mb-3 rounded-lg'>
              <input type='search' className='block w-full text-sm p-2 bg-transparent outline-none' placeholder='search...' />
              <button className='px-3'><BiSearch size={20} /></button>
            </div>
            <ContactList contactList={contactList} />
          </div>
        </div>
        <div className='col-span-6'>
          {/* <Inbox /> */}
        </div>
        <div className='col-span-3'>asdf</div>
      </div>
    </Layout>
  )
}
