import React, { useContext,useEffect,useState } from "react";
import dp from "../assets/default-profile.jpg";
import moment from "moment"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios  from "axios";
import { BiSolidLike } from "react-icons/bi";
import { userDataContext } from "../context/UserContext";
import { LuSendHorizontal } from "react-icons/lu";
import {io} from "socket.io-client"
import ConnectionButton from "./ConnectionButton";

let socket = io("http://localhost:8000")
const Post = ({ id, author, like=[], comment=[], description, image,createdAt }) => {

const [more,setMore] = useState(false)
const {serverUrl} = useContext(authDataContext)
const {getPost,userData} = useContext(userDataContext)
let [likes,setLikes] = useState(like || [])
let [commentContent,setCommentContent] = useState("")
let [comments,setComments] = useState(comment || [])
let [showComment,setShowComment] = useState(false)
console.log(comments)
  const handleLike = async()=>{
    try {
      let result = await axios.get(serverUrl+`/api/post/like/${id}`,{withCredentials:true})
      console.log(result.data)
      setLikes(result.data.like)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = async(e)=>{
      e.preventDefault()
      try {
        let result = await axios.post(serverUrl+`/api/post/comment/${id}`,{content:commentContent},{withCredentials:true})
        setComments(result.data.comment)
        setCommentContent("")
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    socket.on("likeUpdated",({postId,likes})=>{
      if(postId == id){
        setLikes(likes)
      }
    })

    socket.on("commentAdded",({postId,comm})=>{
      if(postId == id){
        setComments(comm)
      }
    })

    return ()=>{
      socket.off("likeUpdated")
      socket.off("commentAdded")
    }
  },[id])
  useEffect(()=>{
    getPost()
  },[likes,setLikes,comments,setComments])

  return (
    <div className="flex flex-col gap-[10px] p-[20px] w-full min-h-[200px] bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
            {/* profile image */}
      <div className="flex justify-center items-center gap-[10px] ">
        <div className="cursor-pointer w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center">
          <img
            src={author?.profileImage || dp}
            alt="profile"
            className="w-full h-full"
          />
        </div>
        <div>
          <div className="text-[20px] font-semibold">
            {`${author?.firstName} ${author?.lastName}`}
          </div>
          <div className="text-gray-600 text-[16px] font-semibold">
            {author?.headline || ""}
          </div>
          <div className="text-gray-600 text-[16px] font-semibold">
            {moment(createdAt).fromNow()}
          </div>

        </div>
      </div>
      {/* connection btn */}
      <div>
        {userData._id!=author._id && 
        <ConnectionButton userId={author._id}/>
        }
      </div>
      </div>
      {/* decription */}
      <div
  className={`w-full break-words whitespace-pre-wrap ${
    !more ? "max-h-[100px] overflow-hidden" : ""
  } pl-[50px]`}
>
  {description}
</div>
      <div className="pl-[50px] text-[16px] font-semibold cursor-pointer" onClick={()=>setMore(!more)}>{more?"read less...":"read more..."}</div>
      {image && 
      <div className="w-full h-[300px] overflow-hidden flex justify-center rounded-lg">
        <img src={image} alt="" className="h-full rounded-lg" />
      </div>
      }      
      <div>
        <div className="pb-2 flex justify-between text-[18px] border-b-1 border-gray-500">
          <div className="flex items-center gap-1"><AiOutlineLike className="text-blue-500" /><span>{likes.length}</span></div>
          <div  onClick={()=>setShowComment(!showComment)} className="cursor-pointer flex items-center gap-1"><span>{comments?.length}</span>comments</div>
        </div>
        <div className="text-[18px] font-semibold flex gap-[10px] items-center mt-[20px]">
          <div  onClick={handleLike} className={`flex gap-[10px] items-center cursor-pointer ${likes.includes(userData._id)?"text-blue-500":""}`}>{likes.includes(userData._id)?<BiSolidLike className="text-blue-500" />:<AiOutlineLike />} {likes.includes(userData._id)?"Liked":"Like"}</div>
          <div onClick={()=>setShowComment(!showComment)} className="cursor-pointer flex gap-[10px] items-center"><FaRegCommentDots/>Comment</div>
        </div>
        {showComment && <div>
          <form onSubmit={handleComment} className="p-[10px] w-full flex justify-between items-center border-b-2 mt-2 border-b-gray-300">
              <input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} className="outline-none border-none" type="text" placeholder="leave a comment" />
              <button><LuSendHorizontal className="text-blue-500 w-[24px] h-[24px]"/></button>
          </form>

          <div className="flex flex-col gap-[10px]">
            {comments?.map((com)=>(
              <div className="mt-2 flex flex-col gap-[10px] border-b-2 border-b-gray-300 ">
                <div className="w-full flex justify-start items-center gap-[10px]">
                  <div className=" cursor-pointer w-[40px] h-[40px] overflow-hidden rounded-full flex items-center justify-center">
                <img
                  src={com?.user?.profileImage || dp}
                  alt="profile"
                  className="w-full h-full"
                />
              </div>
              <div>
                <div className="text-[16px] font-semibold">
            {`${com?.user?.firstName} ${com?.user?.lastName}`}
          </div>
          <div className="text-[14px]">{moment(com.createdAt).fromNow()}</div>
              </div>
                </div>
                <div className="pl-[50px]">{com.content}</div>
              </div>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Post;
