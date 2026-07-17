import React, { useContext, useEffect, useState } from "react";
import dp from "../assets/default-profile.jpg";
import moment from "moment"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { BiSolidLike } from "react-icons/bi";
import { userDataContext } from "../context/UserContext";
import { LuSendHorizontal } from "react-icons/lu";
import { io } from "socket.io-client"
import ConnectionButton from "./ConnectionButton";

let socket = io("http://localhost:8000")

const Post = ({ id, author, like = [], comment = [], description, image, createdAt }) => {
    const [more, setMore] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getPost, userData } = useContext(userDataContext)
    let [likes, setLikes] = useState(like || [])
    let [commentContent, setCommentContent] = useState("")
    let [comments, setComments] = useState(comment || [])
    let [showComment, setShowComment] = useState(false)
    let { getProfile, profileData, setProfileData } = useContext(userDataContext)
    const [isLiking, setIsLiking] = useState(false)

    const handleLike = async () => {
        setIsLiking(true)
        try {
            let result = await axios.get(serverUrl + `/api/post/like/${id}`, { withCredentials: true })
            setLikes(result.data.like)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLiking(false)
        }
    }

    const handleComment = async (e) => {
        e.preventDefault()
        if (!commentContent.trim()) return
        try {
            let result = await axios.post(serverUrl + `/api/post/comment/${id}`, { content: commentContent }, { withCredentials: true })
            setComments(result.data.comment)
            setCommentContent("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on("likeUpdated", ({ postId, likes }) => {
            if (postId == id) {
                setLikes(likes)
            }
        })

        socket.on("commentAdded", ({ postId, comm }) => {
            if (postId == id) {
                setComments(comm)
            }
        })

        return () => {
            socket.off("likeUpdated")
            socket.off("commentAdded")
        }
    }, [id])

    useEffect(() => {
        getPost()
    }, [likes, setLikes, comments, setComments])

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Profile Image */}
                        <div 
                            onClick={() => getProfile(author?.userName)} 
                            className="cursor-pointer w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-gray-100 hover:border-blue-400 transition-colors duration-200 flex-shrink-0"
                        >
                            <img
                                src={author?.profileImage || dp}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Author Info */}
                        <div className="min-w-0 flex-1">
                            <div 
                                onClick={() => getProfile(author?.userName)}
                                className="text-[16px] font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200 truncate"
                            >
                                {`${author?.firstName} ${author?.lastName}`}
                            </div>
                            {author?.headline && (
                                <div className="text-[13px] text-gray-500 truncate">
                                    {author?.headline}
                                </div>
                            )}
                            <div className="text-[12px] text-gray-400 flex items-center gap-1 mt-0.5">
                                <span>{moment(createdAt).fromNow()}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>🌐</span>
                            </div>
                        </div>
                    </div>

                    {/* Connection Button */}
                    {userData._id != author._id && (
                        <div className="flex-shrink-0">
                            <ConnectionButton userId={author._id} />
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="mt-4">
                    <div 
                        className={`text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap break-words ${
                            !more ? "max-h-[120px] overflow-hidden relative" : ""
                        }`}
                    >
                        {description}
                        {!more && description?.length > 200 && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                        )}
                    </div>
                    {description?.length > 200 && (
                        <button 
                            onClick={() => setMore(!more)} 
                            className="mt-1 text-[14px] font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                        >
                            {more ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>

                {/* Image */}
                {image && (
                    <div className="mt-4 rounded-xl overflow-hidden bg-gray-50">
                        <img 
                            src={image} 
                            alt="post" 
                            className="w-full max-h-[500px] object-contain" 
                        />
                    </div>
                )}

                {/* Stats */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[14px] text-gray-500">
                        {likes.length > 0 && (
                            <>
                                <div className="flex items-center -space-x-1">
                                    {likes.slice(0, 3).map((_, index) => (
                                        <div key={index} className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                                            <BiSolidLike className="text-white text-[10px]" />
                                        </div>
                                    ))}
                                    {likes.length > 3 && (
                                        <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-gray-600">
                                            +{likes.length - 3}
                                        </div>
                                    )}
                                </div>
                                <span>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span>
                            </>
                        )}
                    </div>
                    <div 
                        onClick={() => setShowComment(!showComment)} 
                        className="cursor-pointer flex items-center gap-1 text-[14px] text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        <span>{comments?.length || 0}</span>
                        <span>{comments?.length === 1 ? 'comment' : 'comments'}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 pt-2 flex items-center gap-2 border-t border-gray-100">
                    <button
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 font-medium text-[14px] ${
                            likes.includes(userData._id) 
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
                                : "text-gray-600 hover:bg-gray-50"
                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {likes.includes(userData._id) ? (
                            <BiSolidLike className="text-[18px] text-blue-500" />
                        ) : (
                            <AiOutlineLike className="text-[18px]" />
                        )}
                        {likes.includes(userData._id) ? "Liked" : "Like"}
                    </button>

                    <button
                        onClick={() => setShowComment(!showComment)} 
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 font-medium text-[14px] ${
                            showComment ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        <FaRegCommentDots className="text-[18px]" />
                        Comment
                    </button>
                </div>

                {/* Comments Section */}
                {showComment && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        {/* Comment Input */}
                        <form onSubmit={handleComment} className="flex items-center gap-2">
                            <div className="flex-1 relative">
                                <input
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    className="w-full px-4 py-2.5 pr-12 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-blue-400 focus:bg-white transition-all duration-200 text-[14px] text-gray-700 placeholder-gray-400"
                                    type="text"
                                    placeholder="Write a comment..."
                                />
                                <button
                                    type="submit"
                                    disabled={!commentContent.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <LuSendHorizontal className="w-[20px] h-[20px]" />
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        {comments?.length > 0 && (
                            <div className="mt-4 space-y-4">
                                {comments?.map((com, index) => (
                                    <div key={index} className="flex gap-3">
                                        {/* Commenter Avatar */}
                                        <div 
                                            onClick={() => getProfile(com?.user?.userName)}
                                            className="cursor-pointer w-[36px] h-[36px] rounded-full overflow-hidden border-2 border-gray-100 hover:border-blue-400 transition-colors duration-200 flex-shrink-0"
                                        >
                                            <img
                                                src={com?.user?.profileImage || dp}
                                                alt="profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Comment Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="bg-gray-50 rounded-2xl px-4 py-2.5">
                                                <div 
                                                    onClick={() => getProfile(com?.user?.userName)}
                                                    className="text-[13px] font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {`${com?.user?.firstName} ${com?.user?.lastName}`}
                                                </div>
                                                <div className="text-[14px] text-gray-700 leading-relaxed mt-0.5">
                                                    {com.content}
                                                </div>
                                            </div>
                                            <div className="text-[11px] text-gray-400 mt-1 ml-2">
                                                {moment(com.createdAt).fromNow()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;