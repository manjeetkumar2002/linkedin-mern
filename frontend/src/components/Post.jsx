import React, { useContext,useEffect,useState } from "react";
import dp from "../assets/default-profile.jpg";
import moment from "moment"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios  from "axios";
import { BiSolidLike } from "react-icons/bi";
import { userDataContext } from "../context/UserContext";
const Post = ({ id, author, like=[], comment=[], description, image,createdAt }) => {
const [more,setMore] = useState(false)
const {serverUrl} = useContext(authDataContext)
const {getPost,userData} = useContext(userDataContext)
let [likes,setLikes] = useState(like || [])
  const handleLike = async()=>{
    try {
      let result = await axios.get(serverUrl+`/api/post/like/${id}`,{withCredentials:true})
      console.log(result.data)
      setLikes(result.data.like)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getPost()
  },[likes,setLikes])

  return (
    <div className="flex flex-col gap-[10px] p-[20px] w-full min-h-[200px] bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
            {/* profile image */}
      <div className="flex justify-center items-center gap-[10px] ">
        <div className=" cursor-pointer  w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center">
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
        <button></button>
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
          <div className="flex items-center gap-1"><span>{comment.length}</span>comments</div>
        </div>
        <div className="text-[18px] font-semibold flex gap-[10px] items-center mt-[20px]">
          <div  onClick={handleLike} className={`flex gap-[10px] items-center cursor-pointer ${likes.includes(userData._id)?"text-blue-500":""}`}>{likes.includes(userData._id)?<BiSolidLike className="text-blue-500" />:<AiOutlineLike />} {likes.includes(userData._id)?"Liked":"Like"}</div>
          <div className="flex gap-[10px] items-center"><FaRegCommentDots/>Comment</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
