import React ,{useContext, useState} from 'react'
import logo2 from "../assets/logo2.svg"
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import dp from "../assets/default-profile.jpg"
import {userDataContext} from "../context/UserContext.jsx"
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
const Nav = () => {
    const [activeSearch,setActiveSearch] = useState(false)
    const {userData,setUserData} = useContext(userDataContext)
    const {serverUrl} = useContext(authDataContext)
    const navigate = useNavigate()
    const [showPopUp,setShowPopUp] = useState(false)
    const handleSignOut =async ()=>{
        try {
            console.log(serverUrl+"/api/auth/logout")
           const result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true})
           console.log(result)
           setUserData(null)
           navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div className='px-1 z-[80] left-0 right-0 bg-white w-full h-[80px] fixed top-0 shadow-lg flex items-center  justify-between md:justify-around'> 
        {/* left div*/}
        <div className='flex justify-center items-center gap-[10px]'>       
        <div onClick={()=>setActiveSearch(false)}>
            <img src={logo2} alt="logo" width={"35px"}/>
        </div>
        {!activeSearch && <div>
            <IoSearchSharp onClick={()=>setActiveSearch(true)} className='lg:hidden w-[23px] h-[23px] text-gray-600' />
        </div>}
        <form className={`w-[190px] lg:w-[350px]  h-[40px] bg-[#f0efe7] lg:flex items-center ${!activeSearch?"hidden":"flex"}  gap-[10px] px-[10px] py-[5px] rounded-md`}>
            <div>
            <IoSearchSharp className='w-[23px] h-[23px] text-gray-600' />
            </div>
            <input placeholder='search users...' className='w-[80%] h-full bg-transparent outline-none border-0' type="text" />
        </form>
        </div>
        {/* right div*/}
        <div className='flex items-center gap-[20px] relative'>
            {/* pop up div */}
            {showPopUp &&  <div className='absolute top-[75px] w-[300px] min-h-[300px] bg-white shadow-lg rounded-lg 
            flex flex-col items-center p-[20px] gap-[20px]'>
                <div className='w-[70px] h-[70px] overflow-hidden rounded-full'>
                <img src={userData.profileImage||dp} alt="profile" className='w-full h-full'/>
                </div>
                <div className='text-[19px] font-semibold text-gray-700'>
                    {`${userData?.firstName} ${userData?.lastName}`}
                </div>
                <button className='w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2'>View Profile</button>
                <hr className='w-full text-gray-700 h-[1px]'/>
                <div className="flex items-center justify-start text-gray-600 w-full gap-[10px]">
                <FaUserGroup className='w-[20px] h-[20px]' />
                <div>My Networks</div>
            </div>
                <button onClick={handleSignOut} className='w-[100%] h-[40px] rounded-full text-[red] border-[red] border-2   '>Sign Out</button>
            </div>}
           

            <div className='hidden lg:flex flex-col items-center justify-center text-gray-600'>
                <MdHome className='w-[23px] h-[23px]' />
                <div>Home</div>
            </div>
            <div className='hidden md:flex flex-col items-center justify-center text-gray-600'>
                <FaUserGroup className='w-[20px] h-[20px]' />
                <div>My Networks</div>
            </div>
            <div className='flex flex-col items-center justify-center text-gray-600'>
                <IoNotifications className='w-[20px] h-[20px]' />
                <div className='hidden md:block'>Notification</div>
            </div>
            <div onClick={()=>setShowPopUp(!showPopUp)} className='cursor-pointer w-[45px] h-[45px] overflow-hidden rounded-full'>
                <img src={userData.profileImage || dp} alt="profile" className='w-full h-full'/>
            </div>
        </div>
    </div>
  )
}

export default Nav