import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import io from "socket.io-client"
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FaUserPlus, FaUserCheck, FaUserMinus, FaClock, FaUserFriends } from 'react-icons/fa'

const socket = io("http://localhost:8000")

const ConnectionButton = ({ userId }) => {
    const { serverUrl } = useContext(authDataContext)
    const { userData, setUserData } = useContext(userDataContext)
    let [status, setStatus] = useState("")
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const handleSendConnection = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/connection/send/${userId}`, {}, { withCredentials: true })
            setStatus("pending")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveConnection = async () => {
        setLoading(true)
        try {
            const result = await axios.delete(`${serverUrl}/api/connection/remove/${userId}`, { withCredentials: true })
            setStatus("disconnect")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleGetStatus = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/connection/getstatus/${userId}`, { withCredentials: true })
            setStatus(result.data.status)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        if (status == "disconnect") {
            await handleRemoveConnection()
        } else if (status == "received") {
            navigate("/network")
        } else {
            await handleSendConnection()
        }
    }

    useEffect(() => {
        socket.emit("register", userData._id)
        handleGetStatus()
        socket.on("statusUpdate", ({ updatedUserId, newStatus }) => {
            if (updatedUserId == userId)
                setStatus(newStatus)
        })

        return () => {
            socket.off("statusUpdate")
        }
    }, [userId])

    // Button configurations based on status
    const getButtonConfig = () => {
        switch (status) {
            case "disconnect":
                return {
                    label: "Connect",
                    icon: <FaUserPlus className="text-[14px]" />,
                    className: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 shadow-blue-200"
                }
            case "pending":
                return {
                    label: "Pending",
                    icon: <FaClock className="text-[14px]" />,
                    className: "bg-yellow-50 text-yellow-600 border-yellow-300 cursor-not-allowed opacity-70"
                }
            case "received":
                return {
                    label: "Respond",
                    icon: <FaUserFriends className="text-[14px]" />,
                    className: "bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 shadow-green-200"
                }
            case "connected":
                return {
                    label: "Connected",
                    icon: <FaUserCheck className="text-[14px]" />,
                    className: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 hover:shadow-red-200 group"
                }
            default:
                return {
                    label: "Connect",
                    icon: <FaUserPlus className="text-[14px]" />,
                    className: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 shadow-blue-200"
                }
        }
    }

    const config = getButtonConfig()

    return (
        <button
            disabled={status == "pending" || loading}
            onClick={handleClick}
            className={`
                min-w-[100px] h-[40px] px-4 rounded-full font-semibold text-[14px] 
                border-2 transition-all duration-200 transform hover:scale-[1.03]
                flex items-center justify-center gap-2
                ${config.className}
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                shadow-md hover:shadow-lg
            `}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </span>
            ) : (
                <>
                    {config.icon}
                    <span>{config.label}</span>
                </>
            )}
        </button>
    )
}

export default ConnectionButton