import React, { useContext, useEffect,useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import dp from "../assets/default-profile.jpg"
import { authDataContext } from '../context/AuthContext'
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
const Network = () => {
    let {serverUrl} = useContext(authDataContext)
    let [connections,setConnections] = useState([])
    const handleGetRequests = async()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/connection/requests`,{withCredentials:true})
            setConnections(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptConnection =async (requestId)=>{
        try {
            let result = await axios.put(`${serverUrl}/api/connection/accept/${requestId}`,{},{withCredentials:true})
            setConnections(connections.filter((con)=>con._id!==requestId))
        } catch (error) {
            console.log(error);
        }
    }
    const handleRejectConnection =async (requestId)=>{
        try {
            let result = await axios.put(`${serverUrl}/api/connection/reject/${requestId}`,{},{withCredentials:true})
            setConnections(connections.filter((con)=>con._id!==requestId))
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(()=>{
        handleGetRequests()
    },[])
  return (
    <div className='w-screen h-[100vh] bg-[#f0efe7]  px-[20px]
    flex flex-col gap-[40px] items-center'>
        <Nav/>
        <div className='w-full h-[100px] bg-[white] shadow-lg
        rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
            Invitations {connections?.length}
        </div>
        {connections?.length>0 && <div className='w-[100%] max-w-[900px] items-center shadow-lg rounded-lg flex flex-col gap-[20px] min-h-[100px]'>
            {
                connections?.map((connection,index)=>(
                    <div key={index} className='p-[20px]  bg-white w-full min-h-[100px] flex justify-between items-center'>
                        <div className='flex items-center justify-center gap-[10px]'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden
                            cursor-pointer'>
                                <img src={connection?.sender?.profileImage || dp} alt=""  className='w-full h-full'/>
                            </div>
                            <div>
                                <div className='text-[19px] font-semibold text-gray-700'>
                                    {`${connection?.sender?.firstName} ${connection?.sender?.lastName}`}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-[10px]'>
                            <button onClick={()=>handleAcceptConnection(connection?._id)} className='text-blue-500 font-semibold'><  FaRegCircleCheck className="w-[40px] h-[40px]" /></button>
                            <button onClick={()=>handleRejectConnection(connection?._id)} className='text-red-500 font-semibold'><  RxCrossCircled  className="w-[40px] h-[40px]"/></button>
                        </div>
                    </div>
                ))
            }
        </div>}
    </div>
  )
}

export default Network