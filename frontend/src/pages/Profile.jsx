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
const Profile = () => {
  let { userData, setUserData, edit, setEdit } = useContext(userDataContext);
  let [userConnection, setUserConnection] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let { postData, setPostData } = useContext(userDataContext);
  let [profilePost, setProfilePost] = useState([]);

  const handleGetUserConnection = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/connection`, {
        withCredentials: true,
      });
      setUserConnection(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserConnection();
  }, []);

  useEffect(() => {
    // filter the user post
    setProfilePost(postData.filter((post) => post.author._id == userData._id));
  }, []);
  return (
    <div className="gap-[10px] w-full bg-[#f0efe7] flex flex-col items-center pt-[100px]">
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
            src={userData.coverImage || null}
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
            src={userData.profileImage || dp}
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
        <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
          <div className="text-[22px] ">
            {`${userData?.firstName} ${userData?.lastName}`}
          </div>
          <div className="text-gray-600 text-[18px] font-semibold">
            {userData?.headline || ""}
          </div>
          <div className="text-gray-500 text-[16px]">{userData?.location}</div>
          <div className="text-gray-500 text-[16px]">
            {userConnection.length} connection
          </div>
          <div>
            <button
              onClick={() => setEdit(!edit)}
              className="my-[20px] ml-[10px]  min-w-[150px] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Edit Profile
              <HiPencil />
            </button>
          </div>
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
      <div className="max-w-[900px] w-full">
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
      {userData.skills.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Skills
            {/* all skills */}
          <div className="flex items-center flex-wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              userData.skills.map((skill,index)=>(
                <div key={index}>
                    {skill}
                </div>
              ))
            }
            <button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[20px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Skill
            </button>
          </div>
          </div>
          
        </div>
      )}

      {/* Education of user */}
      {userData.education.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Education
            
          <div className="flex flex-col items-start wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              userData.education.map((edu,index)=>(
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
            <button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[10px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Education
            </button>
          </div>
          </div>
          
        </div>
      )}


      {/* Experience of user */}
      {userData.experience.length >0 && (
        <div >
          <div
            className="rounded-lg w-full  flex-col gap-[10px]  items-center      
             text-[22px] font-semibold bg-white shadow-lg p-[20px]"
          >
            Experience
            
          <div className="flex flex-col items-start wrap gap-[10px] p-[20px] text-[18px] text-gray-600">
            {
              userData.experience.map((exp,index)=>(
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
            <button
              onClick={() => setEdit(!edit)}
              className="min-w-[150px] h-[40px] ml-[10px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2  flex gap-[10px] justify-center items-center "
            >
              Add Experience
            </button>
          </div>
          </div>
          
        </div>
      )}
      </div>
      
    </div>
  );
};

export default Profile;
