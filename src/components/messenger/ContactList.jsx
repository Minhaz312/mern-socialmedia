import React from 'react'
import ContactItem from './ContactItem'

export default function ContactList({contactList}) {
  return (
    <div>
        {
            contactList.map((contact,i)=><ContactItem key={i} contact={contact} />)
        }
    </div>
  )
}
