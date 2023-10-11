import React, { useState } from 'react'


const TabHeader = ({children}) =>{
    return <>{children}</>
}
const TabBody = ({children}) =>{
    return <>{children}</>
}

export default function Tabs({children,className="",activeClasseName=""}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const tabsChildList = React.Children.toArray(children);
    const classes = `w-full grid grid-cols-${tabsChildList.length} text-center border-b border-slate-500 mb-3`
    const activeHeaderClass = i =>{
        if(i===activeIndex){
            return activeClasseName
        }else{
            return "font-semibold text-slate-600 dark:text-slate-400"
        }
    }
    return (
        <div className='w-full'>
            <div className={`w-full ${className} text-center border-b border-slate-500 mb-3`}>
                {
                    tabsChildList.map((tab,i)=>{
                        return <div key={i} onClick={()=>{
                            setActiveIndex(i)
                            tab.props.onTabClick()
                            }} className={`cursor-pointer ${activeHeaderClass(i)} py-2 inline-block`}>
                            {tab.props.label}
                        </div>
                    })
                }
            </div>
            {
                tabsChildList.map((tab,i)=>{
                    return (<div key={i}>
                        <div className={`${activeIndex===i?"block":"hidden"} h-auto text-slate-700 dark:text-slate-300`}>{tab.props.children}</div>
                    </div>)
                })
            }
        </div>
      )
}

// return (
//     <Tabs>
//         <TabItem index={0}>
//             <TabHeader>home</TabHeader>
//             <TabBody>tab contents</TabBody>
//         </TabItem>
//         <TabItem index={1}>
//             <TabHeader>home</TabHeader>
//             <TabBody>tab contents</TabBody>
//         </TabItem>
//         <TabItem index={1}>
//             <TabHeader>home</TabHeader>
//             <TabBody>tab contents</TabBody>
//         </TabItem>
//     </Tabs>
// )
