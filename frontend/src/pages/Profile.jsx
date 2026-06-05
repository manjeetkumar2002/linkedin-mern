import React, { useState } from "react";
import Nav from "../components/Nav";
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import dp from "../assets/default-profile.jpg";
import EditProfile from "../components/EditProfile";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Post from "../components/Post.jsx";
import { useEffect } from "react";
import ConnectionButton from "../components/ConnectionButton.jsx";
const Profile = () => {
  let { userData, setUserData, edit, setEdit,profileData,setProfileData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { postData, setPostData } = useContext(userDataContext);
  let [profilePost, setProfilePost] = useState([]);

  useEffect(() => {
    // filter the user post
    setProfilePost(postData.filter((post) => post.author._id == profileData._id));
  }, [profileData]);
  return (
    <div className="min-h-[100vh] gap-[10px] w-full bg-[#f0efe7] flex flex-col items-center ">
      <Nav />
      {/* edit profile */}
      {edit && <EditProfile />}
      <div className="w-full max-w-[900px] flex flex-col gap-[10px]">
            {/* profile header */}
      <div className="bg-white w-full  shadow-lg rounded-lg  relative">
        <div
          onClick={() => setEdit(!edit)}
          className="w-full h-[180px] bg-gray-400 rounded overflow-hidden 
                    flex items-center justify-center relative  cursor-pointer"
        >
          <img
            src={profileData.coverImage || null}
            alt="background-image"
            className="w-full"
          />
          <CiCamera className="absolute top-[20px] right-[20px] w-[25px] h-[25px] text-white font-extrabold " />
        </div>
        {/* dp image */}
        <div
          onClick={() => setEdit(!edit)}
          className=" cursor-pointer absolute top-[140px] left-[35px] w-[70px] h-[70px] overflow-hidden rounded-full flex items-center justify-center"
        >
          <img
            src={profileData.profileImage || dp}
            alt="profile"
            className="w-full h-full"
          />
        </div>
        <div
          onClick={() => setEdit(!edit)}
          className="cursor-pointer absolute top-[180px] left-[90px]   rounded-full p-[1px] text-white bg-[#2dc0ff] text-xl font-extrabold"
        >
          <FaPlus />
        </div>
        <div className="mt-[30px] pl-[20px] py-[10px] font-semibold text-gray-700">
          <div className="text-[22px] ">
            {`${profileData?.firstName} ${profileData?.lastName}`}
          </div>
          <div className="text-gray-600 text-[18px] font-semibold">
            {profileData?.headline || ""}
          </div>
          <div className="text-gray-500 text-[16px]">{profileData?.location}</div>
          <div className="text-gray-500 text-[16px]">
            {profileData.connections.length} connection
          </div>
          {profileData._id==userData._id && 
          <div>
            <button
              onClick={() => setEdit(!edit)}
              className="my-[10px] ml-[10px]  min-w-[150px] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Edit Profile
              <HiPencil />
            </button>
          </div>}

          {profileData._id!=userData._id && 
          <div className="py-[10px]">
            <ConnectionButton userId={profileData._id}/>
          </div>}
        </div>
      </div>

      {/* user posts */}
      <div
        className="rounded-lg w-full  flex  items-center p-[20px]
      text-[22px] text-gray-600 font-semibold bg-white shadow-lg"
      >
        {`Post (${profilePost.length})`}
      </div>
      {/* all post of user */}
      <div className="max-w-[900px] w-full flex flex-col gap-[10px]">
        {profilePost.map((post, index) => (
          <Post
            key={index}
            id={post._id}
            author={post.author}
            like={post.like}
            description={post.description}
            image={post.image}
            createdAt={post.createdAt}
          />
        ))}
      </div>

      {/* skills of user */}
      {profileData.skills.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Skills
            {/* all skills */}
          <div className="flex items-center flex-wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              profileData.skills.map((skill,index)=>(
                <div key={index}>
                    {skill}
                </div>
              ))
            }
            {profileData._id == userData._id && <button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[20px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Skill
            </button>}
            
          </div>
          </div>
          
        </div>
      )}

      {/* Education of user */}
      {profileData.education.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Education
            
          <div className="flex flex-col items-start wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              profileData.education.map((edu,index)=>(
                <div key={index}>
                  <div>
                   College : {edu.college}
                </div>
                <div>
                   Degree : {edu.degree}
                </div>
                <div>
                   Field Of Study : {edu.fieldOfStudy}
                </div>
                </div>
                
              ))
            }
            {profileData._id == userData._id && <button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[10px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Education
            </button>}
            
          </div>
          </div>
          
        </div>
      )}


      {/* Experience of user */}
      {profileData.experience.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Experience
            
          <div className="flex flex-col items-start wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              profileData.experience.map((exp,index)=>(
                <div key={index}>
                  <div>
                   Title : {exp.title}
                </div>
                <div>
                   Company : {exp.company}
                </div>
                <div>
                  Description : {exp.description}
                </div>
                </div>
                
              ))
            }
            {profileData._id == userData._id &&<button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[10px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Experience
            </button>}
            
          </div>
          </div>
          
        </div>
      )}
      </div>
      
    </div>
  );
};

export default Profile;
