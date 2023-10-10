import React from 'react'

export default function Row({children,cols=12,gap=1,className}) {
    const columnList = React.Children.toArray(children);
    const classes = `grid grid-cols-${cols} gap-${gap} ${className}`
  return (
    <div className={classes}>
        {
            columnList.map((col,i)=><div key={i} className={col.props.className}>
                {col.props.children}
            </div>)
        }
    </div>
  )
}
