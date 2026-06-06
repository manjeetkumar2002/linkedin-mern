import React, { useContext, useEffect ,useState} from 'react'
import Nav from "../components/Nav"
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import {RxCross1} from "react-icons/rx"
import dp from "../assets/default-profile.jpg"
const Notification = () => {
    const [notificationData,setNotificationData] = useState([])
    const {serverUrl} = useContext(authDataContext)

    const handleGetNotification=async()=>{
        try {
            const result = await axios.get(serverUrl+"/api/notification/get",{withCredentials:true})
            setNotificationData(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteNotification=async(id)=>{
        try {
            const result = await axios.delete(serverUrl+`/api/notification/deleteone/${id}`,{withCredentials:true})
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }
    const handleClearAllNotification=async()=>{
        try {
            const result = await axios.delete(serverUrl+`/api/notification/`,{withCredentials:true})
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }
    function handleMessage(type) {
        if(type=="like"){
            return `Liked your post`
        }
        else if(type=="comment"){
            return `Commented on your post`
        }
        else{
            return 'Accepted your connection'
        }

    }
    

    useEffect(()=>{
        handleGetNotification()
    },[])
  return (
    <div className='w-screen h-[100vh] overflow-auto bg-[#f0efe7] 
    px-[20px] flex flex-col items-center gap-[40px]'>
        <Nav></Nav>
        <div className='w-full h-[100px] bg-[white] shadow-lg
        rounded-lg flex items-center justify-between p-[10px] text-[22px] text-gray-600'>
           {`Notifications (${notificationData.length})`}
           {notificationData.length> 0 && 
           <button onClick={()=>handleClearAllNotification()} className='px-[10px] min-w-[100px] py-[5px] bg-red-500 text-white rounded-lg'>Clear all</button>
            }
        </div> 
        {notificationData?.length>0 && <div className='w-[100%] max-w-[900px] items-center shadow-lg rounded-lg flex flex-col  min-h-[100px]'>
                    {
                        notificationData?.map((noti,index)=>(
                            <div key={index} className='relative border-b-2 border-b-gray-200 p-[20px] bg-white w-full  flex flex-col justify-between items-start'>
                                <div className='mt-[40px] flex items-center justify-center gap-[10px]'>
                                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden
                                    cursor-pointer'>
                                        <img src={noti?.relatedUser?.profileImage || dp} alt=""  className='w-full h-full'/>
                                    </div>
                                    <div>
                                        <div className='lg:text-[19px] text-[17px] font-semibold text-gray-700'>
                                            {`${noti?.relatedUser?.firstName} ${noti?.relatedUser?.lastName} ${handleMessage(noti.type)}`}
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                {noti.relatedPost && 
                                <div className='mt-[20px] flex items-center gap-[10px] lg:pl-[80px] pl-[20px] overflow-hidden w-full'>
                                        <div className='w-[100px] h-[50px] overflow-hidden'>
                                        <img className='h-full w-full ' src={noti.relatedPost.image} alt="" />
                                        </div>
                                        <div className='h-[50px] w-[80%] text-justify'>{noti.relatedPost.description}</div>
                                    </div>}
                                <div onClick={()=>handleDeleteNotification(noti._id)}><RxCross1  className='w-[25px] h-[25px] font-bold top-[20px] right-[20px] text-gray-800 cursor-pointer absolute text-xl'/></div>
                            </div>
                        ))
                    }
                </div>}
    </div>
  )
}

export default Notification