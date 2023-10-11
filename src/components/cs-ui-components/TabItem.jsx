export default function TabItem({children,onTabClick=()=>{}}) {
    return <div onTabClick={()=>onClick}>{children}</div>
}