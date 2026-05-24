import React from 'react'
import {RxCross1} from "react-icons/rx"
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
const EditProfile = () => {
    let {edit,setEdit,useData,setUserData} = useContext(userDataContext)
  return (
    <div className='flex justify-center items-center z-[100] fixed w-full h-[100vh] top-0'>
        <div className=' bg-black opacity-[0.5] h-full w-full absolute'></div>
        <div className='w-[90%] max-w-[500px] h-[600px] bg-white absolute shadow-lg rounded-lg'>
            <div><RxCross1 onClick={()=>setEdit(false)} className='w-[25px] h-[25px] font-bold top-[10px] right-[10px] text-gray-800 cursor-pointer absolute text-xl'/></div>
        </div>
    </div>
  )
}

export default EditProfile