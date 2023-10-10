import React from 'react'

export default function TopTabButton({children,onClick=()=>{},active=false}) {
  return (
    <button onClick={onClick} className={`px-4 py-1 ${active?"ring-1 bg-blue-700/10":"bg-primary dark:bg-secondary-1"} flex items-center gap-x-2 rounded-md text-slate-600 font-semibold text-sm xl:text-base dark:text-slate-300`}>
        {children}
    </button>
  )
}
