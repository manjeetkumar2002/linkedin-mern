import React,{useRef, useState} from 'react'
import Nav from "../components/Nav"
import dp from "../assets/default-profile.jpg"
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import EditProfile from '../components/EditProfile';
import {RxCross1} from "react-icons/rx"
import { FaRegImage } from "react-icons/fa6";
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
const Home = () => {
  let {userData,edit,setEdit} = useContext(userDataContext)
  // post image state variable
  let [frontendImage,setFrontendImage] = useState("")
  let [backendImage,setBackendImage] = useState("")
  let [description,setDescription] = useState("")
  let image = useRef()
  let [uploadPost,setUploadPost] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  let [posting,setPosting] =useState(false)
  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  async function handleUploadPost(){
    setPosting(true)
    try {
      let formData = new FormData()
      formData.append("description",description)
      if(backendImage){
        formData.append("image",backendImage)
      }

      const result = await axios.post(serverUrl+"/api/post/create",formData,{
        withCredentials:true
      })
      console.log(result)
      setUploadPost(false)
      setDescription("")
      setFrontendImage("")
      setBackendImage("")
      setPosting(false)
    } catch (error) {
      setPosting(false)
      console.log("post upload error :",error)
    }
  }
  return (
    <div className='relative w-full min-h-[100vh] bg-[#f0efe7] pt-[100px]
    flex flex-col lg:flex-row items-center lg:items-start justify-center gap-[20px] px-[20px]'>
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
        <div onClick={()=>setEdit(!edit)} className=' cursor-pointer absolute top-[65px] left-[35px] w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center'>
          <img src={userData.profileImage || dp} alt="profile" className='w-full h-full'/>
        </div>
        <div onClick={()=>setEdit(!edit)} className='cursor-pointer absolute top-[105px] left-[90px]   rounded-full p-[1px] text-white bg-[#2dc0ff] text-xl font-extrabold'>
          <FaPlus  />
        </div>
        <div className='mt-[30px] pl-[20px] font-semibold text-gray-700'>
          <div className='text-[22px] '> 
            {`${userData?.firstName} ${userData?.lastName}`}
          </div>
          <div  className='text-gray-600 text-[18px] font-semibold'>{userData?.headline || ""}</div>
          <div className='text-gray-500 text-[16px]'>
            {userData?.location}
          </div>
          <div>
           <button onClick={()=>setEdit(!edit)} className='my-[20px] w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center '>Edit Profile<HiPencil/></button>
          </div>
        </div>
      </div>

      {/* post popup model */}
      {uploadPost &&<div className='w-full h-full bg-black opacity-[0.6] fixed top-0 left-0 right-0 z-[100]'>
      </div> }
      {uploadPost && <div className='p-[20px] w-[90%] max-w-[500px] h-[600px] bg-white
      shadow-lg rounded-lg fixed z-[200] flex items-start justify-start flex-col gap-[20px]'>
        <div><RxCross1 onClick={()=>setUploadPost(false)} className='w-[25px] h-[25px] font-bold top-[20px] right-[20px] text-gray-800 cursor-pointer absolute text-xl'/>
        </div>
        <div className='flex items-center justify-start gap-[10px]'> 
            <div className=' cursor-pointer w-[60px] h-[60px] overflow-hidden rounded-full flex items-center justify-center'>
          <img src={userData.profileImage || dp} alt="profile" className='w-full h-full'/>
        </div>
          <div className='text-[22px] '> 
            {`${userData?.firstName} ${userData?.lastName}`}
          </div>
        </div>
          {/* input textarea */}
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className={`w-full ${frontendImage?"h-[200px]":"h-[550px]"} outline-none p-[10px] resize-none text-[20px]`} placeholder='what do you want to talk about...?' ></textarea>
          <input onChange={handleImage} type="file" accept={"/image/*"} ref={image} hidden  />
            <div className='w-full h-[300px] overflow-hidden flex justify-center items-center'>
              <img className='h-full rounded-lg'  src={frontendImage || null} alt="" />
            </div>
          <div className='w-full h-[200px] flex flex-col items-start'>
            <div className='w-full border-b-2 border-gray-500 p-[20px] flex items-center justify-start'>
              <FaRegImage onClick={()=>image.current.click()} className='w-[24px] h-[24px] text-gray-500' />
            </div>
            
            <div className='w-full mt-[40px] flex justify-end items-center'>
              <button  disabled={posting} onClick={handleUploadPost} className='bg-[#24b2ff] text-white px-[20px] py-[10px] rounded-lg'>{posting?"posting...":"Post"}</button>
            </div>
          </div>

      </div>}
      
      {/* posts */}
      <div className='lg:w-[50%] w-full  min-h-[200px] bg-[#f0efe7] shadow-lg'>
          <div className='p-[20px]  gap-[10px] flex items-center justify-center w-full h-[120px] bg-white shadow-lg rounded-lg'>
              <div className=' cursor-pointer  w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center'>
              <img src={userData.profileImage || dp} alt="profile" className='w-full h-full'/>
              </div>
                <button onClick={()=>setUploadPost(true)} className='text-start p-[15px] hover:bg-gray-200 cursor-pointer rounded-full w-[80%] h-[60px] border-2 border-gray-500'>start a post</button>
          </div>
      </div>
      {/* sidebar */}
      <div className='lg:w-[25%] w-full  min-h-[200px] bg-white shadow-lg'></div>
    </div>
  )
}

export default Home