import React, { useContext, useEffect, useState } from 'react'
import Nav from "../components/Nav"
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RxCross1 } from "react-icons/rx"
import dp from "../assets/default-profile.jpg"
import { useNavigate } from 'react-router-dom'

const Notification = () => {
    const [notificationData, setNotificationData] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)
    const [clearingAll, setClearingAll] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const navigate = useNavigate()

    const handleGetNotification = async () => {
        setLoading(true)
        try {
            const result = await axios.get(serverUrl + "/api/notification/get", { withCredentials: true })
            setNotificationData(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteNotification = async (id) => {
        setDeletingId(id)
        try {
            const result = await axios.delete(serverUrl + `/api/notification/deleteone/${id}`, { withCredentials: true })
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingId(null)
        }
    }

    const handleClearAllNotification = async () => {
        setClearingAll(true)
        try {
            const result = await axios.delete(serverUrl + `/api/notification/`, { withCredentials: true })
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        } finally {
            setClearingAll(false)
        }
    }

    function handleMessage(type) {
        if (type == "like") {
            return `liked your post`
        } else if (type == "comment") {
            return `commented on your post`
        } else {
            return 'accepted your connection request'
        }
    }

    function getTimeAgo(date) {
        const now = new Date()
        const diff = Math.floor((now - new Date(date)) / 1000)
        
        if (diff < 60) return `${diff}s ago`
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
        return new Date(date).toLocaleDateString()
    }

    useEffect(() => {
        handleGetNotification()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8'>
            <Nav />
            
            <div className='w-full max-w-3xl mx-auto px-3 lg:px-4 mt-4 space-y-4'>
                {/* Header Card */}
                <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center justify-between flex-wrap gap-3'>
                        <h1 className='text-[22px] font-bold text-gray-700'>
                            Notifications
                        </h1>
                        <div className='flex items-center gap-3'>
                            <span className='px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold'>
                                {notificationData.length}
                            </span>
                            {notificationData.length > 0 && (
                                <button 
                                    onClick={() => handleClearAllNotification()}
                                    disabled={clearingAll}
                                    className='px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100'
                                >
                                    {clearingAll ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Clearing...
                                        </span>
                                    ) : (
                                        'Clear All'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center'>
                        <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                        <p className='mt-4 text-gray-500 font-medium'>Loading notifications...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && notificationData?.length === 0 && (
                    <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                        <div className='text-6xl mb-4'>🔔</div>
                        <h3 className='text-xl font-semibold text-gray-600'>No notifications</h3>
                        <p className='text-gray-400 mt-1'>You're all caught up!</p>
                    </div>
                )}

                {/* Notifications List */}
                {!loading && notificationData?.length > 0 && (
                    <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                        <div className='divide-y divide-gray-100'>
                            {notificationData?.map((noti, index) => (
                                <div 
                                    key={index} 
                                    className='p-5 hover:bg-gray-50 transition-colors duration-200 relative group'
                                >
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteNotification(noti._id)}
                                        disabled={deletingId === noti._id}
                                        className='absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-200 transition-colors duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-100'
                                    >
                                        {deletingId === noti._id ? (
                                            <div className='w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin'></div>
                                        ) : (
                                            <RxCross1 className='w-4 h-4 text-gray-400 hover:text-red-500 transition-colors duration-200' />
                                        )}
                                    </button>

                                    {/* Notification Content */}
                                    <div className='flex items-start gap-4 pr-8'>
                                        {/* Profile Image */}
                                        <div 
                                            onClick={() => navigate(`/profile/${noti?.relatedUser?.userName}`)}
                                            className='w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-gray-100 cursor-pointer hover:border-blue-400 transition-colors duration-200 flex-shrink-0'
                                        >
                                            <img 
                                                src={noti?.relatedUser?.profileImage || dp} 
                                                alt="profile" 
                                                className='w-full h-full object-cover'
                                            />
                                        </div>

                                        {/* Notification Message */}
                                        <div className='flex-1 min-w-0 pt-1'>
                                            <div className='text-[15px] text-gray-700'>
                                                <span 
                                                    onClick={() => navigate(`/profile/${noti?.relatedUser?.userName}`)}
                                                    className='font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200'
                                                >
                                                    {`${noti?.relatedUser?.firstName} ${noti?.relatedUser?.lastName}`}
                                                </span>
                                                <span className='text-gray-600'> {handleMessage(noti.type)}</span>
                                            </div>
                                            
                                            {/* Timestamp */}
                                            <div className='text-[12px] text-gray-400 mt-0.5'>
                                                {getTimeAgo(noti.createdAt)}
                                            </div>

                                            {/* Related Post Preview */}
                                            {noti.relatedPost && (
                                                <div 
                                                    onClick={() => navigate(`/post/${noti.relatedPost._id}`)}
                                                    className='mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 border border-gray-100'
                                                >
                                                    {noti.relatedPost.image && (
                                                        <div className='w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-200'>
                                                            <img 
                                                                className='w-full h-full object-cover' 
                                                                src={noti.relatedPost.image} 
                                                                alt="post" 
                                                            />
                                                        </div>
                                                    )}
                                                    <div className='text-[13px] text-gray-600 line-clamp-2 flex-1'>
                                                        {noti.relatedPost.description || 'View post'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification