import React from 'react'

export default function Col({children}) {
  return (
    <div className={`col-span-3`}>{children}</div>
  )
}
