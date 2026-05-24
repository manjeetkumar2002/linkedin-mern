import React from 'react'
import Nav from "../components/Nav"
import dp from "../assets/default-profile.jpg"
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
const Home = () => {
  let {userData} = useContext(userDataContext)
  return (
    <div className='relative w-full min-h-[100vh] bg-[#f0efe7] pt-[100px]
    flex flex-col lg:flex-row items-start justify-center gap-[20px] px-[20px]'>
      <Nav></Nav>
      <div className='p-[10px] rounded-lg lg:w-[25%] w-full  min-h-[200px] bg-white shadow-lg relative'>
        {/* background image */}
        <div className='w-full h-[100px] bg-gray-400 rounded overflow-hidden 
        flex items-center justify-center relative  cursor-pointer'>
          {/* <img src="" alt="background-image" className='w-full' /> */}
          <CiCamera className='absolute top-[20px] right-[20px] w-[25px] h-[25px] text-gray-800 font-extrabold '/>
        </div>
        {/* dp image */}
        <div className=' cursor-pointer absolute top-[65px] left-[35px] w-[70px] h-[70px] overflow-hidden rounded-full items-center justify-center'>
          <img src={dp} alt="profile" className='w-full h-full'/>
        </div>
        <div className='cursor-pointer absolute top-[105px] left-[90px]  text-[#2dc0ff] text-xl font-extrabold'>
          <FaPlus />
        </div>
        <div className='mt-[30px] pl-[20px]'>
          <div className='text-[19px] font-semibold text-gray-700'> {`${userData?.firstName} ${userData?.lastName}`}</div>
        </div>
      </div>
      <div className='lg:w-[50%] w-full  min-h-[200px] bg-white shadow-lg'></div>
      <div className='lg:w-[25%] w-full  min-h-[200px] bg-white shadow-lg'></div>
    </div>
  )
}

export default Home