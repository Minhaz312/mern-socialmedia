import React from 'react'

export default function SideOptionBar({show}) {
  return (
    <div className={`w-[50%] ${show?"ml-0":"-ml-[100%]"} bg-secondary-2 block md:hidden`}>SideOptionBar</div>
  )
}
