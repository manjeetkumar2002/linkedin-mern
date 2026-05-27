import React,{useState} from 'react'
import Nav from "../components/Nav"
import dp from "../assets/default-profile.jpg"
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile';
const Home = () => {
  let {userData,edit,setEdit} = useContext(userDataContext)
  console.log(userData)
  return (
    <div className='relative w-full min-h-[100vh] bg-[#f0efe7] pt-[100px]
    flex flex-col lg:flex-row items-start justify-center gap-[20px] px-[20px]'>
      {edit && <EditProfile/>}
      <Nav></Nav>
      <div className='p-[10px] rounded-lg lg:w-[25%] w-full  min-h-[200px] bg-white shadow-lg relative'>
        {/* background image */}
        <div onClick={()=>setEdit(!edit)} className='w-full h-[100px] bg-gray-400 rounded overflow-hidden 
        flex items-center justify-center relative  cursor-pointer'>
          <img src={userData.coverImage || null} alt="background-image" className='w-full' />
          <CiCamera className='absolute top-[20px] right-[20px] w-[25px] h-[25px] text-white font-extrabold '/>
        </div>
        {/* dp image */}
        <div onClick={()=>setEdit(!edit)} className=' cursor-pointer absolute top-[65px] left-[35px] w-[70px] h-[70px] overflow-hidden rounded-full items-center justify-center'>
          <img src={userData.profileImage || dp} alt="profile" className='w-full h-full'/>
        </div>
        <div onClick={()=>setEdit(!edit)} className='cursor-pointer absolute top-[105px] left-[90px]   rounded-full p-[1px] text-white bg-[#2dc0ff] text-xl font-extrabold'>
          <FaPlus  />
        </div>
        <div className='mt-[30px] pl-[20px] text-[19px] font-semibold text-gray-700'>
          <div> 
            {`${userData?.firstName} ${userData?.lastName}`}
          </div>
          <div  className='text-gray-500 text-[19px] font-semibold'>{userData?.headline || ""}</div>
          <div className='text-gray-500 text-[16px]'>
            {userData?.location}
          </div>
          <div>
           <button onClick={()=>setEdit(!edit)} className='my-[20px] w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center '>Edit Profile<HiPencil/></button>
          </div>
        </div>
      </div>
      <div className='lg:w-[50%] w-full  min-h-[200px] bg-white shadow-lg'></div>
      <div className='lg:w-[25%] w-full  min-h-[200px] bg-white shadow-lg'></div>
    </div>
  )
}

export default Home