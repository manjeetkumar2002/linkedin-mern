import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import dp from "../assets/default-profile.jpg"
import { authDataContext } from '../context/AuthContext'
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const Network = () => {
    let { serverUrl } = useContext(authDataContext)
    let [connections, setConnections] = useState([])
    let [loading, setLoading] = useState(true)
    let [acceptingId, setAcceptingId] = useState(null)
    let [rejectingId, setRejectingId] = useState(null)
    const navigate = useNavigate()

    const handleGetRequests = async () => {
        setLoading(true)
        try {
            let result = await axios.get(`${serverUrl}/api/connection/requests`, { withCredentials: true })
            setConnections(result.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAcceptConnection = async (requestId) => {
        setAcceptingId(requestId)
        try {
            let result = await axios.put(`${serverUrl}/api/connection/accept/${requestId}`, {}, { withCredentials: true })
            setConnections(connections.filter((con) => con._id !== requestId))
        } catch (error) {
            console.log(error);
        } finally {
            setAcceptingId(null)
        }
    }

    const handleRejectConnection = async (requestId) => {
        setRejectingId(requestId)
        try {
            let result = await axios.put(`${serverUrl}/api/connection/reject/${requestId}`, {}, { withCredentials: true })
            setConnections(connections.filter((con) => con._id !== requestId))
        } catch (error) {
            console.log(error);
        } finally {
            setRejectingId(null)
        }
    }

    useEffect(() => {
        handleGetRequests()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8'>
            <Nav />
            
            <div className='w-full max-w-4xl mx-auto px-3 lg:px-4 mt-4 space-y-4'>
                {/* Header Card */}
                <div className='bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[22px] font-bold text-gray-700'>
                            Invitations
                        </h1>
                        <span className='px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold'>
                            {connections?.length || 0} pending
                        </span>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center'>
                        <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                        <p className='mt-4 text-gray-500 font-medium'>Loading invitations...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && connections?.length === 0 && (
                    <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                        <div className='text-6xl mb-4'>📬</div>
                        <h3 className='text-xl font-semibold text-gray-600'>No pending invitations</h3>
                        <p className='text-gray-400 mt-1'>You're all caught up!</p>
                    </div>
                )}

                {/* Connection Requests List */}
                {!loading && connections?.length > 0 && (
                    <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                        <div className='divide-y divide-gray-100'>
                            {connections?.map((connection, index) => (
                                <div 
                                    key={index} 
                                    className='p-5 hover:bg-gray-50 transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                                >
                                    <div className='flex items-center gap-4 min-w-0'>
                                        {/* Profile Image */}
                                        <div 
                                            onClick={() => navigate(`/profile/${connection?.sender?.userName}`)}
                                            className='w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-gray-100 cursor-pointer hover:border-blue-400 transition-colors duration-200 flex-shrink-0'
                                        >
                                            <img 
                                                src={connection?.sender?.profileImage || dp} 
                                                alt="profile" 
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        
                                        {/* User Info */}
                                        <div className='min-w-0 flex-1'>
                                            <div 
                                                onClick={() => navigate(`/profile/${connection?.sender?.userName}`)}
                                                className='text-[16px] font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200 truncate'
                                            >
                                                {`${connection?.sender?.firstName} ${connection?.sender?.lastName}`}
                                            </div>
                                            {connection?.sender?.headline && (
                                                <div className='text-[14px] text-gray-500 truncate'>
                                                    {connection?.sender?.headline}
                                                </div>
                                            )}
                                            <div className='text-[12px] text-gray-400 mt-0.5'>
                                                Wants to connect with you
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className='flex items-center gap-3 flex-shrink-0 self-end sm:self-center'>
                                        <button 
                                            onClick={() => handleAcceptConnection(connection?._id)}
                                            disabled={acceptingId === connection?._id}
                                            className='group flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-full border-2 border-green-200 hover:border-green-600 transition-all duration-200 font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed'
                                        >
                                            {acceptingId === connection?._id ? (
                                                <div className='w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin'></div>
                                            ) : (
                                                <>
                                                    <FaRegCircleCheck className='w-5 h-5 group-hover:scale-110 transition-transform' />
                                                    <span>Accept</span>
                                                </>
                                            )}
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleRejectConnection(connection?._id)}
                                            disabled={rejectingId === connection?._id}
                                            className='group flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white rounded-full border-2 border-red-200 hover:border-red-600 transition-all duration-200 font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed'
                                        >
                                            {rejectingId === connection?._id ? (
                                                <div className='w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
                                            ) : (
                                                <>
                                                    <RxCrossCircled className='w-5 h-5 group-hover:scale-110 transition-transform' />
                                                    <span>Decline</span>
                                                </>
                                            )}
                                        </button>
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

export default Network