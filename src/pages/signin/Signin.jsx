import React, { useState } from 'react'
import { loginUser, registerUser } from '../../api'
import checkLoggedin from '../../helpers/checkLoggedin'
import { Navigate, useNavigate } from 'react-router-dom'
import Tabs from '../../components/cs-ui-components/Tabs'
import TabItem from "./../../components/cs-ui-components/TabItem"

export default function Signin() {
  const route = useNavigate()

  const [tabTitle, setTabTitle] = useState("Login into account")

  const [username,setUsername] = useState("")
  const [mail,setMail] = useState("")
  const [password,setPassword] = useState("")
  const [errMsg, setErrMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const [creatingAccount,setCreatingAccount] = useState(false)
  const [logining,setLogining] = useState(false)

  const handleSignin = () => {
    const user = {mail,password}
    setLogining(true)
    loginUser(user,(err,data)=>{
      if(data===true){
        window.location.href="/"
      }else{
        setErrMsg("Failed to login, please try again!")
        setTimeout(()=>{
          setErrMsg(null)
        },3000)
      }
      setLogining(false)
    })
  }

  const handleRegisterUser = () => {
    const user = {username,mail,password}
    console.log("user: ",user)
    setCreatingAccount(true)
    registerUser(user,(err,data)=>{
      setCreatingAccount(false)
      if(err!==null){
        setErrMsg("Failed to create, try again!")
        setTimeout(()=>{
          setErrMsg(null)
        },3000)
      }else{
        setSuccessMsg("Account created, please login");
        setTimeout(()=>{
          setSuccessMsg(null)
        },3000)
      }
      setUsername("")
      setMail("")
      setPassword("")
    })
  }

  if(checkLoggedin()===true){
    return <Navigate to="/one" replace={true} />
  }else{
    return (
      <div className='h-screen bg-primary dark:bg-secondary-1 w-full flex justify-center items-center'>
        <div className='bg-white dark:bg-secondary-2 p-5 shadow rounded-md siginin-shadow w-[90%] min-h-[400px] h-auto xl:w-[30%] lg:w-[35%] md:w-[50%] sm:w-[75%]'>
          <h3 className='my-5 font-bold text-center'>{tabTitle}</h3>
          {/* <div className='grid grid-cols-2 my-3'>
            <div className={`text-center uppercase font-bold text-slate-600 dark:text-slate-300 px-3 py-2 ${login?"bg-slate-700":"bg-transparent"} rounded`}>SIGNIN</div>
            <div className={`text-center uppercase font-bold text-slate-600 dark:text-slate-300 px-3 py-2 ${login===false?"bg-slate-700":"bg-transparent"} rounded`}>SIGNUP</div>
          </div> */}
          <Tabs className='grid grid-cols-2' activeClasseName="font-semibold border-b-[3px] text-blue-500 border-blue-500">
            <TabItem label="Login" onTabClick={()=>{
              setTabTitle("Login into account")
            }}>
              <div>
                <input type='text' value={mail} onChange={e=>setMail(e.target.value)} className='w-full bg-primary dark:bg-secondary-1 dark:text-slate-300 outline-none focus:border-slate-500 py-2 px-2.5 mb-3 rounded' placeholder='Enter Mail' />
                <input type='text' value={password} onChange={e=>setPassword(e.target.value)} className='w-full bg-primary dark:bg-secondary-1 dark:text-slate-300 outline-none focus:border-slate-500 py-2 px-2.5 mb-3 rounded' placeholder='Enter Password' />
                <button className='btn w-full bg-blue-900 hover:bg-blue-950 my-5 text-white font-semibold' onClick={handleSignin}>{logining?"Authenticating...":"Login"}</button>
              </div>
            </TabItem>
            <TabItem label="SignUp" onTabClick={()=>setTabTitle("Create an account")}>
                <input type='text' value={username} onChange={e=>setUsername(e.target.value)} className='w-full bg-primary dark:bg-secondary-1 dark:text-slate-300 outline-none focus:border-slate-500 py-2 px-2.5 mb-3 rounded' placeholder='Enter Name' />
                <input type='text' value={mail} onChange={e=>setMail(e.target.value)} className='w-full bg-primary dark:bg-secondary-1 dark:text-slate-300 outline-none focus:border-slate-500 py-2 px-2.5 mb-3 rounded' placeholder='Enter Mail' />
                <input type='text' value={password} onChange={e=>setPassword(e.target.value)} className='w-full bg-primary dark:bg-secondary-1 dark:text-slate-300 outline-none focus:border-slate-500 py-2 px-2.5 mb-3 rounded' placeholder='Enter Password' />
                <button className='btn w-full bg-blue-900 hover:bg-blue-950 my-5 text-white font-semibold' onClick={handleRegisterUser}>{creatingAccount?"Creating...":"Create Account"}</button>
            </TabItem>
          </Tabs>
          
          {
            errMsg!==null&&(<p className='text-red-900 dark:text-red-600 font-semibold'>{errMsg}</p>)
          }
        </div>      
      </div>
    )
  }

}
