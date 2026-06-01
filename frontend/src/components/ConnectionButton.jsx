import React, { useContext, useEffect } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import io from "socket.io-client"
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const socket = io("http://localhost:8000")

const ConnectionButton = ({userId}) => {
    const {serverUrl} = useContext(authDataContext)
    const {userData,setUserData}  = useContext(userDataContext)
    let [status,setStatus] = useStatus("")
    let navigate = useNavigate()
    const handleSendConnection = async()=>{
        try {
            const result = await axios.post(`${serverUrl}/api/connection/send/${userId}`,{},{withCredentials:true})
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemoveConnection=async()=>{
        try {
            const result = await axios.delete(`${serverUrl}/api/connection/remove/${userId}`,{},{withCredentials:true})
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleGetStatus = async()=>{
        try {
            const result = await axios.post(`${serverUrl}/api/connection/getStatus/${userId}`,{},{withCredentials:true})
            console.log(result)
            setStatus(result.data.status)
        } catch (error) {
            console.log(error)
        }
    }
    const handleClick =async ()=>{
        if(status=="disconnect"){
            await handleRemoveConnection()
        }
        else if(status=="received"){
            navigate("/network")
        }
        else{
             await handleSendConnection()
        }
    }

    useEffect(()=>{
        socket.emit("register",userData._id)
        handleGetStatus()
        socket.on("statusUpdate",({updatedUserId,newStatus})=>{
            if(updatedUserId==userId)
            setStatus(newStatus)
        })

        return ()=>{
            socket.off("statusUpdate")
        }
    },[userId])



  return (
    <button disabled={status=="pending"} onClick={handleClick} className='min-w-[100px] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2'>{status}</button>
  )
}

export default ConnectionButton